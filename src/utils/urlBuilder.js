/* eslint-disable no-underscore-dangle */
const _getDaysAgo = (num) => new Date().setDate(new Date().getDate() - num);
const _getHoursAgo = (num) => new Date().setHours(new Date().getHours() - num);

const buildDate = (provider, daysAgo, hoursAgo) => {
  if (provider === 'google') {
    return hoursAgo ? `+newer_than:${hoursAgo}h` : `+newer_than:${daysAgo}d`;
  }
  if (provider === 'yahoo' && daysAgo) {
    const yahooDay = new Date(_getDaysAgo(daysAgo));
    return ` after:"${yahooDay.toISOString().substr(0, 10)}"`;
  }
  if (provider === 'proton') {
    const protonSince = hoursAgo
      ? new Date(_getHoursAgo(hoursAgo))
      : new Date(_getDaysAgo(daysAgo)).setHours(0, 0, 0, 0);
    const protonDatestamp = Math.round(protonSince.valueOf() / 1000);
    return `&begin=${protonDatestamp}`;
  }
  return null;
};

const emailToProvider = (email) => {
  const domain = email?.match('@') ? email.split('@')[1] : email;
  
  if (!domain) {
    throw Error('No email provided');
  }

  if (domain.match(/(gmail|googlemail|google).com/)) {
    return 'google';
  }

  if (domain.match(/yahoo.(com|co.uk|fr|it)/) || domain.match(/(ymail|rocketmail).com/)) {
    return 'yahoo';
  }

  if (domain.match(/(outlook|live|hotmail|msn|passport).com/) || domain.match('passport.net')) {
    return 'microsoft';
  }

  if (domain.match('proton.me') || domain.match('protonmail.com')) {
    return 'proton';
  }

  if (domain.match('icloud.com')) {
    return 'icloud';
  }

  return null;
};

