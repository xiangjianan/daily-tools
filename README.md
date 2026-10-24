简体中文 switch: [简体中文](README.zh-CN.md)

# Daily Tools / 每日创意小工具

One original single-file creative micro-tool per day — local-first, zero-dependency.

**Play online**: <https://xiangjianan.github.io/daily-tools/>（每期一个子目录）

| # | Date | Demo | Idea | Source |
| --- | --- | --- | --- | --- |
| #43 | 2026-10-25 | [MINDORBIT](mindorbit-20261025/) | MINDORBIT: paste an indented outline or Markdown headings, get a clock-face radial mind map — the root sits at the center, branches fan out as leaf-proportional sectors with one hue per lineage, click to collapse with a `+N` badge, hover to isolate a lineage, wheel/pinch zoom and free pan, one-click standalone-SVG export, fully local | [source](mindorbit-20261025) |
| #42 | 2026-10-24 | [FONTPEEK](fontpeek-20261024/) | FONTPEEK: open the page and your machine's whole font library is counted — a canvas width-probe sweeps ~156 candidates (49 CJK typefaces included) and lights up every installed font rendered in itself; edit the live specimen text and size, filter by category or search, then click fonts to compose a `font-family` stack with instant preview and one-click CSS copy, fully local | [source](fontpeek-20261024) |
| #41 | 2026-10-23 | [CAFFCURVE](caffcurve-20261023/) | CAFFCURVE: tap today's drinks and see a live caffeine decay curve in your body — a now line, a bedtime line and 50/100mg threshold guides, a traffic-light bedtime verdict, tonight's last-call deadline, a metabolism half-life slider (3–8h) and one-click report, all local | [source](caffcurve-20261023) |
| #40 | 2026-10-22 | [SPECSCALE](specscale-20261022/) | SPECSCALE: paste CSS selectors and weigh them — three-lane (ID/class/type) bars, per-fragment breakdown with the dark rules made visible (:where() counts zero, :is() takes its heaviest argument), head-to-head duel verdicts, whole-sheet scan and ranking, one-click report, all local | [source](specscale-20261022) |
| #39 | 2026-10-21 | [PIXCALIPER](pixcaliper-20261021/) | PIXCALIPER: paste a screenshot and measure it — an 8× loupe with live color picking, two clicks per caliper for distance / Δxy / angle, Shift snaps to 45°, a checklist of calipers, one-click report and annotated-PNG export, all local | [source](pixcaliper-20261021) |
| #38 | 2026-10-20 | [IGNOLENS](ignolens-20261020/) | IGNOLENS: paste a `.gitignore` and a list of file paths, get a per-path ignored/kept verdict with an expandable rule-chain trace — which rule wins at each directory level, where a negation flips the call, and where the parent-dir-excluded trap bites. Rule hit stats plus one-click Markdown report, fully local | [source](ignolens-20261020) |
| #37 | 2026-10-19 | [PATHATOMY](pathatomy-20261019/) | PATHATOMY: paste an SVG path `d` string and watch it dissected command by command — click a segment to isolate it with control-point handles and a plain-language explanation, scrub the replay slider to redraw stroke by stroke, one-click export of the normalized absolute path, fully local | [source](pathatomy-20261019) |
| #36 | 2026-10-18 | [SCALELENS](scalelens-20261018/) | SCALELENS: pick a root and the keyboard instantly lights up as any of 12 scales/modes or 8 chords — whole/half-step formula and note members printed right on the keys, tap to audition, one button to hear the whole set, Web Audio synthesis, fully local | [source](scalelens-20261018) |
| #35 | 2026-10-17 | [SEMRULER](semruler-20261017/) | SEMRULER: paste an npm semver range and it becomes a ruler — green bands for matched regions, the same-tuple prerelease gate drawn as a hatched sliver, drop versions on it for pass/fail with plain-language reasons, copy a Markdown verdict report, fully local | [source](semruler-20261017) |
| #34 | 2026-10-16 | [GPXSLIM](gpxslim-20261016/) | GPXSLIM: drop a GPX track — instant dark-canvas map, elevation profile with a scrub that rides a synced cursor along the route, vitals (haversine distance / gain / duration), then one slider of iterative Douglas–Peucker slimming (live 1,400 → 214 pts, −85%) and a clean GPX export, fully local | [source](gpxslim-20261016) |
| #33 | 2026-10-15 | [RAMPSMITH](rampsmith-20261015/) | RAMPSMITH: paste one brand color, forge an 11-step OKLCH ramp (50→950) — hand-tuned lightness curve, mid-ramp chroma peak, binary-searched gamut safety, WCAG contrast chips and a ★ brand-anchor badge, one-click CSS/Tailwind/SCSS/JSON export, fully local | [source](rampsmith-20261015) |
| #32 | 2026-10-14 | [CHECKLAB](checklab-20261014/) | CHECKLAB: paste a number — it detects the type (bank card / IMEI / EAN / ISBN / ID / IBAN), draws the per-digit weighted-sum arithmetic behind the check digit with a green-red verdict, and mints valid test numbers, fully local | [source](checklab-20261014) |
| #31 | 2026-10-13 | [ICONKIT](iconkit-20261013/) | ICONKIT: drop an image or type two characters — forge favicon.ico + nine PNG sizes + ZIP + a paste-ready link snippet, with live previews in a browser tab, bookmarks bar and phone home screen, fully local | [source](iconkit-20261013) |
| #30 | 2026-10-12 | [PIXDIET](pixdiet-20261012/) | PIXDIET: drop in an image, state a size budget (e.g. ≤100 KB) — a bisection search finds the exact compression quality that fits, with a before/after diet report, fully local | [source](pixdiet-20261012) |
| #29 | 2026-10-11 | [MAKEWAVES](makewaves-20261011/) | MAKEWAVES: paste a Makefile, see the parallel waves of `make -j` — click a target to light up its dependency closure and resolved recipe, cycles flagged in a red CYCLE lane, one-click Markdown plan export, fully local | [source](makewaves-20261011) |
| #28 | 2026-10-10 | [CURLYARD](curlyard-20261010/) | CURLYARD: paste a curl command, get a structured request card — sensitive headers flagged ⚠, one-click translate to fetch/axios/Python/Go/HTTPie, fully local | [source](curlyard-20261010) |
| #27 | 2026-10-09 | [BRAILLEPIC](braillepic-20261009/) | BRAILLEPIC: drop an image, get Unicode braille pixel art — 2×4 dots per glyph = 8× the resolution of ASCII art, dithering for depth, paste anywhere as plain text, fully local | [source](braillepic-20261009) |
| #26 | 2026-10-08 | [UUIDSCOPE](uuidscope-20261008/) | UUIDSCOPE: paste a batch of UUIDs and see what each really is — version badge, embedded v1/v6/v7 timestamps on a timeline, out-of-order & MAC-leak detection, fully local | [source](uuidscope-20261008) |
| #25 | 2026-10-07 | [LETTERLOCK](letterlock-20261007/) | LETTERLOCK: lock a note inside a self-decrypting HTML capsule — the file itself decrypts it offline, AES-256-GCM + PBKDF2, fully local | [source](letterlock-20261007) |
| #24 | 2026-10-06 | [SUBSLIDE](subslide-20261006/) | SUBSLIDE: subtitles out of sync? drag the whole track on a timeline, two-point sync fixes frame-rate drift, export a fixed SRT — fully local | [source](subslide-20261006) |
| #23 | 2026-10-05 | [ShotFramer](shotframer-20261005/) | ShotFramer: drop a screenshot, get a ready-to-post image — browser/phone frame, gradient backdrop, tilt & shadow, 2× PNG export, fully local | [source](shotframer-20261005) |
| #22 | 2026-10-04 | [JWT Checkup](jwt-checkup-20261004/) | JWT Checkup: paste a token, get a checkup report — plain-language claims, lifecycle timeline, security review, all local | [source](jwt-checkup-20261004) |
| #21 | 2026-10-03 | [TimeBridge](timebridge-20261003/) | 时区桥：跨时区会议一屏定档，彩带看时差，自动找全员最佳时段 | [source](timebridge-20261003) |
| #20 | 2026-10-02 | [DataTune](datatune-20261002/) | 数据旋律机：数字→五声音阶即点即播，异常值一耳朵听出来 | [source](datatune-20261002) |
| #19 | 2026-10-01 | [ExifRay](exifray-20261001/) | 照片隐私X光机：元数据泄露体检 + 一键清洁版复检自证 | [source](exifray-20261001) |
| #18 | 2026-09-30 | [Rxplain](rxplain-20260930/) | 正则翻译官：逐段染色翻成白话 + 实时匹配高亮 | [source](rxplain-20260930) |
| #17 | 2026-09-29 | [ProseWave](prosewave-20260929/) | 文案心电图：句子节奏波形与单调警报 | [source](prosewave-20260929) |
| #16 | 2026-09-28 | [KeyHeat](keyheat-20260928/) | 键盘击键热力图与手指行程统计 | [source](keyheat-20260928) |
| #15 | 2026-09-27 | [BishopArt](bishopart-20260927/) | SSH 指纹 randomart 可视化 | [source](bishopart-20260927) |
| #14 | 2026-09-26 | [HopTrace](hoptrace-20260926/) | 邮件头 X 光机：时间线+认证判定 | [source](hoptrace-20260926) |
| #13 | 2026-09-25 | [Mojifix](mojifix-20260925/) | 乱码尸检与一键修复 | [source](mojifix-20260925) |
| #12 | 2026-09-24 | [HashGlyph](hashglyph-20260924/) | 文本 SHA-256 指纹图腾可视化 | [source](hashglyph-20260924) |
| #11 | 2026-09-23 | [LSLens](lslens-20260923/) | ls -l 权限位透视与安全体检 | [source](lslens-20260923) |
| #10 | 2026-09-22 | [Masker](masker-20260922/) | 粘贴即脱敏的日志清洗器 | [source](masker-20260922) |
| #09 | 2026-09-21 | [Dalton](dalton-20260921/) | 色觉障碍视觉模拟器 | [source](dalton-20260921) |
| #08 | 2026-09-20 | [SunArc](sunarc-20260920/) | 太阳弧线与全年日照可视化 | [source](sunarc-20260920) |
| #07 | 2026-09-19 | [EnvPort](envport-20260919/) | .env 跨环境移植与 lint | [source](envport-20260919) |
| #06 | 2026-09-18 | [Ghosts](ghosts-20260918/) | 不可见字符扫描与净化 | [source](ghosts-20260918) |
| #05 | 2026-09-17 | [Squish](squish-20260917/) | 浏览器端文本压缩率实测 | [source](squish-20260917) |
| #04 | 2026-09-16 | [IPAtlas](ipatlas-20260916/) | IPv4 地址空间比例图 | [source](ipatlas-20260916) |
| #03 | 2026-09-15 | [ByteLens](bytelens-20260915/) | 文件字节解剖：大小/零值/熵 | [source](bytelens-20260915) |
| #02 | 2026-09-14 | [CronLens](cronlens-20260914/) | cron 表达式解析与触发时间预览 | [source](cronlens-20260914) |
| #01 | 2026-09-13 | [KeyTrace](keytrace-20260913/) | 把密码键位轨迹可视化 | [source](keytrace-20260913) |

---
Built automatically by a daily Hermes cron; earlier issues were migrated from individual per-day repos.
