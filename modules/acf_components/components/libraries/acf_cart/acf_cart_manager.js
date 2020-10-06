/**
 * Library for managing the ACF cart. We are extending the acfStorage class so
 *   we can use the same process for managing data, but with some cart specific
 *   additions.
 */

class acfCartManager {

  /**
   * Build the cart.
   */
  constructor() {
    // This endpoint is provided by acf_product module
    this.productAPI = '/api/acf/product/';
    this.calc = new acfCartCalculator;
    // @TODO: refactor to use this.cart instead of ACF.cart, and then update ACF.cart on this.update
    // Set event listeners
    ACF.events.on('acfAddPromoCode', this.setPromoCode.bind(this));
    ACF.events.on('acfRemovePromoCode', this.resetPromoCode.bind(this));
  }

  /**
   * Retrieves the cart, or instantiates an empty object.
   *   Note: this would also likely make an API call to get the cart from the
   *   decoupled ecommerce platform.
   */
  get() {
    let cart = ACF.get('acfCart');
    ACF.cart = cart ? cart : this._newCart();
    return cart;
  }

  /**
   * Updates the cart.
   */
  async update() {
    await this.calc.calcTotal();
    // Trigger event for other components to listen to and alter the cart.
    ACF.events.emit('acfUpdateCart');
    // Write to storage.
    ACF.set('acfCart', ACF.cart);
  }

  /**
   * Empty the cart.
   */
  empty() {
    ACF.cart = this._newCart();
    // Trigger event for other components to listen to.
    ACF.events.emit('acfEmptyCart');
    // Write to storage.
    ACF.set('acfCart', ACF.cart);
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
    this.get();
    // Generate the cart line item
    let lineId = this._generateLineId();
    // Add line item to cart
    ACF.cart.products[lineId] = {
      id: id,
      qty: quantity,
      attr: attributes
    }
    // Trigger event for other components to listen to.
    ACF.events.emit('acfAddToCart', id);
    // Update the cart.
    this.update();
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
  updateCartProduct(lineId, quantity, attributes) {
    this.get();
    if (ACF.cart.products[lineId]) {
      ACF.cart.products[lineId].qty = quantity;
      ACF.cart.products[lineId].attr = attributes;
      this.update();
    }
    else {
      console.log('ACF error: ' + lineId + ' is not a valid cart line id.');
    }
  }

  /**
   * Remove a line item from the cart.
   *
   * @param {number} lineId
   */
  removeFromCart(lineId) {
    this.get();
    let id = ACF.cart.products[lineId].id;
    delete ACF.cart.products[lineId];
    // Trigger event for other components to listen to.
    ACF.events.emit('acfRemoveFromCart', id);
    // Update or empty the cart.
    Object.keys(ACF.cart.products).length ? this.update() : this.empty();
  }

  /**
   * Set the promocode for the cart.
   *
   * @param {string} promoCode
   */
  setPromoCode(promoCode) {
    this.get();
    ACF.cart.promoCode = promoCode;
    this.update();
  }

  /**
   * Reset the promocode for the cart.
   *
   * @param {string} promoCode
   */
  resetPromoCode() {
    this.get();
    ACF.cart.promoCode = '';
    this.update();
  }

  /**
   * Get product data from storage. Load from API if needed.
   *
   * @param {number} id
   */
  async getProduct(id) {
    let storageId = this._labelProduct(id);
    let cacheAvailable = ACF.checkAcfStore(storageId);
    if (!cacheAvailable) {
      let data = await this.loadProduct(id);
      ACF.set(storageId, data);
    }
    return ACF.get(storageId);
  }

  /**
  * Get product data from API. By default this is assumed to use the content id
  *   in Drupal (node id).
  *
  * @param {number} id
  */
  async loadProduct(id) {
    let endpoint = this.productAPI + id + '?_format=json';
    let data = await ACF.fetchAsync(endpoint);
    return data[0];
  }

  /**
   * Helper - generates a unique line id.
   */
  _generateLineId() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxx'.replace(/[x]/g, function (c) {
      return (dt + Math.random() * 10) % 10 | 0;
    });
    return 'line' + uuid;
  }

  /**
   * Helper - write the local storage label for a product cache item. This
   *  ensures that we are controlling the product label in storage across all
   *  consumers of this library.
   *
   * @param {number} id
   */
  _labelProduct(id) {
    return 'acfProduct-' + id;
  }

  /**
   * Helper - generate a blank cart object with the structure we expect.
   */
  _newCart() {
    return {
      'products': {},
      'promoCode': '',
      'amount': {
        'subtotal': '0.00',
        'discount': '0.00',
        'tax': '0.00',
        'shipping': '',
        'total': '0.00'
      }
    }
  }

}
