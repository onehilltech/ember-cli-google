import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default class GtagService extends Service {
  constructor () {
    super (...arguments);

    // Let's make sure there is a dataLayer variable present.
    window.dataLayer = window.dataLayer || [];

    const ENV = getOwner (this).resolveRegistration ('config:environment');
    const { measurementId } = getWithDefault (ENV, 'ember-cli-google.analytics', {});

    this.push ('js', new Date ());
    this.push ('config', measurementId);
  }

  push () {
    window.dataLayer.push (arguments);
  }

  event (name, params) {
    this.push ({ event: name, ...params });
  }
}