const templates = {
  google: {
    url: 'https://mail.google.com/mail/u/{USER_EMAIL}/#search/from%3A({FROM_EMAIL})+in%3Aanywhere{DATE}',
    buttonText: 'Open Gmail',
    templateHtml: '<svg width="21" height="21" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>'
  },
  microsoft: {
    url: 'https://outlook.live.com/mail/?login_hint={USER_EMAIL}', buttonText: 'Open Outlook',
    templateHtml: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421" height="21" width="21" viewBox="170 120 220 180" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m366.585 103.756h-118.187c-5.295 0-9.652 4.357-9.652 9.652v10.971l66.614 20.625 70.877-20.625v-10.971c0-5.295-4.357-9.652-9.652-9.652z" fill="#0364b8"/><path d="m387.58 209.659c1.007-3.165 1.811-6.391 2.406-9.659.001-1.635-.873-3.15-2.289-3.967l-.089-.048-.028-.013-74.507-42.444c-.321-.208-.654-.399-.996-.571-2.885-1.43-6.279-1.43-9.164 0-.342.172-.675.362-.997.571l-74.506 42.444-.028.013-.09.048c-1.415.817-2.289 2.332-2.288 3.967.595 3.268 1.399 6.494 2.406 9.659l79.002 57.78z" fill="#0a2767"/><path d="m334.99 124.379h-48.122l-13.894 20.625 13.894 20.623 48.122 41.247h41.247v-41.247z" fill="#28a8ea"/></g><path d="m238.746 124.379h48.122v41.247h-48.122z" fill="#0078d4"/><path d="m334.99 124.379h41.247v41.247h-41.247z" fill="#50d9ff"/><path d="m334.99 206.874-48.122-41.247h-48.122v41.247l48.122 41.248 74.465 12.154z" fill="#0364b8" fill-rule="nonzero"/><path d="m238.959 124.379h137.278" fill="none"/><path d="m286.868 165.627h48.122v41.247h-48.122z" fill="#0078d4"/><path d="m238.746 206.874h48.122v41.247h-48.122z" fill="#064a8c"/><path d="m334.99 206.874h41.247v41.247h-41.247z" fill="#0078d4"/><g fill-rule="nonzero"><path d="m308.805 263.369-81.079-59.121 3.396-5.974s73.867 42.072 74.994 42.705c.934.375 1.984.345 2.895-.083 1.051-.591 75.152-42.828 75.152-42.828l3.41 5.974z" fill="#0a2767" fill-opacity=".498039"/><path d="m387.697 203.966-.089.055-.021.014-74.506 42.444c-3.006 1.938-6.814 2.175-10.037.625l25.951 34.792 56.743 12.354v.028c2.675-1.935 4.263-5.044 4.262-8.346v-85.932c.001 1.634-.874 3.15-2.289 3.966z" fill="#1490df"/><path d="m389.986 285.932v-5.073l-68.629-39.103-8.284 4.716c-3.005 1.938-6.813 2.176-10.036.625l25.951 34.793 56.743 12.353v.028c2.675-1.936 4.262-5.044 4.262-8.346z" fill-opacity=".047059"/><path d="m389.643 288.565-75.229-42.856-1.341.763c-3.005 1.938-6.813 2.176-10.036.625l25.951 34.793 56.743 12.353v.028c1.925-1.396 3.31-3.415 3.918-5.713z" fill-opacity=".098039"/><path d="m227.402 204.056v-.069h-.068l-.207-.137c-1.334-.821-2.144-2.284-2.131-3.85v85.946c0 5.649 4.649 10.298 10.299 10.298h144.38c.858-.009 1.713-.124 2.543-.344.431-.075.848-.214 1.238-.412.146-.015.286-.062.412-.138.562-.23 1.094-.53 1.581-.894l.275-.206z" fill="#28a8ea"/><path d="m293.742 259.582v-112.282c-.015-5.022-4.142-9.149-9.164-9.164h-45.619v51.256l-11.557 6.586-.027.014-.089.048c-1.416.818-2.29 2.333-2.29 3.966v68.767-.028h59.582c5.022-.014 9.149-4.142 9.164-9.163z" fill-opacity=".098039"/><path d="m286.868 266.456v-112.282c-.015-5.021-4.143-9.148-9.164-9.164h-38.745v44.382l-11.557 6.586-.027.014-.089.048c-1.416.818-2.29 2.333-2.29 3.966v75.642-.028h52.708c5.021-.015 9.149-4.142 9.164-9.164zm0-13.749v-98.533c-.015-5.021-4.143-9.148-9.164-9.164h-38.745v44.382l-11.557 6.586-.027.014-.089.048c-1.416.818-2.29 2.333-2.29 3.966v61.892-.027h52.708c5.021-.015 9.149-4.142 9.164-9.164zm-6.875 0v-98.533c-.015-5.021-4.142-9.148-9.163-9.164h-31.871v44.382l-11.557 6.586-.027.014-.089.048c-1.416.818-2.29 2.333-2.29 3.966v61.892-.027h45.834c5.021-.015 9.148-4.142 9.163-9.164z" fill-opacity=".2"/><path d="m179.164 145.004h91.658c5.027 0 9.164 4.136 9.164 9.163v91.659c0 5.027-4.137 9.164-9.164 9.164h-91.658c-5.027 0-9.164-4.137-9.164-9.164v-91.659c0-5.027 4.137-9.163 9.164-9.163z" fill="#0078d4"/><path d="m196.584 182.593c2.435-5.189 6.367-9.532 11.288-12.47 5.453-3.122 11.662-4.677 17.943-4.496 5.817-.128 11.559 1.347 16.595 4.262 4.739 2.822 8.556 6.962 10.985 11.914 2.646 5.456 3.966 11.46 3.85 17.523.129 6.337-1.23 12.617-3.966 18.335-2.483 5.127-6.415 9.416-11.309 12.333-5.232 3.007-11.188 4.522-17.221 4.379-5.943.141-11.812-1.35-16.966-4.311-4.776-2.827-8.639-6.971-11.123-11.934-2.663-5.378-3.998-11.317-3.891-17.317-.118-6.283 1.189-12.511 3.822-18.218zm12.03 29.272c1.299 3.281 3.502 6.128 6.353 8.208 2.901 2.032 6.379 3.08 9.919 2.991 3.772.149 7.491-.932 10.594-3.08 2.816-2.08 4.961-4.942 6.167-8.229 1.356-3.664 2.024-7.547 1.973-11.453.042-3.94-.586-7.86-1.856-11.59-1.12-3.358-3.188-6.322-5.954-8.531-3.021-2.256-6.73-3.402-10.497-3.245-3.617-.094-7.173.96-10.154 3.011-2.904 2.087-5.156 4.958-6.49 8.277-2.95 7.599-2.967 16.031-.048 23.641z" fill="#fff"/></g><path d="m170 90.006h219.986v219.986h-219.986z" fill="none"/></svg>'
  },
  yahoo: {
    url: 'https://mail.yahoo.com/d/search/keyword=from%253A{FROM_EMAIL}{DATE}', buttonText: 'Open Yahoo',
    templateHtml: '<svg width="21" height="21" xmlns="http://www.w3.org/2000/svg" aria-label="Yahoo!" role="img" viewBox="0 0 512 512" fill="#fff"><rect width="512" height="512" rx="15%" fill="#5f01d1"/><g fill="#fff"><path d="M203 404h-62l25-59-69-165h63l37 95 37-95h62m58 76h-69l62-148h69"/><circle cx="303" cy="308" r="38"/></g></svg>'
  },
  proton: {
    url: 'https://mail.proton.me/u/0/all-mail#from={FROM_EMAIL}{DATE}', buttonText: 'Open Proton',
    templateHtml: '<svg width="21" height="21" viewBox="0 0 552 552" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 130C0 58.203 58.203 0 130 0H422C493.797 0 552 58.203 552 130V422C552 493.797 493.797 552 422 552H130C58.203 552 0 493.797 0 422V130Z" fill="white"/><path d="M102 149.043C102 142.266 109.898 138.559 115.111 142.888L253 257.4C266.334 268.473 285.666 268.473 299 257.4L436.889 142.888C442.102 138.559 450 142.266 450 149.043V384C450 403.882 433.882 420 414 420H138C118.118 420 102 403.882 102 384V149.043Z" fill="#6D4AFF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M322.981 237.484L323 237.5L253.558 298.841C241.728 309.29 224.046 309.554 211.911 299.461L102 208.053V149.043C102 142.266 109.898 138.559 115.111 142.888L253 257.4C266.334 268.473 285.666 268.473 299 257.4L322.981 237.484Z" fill="url(#paint0_linear_5497_105457)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M376 193.455V420H414C433.882 420 450 403.881 450 384V149.043C450 142.266 442.102 138.558 436.889 142.889L376 193.455Z" fill="url(#paint1_linear_5497_105457)"/><defs><linearGradient id="paint0_linear_5497_105457" x1="364.5" y1="277.5" x2="285.177" y2="-61.1409" gradientUnits="userSpaceOnUse"><stop stop-color="#E2DBFF"/><stop offset="1" stop-color="#6D4AFF"/></linearGradient><linearGradient id="paint1_linear_5497_105457" x1="556" y1="603.5" x2="285.302" y2="25.2311" gradientUnits="userSpaceOnUse"><stop offset="0.271019" stop-color="#E2DBFF"/><stop offset="1" stop-color="#6D4AFF"/></linearGradient></defs></svg>' },
  icloud: {
    url: 'https://www.icloud.com/mail/', buttonText: 'Open iCloud',
    templateHtml: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21px" height="21px" viewBox="0 0 21 21" version="1.1"><defs><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="305.20093" y1="598.59198" x2="305.785" y2="8.243759" gradientTransform="matrix(0.0348837,0,0,0.0348837,0.000000528256,-0.00000735166)"><stop offset="0" style="stop-color:rgb(43.921569%,93.72549%,100%);stop-opacity:1;"/><stop offset="1" style="stop-color:rgb(34.117647%,43.921569%,100%);stop-opacity:1;"/></linearGradient></defs><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:url(#linear0);" d="M 4.835938 0.0351562 L 16.164062 0.0351562 C 18.824219 0.0351562 20.964844 2.175781 20.964844 4.835938 L 20.964844 16.164062 C 20.964844 18.824219 18.824219 20.964844 16.164062 20.964844 L 4.835938 20.964844 C 2.175781 20.964844 0.0351562 18.824219 0.0351562 16.164062 L 0.0351562 4.835938 C 0.0351562 2.175781 2.175781 0.0351562 4.835938 0.0351562 Z M 4.835938 0.0351562 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 4.621094 5.988281 C 4.511719 5.988281 4.40625 6.007812 4.308594 6.046875 L 6.277344 8.074219 L 8.269531 10.136719 L 8.304688 10.179688 L 8.421875 10.296875 L 8.539062 10.421875 L 10.246094 12.171875 C 10.273438 12.1875 10.355469 12.265625 10.421875 12.296875 C 10.503906 12.339844 10.59375 12.378906 10.6875 12.378906 C 10.785156 12.382812 10.886719 12.355469 10.976562 12.3125 C 11.046875 12.277344 11.074219 12.230469 11.152344 12.171875 L 13.128906 10.128906 L 15.128906 8.074219 L 17.054688 6.089844 C 16.929688 6.023438 16.792969 5.988281 16.648438 5.988281 Z M 4.015625 6.234375 C 3.808594 6.433594 3.675781 6.730469 3.675781 7.070312 L 3.675781 13.726562 C 3.675781 14 3.761719 14.25 3.910156 14.4375 L 4.183594 14.175781 L 6.242188 12.179688 L 8.066406 10.414062 L 8.027344 10.371094 L 6.03125 8.3125 L 4.03125 6.25 Z M 17.316406 6.300781 L 15.371094 8.3125 L 13.378906 10.371094 L 13.339844 10.40625 L 15.238281 12.246094 L 17.296875 14.242188 L 17.417969 14.359375 C 17.53125 14.179688 17.59375 13.960938 17.59375 13.726562 L 17.59375 7.070312 C 17.59375 6.769531 17.488281 6.496094 17.316406 6.300781 Z M 8.296875 10.652344 L 6.480469 12.417969 L 4.417969 14.417969 L 4.15625 14.671875 C 4.292969 14.761719 4.449219 14.816406 4.621094 14.816406 L 16.648438 14.816406 C 16.851562 14.816406 17.039062 14.738281 17.191406 14.613281 L 17.0625 14.484375 L 15 12.484375 L 13.101562 10.652344 L 11.394531 12.410156 C 11.300781 12.472656 11.238281 12.539062 11.148438 12.582031 C 11.003906 12.648438 10.84375 12.707031 10.683594 12.703125 C 10.523438 12.703125 10.367188 12.636719 10.222656 12.566406 C 10.152344 12.53125 10.113281 12.496094 10.027344 12.425781 Z M 8.296875 10.652344 "/></g></svg>'
  },
};

const buildUrl = ({ email, from }) => {
  const provider = emailToProvider(email);
  const dateString = buildDate(provider, 1, 1);

  if (!provider) {
    return null;
  }

  const template = templates[provider];
  return {
    brandData: {
      buttonText: template.buttonText,
      templateHtml: template.templateHtml,
      icon: null
    },
    link: template.url.replace('{USER_EMAIL}', email).replace('{FROM_EMAIL}', from).replace('{DATE}', dateString || '')
  };
};

export default buildUrl;

