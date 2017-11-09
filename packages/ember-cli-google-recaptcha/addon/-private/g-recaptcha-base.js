import Ember from 'ember';
import layout from '../templates/components/g-recaptcha';

export default Ember.Component.extend({
  layout,

  mergedProperties: ['_extendedOptions'],

  /// The Google reCAPTCHA service.
  grecaptcha: Ember.inject.service ('g-recaptcha'),

  /// Set the required class names for the reCAPTCHA element.
  classNames: ['g-recaptcha'],

  /// The attribute bindings for the component.
  attributeBindings: ['tabIndex:data-tabindex'],

  theme: 'light',

  tabIndex: 0,

  /// Test if the recaptcha has a response.
  hasResponse: Ember.computed.bool ('_response'),

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

    let options = Ember.merge ({
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

  },

  didRender () {
    this._super (...arguments);

    // Handle reset the recaptcha.
    let reset = this.get ('reset');

    if (reset)
      this.resetCaptcha ();
  },

  execute () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);
    grecaptcha.execute (widgetId);
  },

  /**
   * Reset the reCATPCHA component.
   */
  resetCaptcha () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);

    grecaptcha.reset (widgetId).then (() => {
      this.setProperties ({reset: false, _response: null});
      this.didReset ();
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
      // Store the response for the reCAPTCHA widget. This will allow us to
      // access it at a later time.
      this.set ('_response', response);
    });
  },

  _responseChanged: Ember.observer ('_response', function () {
    // Let the client (or parent) know that we have received a response. We,
    // however, are not going to tell them the response value since that is not
    // really important to them.
    let {_response, verified} = this.getProperties (['_response', 'verified']);
    this.sendAction ('verified', _response);
  }),

  /**
   * Callback function to be executed when the recaptcha response expires and the
   * user needs to solve a new CAPTCHA.
   *
   * @private
   */
  _expiredCallback () {
    this.sendAction ('expired');
  }
});
