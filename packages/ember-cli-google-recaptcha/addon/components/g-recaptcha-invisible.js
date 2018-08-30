import CaptchaComponent from '../-private/g-recaptcha-base';
import { computed } from '@ember/object';

export default CaptchaComponent.extend({
  badge: 'bottomright',

  type: 'image',

  size: 'invisible',

  _extendedOptions: computed ('badge', function () {
    let badge = this.get ('badge');
    return {badge};
  }),

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
