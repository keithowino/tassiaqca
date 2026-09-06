# Intent

We have established the fundamental read/discovery side of the Marketplace.

Now we can decide what customer capability should build on that foundation.

The architecture gives us several possibilities:

```text
                     Marketplace
                         │
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
    Discovery         Engagement       Transaction
       │                 │                 │
       ├─ Search         ├─ Favorites      ├─ Checkout
       ├─ Categories     ├─ Reviews         └─ Booking
       ├─ Maps           └─ Recommendations
       └─ Profiles
```

---

I would not immediately choose Favorites, Reviews, Maps, or Checkout.

Instead, now that the first Marketplace frontend slice exists, I recommend we do one more small planning exercise:

Build a Marketplace capability dependency map.

Something like:

```text
                    Marketplace Foundation
                             │
                             ▼
                     Business Discovery
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
          Offering Discovery       Business Profiles
                │                         │
                └────────────┬────────────┘
                             ▼
                    Offering Profiles
                             │
             ┌───────────────┼────────────────┐
             ▼               ▼                ▼
          Favorites       Reviews       Nearby/Maps
             │               │                │
             └───────┬───────┴────────┬───────┘
                     ▼                ▼
               Recommendations    Customer Identity
                     │                │
                     └───────┬────────┘
                             ▼
                    Customer Interaction
                             │
                     ┌───────┴───────┐
                     ▼               ▼
                  Checkout        Booking
```

Then we can ask of each capability:

What backend domain does it depend on?
Who owns its data?
What API contract is required?
What frontend experience does it require?
What existing foundation can it reuse?
What must exist before we implement it?
Does it belong in the current architectural phase?

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

## Offering Framework

### Recommended Implementation Sequence

1. Architecture Review (covered)
2. Create the offering domain skeleton (folders, exports, constants) (covered)
3. Define the Offering contract and base model (covered)
4. Implement the Offering Registry and integrate it with the (registry bootstrapping, validation utilities, and registry lookups) (covered)
5. Build repositories, presenters, and services for generic offering lifecycle operations (covered)
6. Migrate the existing Product implementation to conform to the Offering contract (covered)
7. Proceed to Marketplace aggregation, which will consume Offerings rather than Products. (covered)

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

## Immediate sequence

```text
1. Marketplace architecture review (covered)
2. Marketplace domain skeleton (covered)
3. Marketplace publication/aggregation contract (covered)
4. Marketplace offering read model (covered)
5. Offering aggregation service (covered)
6. Business aggregation (covered)
7. Marketplace API (covered)
8. REST testing (covered)
9. Marketplace frontend foundation (covered)
10. Search/indexing (covered)
11. Discovery (covered)
12. Recommendations
13. Reviews/Favorites/etc.
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
Business Profiles               ✓
        ↓
Offering Profiles               ✓
        ↓
Nearby / Maps                   ← FUTURE TASK
        ↓
Favorites / Collections         ← FUTURE TASK
        ↓
Reviews                         ← FUTURE TASK
        ↓
Recommendations                 ← FUTURE TASK
        ↓
Checkout / Booking / Request    ← FUTURE TASK
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

## Layout

The Architecture Specification already gives us the model:

```text
Marketplace Layout
    Header
      ↓
    Content
      ↓
    Footer

Business Operating System
    Sidebar
      ↓
    Workspace
      ↓
    Context Panel

Administration
    Navigation
      ↓
    Management Workspace
```

As per your recommendation, you stated that the header should be a Marketplace/ Public experience concern, not a global application wrapper.

Instead, think of the header as:

```text
Platform Design System
        │
        ├── reusable primitives
        │
        ▼
Experience Layout
        │
        ├── Gateway/Public Header
        ├── Marketplace Header
        ├── Business OS Header/Context
        └── Administration Header
```

### What should the Marketplace header contain?

At the current stage, I would keep it deliberately modest.

Something conceptually like:

```text
┌─────────────────────────────────────────────────────────┐
│ Logo       Marketplace        Search       Sign in/User │
└─────────────────────────────────────────────────────────┘
```

Eventually it may grow to:

```text
Logo
Marketplace
Search
Categories
Nearby
Favorites
Customer
```

## The Footer

You recommend we move toward:

```text
client/src/
├── applications/
│   ├── gateway/
│   ├── marketplace/
│   ├── business/
│   └── administration/
│
└── shared/
    └── layout/
```

### Should there be one Footer or several?

My answer is:

One common platform footer initially, with experience-specific layouts deciding whether to use it.

For example:

```text
Gateway Layout
    Header
    Content
    Footer

Marketplace Layout
    Header
    Content
    Footer

Business OS Layout
    Sidebar
    Workspace
    [possibly no marketing footer]

Administration Layout
    Navigation
    Workspace
    [no marketing footer]
```

### The current MarketplaceLayout is therefore incomplete

Eventually:

```text
MarketplaceLayout
│
├── MarketplaceHeader
│
├── <main>
│     └── Outlet
│
└── PlatformFooter
```

---

## Email verification is not just another form

This is important.

We should not think:

```text
Email Verification
= create VerifyEmailPage.jsx
```

Instead:

```text
Identity
│
├── Registration
├── Verification
├── Authentication
├── Sessions
├── Account Recovery
└── Credential Management
```

The security architecture explicitly includes:

account verification;
session management;
credential protection;
account recovery.

Therefore we should review the existing Identity implementation before designing these interfaces.

---

## Forgot Password / Reset Password

These should become one coherent Identity journey:

```text
Login
  │
  └── Forgot password?
          ↓
    Forgot Password
          ↓
    Recovery Request
          ↓
    Email / Recovery Token
          ↓
    Reset Password
          ↓
    Password Changed
          ↓
    Sign In
