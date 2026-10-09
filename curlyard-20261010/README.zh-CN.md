# CURLYARD

粘贴一条 `curl` 命令 → 读懂它（结构化请求卡片）→ 一键变成你所用语言的代码。

**在线使用：https://xiangjianan.github.io/daily-tools/curlyard-20261010/**

[English](README.md) | 简体中文

## 解决什么问题

每个开发者都经历过这个循环：从 API 文档或 DevTools（"Copy as cURL"）里捞出一条 `curl` 命令，然后要在脑子里做"翻译"——解析 `-d`、`--data-urlencode`、`-G` 这些 flag，剥开 shell 引号，再手工誊写成 `fetch()`、`requests.request()` 或 Go 的 `http.NewRequest`。繁琐、易错，而且每种语言写法都不一样。更糟的是，这些命令里往往带着 `Authorization` 头——你不会想把它上传到某个随机的"curl 转换器"网站。

## 它做什么

- **粘贴即解析**：tokenizer 能吃下真实 shell 语法——续行符 `\`、单双引号、`$'...'` ANSI-C 转义；理解大家真正常用的 flag：`-X`、`-H`、`-d`/`--data-raw`/`--data-urlencode`、`-F`、`-u`（→ Basic 认证）、`-A`、`-e`、`-b`、`--json`、`-G`、`-I`、`-L`、`-k` 等。
- **请求卡片**：命令变成可读的结构化视图——方法徽章、URL 拆解为 scheme/host/path/query 表格（每个参数解码显示）、头部列表、JSON body 自动美化。
- **敏感头雷达**：`Authorization`、`Cookie`、各类 API-key 头（以及疑似凭证的 query 参数）会打上醒目的 ⚠ 标记，在你截图分享之前先提醒你。
- **一键翻译**：输出地道写法的 **fetch**、**axios**、**Python requests**、**Go net/http**、**HTTPie** 代码。点击代码块（或 copy 按钮）即复制。
- **语义正确**：`--data-urlencode` 的值会先 URL 编码再拼接；`-G` 把 body 移进 query string；多个 `-d` 用 `&` 连接；`--json` 自动设置两个内容头。

## 怎么用

1. 打开页面（本地双击文件即可，离线可用）。
2. 粘贴任意 curl 命令，或点示例 chip 载入一条。
3. 读请求卡片，切语言 tab，点代码即复制。

## 技术说明

- 单 HTML 文件，零依赖、零构建、零网络——tokenizer/解析器/生成器全部在你的浏览器里运行，任何数据都不会上传。
- shell tokenizer 支持续行符 `\`、三种引号模式（字面、带转义的双引号、`$'...'` ANSI-C 的 `\n`/`\uXXXX`/`\xXX`）以及 `--flag=value` 形式。
- 各语言代码为模板生成，字符串转义 JSON 安全。
- 鼠标与触屏均可；小屏手机响应式；深色主题。

## License

MIT —— 与 daily-tools 仓库一致。
