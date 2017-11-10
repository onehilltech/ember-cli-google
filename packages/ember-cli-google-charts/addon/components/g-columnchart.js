import XYChart from '../lib/g-xychart';
import Ember from 'ember';

export default XYChart.extend({
  classNames: ['g-columnchart'],

  packages: Ember.computed ('material', function () {
    let material = this.getWithDefault ('material', false);
    return material ? ['bar'] : ['corechart'];
  }),

  chartOptionsMapping: {
    barGroupWidth: 'bar.groupWidth',
    bars: 'bars'
  },

  createChart () {
    let material = this.getWithDefault ('material', false);
    let Chart = material ? google.charts.Bar : google.visualization.ColumnChart;

    return new Chart (this.element);
  },

  convertOptions (opts) {
    let newOptions = Ember.merge ({}, opts);
    return google.charts.Bar.convertOptions (newOptions);
  }
});
