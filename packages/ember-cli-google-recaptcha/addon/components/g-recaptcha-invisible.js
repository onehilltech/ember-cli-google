import CaptchaComponent from '../-private/g-recaptcha-base';

/**
 * @class GRecaptchaInvisibleComponent
 *
 * The component for invisible reRECAPTCHA
 */
export default class GRecaptchaInvisibleComponent extends CaptchaComponent {
  getOptions () {
    return {
      badge: this.badge
    }
  }

  get size () {
    return 'invisible';
  }

  get type () {
    return this.args.type || 'image'
  }

  get badge () {
    return this.args.badge || 'bottomright';
  }

  @action
  async run (element, [execute, reset]) {
    if (reset) {
      await this.reset ();
    }

    if (execute) {
      await this.execute ();
    }
  }

  async didRender () {
    if (this.args.execute) {
      await this.execute ();
    }
  }
}
