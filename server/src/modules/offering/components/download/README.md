We should not automatically add Download to Course, Package, Subscription, etc.

For example, a Course may eventually contain downloadable course material, but that does not necessarily mean the Course itself is a Download offering. If downloadable resources become a first-class capability of Courses, that relationship should be explicitly designed later.

## Components it depends on

The direct architectural dependency should be minimal.

Potential relationship:

```text
Offering
   │
   └── Download
          │
          └── Media / Storage infrastructure
```

The Download component may reference a stored resource, while Media can remain responsible for media/file metadata.

It should not directly own or duplicate Media records unless the architecture explicitly requires that later.

## Frontend experience

Eventually the Business OS can consume this configuration to provide a dynamic Download experience.

For the business operator:

```text
Offering
 └── Download
      ├── Enable/disable downloads
      ├── Configure access
      ├── Configure limits
      └── Configure expiration
```

For the customer:

```text
Marketplace / Offering Details
             │
             ▼
       Purchase / Access
             │
             ▼
        Download UI
             │
             ▼
      Authorized Resource
```

---

One architectural point is especially important here: do not put a URL into assets merely to make the REST test convenient. The current schema explicitly models assets as references to assets owned by the Files platform service. Media's url is presentation/reference data for media; Download deliberately stores only the asset IDs.