```

And the architecture already recognizes PasswordChanged as an Identity domain event.

We therefore need to determine whether the backend already has pieces of this architecture before writing any frontend.

---

## Business Identity

According to the Architecture Specification, Business Configuration has an explicit:

```text
Identity Configuration
```

containing:

```text
Business Name
Branding
Logo
Locations
Time Zone
Currency
Language
Business Hours
```

Conceptually:

```text
Business Information
        │
        │ foundational organization information
        ▼
Business Identity
        │
        ├── Public name
        ├── Logo
        ├── Branding
        ├── Public identity
        ├── Contact identity
        └── other identity configuration
        │
        ▼
Location
        │
        ▼
Workspace Configuration
        │
        ▼
Team
        │
        ▼
Review
```

## Branch

Here you mentioned "frontend branch/onboarding implementation", we will have to discuss this in depth.

---

## Proposed implementation roadmap

```text
├── STAGE 1 — EXPERIENCE SHELL
│   ├── Shared layout primitives
│   ├── Gateway/Public shell
│   ├── Gateway Header
│   ├── Gateway Footer
│   ├── Marketplace shell
│   ├── Marketplace Header
│   ├── Marketplace Footer
│   ├── Business shell review
│   ├── Administration shell review
│   └── Route regression
│
├── STAGE 2 — AUTHENTICATION LIFECYCLE
│   ├── Sign-out
│   ├── Forgot Password
│   ├── Reset Password
│   ├── Email Verification
│   ├── Session lifecycle
│   ├── User profile page
│   └── Auth route behaviour
│
├── STAGE 3 — BUSINESS IDENTITY
│   ├── Business Identity architecture
│   ├── Branding configuration
│   ├── Logo / identity
│   ├── Theme / brand configuration
│   ├── Onboarding integration
│   ├── Business OS integration
│   └── Marketplace profile integration
│
├── STAGE 4 — BUSINESS BRANCH RECONCILIATION
│   ├── Review existing branch architecture
│   ├── Business ↔ Branch ownership
│   ├── Branch operational context
│   ├── Offering ↔ Branch relationship
│   ├── Business membership ↔ Branch relationship
│   ├── Inventory and or offering components implications
│   ├── Availability implications
│   └── Location/onboarding integration
│
├── STAGE 5 — MARKETPLACE ARCHITECTURAL STABILIZATION
│   ├── Discovery
│   ├── Search
│   ├── Categories
│   ├── Business Profiles
│   ├── Offering Profiles
│   ├── Public/published boundaries
│   ├── API contracts
│   └── Navigation/link relationships
│
├── STAGE 6 — OFFERING FRAMEWORK COMPLETION
│   ├── Remaining projections
│   ├── Lifecycle consistency
│   └── Offering-type contracts
│
└── STAGE 7 — MARKETPLACE EXPANSION
    ├── Favorites
    ├── Reviews
    ├── Recommendations
    ├── Nearby / Maps
    └── Transaction journeys
```

## Proposed implementation sequence

```text
                    CURRENT STATE
                         │
                         ▼
              Architecture Checkpoint
                         │
                         ▼
              ┌──────────────────────┐
              │ 1. Experience Shell  │
              └──────────────────────┘
                         │
                         ▼
                Header + Footer
                         │
                         ▼
              ┌──────────────────────┐
              │ 2. Identity          │
              └──────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     Verification   Recovery        Sign Out
                     / Reset
          │              │              │
          └──────────────┼──────────────┘
                         ▼
              ┌──────────────────────┐
              │ 3. Business Identity │
              └──────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ 4. Branch / Location │
              └──────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ 5. Onboarding        │
              └──────────────────────┘
                         │
                         ▼
              Regression / Review
                         │
                         ▼
              Marketplace Expansion
```

And crucially, we should not start coding Stage 1 yet.

The next step should be a short implementation inventory/review of the existing pieces, because I don't want us to create duplicate infrastructure.

For Stage 1, I would first inspect:

current applications/gateway/layouts
current applications/gateway/routes
current shared layout/
current shared/components
current applications/marketplace/layouts
current application router
current logo implementation
current authentication layout, if any

For Stage 2:

current Identity routes
authentication controllers/services
session service
password service
existing authentication pages
current session manager
current authentication service on the frontend
existing notification/email infrastructure

For Stage 4:

the existing Branch backend and frontend files mentioned above.

---

## The architectural decision

I recommend we lock in this model:

```text
                    TASSIAQCA PLATFORM
                           │
                           ▼
                 Platform Design System
                           │
             ┌─────────────┴─────────────┐
             │                           │
      Reusable UI/Layout          Platform Infrastructure
        primitives                   APIs / Context /
             │                       Navigation / Session
             ▼
                  Experience Shells
             │
     ┌───────┼────────┬────────────┐
     ▼       ▼        ▼            ▼
  Gateway Marketplace Business  Administration
   Shell      Shell      Shell       Shell
```

---

Establish /about, /privacy, and /terms as Gateway-owned public pages, but only as page foundations for now. We should not invent legal/privacy policy content before we have the platform's actual policies.

---

- We may proceed to REST tests, in each test give me the complete REST example.

- Tests ... all passed successfully and or returned the expected responses.

git commit -m "feat(Application): Create the AppShell."

For your information to avoid inconsistencies, here is the current state(s) of a portion of the folder structure and files we recently created or optimized:

Access and respond to what i have just attached

---
