/**
 * Wish button. Uses vanilla JS to create a button that allows the user to add
 *   items to a wishlist using the ACF Storage library.
 *
 * Note that this assumes that the product data is rendered as an <article> from
 *   a node (drupal content entity).
 */

 class wishButton extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    // Grab the DOM objects we want to work with
    this.wishBtn = this.querySelector('.coh-style-wishbutton .coh-style-heartbutton');
    this.wishMsg = this.querySelector('.coh-style-wishbutton .coh-style-wishlistmessage');
    // Get node id. Assumes we are looking for the parent <article>
    this.parentNodeId = this.wishBtn.closest('article').dataset.historyNodeId;
    // Generate the product ID (label) to be used with ACF
    this.productId = ACF.cartManager._labelProduct(this.parentNodeId);
    // If it exists, then add the class *before* rendering
    if (this.isSaved()) {
      this.wishBtn.classList.add('saved');
      this.wishMsg.classList.add('save');
    }
    // Add event listener for clicking the button
     this.wishBtn.addEventListener('click', () => this.buttonClick());
  }

   /**
    * Button click method
    */
   buttonClick() {
    // Toggle the class and animation
    this.wishBtn.classList.toggle('saved');
    this.wishMsg.classList.toggle('save');
    // Load the product from API if not already done
    ACF.cartManager.getProduct(this.parentNodeId);
    // Update the wishlist
    this.isSaved() ? this.removeItem() : this.addItem();
   }

  /**
   * Get the list item out of storage
   */
  getList() {
    this.list = ACF.get('acfWishList') ? ACF.get('acfWishList') : new Object;
  }

   /**
    * Add item to wishlist. Use the ACF product label as the key and the id as
    *   the value.
    */
  addItem() {
    this.getList();
    this.list[this.productId] = this.parentNodeId;
    ACF.set('acfWishList', this.list);
    this.productSaved = true;
  }

  /**
   * Remove item from wishlist
   */
  removeItem() {
    this.getList();
    delete this.list[this.productId];
    ACF.set('acfWishList', this.list);
    this.productSaved = false;
  }

  /**
   * Check if the product is saved
   */
  isSaved() {
    this.getList();
    return (this.list[this.productId]) ? true : false;
  }

 }

customElements.define('wish-button', wishButton);
