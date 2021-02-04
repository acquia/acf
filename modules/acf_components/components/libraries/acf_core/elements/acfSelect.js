/**
 * Custom select element.
 *
 * This elements needs one or more data attributes to function properly:
 *  - data-options: JSON stringified object of name/value pairs (required)
 *  - data-name: name of the select element
 *  - data-classes: add additonal classes separated by a space
 *  - data-multiple: true/false on if this is a mulitple select
 *  - data-size: number of rows for a multiple select to display
 *  - data-disabled: true/false on if this is disabled
 *  - data-required: true/false on if this required
 *
 * Usage:
 *  HTML : <select is="acf-select" data-name="quantity"></select>
 *  JS : document.createElement('select', { is: 'acf-select' })
 *
 * @TODO: Extend this beyond just a select list to provide images and multiline
 *  text for the dropdown. Create a new custom element for this.
 */

class acfSelect extends HTMLSelectElement {
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
      this.classList.add('coh-select', 'coh-style-select', 'form-select');
      this.getAttribute('data-name') && this.setAttribute('name', this.getAttribute('data-name'));
      this.getAttribute('data-classes') && this.classList.add(this.getAttribute('data-classes'));
      this.getAttribute('data-multiple') && this.setAttribute('multiple');
      this.getAttribute('data-size') && this.setAttribute('size', this.getAttribute('data-multiple'));
      this.getAttribute('data-disabled') && this.setAttribute('disabled');
      this.getAttribute('data-required') && this.setAttribute('required');
      this.buildOptions();
      this.processed = true;
    }
  }

  /**
   * Simple function to build the options from the data attributes. This assumes
   *  that the value is a JSON stringified object of key/value pairs.
   */
  buildOptions() {
    let optionString = this.getAttribute('data-options') || this._defaultOptions();
    let options = JSON.parse(optionString);
    Object.entries(options).forEach(([key, value]) => {
      let option = document.createElement('option');
      option.setAttribute('value', key);
      option.innerHTML = value;
      this.appendChild(option);
    });
  }

  /**
   * Generates a default list of numbers if none is provided.
   */
  _defaultOptions() {
    let options = {};
    for (let i = 1; i < 11; i++) {
      options[i] = i;
    }
    return JSON.stringify(options);
  }
}

customElements.define('acf-select', acfSelect, { extends: 'select' });
