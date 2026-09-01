# TASSIAQCA - the digital operating system for neighborhood businesses.

## TODO

- Not now, but eventually, `"lint": "eslint"`. We'll introduce ESLint after we've built a reasonable amount of the backend.
- It will come a moment when i will have introduced payments, delivery, accounting, commissions, Mpesa, receipts, invoices, booking, etc., that assumption begins to break down.
- Later we can replace Cloudinary with S3 or Azure Blob.

---

## Logout Recommended Implementation Order

- POST /auth/logout (done)
- POST /auth/logout-all (done)
- GET /auth/sessions (done)
- DELETE /auth/sessions/:sessionId (done)
- Change Password
- Forgot Password
- Reset Password
- Email Verification
- MFA

Immediately we gain:

- ✅ Multiple devices
- ✅ Logout one device
- ✅ Logout everywhere
- ✅ Session history
- ✅ Security dashboard
- ✅ Refresh token rotation
- ✅ Future MFA support
- ✅ Device trust

---

```bash
Inventory
├── Milestone 1 — Inventory Core        ✅
├── Milestone 2 — Stock Movements       ✅
├── Milestone 3 — Reservations
├── Milestone 4 — Warehouses (future)
└── Milestone 5 — Transfers (future)
```

## Future Integrations

Stock Movements design implementation prepares the Commerce module for future features without requiring redesign:

- Orders → automatically create SALE movements.
- Purchase Orders → create PURCHASE/STOCK_IN movements.
- Returns → create RETURN movements.
- Warehouses → create TRANSFER_OUT and TRANSFER_IN movements.
- Manufacturing → consume components and produce finished goods through movements.
- Inventory Reports → derive movement history, stock cards, and valuation from the immutable movement ledger.

## Why separate permissions?

- Inventory answers: _"What stock do I currently have?"_
- Stock Movement answers: _"How did it become that quantity?"_
- Many employees should be allowed to view inventory but not create stock adjustments.
- Keeping them separate gives us much finer control later.

---

STOCK_IN
STOCK_OUT
ADJUSTMENT
RETURN
DAMAGE
LOST
SALE
PURCHASE
TRANSFER_IN
TRANSFER_OUT

---

## Future Compatibility

- This design intentionally leaves room for later enhancements without breaking existing APIs:
    - Reusable Attribute and AttributeValue entities.
    - Variant-specific pricing (already supported).
    - Variant-specific inventory (already supported).
    - Variant-specific images (already supported).
    - Search and filtering by variant attributes.
    - Order line items referencing variants.
    - Branch-specific inventory for variants.

---

## After Product Variants

```bash
Business
    │
    ├── Product
    │      │
    │      ├── ProductVariant
    │      │        │
    │      │        ├──────────────┐
    │      │        │              │
    │      │        ▼              ▼
    │      │   ProductPrice   Inventory
    │      │        │              │
    │      │        └──────┐       │
    │      │               ▼       ▼
    │      │          ProductImage
    │      │
    │      ├── Base Product Price
    │      ├── Base Inventory
    │      └── Base Images
    │
    └── Category
```

---

## What happens after the specification?

Then we return to the backend, but with much greater confidence.

We would follow the roadmap you previously approved:

1. Business Configuration Engine (partially implemented)
2. Offering Framework implementation (in progress)
3. Marketplace
4. Industry Modules
5. Frontend implementation (partially implemented)

---

## Proposed Platform Actors

- Visitor
- Customer
- Business
- Business Owner
- Business Administrator
- Business Manager
- Business Staff
- Platform Administrator
- Moderator
- Support
- Developer
- QA Tester
- Integration Client
- Future Mobile Client
- Future AI Agent

---

## Proposed Project Diagram

```bash
                    Platform

                        │

                Platform Gateway

                        │

        ┌───────────────┼───────────────┐

        │               │               │

 Marketplace      Business OS     Administration

                        │

                  Authentication

                        │

                  Identity Layer

                        │

                 Actor Resolution

                        │

             Permissions & Capabilities

                        │

         ┌───────────┬───────────┬───────────┐

         │           │           │

   Commerce      Scheduling    Messaging

         │

    Offer Types

         │

 ┌───────┼────────┬─────────┬──────────┐

 │       │        │         │

Product Service Rental Booking Membership
```

