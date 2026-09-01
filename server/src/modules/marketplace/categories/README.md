> **IMPORTANT:**

- For a category to be returned it has to be _ACTIVE_, it has to have at least one associated _ACTIVE_, _PUBLIC_ and a searchable: true offering.

- your current Zod schema does not accept "null" as a special value; parentId is currently just a non-empty string. Therefore, do not run this test yet unless the intended API contract explicitly supports parentId=null.

---
