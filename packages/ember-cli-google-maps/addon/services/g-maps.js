import Service from '@ember/service';
import { isPresent, isNone, isEmpty } from '@ember/utils';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default Service.extend ({
  _includes: null,

  apiKey: computed (function () {
    const ENV = getOwner (this).resolveRegistration ('config:environment');
    const apiKey = get (ENV, 'ember-cli-google.maps.apiKey');

    if (isEmpty (apiKey)) {
      throw new Error ('The configuration must define ember-cli-google.maps.apiKey');
    }

    return apiKey;
  }),

  init () {
    this._super (...arguments);

    this._includes = A ([]);
  },

  include (library) {
    this._includes.pushObject (library);
  },

  getInstance () {
    if (isPresent (this._instance)) {
      return this._instance;
    }

    this._instance = new Promise ((resolve, reject) => {
      // This is for FastBoot support.
      if (isNone (window) || isNone (window.document)) {
        return resolve ();
      }

      window._gMapsInit = () => resolve ();

      // Load the recaptcha script from Google. We do not use jQuery because it is
      // easier and faster to load the script manually by injecting the script tag
      // into the head.
      const libraries = this._includes.toArray ().join(',');
      const script = document.createElement ('script');
      script.onerror = (err) => reject (err);

      script.defer = true;
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.get ('apiKey')}&callback=_gMapsInit`;

      if (isPresent (libraries)) {
        script.src += `&libraries=${libraries}`;
      }

      const head = document.querySelector ('head');
      head.appendChild (script);
    });

    return this._instance;
  }
});
