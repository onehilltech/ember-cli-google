# ember-cli-google-recaptcha

EmberJS add-on for using Google reCAPTCHA services

![npm version](https://img.shields.io/npm/v/ember-cli-google-recaptcha.svg.svg)
![node version](https://img.shields.io/node/v/ember-cli-google-recaptcha.svg.svg)
[![Dependencies](https://david-dm.org/onehilltech/ember-cli-google-recaptcha.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha)
[![devDependencies Status](https://david-dm.org/onehilltech/ember-cli-google-recaptcha/dev-status.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha?type=dev)

## Features

* Multiple reCAPTCHA components on the same page, and across different pages.
* Multiple site keys, and a default site key
* Seamless integration into an EmberJS application.
* Proper binding of attributes to options for real-time, dynamic updates.
* Handle events as actions for interactive designs.
* Auto-loading and configuring of scripts that correspond with appropriate lifecycle events.
* [FastBoot](https://www.ember-fastboot.com/) compatible.

## Installation

    ember install ember-cli-google-recaptcha
    
## Getting Started

### Configuring application for reCAPTCHA

Before you can use reCAPTCHA, you must first [sign up for the service](https://www.google.com/recaptcha), 
and register a new site. 

### v2

v2 reCAPTCHA shows a widget with a checkbox. The user must check the checkbox to verify they 
are not a robot.

```handlebars
{{g-recaptcha-v2 siteKey=siteKey
                 verified=(action (mut response))}}
```

The `siteKey` and `verified` component attributes are required. The `verified` action
has a single parameter -  the reCAPTCHA response. This response must be uploaded to your 
server when you submit your data.

### Invisible

Invisible reCAPTCHA does not show a widget. Instead, the verification process happens in the 
background whenever the you decide is best. For example, it can be when the page is first 
loaded or when the form is submitted. 

The invisible reCAPTCHA requires more coordination than [v2](#v2).

```handlebars
{{g-recaptcha-invisible siteKey=siteKey
                        verified=(action (mut response))
                        execute=reset
                        reset=reset
                        expired=(action "expired")}}
```

Unlike [v2](#v2), you must determine when to `execute` the reCAPTCHA, `reset` the reCAPTCHA,
and handle the `expired` action. Fortunately, this is not hard to do within EmberJS. As shown
in the example above, we are going to `execute` the reCAPTCHA whenever we `reset` it. This, however,
is not always required.

### Default siteKey

You can define a default `siteKey` in `config/environment.js`. This will allow you to 
omit the `siteKey` attribute on the reCAPTCHA components.

```javascript 1.6
let ENV = {
  // ...
  
  'ember-cli-google': {
    recaptcha: {
      siteKey: 'This is where my siteKey goes'
    }
  }
};
```

Happy Coding!
