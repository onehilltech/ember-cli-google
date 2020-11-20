import Service from '@ember/service';

import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { Promise } from 'rsvp';
import { isNone, isPresent } from '@ember/utils';

export default Service.extend({
  init () {
    this._super (...arguments);

    const ENV = getOwner (this).resolveRegistration ('config:environment');
    this.set ('_siteKey', get (ENV, 'ember-cli-google.recaptcha.siteKey'));

    this._instances = {};
  },

  /// The flyweight instances for each siteKey.
  _instances: undefined,

  /// Site key for the application.
  siteKey: readOnly ('_siteKey'),

  /**
   * Execute the recaptcha service.
   *
   * @param options         Execute options
   * @param siteKey         Optional site key overriding the default
   * @returns {*}
   */
  execute (options, siteKey) {
    siteKey = siteKey || this.siteKey;

    return this.getInstance (siteKey).then (grecaptcha => {
      return new Promise ((resolve, reject) => {
        grecaptcha.ready (function () {
          grecaptcha.execute (siteKey, options).then (resolve).catch (reject);
        });
      });
    });
  },

  getInstance (siteKey) {
    let promise = this._instances[siteKey];

    if (isPresent (promise)) {
      return promise;
    }

    promise = new Promise ((resolve, reject) => {
      // This is for Fastboot support.
      if (isNone (window) || isNone (window.document)) {
        return resolve ();
      }

      window._grecaptcha_onload = () => {
        return resolve (window.grecaptcha);
      };

      // Load the recaptcha script from Google. We do not use jQuery because it is
      // easier and faster to load the script manually by injecting the script tag
      // into the head.
      const script = document.createElement ('script');
      script.onerror = (err) => {
        return reject (err);
      };

      //script.defer = true;
      //script.async = true;
      script.src = `https://www.google.com/recaptcha/api.js?onload=_grecaptcha_onload&render=${siteKey}`;

      const head = document.querySelector ('head');
      head.appendChild (script);
    });

    this._instances[siteKey] = promise;
    return promise;
  }
});
