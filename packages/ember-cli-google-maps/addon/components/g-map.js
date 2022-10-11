/* global google */

import Component from '@glimmer/component';

import { action, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

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

export default class GMap extends Component {
  @service
  gMaps;

  get mapTypeId () {
    return this.type;
  }

  get type () {
    return getWithDefault (this.args, 'type', 'roadmap');
  }

  get clickableIcons () {
    return getWithDefault (this.args, 'clickableIcons', true);
  }

  get disableDefaultUI () {
    return getWithDefault (this.args, 'disableDefaultUI', false);
  }

  get gestureHandling () {
    return getWithDefault (this.args, 'gestureHandling', 'auto');
  }

  get keyboardShortcuts () {
    return getWithDefault (this.args, 'keyboardShortcuts', true);
  }

  get scrollwheel () {
    return getWithDefault (this.args, 'scrollwheel', true);
  }

  @action
  didInsert (gMapElement) {
    this.gMaps.getInstance ()
      .then (() => this.didInitMap (gMapElement))
      .catch (err => console.error (err));
  }

  @action
  recenter (element, [lat, lng]) {
    if (isPresent (this.map)) {
      this.map.setCenter (new google.maps.LatLng (lat, lng))
    }
  }

  get options () {
    const options = {};

    MAP_OPTIONS.forEach (option => {
      const value = this.get (option);

      if (isPresent (value)) {
        options[option] = value;
      }
    });
  }

  didInitMap (gMapElement) {
    this.map = new google.maps.Map (gMapElement, this.options);
    this.map.addListener ('click', this.didMapClick.bind (this));
  }

  didMapClick (ev) {
    (this.mapClick || noOp) (ev);
  }

  get directions () {
    if (!!this._directions) {
      return this._directions;
    }

    this._directions = new google.maps.DirectionsService ();
    return this._directions;
  }

  createDirectionsRenderer (options) {
    const renderer = new google.maps.DirectionsRenderer (options);
    renderer.setMap (this.map);

    return renderer;
  }

  get loaded () {
    return !!this.map;
  }
}

