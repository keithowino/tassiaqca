## Expected first response

- For an active business such as:

```text
name: "Tassia Electronics"
businessType: "RETAIL"
description: "..."
logo: "..."
coverImage: "..."
verified: true
```

the endpoint should ultimately return:

```js
{
	"success": true,
	"message": "Marketplace businesses retrieved successfully.",
	"data": {
		"data": [
			{
				"id": "...",
				"name": "Tassia Electronics",
				"slug": "tassia-electronics",
				"description": "...",
				"businessType": "RETAIL",
				"logo": "...",
				"coverImage": "...",
				"verified": true
			}
		],
		"pagination": {
			"total": 1,
			"page": 1,
			"limit": 20,
			"totalPages": 1
		}
	}
}
```

And importantly, an inactive Business must not appear.

- This establishes the first Business Discovery contract without prematurely implementing:
    - nearby businesses
    - locations
    - verification
    - marketplace visibility
    - featured businesses
    - business profiles
        - branches
        - operating hours
        - reviews
        - ratings
        - categories
        - recommendations
        - search infrastructure
        - persistent Marketplace projections

- Those belong to subsequent slices. The Architecture Specification explicitly treats Discovery as broader exploration functionality and Business Profiles as a separate responsibility containing identity, branding, contact information, operating hours, location, gallery, reviews, ratings and published offerings.
