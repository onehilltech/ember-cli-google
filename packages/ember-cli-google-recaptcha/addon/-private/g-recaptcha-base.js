import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { merge } from '@ember/polyfills';

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

  didInsertElement () {
    this._super (...arguments);

    let {
      size,
      type,
      theme,
      tabIndex,
      grecaptcha,
      _callback,
      _expiredCallback,
      _extendedOptions
    } = this.getProperties (['size', 'type', 'theme', 'tabIndex', 'grecaptcha', '_callback', '_expiredCallback', '_extendedOptions']);

    let options = merge ({
      size,
      type,
      theme,
      tabindex: tabIndex,
      callback: _callback.bind (this),
      'expired-callback': _expiredCallback.bind (this)
    }, _extendedOptions);

    grecaptcha.render (this.elementId, options).then (widgetId => {
      this.set ('widgetId', widgetId);
      this.didRenderCaptcha ();
    });
  },

  didRenderCaptcha () {
    // Handle reset the recaptcha.
    let reset = this.get ('reset');

    if (reset) {
      this.resetCaptcha ();
    }
  },

  didUpdate () {
    this._super (...arguments);

    let reset = this.get ('reset');

    if (reset) {
      this.resetCaptcha ();
    }
  },

  execute () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);
    return grecaptcha.execute (widgetId);
  },

  /**
   * Reset the reCATPCHA component.
   */
  resetCaptcha () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);

    return grecaptcha.reset (widgetId).then (() => {
      this.setProperties ({reset: false, _response: null});

      return this.didReset ();
    });
  },

  /**
   * Callback that the widget has been reset.
   */
  didReset () {

  },

  /**
   * The name of your callback function to be executed when the user submits
   * a successful CAPTCHA response. The user's response, g-recaptcha-response,
   * will be the input for your callback function.
   *
   * @private
   */
  _callback () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);

    grecaptcha.getResponse (widgetId).then (response => {
      this.set ('_response', response);
      this.getWithDefault ('verified', noop) (response);
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
  }
});
