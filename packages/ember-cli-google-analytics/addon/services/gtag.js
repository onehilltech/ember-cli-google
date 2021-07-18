/* global gtag */

import Service from '@ember/service';

export default class GtagService extends Service {
  event (name, params) {
    gtag ('event', name, params);
  }
}
