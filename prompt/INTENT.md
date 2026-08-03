# TASSIAQCA - the digital operating system for neighborhood businesses.

## TODO

- Not now, but eventually, `"lint": "eslint"`. We'll introduce ESLint after we've built a reasonable amount of the backend.
- It will come a moment when i will have introduced payments, delivery, accounting, commissions, Mpesa, receipts, invoices, booking, etc., that assumption begins to break down.
- Later we can replace Cloudinary with S3 or Azure Blob.

---

## Recommended implementation order

Following the pattern established across the Commerce module, I'd implement Pricing in this sequence:

Shared constants
ProductPrice model
Validators
Repository
Presenter
Service
Controller
Routes
REST Client tests
Git commit

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

## After Categories - The Commerce roadmap becomes:

- I recommend following this sequence because each feature builds on the previous one. Categories complete the product organization layer, which Inventory and Catalog functionality will naturally depend on.

1. Product Catalog (done)
    - Product CRUD
    - Archive/Restore
    - Product Presenter

2. Product Categories (done)
    - Hierarchical categories
    - Product-category relationships

3. Inventory (done)

4. Product Images (done)
    - The plan here was to have a:
        - Cover image
        - Gallery
        - Ordering
    - But we did not or are yet to handle it this way. when or if needed we will implement it. What we have now, the user can add images and one of the images is set as the primary.

5. Pricing (done)

6. Product Variants
    - Sizes
    - Colors
    - Options

7. Attributes

8. Collections

9. Search

10. Branch Inventory (we need to move forward this can be implemented in the future)
    - Branch-specific stock
    - Reorder levels
    - Pricing
    - Availability

11. Orders

12. Payments

13. Reporting

14. Public Catalog API

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

## Pricing

- The immutable ProductPrice model should support variants with a minimal extension:
    - ProductPrice
    - product
    - variant (nullable)
    - sellingPrice
    - costPrice
    - currency
    - effectiveFrom
    - effectiveTo
    - isCurrent
- Behavior:
  variant = null → Base product price.
  variant = ObjectId → Variant-specific override.
- This avoids creating a separate pricing subsystem while preserving price history.

---

## Permissions

PRODUCT_VARIANT_VIEW
PRODUCT_VARIANT_CREATE
PRODUCT_VARIANT_UPDATE
PRODUCT_VARIANT_DELETE
PRODUCT_VARIANT_ARCHIVE
PRODUCT_VARIANT_RESTORE

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

## Audit Logging

Log all significant lifecycle events:

PRODUCT_VARIANT_CREATED
PRODUCT_VARIANT_UPDATED
PRODUCT_VARIANT_ARCHIVED
PRODUCT_VARIANT_RESTORED
PRODUCT_VARIANT_DELETED

---

## Audit entity

PRODUCT_VARIANT

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

## Final Implementation Roadmap

### Phase 1 — New Module

- ProductVariant model
- Repository
- Service
- Controller
- Presenter
- Validator
- Routes

## Phase 2 — Extend Existing Modules

### ProductPrice

- Add nullable variant
- Repository support
- Service support
- Presenter support
- Validators
- REST tests

### Inventory

- Add nullable variant
- Repository support
- Service support
- Presenter support
- Validators
- REST tests

### ProductImage

- Add nullable variant
- Repository support
- Service support
- Presenter support
- Validators
- Primary image logic update
- REST tests

## Phase 3 — API Surface

Introduce nested variant endpoints while keeping related resources reusable:

    ```js
    /businesses/:businessId/products/:productId/variants

    /businesses/:businessId/products/:productId/variants/:variantId

    /businesses/:businessId/prices
        ?productId=
        &variantId=

    /businesses/:businessId/inventory
        ?productId=
        &variantId=

    /businesses/:businessId/images
        ?productId=
        &variantId=
    ```

---

## Workflow

Vision
↓
Architecture Specification
↓
Architecture Review
↓
Implementation Plan
↓
Implementation
↓
REST Testing
↓
Frontend Integration
↓
Documentation Update
↓
Git Commit

---

## What happens after the specification?

Then we return to the backend, but with much greater confidence.

We would follow the roadmap you previously approved:

1. Business Configuration Engine
2. Offering Framework implementation
3. Finish Retail Commerce
4. Marketplace
5. Industry Modules
6. Frontend implementation

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
7. Business Provisioning Pipeline
8. Configuration API
9. Navigation API
10. Frontend integration
11. Resume Offering Framework
12. Resume Retail Commerce (Product Variants)

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

- They are important, but your the backend does not yet support endpoints for these flows.

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

## Business Hub Vision

Instead of a static welcome page, the page should become a dashboard about the entrepreneur rather than about a single business.

