import Component from '@glimmer/component';

import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function noop () { }

export default class GRecaptchaBase extends Component {
  @service('g-recaptcha')
  grecaptcha;

  @tracked
  widgetId;

  @tracked
  response;

  get options () {
    const options = Object.assign ({
      size: this.size,
      type: this.type,
      theme: this.theme,
      tabindex: this.tabIndex,
      callback: this._callback.bind (this),
      'expired-callback': this._expiredCallback.bind (this)
    }, this.getOptions ());

    if (isPresent (this.args.siteKey)) {
      options.sitekey = this.args.siteKey;
    }

    return options;
  }

  @action
  async didInsert (element) {
    this.widgetId = await this.grecaptcha.render (element, this.options);

    // Let the subclasses know that we have rendered the recaptcha.
    await this.didRender ();
  }

  get theme () {
    return this.args.theme || 'light';
  }

  get tabIndex () {
    return this.args.tabIndex || 0;
  }

  getOptions () {

  }

  async didRender () {

  }

  /**
   * Callback function to be executed when the recaptcha response expires and the
   * user needs to solve a new CAPTCHA.
   *
   * @private
   */
  _expiredCallback () {
    (this.args.expired || noop) ();
  }

  /**
   * Reset the recaptcha component.
   */
  async reset () {
    // Reset the widget, and then reset the response. After we reset the
    // object, let's notify the subclasses that we actually reset the object.

    await this.grecaptcha.reset (this.widgetId);
    this.response = null;
  }

  /**
   * Execute the recaptcha response.
   */
  async execute () {
    try {
      // Notify the client we started the verification process.
      this.verifying (true);
      await this.grecaptcha.execute (this.widgetId);
    }
    catch (err) {
      // We are no longer verifying anything. Reset the state, and then
      // rethrow the error.
      
      this.verifying (false);
      throw err;
    }
  }

  get verifying () {
    return this.args.verifying || noop;
  }

  get verified () {
    return this.args.verified || noop;
  }

  /**
   * Callback when the component finished executing.
   */
  didExecute () {

  }

  /**
   * Callback when the component resets.
   */
  didReset () {

  }

  /**
   * Handle errors from the callback method.
   *
   * @param err       The error received.
   */
  didError (err) {

  }

  /**
   * The name of your callback function to be executed when the user submits
   * a successful CAPTCHA response. The user's response, g-recaptcha-response,
   * will be the input for your callback function.
   *
   * @private
   */
  async _callback () {
    try {
      this.response = await this.grecaptcha.getResponse (this.widgetId);

      // Let the client know we have verified the user.
      this.verified (this.response);
    }
    catch (err) {
      this.didError (err);
    }
    finally {
      //  We also need to let the client know the component has left the verifying
      //  state. This is different from the verified event.
      this.verifying (false);
    }
  }
}
