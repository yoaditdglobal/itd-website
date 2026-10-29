#!/usr/bin/env python3
"""Generate full-frame 512x512 logo tiles for every square-framed logo.

Every logo chip on the site is a square (IntegrationLogo tiers, UsedByChip,
orbit IconChips, story/case-study cards) and contain-fits its image. Any
source that is not square, or whose mark sits small inside its canvas,
renders as a little logo floating in an empty frame — Arló on black, Saime
on grey, Evri / FedEx / eBay / Etsy / Temu app icons at 15–50% fill, wide
ERP wordmarks, padded crests.

Treatment (one rule for all): fill a 512x512 canvas with the artwork's own
edge colour (white when the edges are transparent), trim the artwork to its
content box and contain-fit it at up to FILL of the tile, centred. The tile
is edge-to-edge in the brand's own colour with the mark as large as a square
allows. Sources that already fill a square canvas are skipped.

Outputs use NEW filenames (next/image caches by URL; never overwrite a
published path): `<stem>-fill.<ext>` under /logos, `logo-tile.png` under
/case-studies. Prints the old → new map; the repoint step in the repo is a
plain string replace over src. Re-run from the repo root:

    python3 scripts/gen-logo-tiles.py [--check]   # --check only reports
"""

import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

from PIL import Image, ImageChops

REPO = Path(__file__).resolve().parent.parent
PUBLIC = REPO / "public"
SIZE = 512
FILL = 0.9      # max share of the tile the trimmed artwork may occupy
THRESH = 18     # per-channel difference from the edge colour that counts as artwork
MIN_FILL = 0.85  # sources whose mark already fills this much of a square canvas are left alone

# Only logos rendered inside square frames. Tickers, membership strips, the
# ITD / Connexx marks and photography are not framed and stay untouched.
FRAMED_PREFIXES = (
    "/logos/carriers/",
    "/logos/ecommerce/",
    "/logos/erp-wms/",
    "/logos/marketplaces/",
)
FRAMED_EXACT = {  # ticker assets that one page also uses as a framed logo
    "/logos/customers/west-ham.webp",
    "/logos/customers/kitchencraft.webp",
}
CASE_STUDY_LOGO = re.compile(r"^/case-studies/[^/]+/logo[^/]*\.(png|jpe?g|webp)$")


def referenced_paths() -> list[str]:
    out = subprocess.run(
        ["grep", "-rhoE", r'"/(logos|case-studies)/[^"]+\.(png|webp|jpe?g)"', str(REPO / "src")],
        capture_output=True, text=True,
    ).stdout
    return sorted({p.strip('"') for p in out.split()})


def is_framed(rel: str) -> bool:
    if rel.endswith(("-fill.png", "-fill.webp", "-fill.jpg", "logo-tile.png")):
        return False  # already an output of this script
    return rel.startswith(FRAMED_PREFIXES) or rel in FRAMED_EXACT or bool(CASE_STUDY_LOGO.match(rel))


def edge_colour(im: Image.Image) -> tuple[int, int, int]:
    w, h = im.size
    px = im.load()
    ring = [px[x, y] for x in range(w) for y in (0, 1, h - 2, h - 1)]
    ring += [px[x, y] for y in range(h) for x in (0, 1, w - 2, w - 1)]
    opaque = [p[:3] for p in ring if p[3] > 200]
    if len(opaque) < 0.7 * len(ring):
        return (255, 255, 255)  # mark on transparency → white tile
    return Counter(opaque).most_common(1)[0][0]


def content_box(im: Image.Image, bg):
    flat = Image.alpha_composite(Image.new("RGBA", im.size, bg + (255,)), im).convert("RGB")
    diff = ImageChops.difference(flat, Image.new("RGB", im.size, bg)).convert("L")
    return diff.point(lambda v: 255 if v > THRESH else 0).getbbox()


def analyse(rel: str):
    im = Image.open(PUBLIC / rel.lstrip("/")).convert("RGBA")
    bg = edge_colour(im)
    bbox = content_box(im, bg) or (0, 0, *im.size)
    cw, ch = bbox[2] - bbox[0], bbox[3] - bbox[1]
    w, h = im.size
    square = 0.95 <= w / h <= 1.05
    fill = min(cw / w, ch / h)
    return im, bg, bbox, square, fill


def out_path(rel: str) -> str:
    p = Path(rel)
    if CASE_STUDY_LOGO.match(rel):
        return str(p.with_name("logo-tile.png"))
    return str(p.with_name(p.stem + "-fill.png"))


def make_tile(rel: str, im, bg, bbox) -> str:
    art = im.crop(bbox)
    art = Image.alpha_composite(Image.new("RGBA", art.size, bg + (255,)), art)
    limit = int(SIZE * FILL)
    scale = min(limit / art.width, limit / art.height)
    art = art.resize((max(1, round(art.width * scale)), max(1, round(art.height * scale))), Image.LANCZOS)
    tile = Image.new("RGB", (SIZE, SIZE), bg)
    tile.paste(art.convert("RGB"), ((SIZE - art.width) // 2, (SIZE - art.height) // 2))
    out = out_path(rel)
    tile.save(PUBLIC / out.lstrip("/"), optimize=True)
    return out


if __name__ == "__main__":
    check = "--check" in sys.argv
    mapping = {}
    for rel in referenced_paths():
        if not is_framed(rel) or not (PUBLIC / rel.lstrip("/")).exists():
            continue
        im, bg, bbox, square, fill = analyse(rel)
        if square and fill >= MIN_FILL:
            print(f"ok    {rel}  fill={fill:.2f}")
            continue
        if check:
            print(f"FIX   {rel}  square={square} fill={fill:.2f} bg={bg}")
            continue
        out = make_tile(rel, im, bg, bbox)
        mapping[rel] = out
        print(f"tile  {rel} -> {out}  (fill was {fill:.2f}, bg={bg})")
    if mapping:
        print("\nMAP")
        for k, v in mapping.items():
            print(f"{k} {v}")
