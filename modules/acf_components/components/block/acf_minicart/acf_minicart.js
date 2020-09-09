/**
 * ACF Mini cart component.
 */

 class miniCart extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    // Instantiate the ACF cart storage object
    this.storage = new acfCartStorage;
    // Render the cart
    this.renderCart();
  }

   /**
    * Render the cart.
    */
   renderCart() {
     let cartData = this.storage.getCart();
     Object.keys(cartData).length ? this.buildCart(cartData) : this.emptyMsg();
   }

   /**
    * Build the HTML for the cart list.
    *
    * @param {string} cardData
    */
   buildCart(cartData) {
     let cartList = document.createElement("ul");
     // Loop through the list and make a line item for each
     Object.values(cartData).forEach(async lineId => {
       let lineItem = document.createElement("li");
       lineItem.innerHTML = await this.buildLineItem(lineId);
       cartList.appendChild(lineItem);
     });
     this.appendChild(cartList);
   }

   /**
    * Build the HTML for a single line item on the mini cart list.
    *
    * @param {number} lineId 
    */
   async buildLineItem(lineId) {
     let id = lineId.id;
     let productData = await this.storage.getProduct(id);
     return productData.rendered_entity;
   }

   /**
    * Build the empty cart message
    * 
    * @TODO make this a configurable message from the component config
    */
   emptyMsg() {
     let message = "You don't have anything in your cart right now.";
     let cartList = document.createElement("h4");
     cartList.appendChild(document.createTextNode(message));
     this.appendChild(cartList);
   }


 }

customElements.define('mini-cart', miniCart);
