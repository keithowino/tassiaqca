## Test 2 — Set Offering Attributes

```js
// Response

{"success":true,"message":"Offering attributes updated successfully.","data":[{"id":"6a80b5184f462df58589add7","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ef51c7591965d44febf83","name":"Color","values":["Black","White","Blue"],"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-15T18:51:04.151Z","updatedAt":"2026-08-15T18:51:04.151Z"},{"id":"6a80b5184f462df58589add8","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ef51c7591965d44febf83","name":"Size","values":["Small","Medium","Large"],"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-15T18:51:04.152Z","updatedAt":"2026-08-15T18:51:04.152Z"}]}
```

## Test 8 — Normalization: Duplicate Values

```js
// Payload

{
	"attributes": [
		{
			"name": "Color",
			"values": [
				"Black",
				"black",
				" BLACK ",
				"White",
				"white"
			]
		}
	]
}

// Response

{"success":true,"message":"Offering attributes updated successfully.","data":[{"id":"6a80b6b54f462df58589addb","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ef51c7591965d44febf83","name":"Color","values":["Black","black","BLACK","White","white"],"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-15T18:57:57.738Z","updatedAt":"2026-08-15T18:57:57.738Z"}]}
```

## Test 9 — Normalization: Duplicate Attribute Names

```js
// Payload

{
	"attributes": [
		{
			"name": "Color",
			"values": [
				"Black",
				"White"
			]
		},
		{
			"name": "color",
			"values": [
				"Red",
				"Blue"
			]
		}
	]
}

// Response

{"success":false,"error":{"code":"INTERNAL_SERVER_ERROR","message":"Internal Server Error","details":null}}
```

```bash
[🟦SERVER] [Validation] Incoming body {
[🟦SERVER]   attributes: [
[🟦SERVER]     { name: 'Color', values: [Array] },
[🟦SERVER]     { name: 'color', values: [Array] }
[🟦SERVER]   ]
[🟦SERVER] }
[🟦SERVER] [Validation] Parsed body {
[🟦SERVER]   attributes: [
[🟦SERVER]     { name: 'Color', values: [Array] },
[🟦SERVER]     { name: 'color', values: [Array] }
[🟦SERVER]   ]
[🟦SERVER] }
[🟦SERVER] MongoBulkWriteError: E11000 duplicate key error collection: tassiaqca_branch_db.offeringattributes index: offering_1_name_1 collation: { locale: "en", caseLevel: false, caseFirst: "off", strength: 2, numericOrdering: false, alternate: "non-ignorable", maxVariable: "punct", normalization: false, backwards: false, version: "57.1" } dup key: { offering: ObjectId('6a7ef51c7591965d44febf83'), name: "CollationKey(0x2d453f454b0109)" }
[🟦SERVER]     at OrderedBulkOperation.handleWriteError (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongodb\lib\bulk\common.js:802:19)
[🟦SERVER]     at executeCommands (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongodb\lib\bulk\common.js:346:23)
[🟦SERVER]     at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
[🟦SERVER]     at async OrderedBulkOperation.execute (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongodb\lib\bulk\common.js:791:16)
[🟦SERVER]     at async Collection.bulkWrite (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongodb\lib\collection.js:224:16)
[🟦SERVER]     at async Collection.insertMany (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongodb\lib\collection.js:171:25)
[🟦SERVER]     at async model._insertMany (C:\software_develpment\1_projects\tassiaqca\server\node_modules\mongoose\lib\model.js:3173:11)
[🟦SERVER]     at async AttributesService.setAttributes (file:///C:/software_develpment/1_projects/tassiaqca/server/src/modules/offering/components/attributes/services/attributes.service.js:56:20)
[🟦SERVER]     at async file:///C:/software_develpment/1_projects/tassiaqca/server/src/modules/offering/components/attributes/controllers/attributes.controller.js:39:21 {
[🟦SERVER]   errorLabelSet: Set(0) {},
[🟦SERVER]   errorResponse: {
[🟦SERVER]     message: `E11000 duplicate key error collection: tassiaqca_branch_db.offeringattributes index: offering_1_name_1 collation: { locale: "en", caseLevel: false, caseFirst: "off", strength: 2, numericOrdering: false, alternate: "non-ignorable", maxVariable: "punct", normalization: false, backwards: false, version: "57.1" } dup key: { offering: ObjectId('6a7ef51c7591965d44febf83'), name: "CollationKey(0x2d453f454b0109)" }`,
[🟦SERVER]     code: 11000,
[🟦SERVER]     writeErrors: [ [Object] ]
[🟦SERVER]   },
[🟦SERVER]   code: 11000,
[🟦SERVER]   writeErrors: [ { err: [Object], index: 1 } ],
[🟦SERVER]   result: BulkWriteResult {
[🟦SERVER]     insertedCount: 1,
[🟦SERVER]     matchedCount: 0,
[🟦SERVER]     modifiedCount: 0,
[🟦SERVER]     deletedCount: 0,
[🟦SERVER]     upsertedCount: 0,
[🟦SERVER]     upsertedIds: {},
[🟦SERVER]     insertedIds: { '0': new ObjectId('6a80b82632b33c0b3a6a85e3') }
[🟦SERVER]   },
[🟦SERVER]   insertedDocs: [
[🟦SERVER]     {
[🟦SERVER]       business: new ObjectId('6a72d57f8b94e4f1232d4112'),
[🟦SERVER]       offering: new ObjectId('6a7ef51c7591965d44febf83'),
[🟦SERVER]       name: 'Color',
[🟦SERVER]       values: [Array],
[🟦SERVER]       createdBy: new ObjectId('6a72d55a8b94e4f1232d4110'),
[🟦SERVER]       updatedBy: new ObjectId('6a72d55a8b94e4f1232d4110'),
[🟦SERVER]       _id: new ObjectId('6a80b82632b33c0b3a6a85e3'),
[🟦SERVER]       createdAt: 2026-08-15T19:04:06.908Z,
[🟦SERVER]       updatedAt: 2026-08-15T19:04:06.908Z
[🟦SERVER]     }
[🟦SERVER]   ]
[🟦SERVER] }
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

Tests 1 — Get Offering Attributes, 3 — Verify Replacement, 4 — Verify Replacement With GET, 5 — Clear All Attributes, 6 — Verify Attributes Were Cleared, 7 — Normalization: Trim Attribute Names and Values, 10 — Validation: Missing Attribute Name, 11 — Validation: Empty Attribute Name, 12 — Validation: Missing Values, 13 — Validation: Empty Values, 14 — Validation: Invalid Value Type, 15 — Validation: Attribute Name Exceeds Maximum Length, 16 — Validation: Attribute Value Exceeds Maximum Length, 17 — Validation: Too Many Attributes, 18 — Offering Not Found, 19 — Cross-Business Offering Protection all passed successfully and or returned the expected responses.

```js
`~\server\src\modules\offering\components\attributes\models\attributes.model.js`;

