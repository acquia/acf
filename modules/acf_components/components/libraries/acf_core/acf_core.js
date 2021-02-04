/**
 * Providing additional global ACF Core functionality.
 *
 * True core functionality is provided by the plugin chosen. By default this is
 *   the acf_demo_plugin library. However, we can create a "plugin" type
 *   component and assign "acf_core" as the parent to optionally override the
 *   default behavior.
 *
 * When a plugin is chosen, it will override the dependencies for acf_core and
 *   load the plugin library instead.
 */

// drupalSettings.component.plugins.ACFCore;

// Temporary fix for the demo - event listener for checkout buttons. These will
//  this will be added as a component later.
//let checkoutBtn = document.querySelector('a.coh-style-checkout')
//if (checkoutBtn) {
//  checkoutBtn.addEventListener('click', () => ACF.cartManager.empty());
//}

