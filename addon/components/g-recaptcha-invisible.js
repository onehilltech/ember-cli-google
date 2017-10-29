import CaptchaComponent from '../-private/g-recaptcha-base';

export default CaptchaComponent.extend({
  badge: 'bottomright',

  type: 'image',

  size: 'invisible',

  _extendedOptions: Ember.computed ('badge', function () {
    let badge = this.get ('badge');
    return {badge};
  }),

  didRenderCaptcha () {
    this._super (...arguments);

    let executeOnInitialRender = this.get ('executeOnInitialRender');

    if (executeOnInitialRender) {
      this.execute ();
    }
  },

  /**
   * Callback to the reset the component. Resetting the invisible reCAPTCHA will
   * automatically execute it again. This will force the widget to show the test
   * again, if necessary.
   */
  didReset () {
    this._super (...arguments);
    this.execute ();
  },
});