```bash
Business Hub
──────────────────────────────────────────────

Welcome back, Keith

You currently have

✔ 2 Businesses
✔ 1 Pending Invitation
✔ 0 Provisioning Tasks

──────────────────────────────────────────────

Continue Working

┌───────────────────────────────┐
│ Dexta Tech                    │
│ Retail                        │
│ Last opened yesterday         │
│ [Open Workspace]              │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Bonifoods                     │
│ Restaurant                    │
│ Last opened today             │
│ [Open Workspace]              │
└───────────────────────────────┘

──────────────────────────────────────────────

Quick Actions

+ Create Business

+ Join Business

+ Marketplace

──────────────────────────────────────────────

Pending Invitations

No invitations.

──────────────────────────────────────────────

Recent Activity

Business created yesterday...
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

## Recommended implementation order

Now that the Journey Engine foundation is stable, I recommend this sequence:

Fix BootstrapEngine so it only bootstraps an existing workspace and never redirects to onboarding.
Complete the Business Welcome journey.
Complete the Business Hub flow (select workspace → bootstrap → workspace, with no flicker).
Refactor DashboardRenderer into the new Widget Rendering Engine.
Introduce real widget types (StatWidget, TableWidget, ChartWidget, etc.) that the Widget Rendering Engine can dynamically resolve based on the widget definition returned by the backend.

This ordering keeps responsibilities clean and avoids introducing the Widget Rendering Engine before the navigation and workspace lifecycle are fully correct.

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

1. Milestone 1 — Offering Domain Foundation (covered)
2. Milestone 2 — Offering Contract (covered)
    - Implement the common contract described in Chapter 10.
3. Milestone 3 — Offering Registry (covered)
4. Milestone 4 — Offering Service Layer (covered)
    - Implement generic services.

    ```bash
    OfferingRepository

    OfferingService

    OfferingPresenter
    ```

    - Generic operations:

    ```bash
    Create

    Update

    Archive

    Publish

    Search

    List

    Discover

    Get Availability

    Change Status
    ```

5. Milestone 5 — Product Adapter
    - Only after the Offering Domain is stable should Product be migrated.
      Instead of:

        ```bash
        Product
        ```

        it becomes:

        ```bash
        Product

        implements

        Offering
        ```

        Conceptually:

        ```bash
        Offering

        ↓

        Product

        ↓

        Product Variant

        ↓

        Inventory

        ↓

        Pricing

        ↓

        Media
        ```

6. Milestone 6 — Variant Implementation

## Recommended Implementation Sequence

1. Architecture Review (covered)
2. Create the offering domain skeleton (folders, exports, constants) (covered)
3. Define the Offering contract and base model (covered)
4. Implement the Offering Registry and integrate it with the (registry bootstrapping, validation utilities, and registry lookups) (covered)
5. Build repositories, presenters, and services for generic offering lifecycle operations (covered)
6. Migrate the existing Product implementation to conform to the Offering contract
7. Resume Product Variants on top of the new abstraction
    - Once that is in place, we can proceed with controllers, validators, and eventually migrate the existing Product implementation to become a concrete Offering
8. Proceed to Marketplace aggregation, which will consume Offerings rather than Products.

---

- I recommend we proceed by implementing
    1. Phase 2 (Offering Builder) (covered)
    2. Offering Factory and refactor offering.service.js
    3. registry-driven defaults and lifecycle behavior.

---

After introducing specialized builders:

```bash
Factory
    │
    ├── PRODUCT ─────────► ProductBuilder
    │                         │
    │                         ├── registry defaults
    │                         ├── variant initialization
    │                         ├── inventory initialization
    │                         └── pricing initialization
    │
    ├── RENTAL ─────────► RentalBuilder
    │                         ├── rental policies
    │                         ├── availability
    │                         └── deposits
    │
    ├── BOOKING ────────► BookingBuilder
    │                         ├── duration
    │                         ├── schedule
    │                         └── calendar
    │
    └── SERVICE ────────► ServiceBuilder
