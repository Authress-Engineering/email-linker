import { LitElement } from 'lit';

// Styles
import Styles from './styles/styles.js';

import mainBodyTemplate from './templates/mainBodyTemplate';

export default class EmailLinker extends LitElement {
  constructor() {
    super();
    this.loading = true;
  }

  static get properties() {
    return {
      email: { type: String, attribute: 'email' }
    };
  }

  static finalizeStyles() {
    return [
      Styles
    ];
  }

  // Startup
  connectedCallback() {
    super.connectedCallback();
  }

  // Cleanup
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return mainBodyTemplate.call(this);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }
}

if (!customElements.get('email-linker')) {
  customElements.define('email-linker', EmailLinker);
}
