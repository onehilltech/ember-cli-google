/* global google */

import Component from '@ember/component';
import layout from '../templates/components/g-map';

import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const MAP_OPTIONS = Object.freeze ([
  'backgroundColor',
  'center',
  'clickableIcons',
  'disableDefaultUI',
  'disableDoubleClickZoom',
  'draggableCursor',
  'draggingCursor',
  'fullscreenControl',
  'fullscreenControlOptions',
  'gestureHandling',
  'heading',
  'keyboardShortcuts',
  'mapTypeControl',
  'mapTypeControlOptions',
  'mapTypeId',
  'maxZoom',
  'minZoom',
  'noClear',
  'panControl',
  'panControlOptions',
  'rotateControl',
  'rotateControlOptions',
  'scaleControl',
  'scaleControlOptions',
  'scrollwheel',
  'streetView',
  'streetViewControl',
  'streetViewControlOptions',
  'styles',
  'tilt',
  'zoom',
  'zoomControl',
  'zoomControlOptions'
]);

function noOp () {}

export default Component.extend ({
  layout,

  classNames: ['g-map'],

  type: 'roadmap',

  mapTypeId: alias ('type'),

  gMaps: service (),

  map: null,

  clickableIcons: true,

  disableDefaultUI: false,

  gestureHandling: 'auto',

  keyboardShortcuts: true,

  scrollwheel: true,

  didInsertElement () {
    this._super (...arguments);

    this.trigger ('loading');
    this.get ('gMaps').getInstance ().then (this.didInitMap.bind (this));
  },

  didUpdateAttrs () {
    this._super (...arguments);

    this._updateCenter ();
  },

  _updateCenter () {
    let oldCenter = this.map.getCenter ();
    let {lat, lng} = this.get ('center');

    if (oldCenter.lat () !== lat || oldCenter.lng () !== lng) {
       this.map.setCenter (new google.maps.LatLng (lat, lng));
    }
  },

  didInitMap () {
    const options = Object.assign (this.getProperties (MAP_OPTIONS));

    const map = new google.maps.Map (this.element, options);
    map.addListener ('click', this.didMapClick.bind (this));

    // Update the map attribute for the child elements.
    this.set ('map', map);
    this.trigger ('loaded', map);
  },

  didMapClick (ev) {
    this.getWithDefault ('mapClick', noOp) (ev);
  }
});
