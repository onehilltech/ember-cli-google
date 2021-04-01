/* global google */

import Component from '@ember/component';
import MapEntity from '../mixins/map-entity';

import { computed } from '@ember/object';

export default Component.extend (MapEntity, {
  _circle: null,

  createEntity () {
    let circleOptions = this.circleOptions;
    this._circle = new google.maps.Circle (circleOptions);

    return this._circle;
  },

  getEntity () {
    return this._circle;
  },

  circleOptions: computed ('{center,clickable,draggable,editable,fillColor,fillOpacity,radius,stokeColor,strokeOpacity,strokePosition,strokeWeight,zIndex}', function () {
    return this.getProperties ([
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
      'zIndex'
    ])
  })
});