import mongoose from "mongoose";

const attributesSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			// index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},

		values: {
			type: [String],
			required: true,
			validate: {
				validator(values) {
					return values.length >= 1 && values.length <= 100;
				},
				message: "An attribute must contain between 1 and 100 values.",
			},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

attributesSchema.index({
	offering: 1,
});

attributesSchema.index(
	{
		offering: 1,
		name: 1,
	},
	{
		unique: true,
		collation: {
			locale: "en",
			strength: 2,
		},
	},
);

export const OfferingAttribute =
	mongoose.models.OfferingAttribute ||
	mongoose.model("OfferingAttribute", attributesSchema);

export default OfferingAttribute;
```

```js
`~\server\src\modules\offering\components\attributes\attributes.component.js`;

import componentContract from "../component.contract.js";

import attributesSchema from "./validators/attributes.schema.js";
import { attributesService } from "./services/index.js";

function normalizeAttribute(attribute) {
	const name = attribute.name.trim();

	const values = [];
	const seen = new Set();

	for (const value of attribute.values) {
		const normalizedValue = value.trim();
		const key = normalizedValue.toLowerCase();

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		values.push(normalizedValue);
	}

	return {
		name,
		values,
	};
}

function normalizeAttributes(attributes = []) {
	const normalized = [];
	const seen = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeAttribute(attribute);
		const key = normalizedAttribute.name.toLowerCase();

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

export const attributesComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	validateUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	beforeCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	beforeUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},
};

export default attributesComponent;
```

```js
`~\server\src\modules\offering\components\attributes\services\attributes.service.js`;

import mongoose from "mongoose";

import { attributesFactory } from "../builders/index.js";
import { attributesPresenter } from "../presenters/index.js";
import { attributesRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

class AttributesService {
	async ensureBusinessExists(businessId) {
		return businessService.ensureExists(businessId);
	}

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

	async setAttributes({ businessId, offeringId, attributes = [], actor }) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await attributesRepository.deleteByOffering(offeringId, session);

			const assignments = attributes.map((attribute) =>
				attributesFactory.createAttribute({
					businessId,
					offeringId,
					attribute,
					actor,
				}),
			);

			const created = await attributesRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return attributesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const attributes =
			await attributesRepository.findByOffering(offeringId);

		return attributesPresenter.presentCollection(attributes);
	}
}

export const attributesService = new AttributesService();

export default attributesService;
```
