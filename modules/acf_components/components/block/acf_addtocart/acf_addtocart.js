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
    // Instantiate the ACF cart storage object
    this.storage = new acfCartStorage;
    // Add event listener for clicking the button
    this.addEventListener('click', () => this.buttonClick());
  }

   /**
    * Button click method
    */
   async buttonClick() {
    // Set the variables for the cart line item
    // @TODO: update this to use a form as part of the button.
    let id = this.parentNodeId;
    let quantity = 1;
    let attributes = [];
    // Run the button animation
    this.animateButton();
    // Load the product from API if not already done
    await this.storage.getProduct(id);
    // Update the cart
    this.storage.addToCart(id, quantity, attributes);
  }

  /**
   * Animate the button by changing classes over time.
   * @TODO make the classes, text, and timings configurable.
   */
  animateButton() {
    this.changeClasses('coh-style-onclick', false);
    setTimeout(() => { this.changeClasses('coh-style-validate', 'coh-style-onclick') }, 1.5 * 1000);
    setTimeout(() => { this.changeClasses(false, 'coh-style-validate') }, 2.5 * 1000);
  }

  /**
   * Manage the swapping of the classes and the changing of the text.
   *
   * @param {string} add
   * @param {string} remove
   */
  changeClasses(add, remove) {
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
