# Router({ mergeParams: true })

- Normally, every Express router has its own req.params.

    For example:

    ```js
    app.use("/businesses/:businessId/products", productRoutes);
    ```

- Inside productRoutes you might have:

    ```js
    router.get("/", controller.list);
    ```

- Without mergeParams: true: `req.params` would be: `{}`.
- The router only knows about its own routes. With `const router = Router({mergeParams: true});`
- Express copies parameters from the parent router. Now: `req.params` becomes: `{ businessId: "..." }`
- So inside the controller i can safely do `req.params.businessId` even though that parameter came from the parent router.

## Example

Parent router

```js
router.use("/:businessId/products", productRoutes);
```

Child router

```js
const router = Router({
	mergeParams: true,
});

router.get("/", listProducts);
```

Request

```http
GET /businesses/123/products
```
