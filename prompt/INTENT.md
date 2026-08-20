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

### Recommended Implementation Sequence

1. Architecture Review (covered)
2. Create the offering domain skeleton (folders, exports, constants) (covered)
3. Define the Offering contract and base model (covered)
4. Implement the Offering Registry and integrate it with the (registry bootstrapping, validation utilities, and registry lookups) (covered)
5. Build repositories, presenters, and services for generic offering lifecycle operations (covered)
6. Migrate the existing Product implementation to conform to the Offering contract (covered)
7. Resume Product Variants on top of the new abstraction
8. Proceed to Marketplace aggregation, which will consume Offerings rather than Products.

---

- I recommend we proceed by implementing
    1. Phase 2 (Offering Builder) (covered)
    2. Offering Factory and refactor offering.service.js (covered)
    3. registry-driven defaults and lifecycle behavior. (covered)

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

## Recommended implementation order

To keep risk low, I'd implement this incrementally:

1. Move the current shared lifecycle to lifecycles/shared/offering.lifecycle.js (no logic changes). (covered)
2. Create specialized lifecycle files (product.lifecycle.js, rental.lifecycle.js, booking.lifecycle.js, etc.) that simply spread the shared lifecycle. (covered)
3. Implement lifecycle.factory.js to resolve the appropriate lifecycle based on offering type. (covered)
4. Refactor offering.service.js so it delegates to the lifecycle factory instead of importing the shared lifecycle directly. (covered)
5. Run the existing Offering API test suite unchanged to confirm behavior is identical before adding any type-specific business logic. (covered)

---

## Implementation plan

### Milestone 6 — Product Specialization

- Instead of treating Product as the primary entity, Product becomes an extension of Offering.

1. Step 1 — Product Adapter (covered)
2. Step 2 — Product-specific Hooks (covered)
3. Step 3 — Product Model Simplification (covered)
4. Step 4 — Resume Product Variants
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

## Recommended next implementation sequence

I recommend the following sequence:

1. Enhance shared/offering.lifecycle.js to support lifecycle hooks (beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeArchive, afterArchive, beforeRestore, afterRestore). (covered)
2. Implement Product-specific hooks in product.lifecycle.js, initially moving SKU normalization and SKU uniqueness validation there while leaving behavior unchanged. (covered)
3. Verify that all Offering Product endpoints still pass existing tests. (covered)
4. Refactor the legacy Commerce product.service.js into a thin adapter that delegates to the Offering service. (covered)
5. Remove duplicated generic logic from the Commerce Product module. (covered)
6. Continue with Product Variants on top of the unified Offering architecture. (close to being implemented)

---

## I recommend implementing the milestones in this order:

✅ Add offering reference to Product.js. (covered)
✅ Extend product.repository.js with offering-based queries. (covered)
✅ Create commerce/adapters/product.adapter.js. (covered)
✅ Refactor product.lifecycle.js to use the adapter. (covered)
✅ Test Offering create/update/archive/restore synchronization. (covered)
✅ Only then begin simplifying product.service.js by progressively delegating its persistence logic to the adapter or the new Offering flow while keeping the existing Commerce API intact. (covered)

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
3. Phase 3 — Build Component Pipelines (in progress)
4. Phase 4 — Move Projection Logic into Components

As each component matures, extract common responsibilities from projection adapters into reusable component services. For example:

Pricing service
Media service
Inventory service
Scheduling service

This reduces duplication across Product, Course, Event, Rental, and other offering types.

5. Phase 5 — Enable Dynamic APIs and UI

Finally, leverage the declared components to dynamically compose:

REST responses
validation rules
frontend forms
workspace widgets
marketplace presentation

---

## Implementation order

1. Create the component contract (component.contract.js). (covered)
2. Implement the component pipeline (component.pipeline.js) that discovers and executes components declared in the offering registry. (covered)
3. Wire the pipeline into the shared offering lifecycle so component hooks execute alongside the existing projection hooks. (covered)
4. Incrementally enrich each component with real behavior (pricing persistence, media management, inventory updates, scheduling logic, etc.) without changing the lifecycle orchestration. (in progress)

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

You also recommended to implement the components in this order:

```bash
PHASE A — Shared Offering Components
────────────────────────────────────

1. Metadata (covered)
2. Tags (covered)
3. Categories (covered)
4. Media (covered)
5. SEO (covered)


PHASE B — Offering Structure
────────────────────────────────────

6. Attributes (covered)
7. Variants


PHASE C — Commerce Operations
────────────────────────────────────

8. Inventory


PHASE D — Availability / Time
────────────────────────────────────

9. Duration
10. Capacity
11. Location
12. Calendar
13. Scheduling


PHASE E — Customer Interaction
────────────────────────────────────

14. Booking
15. Registration
16. Enrollment


PHASE F — Specialized Offering Models
────────────────────────────────────

17. Membership
18. Subscription
19. Download
```

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

| Component    | Depends on            | Integrates with           | Likely offering types        |
| ------------ | --------------------- | ------------------------- | ---------------------------- |
| Metadata     | Offering              | —                         | All                          |
| Tags         | Offering              | Catalog                   | All                          |
| Categories   | Offering              | Catalog                   | Product                      |
| Media        | Offering              | Variants                  | Most                         |
| SEO          | Offering              | Catalog                   | Public offerings             |
| Attributes   | Offering              | Variants                  | Product                      |
| Variants     | Offering + Attributes | Pricing, Inventory, Media | Product                      |
| Inventory    | Offering/Variant      | Variants                  | Product/Rental               |
| Duration     | Offering              | Scheduling/Booking        | Service/Course/Rental        |
| Calendar     | Scheduling model      | Booking                   | Booking/Event                |
| Scheduling   | Offering              | Calendar/Booking          | Service/Booking/Rental/Event |
| Booking      | Scheduling            | Calendar, Capacity        | Booking                      |
| Capacity     | Offering              | Booking/Registration      | Event/Booking                |
| Location     | Offering              | Scheduling/Events         | Event/Booking                |
| Registration | Offering              | Capacity/Enrollment       | Event/Course                 |
| Enrollment   | Offering              | Instructor/Duration       | Course                       |
| Instructor   | Offering              | Enrollment                | Course                       |
| Membership   | Offering              | Pricing                   | Membership                   |
| Subscription | Offering              | Pricing                   | Subscription                 |
| Download     | Offering              | Media                     | Digital                      |

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

---

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

Components own

Data whose existence depends on a component being enabled:

```bash
Pricing
Media
Categories
Attributes
Tags
SEO
Inventory
Variants
Scheduling
Calendar
Booking
Membership
Subscription
Registration
Download
Enrollment
Instructor
Duration
Capacity
Location
...
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

- While developing the variants offering component;

## Pricing

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

## What frontend experience eventually consumes it?

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

## One important issue before running this

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

---

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

---

For the first milestone, however, we can implement the Inventory component foundation and leave transaction workflows as the next incremental step.

---

- We may proceed to Inventory REST testing, in each test give me the complete REST example.

- Tests ... all passed successfully and or returned the expected responses.

git commit -m "feat(offering): Create the V1 of the offering inventory component."

For your information to avoid inconsistencies, here is the current state(s) of a portion of the folder structure and files we recently created or optimized:

Access and respond to what i have just attached

---
