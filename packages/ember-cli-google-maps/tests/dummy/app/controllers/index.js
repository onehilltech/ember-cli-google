import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  showDirections = false;

  @tracked
  animation = 'bounce';

  @tracked
  lat = 37.774546;

  @tracked
  lng = -122.433523;

  set latInput (value) {
    this.lat = parseFloat (value);
  }

  get latInput () {
    return this.lat;
  }

  set lngInput (value) {
    this.lng = parseFloat (value);
  }

  get lngInput () {
    return this.lng;
  }

  heatMapData = Object.freeze([
    { lat: 37.782, lng: -122.447, weight: 1 },
    { lat: 37.782, lng: -122.445 },
    { lat: 37.782, lng: -122.443 },
    { lat: 37.782, lng: -122.441 },
    { lat: 37.782, lng: -122.439 },
    { lat: 37.782, lng: -122.437 },
    { lat: 37.782, lng: -122.435 },
    { lat: 37.782, lng: -122.447 },
    { lat: 37.782, lng: -122.445 },
    { lat: 37.782, lng: -122.443 },
    { lat: 37.782, lng: -122.441 },
    { lat: 37.782, lng: -122.439 },
    { lat: 37.782, lng: -122.437 },
    { lat: 37.782, lng: -122.435 },
  ]);

  @action
  click(ev) {
    console.log (ev);
  }

  @action
  toggleBounce() {
    this.animation = this.animation === 'bounce' ? null : 'bounce';
  }

  @action
  recenterMap() {}
}
