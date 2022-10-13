/* global google */

import MapEntity from '../lib/entity';
import getOptions from '../lib/get-options';
import { defaults } from 'lodash';

function noOp () {}

export default class GDirectionsEntity extends MapEntity {
  get mode () {
    return this.args.mode || this.args.travelMode || 'DRIVING';
  }

  get options () {
    const options = getOptions (this.args, [
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
      'suppressPolylines',
    ]);
    
    return defaults (options, {
      draggable: false,
      hideRouteList: false,
      preserveViewport: false,
      routeIndex: 0,
      suppressBicyclingLayer: true,
      suppressInfoWindows: true,
      suppressMarkers: false,
      suppressPolylines: false,
    })

  }

  createEntity () {
    // Delete the old directions.

    this._removeDirections ();
    this._renderer = this.map.createDirectionsRenderer (this.options);

    const routeOptions = {
      origin: this.origin,
      destination: this.destination,
      travelMode: this.mode
    };

    this.map.directions.route (routeOptions, (response, status) => {
      if (status === 'OK') {
        this._renderer.setDirections(response);
      } else {
        (this.args.error || noOp)(status, response);
      }
    });

    return this._renderer;
  }

  _removeDirections() {
    if (this._renderer) {
      this._renderer.setMap (null);
      this._renderer = null;
    }
  }

  get origin () {
    return this.args.origin;
  }

  get destination (){
    return this.args.destination;
  }
}