---

## Domain Architecture

### Responsibility

| Commerce        | Marketplace     | Identity       |
| :-------------- | :-------------- | :------------- |
| Catalog         | Discovery       | Authentication |
| Pricing         | Search          | Authorization  |
| Inventory       | Nearby          | Membership     |
| Stock           | Recommendations | Sessions       |
| Orders          | Collections     | Permissions    |
| Returns         | Reviews         |                |
| Offer lifecycle |                 |                |

---

## Proposed implementation plan

This is the sequence I recommend following:

1. Architecture Review (Business Configuration chapters) (done)
2. Capability Registry (done)
3. Module Registry (done)
4. Business Type Registry (done)
5. Business Configuration Model (done)
6. Configuration Service (done)
7. Business Provisioning Pipeline (in progress)
8. Configuration API
9. Navigation API
10. Frontend integration (partially implemented)
11. Resume Offering Framework (in progress)

---

## Data Ownership

To maintain clean domain boundaries:

- Business Domain owns the business entity (identity, ownership, lifecycle).
- Business Configuration Domain owns configuration (modules, capabilities, feature flags, navigation).
- Commerce Domain owns commerce functionality (products, categories, inventory, etc.).
- Frontend consumes configuration but does not define it.

---

## Scope Breakdown

Instead of building everything at once, we'll divide the engine into six milestones.

1. Milestone 1 — Platform Registry Foundation (covered)
    - Capability Registry
    - Module Registry
    - Business Type Registry
2. Milestone 2 — Business Configuration Model (covered)
3. Milestone 3 — Configuration Service (covered)
    - Step 1 — Integrate Business Creation
    - Step 2 — Business Retrieval
    - Step 3 — Startup Validation
    - Step 4 — Domain Events (Preparation)
4. Milestone 4 — Business Provisioning (covered)
5. Milestone 5 — Navigation Generation (covered)
    - 5.1 Navigation Registry
    - 5.2 Navigation Builder
    - 5.3 Navigation Service
    - 5.4 Navigation API
    - 5.5 Dashboard Registry
    - 5.6 Dashboard Builder
    - 5.7 Frontend Dynamic Rendering
6. Milestone 6 — Configuration Management

---

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

## The order I would follow

1. Phase A — Authentication UI
2. Phase B — Backend Integration
3. Phase C — Session Infrastructure
4. Phase D — Route Guards

---

- Postpone the handling of:

```bash
Forgot Password
Reset Password
Email Verification
```

- They are important, but the backend does not yet support endpoints for these flows.

---

## Implementation recommendation

1. Login (covered)
2. Register (covered)
3. Session restore
4. Logout
5. Route guards
6. Business selection (covered)
7. Business OS bootstrap (covered)
8. Forgot Password
9. Reset Password
10. Email Verification

---

## Remaining Phase

1. Route Security
2. Business Onboarding Application (covered)
3. API Layer Standardization
4. Notification System
5. Loading Experience
6. Error Experience
7. Dynamic Business Shell:

    ```bash
    /navigation

    /dashboard
    ```

    - The frontend still needs to consume them.

8. Dynamic Widget Renderer
9. Marketplace Shell
10. Administration Shell
11. Business Switcher
12. Permissions UI

---

## After the Wizard

Once the wizard is complete, I think the frontend will be in an excellent position to return to backend development.

The next backend milestone would naturally be:

```bash
Business Configuration Engine v2
↓
Module Configuration
↓
Capability Configuration
↓
Feature Flags
↓
Dashboard Configuration
```

because the onboarding wizard will already have a "Review Configuration" step ready to consume that richer data.

---

Later the onboarding wizard layout might become

```bash
BUSINESS_INFORMATION
        ↓
BUSINESS_IDENTITY
        ↓
REVIEW
```

and eventually

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

## Revised roadmap

This is the sequence I recommend now:

