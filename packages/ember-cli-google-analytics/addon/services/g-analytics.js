/* globals ga */

import Service, { service } from '@ember/service';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

/**
 * Normalize the page name as expected by Google Analytics.
 *
 * @param name
 * @returns {string}
 */
function normalizePageName(name) {
  return `/${name.replace('.', '/')}`;
}

export default class GoogleAnalyticsService extends Service {
  constructor() {
    super(...arguments);

    this.ga().then((ga) => this.configure(ga));
  }

  @service
  router;

  _trackPageViews = false;

  get trackPageViews() {
    return this._trackPageViews;
  }

  set trackPageViews(value) {
    if (this._trackPageViews === value) {
      return;
    }

    // Update the state.
    this._trackPageViews = value;

    if (this._trackPageViews) {
      this.router.on('routeDidChange', this, 'didTransition');
    } else {
      this.router.off('routeDidChange', this, 'didTransition');
    }
  }

  configure(ga) {
    // Create the one and only tracker need for the application.
    const ENV = getOwner(this).resolveRegistration('config:environment');
    const trackerId = get(ENV, 'ember-cli-google.analytics.trackerId');

    assert(
      'Missing ember-cli-google.analytics.trackerId in config/environment.',
      isPresent(trackerId),
    );

    const cookieDomain =
      get(ENV, 'ember-cli-google.analytics.cookieDomain') === undefined
        ? 'auto'
        : get(ENV, 'ember-cli-google.analytics.cookieDomain');

    const trackerName = get(ENV, 'ember-cli-google.analytics.trackerName');

    // Create the tracker for the application.
    ga('create', trackerId, cookieDomain, trackerName);

    // We only apply Google Analytics in the production environment. Otherwise, we run
    // the risk of collecting analytics of the application while it is in development,
    // testing, or any non-production environment.
    const { environment } = ENV;
    this.trackPageViews = environment === 'production';
  }

  destroy() {
    super.destroy();

    this.trackPageViews = false;
  }

  async didTransition(transition) {
    if (this.trackPageViews) {
      const ga = await this.ga();
      const { to } = transition;
      const page = normalizePageName(to.name);

      ga('send', 'pageview', page);
    }
  }

  _scriptPromise = null;

  async ga() {
    if (isPresent(window.ga)) {
      return window.ga;
    }

    if (isPresent(this._scriptPromise)) {
      return this._scriptPromise;
    }

    this._scriptPromise = new Promise((resolve, reject) => {
      // Dynamically load the Google Analytics script.
      const script = document.createElement('script');
      script.setAttribute(
        'src',
        'https://www.google-analytics.com/analytics.js',
      );
      script.async = true;

      script.onload = () => resolve(window.ga);
      script.onerror = reject;

      // Append the script tag to the document.
      document.body.appendChild(script);
    });

    return this._scriptPromise;
  }

  async send(category, action, label, value) {
    const ga = await this.ga();
    ga('send', 'event', category, action, label, value);
  }
}
