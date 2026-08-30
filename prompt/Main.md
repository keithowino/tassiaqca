## Test 1

```http
GET {{baseUrl}}/marketplace/search/offerings
Accept: application/json
```

```js
// Response

{"success":true,"message":"Marketplace offerings search completed successfully.","data":{"data":[{"id":"6a93cac151a28019a18f61b2","businessId":"6a9017d39104fee22462410a","type":"DIGITAL_DOWNLOAD","name":"TassiaQCA Architecture Guide","slug":"tassiaqca-architecture-guide","shortDescription":"","description":"Digital architecture documentation.","visibility":"PUBLIC","featured":false,"metadata":{}},{"id":"6a927def6af38dc49ad4f75d","businessId":"6a9017d39104fee22462410a","type":"PRODUCT","name":"Marketplace Test Product","slug":"marketplace-test-product","shortDescription":"A product created to verify Marketplace aggregation.","description":"This offering is being created specifically to verify that published Marketplace-visible offerings are returned by the Marketplace API.","visibility":"PUBLIC","featured":true,"metadata":{}}],"pagination":{"total":2,"page":1,"limit":20,"totalPages":1}}}
```

There is no need for curry out the rest `search/offerings` test, you have built a working structure and i trust it will deliver. Let's proceed to add Business Search or additional search dimensions.
