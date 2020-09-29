/**
 * ACF Cart total component.
 */

class cartTotal extends HTMLElement {

  /**
  * Custom element constructor.
  */
  constructor() {
    super();
    // Add event listeners
    this._setEvents();
    // Render the total
    this.updateTotal();
  }

  /**
   * Check and apply promo code. Wait a half second to be sure all other
   *  calculations are done elsewhere.
   */
  updateTotal() {
    setTimeout(this.renderTotal.bind(this), 0.5 * 1000);
  }

  /**
   * Update and render the cart totals.
   */
  renderTotal() {
    let amount = ACF.cart.amount;
    let el = this._setDOM();
    // Render the amounts from the cart.
    el.subtotal.innerHTML = amount.subtotal;
    el.tax.innerHTML = amount.tax;
    el.shipping.innerHTML = amount.shipping;
    el.discount.innerHTML = amount.discount;
    el.total.innerHTML = amount.total;
    el.promoCode.innerHTML = ACF.cart.promoCode;
    // Show/hide the shipping.
    if (amount.shipping) {
      el.shipping.style.display = "block";
    }
    else {
      el.shipping.style.display = "none";
    }
    // Show/hide the discount.
    if (ACF.cart.promoCode) {
      el.discountBlock.classList.remove('hide');
    }
    else {
      el.discountBlock.classList.add('hide');
    }
  }

  /**
   * Helper - assign the DOM elements we are working with to an object we can
   *  easily use.
   */
  _setDOM() {
    let el = {};
    el.subtotal = this.querySelector('#acf-cart-subtotal .coh-style-total-val');
    el.tax = this.querySelector('#acf-cart-tax .coh-style-total-val');
    el.shipping = this.querySelector('#acf-cart-shipping .coh-style-total-val');
    el.discountBlock = this.querySelector('#acf-cart-discount');
    el.discount = this.querySelector('#acf-cart-discount .coh-style-total-val');
    el.promoCode = this.querySelector('#acf-cart-discount .coh-style-promocode');
    el.total = this.querySelector('#acf-cart-total .coh-style-total-val');
    return el;
  }

  /**
   * Helper - add event listeners
   */
  _setEvents() {
    ACF.events.on('acfUpdateCart', this.updateTotal.bind(this));
    ACF.events.on('acfEmptyCart', this.updateTotal.bind(this));
    // Add event listener for checkout button to clear cart
    // this needs to live elsewhere - like in a checkout button component
    let checkoutBtn = document.querySelector('a.coh-style-checkout');
    checkoutBtn.addEventListener('click', () => ACF.clearCart());
  }

}

customElements.define('cart-total', cartTotal);
