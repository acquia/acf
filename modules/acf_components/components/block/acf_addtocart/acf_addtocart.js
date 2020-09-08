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
   buttonClick() {
    // Set the variables for the cart line item
    // @TODO: update this to use a form as part of the button.
    let id = this.parentNodeId;
    let quantity = 1;
    let attributes = [];
    // Load the product from API if not already done
    this.storage.getProduct(id);
    // Update the cart
    this.storage.addToCart(id, quantity, attributes);
   }

   /**
    * Generate the form to prepend the button.
    */
   buildButtonForm() {

   }

 }

customElements.define('addtocart-button', cartButton);
