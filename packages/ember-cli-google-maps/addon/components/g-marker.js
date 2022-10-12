/* global google */

import MapEntity from '../lib/entity';
import getOptions from '../lib/get-options';

function noOp() {}

export default class GMarkerEntity extends MapEntity {
  get options () {
    return getOptions (this.args, [
      'position',
      'title',
      'draggable',
      'label',
      'icon',
      'shape',
      'zIndex',
    ]);
  }

  get eventType () {
    return 'GMarker';
  }

  createEntity () {
    const options = this.options;
    options.animation = this.animationType;

    return new google.maps.Marker (options);
  }

  get animation () {
    return this.args.animation || 'drop';
  }

  get animationType () {
    const animation = this.animation;

    if (animation === 'drop') {
      return google.maps.Animation.DROP;
    } else if (animation === 'bounce') {
      return google.maps.Animation.BOUNCE;
    } else {
      return null;
    }
  }
}
