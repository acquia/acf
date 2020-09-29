/**
 * ACF Mini cart component.
 */

 class miniCart extends fullCart {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
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

 }

customElements.define('mini-cart', miniCart);
