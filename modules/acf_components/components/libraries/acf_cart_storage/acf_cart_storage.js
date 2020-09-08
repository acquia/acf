/**
 * Library for managing the ACF cart. We are extending the acfStorage class so
 *   we can use the same process for managing data, but with some cart specific
 *   additions.
 */

class acfCartStorage extends acfStorage {

  /**
   * Set up the starting constants.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves the cart, or instantiates an empty object.
   *   Note: this would also likely make an API call to get the cart from the
   *   decoupled ecommerce platform.
   */
  getCart() {
    let cart = this.get('acfCart');
    return cart ? cart : new Object;
  }

  /**
   * Add a product to the cart
   * 
   * @param {number} id
   *   The node id for the product.
   * @param {number} quantity
   *   The number of items to add.
   * @param {array} attributes
   *   An array of additional attributes like color, size, etc.
   */
  addToCart(id, quantity, attributes) {
    // Get updated cart info.
    let cart = this.getCart();
    // Generate the cart line item
    let lineId = this.generateLineId();
    cart[lineId] = {
      id: id,
      qty: quantity,
      attr: attributes
    }
    // Save the cart with the new line item.
    this.set('acfCart', cart);
  }

  /**
   * Update a line item in the cart.
   * 
   * @param {number} lineId
   *   The id for the line item in the cart to be updated.
   * @param {number} quantity
   *   The new quantity to use.
   * @param {array} attributes
   *   The new attributes array to use
   */
  updateCart(lineId, quantity, attributes) {
    // Get updated cart info.
    let cart = this.getCart();
    // Update the line item info
    cart[lineId] = {
      qty: quantity,
      attr: attributes
    }
    // Save the cart with the update line item.
    this.set('acfCart', cart);
  }

  /**
   * Remove a line item from the cart.
   * 
   * @param {number} lineId 
   */
  removeFromCart(lineId) {
    // Get updated cart info.
    let cart = this.getCart();
    // Remove the line item
    delete cart[lineId];
    // Save the cart without the line item.
    this.set('acfCart', cart);
  }

  /**
   * Generates a random 12 digit number for the cart line id.
   */
  generateLineId() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
      return (dt + Math.random() * 10) % 10 | 0;
    });
    return uuid;
  }

}