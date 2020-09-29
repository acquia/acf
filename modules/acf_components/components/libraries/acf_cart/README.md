# ACF Cart
- Manages the storage and retrieval of product IDs
- Stores product ID, variation option, and quantity per row
- This object should be used most of the time

### Details
- Uses entity_list to create an `acf_cart` item in localstorage
- Uses entity_cache to retrieve/store product data
- `let cart = new acfCart();`
- Methods
-- `cart.add(id, qty, variation)`
-- `cart.update(id, qty, variation)`
-- `cart.get(id)`
-- `cart.delete(id)`
-- `cart.list()`