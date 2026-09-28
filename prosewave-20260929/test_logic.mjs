// ProseWave logic self-test — run with: node test_logic.mjs
import { readFileSync } from 'fs';
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
let src = m[1];
// strip browser-only tail: find the rendering marker
const cut = src.indexOf('/* ================= rendering');
src = src.slice(0, cut);
const fn = new Function(src + '; return {splitSentences, sentLength, computeStats, buildVerdict, buildFindings, buildReport, isCJKText};');
const P = fn();

let pass = 0, fail = 0;
function ok(cond, name){
  if (cond){ pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
}

// ---- splitting ----
let s = P.splitSentences('Hello world. This is fine! Really? Yes.');
ok(s.length===4 && s[0]==='Hello world.' && s[3]==='Yes.', 'latin split 4: '+JSON.stringify(s));
s = P.splitSentences('他推开门。雨停了！真的吗？嗯。');
ok(s.length===4 && s[0]==='他推开门。', 'cjk split 4');
s = P.splitSentences('wait...\nwhat?!');
ok(s.length===2, 'ellipsis+newline split: '+JSON.stringify(s));
s = P.splitSentences('no terminator here');
ok(s.length===1 && s[0]==='no terminator here', 'no terminator kept as 1');
s = P.splitSentences('   ');
ok(s.length===0, 'whitespace -> 0 sentences');
s = P.splitSentences('e.g. Dr. Smith went to Washington D.C. yesterday.');
ok(s.length>=3, 'abbrev still splits (accepted limitation), n='+s.length);
s = P.splitSentences('Line one\nLine two\nLine three');
ok(s.length===3, 'soft lines split as 3');

// ---- length ----
ok(P.sentLength('Hello world')===2, 'latin 2 words');
ok(P.sentLength('他是一个中国人。')===7, 'cjk 7 chars');
ok(P.sentLength('I have 2 cats, and 10 dogs!')===7, 'mixed words+digits: '+P.sentLength('I have 2 cats, and 10 dogs!'));
ok(P.sentLength('привет мир')===2, 'cyrillic words 2');

// ---- stats ----
let st = P.computeStats(['我来了。','你来了。','他来了。','她走了吗？']);
ok(st.n===4 && st.maxRun>=3, 'monotony run detected: run='+st.maxRun);
ok(st.cv<0.3, 'low cv on uniform: '+st.cv.toFixed(2));
st = P.computeStats(['短。','这是一个中等长度的句子，包含一些内容。','这是一个非常非常长的句子，包含了很多很多的从句，还嵌套了各种修饰语，读起来要换好几口气才能读完，读者很容易在中途迷路。']);
ok(st.maxLen>st.mean*2, 'spread stats');
let st2 = P.computeStats(['一。','二。','三。']);
ok(st2.maxRun===3 && st2.runStart===0 && st2.runEnd===2, 'run bounds 0..2');

// ---- verdict ----
let v = P.buildVerdict(P.computeStats(['我来了。','你走了。','他来了。','她走了。','风停了。']), true);
ok(v.level==='bad' && /单调/.test(v.what), 'uniform -> bad monotony: '+v.what);
v = P.buildVerdict(P.computeStats(['好。','这是一个信息量足够的中等句子，讲了一件小事。']), true);
ok(v.level==='warn' && /太少/.test(v.what), 'too few sentences: '+v.what);
v = P.buildVerdict(P.computeStats([
  '短。','中等长度的句子在这里承载了主要的信息和节奏变化。','这是一个非常非常长的句子，包含了很多很多的从句，还嵌套了各种修饰语，读起来要换好几口气才能读完，读者很容易在中途迷路，而且这一句还在继续延续下去，直到把读者彻底拖垮为止，超过了一百二十个字的极限。']), true);
ok(v.level==='good', '85-char sentence with high variance now healthy: '+v.level+' '+v.what);

// ---- findings ----
let f = P.buildFindings(P.computeStats([
  '这个句子故意写得很长很长，就是为了测试臃肿长句的检测功能是否正常工作，它现在应该已经超过了平均值的很多倍，变成了一头大象。','短。','中等的句子放在这里做对照，长度适中。']), ['这个句子故意写得很长很长，就是为了测试臃肿长句的检测功能是否正常工作，它现在应该已经超过了平均值的很多倍，变成了一头大象。','短。','中等的句子放在这里做对照，长度适中。'], true);
ok(f.some(x=>/臃肿/.test(x.t)), 'bloated sentence found: '+f.map(x=>x.t).join('|'));

// ---- report ----
let rep = P.buildReport(P.computeStats(['我来了。','你走了。','他笑了。','风停了。']), ['我来了。','你走了。','他笑了。','风停了。'], true, {what:'测试'});
ok(/ProseWave/.test(rep) && /句子数：4/.test(rep) && /波动系数/.test(rep), 'report structure');
ok(!/<[^ ]/.test(rep), 'report has no raw html tags');

// ---- cjk detect ----
ok(P.isCJKText('今天天气很好，我们出去走走吧。')===true, 'isCJK true');
ok(P.isCJKText('Hello world, this is a test.')===false, 'isCJK false');

// ---- sample texts pass own pipeline ----
for (const [k, t] of Object.entries({good:'Vary sentence length. Short sentences read fast. They punch. Medium sentences carry the idea forward.', bad:'The team held a meeting on Monday. The manager presented the metrics. The engineers took notes. The designers shared mockups. The team agreed to review.'})){
  const ss = P.splitSentences(t);
  const stt = P.computeStats(ss);
  ok(ss.length>=4, 'sample '+k+' splits >=4: '+ss.length);
  ok(stt.n===ss.length && stt.maxLen>0, 'sample '+k+' stats sane');
}
const g = P.computeStats(P.splitSentences('Vary sentence length. Short sentences read fast. They punch. Medium sentences carry the idea forward with a steady, comfortable rhythm that feels natural to the ear. And then, when everything has been flowing along smoothly for a while, a very long sentence arrives — it gathers clauses the way a river gathers rain, it slows the reader down deliberately, it builds a small world of its own — before the end snaps shut. Vary. Sentence. Length.'));
ok(g.cv>0.5, 'good sample has high variance cv='+g.cv.toFixed(2));
const b = P.computeStats(P.splitSentences('The team held a meeting on Monday morning to discuss the roadmap. The manager presented the key metrics to everyone. The engineers listened carefully and took notes. The designers shared their mockups after lunch. The team agreed to review next week.'));
ok(b.cv<0.35 && b.maxRun>=4, 'bad sample monotone cv='+b.cv.toFixed(2)+' run='+b.maxRun);

console.log(`\n=== ${pass} PASS / ${fail} FAIL ===`);
process.exit(fail?1:0);
