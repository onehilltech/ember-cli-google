/*global google*/

import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Load a set of packages needed for the charts.
   *
   * @param packages
   */
  load (packages, options, onLoadCallback) {
    if (Ember.isNone (onLoadCallback)) {
      onLoadCallback = options;
      options = {};
    }

    this.get ('_charts').then (() => {
      // Load the packages. As of version 45, you can call this method multiple times
      // and not have any negative side-effects.
      let loadOptions = Ember.merge ({ packages: packages }, options);
      google.charts.load ('current', loadOptions);

      if (onLoadCallback) {
        google.charts.setOnLoadCallback (() => {
          onLoadCallback ();
        });
      }
    });
  },

  /**
   * Get the singleton grecaptha instance from the window. If the instance does
   * not exist, it is installed by downloading the recaptcha script from online.
   */
  _charts: new Ember.RSVP.Promise ((resolve, reject) => {
    Ember.$ (window).ready (() => {
      Ember.$.getScript ('https://www.gstatic.com/charts/loader.js')
        .then (() => {
          Ember.run (null, resolve);
        })
        .fail ((jqxhr) => {
          Ember.run (null, reject, jqxhr);
        });
    });
  })
});
