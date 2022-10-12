/* global google */

import MapEntity from '../lib/entity';
import getOptions from '../lib/get-options';
import { action } from '@ember/object';

import { isEmpty } from '@ember/utils';

export default class GHeatmapLayerEntity extends MapEntity {
  get eventType () {
    return 'GHeatmapLayer';
  }

  get options () {
    return getOptions (this.args, [
      'dissipating',
      'gradient',
      'maxIntensity',
      'radius',
      'opacity',
    ]);
  }

  get clickable () {
    return false;
  }

  @action
  didInsert () {
    super.didInsert (...arguments);
    this.gMaps.include ('visualization');
  }

  createEntity() {
    const options = Object.assign ({}, this.options, {data: this.heatMapData});
    return new google.maps.visualization.HeatmapLayer (options);
  }

  @action
  refresh (element, [data]) {
    this._super(...arguments);

    this.entity.setData (this.heatMapData);
  }

  get heatMapData () {
    const data = this.args.data || [];

    if (isEmpty (data)) {
      return [];
    }

    return data.map(({ lat, lng, weight }) =>
      weight
        ? { location: new google.maps.LatLng(lat, lng), weight }
        : new google.maps.LatLng(lat, lng)
    );
  }
}
