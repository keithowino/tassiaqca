## Test 1 - Create Product Offering with Pricing

The three documents were created Offering, Product and Pricing

The Pricing document created:

```js
{
  _id: ObjectId('6a76db1ca1039c18805de5e8'),
  business: ObjectId('6a72d57f8b94e4f1232d4112'),
  offering: ObjectId('6a76db1ca1039c18805de5e7'),
  amount: NumberDecimal('185000'),
  costPrice: NumberDecimal('160000'),
  currency: 'KES',
  billingModel: 'ONE_TIME',
  effectiveFrom: ISODate('2026-08-08T07:30:36.533Z'),
  effectiveTo: null,
  isCurrent: true,
  status: 'ACTIVE',
  changeReason: 'Initial launch price',
  metadata: {},
  createdBy: ObjectId('6a72d55a8b94e4f1232d4110'),
  updatedBy: null,
  createdAt: ISODate('2026-08-08T07:30:36.559Z'),
  updatedAt: ISODate('2026-08-08T07:30:36.559Z')
}
```

## Test 2 - Missing Pricing

Performed as expected, no Pricing document was created.

## Test 3 — Invalid Amount

```js
// Payload

{
    "type": "PRODUCT",
    "name": "Dell XPS 14",
    "sku": " dx14-001 ",

    "pricing": {
        "amount": -5
    }
}
```

```js
// Response

{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Validation failed.","details":[{"origin":"number","code":"too_small","minimum":0,"inclusive":true,"path":["amount"],"message":"Too small: expected number to be >=0"}]}}
```

## Test 4 — Invalid Currency

```js
// Payload

{
    "type": "PRODUCT",
    "name": "Dell XPS 14",
    "sku": " dx14-001 ",

    "pricing": {
        "amount": 185000,
        "currency": "EURO"
    }
}
```

```js
// Response

{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Validation failed.","details":[{"code":"invalid_value","values":["KES","USD","UGX","TZS"],"path":["currency"],"message":"Invalid option: expected one of \"KES\"|\"USD\"|\"UGX\"|\"TZS\""}]}}
```

## Test 5 — Update Offering Price

Performed as expected, now we have to pricing documents the old and the new.

## Test 6 — Update Only Offering Fields

Performed as expected, pricing collection remained unchanged.

## Test 7 — Multiple Price Changes

Performed as expected, only one document has `isCurrent = true`.
