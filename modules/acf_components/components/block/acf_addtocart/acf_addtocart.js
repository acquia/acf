/**
 * Add to cart button. Uses vanilla JS to create a button that allows the user
 * to add items to a cart using the ACF Cart library.
 *
 * Note that this assumes that the product data is rendered as an <article> from
 *   a node (drupal content entity).
 */

 class addToCartForm extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    this.attr = {};
    // Get node id. Assumes we are looking for the parent <article>
    this.parentNodeId = this.closest('article').dataset.historyNodeId;
    // Build the quantity select.
    this.buildQuantitySelect();
    // Build the button.
    this.buildButton();
  }

  /**
   * Create an ACF button to remove the cart line item.
   *
   * @param {string} lineId
   */
  buildButton() {
    let event = 'AddToCart' + this.parentNodeId;
    // Register an event to remove this line item from the cart.
    if (!ACF.events.checkButtonEventExists(event)) {
      ACF.events.on(event, this.buttonClick.bind(this));
    }
    // Build the button.
    let button = document.createElement('button', { is: 'acf-button' });
    button.textContent = 'Add to cart';
    button.setAttribute('data-event', event);
    // Add the button to this element.
    this.append(button);
  }

   /**
    * Button click method
    */
   async buttonClick() {
    // Set the variables for the cart line item
    let id = this.parentNodeId;
    let qty = this.querySelector('.coh-style-quantity').value;
    let attr = this.attr;
    // Run the button animation
    this._animateButton();
    // Load the product from API if not already done
    await ACF.cartManager.getProduct(id);
    // Update the cart
    ACF.cartManager.addToCart(id, qty, attr);
  }

   /**
    * Build the quantity select element.
    */
   buildQuantitySelect() {
    // Create the wrapper
    let wrapper = document.createElement('div');
    wrapper.classList.add('coh-style-quantity-wrapper');
    // Create the label;
    let label = document.createElement("label");
    label.classList.add('coh-style-quantity-label');
    label.innerHTML = 'Quantity';
    // Create the select list.
    let select = document.createElement('select', { is: 'acf-select' });
    select.classList.add('coh-style-quantity');
    select.setAttribute('name', 'quantity');
    // Add the label & select to the wrapper.
    wrapper.append(label);
    wrapper.append(select);
    // Add this to the element.
    this.append(wrapper);
   }

  /**
   * Helper - animate the button by changing classes over time.
   * @TODO make the classes, text, and timings configurable.
   */
  _animateButton() {
    let button = this.querySelector('.coh-button');
    // Disable the button to prevent multiple clicks
    button.disabled = true;
    // Run through the animations
    this._changeClasses(button, 'coh-style-onclick', false);
    setTimeout(() => { this._changeClasses(button, 'coh-style-validate', 'coh-style-onclick') }, 1.5 * 1000);
    setTimeout(() => { this._changeClasses(button, false, 'coh-style-validate') }, 2.5 * 1000);
    // Enable the button again
    button.disabled = false;
  }

  /**
   * Helper - manage the swapping of the classes and the changing of the text.
   *
   * @param {string} add
   * @param {string} remove
   */
  _changeClasses(element, add, remove) {
    // Swap classes
    if (add) {
      element.classList.add(add);
    }
    if (remove) {
      element.classList.remove(remove);
    }
    // Change button text
    if (add == 'coh-style-onclick') {
      element.innerHTML = 'Adding...'
    }
    if (add == 'coh-style-validate') {
      element.innerHTML = 'Success!'
    }
    if (!add) {
      element.innerHTML = 'Add to cart'
    }
  }

 }

customElements.define('addtocart-form', addToCartForm);
