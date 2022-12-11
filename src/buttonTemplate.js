import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import buildUrl from './utils/urlBuilder';

function SetTheme() {
  const defaultColors = [
    `--primary: ${getComputedStyle(this).getPropertyValue('--primary').trim() || '#1D2F3B'}`,
    `--dark: ${getComputedStyle(this).getPropertyValue('--dark').trim() || '#000515'}`,
    `--light: ${getComputedStyle(this).getPropertyValue('--light').trim() || '#FFFFFF'}`,
    `--gray: ${getComputedStyle(this).getPropertyValue('--gray').trim() || '#465865'}`,
    `--info: ${getComputedStyle(this).getPropertyValue('--info').trim() || '#FFFFFF'}`,
    '',
  ];

  return html`
    <style>   
      :host {
        ${defaultColors.join(';\n')}
      }
    </style>`;
}

export default function buttonTemplate() {
  const { brandData, link } = buildUrl({ email: this.email, from: this.fromDomain });

  return html`
    ${SetTheme.call(this)}
    <button class="sign-in-button" part="button" @click="${(e) => { handleClick(e, link); }}">
      <div part="button-text-wrapper" style="display: flex; align-items: center;">
        ${unsafeHTML(brandData.templateHtml)}
        <span part="button-text" style="padding-left: 0.5rem">${brandData.buttonText}</span>
      </div>
    </button>
  `;
}

function handleClick(event, link) {
  window.open(link, '_self');
}