### Phase 1 — Workspace Provisioning Engine

- Return the created business from onboarding. (covered)
- Introduce a bootstrap session to carry the target business into Bootstrap. (covered)
- Refactor Bootstrap into Provider → Engine → Loader. (covered)
- Load identity, business, configuration, navigation, and dashboard during provisioning.

### Phase 2 — Workspace Context (covered)

- Create a WorkspaceProvider and useWorkspace hook.
- Store the provisioned workspace (business, configuration, navigation, dashboard, permissions) in a shared context.

### Phase 3 — Dynamic Business Workspace

- Refactor BusinessLayout to consume WorkspaceContext. (covered)
- Generate the sidebar and routes from the navigation returned by the backend. (covered)
- Remove direct navigation fetching from BusinessWorkspace.

---

## The platform now has multiple actor journeys

Your platform now has at least four completely different entry points.

```bash
                    Visitor
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
 Marketplace      Start Business    Join Business
        │              │              │
        ▼              ▼              ▼
 Consumer        Business Owner     Business Member

                       │
                       ▼
                Business Workspace

And later...

Administrator
      │
      ▼
 Admin Console
```

---

## Updated Journey Architecture

After this implementation, the complete Journey Engine becomes:

```bash
                    Visitor
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
 Marketplace     Start Business     Administration
         │             │             │
         │             ▼             │
         │      Authentication       │
         │             │             │
         │             ▼             │
         │      Business Welcome     │
         │       │          │         │
         │       │          └────── Join Business (future)
         │       │
         │       ▼
         │   Business Onboarding
         │       │
         │       ▼
         │    Bootstrap
         │       │
         └──────▶▼
            Business Workspace
```

---

## Business Card

Every business becomes one reusable component.

```bash
┌─────────────────────────────┐

Logo

Bonifoods

Restaurant

Created Jul 2026

Owner

──────────────

Open Workspace

────────────────

Settings

Delete

└─────────────────────────────┘
```

Later

```bash
Unread notifications

Pending orders

Bookings today

Revenue

Staff online
```

Can all appear here.

---

## Future capability

The beauty of this architecture is that Business Hub naturally grows into a workspace launcher.

Eventually it can contain:

```bash
Recent Workspaces

Favorites

Pinned Businesses

Invitations

Notifications

Activity

Continue where you left off

Search Businesses

Create Business

Import Business

Accept Invitation

Switch Workspace
```

---

```bash
Widget Rendering Engine
        │
        ├── StatWidget
        ├── ChartWidget
        ├── TableWidget
        ├── ActivityWidget
        ├── QuickActionsWidget
        ├── CalendarWidget
        ├── EmptyWidget
        └── UnknownWidget
```

---

## Loading Experience

Eventually we should introduce

```bash
Skeletons

Spinners

Section Loaders

Page Loaders

Button Loaders
```

---

## Notification System

We currently have no platform feedback.

Eventually

```bash
Success

Error

Warning

Loading

Confirmation
```

should all come from `shared/notifications/` instead of individual pages.

---

## Error Experience

Platform-wide

```bash
404

403

401

500

Offline

Maintenance
```

---

## Offering Framework

### Recommended Implementation Sequence

1. Architecture Review (covered)
2. Create the offering domain skeleton (folders, exports, constants) (covered)
3. Define the Offering contract and base model (covered)
4. Implement the Offering Registry and integrate it with the (registry bootstrapping, validation utilities, and registry lookups) (covered)
5. Build repositories, presenters, and services for generic offering lifecycle operations (covered)
6. Migrate the existing Product implementation to conform to the Offering contract (covered)
7. Proceed to Marketplace aggregation, which will consume Offerings rather than Products.

---

## Implementation plan

### Milestone 6 — Product Specialization

- Instead of treating Product as the primary entity, Product becomes an extension of Offering.

1. Step 1 — Product Adapter (covered)
2. Step 2 — Product-specific Hooks (covered)
3. Step 3 — Product Model Simplification (covered)
4. Step 4 — Resume Product Variants (covered)
5. Step 5 — Marketplace

