/**
 * Cart promo code form
 */

 class promoCode extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    // Grab the DOM objects we want to work with
    this.button = this.querySelector('.coh-style-cart-promocode-button input');
    this.field = this.querySelector('.coh-style-cart-promocode-form input');
    // If a code exists, then add the class *before* rendering
    if (this.isEntered()) {
      this._codeApplied();
    }
    // Add event listener for clicking the button
    this.button.addEventListener('click', () => this.buttonClick());
   }

   /**
    * Check if the product is saved
    */
   isEntered() {
     return (ACF.cart.promoCode) ? true : false;
   }

   /**
    * Button click method - choose what to do.
    */
   buttonClick() {
     // Validate the promo code
     if (this.field.value) {
       ACF.events.emit('acfAddPromoCode', this.field.value);
       this._codeApplied();
     }
     else {
       ACF.events.emit('acfRemovePromoCode');
       this._codeRemoved();
     }
     // Reset input form
     this.field.value = '';
   }

  /**
   * Helper - apply the code if it is valid, and change form to reset.
   */
  _codeApplied() {
    this.classList.add('code-entered');
    this.button.value = 'Reset promo code';
  }

  /**
   * Helper - remove/reset the promo code and change form to take new code.
   */
  _codeRemoved() {
    this.classList.remove('code-entered');
    this.button.value = 'Apply';
  }

 }

customElements.define('cart-promocode', promoCode);
