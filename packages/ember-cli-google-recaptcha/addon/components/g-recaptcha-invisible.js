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

  get listenToSubmit () {
    const { listenToSubmit = true } = this.args;
    return listenToSubmit;
  }

  @action
  async submit (ev) {
    // Prevent the default behavior of the form, which is to refresh the page.
    ev.preventDefault ();

    if (this.listenToSubmit) {
      await this.forceVerify ();
    }
  }

  @action
  async verify (element, [ verify ]) {
    if (verify) {
      await this.forceVerify ();
    }
  }

  /**
   * Force the verification of the user
   */
  async forceVerify () {
    // The client wants to to handle the submit event. We need to reset the
    // control if there is already a response. Otherwise, there is a chance the
    // response has already been used and it cannot be used again.

    if (isPresent (this.response)) {
      await this.reset ();
    }

    await this.execute ();
  }
}