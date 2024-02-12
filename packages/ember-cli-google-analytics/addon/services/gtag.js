import { get } from "@ember/object";
import Service, { inject as service } from "@ember/service";
import { getOwner } from "@ember/application";
import { isEmpty } from "@ember/utils";

export default class GtagService extends Service {
  async configure (options = {}) {
    // Let's make sure there is a dataLayer variable present. We are adding it even
    // if we do not enable Google Analytics. This will allow clients to not have to
    // check if Google Analytics is turned on.

    window.dataLayer = window.dataLayer || [];

    const ENV = getOwner(this).resolveRegistration('config:environment');
    const {
      measurementId = options.measurementId,
      forceEnable = options.forceEnable,
    } = get (ENV, 'ember-cli-google.analytics') || {};

    if (ENV.environment === 'production' || forceEnable) {
      // We only load the script if we are running in production mode. Otherwise, we
      // run the risk of taking measurements of the application executed in the
      // development environment.

      if (isEmpty(measurementId)) {
        throw new Error('You must define the measurementId property in config/environment.');
      }

      await this.script.load(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);

      this.push('js', new Date());
      this.push('config', measurementId);
    }
  }

  @service
  script;

  push() {
    window.dataLayer.push(arguments);
  }

  event(name, params) {
    this.push({ event: name, ...params });
  }
}
