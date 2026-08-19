# TASSIAQCA

> Welcome to the neighborhood community-centric e-commerce and business discovery platform.

Scripted by [Pickaxe & Shovel](https://pickaxe-and-shovel.vercel.app/).

**Live Demo** https://tassiaqca.vercel.app/

## Table of Contents

- [Overview](#overview)
- [Vision](#vision)
- [Platform Model](#platform-model)
- [Core Experiences](#core-experiences)
- [Architecture](#architecture)
    - [Backend Architecture](#backend-architecture)
    - [Frontend Architecture](#frontend-architecture)
    - [Project Structure](#project-structure)
- [Offering Framework](#offering-framework)
- [Business Operating System](#business-operating-system)
- [Platform Domains](#platform-domains)
- [Technology Stack](#technology-stack)
- [Development](#development)
    - [Development Principles](#development-principles)
    - [Current Implementation Status](#current-implementation-status)
    - [Planned Enhancements](#planned-enhancements)
    - [Development Roadmap](#development-roadmap)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Support the Project](#support-the-project)
- [Version History](#version-history)

---

## Overview

TassiaQCA is a community-centric e-commerce and business discovery platform where businesses can showcase their offerings and community members can discover, shop, and engage with nearby vendors—all in one place.

TASSIAQCA is a modular, configurable platform designed to enable businesses of
different sizes and industries to establish, manage, and grow their digital
presence through a unified ecosystem.

### The Problem

Small businesses struggle with online visibility, while residents waste time searching for trusted local services and products.

### The Solution

A digital community marketplace where local businesses can list products and services, and residents can discover, order, review, and connect with nearby merchants.

It is not designed as a traditional e-commerce application.

The platform is being built to support diverse business models including:

- Retail
- Professional Services
- Restaurants
- Hospitality
- Education
- Healthcare
- Rentals
- Memberships
- Appointments
- Courses
- Digital Products
- Future business models

The central architectural objective is:

> **Build an operating system for neighborhood commerce rather than another
> specialized business application.**

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

## Vision

TASSIAQCA is designed as an ecosystem rather than a collection of independent
applications.

The platform connects:

```text
Visitors
   ↓
Customers
   ↓
Businesses
   ↓
Business Members
   ↓
Administrators
   ↓
Developers
   ↓
Integrations
```

Each actor interacts with the platform through an experience appropriate to
their responsibilities while sharing common infrastructure, identity,
configuration, and platform capabilities.

The long-term vision is to provide businesses with a single platform through
which they can:

- Establish an online presence
- Manage their organization
- Configure operational capabilities
- Manage staff
- Manage commercial offerings
- Interact with customers
- Process transactions
- Manage relationships
- Analyze performance
- Expand into new business models

The platform should adapt to the business rather than forcing the business
to adapt to the software.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Platform Model

TASSIAQCA is organized around several architectural layers.

```text
                         TASSIAQCA PLATFORM
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
   Marketplace          Business Operating        Administration
                              System
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                         Business Domains
                                │
        ┌───────────────┬───────┼────────┬──────────────┐
        │               │       │        │              │
     Identity       Business  Commerce  CRM          Finance
        │               │       │        │              │
        └───────────────┴───────┼────────┴──────────────┘
                                │
                       Platform Services
                                │
        ┌────────┬────────┬──────────┬─────────┬──────────┐
        │        │        │          │         │          │
      Audit    Events   Search   Notifications Workflow  Files
```

The important architectural distinction is that the **Business Operating
System is an experience**, not a backend domain.

Likewise, the Marketplace is a customer-facing experience rather than the
owner of business operational logic.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Core Experiences

TASSIAQCA is designed around several major platform experiences.

### Public Website

Introduces the platform and provides:

- Landing pages
- Documentation
- Business registration
- Pricing
- Help
- Marketing
- Platform information

---

### Marketplace

The customer-facing experience.

The Marketplace will allow customers to:

- Discover businesses
- Search offerings
- View business profiles
- Browse offerings
- Compare alternatives
- Purchase offerings
- Track their purchases
- Book services
- Request quotations
- Manage favorites
- Submit and view reviews
- Manage customer relationships
- Choose delivery and or pickup options
    - Flexible fulfillment choices with delivery fee calculation
- Experience a responsive design
    - Seamless experience across mobile, tablet, and desktop

The Marketplace should remain independent of the internal operational
structure of a business.

---

### Business Operating System

The Business Operating System provides the operational workspace for
businesses.

It dynamically assembles:

```text
Business
   ↓
Business Configuration
   ↓
Enabled Capabilities
   ↓
Navigation Registry
   ↓
Dashboard Builder
   ↓
Business Workspace
```

A retail business may receive:

```text
Commerce
├── Products
├── Categories
├── Inventory
├── Suppliers
└── Orders
```

A salon may receive:

```text
Commerce
├── Services
├── Staff
├── Calendar
└── Appointments
```

A restaurant may receive:

```text
Commerce
├── Menu
├── Kitchen
├── Ingredients
└── Reservations
```

The platform remains the same.

The business experience changes according to configuration and capabilities.

#### Features

- Comprehensive business workspace
    - Configure multiple businesses in one place.
- Performance Analytics
    - Monitor views, ratings, and business activity
- And more ...

---

### Platform Administration

Administration provides platform-level control including:

- User management
    - View and manage user accounts and roles.
- Business verification
    - Review, approve, or reject business listings.
- Content moderation
    - Manage reviews, community posts, user content, etc.
- Capability management
- Configuration
- Feature flags
- Platform analytics
    - Monitor ecosystem growth and activity metrics.
- System health
- Governance

Administrative functionality remains separate from business operational
functionality.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Architecture

TASSIAQCA follows a modular monolith architecture using Domain-Driven Design
principles.

The architecture emphasizes:

- Domain boundaries
- Modular design
- Configuration over specialization
- API-first development
- Security by default
- Extensibility
- Shared platform capabilities
- Clear ownership
- Incremental delivery

The platform is intentionally designed so that future domains can evolve
independently without forcing unrelated domains to change.

### Backend Architecture

Backend modules are organized around bounded contexts.

Each module generally follows:

```text
module/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── index.js
```

The dependency direction is:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Persistence
```

#### Controllers

Controllers translate HTTP requests into application commands.

Controllers should remain thin.

They must not contain business rules.

#### Services

Services orchestrate domain behavior and contain business rules.

#### Repositories

Repositories isolate persistence operations.

Repositories must not contain domain business rules.

#### Presenters

Presenters transform domain/persistence objects into API response
representations.

#### Validators

External input is validated using Zod.

---

### Frontend Architecture

The frontend is organized around user experiences rather than directly
mirroring backend domains.

The target platform experiences are:

```text
TASSIAQCA
│
├── Public Website
├── Marketplace
├── Business Operating System
├── Platform Administration
└── Developer Tools
```

Frontend principles include:

- Experience-oriented architecture
- Shared design language
- Modular features
- API-driven behavior
- Progressive expansion
- Backend-owned business rules

The frontend should consume configuration and metadata from the backend rather
than hard-code business capabilities.

---

### Project Structure

The repository follows the current project organization:

```text
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   ├── config/
│   │   │   ├── layouts/
│   │   │   ├── providers/
│   │   │   └── router/
│   │   ├── applications/
│   │   │   ├── administration/
│   │   │   ├── authentication/
│   │   │   ├── business/
│   │   │   ├── gateway/
│   │   ├── platform/
│   │   │   ├── api/
│   │   │   ├── bootstrap/
│   │   │   ├── configuration/
│   │   │   ├── context/
│   │   │   ├── dashboard/
│   │   │   ├── identity/
│   │   │   ├── journey/
│   │   │   ├── navigation/
│   │   │   ├── registries/
│   │   │   ├── routing/
│   │   │   ├── session/
│   │   │   ├── widgets/
│   │   │   └── workspace/
│   │   ├── shared/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
├── server/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   ├── config/
│   │   │   ├── routes/
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── modules/
│   │   │   ├── administration/
│   │   │   ├── analytics/
│   │   │   ├── audit/
│   │   │   ├── business/
│   │   │   ├── businessConfiguration/
│   │   │   ├── commerce/
│   │   │   ├── dashboard/
│   │   │   ├── identity/
│   │   │   ├── navigation/
│   │   │   └── offering/
│   │   └── shared/
```

The exact implementation structure may evolve as the architecture evolves.
The Architecture Specification remains the authoritative architectural
reference.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Offering Framework

Commerce is intentionally **not product-centric**.

Businesses may create value through:

- Products
- Services
- Rentals
- Bookings
- Memberships
- Subscriptions
- Courses
- Digital Downloads
- Packages
- Future Offering Types

TASSIAQCA therefore introduces the concept of an **Offering**.

```text
Offering
│
├── Product
├── Service
├── Rental
├── Booking
├── Membership
├── Subscription
├── Course
├── Digital Download
├── Package
└── Future Types
```

An Offering represents something a business makes available to customers.

The concrete implementation determines how that offering behaves operationally.

For example:

```text
Electronics Store
      │
    Laptop
      │
   Purchase


Salon
  │
Haircut
  │
 Book


Gym
 │
Membership
 │
Subscribe


Lawyer
  │
Consultation
  │
 Request
```

From the customer's perspective, all of these are commercial offerings.

The internal business workflows remain specialized.

---

### Product Projection

Product is the first concrete Offering specialization.

The architecture avoids duplicating shared Offering data inside Product.

Conceptually:

```text
Offering
│
├── Shared commercial identity
├── Name
├── Slug
├── Description
├── Status
├── Visibility
└── Lifecycle
       │
       ↓
    Product
       │
       ├── SKU
       └── Product-specific data
```

This allows future Offering Types to be introduced without redesigning the
Commerce domain.

The Offering Framework is therefore the foundation for making Commerce
industry-independent.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Business Operating System

The Business Operating System is assembled dynamically from capabilities.

It is not:

- A fixed dashboard
- A fixed industry application
- A standalone domain
- A collection of hard-coded business types

Instead:

```text
Business
   ↓
Business Type
   ↓
Business Configuration
   ↓
Capabilities
   ↓
Modules
   ↓
Navigation
   ↓
Dashboard
```

This enables different businesses to receive different operational
experiences while using the same underlying platform.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Platform Domains

The Architecture Specification defines the following major domains.

### Identity

Responsible for:

- Users
- Authentication
- Sessions
- Roles
- Permissions
- Business membership
- Authorization

---

### Business

Responsible for:

- Businesses
- Business Types
- Business Configuration
- Business Members
- Branches
- Branch Assignments
- Ownership
- Business-level configuration

---

### Commerce

Responsible for:

- Offerings
- Offering lifecycle
- Product specialization
- Services
- Rentals
- Bookings
- Memberships
- Packages
- Pricing
- Availability
- Fulfillment

Commerce owns **how businesses commercialize value**, not what type of
business they are.

---

### Marketplace

Responsible for customer-facing discovery and interaction:

- Discovery
- Search
- Business profiles
- Offering discovery
- Reviews
- Favorites
- Nearby discovery
- Checkout
- Booking
- Recommendations

---

### CRM

Planned capabilities include:

- Customer profiles
- Loyalty
- Membership management
- Campaigns
- Communication history
- Segmentation
- Rewards
- Engagement analytics

---

### Finance

Planned capabilities include:

- Invoicing
- Billing
- Payment reconciliation
- Expense tracking
- Financial reporting
- Tax support
- Subscription billing
- Revenue analytics

---

### Analytics

Responsible for future cross-platform analytics and business intelligence.

---

### Messaging

Responsible for communication capabilities and notification delivery.

---

### Scheduling

Provides reusable scheduling capabilities for businesses and offerings.

---

### Administration

Provides platform-level governance and operational management.

---

### Platform Services

Shared infrastructure sits beneath the business domains.

Examples include:

- Audit
- Event Bus
- Notifications
- Search
- Files
- Workflow
- Background Jobs
- Integrations
- Logging
- Monitoring

Platform Services provide infrastructure and should not become owners of
business-specific rules.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Technology Stack

| Category            | Technology                           |
| :------------------ | :----------------------------------- |
| Frontend            | React 19 + Vite                      |
| Styling             | Tailwind CSS                         |
| Routing             | React Router DOM v7                  |
| State Management    | React Context API - Planned          |
| HTTP Client         | Axios                                |
| Icons               | Lucide React                         |
| Backend             | Node.js + Express + Zod              |
| Database            | MongoDB + Mongoose ODM               |
| Authentication      | JWT (Cookie-based refresh sessions)  |
| Password Encryption | bcryptjs                             |
| Payment Integration | Daraja API (M-Pesa) - Planned        |
| Maps Integration    | Leaflet + React-Leaflet - Planned    |
| Build Tool          | Vite                                 |
| Hosting             | Render (Backend) + Vercel (Frontend) |

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

## Development

### Development Principles

The following principles must be preserved throughout implementation.

#### Architecture Before Features

Features must fit the architecture rather than redefine it.

#### Domain Ownership

Every capability must have a clear architectural owner.

#### Configuration Over Specialization

Prefer configuration and reusable capabilities over business-specific
implementations.

#### Shared Capabilities First

Common infrastructure should be built before specialized industry features.

#### Thin Controllers

HTTP handling belongs in controllers.

Business rules belong in services.

#### Repository Isolation

Persistence concerns belong in repositories.

#### No Cross-Domain Persistence Coupling

Domains should communicate through service contracts or domain events rather
than directly depending on another domain's persistence implementation.

#### Incremental Delivery

Implement and verify one architectural capability at a time.

---

#### Testing & Verification

Testing is part of implementation rather than a final step.

The project uses the following development loop:

```text
Plan
  ↓
Design
  ↓
Implement
  ↓
REST Client Test
  ↓
Verify Response
  ↓
Fix
  ↓
Commit
  ↓
Continue
```

API endpoints are manually tested using the VS Code REST Client extension
during development.

The broader architecture also targets:

- Unit testing
- Integration testing
- API testing
- Event testing
- Security testing
- Performance testing
- Accessibility testing
- End-to-end testing
- Manual exploratory testing

---

### Current Implementation Status

#### Platform Foundation

##### Identity — Implemented

- Registration
- Login
- Logout
- JWT authentication
- Refresh sessions
- Session management
- Password hashing
- Roles
- Permissions
- Business membership
- Authorization middleware

##### Business — Implemented

- Business creation
- Business updates
- Ownership
- Business members
- Member invitation
- Member removal
- Member deactivation
- Member reactivation
- Role changes
- Leaving a business
- Ownership transfer

##### Branches — Implemented

- Branch creation
- Branch listing
- Branch updates
- Branch deactivation
- Branch reactivation
- Head Office rules
- Branch validation
- Branch presenters

##### Branch Assignments — Implemented

- Member assignment
- Branch member listing
- Member branch listing
- Assignment deactivation
- Assignment reactivation
- Primary branch support
- Cross-business protection
- Assignment lifecycle

##### Audit — Implemented

A reusable Audit module is part of the platform infrastructure.

Audit records include concepts such as:

- Business
- Entity
- Action
- Actor
- Metadata
- IP address
- User agent

Business operations consume the shared Audit capability rather than creating
independent logging implementations.

---

##### Business Configuration

The platform has moved beyond fixed business applications.

The configuration architecture includes the concepts of:

- Business Types
- Capability Registry
- Module Registry
- Business Configuration
- Feature Flags
- Navigation generation
- Dashboard generation
- Capability-driven workspace composition

The purpose is to allow the platform to assemble business experiences
dynamically.

---

##### Commerce / Offering Framework

The Commerce architecture has been redesigned around the Offering abstraction.

##### Implemented direction

- Offering introduced as the common commercial abstraction.
- Product is treated as the first concrete specialization.
- Product no longer owns data that belongs to the shared Offering concept.
- Product-specific information remains within the Product projection.
- Commerce responsibilities are separated from Marketplace responsibilities.
- The architecture is prepared for additional Offering Types.

##### Future Offering Types

```text
Service
Rental
Booking
Membership
Subscription
Course
Digital Download
Package
```

These should extend the Offering architecture rather than create unrelated
commercial systems.

---

### Planned Enhancements

#### Payment & Financial Systems

- **M-Pesa Integration (Daraja API)** — Direct mobile payments
- **Multiple Payment Methods** — Card payments, bank transfers
- **Digital Receipts** — Email/SMS order confirmations
- **Wallet System** — In-app wallet for faster checkout
- **Business Payouts** — Automated settlement to business owners
- **Transaction History** — Detailed financial records for users

#### Maps & Location Services

- **Interactive Store Locator** — Leaflet.js integration
- **Real-time Delivery Tracking** — GPS-based order tracking
- **Geofencing** — Automatic store discovery based on location
- **Distance-based Delivery Fees** — Dynamic pricing based on distance
- **Store Directions** — Navigation assistance for pickup
- **Service Area Management** — Businesses define delivery zones

#### Communication & Engagement

- **Push Notifications** — Order updates, promotions, reminders
- **In-app Messaging** — Direct chat between customers and businesses
- **Live Order Updates** — Real-time WebSocket notifications
- **Email Marketing Integration** — Newsletter and campaign management
- **SMS Alerts** — Critical order notifications via text
- **Community Events Calendar** — Local event management

#### AI & Personalization

- **AI-Powered Recommendations** — Personalized product suggestions
- **Smart Search** — Semantic search with natural language processing
- **Predictive Inventory** — Stock prediction for businesses
- **Customer Segmentation** — Targeted marketing campaigns
- **Review Sentiment Analysis** — Automated review insights
- **Chatbot Support** — AI-powered customer service assistant

#### Business Intelligence

- **Advanced Analytics Dashboard** — Sales trends, customer behavior
- **Export Reports** — CSV/PDF exports for business owners
- **Competitor Analysis** — Benchmarking against similar businesses
- **Customer Lifetime Value** — Retention and loyalty metrics
- **Peak Hour Analysis** — Optimal operating hours recommendations
- **Inventory Alerts** — Low stock notifications

#### Social & Gamification

- **Loyalty Programs** — Points system for repeat customers
- **Referral System** — Earn rewards for inviting friends
- **Badges & Achievements** — Gamified user engagement
- **Social Media Integration** — Share products to Facebook, Twitter
- **Flash Sales** — Time-limited discounts and promotions
- **Group Buying** — Collective purchasing power discounts

#### Multi-tenant & Scalability

- **Multi-language Support** — English + Swahili + other local languages
- **Multi-currency Support** — Handle different currencies
- **Progressive Web App (PWA)** — Offline access and installable app
- **Mobile Native Apps** — React Native for iOS and Android
- **White-label Solution** — Customizable for other communities
- **API Rate Limiting** — Scalable request handling

#### Advanced Features

- **Voice Search** — Hands-free business discovery
- **Image Recognition** — Search products by photo
- **Augmented Reality** — Virtual product preview
- **Blockchain Receipts** — Immutable transaction records
- **Subscription Models** — Premium features for businesses
- **Affiliate Marketing** — Earn commissions on referrals

---

### Development Roadmap

| Quarter | Focus Area                     | Key Deliverables                       |
| :-----: | :----------------------------- | :------------------------------------- |
|  2026   | Core Platform Stability        | Complete MongoDB migration, bug fixes  |
|  2026   | Business Operating System      |                                        |
|  2026   | Offering Framework             |                                        |
|  2026   | Retail Commerce                |                                        |
|  2026   | Marketplace                    |                                        |
|  2026   | Industry Modules               |                                        |
|  2026   | Customer Relationship Platform |                                        |
|  2026   | Financial Platform             |                                        |
|  2026   | Platform Ecosystem             |                                        |
|  2026   | Maps & Location                | Store locator, delivery tracking       |
|  2027   | Intelligence & Automation      | Recommendations, smart search, chatbot |
|  2027   | Mobile Platform                | React Native iOS/Android applications  |
|  2027   | Scale & Expand                 | White-label solution, multi-language   |

The platform evolves through progressively larger capability layers.

#### Immediate Development Direction

The current implementation priority is to complete the Offering Framework
before moving deeper into industry-specific commerce features.

The immediate sequence is:

```text
Offering Framework
      ↓
Product Projection
      ↓
Offering Type Infrastructure
      ↓
Offering Lifecycle
      ↓
Additional Offering Types
      ↓
Retail Commerce
      ↓
Marketplace
```

This prevents the Commerce domain from returning to a product-centric
architecture.

---

#### Long-Term Platform

The completed platform is intended to support:

```text
Customers
    ↓
Businesses
    ↓
Employees
    ↓
Administrators
    ↓
Developers
    ↓
Partners
    ↓
AI Agents
```

Future capabilities may include:

- CRM
- Finance
- Messaging
- Scheduling
- Logistics
- Public APIs
- Developer tools
- Integrations
- Webhooks
- Mobile applications
- Workflow automation
- AI-assisted operations
- Predictive analytics
- Recommendation systems

These capabilities should be added without compromising existing domain
boundaries.

---

#### Architecture Success Criteria

Progress is measured by architectural outcomes rather than raw feature count.

The architecture should eventually demonstrate that:

- New industries can be introduced without redesigning the platform.
- New Offering Types can be introduced through extension rather than
  duplication.
- Business dashboards are generated dynamically.
- Navigation is capability-driven.
- Marketplace experiences work across different Offering Types.
- Cross-domain workflows can operate through events.
- Frontend experiences remain consistent across industries.
- Platform capabilities are reusable across multiple business models.

---

#### Documentation

The Architecture Specification is the primary architectural source of truth.

Important project documentation includes:

- `TassiaQCA Architecture Specification.docx`
- `FOLDER_STRUCTURE.md`
- `PROJECT_DIAGRAM.md`
- `README.md`

The Architecture Specification is a living document and should evolve through
deliberate architectural decisions rather than ad-hoc implementation changes.

---

#### Contributing to the Project

When implementing a new capability:

1. Understand the architecture.
2. Identify the owning domain.
3. Define entities and relationships.
4. Define business rules.
5. Define permissions.
6. Define the API surface.
7. Define repositories.
8. Define services.
9. Define presenters.
10. Define validators.
11. Implement incrementally.
12. Test through the REST Client.
13. Fix discovered issues.
14. Update documentation where necessary.
15. Commit the completed change.
16. Continue to the next capability.

Do not introduce shortcuts that collapse architectural layers or move business
rules into controllers or repositories.

> <a>[^ Back to table of contents ^](#table-of-contents)</a>

---

# Project Philosophy

TASSIAQCA is intentionally being built as a platform rather than a collection
of disconnected features.

The guiding principle is:

> **Platform before product.
> Capabilities before specialization.
> Configuration before duplication.
> Architecture before implementation.**

The ultimate objective is to provide neighborhood businesses with a unified
digital operating environment while giving customers a consistent way to
discover and interact with businesses regardless of their industry.

This README is deliberately conservative about implementation status. The Architecture Specification describes the **target architecture**, while the current implementation must not be presented as if every planned domain already exists. That distinction is explicitly important because the specification is a living blueprint rather than merely documentation of today's code. :contentReference[oaicite:2]{index=2}

## Acknowledgments

- **DeepSeek** — Primary AI assistant for development guidance
- **Bolt.new** — Accelerated initial prototyping
- **MongoDB Atlas** — Scalable database infrastructure
- **Render & Vercel** — Reliable hosting platforms
- **Local business owners** — Valuable feedback and testing
- **Community members** — Continuous support and engagement
- **Open Source Community** — Amazing tools and libraries

---

## Contact

**Keith Owino**

- Email: designsolutions1629@gmail.com
- GitHub: [@keithowino](https://github.com/keithowino)
- Portfolio: [Pickaxe & Shovel](https://pickaxe-and-shovel.vercel.app)
- Twitter: [@keithowino](https://twitter.com/keithowino)

**Project Links:**

- Repository: https://github.com/keithowino/tassiaqca
- Live Demo: https://tassiaqca.vercel.app/
- API Endpoint: https://tassiaqca.onrender.com

---

## Support the Project

If you find this project valuable, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs via Issues
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with your network

For business inquiries or partnerships, please reach out via email.

---

## Version History

| Version | Date       | Changes                                           |
| :------ | :--------- | :------------------------------------------------ |
| 1.0.0   | 2024-12-01 | Initial Firebase launch                           |
| 2.0.0   | 2026-01-15 | Complete MongoDB migration                        |
| 2.1.0   | 2026-03-01 | Cart system, order management                     |
| 2.2.0   | 2026-05-01 | Community board, reviews, favorites               |
| 2.3.0   | 2026-06-01 | Admin panel, analytics, performance optimizations |
| 2.4.0   | 2026-06-27 | Business domain                                   |

---

**Built with ❤️ for the Tassia Community**

_Empowering local businesses, connecting neighbors, building community._

> <a>[^ Back to table of contents ^](#table-of-contents)</a>
