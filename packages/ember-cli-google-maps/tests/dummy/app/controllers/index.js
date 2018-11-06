import Controller from '@ember/controller';

export default Controller.extend ({
  animation: 'bounce',

  heatMapData: Object.freeze ([
    {lat: 37.782, lng: -122.447, weight: 25},
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
      let animation = this.get ('animation');
      this.set ('animation', animation === 'bounce' ? null : 'bounce');
    }
  }
});
