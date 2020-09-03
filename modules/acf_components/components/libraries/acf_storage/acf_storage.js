/**
 * Library for retrieving and caching ACF data using localstorage.
 * 
 * We include methods for getting product data specifically because this is core
 *   functionality that we want to rely on for the cart and wishlist.
 * 
 * Note that this can be extended or changed to act as a middleware for a 
 *   headless ecommerce system.
 */

class acfStorage {

  /**
   * Set up the starting constants.
   */
  constructor() {
    // This endpoint is provided by acf_product module
    this.productAPI = '/api/acf/product/';
    // Default cache lifetime of 5 min
    this.cacheLifetime = 300000;
  }

/**
 * Get ACF data from storage.
 * 
 * @param {string} storageId
 */
  get(storageId) {
    return JSON.parse(localStorage.getItem(storageId));
  }

  /**
   * Set ACF data into storage & add the cache time.
   *   This expects the data to be an object if it will have cache refresh.
   * 
   * @param {string} storageId
   * @param {object} data
   */
  set(storageId, data) {
    // If this is has product data, add the time
    if (typeof data === 'object' && storageId.startsWith('acfProduct-')) {
      data.cacheTime = new Date().getTime();
    }
    return localStorage.setItem(storageId, JSON.stringify(data));
  }

  /**
   * Delete ACF data from storage.
   * 
   * @param {string} storageId
   */
  remove(storageId) {
    return localStorage.removeItem(storageId);
  }

  /**
   * Check localstorage for the id, and see if it needs to be refreshed. Return
   *   boolean if it is available or not. Stale data is assumed not available.
   *
   * @param {string} storageId
   * 
   * @returns {boolean}
   */
  checkAcfStore(storageId) {
    let available = false;
    let storageItem = this.get(storageId);
    // Check the cache time
    if (storageItem && storageItem.cacheTime) {
      let now = new Date().getTime();
      let age = now - storageItem.cacheTime;
      // If the age of the data is more than the cacheLifetime, then refresh.
      if (age > this.cacheLifetime) {
        available = true;
      }
    }
    return available;
  }

  /**
   * Create an async wrapper around fetch
   *
   * @param {string} apicall 
   */
  async fetchAsync(apicall) {
    let response = await fetch(apicall);
    return await response.json()
  }

  /**
   * Write the local storage label for a product cache item. This ensures that
   *   we are controlling the product label in storage across all consumers of 
   *   this library.
   * 
   * @param {number} id 
   */
  labelProduct(id) {
    return 'acfProduct-' + id;
  }

  /**
   * Get product data from storage. Load from API if needed.
   * 
   * @param {number} id
   */
  async getProduct(id) {
    let storageId = this.labelProduct(id);
    let cacheAvailable = this.checkAcfStore(storageId);
    if (!cacheAvailable) {
      let data = await this.loadProduct(id);
      this.set(storageId, data[0]);
    }
    return this.get(storageId);
  }

  /**
  * Get product data from API. By default this is assumed to use the content id
  *   in Drupal (node id).
  *
  * @param {number} id
  */
  async loadProduct(id) {
    let endpoint = this.productAPI + id + '?_format=json';
    return await this.fetchAsync(endpoint);
  }

}

