/* global google */

import Component from '@glimmer/component';

import { action, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

const MAP_OPTIONS = Object.freeze([
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
  'zoomControlOptions',
]);

function noOp() {}

export default class GMap extends Component {
  @service
  gMaps;

  get mapTypeId() {
    return this.type;
  }

  get type() {
    return this.args.type === undefined ? 'roadmap' : this.args.type;
  }

  get clickableIcons() {
    return this.args.clickableIcons === undefined
      ? true
      : this.args.clickableIcons;
  }

  get disableDefaultUI() {
    return this.args.disableDefaultUI === undefined
      ? false
      : this.args.disableDefaultUI;
  }

  get gestureHandling() {
    return this.args.gestureHandling === undefined
      ? 'auto'
      : this.args.gestureHandling;
  }

  get keyboardShortcuts() {
    return this.args.keyboardShortcuts === undefined
      ? true
      : this.args.keyboardShortcuts;
  }

  get scrollwheel() {
    return this.args.scrollwheel === undefined ? true : this.args.scrollwheel;
  }

  @action
  didInsert(gMapElement) {
    this.gMaps
      .getInstance()
      .then(() => this.didInitMap(gMapElement))
      .catch((err) => console.error(err));
  }

  @action
  recenter(element, [lat, lng]) {
    if (isPresent(this.map)) {
      this.map.setCenter(new google.maps.LatLng(lat, lng));
    }
  }

  get options() {
    const options = {};

    MAP_OPTIONS.forEach((option) => {
      const value = this.args[option];

      if (isPresent(value)) {
        options[option] = value;
      }
    });

    return options;
  }

  didInitMap(gMapElement) {
    this.map = new google.maps.Map(gMapElement, this.options);
    this.map.addListener('click', this.didMapClick.bind(this));
  }

  didMapClick(ev) {
    (this.mapClick || noOp)(ev);
  }

  get directions() {
    if (this._directions) {
      return this._directions;
    }

    this._directions = new google.maps.DirectionsService();
    return this._directions;
  }

  createDirectionsRenderer(options) {
    const renderer = new google.maps.DirectionsRenderer(options);
    renderer.setMap(this.map);

    return renderer;
  }

  get loaded() {
    return !!this.map;
  }
}
