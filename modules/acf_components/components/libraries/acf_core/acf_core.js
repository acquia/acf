/**
 * Managing the core ACF functionality.
 * 
 * We use the global ACF object to manage the state of the system across all
 *  components. This is an assumption we rely on for consistency. The global 
 *  object will contain all of the most recent information, and then it will
 *  be copied to storage for retrieval on the next page load.
 */

// Create a single global ACF object
// @todo make this configurable from the UI
globalThis.ACF = new acfStorage;

// Extend the object with subsystems.
ACF.events = new acfEventEmitter;
ACF.cartManager = new acfCartManager;

// Add the cart object we will use to manage cart state.
ACF.cart = ACF.cartManager.get();

// Temporary fix for the demo - event listener for checkout buttons. These will
//  this will be added as a component later.
document.querySelector('a.coh-style-checkout').addEventListener('click', () => ACF.cartManager.empty());