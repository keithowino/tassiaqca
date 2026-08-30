## Test 1

```http
GET {{baseUrl}}/marketplace/search/businesses
Accept: application/json
```

```js
// Response

{"success":true,"message":"Marketplace business search completed successfully.","data":{"data":[{"id":"6a9017d39104fee22462410a","name":"The Cuniculturist","slug":"the-cuniculturist","description":"Rabbituza...","businessType":"AGRICULTURE","verified":false},{"id":"6a8fee64674abb8fc2b3ece1","name":"Dexta tech","slug":"dexta-tech","description":"IOT devices.","businessType":"RETAIL","verified":false}],"pagination":{"total":2,"page":1,"limit":20,"totalPages":1}}}
```

For your information here are the current states of the following files and a portion of the folder structure:

```js
`~\server\src\modules\marketplace\routes\marketplace.routes.js`;

import { Router } from "express";

import { marketplaceController } from "../controllers/index.js";

import { discoveryRoutes } from "../discovery/index.js";
import { searchRoutes } from "../search/index.js";

const router = Router();

router.get("/offerings", marketplaceController.listOfferings);

router.use("/discovery", discoveryRoutes);

router.use("/search", searchRoutes);

export default router;
```

```js
`~\server\src\modules\marketplace\search\routes\search.routes.js`;

import { Router } from "express";

import { searchController } from "../controllers/index.js";

const router = Router();

router.get("/offerings", searchController.searchOfferings);

router.get("/businesses", searchController.searchBusinesses);

export default router;
```

```js
`~\server\src\modules\marketplace\search\controllers\search.controller.js`;

import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { searchService } from "../services/index.js";
import {
	businessSearchQuerySchema,
	searchOfferingsQuerySchema,
} from "../validators/index.js";

const searchOfferings = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: searchOfferingsQuerySchema,
		},
		req,
	);

	const result = await searchService.searchOffering(query);

	return success(
		res,
		result,
		"Marketplace offerings search completed successfully.",
	);
});

const searchBusinesses = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: businessSearchQuerySchema,
		},
		req,
	);

	const result = await searchService.searchBusiness(query);

	return success(
		res,
		result,
		"Marketplace business search completed successfully.",
	);
});

export default {
	searchOfferings,
	searchBusinesses,
};
```

```js
`~\server\src\modules\marketplace\search\services\search.service.js`;

import {
	businessSearchRepository,
	searchOfferingRepository,
} from "../repositories/index.js";

import {
	businessSearchPresenter,
	searchOfferingPresenter,
} from "../presenters/index.js";

class SearchService {
	async searchBusiness(query = {}) {
		const result = await businessSearchRepository.search(query);

		return businessSearchPresenter.present(result);
	}

	async searchOffering(query = {}) {
		const result = await searchOfferingRepository.findPublished(query);

		return searchOfferingPresenter.presentCollection(result);
	}
}

export default new SearchService();
```

```bash
├── server/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── marketplace/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.controller.js
│   │   │   │   ├── discovery/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── businessDiscovery.controller.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.controller.js
│   │   │   │   │   │   └── trendingOffering.controller.js
│   │   │   │   │   ├── presenters/
│   │   │   │   │   │   ├── businessDiscovery.presenter.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── offeringDiscovery.presenter.js
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── businessDiscovery.repository.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.repository.js
│   │   │   │   │   │   └── trendingOffering.repository.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   ├── discovery.routes.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── businessDiscovery.service.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.service.js
│   │   │   │   │   │   └── trendingOffering.service.js
│   │   │   │   │   ├── validators/
│   │   │   │   │   │   ├── businessDiscoveryQuery.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscoveryQuery.schema.js
│   │   │   │   │   │   └── trendingOfferingsQuery.schema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceOffering.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceOffering.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.routes.js
│   │   │   │   ├── search/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.controller.js
│   │   │   │   │   ├── presenters/
│   │   │   │   │   │   ├── businessSearch.presenter.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOffering.presenter.js
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── businessSearch.repository.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOffering.repository.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.routes.js
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.service.js
│   │   │   │   │   ├── validators/
│   │   │   │   │   │   ├── businessSearchQuery.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOfferingsQuery.schema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceQuery.schema.js
│   │   │   │   ├── index.js
│   │   │   │   └── README.md
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...
```

No need to carry out the rest of the REST testing of Business Search

## Longer-Term Marketplace Roadmap

```text
Marketplace Foundation
        ↓
Offering Aggregation            ✓
        ↓
Business Discovery              ✓
        ↓
Offering Discovery              ✓
        ↓
Search & Filtering              ✓
        ↓
Categories                      ← NEXT
        ↓
Business Profiles
        ↓
Offering Profiles
        ↓
Nearby / Maps
        ↓
Favorites / Collections
        ↓
Reviews
        ↓
Recommendations
        ↓
Checkout / Booking / Request
```
