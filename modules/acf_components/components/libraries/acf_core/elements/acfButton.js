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
    this.processed = false;
  }

  /**
   * We need to process the data attributes in connectedCallback since they may
   *   not be ready yet in the constructor.
   */
  connectedCallback() {
    if (!this.processed) {
      this.classList.add('coh-button', 'coh-style-button');
      this.getAttribute('data-classes') && this.classList.add(this.getAttribute('data-classes'));
      this.addEventListener('click', () => this.buttonClick());
      this.processed = true;
    }
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