When Marketplace arrives it no longer queries Product.

Instead it queries:

```bash
Offerings

↓

Product
Rental
Booking
Course
Membership
Package
```

---

## Next Planned Work (According to the Architecture Specification)

The foundation of the Offering Framework is now complete. The next phases focus on enriching the abstraction rather than returning to Product-centric design.

### Phase 1 — Complete the Offering Framework (covered)

Continue implementing the remaining projection types:

- Service
- Rental
- Membership
- Booking
- Event
- Course
- Subscription
- Package
- Digital Download

Each projection should:

implement the projection contract
remain lightweight
own only type-specific data
rely on Offering for shared lifecycle

### Phase 2 — Retail Commerce (in progress but taking a different path as compared to what was envisioned before)

Expand the Product projection into a complete retail implementation:

- Product Variants
- Variant Attributes
- Attribute Values
- SKU generation strategy
- Inventory per Variant
- Pricing per Variant
- Images per Variant
- Variant lifecycle
- Variant presenters and repositories

The goal is for Product to become a thin retail specialization of the generic Offering architecture.

### Phase 3 — Marketplace

Build the Marketplace on top of Offerings rather than Products:

- Unified offering catalog
- Cross-business discovery
- Search
- Filters
- Categories
- Recommendations
- Featured offerings
- Marketplace aggregation

The Marketplace should work regardless of offering type.

### Phase 4 — Business Modules

Develop additional industry modules that consume the Offering Framework:

- Restaurant
- Hospitality
- Healthcare
- Education
- Professional Services
- Community Services
- Membership Organizations

These modules should extend the platform without modifying the core Offering architecture.

---

## Lifecycle changes

Notice something interesting.

Your current

```bash
service.lifecycle.js
```

is

```bash
create: sharedLifecycle.create
```

which works.

However Product became

```js
create(payload){
   return sharedLifecycle.create({
      ...
      registration:{
          lifecycle:{hooks},
          ...
      }
   })
}
```

because Product has hooks.

Once Service gains

```bash
beforeCreate

afterCreate

beforeUpdate
```

its lifecycle will naturally evolve into exactly the Product pattern.

So we do not need to prematurely add hooks today.

Only add them once the projection starts having business rules.

---

- For the Service Projection, we created the:
    - Model
    - Repository
    - Projection
    - Updated offering registry
    - Updated it's lifecycle

---

## Recommended next implementation order

Given the current state of the project, I would implement the capability system in this sequence:

1. Capability Registry – Define a registry of reusable platform capabilities (Pricing, Inventory, Media, Scheduling, etc.). (covered)
2. Pricing Capability – This is foundational and will be shared by nearly every offering type. (covered)
3. Media/Assets Capability – Replace product-specific images with a reusable media capability applicable to Products, Courses, Events, and Digital Downloads.
4. Inventory Capability – Extend beyond products so Rentals and other physical offerings can share the same inventory infrastructure.
5. Scheduling Capability – Power Services, Bookings, Courses, and Events from a single scheduling domain.
6. Capability Composition – Drive behavior, configuration, and eventually frontend workspace generation from the capabilities declared in offering.registry.js.

---

## The implementation plan I recommend

1. Phase 1 — Introduce an Offering Component Registry (covered)
2. Phase 2 — Replace Boolean Configuration in the Offering Registry (covered)
3. Phase 3 — Build Component Pipelines (covered)
4. Phase 4 — Enable Dynamic APIs and UI

Finally, leverage the declared components to dynamically compose:

REST responses
validation rules
frontend forms
workspace widgets
marketplace presentation

---

```js
services: {
    eventBus,
    imageStorage,
    cache,
}
```

---

## One small cleanup recommendation

We should consider extracting the Zod → AppError conversion currently duplicated between validateRequest.js and errorHandler.js into a shared validation/error utility.

---

You mentioned, the key point is not to start implementing Attributes next merely because it appears next on a list and that we should first perform a Component Dependency Review. For every component, we should establish:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- What lifecycle hooks does it participate in?
- What happens when it is absent?
- What validation does it perform?
- What invariants must remain true?
- What business concept does it represent?
- What API does it require?
- What permissions are required?
- What audit events are required?
- What registry metadata is required?
- What frontend experience will eventually consume it?
- What should be tested through REST Client?

