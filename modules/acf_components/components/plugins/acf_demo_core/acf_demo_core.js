/**
 * Managing the core ACF functionality.
 *
 * We use the global ACF object to manage the state of the system across all
 *  components. This is an assumption we rely on for consistency. The global
 *  object will contain all of the most recent information, and then it will
 *  be copied to storage for retrieval on the next page load.
 */

// Create a single global ACF object
globalThis.ACF = new acfStorage;

// Extend the object with subsystems.
ACF.events = new acfEventEmitter;
ACF.cartManager = new acfCartManager;

// Instantiate the cart.
ACF.cartManager.get();
