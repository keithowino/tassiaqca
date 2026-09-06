# Technical Dept

---

- Keyboard navigation
- Screen readers
- Semantic markup
- Color contrast
- Focus management
- Responsive behaviour
- Notification System - platform feedback

    ```text
    Success

    Error

    Warning

    Loading

    Confirmation
    ```

- Loading Experience

    ```text
    Skeletons

    Spinners

    Section Loaders

    Page Loaders

    Button Loaders
    ```

- Error Experience - Platform-wide

    ```text
    404

    403

    401

    500

    Offline

    Maintenance
    ```

---

- Not now, but eventually, `"lint": "eslint"`. We'll introduce ESLint after we've built a reasonable amount of the backend.
- Later we can replace Cloudinary with S3 or Azure Blob.

---

```bash
Inventory
├── Milestone 1 — Inventory Core        ✅
├── Milestone 2 — Stock Movements       ✅
├── Milestone 3 — Reservations
├── Milestone 4 — Warehouses (future)
└── Milestone 5 — Transfers (future)
```

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

```text
Marketplace
├── Bottom navigation?       Possibly later
├── Cart?                    Later
├── Favorites?               Later
└── Customer dashboard?      Later
```

Eventually gateway will have:

```text
/
 /about
 /how-it-works
 /business
 /contact
```

---

One architectural point is especially important here: we should not turn About, Privacy, and Terms into a generic “static pages” system yet. At this stage they are simply Public Website pages. If later we introduce documentation, Help Center, Pricing, Contact, etc., we can determine whether a genuine reusable content-page abstraction has emerged rather than prematurely creating one.

---