Only after this analysis should implementation begin.

---

```bash
                         OFFERING
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ↓                 ↓                  ↓
       CATALOG          COMMERCIAL           TIME
          │                 │                  │
    ┌─────┼─────┐       ┌───┴────┐       ┌────┼─────┐
    ↓     ↓     ↓       ↓        ↓       ↓    ↓     ↓
 Categories Media Tags Pricing Variants  Calendar Scheduling
    │                       │       │         │
    ↓                       │       └────┐    ↓
 Attributes                 │            │  Booking
                            │            ↓
                            │        Inventory
                            │
                            └───────────────
```

---

```bash
Offering
   └── Base Pricing

Variant
   └── optional price override
```

I strongly recommend we resolve that before implementing Variants, because otherwise we risk building the Variant component around assumptions that later force us to redesign the Pricing component we just finished.

---

Offering is now the common commercial abstraction.

This is important.

A:

Product
Service
Rental
Course
Membership
Event

can all potentially be categorized.

For example:

```bash
Product
  → Laptops

Service
  → Web Development

Course
  → Programming

Membership
  → Premium Plans

Event
  → Technology Events
```

This is precisely the kind of cross-industry abstraction the Offering Framework is intended to provide. The architecture specification states that the framework should support products, services, rentals, memberships, bookings, packages and future offering types through a common model.

Once i'm done scripting the current offering components confirm that they are being consumed and by the right offering type.

---

```bash
db.products.dropIndex("business_1_name_1")

db.products.getIndexes()
```

---

## Attributes first implementation

```bash
Offering
   │
   ├── Metadata
   ├── Tags
   ├── Categories
   ├── Media
   ├── SEO
   │
   └── Attributes
          │
          ├── Color
          │     ├── Black
          │     ├── Silver
          │     └── Blue
          │
          ├── RAM
          │     ├── 8GB
          │     ├── 16GB
          │     └── 32GB
          │
          └── Storage
                ├── 256GB
                ├── 512GB
                └── 1TB
```

## Attribute definition ≠ Variant.

An attribute describes a dimension of variation. A variant represents a concrete combination of attribute values.

For example:

```bash
Attributes
├── Color
├── RAM
└── Storage

Variant
├── Color: Black
├── RAM: 16GB
└── Storage: 512GB
```

## Attribute component config

### One important correction to the architecture

There is one thing I would not do yet.

Do not put this into the Attribute component:

```bash
slug
attributeId
valueId
variantId
```

---

## The lifecycle then becomes the orchestration boundary

The resulting architecture should be:

```bash
                 Offering Service
                       │
                       ▼
                Lifecycle Factory
                       │
                       ▼
              Shared Offering Lifecycle
                       │
          ┌────────────┴────────────┐
          │                         │
     Core Offering             Components
          │                         │
          ▼                    Component Pipeline
     Builder                       │
          │              ┌──────────┼──────────┐
          ▼              ▼          ▼          ▼
      Offering        Pricing    Media    Categories ...
       Model
```

And for an Offering type such as Product:

```bash
POST /offerings
       │
       ▼
Product registration
       │
       ├── shared lifecycle
       │       ├── core validation
       │       ├── component validation
       │       ├── component preparation
       │       ├── build Offering
       │       └── save Offering
       │
       ├── Product projection
       │
       └── components
               ├── Pricing
               ├── Categories
               ├── Media
               ├── Tags
               ├── Attributes
               └── SEO
```

---

As we convert the components, we should eventually move toward:

```bash
Shared Offering Lifecycle
        │
        ▼
MongoDB session/transaction
        │
        ├── create Offering
        ├── create Pricing
        ├── create Categories
        ├── create Media
        ├── create Tags
        ├── create Attributes
        └── create SEO
        │
        ▼
Commit
```

But I would not introduce that transaction refactor in this step.

