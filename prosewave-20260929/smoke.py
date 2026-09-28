# ProseWave browser smoke test — python3 smoke.py
import asyncio, sys
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8866/index.html'
passed, failed, errors = [], [], []

def ok(cond, name):
    (passed if cond else failed).append(name)
    print(('  PASS ' if cond else '  FAIL ') + name)

async def main():
    async with async_playwright() as p:
        import os
        exe = '/home/xjn/.cache/ms-playwright/chromium_headless_shell-1223/chrome-linux/headless_shell'
        if not os.path.exists(exe):
            exe = '/usr/bin/chromium'
        browser = await p.chromium.launch(executable_path=exe)
        page = await browser.new_page(viewport={'width': 1280, 'height': 900})
        page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
        page.on('console', lambda m: errors.append('console-error: ' + m.text) if m.type == 'error' else None)
        await page.goto(URL, wait_until='load')

        # 1. empty state: verdict hidden
        hidden = await page.is_hidden('#verdict')
        ok(hidden, 'empty input -> results hidden')

        # 2. good sample chip -> verdict good + wave bars
        await page.click('.chip[data-s="good"]')
        await page.wait_for_timeout(400)
        cls = await page.get_attribute('#vcard', 'class')
        ok('good' in cls, 'good sample -> verdict good (' + cls + ')')
        n = await page.eval_on_selector_all('#wave .bar', 'els => els.length')
        ok(n >= 6, 'wave bars rendered: ' + str(n))
        stats = await page.inner_text('#stats')
        ok('波动系数' in stats, 'stats panel rendered')

        # 3. bad sample -> monotony bad verdict
        await page.click('.chip[data-s="bad"]')
        await page.wait_for_timeout(400)
        cls = await page.get_attribute('#vcard', 'class')
        what = await page.inner_text('#vwhat')
        ok('bad' in cls and '单调' in what, 'bad sample -> monotony alarm: ' + what)

        # 4. click a bar -> hoverBox shows sentence
        await page.click('#wave .bar >> nth=0')
        hb = await page.inner_text('#hoverBox')
        ok('第 1 句' in hb, 'bar click shows sentence: ' + hb.split('\n')[0])

        # 5. cn sample -> isCJK path
        await page.click('.chip[data-s="cn"]')
        await page.wait_for_timeout(400)
        unit = await page.inner_text('#stats')
        ok('字' in unit, 'cn sample uses 字 unit')

        # 6. report populated + copy button enabled
        rep = await page.inner_text('#report')
        ok('ProseWave 节奏诊断' in rep and '句子数' in rep, 'report rendered')
        dis = await page.is_disabled('#copyBtn')
        ok(not dis, 'copy enabled')

        # 7. copy fallback (execCommand path in headless w/o clipboard perms)
        await page.click('#copyBtn')
        await page.wait_for_timeout(300)
        txt = await page.inner_text('#copyBtn')
        ok('复制' in txt, 'copy button feedback: ' + txt)

        # 8. garbage input -> friendly empty
        await page.fill('#in', '   ')
        await page.wait_for_timeout(400)
        ok(await page.is_hidden('#verdict'), 'whitespace input -> hidden')

        # 9. single tiny word -> still hidden (needs >=1 sentence len>=3)
        await page.fill('#in', 'ok')
        await page.wait_for_timeout(400)
        ok(await page.is_hidden('#verdict'), 'tiny input -> hidden')

        # 10. clear resets
        await page.fill('#in', 'One two three. Four five six seven.')
        await page.wait_for_timeout(400)
        vis = await page.is_visible('#verdict')
        ok(vis, 'short valid input shows results')
        await page.click('#clearBtn')
        await page.wait_for_timeout(200)
        ok(await page.is_hidden('#verdict') and (await page.input_value('#in')) == '', 'clear resets all')

        # 11. live typing debounce
        await page.type('#in', 'A tiny sentence here. And another slightly longer sentence follows it right now.')
        await page.wait_for_timeout(600)
        ok(await page.is_visible('#verdict'), 'live typing triggers analyze')

        # 12. mobile viewport no horizontal overflow
        await page.set_viewport_size({'width': 390, 'height': 800})
        await page.click('.chip[data-s="good"]')
        await page.wait_for_timeout(400)
        overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        ok(overflow <= 0, 'mobile 390px no horizontal overflow (' + str(overflow) + ')')

        await page.screenshot(path='shot_mobile.png')
        await page.set_viewport_size({'width': 1280, 'height': 900})
        await page.click('.chip[data-s="bad"]')
        await page.wait_for_timeout(400)
        await page.screenshot(path='shot_desktop.png')

        await browser.close()

    print('\nerrors:', errors if errors else 'NONE')
    print(f'=== {len(passed)} PASS / {len(failed)} FAIL ===')
    if failed or errors:
        print('FAILED:', failed, errors)
    sys.exit(1 if (failed or errors) else 0)

asyncio.run(main())
