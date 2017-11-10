import XYChart from '../lib/g-xychart';
import Ember from 'ember';

export default XYChart.extend({
  classNames: ['g-linechart'],

  packages: Ember.computed ('material', function () {
    let material = this.getWithDefault ('material', false);
    return material ? ['line'] : ['corechart'];
  }),

  chartOptionsMapping: {
    curveType: 'curveType',

    trendlines: 'trendlines',
  },

  createChart () {
    let material = this.getWithDefault ('material', false);
    let Chart = material ? google.charts.Line : google.visualization.LineChart;

    return new Chart (this.element);
  },

  convertOptions (opts) {
    let newOpts = Ember.merge ({}, opts);
    return google.charts.Line.convertOptions (newOpts);
  }
});
