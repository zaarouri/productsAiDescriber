# 🛍️ Product Describer

Generate product descriptions using AI and display them in a responsive Tailwind-styled HTML page.

This project is designed for collaborative work between 4 contributors, with clearly defined responsibilities for each module. The backend fetches data and generates descriptions using Cohere, and the frontend renders the result beautifully using Tailwind CSS.

---

## 👥 Team Responsibilities


| Role                  | Task                                                      | File                 |
|-----------------------|-----------------------------------------------------------|----------------------|
| 👤 Fatima AYYAD       | Fetch product data from an API                            | `ingest_products.py` |
| 👤 Ahmed ELHOUSNI     | Generate product description using AI (Cohere or other)   | `describer.py`       |
| 👤 Ayoub ENNAOUI      | Link steps in a main pipeline script                      | `pipeline.py`        |
| 👤 Abdelmounime ZAAROURI | Style and render results in HTML or visual format         | `generate_html.py`   |

---

## 🧪 Tech Stack

- **Python** for data ingestion, transformation, and rendering
- **Cohere API** for natural language generation
- **Tailwind CSS** (via CDN) for styling
- **`dominate`** for DOM-based HTML generation
- **Virtual Environment (`venv`)** for clean dependency management

---

## 🧰 Project Setup (by Zaarouri Abdelmounime)

- Git and GitHub setup
- Environment setup with requirements

## 📌 Ayoub Ennaoui
### 🛠️ Pipeline Design and Implementation

## How It Works

The main script orchestrates a simple pipeline:

1.  **📦 Fetch Products**: It first calls a function to retrieve product data, which is stored in `data/raw/products.json`.
2.  **📝 Generate Descriptions**: For each product, it uses its details (title, category, price, rating) to generate a descriptive text.
3.  **💾 Save Files**: Each description is saved as a separate `.txt` file in the `data/descriptions/` directory. The filename is a URL-friendly "slug" of the product title.

---

## Usage

You can run the pipeline for all products or filter for a specific category.

**1. Run for all products:**

```bash
python your_script_name.py
```

**2. Run for selected category:**

```bash
python your_script_name.py category=example_category
```



