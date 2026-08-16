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

---
