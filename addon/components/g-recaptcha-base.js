import Ember from 'ember';

export default Ember.Component.extend({
  /// The Google reCAPTCHA service.
  grecaptcha: Ember.inject.service ('g-recaptcha'),

  /// Set the required class names for the reCAPTCHA element.
  classNames: ['g-recaptcha'],

  /// The attribute bindings for the component.
  attributeBindings: ['tabIndex:data-tabindex'],

  tabIndex: 0,

  /**
   * Check if the widget has a response.
   */
  hasResponse: Ember.computed ('response', function () {
    const response = this.get ('response');
    return !Ember.isEmpty (response);
  }),

  /**
   * Callback for handling updates to the components attributes.
   * 
   * @param attrs
   */
  didUpdateAttrs () {
    this._super (...arguments);

    const reset = this.get ('reset');

    if (reset) {
      const widgetId = this.get ('widgetId');

      this.get ('grecaptcha').reset (widgetId).then (function () {
        this.didReset ();
      }.bind (this));
    }
  },

  /**
   * Callback that the widget has been reset.
   */
  didReset () {
    this._reset ();
  },

  /**
   * Reset the widget. After the widget has been reset, it will not have
   * a response.
   */
  _reset () {
    this.set ('reset', false);
    this.set ('response');
  },

  /**
   * The name of your callback function to be executed when the user submits
   * a successful CAPTCHA response. The user's response, g-recaptcha-response,
   * will be the input for your callback function.
   *
   * @private
   */
  _callback () {
    let grecaptcha = this.get ('grecaptcha');
    const widgetId = this.get ('widgetId');

    grecaptcha
      .getResponse (widgetId)
      .then (function (response) {
        // Store the response for the reCAPTCHA widget. This will allow us to
        // access it at a later time.
        this.set ('response', response);

        // Let the client (or parent) know that we have received a response. We,
        // however, are not going to tell them the response value since that is not
        // really important to them.
        this.get ('onResponse') (response);
      }.bind (this));
  },

  /**
   * Callback function to be executed when the recaptcha response expires and the
   * user needs to solve a new CAPTCHA.
   *
   * @private
   */
  _expiredCallback () {
    let onExpired = this.get ('onExpired');

    if (onExpired) {
      onExpired ();
    }
  }
});
