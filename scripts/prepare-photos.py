"""Cria cópias para a web sem alterar os ficheiros originais do fotógrafo."""

import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
DESTINATION = ROOT / "public/assets/photos"
DESTINATION.mkdir(parents=True, exist_ok=True)
photos = []
catalogue = ROOT / "src/data/photos.json"
previous = {item["id"]: item["category"] for item in json.loads(catalogue.read_text())} if catalogue.exists() else {}

# Só importamos fotografias; protótipos e simulações não entram no portefólio.
for source in sorted((SOURCE / "Imagens para o site").rglob("*")):
    if source.suffix.lower() not in (".jpg", ".jpeg"):
        continue

    slug = source.stem.lower().replace(" ", "-").replace("_", "-")
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    width, height = image.size

    # Mantemos a proporção e as cores. A exportação elimina os dados EXIF privados.
    for size in (640, 1600, 2400):
        copy = image.copy()
        copy.thumbnail((size, size))
        copy.save(DESTINATION / f"{slug}-{size}.webp", quality=94, method=6)

    photos.append({
        "id": slug,
        "original": source.name,
        "width": width,
        "height": height,
        "category": previous.get(slug, "places" if source.parent.name == "Arquite" else "portraits"),
    })

(ROOT / "src/data/photos.json").write_text(
    json.dumps(photos, ensure_ascii=False, indent=2) + "\n"
)
print(f"{len(photos)} fotografias preparadas sem alterar os originais.")
