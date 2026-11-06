# NourishNest content import

This repository now contains the NourishNest website content supplied in the project ZIP.

- `data/recipes.json` contains 500 structured Filipino recipes: 50 each for pork, beef, chicken, seafood, fish, side dishes, appetizers, soups, desserts, and beverages. Each recipe includes its description, ingredients, cooking steps, serving information, and available tips.
- `data/guidance.json` contains the complete meal-management, diet-and-nutrition, and personalized-menu-planning source content used by the learning-library modal.
- `assets/recipe-photos/` contains all 40 embedded food photos extracted from the supplied Word documents.
- `content/source-documents/` preserves the original 12 Word documents for future editing and reference.

The static site remains basic HTML, CSS, and JavaScript. The recipe browser loads the JSON files, supports category filters and search, and opens full recipe details in a modal. The learning cards open the imported guidance sections.
