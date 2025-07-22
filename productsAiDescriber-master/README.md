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

