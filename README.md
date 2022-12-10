# email-linker.js
<p align="center">
    <a href="./LICENSE" alt="apache 2.0 license">
      <img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
    </a>
    <a href="https://badge.fury.io/js/email-linker" alt="npm version">
        <img src="https://badge.fury.io/js/email-linker.svg">
    </a>
    <a href="https://badge.fury.io/js/email-linker" alt="npm version">
      <img src="https://badgen.net/bundlephobia/minzip/email-linker?color=green">
    </a>
    <a href="https://www.webcomponents.org/element/email-linker" alt="published on webcomponents.org">
        <img src="https://img.shields.io/badge/webcomponents.org-Email%20Linker-blue.svg?style=social">
    </a>
</p>

Creates a branded button to navigate a user to their email to verify their login automatically. So that you can ensure users don't drop their account creation flow.

<p align="center">
    <a href="./LICENSE" alt="apache 2.0 license">
      <img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
    </a>
    <a href="https://badge.fury.io/js/email-linker" alt="npm version">
        <img src="https://badge.fury.io/js/email-linker.svg">
    </a>
    <a href="https://badge.fury.io/js/email-linker" alt="npm version">
      <img src="https://badgen.net/bundlephobia/minzip/email-linker?color=green">
    </a>
    <a href="https://www.webcomponents.org/element/email-linker" alt="published on webcomponents.org">
        <img src="https://img.shields.io/badge/webcomponents.org-Email%20Linker-blue.svg?style=social">
    </a>
</p>


## What does it look like?
For gmail users, you they'll see this:

<img src="https://user-images.githubusercontent.com/5056218/206877156-b7c2df3f-2ec1-4169-bb03-2f58f015f153.png" width="400">

Just install the package:

* `npm install email-linker`
* And then reference it passing in the email

```html
<email-linker email="example-email@gmail.com" />
```

It's that easy.

## Automatically supported providers
* Gmail
* Outlook
* Yahoo
* Proton
* iCloud
* [Request another one](https://github.com/Rhosys/email-linker/issues) - and we'll implement it!


## Why use an email linker?

The results are clear from the this case study from [Growth.design](https://growth.design/sniper-link#experiment-result):

<img src="https://user-images.githubusercontent.com/5056218/206877116-3330761d-3600-4490-8642-3e2c3d5fe434.gif" width="600">

## What's the difference?

<img src="https://growth.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsniper-link-ab-test-experiment.3bb49b89.png&w=3840&q=75" width="600">

