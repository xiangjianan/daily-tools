[English](README.md) | 简体中文

# ENVPORT

粘贴一份 `.env` 文件，瞬间移植成 **shell export**、**docker run**、**Dockerfile**、**JSON**、**YAML**、**TypeScript interface** 或整理过的 `.env` —— 同时附赠一遍 lint：查出重复键、未加引号的值、小写键等隐患。100% 本地运行，零依赖，单 HTML 文件。

**在线使用：** https://xiangjianan.github.io/daily-tools/envport-20260919//

## 解决什么问题

env 文件无处不在：本地 → CI → Docker → k8s → TypeScript 配置。每换一个环境就要手工把同一批变量改写成另一种语法，而一个坏掉的 `.env`（重复键、带空格的未引号值、意外的行内注释）往往要到运行时才暴露。

ENVPORT 把这一切压缩成一次粘贴：解析、移植、体检 —— 左右分栏，边打字边出结果。

## 怎么用

1. 打开页面（可离线 —— 双击 `index.html` 即可）。
2. 把 `.env` 粘到左侧。
3. 在右侧选一个格式标签，点 **copy**。警告会随着输入实时显示在输出下方。

**sample** 按钮会载入一份演示文件，两秒钟看懂玩法。

## lint 能查出什么

- 重复键（并指出覆盖的是哪一行）
- 未加引号但含空格的值（很多解析器会静默截断）
- 空值、小写键、数字开头的键
- 没有 `=` 的行、带空格的键、缺失键名
- 跨行的未闭合引号（支持多行值）

内置类型推断：`PORT=8080` 在 JSON/TS 里是 `number`，`DEBUG=false` 是 `boolean`。

## 隐私

一切都在你的浏览器里完成。无服务器、无上传、无追踪、无 CDN。你的密钥永远不离开当前标签页。

## 技术

单个 `index.html`（约 400 行），原生 JS + CSS，零构建、零依赖。支持鼠标和触屏，响应式适配手机宽度。

## License

MIT
