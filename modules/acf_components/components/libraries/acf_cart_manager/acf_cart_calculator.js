/**
 * Object to handle the cart calculations.
 */

class acfCartCalculator {

  /**
   * Build the calculator.
   */
  constructor() {
  }

  /**
   * Call all the methods necessary to calculate the totals.
   */
  async calcTotal() {
    let products = ACF.cart.products;
    let subtotal = await this.getSubtotal(products);
    let discount = this.getDiscount(subtotal);
    let total = parseFloat(subtotal) - parseFloat(discount);
    let taxes = this.getTaxes(total);
    total += parseFloat(taxes);
    let shipping = this.getShipping();
    total += this._twoDecimal(shipping);
    // Update the total
    total = this._twoDecimal(total);
    this.setTotal(total);
    return total;
  }

  /**
   * Calculate the total price of all items in the cart.
   *
   * @param {object} products
   */
  async getSubtotal(products) {
    let subtotal = 0.0;
    // Loop through the cart and add up each item
    for (let lineId of Object.keys(products)) {
      let id = products[lineId].id;
      let product = await ACF.cartManager.getProduct(id);
      let cost = (product.price_sale > 0) ? product.price_sale : product.price;
      let qty = products[lineId].qty || 1;
      subtotal += parseFloat(cost * qty);
    }
    // Update the subtotal
    if (subtotal) {
      this.setSubtotal(subtotal);
    }
    return this._twoDecimal(subtotal);
  }

  /**
   * Set the subtotal amount.
   *
   * @param {number} subtotal
   */
  setSubtotal(subtotal) {
    ACF.cart.amount.subtotal = this._twoDecimal(subtotal);
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
    return this._twoDecimal(taxes);
  }

  /**
   * Set the tax amount.
   *
   * @param {number} tax
   */
  setTaxes(tax) {
    ACF.cart.amount.tax = this._twoDecimal(tax);
  }

  /**
   * Placeholder for future shipping functionality.
   *
   * @param {number} shipping
   */
  getShipping() {
    let shipping = ACF.cart.amount.shipping;
    return this._twoDecimal(shipping);
  }

  /**
   * Apply the shipping amount to the totals and show/hide the shipping.
   *
   * @param {number} shipping
   */
  setShipping(shipping) {
    ACF.cart.amount.shipping = this._twoDecimal(shipping);
  }

  /**
   * Calulates the discount (if any) and updates the HTML totals.
   *
   * @param {number} subtotal
   */
  getDiscount(subtotal) {
    let discount = 0;
    let promoCode = ACF.cart.promoCode;
    // Calculate the discounted amount if we have a promocode
    if (promoCode) {
      let discountRate = this.getDiscountRate(promoCode);
      discount = (discountRate * subtotal) / 100;
    }
    // Update the cart totals if applicable
    if (discount) {
      this.setDiscount(discount, promoCode);
    }
    return this._twoDecimal(discount);
  }

  /**
   * Update the total component with the discount and promocode.
   *
   * @param {number} discount
   * @param {string} promocode
   */
  setDiscount(discount, promoCode) {
    ACF.cart.promoCode = promoCode;
    ACF.cart.amount.discount = this._twoDecimal(discount);
  }

  /**
   * A simple utililty function to easily grab the total by a different method.
   *  This matches the "get" pattern above.
   */
  getTotal() {
    return this.calcTotal();
  }

  /**
   * Update the total for the cart.
   *
   * @param {number} total
   */
  setTotal(total) {
    ACF.cart.amount.total = this._twoDecimal(total);
  }

  /**
   * Return the sales tax rate for the user.
   */
  getTaxRate() {
    return this._twoDecimal(7.5);
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
    return this._twoDecimal(discount);
  }

  /**
   * Helper - Convert numbers to a decimal with 2 places.
   *
   * @param {number} number
   */
  _twoDecimal(number) {
    return parseFloat(number).toFixed(2);
  }

}
