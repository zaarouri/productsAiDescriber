import json
import os
import argparse

from slugify import slugify

from describer import generate_description

from ingest_products import fetch_products


def run_pipeline(category=None):
    fetch_products()
    os.makedirs("data/descriptions", exist_ok=True)
    with open("data/raw/products.json", "r", encoding="utf-8") as f:
        products = json.load(f)

    if category:
        products = [p for p in products if p.get("category") == category]
        print(f"📂 Filtered {len(products)} products for category '{category}'")
    else:
        print(f"📂 Loaded {len(products)} products")

    if not products:
        print("⚠️ No products to process.")
        return

    for product in products:
        title = product["title"]
        try:
            desc = generate_description(
                title, product["category"], product["price"], product["rating"]
            )
            fname = f"{slugify(title)}.txt"
            with open(os.path.join("data/descriptions", fname), "w", encoding="utf-8") as f:
                f.write(desc)
            print(f"📝 {fname} saved.")
        except Exception as e:
            print(f"❌ Error processing '{title}': {e}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate product descriptions.")
    parser.add_argument("--category", help="(Optional) Filter by product category.")
    args = parser.parse_args()

    run_pipeline(category=args.category)
