import Component from '@ember/component';
import layout from '../templates/components/g-map';

import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend ({
  layout,

  classNames: ['g-map'],

  mapTypeId: alias ('type'),

  gMaps: service (),

  map: null,

  didInsertElement () {
    this._super (...arguments);

    this.trigger ('loading');
    this.get ('gMaps').getInstance ().then (this.didInitMap.bind (this));
  },

  didInitMap () {
    const options = Object.assign (this.getProperties (['center', 'zoom', 'mapTypeId']));
    const map = new google.maps.Map (this.element, options);

    // Update the map attribute for the child elements.
    this.set ('map', map);
    this.trigger ('loaded', map);
  },

  _applyMarkers () {

  }
});
