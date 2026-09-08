# Server

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

## After the Wizard

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

Example, "Other sessions" requires more than simply having refresh tokens. We need to know whether the existing session model tracks things such as:

```text
session
├── id
├── user
├── refresh token / token hash
├── createdAt
├── expiresAt
├── revokedAt
├── lastActivityAt
├── device
├── browser
├── operating system
└── current-session identification
```

---
