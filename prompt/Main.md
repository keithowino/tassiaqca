## Test 1 — Product with Attributes

```http
POST http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "type": "PRODUCT",
    "name": "Dell XPS 16",
    "shortDescription": "High-performance developer laptop",
    "description": "Intel Core Ultra processor, 32GB RAM, 1TB SSD",
    "sku": " dx16-001 ",
    "attributes": [
		{
			"name": "Color",
			"values": ["Black", "Silver"]
		},
		{
			"name": "RAM",
			"values": ["16GB", "32GB"]
		}
	]
}
```

```bash
# Response

All the relevant documents were successfully created.
```

## Test 2 — Create Variant

```http
POST http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a854c142d518df25ad831b2/variants
Authorization: Bearer {{access token}}
Content-Type: application/json

{
	"sku": "XPS15-BLK-16",
	"attributes": [
		{
			"name": "Color",
			"value": "Black"
		},
		{
			"name": "RAM",
			"value": "16GB"
		}
	]
}
```

```js
// Response

{"success":true,"message":"Offering variant created successfully.","data":{"id":"6a854d752d518df25ad831b7","business":"6a72d57f8b94e4f1232d4112","offering":"6a854c142d518df25ad831b2","sku":"XPS15-BLK-16","slug":"color-black-ram-16gb","attributes":[{"name":"Color","value":"Black"},{"name":"RAM","value":"16GB"}],"attributeCount":2,"status":"ACTIVE","createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-19T06:30:13.853Z","updatedAt":"2026-08-19T06:30:13.853Z"}}
```

## Test 3 — List variants

```http
GET http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a854c142d518df25ad831b2/variants
Authorization: Bearer {{access token}}
```

```js
// Response

{"success":false,"error":{"code":"INTERNAL_SERVER_ERROR","message":"Internal Server Error","details":null}}
```

```bash
[🟦SERVER] TypeError: query.parse is not a function
[🟦SERVER]     at validateRequest (file:///C:/software_develpment/1_projects/tassiaqca/server/src/shared/validation/validateRequest.js:23:25)
[🟦SERVER]     at file:///C:/software_develpment/1_projects/tassiaqca/server/src/modules/offering/components/variants/controllers/variants.controller.js:18:28
[🟦SERVER]     at file:///C:/software_develpment/1_projects/tassiaqca/server/src/shared/utils/asyncHandler.js:3:19
[🟦SERVER]     at Layer.handleRequest (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\lib\layer.js:152:17)
[🟦SERVER]     at next (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\lib\route.js:157:13)
[🟦SERVER]     at file:///C:/software_develpment/1_projects/tassiaqca/server/src/modules/identity/middleware/requirePermission.js:38:4
[🟦SERVER]     at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
[🟦SERVER] AppError: Internal Server Error
[🟦SERVER]     at errorHandler (file:///C:/software_develpment/1_projects/tassiaqca/server/src/shared/errors/errorHandler.js:23:9)
[🟦SERVER]     at Layer.handleError (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\lib\layer.js:116:17)
[🟦SERVER]     at trimPrefix (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:340:13)
[🟦SERVER]     at C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:297:9
[🟦SERVER]     at processParams (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:582:12)
[🟦SERVER]     at next (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:291:5)
[🟦SERVER]     at uploadErrorHandler (file:///C:/software_develpment/1_projects/tassiaqca/server/src/shared/errors/uploadErrorHandler.js:56:2)
[🟦SERVER]     at Layer.handleError (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\lib\layer.js:116:17)
[🟦SERVER]     at trimPrefix (C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:340:13)
[🟦SERVER]     at C:\software_develpment\1_projects\tassiaqca\server\node_modules\router\index.js:297:9
```

```js
`~\server\src\modules\offering\components\variants\controllers\variants.controller.js`;

// ...

const getList = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessOfferingParamsSchema,

			query: {
				includeArchived: undefined,
			},
		},
		req,
	);

	const variants = await variantsService.list({
		businessId: params.businessId,
		offeringId: params.offeringId,
		includeArchived: query.includeArchived !== "false",
	});

	return success(res, variants, "Offering variants retrieved successfully.");
});

// ...
```

When i comment this part:

```js
query: {
    includeArchived: undefined,
},
```

it response as expected. Why did you recommend adding it to the structure of the `getList` function in the controller?

## Test 4 — Get variant

```http
GET http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a854c142d518df25ad831b2/variants/6a854d752d518df25ad831b7
Authorization: Bearer {{access token}}
```

```js
// Response

{"success":true,"message":"Offering variant retrieved successfully.","data":{"id":"6a854d752d518df25ad831b7","business":"6a72d57f8b94e4f1232d4112","offering":"6a854c142d518df25ad831b2","sku":"XPS15-BLK-16","slug":"color-black-ram-16gb","attributes":[{"name":"Color","value":"Black"},{"name":"RAM","value":"16GB"}],"attributeCount":2,"status":"ACTIVE","createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-19T06:30:13.853Z","updatedAt":"2026-08-19T06:30:13.853Z"}}
```

## Test 6 — Invalid attribute

```http
POST http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a854c142d518df25ad831b2/variants
Authorization: Bearer {{access token}}
Content-Type: application/json

{
	"sku": "XPS15-RED-16",
	"attributes": [
		{
			"name": "Color",
			"value": "Red"
		},
		{
			"name": "RAM",
			"value": "16GB"
		}
	]
}
```

```js
// Response

{"success":false,"error":{"code":"BAD_REQUEST","message":"Value \"Red\" is not valid for attribute \"Color\".","details":null}}
```

## Test 11 — Invalid Offering Type

- Attempting to create a variant under a SERVICE offering.

```js
// Response

{"success":false,"error":{"code":"BAD_REQUEST","message":"Variants are currently supported only for Product offerings.","details":null}}
```

## Test 12 — Lifecycle integration

```http
POST http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings
Authorization: Bearer {{access token}}
Content-Type: application/json

{
	"type": "PRODUCT",
	"name": "Dell XPS 15",
	"sku": "DXPS15",
	"attributes": [
		{
			"name": "Color",
			"values": ["Black", "Silver"]
		},
		{
			"name": "RAM",
			"values": ["16GB", "32GB"]
		}
	],
	"variants": [
		{
			"sku": "DXPS15-BLK-16",
			"attributes": [
				{
					"name": "Color",
					"value": "Black"
				},
				{
					"name": "RAM",
					"value": "16GB"
				}
			]
		}
	]
}
```

```bash
# Response

All the relevant documents were successfully created.
```

Tests 5 — Duplicate combination, 7 — Duplicate SKU, 8 — Update, 9 — Archive, 10 — Restore all passed successfully and or returned the expected responses.
