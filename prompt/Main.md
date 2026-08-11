## Test 9 — Media Metadata

```js
// Response

{"success":true,"message":"Offering created successfully.","data":{"id":"6a7ae6d423b3228a92576f72","businessId":"6a72d57f8b94e4f1232d4112","type":"PRODUCT","slug":"dell-latitude-7490-media-metadata-test","name":"Dell Latitude 7490 Media Metadata Test","shortDescription":"","description":"","status":"DRAFT","visibility":"PUBLIC","searchable":true,"featured":false,"categories":[],"tags":[],"media":[{"assetId":"asset-dell-7490-metadata-009","type":"IMAGE","url":"https://example.com/images/dell-latitude-7490.jpg","alt":"Dell Latitude 7490","title":"Dell Latitude 7490 Main Image","position":0,"featured":true,"metadata":{"width":1920,"height":1080,"format":"jpg","source":"product-gallery"},"_id":"6a7ae6d423b3228a92576f73"}],"seo":{"title":"","description":"","keywords":[],"canonicalUrl":"","ogImage":""},"metadata":{},"createdAt":"2026-08-11T09:09:40.485Z","updatedAt":"2026-08-11T09:09:40.485Z"}}
```

## Test 10 — All Supported Media Types

```js
// Response

{"success":true,"message":"Offering created successfully.","data":{"id":"6a7ae93bdb5fdb669bd5b52e","businessId":"6a72d57f8b94e4f1232d4112","type":"PRODUCT","slug":"dell-latitude-7490-media-types-test","name":"Dell Latitude 7490 Media Types Test","shortDescription":"","description":"","status":"DRAFT","visibility":"PUBLIC","searchable":true,"featured":false,"categories":[],"tags":[],"media":[{"assetId":"asset-image-010","type":"IMAGE","url":"https://example.com/images/dell-latitude-7490.jpg","alt":"","title":"","position":0,"featured":false,"_id":"6a7ae93bdb5fdb669bd5b52f"},{"assetId":"asset-video-010","type":"VIDEO","url":"https://example.com/videos/dell-latitude-7490.mp4","alt":"","title":"","position":1,"featured":false,"_id":"6a7ae93bdb5fdb669bd5b530"},{"assetId":"asset-document-010","type":"DOCUMENT","url":"https://example.com/documents/dell-latitude-7490-specification.pdf","alt":"","title":"","position":2,"featured":false,"_id":"6a7ae93bdb5fdb669bd5b531"},{"assetId":"asset-audio-010","type":"AUDIO","url":"https://example.com/audio/dell-latitude-7490.mp3","alt":"","title":"","position":3,"featured":false,"_id":"6a7ae93bdb5fdb669bd5b532"}],"seo":{"title":"","description":"","keywords":[],"canonicalUrl":"","ogImage":""},"metadata":{},"createdAt":"2026-08-11T09:19:55.902Z","updatedAt":"2026-08-11T09:19:55.902Z"}}
```

Tests 2 — Create Product with Multiple Media Items, 3 — Create Product Without Media, 4 — Empty Media Array, 5 — Missing Asset ID, 6 — Empty Asset ID, 7 — Invalid Media Type, 8 — Invalid Media URL, 11 — Update Offering Media, 12 — Remove All Media, 13 — Update Offering Without Media and 15 — Exceed Maximum Media Items all passed successfully and or returned the expected responses.
