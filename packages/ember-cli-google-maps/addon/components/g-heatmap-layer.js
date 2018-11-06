import Component from '@ember/component';
import layout from '../templates/components/g-heatmap-layer';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  tagName: 'aside',

  gMaps: service (),

  _heatMap: null,

  didInsertElement () {
    this._super (...arguments);

    this.get ('gMaps').include ('visualization');

    this.get ('gMaps').getInstance ().then (() => {
      const data = this.get ('data');
      this._heatMap = new google.maps.visualization.HeatmapLayer ({ data });
    });
  },

  didUpdateAttrs () {
    this._super (...arguments);

    this._heatMap.setMap (this.get ('map'));
  },

  ready () {

  },

  getHeatMap () {

  }
});
