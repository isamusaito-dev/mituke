from playwright.sync_api import sync_playwright
import pathlib

SRC = pathlib.Path("/Users/isamu/Desktop/mituke/guide/guide.html").as_uri()
OUT = "/Users/isamu/Desktop/mituke/public/guide.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(SRC, wait_until="networkidle")
    page.emulate_media(media="print")
    try:
        page.evaluate("document.fonts.ready")
    except Exception:
        pass
    page.wait_for_timeout(1200)
    page.pdf(
        path=OUT,
        format="A4",
        print_background=True,
        prefer_css_page_size=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
    )
    browser.close()

print("PDF written to", OUT)
