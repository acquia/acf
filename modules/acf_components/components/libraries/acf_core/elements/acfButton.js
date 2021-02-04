/**
 * Custom button element. Use the 'data-event' attribute when implementing
 *  to choose the event to trigger when clicked.
 *
 * This button needs one or more data attributes to function properly:
 *  - data-event: the name of the function to associate to the click
 *  - data-arg1: optional first argument
 *  - data-arg2: optional second argument
 */

class acfButton extends HTMLButtonElement {
  constructor() {
    super();
    this.classList.add('coh-button', 'coh-style-button');
    this.addEventListener('click', () => this.buttonClick());
  }

  buttonClick() {
    let event = this.getAttribute('data-event');
    let arg1 = this.getAttribute('data-arg1');
    let arg2 = this.getAttribute('data-arg2');
    if (event) {
      ACF.events.emit(event, arg1, arg2);
    }
  }

}

customElements.define('acf-button', acfButton, { extends: 'button' });
