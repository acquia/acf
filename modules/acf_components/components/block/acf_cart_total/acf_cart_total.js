/**
 * ACF Cart total component.
 */

class cartTotal extends HTMLElement {

  /**
  * Custom element constructor.
  */
  constructor() {
    super();
    // Instantiate the ACF cart storage object.
    this.storage = new acfCartStorage;
    // Set the DOM elements we want to manage.
    this.el = {};
    this.el.subtotal = this.querySelector('#acf-cart-subtotal .coh-style-total-val');
    this.el.taxes = this.querySelector('#acf-cart-tax .coh-style-total-val');
    this.el.shipping = this.querySelector('#acf-cart-shipping .coh-style-total-val');
    this.el.discount = this.querySelector('#acf-cart-discount .coh-style-total-val');
    this.el.promoCode = this.querySelector('#acf-cart-discount .coh-style-promocode');
    this.el.total = this.querySelector('#acf-cart-total .coh-style-total-val');
    // Add event listener for promo code
    let promobtn = document.querySelector('.coh-style-cart-promocode-button input');
    promobtn.addEventListener('click', () => this.applyPromoCode());
    // Add event listener for checkout button to clear cart
    // this needs to live elsewhere - like in a checkout button component
    let checkoutBtn = document.querySelector('.coh-button.coh-style-checkout');
    checkoutBtn.addEventListener('click', () => this.storage.clearCart());
    // @TODO figure out why this isn't working
    //this.addEventListener('acfPromoCodeAdded', () => this.applyPromoCode());
    // Render the total
    this.renderTotal();
  }

  /**
   * Update and render the cart totals.
   */
  renderTotal() {
    let cartData = this.storage.getCart();
    Object.keys(cartData).length ? this.buildTotal(cartData) : NULL;
  }

  /**
   * Call all the methods necessary to build and update the totals.
   * 
   * @param {object} cartData 
   */
  async buildTotal(cartData) {
    let subtotal = await this.getSubtotal(cartData);
    let discount = this.getDiscount(subtotal);
    let total = parseFloat(subtotal) - parseFloat(discount);
    let taxes = this.getTaxes(total);
    total += parseFloat(taxes);
    // Update the total
    total = this.convertDecimal(total);
    this.setTotal(total);
    return total;
  }

  /**
   * Calculate the total price of all items in the cart.
   * 
   * @param {object} cartData 
   */
  async getSubtotal(cartData) {
    let subtotal = 0.0;
    // Loop through the cart and add up each item
    for (let lineId of Object.keys(cartData)) {
      let id = cartData[lineId].id;
      let product = await this.storage.getProduct(id);
      subtotal += parseFloat(product.field_product_price_original);
    }
    // Update the subtotal
    if (subtotal) {
      this.setSubtotal(subtotal);
    }
    return this.convertDecimal(subtotal);
  }

  /**
   * Set the subtotal amount.
   * 
   * @param {number} subtotal 
   */
  setSubtotal(subtotal) {
    this.el.subtotal.innerHTML = this.convertDecimal(subtotal);
  }

  /**
   * Calculate the taxes for the cart totals.
   * 
   * @param {number} total 
   */
  getTaxes(total) {
    let taxRate = this.getTaxRate();
    let taxes = total ? (total * taxRate) / 100 : 0;
    // Update the cart totals if applicable
    if (taxes) {
      this.setTaxes(taxes);
    }
    return this.convertDecimal(taxes);
  }

  /**
   * Set the tax amount.
   * 
   * @param {number} taxes 
   */
  setTaxes(taxes) {
    this.el.taxes.innerHTML = this.convertDecimal(taxes);
  }

  /**
   * Allow the shipping component to trigger an event to alter this.
   *  Note that we run setShipping() regardless of the value so we 
   *  can show/hide this element.
   * 
   * @param {number} shipping 
   */
  getShipping(shipping) {
    this.setShipping(shipping);
    return this.convertDecimal(shipping);
  }

  /**
   * Apply the shipping amount to the totals and show/hide the shipping.
   * 
   * @param {number} shipping 
   */
  setShipping(shipping) {
    if (shipping) {
      this.el.shipping.style.display = "block";
      this.el.shipping.innerHTML = this.convertDecimal(shipping);
    }
    else {
      this.el.shipping.style.display = "none";
    }
  }

  /**
   * Calulates the discount (if any) and updates the HTML totals.
   * 
   * @param {number} subtotal
   */
  getDiscount(subtotal) {
    let discount = 0;
    let promoCode = localStorage.getItem('acfPromoCode');
    // Calculate the discounted amount if we have a promocode
    if (promoCode) {
      let discountRate = this.getDiscountRate(promoCode);
      discount = (discountRate * subtotal)/100;
    }
    // Otherwise, hide it.
    else {
      this.querySelector('#acf-cart-discount').classList.add('hide');
    }
    // Update the cart totals if applicable
    if (discount) {
      this.setDiscount(discount, promoCode);
    }
    return this.convertDecimal(discount);
  }

  /**
   * Update the total component with the discount and promocode.
   * 
   * @param {number} discount 
   * @param {string} promocode 
   */
  setDiscount(discount, promoCode) {
    this.querySelector('#acf-cart-discount').classList.remove('hide');
    this.el.discount.innerHTML = this.convertDecimal(discount);
    this.el.promoCode.innerHTML = promoCode;
  }

  /**
   * A simple utililty function to easily grab the total by a different method.
   *  This matches the "get" pattern above.
   */
  getTotal() {
    return this.buildTotal();
  }

  /**
   * Update the total for the cart.
   * 
   * @param {number} total 
   */
  setTotal(total) {
    this.el.total.innerHTML = total;
  }

  /**
   * Return the sales tax rate for the user.
   */
  getTaxRate() {
    return this.convertDecimal(7.5);
  }

  /**
   * Check and apply promo code.
   */
  applyPromoCode() {
    setTimeout(() => { this.renderTotal() }, 0.5 * 1000);
  }

  /**
   * Generate a discount from a promo code. For demo purposes, we are assuming
   *  that the first two numbers in the string are the discount. In a real
   *  world scenario, this would be making an API call to check the code.
   * 
   * @param {string} promoCode 
   */
  getDiscountRate(promoCode) {
    // Set the default discount rate
    let discount = 5;
    if (promoCode) {
      // Pull out the numbers and take the first two as the discount
      discount = promoCode.replace(/\D/g, '').substring(0, 2);
    }
    return this.convertDecimal(discount);
  }

  /**
   * Ensures that all numbers are converted properly to a decimal with 2 places.
   * 
   * @param {number} number 
   */
  convertDecimal(number) {
    return parseFloat(number).toFixed(2);
  }

}

customElements.define('cart-total', cartTotal);
