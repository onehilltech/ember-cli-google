import Service from '@ember/service';

import { isPresent, isNone, isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default class GMapService extends Service {
  constructor() {
    super(...arguments);

    Object.defineProperty (this, '_includes', { value: A (), enumerable: false, writable: false, configurable: false });
    Object.defineProperty (this, '_maps', { value: new WeakMap (), enumerable: false, writable: false, configurable: false });
  }

  get apiKey() {
    const ENV = getOwner(this).resolveRegistration('config:environment');
    const apiKey = get(ENV, 'ember-cli-google.maps.apiKey');

    if (isEmpty(apiKey)) {
      throw new Error(
        'The configuration must define ember-cli-google.maps.apiKey'
      );
    }

    return apiKey;
  }

  /**
   * Include a library with the service.
   *
   * @param library
   */
  include(library) {
    this._includes.pushObject(library);
  }

  /**
   * Get the singleton instance.
   *
   * @return {Promise<unknown>}
   */
  getInstance() {
    if (isPresent(this._instance)) {
      return this._instance;
    }

    this._instance = new Promise((resolve, reject) => {
      // This is for FastBoot support.
      if (isNone(window) || isNone(window.document)) {
        return resolve();
      }

      window.__gMapsInit__ = () => resolve();

      // Load the maps script from Google. We do not use jQuery because it is
      // easier and faster to load the script manually by injecting the script tag
      // into the head.

      const libraries = this._includes.join(',');
      const script = document.createElement('script');
      script.onerror = (err) => reject(err);

      script.defer = true;
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=__gMapsInit__`;

      if (isPresent(libraries)) {
        script.src += `&libraries=${libraries}`;
      }

      document.head.appendChild (script);
    });

    return this._instance;
  }

  /**
   * Register a map with the service.
   *
   * @param element
   * @param map
   */
  register (element, map) {
    this._maps.set (element, map);
  }

  /**
   * Unregister a map with the service.
   *
   * @param element
   */
  unregister (element) {
    this._maps.delete (element);
  }

  /**
   * Get the map for the element.
   * *
   * @param element
   * @return {*}
   */
  mapFor (element) {
    return this._maps.get (element);
  }

}
