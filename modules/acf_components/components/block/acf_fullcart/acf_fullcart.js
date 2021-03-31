/**
 * ACF Full cart component.
 */

 class fullCart extends HTMLElement {

  /**
  * Custom element constructor.
  */
  constructor() {
    super();
    // Instantiate the cart.
    this.renderCart();
    // Add listeners to update the cart.
    ACF.events.on('acfAddToCart', this.renderCart.bind(this));
    ACF.events.on('acfRemoveFromCart', this.renderCart.bind(this));
    ACF.events.on('acfEmptyCart', this.renderCart.bind(this));
  }

  /**
   * Render the cart.
   */
  renderCart() {
    let cartHTML = Object.keys(ACF.cart.products).length ? this.buildCart() : this._emptyMsg();
    this._removeCart();
    this.appendChild(cartHTML);
  }

  /**
   * Build the HTML for the cart list.
   */
  buildCart() {
    let cartList = document.createElement("ul");
    // Loop through the list and make a line item for each
    Object.entries(ACF.cart.products).forEach(async ([lineId, lineIdObj]) => {
      // Create the line from the rendered HTML provided by the CMS.
      let productId = lineIdObj.id;
      let lineItem = document.createElement("li");
      let lineClass = this._lineItemClass(lineId);
      lineItem.classList.add(lineClass);
      lineItem.innerHTML = await this.buildLineItem(productId);
      // Add the remove button.
      lineItem.appendChild(this.buildRemoveButton(lineId));
      // Attach the line item to the cart.
      cartList.appendChild(lineItem);
      // Set the default quantity and provide an onchange event listener.
      let select = lineItem.querySelector('[name="quantity"]');
      select.value = lineIdObj.qty;
      select.addEventListener('change', (event) => {
        ACF.cartManager.updateCartProduct(lineId, event.target.value, lineIdObj.attr);
      });
    });
    return cartList;
  }

  /**
   * Build the HTML for a single line item on the mini cart list.
   *
   * @param {number} productId
   */
  async buildLineItem(productId) {
    let productData = await ACF.cartManager.getProduct(productId);
    // @TODO: modify this to add the quantity and attributes
    return productData.line_html;
  }

  /**
   * Create an ACF button to remove the cart line item.
   *
   * @param {string} lineId
   */
  buildRemoveButton(lineId) {
    let event = this._lineItemEvent(lineId);
    // Register a one time event to remove this line item from the cart.
    ACF.events.once(event, this.removeLineItem.bind(this));
    // Build the button.
    let button = document.createElement('button', { is: 'acf-button' });
    button.textContent = 'X';
    button.setAttribute('data-event', event);
    button.setAttribute('data-arg1', lineId);
    button.setAttribute('data-classes', 'acf-remove-button');
    return button;
  }

  /**
   * Remove a line item from the cart listing.
   *
   * @param {string} lineId
   */
  removeLineItem(lineId) {
    ACF.cartManager.removeFromCart(lineId);
  }

  /**
   * Helper - generate a unique event based on the cart uniqie lineId.
   *
   * @param {string} lineId
   */
  _lineItemEvent(lineId) {
    return 'acfRemoveFromCart' + lineId;
  }

  /**
   * Helper - generate a unique class based on the cart uniqie lineId.
   *
   * @param {string} lineId
   */
  _lineItemClass(lineId) {
    return 'acfCart-' + lineId;
  }

  /**
   * Helper - remove the cart for rebuilding or replacement.
   * @TODO: replace this with the wrapper
   */
  _removeCart() {
    Array.from(this.children).forEach(function (element) {
      if (element) {
        element.remove();
      }
    });
  }

  /**
   * Helper - build the empty cart message
   *
   * @TODO make this a configurable message from the component config
   */
  _emptyMsg() {
    let message = document.createElement("h4");
    message.textContent = "You don't have anything in your cart right now.";
    let cartList = document.createElement("div");
    cartList.className = "empty-msg";
    cartList.appendChild(message);
    return cartList;
  }

 }

customElements.define('full-cart', fullCart);
