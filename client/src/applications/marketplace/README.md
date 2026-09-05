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

---

## What we deliberately did NOT put into OfferingCard

Notice that we haven't added:

```text
price
SKU
inventory
category
product image
Add to cart
Buy now
business name
reviews
ratings
favorite button
```

That's intentional.

The Marketplace currently knows an Offering, not necessarily a Product.

For example, your trending response already contains:

```text
PRODUCT
DIGITAL_DOWNLOAD
```

And the Offering Framework is explicitly intended to support:

```text
Product
Service
Membership
Booking
Rental
Event
Course
Subscription
Package
Digital Download
```

So this component needs to remain valid for all of those types.

---

We haven't implemented a Marketplace Category route yet.

We therefore shouldn't pretend these buttons navigate somewhere that doesn't exist.

The progression should be:

```text
V1
Browse Categories
      ↓
Display available categories
      ↓
Category route
      ↓
CategoryPage
      ↓
Actual category navigation
```

Once the Category page exists, these can become proper React Router links.

---

## Category navigation recommended implementation sequence

```text
A. Offering Categories boundary
        ↓
B. Offering Marketplace query contract
        ↓
B2. Marketplace search validator
        ↓
C. REST-test category-filtered offerings
        ↓
D. Confirm/fix Marketplace service boundary
        ↓
E. REST-test final endpoint
        ↓
F. Marketplace frontend
        ↓
G. CategoryPage
        ↓
H. /marketplace/categories/:slug
        ↓
I. Home category Links
        ↓
J. Browser-test Accessories
        ↓
K. Browser-test Business Laptops
```

---

## One deliberate limitation

We're not implementing recursive parent-category behavior here.

For example:

```text
Accessories
└── Business Laptops
```

does not mean that requesting Accessories automatically returns every descendant category's offerings.

That is the correct behavior for this slice. If we later want hierarchical category browsing—where selecting Accessories includes Business Laptops and other descendants—that should be designed as a separate category-query capability rather than silently adding recursion to the frontend.

---

## Marketplace search

I would not add pagination controls, autocomplete, debouncing, advanced filters, sorting, or a reusable search hook yet. Those can be introduced after the basic Search slice is working.

### One architectural detail worth noting

I intentionally did not create a useMarketplaceSearch() hook.

At this stage the search workflow belongs only to SearchPage. Creating a hook merely because hooks/ exists would be premature abstraction. Once another Marketplace page needs the same search state/data workflow, we can extract it.

Also, the offering-type list is currently presentation metadata. It does not determine whether an offering is actually searchable or published. Those rules remain on the backend, consistent with the frontend architecture specification.

The selector in `<SearchEntryPoint />` is using fixed offering types, work on that.
