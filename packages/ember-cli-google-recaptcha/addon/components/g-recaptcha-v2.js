import CaptchaComponent from '../-private/g-recaptcha-base';
import {Promise} from "rsvp";

export default CaptchaComponent.extend({
  theme: 'light',

  type: 'image',

  size: 'normal',

  didUpdate () {
    this._super (...arguments);

    if (this.get ('reset')) {
      this._reset ();
    }
  }
});
