import Ember from 'ember';

// Promise that is responsible for loading the recaptcha script on-demand
// for the service below. This promise can be executed multiple times, and
// it will return the original result.
let getScript = new Ember.RSVP.Promise ((resolve, reject) => {
  window.grecaptcha_onload = () => {
    Ember.run (null, resolve, window.grecaptcha);
  };

  Ember.$ (window).ready (() => {
    Ember.$.getScript ('https://www.google.com/recaptcha/api.js?onload=grecaptcha_onload&render=explicit')
      .fail ((jqxhr) => {
        Ember.run (null, reject, jqxhr);
      });
  });
});

/**
 * Ember.js service for g-recaptcha. The service is the preferred approach because
 * we need to ensure the recaptcha script is not loaded multiple times, while allowing
 * the components to invoke methods on the grecaptcha window object.
 *
 * The service is used by reCAPTCHA-v2 and reCAPTCHA-invisible.
 */
export default Ember.Service.extend({
  init () {
    this._super (...arguments);

    const config = Ember.getOwner (this).resolveRegistration ('config:environment');
    this.set ('_siteKey', config.google.recaptcha.siteKey);
  },

  /// Site key for the application.
  siteKey: Ember.computed.alias ('_siteKey'),

  /**
   * Renders the container as a reCAPTCHA widget and returns the ID of the newly
   * created widget.
   *
   * @param container
   * @param params
   * @returns {RSVP.Promise|*}
   */
  render (container, params) {
    params = Ember.merge (params, {sitekey: this.get ('_siteKey')});

    return new Ember.RSVP.Promise ((resolve, reject) => {
      getScript.then ((grecaptcha) => {
        const widgetId = grecaptcha.render (container, params);

        Ember.run (null, resolve, widgetId);
      }).catch (reject);
    });
  },

  /**
   * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA
   * is on a div instead of a button.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  execute (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      getScript.then ((grecaptcha) => {
        grecaptcha.execute (widgetId);

        Ember.run (null, resolve);
      }).catch (reject);
    });
  },

  /**
   * Resets the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  reset (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      getScript.then ((grecaptcha) => {
        grecaptcha.reset (widgetId);

        Ember.run (null, resolve);
      }).catch (reject);
    });
  },

  /**
   * Gets the response for the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  getResponse (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      getScript.then ((grecaptcha) => {
        const res = grecaptcha.getResponse (widgetId);

        Ember.run (null, resolve, res);
      }).catch (reject);
    });
  }
});
