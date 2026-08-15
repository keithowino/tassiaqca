## Test 2 — Set Offering Media

```http
PUT http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a7ef51c7591965d44febf83/media
Authorization: Bearer {{access token}}
Content-Type: application/json

{
	"media": [
		{
			"assetId": "asset-001",
			"type": "IMAGE",
			"url": "https://example.com/product-front.jpg",
			"alt": "Product front view",
			"title": "Product front",
			"position": 0,
			"featured": true,
			"metadata": {}
		},
		{
			"assetId": "asset-002",
			"type": "IMAGE",
			"url": "https://example.com/product-back.jpg",
			"alt": "Product back view",
			"title": "Product back",
			"position": 1,
			"featured": false,
			"metadata": {}
		}
	]
}
```

```js
// Response

{"success":true,"message":"Offering media updated successfully.","data":[{"id":"6a802789d83f791e06852d5f","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ef51c7591965d44febf83","assetId":"asset-001","type":"IMAGE","url":"https://example.com/product-front.jpg","alt":"Product front view","title":"Product front","position":0,"featured":true,"metadata":{},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-15T08:47:05.312Z","updatedAt":"2026-08-15T08:47:05.312Z"},{"id":"6a802789d83f791e06852d60","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ef51c7591965d44febf83","assetId":"asset-002","type":"IMAGE","url":"https://example.com/product-back.jpg","alt":"Product back view","title":"Product back","position":1,"featured":false,"metadata":{},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-15T08:47:05.312Z","updatedAt":"2026-08-15T08:47:05.312Z"}]}
```

Tests 1 — Get Offering Media, 3 — Verify replacement, 4 — Replace with a different collection, 5 — Clear all media, 6 — Validation: invalid media type, 7 — Validation: invalid URL, 8 — Validation: missing asset ID, 9 — Validation: invalid position all passed successfully and or returned the expected responses.

You mentioned an architectural duplication in the current media component implementation; both `media.component.js` and `mediaService.setMedia()` normalize media.

```js
`~\server\src\modules\offering\components\media\services\media.service.js`;

import mongoose from "mongoose";

import { mediaFactory } from "../builders/index.js";
import { mediaPresenter } from "../presenters/index.js";
import { mediaRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

class MediaService {
	async ensureOfferingExists(businessId, offeringId) {
		const offering = await offeringRepository.findByBusinessAndId(
			businessId,
			offeringId,
		);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offering;
	}

	/**
	 * Replaces the complete media collection for an Offering.
	 *
	 * Media assets themselves belong to the Files platform service.
	 * This service only persists the Offering -> media asset relationship
	 * and Offering-specific presentation metadata.
	 */
	async setMedia({ businessId, offeringId, media = [], actor }) {
		/**
		 * 1. Ensure business exists.
		 */
		await businessService.ensureExists(businessId);

		/**
		 * 2. Ensure Offering exists within this business.
		 */
		await this.ensureOfferingExists(businessId, offeringId);

		/**
		 * 3. Normalize media collection.
		 */
		const normalizedMedia = media.map((item, index) => ({
			...item,
			position: item.position ?? index,
			alt: item.alt?.trim() ?? "",
			title: item.title?.trim() ?? "",
			featured: item.featured ?? false,
			metadata: item.metadata ?? {},
		}));

		/**
		 * 4. Start transaction.
		 */
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			/**
			 * 5. Remove existing media assignments.
			 */
			await mediaRepository.deleteByOffering(offeringId, session);

			/**
			 * 6. Build new assignments.
			 */
			const assignments = normalizedMedia.map((item) =>
				mediaFactory.createMediaAssignment({
					businessId,
					offeringId,
					data: item,
					actor,
				}),
			);

			/**
			 * 7. Persist assignments.
			 */
			const created = await mediaRepository.createMany(
				assignments,
				session,
			);

			/**
			 * 8. Commit.
			 */
			await session.commitTransaction();

			/**
			 * 9. Return resulting media assignments.
			 */
			return mediaPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(offeringId) {
		const media = await mediaRepository.findByOffering(offeringId);

		return mediaPresenter.presentCollection(media);
	}
}

export const mediaService = new MediaService();

export default mediaService;
```

```js
`~\server\src\modules\offering\components\media\media.component.js`;

import componentContract from "../component.contract.js";

import mediaSchema from "./validators/media.schema.js";
import { mediaService } from "./services/index.js";

function normalizeMedia(media = []) {
	return media.map((item, index) => ({
		...item,

		position: item.position ?? index,

		alt: item.alt?.trim() ?? "",

		title: item.title?.trim() ?? "",

		featured: item.featured ?? false,

		metadata: item.metadata ?? {},
	}));
}

export const mediaComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.media === undefined) {
			return;
		}

		mediaSchema.parse(context.data.media);
	},

	validateUpdate(context) {
		if (context.data.media === undefined) {
			return;
		}

		mediaSchema.parse(context.data.media);
	},

	beforeCreate(context) {
		if (context.data.media === undefined) {
			return;
		}

		context.data.media = normalizeMedia(context.data.media);
	},

	beforeUpdate(context) {
		if (context.data.media === undefined) {
			return;
		}

		context.data.media = normalizeMedia(context.data.media);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.media === undefined) {
			return;
		}

		const media = await mediaService.setMedia({
			businessId,
			offeringId: offering.id,
			media: data.media,
			actor,
		});

		state.media = media;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.media === undefined) {
			return;
		}

		const media = await mediaService.setMedia({
			businessId,
			offeringId: offering.id,
			media: data.media,
			actor,
		});

		state.media = media;
	},
};

export default mediaComponent;
```

Thus you were recommending that we leave the service responsible for defensive normalization only if the service is intended to be independently callable. Otherwise, the component should own request/component preparation and the service should focus on its domain operation. So what cleanup step are we taking?
