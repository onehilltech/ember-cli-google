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

  createEntity () {
    const options = this.options;
    options.animation = this.animationType;

    const marker = new google.maps.Marker (options);
    marker.addListener('click', this.didClick.bind(this));

    return marker;
  }

  /**
   * The marker was clicked.
   */
  didClick() {
    (this.click === undefined ? noOp : this.click)();
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