```

---

Next Phase (Phase 5)

After this refactoring, the next major milestone is Shared Offering Lifecycle. Instead of services directly mutating fields such as:

---

## I recommend implementing this phase incrementally:

1. Create offering.lifecycle.js and move the current service logic there with no behavioral changes. (covered)
2. Refactor offering.service.js into a thin delegation layer. (covered)
3. Verify that all existing Offering API tests still pass unchanged. (covered)
4. Once parity is confirmed, introduce specialized lifecycles (Product, Rental, Booking, etc.) that extend the shared lifecycle. This minimizes risk while establishing the inheritance model described in your architecture specification.

---

## Recommended implementation order

To keep risk low, I'd implement this incrementally:

1. Move the current shared lifecycle to lifecycles/shared/offering.lifecycle.js (no logic changes). (covered)
2. Create specialized lifecycle files (product.lifecycle.js, rental.lifecycle.js, booking.lifecycle.js, etc.) that simply spread the shared lifecycle. (covered)
3. Implement lifecycle.factory.js to resolve the appropriate lifecycle based on offering type. (covered)
4. Refactor offering.service.js so it delegates to the lifecycle factory instead of importing the shared lifecycle directly. (covered)
5. Run the existing Offering API test suite unchanged to confirm behavior is identical before adding any type-specific business logic. (covered)

---

## What comes next

The roadmap in your architecture and in the implementation notes points to:

- Migrate Product onto the Offering abstraction
- Resume Product Variants
- Marketplace aggregation consuming Offerings instead of Products

---

## Implementation plan

### Milestone 6 — Product Specialization

- Instead of treating Product as the primary entity, Product becomes an extension of Offering.

1. Step 1 — Product Adapter
2. Step 2 — Product-specific Hooks
    - Once the adapter exists we can begin overriding lifecycle hooks. For example:

    ```bash
    product.lifecycle.js
    beforeCreate()
    afterCreate()
    beforeUpdate()
    afterPublish()
    ```

    Eventually:

    ```bash
    beforeCreate()
    generate SKU

    afterCreate()
        create inventory

    afterPublish()
        publish to marketplace

    afterArchive()
        deactivate inventory
    ```

3. Step 3 — Product Model Simplification

Several fields currently duplicated in Product should disappear because they now belong to Offering. Examples include:

name
slug
description
status
visibility
searchable
featured

Product keeps only fields such as:

```bash
offering
sku
brand
weight
dimensions
barcode
```

4. Step 4 — Resume Product Variants

Only after Product is fully adapted should we continue with:

```bash
Product

↓

Variants

↓

Variant Values

↓

Pricing

↓

Inventory
```

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

## Recommended next implementation milestone should be:

1. Create the Product Adapter.
2. Refactor the existing Product module to use product.lifecycle.js.
3. Move Product-specific business rules into lifecycle hooks.
4. Remove duplicated generic fields from the Product domain.
5. Resume Product Variants on top of the new architecture.

---

## Recommendation

1. Add lifecycle hook system
2. Move Product rules into ProductLifecycle
3. Verify Offering Product works
4. Make Commerce Product delegate
5. Remove duplicate Product service
6. Resume Product Variants

---

1. Milestone 1 - Introduce lifecycle hooks

- Your shared lifecycle should stop containing hardcoded behavior. Instead it becomes extensible. For example:

```bash
create()

↓

beforeCreate()

↓

shared create logic

↓

afterCreate()
```

2. Milestone 2 - Once hooks exist...

- ProductLifecycle becomes:

```bash
SharedLifecycle

↓

beforeCreate()

↓

SKU validation

↓

Category validation

↓

Inventory defaults

↓

continue shared create
```

3. Milestone 3 - Only after ProductLifecycle actually contains Product behavior...

- then Commerce Product Service becomes:

```bash
create()

↓

OfferingService.createOffering()
```

instead of:

```bash
ProductRepository.create()
```

4. Milestone 4 - Only then do we delete

```bash
ensureProductExists()

generateUniqueSlug()

ensureProductNameUnique()

audit logging

archive()

restore()

etc...
```

---

## Recommended next implementation sequence

I recommend the following sequence:

1. Enhance shared/offering.lifecycle.js to support lifecycle hooks (beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeArchive, afterArchive, beforeRestore, afterRestore).
2. Implement Product-specific hooks in product.lifecycle.js, initially moving SKU normalization and SKU uniqueness validation there while leaving behavior unchanged.
3. Verify that all Offering Product endpoints still pass existing tests.
4. Refactor the legacy Commerce product.service.js into a thin adapter that delegates to the Offering service.
5. Remove duplicated generic logic from the Commerce Product module.
6. Continue with Product Variants on top of the unified Offering architecture.

---

## The direction I recommend

Instead of making lifecycle hooks directly manipulate repositories, introduce a Product Adapter.

That keeps the lifecycle focused on orchestration while the adapter owns Product persistence.

The flow becomes:

```bash
Offering Lifecycle
        │
        │
        ▼
Product Adapter
        │
        ▼
Product Repository
        │
        ▼
