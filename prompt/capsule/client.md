# Client

## The New Frontend Roadmap

This is the sequence I now recommend.

Phase 1 — Platform Gateway

```bash
Home
About
Features
Marketplace Entry
Business Entry
Authentication Entry
```

Phase 2 — Authentication

```bash
Login (covered)
Register (covered)
Forgot Password
Reset Password
Email Verification
```

Phase 3 — Platform Resolution

```bash
Restore Session
Resolve Identity
Resolve Actor
Resolve Business Membership
Resolve Active Business
```

Phase 4 — Business OS

Only now do we begin consuming:

```bash
/navigation
/dashboard
```

---

Later the onboarding wizard layout might eventually become:

```bash
BUSINESS_INFORMATION
        ↓
BUSINESS_IDENTITY
        ↓
LOCATION
        ↓
WORKSPACE_CONFIGURATION
        ↓
TEAM
        ↓
REVIEW
```

---

## BusinessLayout

```bash
WorkspaceProvider
↓
Sidebar
↓
Topbar
↓
Dynamic Navigation
↓
Outlet
```

---

## Marketplace Offering Aggregation

- Marketplace must consume published information rather than own operational data. This is explicitly required by the Architecture Specification.
- The first Marketplace implementation should therefore NOT create a MongoDB MarketplaceOffering collection. That would prematurely establish a second source of truth.
- The marketplaceOffering.model.js requested in the original skeleton should consequently not be a Mongoose model at this stage. I recommend leaving it out until we introduce an actual derived/read model backed by publication events.
- The Marketplace repository can initially act as a source adapter over an explicit Offering read contract, while the eventual implementation can switch to a Marketplace read model/search index without changing the Marketplace service/controller contract.
- The current Offering service already provides listOfferings(), but its current list implementation is still oriented toward a business-scoped operational listing. We should not misuse that method for public Marketplace discovery.

The first public representation will contain only information that already belongs to the Offering contract. We will not add:

price
inventory
SKU
product category
scheduling
availability
reviews
ratings
business profile data

Those belong to later aggregation stages.

I am deliberately not creating models/marketplaceOffering.model.js yet.

That is the correct architectural choice for the current slice.

---

Discovery is intended for exploration and includes:

```text
Featured Businesses
Trending Offerings
Nearby Businesses
New Businesses
Popular Categories
Seasonal Promotions
```

whereas Search is for precise retrieval across businesses, offerings, categories, services, locations, tags, neighborhoods and brands.

---

The public Business Profile is also explicitly expected to expose:

Business Identity
Description
Branding
Contact Information
Operating Hours
Location
Gallery
Reviews
Ratings
Published Offerings

---

We should not create a Marketplace Business model for this first slice.

---

Target architecture

For this slice:

```text
Business
│
├── Business Model
│
├── Business Repository
│       │
│       └── findActiveForMarketplace()
│
├── Business Service
│       │
│       └── listPublishedForMarketplace()
│
└── Public Business Contract
        │
        ↓
Marketplace
│
└── discovery/
    ├── repositories/
    │   └── businessDiscovery.repository.js
    │
    ├── services/
    │   └── businessDiscovery.service.js
    │
    ├── presenters/
    │   └── businessDiscovery.presenter.js
    │
    ├── validators/
    │   └── businessDiscoveryQuery.schema.js
    │
    ├── controllers/
    │   └── businessDiscovery.controller.js
    │
    └── routes/
        └── businessDiscovery.routes.js
```

---

Later, when Business publication becomes a real domain capability, we can evolve this boundary to:

```text
Business
├── active
├── publicationStatus
└── publishedAt
```

---

The existing:

```text
GET /marketplace/offerings
```

is an aggregation/listing API.

The new Discovery API should not simply duplicate that endpoint under another URL.

The distinction should be:

```text
Offering Aggregation
    ↓
"What published offerings exist?"

Offering Discovery
    ↓
"What offerings should we introduce to the customer?"
```

That distinction matters because the Architecture Specification says Discovery is optimized for exploration rather than precise retrieval, while Search is intended for locating specific businesses and offerings.

---

```text
Discovery
    → exploration

Search
    → precise retrieval
```

Discovery includes things such as Featured Businesses and Trending Offerings and is explicitly optimized for exploration rather than precise retrieval.

Search, on the other hand, is intended to locate:

```text
Businesses
Offerings
Categories
Services
Locations
Tags
Neighborhoods
Brands
```

---

We have intentionally not implemented:

```text
Maps / Nearby
Favorites
Reviews
Recommendations
Checkout
Bookings
Customer Dashboard
```

That is not a deficiency in the current slice.

These are legitimate Marketplace capabilities in the architecture.

But we shouldn't implement them merely because they're listed.

The correct question is:

> Which capability should come next based on dependencies and architectural maturity?

For example:

```text
Reviews
   ↓
requires customer identity
   ↓
requires interaction history
   ↓
requires review ownership/moderation
```

Likewise:

```text
Checkout
   ↓
requires commercial transaction flow
   ↓
pricing
   ↓
orders
   ↓
payments
```

And:

```text
Recommendations
   ↓
requires discovery signals
   ↓
customer interactions
   ↓
favorites/history/etc.
```

Eventually the Offering Profile may become something much richer:

```text
Offering
├── Core Information
├── Business
├── Category
├── Media
├── Pricing
├── Variants
├── Availability
├── Reviews
├── Related Offerings
└── Customer Actions
```

---

## Where should the Footer live?

I agree with your proposed direction, but I would make one refinement.

We should not immediately move the existing FooterSection.jsx into shared/layout just because it is a footer.

Instead, distinguish:

Shared footer primitives

Potentially:

```text
client/src/shared/layout/
```

for things such as:

```text
SiteFooter
FooterContainer
FooterColumn
FooterLink
SocialLinks
```

But the Marketplace might later need:

```text
Marketplace
├── Discover
├── Categories
├── Businesses
├── Help
└── Customer account
```

while Gateway might need:

```text
Platform
├── About
├── How it works
├── For Businesses
├── Careers
└── Contact
```

## Target structure

```text
client/src/
├── applications/
│   ├── gateway/
│   │   ├── components/
│   │   ├── layouts/
│   │   │   └── GatewayLayout.jsx
│   │   └── pages/
│   │
│   └── marketplace/
│       ├── components/
│       ├── layouts/
│       │   └── MarketplaceLayout.jsx
│       └── pages/
│
└── shared/
    └── layout/
        ├── AppShell/
        │   ├── AppShell.jsx
        │   └── index.js
        ├── SiteHeader/
        │   ├── SiteHeader.jsx
        │   └── index.js
        ├── SiteFooter/
        │   ├── SiteFooter.jsx
        │   └── index.js
        └── index.js
```

---
