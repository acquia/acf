/**
 * Wish list component.
 */

 class wishList extends HTMLElement {

   /**
   * Custom element constructor.
   */
   constructor() {
    super();
    this.renderList();
  }

   /**
    * Render the wishlist.
    */
  renderList() {
    let listData = this.getList();
    Object.keys(listData).length ? this.buildList(listData) : this.emptyMsg();
  }

  /**
   * Build the wishlist from the HTML snippets stored in local.
   */
  buildList(listData) {
    let wishlist = document.createElement("ul");
    // Loop through the list and make a line item for each
    Object.values(listData).forEach(async id => {
      let listItem = document.createElement("li");
      let productData = await ACF.cartManager.getProduct(id);
      let HTMLsnippet = productData.line_html;
      listItem.innerHTML = HTMLsnippet;
      wishlist.appendChild(listItem);
    });
    this.appendChild(wishlist);
  }

  /**
   * Build the empty list message
   * 
   * @TODO make this a configurable message from the component config
   */
  emptyMsg() {
    let message = "You don't have anything in your wishlist right now.";
    let wishlist = document.createElement("p");
    wishlist.appendChild(document.createTextNode(message));
    this.appendChild(wishlist);
   }

   /**
    * Get the list item out of storage.
    */
   getList() {
     let listData = ACF.get('acfWishList');
     return listData ? listData : new Object;
   }

 }

customElements.define('wish-list', wishList);
