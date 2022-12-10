import { html } from 'lit';

import SetTheme from '../utils/theme';
import ColorUtils from '../utils/color-utils';

export default function mainBodyTemplate() {
  const newTheme = {
    bg1: ColorUtils.isValidHexColor(this.bgColor) ? this.bgColor : '',
    bg2: ColorUtils.isValidHexColor(this.bgHeaderColor) ? this.bgHeaderColor : '',
    fg1: ColorUtils.isValidHexColor(this.textColor) ? this.textColor : '',
    primaryColor: ColorUtils.isValidHexColor(this.primaryColor) ? this.primaryColor : '#3E6077',
    secondaryColor: ColorUtils.isValidHexColor(this.secondaryColor) ? this.secondaryColor : '#FBAF0B',
    headerColor: ColorUtils.isValidHexColor(this.headerColor) ? this.headerColor : '',
    navBgColor: ColorUtils.isValidHexColor(this.navBgColor) ? this.navBgColor : '',
    navTextColor: ColorUtils.isValidHexColor(this.navTextColor) ? this.navTextColor : '',
    navHoverBgColor: ColorUtils.isValidHexColor(this.navHoverBgColor) ? this.navHoverBgColor : '',
    navHoverTextColor: ColorUtils.isValidHexColor(this.navHoverTextColor) ? this.navHoverTextColor : '',
  };

  /* eslint-disable indent */
  return html`
    ${SetTheme.call(this, newTheme)}

    <main>
      <!-- Main Content -->
      ${mailButton.call(this)}
    </main>
  `;
}

function mailButton() {
  return html`
    <button class="" @click="${(e) => { handleClick(e, this.email); }}">Click me</button>
  `;
}

function handleClick(event, email) {
  console.log('**** EMAIL', email);
}