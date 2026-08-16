## Test 2 — Set Offering SEO

```js
// Payload

{
	"title": "Dexta Tech Electronics",
	"description": "Shop quality electronics, computers, accessories and technology products from Dexta Tech.",
	"keywords": [
		"electronics",
		"computers",
		"laptops",
		"accessories"
	],
	"canonicalUrl": "https://example.com/products/dexta-tech-electronics",
	"ogImage": "https://example.com/images/dexta-tech-electronics.jpg"
}

// Response

{"success":true,"message":"Offering SEO updated successfully.","data":{"id":"6a81bbdb1df8762a0291df0b","business":"6a72d57f8b94e4f1232d4112","offering":"6a818dc664e7e4b542b3a4e8","title":"Dexta Tech Electronics","description":"Shop quality electronics, computers, accessories and technology products from Dexta Tech.","keywords":["electronics","computers","laptops","accessories"],"canonicalUrl":"https://example.com/products/dexta-tech-electronics","ogImage":"https://example.com/images/dexta-tech-electronics.jpg","createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-16T13:32:11.871Z","updatedAt":"2026-08-16T13:32:11.871Z"}}
```

Tests 1 — Get Offering SEO, 3 — Verify SEO With GET, 4 — Verify Replacement, 5 — Verify Replacement With GET, 6 — Normalization: Trim Strings, 7 — Normalization: Lowercase Keywords, 8 — Normalization: Duplicate Keywords, 9 — Validation: Invalid Keyword Type, 10 — Validation: Empty Keyword, 11 — Validation: Whitespace-Only Keyword, 12 — Validation: Title Exceeds Maximum Length, 13 — Validation: Description Exceeds Maximum Length, 14 — Validation: Keyword Exceeds Maximum Length, 15 — Validation: Too Many Keywords, 16 — Validation: Invalid Canonical URL, 17 — Validation: Invalid OG Image URL, 18 — Optional Fields, 19 — Offering Not Found, 20 — Cross-Business Offering Protection, 21 — Clear SEO all passed successfully and or returned the expected responses.

---

Conversion of the current offering component structure from the previous state to:

```bash
├── builders/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── media.component.js
```

complete.

Before we proceed to creating the remaining offering components i would like for us to update the projects README.md file. It follows the previous state of the project way back before we even begun constructing it's business domain. I want to update it so that it may fit our current vision, expectations and or ambitions. modify where needed and return the updated version
