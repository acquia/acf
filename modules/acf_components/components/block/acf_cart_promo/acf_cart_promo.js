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
    this.promoBtn = this.querySelector('.coh-style-cart-promocode-button input');
    this.promoField = this.querySelector('.coh-style-cart-promocode-form input');
    // Instantiate the ACF storage object
    this.storage = new acfStorage;
    // Create the promo code event
    this.promoEvent = new Event('acfPromoCodeAdded', { bubbles: true });
    // If it exists, then add the class *before* rendering
    if (this.isEntered()) {
      this.classList.add('code-entered');
    }
    // Add event listener for clicking the button
     this.promoBtn.addEventListener('click', () => this.buttonClick());
  }

   /**
    * Button click method
    */
   buttonClick() {
    // Get promocode
    let promoCode = this.promoField.value;
    // Toggle the class 
    this.classList.add('code-entered');
    // Add promo code to storage
    localStorage.setItem('acfPromoCode', promoCode);
    //this.storage.set('acfPromoCode', {'code': promoCode});
    // Trigger event for other components to listen to
    document.dispatchEvent(this.promoEvent);
    // Reset the field value
    this.promoField.value = '';
   }

  /**
   * Check if the product is saved
   */
  isEntered() {
    return (this.storage.get('acfPromo')) ? true : false;
  }

 }

customElements.define('cart-promocode', promoCode);
