> How does a customer subscribe to this offering, and what are the rules governing that subscription?

- For the current configuration-oriented implementation, the component should own things such as:
    - whether subscription is active;
    - whether approval is required;
    - subscription duration/interval;
    - whether the subscription renews;
    - potentially cancellation/renewal policy as the model evolves.

> A Subscription offering represents something whose commercial/access relationship is fundamentally recurring.

---

**OFFERING_TYPES.MEMBERSHIP**

Does not automatically use Subscription.

Membership and Subscription are related but deliberately separate concepts.

For example:

```text
Gym Membership
    ↓
Membership rules
    ↓
30-day access
```

versus:

```text
Netflix-like service
    ↓
Subscription
    ↓
recurring entitlement/billing relationship
```

A future offering could potentially use both, but we should not add SUBSCRIPTION to other registry definitions merely because the concepts are related.

## What components may depend on Subscription?

Future components/services could depend on Subscription configuration.

Most notably:

```text
Subscription
    ↓
Recurring Billing
```

and eventually:

```text
Subscription
    ↓
Entitlements
```

and:

```text
Subscription
    ↓
Customer Subscription
    ↓
Billing
    ↓
Payments
```

But those are future transactional domains, not part of this component.

The Subscription component should therefore expose stable configuration data without implementing those workflows prematurely.

## What business concept does it represent?

This is important.

The component represents:

> The rules governing how an Offering is subscribed to.

It does not represent an individual customer's subscription.

So we have two distinct concepts:

```text
OFFERING SUBSCRIPTION CONFIGURATION
                │
                ▼
"How can customers subscribe?"
```

versus the future:

```text
CUSTOMER SUBSCRIPTION
        │
        ▼
"Who subscribed?"
"when?"
"what status?"
"when does it renew?"
"what has been paid?"
```

The latter belongs to a future customer/commerce/billing workflow.

This distinction will prevent us from turning OfferingSubscription into a transactional customer-subscription model.

## What frontend experience will eventually consume it?

Primarily the Business Operating System.

A business owner/administrator could eventually see:

```text
Offering
└── Subscription
    ├── Active
    ├── Approval required
    ├── Subscription duration
    ├── Renewal
    └── Subscription policy
```

The customer-facing Marketplace will eventually consume the published subscription information, but it should not expose business-management controls.

The architecture explicitly separates Marketplace customer experience from the Business Operating System's operational tooling.

Eventually the customer journey could become:

```text
Marketplace
    ↓
Subscription Offering
    ↓
Subscribe
    ↓
Customer Subscription
    ↓
Billing / Payment
    ↓
Entitlement
```

But only the first configuration layer belongs to our current component.

## Subscription component design

For this first implementation:

- Owns: recurring subscription configuration for an Offering.
- Used by: OFFERING_TYPES.SUBSCRIPTION.
- Dependencies: none at the component level.
- Potential future dependencies: Pricing and Finance/Billing, but those should remain separate concerns.
- Validation: billing interval count must be a positive integer; billing interval unit must be supported.
- Core invariant: every active subscription configuration has a valid recurring billing interval.

---

The architecture distinguishes Membership and Subscription:

> - Membership → recurring participation
> - Subscription → recurring commercial relationship

and specifically describes Subscription through Billing Cycle, Renewal and Benefits/Expiration.

Actual recurring billing should eventually belong to the Finance domain, not this component. The Architecture Specification explicitly identifies Subscription Billing under the future Financial Platform.

So the dependency graph currently remains:

```text
Subscription
    │
    ├── Pricing       ← separate component
    │
    └── Finance/Billing ← future domain integration
```
