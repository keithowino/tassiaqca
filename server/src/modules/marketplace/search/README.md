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

## Business domain: add the Marketplace-facing query contract

Business currently has active, but it does not have a separate published, visibility, or searchable field. Therefore, for this first Business Search implementation, we should treat active businesses as the public searchable business set, consistent with the Business Discovery implementation you have already tested.
