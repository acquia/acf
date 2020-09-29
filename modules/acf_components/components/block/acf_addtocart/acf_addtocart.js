/**
 * Add to cart button. Uses vanilla JS to create a button that allows the user
 * to add items to a cart using the ACF Cart library.
 * 
 * Note that this assumes that the product data is rendered as an <article> from
 *   a node (drupal content entity).
 */

 class cartButton extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    // Get node id. Assumes we are looking for the parent <article>
    this.parentNodeId = this.closest('article').dataset.historyNodeId;
    // Add event listener for clicking the button
    // @TODO: update to use the acfButton
    this.addEventListener('click', () => this.buttonClick());
  }

   /**
    * Button click method
    */
   async buttonClick() {
    // Disable the button to prevent multiple clicks
    this.disabled = true;
    // Set the variables for the cart line item
    // @TODO: update this to use a form as part of the button.
    // @TODO: ensure that we can't click this more than once until it resets.
    let id = this.parentNodeId;
    let quantity = 1;
    let attributes = [];
    // Run the button animation
    this._animateButton();
    // Load the product from API if not already done
    await ACF.cartManager.getProduct(id);
    // Update the cart
    ACF.cartManager.addToCart(id, quantity, attributes);
    // Enable the button again
    this.disabled = false;
  }

  /**
   * Helper - animate the button by changing classes over time.
   * @TODO make the classes, text, and timings configurable.
   */
  _animateButton() {
    this._changeClasses('coh-style-onclick', false);
    setTimeout(() => { this._changeClasses('coh-style-validate', 'coh-style-onclick') }, 1.5 * 1000);
    setTimeout(() => { this._changeClasses(false, 'coh-style-validate') }, 2.5 * 1000);
  }

  /**
   * Helper - manage the swapping of the classes and the changing of the text.
   *
   * @param {string} add
   * @param {string} remove
   */
  _changeClasses(add, remove) {
    // Swap classes
    if (add) {
      this.classList.add(add);
    }
    if (remove) {
      this.classList.remove(remove);
    }
    // Change button text
    if (add == 'coh-style-onclick') {
      this.innerHTML = 'Adding...'
    }
    if (add == 'coh-style-validate') {
      this.innerHTML = 'Success!'
    }
    if (!add) {
      this.innerHTML = 'Add to cart'
    }
  }

   /**
    * Generate the form to prepend the button.
    */
  buildButtonForm() {

  }

 }

customElements.define('addtocart-button', cartButton);
