import Ember from 'ember';
import Chart from '../lib/g-chart';

export default Chart.extend({
  classNames: ['g-geochart'],

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
    let ENV = Ember.getOwner (this).resolveRegistration ('config:environment');

    return {
      mapsApiKey: Ember.get (ENV, 'ember-cli-google.charts.mapsApiKey')
    };
  }),

  createChart () {
    return new google.visualization.GeoChart (this.element);
  },

  didCreateChart (chart) {
    this._super (...arguments);

    google.visualization.events.addListener (chart, 'regionClick', this.didClickRegion.bind (this));
  },

  didClickRegion (ev) {
    this.sendAction ('regionClick', ev);
  }
});
