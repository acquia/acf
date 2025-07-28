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

class acfSelect extends HTMLElement {
  constructor() {
    super();
    this.processed = false;
  }

  connectedCallback() {
    if (!this.processed) {
      // Create actual <select> element inside the shadow DOM
      this.select = document.createElement("select");
      this.select.classList.add("coh-select", "coh-style-select", "form-select");

      // Add extra classes from data-classes (split by space)
      const extraClasses = this.getAttribute("data-classes");
      if (extraClasses) {
        extraClasses.split(" ").forEach(cls => this.select.classList.add(cls));
      }

      // Set attributes based on data-attributes
      this.getAttribute("data-name") && this.select.setAttribute("name", this.getAttribute("data-name"));
      this.getAttribute("data-multiple") === "true" && this.select.setAttribute("multiple", "multiple");
      this.getAttribute("data-size") && this.select.setAttribute("size", this.getAttribute("data-size"));
      this.getAttribute("data-disabled") === "true" && this.select.setAttribute("disabled", "disabled");
      this.getAttribute("data-required") === "true" && this.select.setAttribute("required", "required");

      this.buildOptions(); // Add options to select

      this.appendChild(this.select);
      this.processed = true;
    }
  }

  buildOptions() {
    let optionString = this.getAttribute("data-options") || this._defaultOptions();
    let options = JSON.parse(optionString);

    Object.entries(options).forEach(([key, value]) => {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      option.innerHTML = value;
      this.select.appendChild(option);
    });
  }

  _defaultOptions() {
    let options = {};
    for (let i = 1; i <= 10; i++) {
      options[i] = i;
    }
    return JSON.stringify(options);
  }
}

customElements.define("acf-select", acfSelect);
