I would not create useMarketplaceDiscovery() yet.

At this point only one page needs the data, and the fetching logic is simple enough that introducing a hook would be abstraction without demonstrated reuse.

We can add a Marketplace hook once the same discovery state-management pattern appears on multiple pages.

So the immediate structure remains:

```text
marketplace/
├── components/
│
├── layouts/
│   └── MarketplaceLayout.jsx
│
├── pages/
│   └── MarketplaceHomePage.jsx
│
├── routes/
│   └── marketplace.routes.jsx
│
├── services/
│   ├── index.js
│   └── marketplace.service.js
│
└── index.js
```

The initial page can therefore establish:

```text
MarketplaceHomePage
│
├── Hero / introduction
│
├── Featured Offerings
│
├── Trending Offerings
│
└── Businesses
```