First establish ownership correctly. Then we can make the lifecycle transaction-aware without simultaneously changing every component.

---

The Commerce domain should evolve approximately like this:

```bash
Commerce
│
├── Offering Framework
│
├── Product
│   ├── Categories
│   ├── Variants
│   ├── Inventory
│   ├── Images / Media
│   └── Pricing
│
├── Service
│   └── Scheduling integration
│
├── Rental
│   └── Availability integration
│
├── Membership
│   └── Subscription / Billing integration
│
├── Booking
│   └── Scheduling integration
│
├── Package
│
├── Course
│   ├── Enrollment
│   ├── Instructor
│   ├── Duration
│   └── Capacity
│
└── Digital Download
    └── Download / Files integration
```

---

The major roadmap phases include:

```bash
Phase 1 — Platform Foundation
Phase 2 — Business Configuration
Phase 3 — Offering Framework
Phase 4 — Retail Commerce
Phase 5 — Marketplace
Phase 6 — Industry Modules
```

---

## While developing the variants offering component;

### Pricing

Pricing is related, but should not be a hard dependency for the first Variant implementation.

A product can have:

```bash
Product
├── Variant A
├── Variant B
└── Variant C

Pricing
└── Product/base offering price
```

Later we may support:

```bash
Variant A → price override
Variant B → price override
Variant C → price override
```

But that should be an explicit Variant/Pricing integration rather than coupling the initial Variant entity to Pricing.

### What frontend experience eventually consumes it?

The eventual Business OS product editor should expose:

```bash
Product
│
├── General
├── Categories
├── Media
├── SEO
├── Attributes
│
└── Variants
      │
      ├── SKU
      ├── Attribute selections
      ├── Status
      ├── Pricing
      └── Inventory
```

For example:

```bash
Product: T-Shirt

Attributes

Color
[ Red ] [ Blue ] [ Black ]

Size
[ S ] [ M ] [ L ]

Variants

┌─────────────┬─────────┬───────────┐
│ Variant     │ SKU     │ Status    │
├─────────────┼─────────┼───────────┤
│ Red / S     │ TS-R-S  │ ACTIVE    │
│ Red / M     │ TS-R-M  │ ACTIVE    │
│ Blue / M    │ TS-B-M  │ ACTIVE    │
└─────────────┴─────────┴───────────┘
```

Later:

```bash
Variant
├── Pricing
├── Inventory
├── Media
└── Availability
```

```bash
1. Inspect current Product projection/model
          ↓
2. Inspect component contract + lifecycle pipeline
          ↓
3. Inspect current permissions/audit constants
          ↓
4. Design Variant model around the new Offering architecture
          ↓
5. Implement builders
          ↓
6. Implement model
          ↓
7. Repository
          ↓
8. Service + invariants
          ↓
9. Presenter
          ↓
10. Validators/normalizer
          ↓
11. Component hooks
          ↓
12. Controller/routes
          ↓
13. Registry integration
          ↓
14. Product activation
          ↓
15. REST testing
```

---

### One important issue before running this

There is an architectural concern with the current Product projection:

```bash
Product
└── sku
```

and now:

```bash
Offering
└── Variants
    └── sku
```

This means the parent Product may have an SKU while its variants also have SKUs.

That is not necessarily invalid, but the eventual commercial model should decide whether:

```bash
Product SKU
```

means the base/non-variant SKU, or whether:

```bash
Product with variants
```

should have its identity represented exclusively through variant SKUs.

The earlier ProductVariant design already anticipated SKU per variant and variant inventory/pricing. The newer Offering architecture means we should implement that concept against Offering, not resurrect the old ProductVariant model.

---

## While developing the inventory offering component

### Frontend consumer

Eventually the Business OS should consume this as a dynamic Inventory capability:

```bash
Business Dashboard
      │
      └── Inventory
            │
            ├── Overview
            │   ├── On Hand
            │   ├── Reserved
            │   ├── Available
            │   └── Low Stock
            │
            ├── Stock
            │   ├── Low Stock
            │   ├── Out of Stock
            │   ├── Branch Stock
            │   ├── Variant Stock
            │   └── Movement History
            ├── Adjustments
            └── Reservations
```

