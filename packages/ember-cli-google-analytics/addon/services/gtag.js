/* global gtag */

import Service from '@ember/service';
import { isPresent } from '@ember/utils';

export default class GtagService extends Service {
  event (name, params) {
    if (isPresent (gtag)) {
      gtag ('event', name, params);
    }
  }
}
