We should not immediately test Offering categories.

```bash
Category API tests
      ↓
Categories Offering Component
      ↓
Offering ↔ Category integration tests
```

And for the Category API itself, the first REST test should be Create Root Category, followed by Create Child Category, because that establishes that our ObjectId relationship actually works before we use those IDs in an Offering.

We may begin testing, In each test give me the complete http request example for me to test.
