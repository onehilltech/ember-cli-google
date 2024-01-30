import { get } from "@ember/object";
import { deprecate } from "@ember/debug";

export function initialize(app) {
  const ENV = app.resolveRegistration("config:environment");
  const analytics = get(ENV, "ember-cli-google.analytics");

  if (analytics.version === "v4") {
    if (app.inject) {
      deprecate(
        "Use of Ember initializers to auto-inject Google Analytics services has been deprecated. Please manually inject @service gtag into your Ember objects.",
        false,
      );

      app.inject("route", "gtag", "service:gtag");
      app.inject("controller", "gtag", "service:gtag");
    } else {
      console.warn(
        "auto-injection is deprecated in Ember 5. Please manually inject @service gtag into your Ember objects.",
      );
    }
  } else {
    if (app.inject) {
      deprecate(
        "Use of Ember initializers to auto-inject Google Analytics services has been deprecated. Please manually inject @service gAnalytics into your Ember objects.",
        false,
      );

      app.inject("route", "analytics", "service:g-analytics");
      app.inject("controller", "analytics", "service:g-analytics");
    } else {
      console.warn(
        "auto-injection is deprecated in Ember 5. Please manually inject @service gAnalytics into your Ember objects.",
      );
    }
  }
}

export default {
  initialize,
};
