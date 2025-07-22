import requests, json, os

def fetch_products(limit=10):
    os.makedirs("data/raw", exist_ok=True)
    res = requests.get("https://dummyjson.com/products")
    data = res.json()["products"][:limit]
    with open("data/raw/products.json", "w") as f:
        json.dump(data, f, indent=2)
    print(f"✅ Saved {len(data)} products.")

if __name__ == "__main__":
    fetch_products()
