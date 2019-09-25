import CaptchaComponent from '../-private/g-recaptcha-base';

export default CaptchaComponent.extend({
  classNames: ['g-recaptcha--v2'],

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
