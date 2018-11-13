/* global google */

import Component from '@ember/component';
import MapEntity from '../mixins/map-entity';

import { computed } from '@ember/object';

function noOp () {}

export default Component.extend (MapEntity, {
  title: null,

  _marker: null,

  /// The marker is draggable.
  draggable: false,

  /// Animate the marker.
  animation: null,

  getEntity () {
    return this._marker;
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let animation = this.get ('animationType');
    this._marker.setAnimation (animation);

    const { lat, lng } = this.get ('position');

    if (this._marker.position.lat () !== lat || this._marker.position.lng () !== lng) {
      const latLng = new google.maps.LatLng (lat,lng);
      this._marker.setPosition (latLng);
    }
  },

  didLoadMap () {
    this._super (...arguments);

    let options = this.getProperties (['position','title','draggable','label','icon','shape','zIndex']);
    options.animation = this.get ('animationType');

    this._marker = new google.maps.Marker (options);
    this._marker.addListener ('click', this.didClick.bind (this));
  },

  /**
   * The marker was clicked.
   */
  didClick () {
    this.getWithDefault ('click', noOp) ();
  },

  animationType: computed ('animation', function () {
    const animation = this.get ('animation');

    if (animation === 'drop') {
      return google.maps.Animation.DROP;
    }
    else if (animation === 'bounce') {
      return google.maps.Animation.BOUNCE;
    }
    else {
      return null;
    }
  })
});
