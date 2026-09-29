
const { parseRegex, flatten } = require('/tmp/rx_core.js');
let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; } else { fail++; console.log('FAIL: ' + name); }
}
function reconstruct(branches) {
  function nt(n) {
    if (n.type === 'quant') return nt(n.child) + n.text + (n.lazy ? '?' : '');
    return n.text;
  }
  return branches.map(b => b.map(nt).join('')).join('|');
}
const COOK = [
  '(?<user>[\\w.+-]+)@([\\w-]+\\.[\\w.-]+)',
  '(?:\\+86[ -]?)?1[3-9]\\d{9}',
  'https?:\\/\\/[\\w.-]+(?:\\/[^\\s]*)?',
  '(?<y>\\d{4})-(?<m>0[1-9]|1[0-2])-(?<d>0[1-9]|[12]\\d|3[01])',
  '#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b',
  '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
  '\\b(\\w+)\\s+\\1\\b',
  '<(?<tag>[a-z]+)[^>]*>.*?<\\/(?<tag2>\\1)>'
];
// 1) 每条速查正则：JS 可编译、解析不炸、重建逐字符相等
for (const re of COOK) {
  let tree = null;
  try { new RegExp(re); tree = parseRegex(re); } catch(e) { ok(false, 'parse/js fail: ' + re + ' :: ' + e.message); continue; }
  ok(reconstruct(tree.branches) === re, 'reconstruct mismatch: ' + re);
}
// 2) 非法输入必须抛中文错误
for (const bad of ['(ab', 'ab)', '*ab', '[abc', 'abc\\', 'a**', '(?<1x>a)']) {
  let threw = false;
  try { parseRegex(bad); } catch(e) { threw = true; }
  let jsThrew = false;
  try { new RegExp(bad); } catch(e) { jsThrew = true; }
  ok(threw || jsThrew, 'should be rejected: ' + bad);
}
// 3) 邮箱结构断言
let t = parseRegex(COOK[0]);
ok(t.captureCount === 2, 'email captureCount=2 got ' + t.captureCount);
ok(t.branches.length === 1, 'email single top branch');
let g1 = t.branches[0][0];
ok(g1.type === 'grp' && g1.name === 'user' && g1.num === 1, 'named group user #1');
let rows = flatten(t);
ok(rows.some(r => r.desc.includes('user')), 'flatten mentions user');
ok(rows.length >= 4, 'flatten rows >=4 got ' + rows.length);
// 4) 量词与懒惰
t = parseRegex('a{2,5}?');
let q = t.branches[0][0];
ok(q.type === 'quant' && q.lazy === true, 'a{2,5}? lazy quant');
ok(q.name.includes('2') && q.name.includes('5'), 'quant label has 2..5');
t = parseRegex('ab+');
ok(t.branches[0][0].type === 'quant' && t.branches[0][0].child.text === 'ab', '+ binds to whole run ab');
// 5) 字符类
t = parseRegex('[^a-z0-9_]');
let cls = t.branches[0][0];
ok(cls.type === 'cls' && cls.neg === true, 'negated class');
ok(cls.human.includes('a-z') && cls.human.includes('0-9'), 'class ranges');
// 6) 顶层分支
t = parseRegex('cat|dog|');
ok(t.branches.length === 3, 'cat|dog| = 3 branches got ' + t.branches.length);
ok(t.branches[2].length === 0, 'last branch empty');
ok(new RegExp('cat|dog|').test(''), 'JS agrees empty branch matches empty');
// 7) 锚点/反向引用/unicode 转义
t = parseRegex('\\b\\w+\\b');
ok(t.branches[0][0].type === 'anc' && t.branches[0][2].type === 'anc', '\\b anchors');
t = parseRegex('\\k<user>');
ok(flatten(t).some(r => r.desc.includes('反向引用')), '\\k<user> backref described');
t = parseRegex('\\u{1F600}\\x41\\n\\t');
ok(reconstruct(t.branches) === '\\u{1F600}\\x41\\n\\t', 'unicode escapes reconstruct');
// 8) 断言组语义
t = parseRegex('a(?=b)(?!c)(?<=x)(?<!y)(?:z)');
const kinds = t.branches[0].map(n => n.type === 'grp' ? n.kind : n.type);
ok(JSON.stringify(kinds) === JSON.stringify(['lit','look','nlook','lbeh','nlbeh','noncap']), 'group kinds: ' + JSON.stringify(kinds));
ok(t.captureCount === 0, 'no captures in that pattern');
// 9) groupNames 语义（页面同款遍历）
function groupNames(srcStr) {
  const names = [];
  (function walk(branches) {
    branches.forEach(b => b.forEach(n => {
      if (n.type === 'grp') { if (n.kind === 'cap') names[n.num-1] = n.name || null; walk(n.branches); }
    }));
  })(parseRegex(srcStr).branches);
  return names;
}
ok(JSON.stringify(groupNames(COOK[0])) === JSON.stringify(['user', null]), 'groupNames email');
ok(JSON.stringify(groupNames(COOK[3])) === JSON.stringify(['y','m','d']), 'groupNames date');
// 10) 空正则不炸
t = parseRegex('');
ok(t.branches.length === 1 && t.branches[0].length === 0, 'empty regex ok');
console.log('PASS ' + pass + ' / FAIL ' + fail);
process.exit(fail ? 1 : 0);
