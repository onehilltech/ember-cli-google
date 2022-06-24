import CaptchaComponent from '../-private/g-recaptcha-base';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

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

  @action
  attachToSubmit (element) {
    const submitButton = element.querySelector ('button[type="submit"]');

    if (isPresent (submitButton)) {
      submitButton.addEventListener ('click', this.submit.bind (this), true);
    }
  }

  @action
  async submit (ev) {
    ev.stopPropagation ();
    ev.preventDefault ();

    await this.execute ();
  }
}
