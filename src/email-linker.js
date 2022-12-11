import { LitElement, css } from 'lit';

import buttonTemplate from './buttonTemplate';

export default class EmailLinker extends LitElement {
  constructor() {
    super();
    this.loading = true;
  }

  static get properties() {
    return {
      email: { type: String, attribute: 'email' },
      fromDomain: { type: String, attribute: 'from-email-domain' }
    };
  }

  static finalizeStyles() {
    return [
      css`
      .sign-in-button {
        border: none;
        cursor: pointer;
        min-height: 21px;
        min-width: 21px;
        background-color: white;
        box-shadow: 0 2px 5px #1D2F3B1A;
        color: var(--dark);
      
        border-radius: 5px;
        border-color: var(--info);
        padding: 10px 14px;
      
        font-family: 'Roboto', sans-serif;
        line-height: normal;
      }
      
      .sign-in-button:focus, .sign-in-button:active:focus {
        box-shadow: none;
      }
      
      .sign-in-button:hover:not(:disabled) {
        background-color: var(--primary);
        color: white
      }
      
      .sign-in-button:active:not(:disabled) {
        background-color: var(--gray);
        color: var(--light);
        border-color: var(--info);
      }
      
      .sign-in-button:active:disabled {
        color: var(--gray);
      }
      `
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
    return buttonTemplate.call(this);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }
}

if (!customElements.get('email-linker')) {
  customElements.define('email-linker', EmailLinker);
}