### What we have deliberately NOT implemented yet

This is important.

We have not put these into the first Inventory implementation:

```bash
Warehouse
Stock Movement
Stock Adjustment Ledger
Reservation Ledger
Procurement
Supplier
Purchase Order
Receiving
```

The Architecture Specification identifies all of these as Inventory/Commerce responsibilities, but implementing them all inside this component would make inventory.component.js an oversized domain. The architecture specifically emphasizes cohesive subdomains and separation of Catalog, Pricing, Inventory, Procurement, Orders and Fulfillment.

So our progression should be:

```bash
Inventory Component
        │
        ├── Inventory State          ← NOW
        │
        ├── Stock Movements          ← NEXT
        │
        ├── Adjustments
        │
        ├── Reservations
        │
        ├── Warehouses / Locations
        │
        └── Procurement Integration
```

```bash
inventory/
└── transactions/
    ├── models/
    ├── repositories/
    ├── services/
    └── ...
```

That keeps the current component focused while leaving a clean path toward the Inventory Transactions layer mandated by the Commerce architecture.

## We will not yet implement stock movement/transaction endpoints inside this first component because the architecture identifies Stock Movements as a distinct operational concern. We should introduce that as the next inventory layer rather than hiding a transaction ledger inside the Inventory state model.

I recommend not solving that during this component implementation. Keep the current Product projection untouched and handle SKU semantics when Inventory and variant-level Pricing are implemented.

For the first milestone, however, we can implement the Inventory component foundation and leave transaction workflows as the next incremental step.

---

## While developing the duration offering component

### Offering Types

Duration should not be Product-specific.

Likely consumers include:

```bash
| Offering Type | Duration    |
| ------------- | ----------- |
| PRODUCT       | Usually no  |
| SERVICE       | Yes         |
| RENTAL        | Yes         |
| BOOKING       | Yes         |
| COURSE        | Yes         |
| EVENT         | Yes         |
| MEMBERSHIP    | Potentially |
| SUBSCRIPTION  | Potentially |
```

### One important architectural decision

I would not make Duration depend on Inventory.

The distinction should be:

```bash
Inventory
└── How many units are available?

Duration
└── How long does the offering take?

Capacity
└── How many participants/resources can it accommodate?

Location
└── Where does it happen?

Calendar
└── What dates/times are available?

Scheduling
└── How are resources/time slots allocated?

Booking
└── Who reserved it?
```

---

```bash
                    OFFERING REGISTRY
                           │
                           ▼
                 Component declarations
                           │
             ┌─────────────┴─────────────┐
             │                           │
       Lifecycle Pipeline          Direct Component APIs
             │                           │
             ▼                           ▼
      resolveComponents()       supportsComponent()
             │                           │
             ▼                           ▼
       Execute hooks              Allow / Reject
```

One registry, two consumers, no duplicated business-type rules.

---

## While developing the location offering component

One important architectural point: we are deliberately not adding a branch reference to this first Location implementation. The Architecture Specification treats business Locations as organizational configuration and Marketplace as the consumer of published location information. If we later establish a formal relationship between Offerings and Business Branches, that should be an explicit architectural decision rather than being silently embedded into the component now.

---

## While developing the scheduling offering component

### One architectural point to preserve

We should **not** make Scheduling create Calendar automatically.

The dependency is:

```text
Scheduling
    ↑
Calendar
```

not:

```text
Scheduling
    └── automatically creates Calendar
```

The component registry already expresses Calendar's dependency on Scheduling.

That gives us the intended composability:

```text
Service
 └── Scheduling

Booking
 ├── Scheduling
 ├── Calendar
 └── Booking

Rental
 └── Scheduling
```

and later:

```text
Scheduling
├── Calendar
├── Availability
├── Time Slots
├── Appointments
└── Reservations
```

---

## While developing the booking offering component

