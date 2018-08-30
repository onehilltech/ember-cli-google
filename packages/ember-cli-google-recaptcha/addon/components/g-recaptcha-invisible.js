import CaptchaComponent from '../-private/g-recaptcha-base';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';

export default CaptchaComponent.extend({
  badge: 'bottomright',

  type: 'image',

  size: 'invisible',

  _extendedOptions: computed ('badge', function () {
    let badge = this.get ('badge');
    return {badge};
  }),

  didRenderCaptcha () {
    // Handle reset the recaptcha.
    let execute = this.get ('execute');

    if (execute) {
      this._execute ();
    }
  },

  didUpdate () {
    this._super (...arguments);

    const { reset, execute } = this.getProperties (['reset', 'execute']);

    let promises = [];

    if (reset) {
      promises.push (this._reset ());
    }

    if (execute) {
      promises.push (this._execute ());
    }

    return Promise.all (promises);
  },

  _execute () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);
    return grecaptcha.execute (widgetId).then (() => {
      this.didExecute ();
      this.set ('execute', false);
    });
  },

  /**
   * The component did execute.
   */
  didExecute () {

  },

  /**
   * Reset the reCATPCHA component.
   */
  _reset () {
    let {grecaptcha, widgetId} = this.getProperties (['grecaptcha', 'widgetId']);

    return grecaptcha.reset (widgetId).then (() => {
      this.didReset ();
      this.setProperties ({reset: false, _response: null});
    });
  },

  didReset () {

  }
});
