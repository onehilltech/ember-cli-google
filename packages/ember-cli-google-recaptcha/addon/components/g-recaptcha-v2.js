import CaptchaComponent from '../-private/g-recaptcha-base';
import { action } from '@ember/object';

export default class GRecaptchaV2Component extends CaptchaComponent {
  get tabIndex () {
    return this.args.tabIndex || 0;
  }

  get theme () {
    return this.args.theme || 'light';
  }

  get type () {
    return this.args.type || 'image';
  }

  get size () {
    return this.args.size || 'normal';
  }

  @action
  async run (element, [reset]) {
    if (reset) {
      await this.reset ();
    }
  }
}
