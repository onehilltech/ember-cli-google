import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { merge } from '@ember/polyfills';
import { isPresent } from '@ember/utils';

import layout from '../templates/components/g-recaptcha';

function noop () { }

export default Component.extend({
  layout,

  mergedProperties: ['_extendedOptions'],

  /// The Google reCAPTCHA service.
  grecaptcha: service ('g-recaptcha'),

  /// Set the required class names for the reCAPTCHA element.
  classNames: ['g-recaptcha'],

  /// The attribute bindings for the component.
  attributeBindings: ['tabIndex:data-tabindex'],

  theme: 'light',

  tabIndex: 0,

  _response: null,

  reset: false,

  didInsertElement () {
    this._super (...arguments);

    let {
      size,
      type,
      theme,
      tabIndex,
      grecaptcha,
      siteKey,
      _callback,
      _expiredCallback,
      _extendedOptions
    } = this;

    let options = merge ({
      size,
      type,
      theme,
      tabindex: tabIndex,
      callback: _callback.bind (this),
      'expired-callback': _expiredCallback.bind (this)
    }, _extendedOptions);

    if (isPresent (siteKey)) {
      options.sitekey = siteKey;
    }

    grecaptcha.render (this.elementId, options).then (widgetId => {
      this.set ('widgetId', widgetId);
      this.didRenderCaptcha ();
    });
  },

  didRenderCaptcha () {

  },

  /**
   * The name of your callback function to be executed when the user submits
   * a successful CAPTCHA response. The user's response, g-recaptcha-response,
   * will be the input for your callback function.
   *
   * @private
   */
  _callback () {
    let {grecaptcha, widgetId} = this;

    grecaptcha.getResponse (widgetId).then (response => {
      this.set ('_response', response);

      // Let the client know we have verified the user.
      this.getWithDefault ('verified', noop) (response);

      // We also need to let the client know the component has left the verifying
      // state. This is different from the verified event.
      this.getWithDefault ('verifying', noop) (false);
    });
  },

  /**
   * Callback function to be executed when the recaptcha response expires and the
   * user needs to solve a new CAPTCHA.
   *
   * @private
   */
  _expiredCallback () {
    this.getWithDefault ('expired', noop) ();
  },

  /**
   * Reset the recaptcha component.
   */
  _reset () {
    let {grecaptcha, widgetId} = this;

    return grecaptcha.reset (widgetId).then (() => {
      this.didReset ();
      this.setProperties ({reset: false, _response: null});
    });
  },

  _execute () {
    let {grecaptcha, widgetId} = this;

    // Notify the client we started the verification process.
    this.getWithDefault ('verifying', noop) (true);

    return grecaptcha.execute (widgetId)
      .then (() => {
        this.didExecute ();
        this.set ('execute', false);
      });
  },

  didExecute () {

  },

  didReset () {

  }
});
