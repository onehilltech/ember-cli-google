/* global ga */

import Ember from 'ember';

export function initialize (app) {
  // Create the one and only tracker need for the application.
  let ENV = app.resolveRegistration ('config:environment');
  let trackerId = Ember.get (ENV, 'ember-cli-google.analytics.trackerId');

  Ember.assert ('Missing ember-cli-google.analytics.trackerId in config/environment.', !!trackerId);

  let cookieDomain = Ember.getWithDefault (ENV, 'ember-cli-google.analytics.cookieDomain', 'auto');
  let trackerName = Ember.get (ENV, 'ember-cli-google.analytics.trackerName');

  ga ('create', trackerId, cookieDomain, trackerName);

  Ember.Route.reopen ({
    actions: {
      didTransition () {
        this._super (...arguments);

        let {router} = this.getProperties (['routeName', 'router']);
        let url = router.get ('url');

        ga ('set', 'page', url);
        ga ('send', 'pageview');
      }
    }
  });
}

export default {
  initialize
};
