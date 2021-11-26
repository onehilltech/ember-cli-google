import CaptchaComponent from '../-private/g-recaptcha-base';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';

export default CaptchaComponent.extend({
  classNames: ['g-recaptcha--invisible'],

  badge: 'bottomright',

  type: 'image',

  size: 'invisible',

  _extendedOptions: computed ('badge', function () {
    let badge = this.badge;
    return { badge };
  }),

  didRenderCaptcha () {
    // Handle reset the recaptcha.
    let execute = this.execute;

    if (execute) {
      this._execute ();
    }
  },

  didUpdate () {
    this._super (...arguments);

    const { reset, execute } = this;

    let promises = [];

    if (reset) {
      promises.push (this._reset ());
    }

    if (execute) {
      promises.push (this._execute ());
    }

    return Promise.all (promises);
  }
});
