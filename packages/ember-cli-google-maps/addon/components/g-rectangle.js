import Component from '@ember/component';

import MapEntity from '../mixins/map-entity';

import { computed } from '@ember/object';

export default Component.extend (MapEntity, {
  _rectangle: null,

  getEntity () {
    return this._rectangle;
  },

  createEntity () {
    let rectangleOptions = this.get ('rectangleOptions');
    this._rectangle = new google.maps.Rectangle (rectangleOptions);

    return this._rectangle;
  },

  rectangleOptions: computed ('{bounds,clickable,draggable,editable,fillColor,fillOpacity,stokeColor,strokeOpacity,strokePosition,strokeWeight,zIndex}', function () {
    return this.getProperties ([
      'bounds',
      'clickable',
      'draggable',
      'editable',
      'fillColor',
      'fillOpacity',
      'stokeColor',
      'strokeOpacity',
      'strokePosition',
      'strokeWeight',
      'zIndex'
    ]);
  })
});
