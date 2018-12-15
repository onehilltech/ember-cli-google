import Ember from 'ember';

export function initialize (app) {
  // Create the one and only tracker need for the application.
  let ENV = app.resolveRegistration ('config:environment');
  let trackerId = Ember.get (ENV, 'ember-cli-google.analytics.trackerId');

  Ember.assert ('Missing ember-cli-google.analytics.trackerId in config/environment.', !!trackerId);

  let cookieDomain = Ember.getWithDefault (ENV, 'ember-cli-google.analytics.cookieDomain', 'auto');
  let trackerName = Ember.get (ENV, 'ember-cli-google.analytics.trackerName');

  // We only apply Google Analytics in the production environment. Otherwise, we run
  // the risk of collecting analytics of the application while it is in development,
  // testing, or any non-production environment.
  let {environment} = ENV;
  let isProductionEnv = environment === 'production';

  if (isProductionEnv) {
    window.ga = window.ga || function () { (window.ga.q = window.ga.q || []).push (arguments); };
    window.ga.l =+ new Date();

    window.ga ('create', trackerId, cookieDomain, trackerName);
  }

  // We still go through the steps so we ensure the behavior is the same in all
  // environments and we do not run into any surprises.

  Ember.Route.reopen ({
    actions: {
      didTransition () {
        this._super (...arguments);

        if (isProductionEnv) {
          let {router} = this.getProperties (['routeName', 'router']);
          let url = router.get ('url');

          window.ga ('set', 'page', url);
          window.ga ('send', 'pageview');
        }
      }
    }
  });
}

export default {
  initialize
};
