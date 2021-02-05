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

   buildCart() {
     let cartList = document.createElement("ul");
     // Loop through the list and make a line item for each
     Object.entries(ACF.cart.products).forEach(async ([lineId, lineIdObj]) => {
       let productId = lineIdObj.id;
       let lineItem = document.createElement("li");
       let lineClass = this._lineItemClass(lineId);
       lineItem.classList.add(lineClass);
       lineItem.innerHTML = await this.buildLineItem(productId);
       cartList.appendChild(lineItem);
     });
    return cartList;
   }

 }

customElements.define('mini-cart', miniCart);
