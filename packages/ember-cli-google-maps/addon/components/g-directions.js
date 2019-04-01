/* global google */

import Component from '@ember/component';
import { assert } from '@ember/debug';

import { computed } from '@ember/object';
import { readOnly, equal } from '@ember/object/computed';

import MapEntity from '../mixins/map-entity';

export default Component.extend (MapEntity, {
  classNames: ['g-directions'],

  mode: 'DRIVING',

  // render options

  draggable: false,

  hideRouteList: false,

  panel: null,

  preserveViewport: false,

  routeIndex: 0,

  suppressBicyclingLayer: true,

  suppressInfoWindows: true,

  suppressMarkers: false,

  suppressPolylines: false,

  markerOptions: null,

  _renderer: null,

  map: computed (function () {
    return this.parentView.parentView.map;
  }).volatile (),

  didInsertElement () {
    this._super (...arguments);

    let gMarker = this.parentView;
    assert ('The parent of g-directions must be a g-marker component.', gMarker.element.classList.contains ('g-marker'));
  },

  _mapLoading () {

  },

  _mapLoaded () {
    this._renderDirections ();
  },

  getEntity () {
    return this._renderer;
  },

  createEntity () {
    let service = this.get ('directionsService');
    const { origin, destination, mode: travelMode, gMap, renderOptions } = this.getProperties (['origin', 'destination', 'mode', 'gMap', 'renderOptions']);

    // Delete the old directions.

    this._removeDirections ();
    this._renderer = gMap.createDirectionsRenderer (renderOptions);

    service.route ({ origin, destination, travelMode} , (response, status) => {
      if (status === 'OK') {
        this._renderer.setDirections (response);
      } else {
        let error = (this.get ('error'));

        if (!!error) {
          error (status, response);
        }
      }
    });

    return this._renderer;
  },

  _removeDirections () {
    if (!!this._renderer) {
      this._renderer.setMap (null);
      this._renderer = null;
    }
  },

  renderOptions: computed ('{draggable,hideRouteList,markerOptions,panel,polylineOptions,preserveViewport,routeIndex,suppressBicyclingLayer,suppressInfoWindows,suppressMarkers,suppressPolylines}', function (){
    return this.getProperties ([
      'draggable',
      'hideRouteList',
      'markerOptions',
      'panel',
      'preserveViewport',
      'polylineOptions',
      'routeIndex',
      'suppressBicyclingLayer',
      'suppressInfoWindows',
      'suppressMarkers',
      'suppressPolylines'
    ]);
  }),

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
