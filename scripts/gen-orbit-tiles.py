#!/usr/bin/env python3
"""Generate full-bleed 512x512 brand tiles for the Connexx orbit.

Two treatments (see website-builder skill, "Logo System"):

1. flatten  — square sources whose artwork has baked corner rounding or
   padding (transparent corners would show gaps inside a rounded tile).
   The content bbox is scaled to fill 512x512 and transparent areas are
   filled with the artwork's own dominant edge colour.

2. wordmark — wide wordmark sources that would crop in a square. The
   trimmed mark is centred on a white 512x512 tile at app-icon scale
   (<=70% width, <=55% height), matching these brands' real app icons.

3. card — wide sources that are themselves a solid brand card (Etsy's
   orange card, Amazon's dark card, Mintsoft's teal card). The tile is
   filled with the card's own colour and the card is contain-fitted on
   top, so its rounded edges blend seamlessly into the matching
   background -> a full-bleed brand tile with no white margins.

Outputs use new `-tile.png` filenames (never overwrite an existing asset
path — next/image caches by URL). Re-run from the repo root:

    python3 scripts/gen-orbit-tiles.py
"""

from collections import Counter
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "logos"

FLATTEN = [
    ("carriers/DPD-LOGO.png", "carriers/dpd-tile.png"),
    ("marketplaces/tiktok_logo.png", "marketplaces/tiktok-tile.png"),
    ("marketplaces/temu_logo.webp", "marketplaces/temu-tile.png"),
    ("erp-wms/linnworks_logo.png", "erp-wms/linnworks-tile.png"),
]

WORDMARK = [
    ("marketplaces/ebay_logo.png", "marketplaces/ebay-tile.png"),
    ("erp-wms/veeqo_logo.png", "erp-wms/veeqo-tile.png"),
    ("ecommerce/shopify_logo.png", "ecommerce/shopify-tile.png"),
]

CARD = [
    ("marketplaces/etsy_logo.png", "marketplaces/etsy-tile.png"),
    ("marketplaces/amazon_logo.png", "marketplaces/amazon-tile.png"),
    ("erp-wms/mintsoft_logo.png", "erp-wms/mintsoft-tile.png"),
]

SIZE = 512


def trimmed(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def edge_colour(im: Image.Image) -> tuple:
    """Most common opaque colour in the outer 8% band of the artwork."""
    w, h = im.size
    band = max(2, int(min(w, h) * 0.08))
    px = im.load()
    counts: Counter = Counter()
    for x in range(w):
        for y in list(range(band)) + list(range(h - band, h)):
            r, g, b, a = px[x, y]
            if a > 200:
                counts[(r, g, b)] += 1
    for y in range(band, h - band):
        for x in list(range(band)) + list(range(w - band, w)):
            r, g, b, a = px[x, y]
            if a > 200:
                counts[(r, g, b)] += 1
    return counts.most_common(1)[0][0] if counts else (255, 255, 255)


def flatten(src: Path, dst: Path) -> None:
    art = trimmed(src)
    bg = Image.new("RGBA", (SIZE, SIZE), edge_colour(art) + (255,))
    fitted = art.resize((SIZE, SIZE), Image.LANCZOS)
    bg.alpha_composite(fitted)
    bg.convert("RGB").save(dst, "PNG")


def wordmark(src: Path, dst: Path) -> None:
    art = trimmed(src)
    scale = min((SIZE * 0.70) / art.width, (SIZE * 0.55) / art.height)
    fitted = art.resize(
        (max(1, round(art.width * scale)), max(1, round(art.height * scale))),
        Image.LANCZOS,
    )
    tile = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 255))
    tile.alpha_composite(
        fitted, ((SIZE - fitted.width) // 2, (SIZE - fitted.height) // 2)
    )
    tile.convert("RGB").save(dst, "PNG")


def card(src: Path, dst: Path) -> None:
    art = trimmed(src)
    tile = Image.new("RGBA", (SIZE, SIZE), edge_colour(art) + (255,))
    scale = min(SIZE / art.width, SIZE / art.height)
    fitted = art.resize(
        (max(1, round(art.width * scale)), max(1, round(art.height * scale))),
        Image.LANCZOS,
    )
    tile.alpha_composite(
        fitted, ((SIZE - fitted.width) // 2, (SIZE - fitted.height) // 2)
    )
    tile.convert("RGB").save(dst, "PNG")


def main() -> None:
    for rel_src, rel_dst in FLATTEN:
        flatten(ROOT / rel_src, ROOT / rel_dst)
        print(f"flatten  {rel_src} -> {rel_dst}")
    for rel_src, rel_dst in WORDMARK:
        wordmark(ROOT / rel_src, ROOT / rel_dst)
        print(f"wordmark {rel_src} -> {rel_dst}")
    for rel_src, rel_dst in CARD:
        card(ROOT / rel_src, ROOT / rel_dst)
        print(f"card     {rel_src} -> {rel_dst}")


if __name__ == "__main__":
    main()
