import MarkerComponent from 'ember-cli-google-maps/components/g-marker';

export default MarkerComponent.extend({
  draggable: true,

  /*
   icon: computed ('item.direction', function () {

   })
  */

  icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',

  didInsertElement () {
    this._super (...arguments);

    // Add custom code here to initialize
  }
});
