/**
 * Custom button element. Use the 'data-event' attribute when implementing
 *  to choose the event to trigger when clicked.
 *
 * This button needs one or more data attributes to function properly:
 *  - data-event: the name of the function to associate to the click
 *  - data-arg1: optional first argument
 *  - data-arg2: optional second argument
 */

class acfButton extends HTMLElement {
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
      this.button = document.createElement('button');
      this.button.classList.add('coh-button', 'coh-style-button');

      // Add extra classes from data-classes (split by space)
      const extraClasses = this.getAttribute("data-classes");
      if (extraClasses) {
        extraClasses.split(" ").forEach(cls => this.button.classList.add(cls));
      }
      
      this.button.innerHTML = this.getAttribute('buttonText')
      this.button.addEventListener('click', () => this.buttonClick());
      this.appendChild(this.button);
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

customElements.define('acf-button', acfButton);
