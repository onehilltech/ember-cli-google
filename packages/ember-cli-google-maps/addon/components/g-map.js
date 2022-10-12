/* global google */

import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import getOptions from '../lib/get-options';

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

  constructor () {
    super (...arguments);

    Object.defineProperty (this, '_entities', { value: [], configurable: false, writable: false, enumerable: false });
  }

  @action
  didInsert (gMapElement) {
    // Register the element/component with the service. The element will
    // be used to locate this component by entities.

    this.gMaps.register (gMapElement.parentElement, this);
    Object.defineProperty (this, '_element', { value: gMapElement.parentElement, configurable: false, writable: false, enumerable: false});

    this.gMaps
      .getInstance()
      .then(() => {
        // Create the map.
        this.map = new google.maps.Map(gMapElement, this.options);
        this.map.addListener('click', this.didMapClick.bind(this));

        // Make sure all entities have been created. This happens when the script
        // loaded the first time and the entity components are created before the script
        // has been loaded.

        this._entities.forEach (entity => {
          if (!entity.isCreated) {
            entity.create (this.map);
          }
        })
      })
      .catch((err) => console.error(err));
  }

  @action
  recenter(element, [center]) {
    const { lat, lng } = center;

    if (isPresent(this.map)) {
      this.map.setCenter (new google.maps.LatLng(lat, lng));
    }
  }

  get options() {
    return getOptions (this.args, MAP_OPTIONS);
  }

  willDestroy () {
    super.willDestroy ();

    this.gMaps.unregister (this._element);
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
    renderer.setMap (this.map);

    return renderer;
  }

  get loaded() {
    return !!this.map;
  }

  registerEntity (entity) {
    this._entities.push (entity);

    if (isPresent (this.map)) {
      entity.create (this.map);
    }
  }
}
