import layout from '../templates/components/g-recaptcha-invisible';
import CaptchaComponent from './g-recaptcha-base';


export default CaptchaComponent.extend({
  layout,

  /// Reposition the reCAPTCHA badge. 'inline' allows you to control the CSS.
  badge: 'bottomright',

  /// The type of CAPTCHA to serve.
  type: 'image',

  didInsertElement () {
    this._super (...arguments);

    const options = {
      size: 'invisible',
      type: this.get ('type'),
      badge: this.get ('badge'),
      tabindex: this.get ('tabIndex'),
      callback: this.get ('_callback').bind (this),
      'expired-callback': this.get ('_expiredCallback').bind (this)
    };

    let grecaptcha = this.get ('grecaptcha');

    grecaptcha
      .render (this.elementId, options)
      .then (function (widgetId) {
        this.set ('widgetId', widgetId);

        return grecaptcha.execute (widgetId);
      }.bind (this));
  },

  actions: {
    /**
     * Reset the widget.
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
