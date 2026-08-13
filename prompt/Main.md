We set aside the creation of controllers/routes for the Categories component till we made this path work:

```bash
POST /offerings
      ↓
Offering
      +
Category assignments
      +
Pricing
```

Now that that persistence boundary through REST has been verified we may proceed to decide whether Categories needs independent API operations.
