import Ember from 'ember';
import Chart from './g-chart';

export default Chart.extend({
  packages: ['geochart'],

  chartOptionsMapping: {
    colorAxis: 'colorAxis',
    colorAxisMinValue: 'colorAxis.minValue',
    colorAxisMaxValue: 'colorAxis.maxValue',
    colorAxisValues: 'colorAxis.values',
    colorAxisColors: 'colorAxis.colors',
    datalessRegionColor: 'datalessRegionColor',
    defaultColor: 'defaultColor',
    displayMode: 'displayMode',
    domain: 'domain',
    enableRegionInteractivity: 'enableRegionInteractivity',
    keepAspectRatio: 'keepAspectRatio',
    region: 'region',
    magnifyingGlass: 'magnifyingGlass',
    magnifyingGlassEnable: 'magnifyingGlass.enable',
    magnifyingGlassZoomFactor: 'magnifyingGlass.zoomFactor',
    markerOpacity: 'markerOpacity',
    resolution: 'resolution',
    sizeAxis: 'sizeAxis',
    sizeAxisMaxSize: 'sizeAxis.maxSize',
    sizeAxisMaxValue: 'sizeAxis.maxValue',
    sizeAxisMinSize: 'sizeAxis.minSize',
    sizeAxisMinValue: 'sizeAxis.minValue',
  },

  packagesOptions: Ember.computed (function () {
    let thisEnv = Ember.getOwner (this).resolveRegistration ('config:environment');

    return {
      mapsApiKey: thisEnv.GoogleENV.charts.mapsApiKey
    };
  }),

  createChart (element) {
    return new google.visualization.GeoChart (element);
  },

  didCreateChart (chart) {
    this._super (...arguments);

    google.visualization.events.addListener (chart, 'regionClick', (ev) => { this.didClickRegion (ev); });
  },

  didClickRegion (ev) {
    let clickRegionHandler = this.get ('regionClick');

    if (clickRegionHandler) {
      clickRegionHandler (this, ev);
    }
  }
});
