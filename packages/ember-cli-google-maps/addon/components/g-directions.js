/* global google */

import Component from '@ember/component';
import { assert } from '@ember/debug';

import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { readOnly, equal } from '@ember/object/computed';

export default Component.extend ({
  classNames: ['g-directions'],

  mode: 'DRIVING',

  _renderer: null,

  didInsertElement () {
    this._super (...arguments);

    let gMarker = this.parentView;
    assert ('The parent of g-directions must be a g-marker component.', gMarker.element.classList.contains ('g-marker'));

    let gMap = gMarker.parentView;
    gMap.on ('loading', this, '_mapLoading');
    gMap.on ('loaded', this, '_mapLoaded');
  },

  willDestroyElement () {
    this._super (...arguments);

    // Remove the current directions on the map.
    this._removeDirections();

    let gMap = this.get ('gMap');
    gMap.off ('loading', this, '_mapLoading');
    gMap.off ('loaded', this, '_mapLoaded');
  },

  _initFromMap (map) {
    // Store our own direction service.
    this._service = new google.maps.DirectionsService ();

    // Initialize the display for the map.
    this._display = new google.maps.DirectionsRenderer ();
    this._display.setMap (map);
  },

  _mapLoading () {

  },

  _mapLoaded () {
    this._refresh ();
  },

  _refresh () {
    let service = this.get ('directionsService');
    const { origin, destination, mode: travelMode, gMap } = this.getProperties (['origin', 'destination', 'mode', 'gMap']);

    // Delete the old directions.
    this._removeDirections ();

    service.route ({ origin, destination, travelMode} , (response, status) => {
      if (status === 'OK') {
        this._renderer = gMap.createDirectionsRenderer ();
        this._renderer.setDirections (response);
      } else {
        let error = (this.get ('error'));

        if (!!error) {
          error (status, response);
        }
      }
    });
  },

  _removeDirections () {
    if (!!this._renderer) {
      this._renderer.setMap (null);
      this._renderer = null;
    }
  },

  isOrigin: equal ('direction', 'from'),
  isDestination: equal ('direction', 'to'),

  origin: computed ('isOrigin', 'location', 'gMarker.position', function () {
    const { isOrigin, location } = this.getProperties (['isOrigin', 'location']);
    return isOrigin ? location : this.get ('gMarker.position');
  }),

  destination: computed ('isDestination', 'location', 'gMarker.position', function () {
    const { isDestination, location } = this.getProperties (['isDestination', 'location']);
    return isDestination ? location : this.get ('gMarker.position');
  }),

  gMarker: computed (function () {
    return this.parentView;
  }),

  gMap: computed (function () {
    return this.get ('gMarker').parentView;
  }),

  directionsService: readOnly ('gMap.directionsService')
});
