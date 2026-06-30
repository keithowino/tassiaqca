> Add a lint script later

Not now, but eventually:

"lint": "eslint ."

We'll introduce ESLint after we've built a reasonable amount of the backend.

---

Step 8 — Express Setup

When we create app.js (or if you're keeping everything in server.js temporarily), the middleware order must be:

app.use(routes);

app.use(notFound);

app.use(errorHandler);

This order is important:

Routes
404 handler
Global error handler

Any other order leads to subtle bugs.

---
