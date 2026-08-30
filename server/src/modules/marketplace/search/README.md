## What we have deliberately NOT implemented

At this point, do not add:

```text
Search MongoDB model
Search index
Elasticsearch
Atlas Search
Redis search cache
Category search
Location search
Tag search
Brand search
Neighborhood search
Business search
```

The specification says Marketplace Search will eventually support businesses, businessType, offerings, categories, services, locations, tags, neighborhoods and brands, etc. but it does not require all of those to be implemented simultaneously.

Our first validated slice is therefore:

```text
Search
│
└── Offerings
    ├── text search
    ├── type filter
    ├── pagination
    └── published-only boundary
```