```bash
Customer selects Service
        ↓
Booking configuration
        ↓
Scheduling determines available times
        ↓
Calendar determines calendar
        ↓
Duration determines slot length
        ↓
Capacity determines remaining capacity
        ↓
Customer submits booking
        ↓
Booking transaction
```

### Frontend experience

Eventually this will feed the Business Operating System's Offering configuration UI.

Conceptually:

```bash
Offering Configuration
│
├── General
├── Pricing
├── Availability
│   ├── Duration
│   ├── Capacity
│   ├── Calendar
│   └── Scheduling
│
└── Booking
    ├── Enable bookings
    ├── Booking mode
    ├── Advance booking rules
    ├── Cancellation rules
    └── Confirmation settings
```

### One architectural decision before coding

I recommend the first Booking implementation remain configuration-only:

```bash
OfferingBooking
```

rather than immediately creating:

```bash
Booking
BookingCustomer
BookingSlot
BookingStatus
BookingPayment
```

Those represent actual customer transactions and would prematurely collapse booking configuration and booking execution into one model.

That separation is particularly important because the architecture is explicitly designed around reusable capabilities and future Offering Types rather than industry-specific implementations.

I’m deliberately not introducing a customer Booking transaction model yet. This implementation stores the Offering's booking configuration; the future customer booking workflow can consume it.

We should only add:

```bash
OFFERING_COMPONENTS.BOOKING
```

to Service, Rental, Event, Course, etc. after verifying the current registry definitions and their intended booking workflows.

---

## Next: Marketplace

```text
Published Business Data
        +
Published Offerings
        ↓
   Marketplace
        ↓
 ┌───────────────────────┐
 │ Discovery             │
 │ Search                │
 │ Business Profiles     │
 │ Offering Presentation │
 │ Recommendations       │
 │ Reviews               │
 │ Favorites             │
 │ Maps                  │
 │ Community             │
 └───────────────────────┘
```

This is consistent with the specification: Marketplace is a customer domain, owns discovery/presentation, and consumes published information from Commerce and Business rather than owning operational data.

---

## Immediate sequence

```text
1. Marketplace architecture review (covered)
2. Marketplace domain skeleton (covered)
3. Marketplace publication/aggregation contract (covered)
4. Marketplace offering read model
5. Offering aggregation service
6. Business aggregation
7. Marketplace API
8. REST testing
9. Marketplace frontend foundation
10. Search/indexing
11. Discovery
12. Recommendations
13. Reviews/Favorites/etc.
```

---

## Marketplace domain skeleton

Given the current backend structure, I recommend starting with:

```text
server/src/modules/marketplace/

├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
├── discovery/
├── search/
├── profiles/
├── offerings/
├── recommendations/
└── index.js
```

---

```text
Commerce
  owns Offering
       ↓
Marketplace
  owns discovery representation
       ↓
Customer
  discovers Offering
```

---

```text
GET /marketplace/offerings
GET /marketplace/offerings/:id
GET /marketplace/businesses
GET /marketplace/businesses/:id
GET /marketplace/search
GET /marketplace/discovery
```

---

## Longer-Term Marketplace Roadmap

<!-- ✓ | ← NEXT -->

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
Categories                      ✓
        ↓
Business Profiles               ← NEXT
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

## Discovery slice

```text
Marketplace Discovery
│
├── Business Discovery
│   └── Basic Business Listing          ✓
│
├── Offering Discovery
│   ├── Published Offering Listing      ✓
│   └── Featured Offerings              ✓
│
├── Trending Offerings                  ← NEXT
├── Nearby Businesses
├── New Businesses
├── Popular Categories
└── Seasonal Promotions
```

---

Future Offering Types may include:

- Insurance Policies
- Medical Procedures
- Licenses
- Event Tickets
- Donations
- Auction Lots
- Investments
- Shared Assets

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

- We may proceed to REST tests, in each test give me the complete REST example.

- Tests ... all passed successfully and or returned the expected responses.

git commit -m "feat(Marketplace): Create the API endpoint for marketplace/categories."

For your information to avoid inconsistencies, here is the current state(s) of a portion of the folder structure and files we recently created or optimized:

Access and respond to what i have just attached

---
