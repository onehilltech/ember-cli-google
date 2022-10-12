/* global google */

import MapEntity from '../lib/entity';
import getOptions from '../lib/get-options';

export default class GCircleEntity extends MapEntity {
  get eventType () {
    return 'GCircle';
  }

  createEntity () {
    return new google.maps.Circle (this.options);
  }

  get options () {
    return getOptions (this.args, [
      'center',
      'clickable',
      'draggable',
      'editable',
      'fillColor',
      'fillOpacity',
      'radius',
      'stokeColor',
      'strokeOpacity',
      'strokePosition',
      'strokeWeight',
      'zIndex',
    ]);
  }
}
