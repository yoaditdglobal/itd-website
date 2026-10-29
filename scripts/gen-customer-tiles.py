#!/usr/bin/env python3
"""Generate full-bleed 512x512 customer-logo tiles for the case-study chips.

Problem: several case-study logos are landscape cards (Arló 1.8:1 on black,
Saime 2.1:1 on grey, Regatta 3.8:1 on white…). Every chip/tile on the site is
square and contain-fits the logo (never crops), so a wide source letterboxes —
a small logo floating in an empty frame. Others carry baked-in padding.

Treatment (same idea as gen-orbit-tiles.py's "card"): fill a 512x512 canvas
with the artwork's own edge colour, trim the artwork to its content box and
contain-fit it at up to FILL of the tile, centred. The tile is then
edge-to-edge in the logo's own colour, with the mark as large as the square
allows — square sources that already fill their canvas are left alone.

Outputs use NEW `logo-tile.png` filenames (next/image caches by URL; never
overwrite an existing asset path). Re-run from the repo root:

    python3 scripts/gen-customer-tiles.py
"""

from collections import Counter
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent / "public" / "case-studies"
SIZE = 512
FILL = 0.92  # max share of the tile the trimmed artwork may occupy
THRESH = 18  # per-channel difference from the edge colour that counts as artwork

SOURCES = [
    "arlo-fulfilment/logo.png",
    "saime-trading/logo.png",
    "rioz-global/logo.png",
    "beauty-bay/logo.png",
    "regatta/logo.png",
    "cummins/logo.png",
    "wenrit-global/logo.png",
    "red-label/logo.png",
]


def edge_colour(im: Image.Image) -> tuple[int, int, int]:
    """Most common opaque colour along the 2px border ring."""
    w, h = im.size
    px = im.load()
    ring = []
    for x in range(w):
        for y in (0, 1, h - 2, h - 1):
            ring.append(px[x, y])
    for y in range(h):
        for x in (0, 1, w - 2, w - 1):
            ring.append(px[x, y])
    opaque = [p[:3] for p in ring if p[3] > 200]
    # A mostly transparent border means the mark sits on nothing: use white
    # (the chip/card surfaces are white), not whatever opaque pixels touch
    # the edge (Rioz / Beauty Bay are black marks on transparency).
    if len(opaque) < 0.7 * len(ring):
        return (255, 255, 255)
    return Counter(opaque).most_common(1)[0][0]


def content_box(im: Image.Image, bg: tuple[int, int, int]):
    flat = Image.alpha_composite(Image.new("RGBA", im.size, bg + (255,)), im).convert("RGB")
    diff = ImageChops.difference(flat, Image.new("RGB", im.size, bg)).convert("L")
    mask = diff.point(lambda v: 255 if v > THRESH else 0)
    return mask.getbbox()


def make_tile(rel: str) -> Path:
    src = ROOT / rel
    im = Image.open(src).convert("RGBA")
    bg = edge_colour(im)
    bbox = content_box(im, bg) or (0, 0, *im.size)
    art = im.crop(bbox)
    # Flatten the artwork onto its own background so transparency never shows.
    art = Image.alpha_composite(Image.new("RGBA", art.size, bg + (255,)), art)
    limit = int(SIZE * FILL)
    scale = min(limit / art.width, limit / art.height)
    art = art.resize((max(1, round(art.width * scale)), max(1, round(art.height * scale))), Image.LANCZOS)
    tile = Image.new("RGBA", (SIZE, SIZE), bg + (255,))
    tile.paste(art, ((SIZE - art.width) // 2, (SIZE - art.height) // 2))
    out = src.with_name("logo-tile.png")
    tile.convert("RGB").save(out, optimize=True)
    print(f"{rel:32s} bg={bg} art={art.width}x{art.height} -> {out.relative_to(ROOT.parent.parent)}")
    return out


if __name__ == "__main__":
    for rel in SOURCES:
        make_tile(rel)
