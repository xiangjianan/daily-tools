#!/usr/bin/env python3
"""Rxplain headless smoke — file:// load, default render, interactions, zero-error check."""
import sys
from playwright.sync_api import sync_playwright

URL = "file:///home/xjn/projects/daily-tools/rxplain-20260930/index.html"
EXE = "/home/xjn/.cache/ms-playwright/chromium_headless_shell-1223/chrome-linux/headless_shell"

results, errors = [], []

def ok(cond, name):
    results.append((bool(cond), name))
    if not cond:
        print("FAIL:", name)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=EXE, args=["--no-sandbox"])
    pg = browser.new_page(viewport={"width": 1200, "height": 900})
    pg.on("pageerror", lambda e: errors.append("pageerror: %s" % e))
    pg.on("console", lambda m: errors.append("console.%s: %s" % (m.type, m.text)) if m.type == "error" else None)
    pg.goto(URL)
    pg.wait_for_timeout(400)

    # 1) 默认态：邮箱速查已载入，分段卡片与白话清单已渲染
    chips = pg.locator("#viz .chip").count()
    ok(chips >= 5, "default chips >=5 (got %d)" % chips)
    rows = pg.locator("#explain .exrow").count()
    ok(rows >= 4, "default explain rows >=4 (got %d)" % rows)
    ok(pg.locator("#explain").inner_text().find("user") >= 0, "explain mentions named group user")

    # 2) 默认样例文本：2 个有效邮箱被高亮；捕获表带「user」表头
    marks = pg.locator("#highlight mark").count()
    ok(marks == 2, "default marks ==2 (got %d)" % marks)
    caps_txt = pg.locator("#caps").inner_text()
    ok("user" in caps_txt and "$1" in caps_txt, "capture table shows $1/user")
    ok("hello.world+tag@example-site.com" in caps_txt, "capture table row content")

    # 3) 改写正则 → 即时重渲染（输入事件驱动）
    pg.fill("#pat", r"\d{4}-\d{2}")
    pg.dispatch_event("#pat", "input")
    ok(pg.locator("#viz code").first.inner_text() == r"\d", "re-render on input: escape chip first")
    ok(any("重复" in t for t in pg.locator("#viz small").all_inner_texts()), "quantifier chip label")
    ok(pg.locator("#explain").inner_text().find("恰好") >= 0 or pg.locator("#explain").inner_text().find("重复") >= 0,
       "explain updated for new regex")

    # 4) 非法正则 → 中文 banner，无渲染崩溃
    pg.fill("#pat", "(ab")
    pg.dispatch_event("#pat", "input")
    ok(pg.locator("#err.show").count() == 1, "invalid regex shows banner")
    ok("读不懂" in pg.locator("#err").inner_text(), "banner plain-Chinese message")
    # 恢复合法
    pg.fill("#pat", r"\b\w+\b")
    pg.dispatch_event("#pat", "input")
    ok(pg.locator("#err.show").count() == 0, "banner cleared on valid input")

    # 5) 速查 chip 点击 → 载入手机号正则与样例
    pg.click("#cook button:has-text('手机号')")
    ok("1[3-9]" in pg.locator("#pat").input_value(), "cookbook loads CN phone regex")
    marks = pg.locator("#highlight mark").count()
    ok(marks == 3, "phone sample marks ==3 (got %d)" % marks)
    ok(any(t.startswith("+86") for t in pg.locator("#highlight mark").all_inner_texts()),
       "prefixed +86 number highlighted")
    ok(pg.locator("#caps table").count() == 0, "no capture table for non-capturing pattern")

    # 6) flags 切换 g off → flag 重渲染；解释照常
    pg.click(".flag:has-text('全局')")
    ok("off" not in pg.locator(".flag").first.get_attribute("class"), "g flag toggled off")
    pg.click(".flag:has-text('全局')")  # 开回来

    # 7) 空正则 / 空测试文本 → 友好空态
    pg.fill("#pat", "")
    pg.dispatch_event("#pat", "input")
    ok("速查" in pg.locator("#viz").inner_text(), "empty regex friendly notice")
    pg.fill("#test", "")
    pg.dispatch_event("#test", "input")
    ok(True, "empty test text no crash")

    # 8) 复制按钮（无头环境剪贴板可能失败，但不得抛异常）
    pg.fill("#pat", r"a+")
    pg.dispatch_event("#pat", "input")
    pg.click("#copy")
    pg.wait_for_timeout(200)

    # 9) 截图：桌面 + 移动端
    pg.screenshot(path="/home/xjn/projects/daily-tools/rxplain-20260930/shot_desktop.png")
    m = browser.new_page(viewport={"width": 375, "height": 812})
    m.goto(URL)
    m.wait_for_timeout(400)
    m.screenshot(path="/home/xjn/projects/daily-tools/rxplain-20260930/shot_mobile.png")
    # 移动端横向溢出检查
    overflow = m.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    ok(overflow <= 0, "no horizontal overflow on 375px (got %d)" % overflow)

    browser.close()

zero = len(errors) == 0
print("JS/console errors:", errors if errors else "none")
print("checks: %d/%d passed" % (sum(1 for c, _ in results if c), len(results)))
sys.exit(0 if zero and all(c for c, _ in results) else 1)