Product Model
```

This separation becomes extremely valuable once you add

Variants
Inventory
Pricing
Categories
Images
Bundles

because all Product-specific persistence remains behind one interface.

## I recommend implementing the milestones in this order:

✅ Add offering reference to Product.js. (covered)
✅ Extend product.repository.js with offering-based queries. (covered)
✅ Create commerce/adapters/product.adapter.js. (covered)
✅ Refactor product.lifecycle.js to use the adapter. (covered)
✅ Test Offering create/update/archive/restore synchronization. (covered)
✅ Only then begin simplifying product.service.js by progressively delegating its persistence logic to the adapter or the new Offering flow while keeping the existing Commerce API intact.

---

## Step 4

After fixing Step 1 and Step 2, rerun:

Create Product with SKU
Duplicate SKU
Update SKU
Duplicate SKU Update

---

```bash
Offering
        │
        │
        ├──────── ProductExtension
        │
        ├──────── BookingExtension
        │
        ├──────── RentalExtension
        │
        ├──────── CourseExtension
        │
        └──────── MembershipExtension
```

---

## My recommended roadmap

I would avoid deleting the Product collection immediately because the rest of Commerce still depends on it. Instead, I'd proceed in controlled stages:

1. Complete the migration to Offering-first APIs.
   Make POST, PATCH, ARCHIVE, and RESTORE go exclusively through the Offering module.
   Treat the existing /products mutation endpoints as legacy compatibility endpoints or begin deprecating them.
2. Introduce the projection contract and registry-based adapter resolution.
   Remove the hard-coded dependency on product.adapter.js from product.lifecycle.js.
   Let the offering registry provide the appropriate projection adapter for each offering type.
3. Refactor the Product model into a true extension/projection.
   Gradually remove duplicated fields (name, slug, description, status, etc.) from the Product document.
   Keep only product-specific attributes such as sku, category, physical dimensions, inventory policy, and similar fields.
4. Convert Commerce read APIs into projections over Offerings.
   GET /products becomes "Offerings of type PRODUCT enriched with ProductExtension data."
   Other domain-specific modules follow the same pattern.

---

## Revised migration order

1. Phase 1 — Introduce Projection Contracts (registry-driven) (covered)

This is the foundation.

Instead of this

```bash
Offering Lifecycle
        │
        ▼
Product Adapter
```

we build

```bash
Offering Lifecycle
        │
        ▼
    Registry
        │
        ▼
Projection Adapter
        │
        ├── Product Projection
        ├── Booking Projection
        ├── Rental Projection
        └── ...
```

2. Phase 2 — Registry-driven resolution
3. Phase 3 — Refactor Product document
4. Phase 4 — Offering becomes canonical
5. Phase 5 — Commerce read model

---

## I would implement them in this order:

1. Projection contract (registry-driven)
2. Slim Product projection
3. Commerce reads over Offerings
4. Deprecate legacy Product mutations

---

## Recommended Implementation

I would proceed in four commits:

### Commit 1 (done)

git commit -m "feat(offering): Introduce the Projection Contract."

- Create a generic projection interface (implemented as a convention in JavaScript).
- Add projection to offering.registry.js.
- Remove direct product.adapter knowledge from the lifecycle by resolving the projection through the registry.

### Commit 2

git commit -m "feat(offering): Refactor Product into a true projection."

- Remove duplicated fields (name, slug, description, status, etc.) from the Product model and adapter.
- Keep only product-specific data such as sku, category, inventory behavior, physical dimensions, shipping metadata, and similar attributes.

### Commit 3

git commit -m "feat(offering): Move Commerce reads to projection composition."

- Refactor GET /products to retrieve Product offerings from the Offering repository and enrich them with - Product projection data before presentation.
- Update GET /products/:id similarly.

### Commit 4

git commit -m "feat(offering): Deprecate Product mutations."

- Mark /products POST/PATCH/DELETE/RESTORE as legacy compatibility endpoints.
- Internally delegate them to the Offering lifecycle so there is only one mutation path.
- Encourage clients to migrate to /offerings.

---

## Project structure after Phase 1

I would introduce a new folder under the Offering module for shared projection infrastructure:

```bash
server/src/modules/offering/
├── projections/
│   ├── projection.contract.js
│   ├── noop.projection.js
│   └── index.js
```

Then, in Commerce, keep the product implementation where it belongs:

```bash
server/src/modules/commerce/
├── adapters/
│   └── product.adapter.js   // Implements the projection contract for now
```

The registry wires them together:

```bash
Offering Registry
        │
        ├── PRODUCT ─────────► product.adapter.js
        ├── BOOKING ─────────► noop.projection.js
        ├── RENTAL ──────────► noop.projection.js
        └── ...
```

This gives us a clean plugin architecture immediately, while allowing us to rename product.adapter.js to product.projection.js in a later refactoring with no behavioral changes.

---

- We may begin testing, In each test give me the complete http request example for me to test.

- Tests ... all passed successfully and or returned the expected responses.

git commit -m "feat(offering): execute Product Adapter migration."

For your information to avoid inconsistencies, here is the current state(s) of a portion of the folder structure and files we recently created or optimized:

---
