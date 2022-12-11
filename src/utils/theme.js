import { html } from 'lit';

export default function setTheme() {
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
  *, *:before, *:after { box-sizing: border-box; }
  
  :host {
    ${defaultColors.join(';\n')}
  }
  </style>`;
}
