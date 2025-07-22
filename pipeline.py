import os
import json
import argparse
from describer import generate_description


def load_products_from_file(input_path):
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"❌ Input file not found: {input_path}")

    with open(input_path, "r", encoding="utf-8") as f:
        return json.load(f)


def run_pipeline(input_path, category=None):

    all_products = load_products_from_file(input_path)

    if category:
        products = [p for p in all_products if p.get("category") == category]
        print(f"📂 Filtered {len(products)} products for category '{category}'")
    else:
        products = all_products
        print(f"📂 Loaded {len(products)} products")

    if not products:
        print("⚠️ No products to process.")
        return
    output_path = "data/raw/products.json"

    descriptions = []
    for product in products:
        try:
            desc = generate_description(product["title"],product["category"],
                                        product["price"],product["rating"])
            descriptions.append({
                "product": product,
                "description": desc
            })
        except Exception as e:
            print(f"❌ Error processing product {product}: {e}")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(descriptions, f, ensure_ascii=False, indent=2)

    print(f"✅ Saved {len(descriptions)} descriptions to {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate product descriptions from file")
    parser.add_argument("--input", default="data/products.json", help="Path to input JSON file with products")
    parser.add_argument("--output", default="data/descriptions/descriptions.json", help="Path to output JSON file")
    parser.add_argument("--category", help="(Optional) Filter by category")

    args = parser.parse_args()
    run_pipeline(input_path=args.input, category=args.category)
