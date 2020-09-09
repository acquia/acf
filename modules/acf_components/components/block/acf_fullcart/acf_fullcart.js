/**
 * ACF Full cart component.
 */

 class fullCart extends miniCart {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
  }

   /**
    * Build the HTML for a single line item on the full cart list.
    *
    * @param {number} lineId 
    */
   async buildLineItem(lineId) {
     let id = lineId.id;
     let productData = await this.storage.getProduct(id);
     // @TODO: modify this to add the quantity and attributes
     return productData.rendered_entity;
   }


 }

customElements.define('full-cart', fullCart);
