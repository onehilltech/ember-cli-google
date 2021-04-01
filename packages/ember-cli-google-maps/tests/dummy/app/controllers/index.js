import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend ({
  animation: 'bounce',

  lat: 37.774546,
  lng: -122.433523,

  lngInput: computed ('lng', {
    get () { return this.lng; },

    set (name, value) {
      this.set ('lng', parseFloat (value));
      return value;
    }
  }),

  latInput: computed ('lat', {
    get () { return this.lat; },
    set (name, value) {
      this.set ('lat', parseFloat (value));
      return value;
    }
  }),

  heatMapData: Object.freeze ([
    {lat: 37.782, lng: -122.447, weight: 1},
    {lat: 37.782, lng: -122.445},
    {lat: 37.782, lng: -122.443},
    {lat: 37.782, lng: -122.441},
    {lat: 37.782, lng: -122.439},
    {lat: 37.782, lng: -122.437},
    {lat: 37.782, lng: -122.435},
    {lat: 37.782, lng: -122.447},
    {lat: 37.782, lng: -122.445},
    {lat: 37.782, lng: -122.443},
    {lat: 37.782, lng: -122.441},
    {lat: 37.782, lng: -122.439},
    {lat: 37.782, lng: -122.437},
    {lat: 37.782, lng: -122.435}
  ]),

  actions: {
    mapClick (ev) {
      console.log (ev);
    },

    toggleBounce () {
      let animation = this.animation;
      this.set ('animation', animation === 'bounce' ? null : 'bounce');
    },

    recenterMap () {

    }
  }
});
