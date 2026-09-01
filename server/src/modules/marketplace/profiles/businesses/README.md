## One correction before testing

There is one thing I would not implement yet: operating hours, gallery, reviews, ratings, and location directly inside this profile.

The specification says Business Profiles eventually present all of these, but the current source material establishes that location should reuse the existing Business/Branch concepts rather than creating a duplicate location system.

So the progression should be:

```text
Business Profile v1
├── Identity                 ✓
├── Description              ✓
├── Branding                 ✓
├── Contact                  ✓
├── Published Offerings      ✓
│
├── Operating Hours          later
├── Location / Branches      later
├── Gallery                  later
├── Reviews                  later
└── Ratings                  later
```
