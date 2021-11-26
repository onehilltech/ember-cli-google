import Service from '@ember/service';

import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { merge } from '@ember/polyfills';
import { readOnly } from '@ember/object/computed';
import { Promise } from 'rsvp';
import { isNone, isPresent } from '@ember/utils';

/**
 * Ember.js service for g-recaptcha. The service is the preferred approach because
 * we need to ensure the recaptcha script is not loaded multiple times, while allowing
 * the components to invoke methods on the grecaptcha window object.
 *
 * The service is used by reCAPTCHA-v2 and reCAPTCHA-invisible.
 */
export default Service.extend ({
  init () {
    this._super (...arguments);

    const ENV = getOwner (this).resolveRegistration ('config:environment');
    this.set ('_siteKey', get (ENV, 'ember-cli-google.recaptcha.siteKey'));
  },

  /// Site key for the application.
  siteKey: readOnly ('_siteKey'),

  /**
   * Renders the container as a reCAPTCHA widget and returns the ID of the newly
   * created widget.
   *
   * @param container
   * @param params
   * @returns {RSVP.Promise|*}
   */
  render (container, params) {
    let siteKey = this.siteKey;
    let options = merge ({sitekey: siteKey}, params);

    return this.getInstance ().then (grecaptcha => grecaptcha.render (container, options));
  },

  /**
   * Manually invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a
   * div instead of a button.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  execute (widgetId) {
    return this.getInstance ().then (grecaptcha => grecaptcha.execute (widgetId));
  },

  /**
   * Resets the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  reset (widgetId) {
    return this.getInstance ().then (grecaptcha => grecaptcha.reset (widgetId));
  },

  /**
   * Gets the response for the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  getResponse (widgetId) {
    return this.getInstance ().then (grecaptcha => grecaptcha.getResponse (widgetId));
  },

  getInstance () {
    if (isPresent (this._instance)) {
      return this._instance;
    }

    this._instance = new Promise ((resolve, reject) => {
      // This is for Fastboot support.
      if (isNone (window) || isNone (window.document)) {
        return resolve ();
      }

      window._grecaptcha_onload = () => resolve (window.grecaptcha);

      // Load the recaptcha script from Google. We do not use jQuery because it is
      // easier and faster to load the script manually by injecting the script tag
      // into the head.
      const script = document.createElement ('script');
      script.onerror = (err) => reject (err);

      script.defer = true;
      script.async = true;
      script.src = 'https://www.google.com/recaptcha/api.js?onload=_grecaptcha_onload&render=explicit';

      const head = document.querySelector ('head');
      head.appendChild (script);
    });

    return this._instance;
  }
});
