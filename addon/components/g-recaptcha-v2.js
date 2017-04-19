import layout from '../templates/components/g-recaptcha-v2';
import CaptchaComponent from './g-recaptcha-base';

export default CaptchaComponent.extend({
  /// Layout for the add-on component.
  layout,

  /// The color theme of the widget.
  theme: 'light',

  /// The type of CAPTCHA to serve.
  type: 'image',

  /// The size of the widget.
  size: 'normal',

  didInsertElement () {
    this._super (...arguments);

    const options = {
      size: this.get ('size'),
      type: this.get ('type'),
      theme: this.get ('theme'),
      tabindex: this.get ('tabIndex'),
      callback: this.get ('_callback').bind (this),
      'expired-callback': this.get ('_expiredCallback').bind (this)
    };

    this.get ('grecaptcha')
      .render (this.elementId, options)
      .then (function (widgetId) {
        this.set ('widgetId', widgetId);
      }.bind (this));
  },

  actions: {
    /**
     * Reset the reCAPTCHA widget.
     */
    reset () {
      // Reset the base class.
      this._reset ();

      let grecaptcha = this.get ('grecaptcha');
      const widgetId = this.get ('widgetId');

      // Reset the widget, and the execute it again.
      grecaptcha
        .reset (widgetId)
        .then (() => {
          return grecaptcha.execute (widgetId);
        });
    }
  }
});
