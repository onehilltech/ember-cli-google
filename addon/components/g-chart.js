import Ember from 'ember';
import layout from '../templates/components/g-chart';

export default Ember.Component.extend({
  layout,

  gCharts: Ember.inject.service (),

  options: null,

  init () {
    this._super (...arguments);
  },

  didInsertElement () {
    this._super (...arguments);

    // Request the packages used by the concrete chart.
    let packages = this.get ('packages');

    if (Ember.isNone (packages)) {
      packages = [];
    }

    this.get ('gCharts').load (packages, () => {
      // Instruct the subclass to create the concrete chart object so we can
      // store a reference to it.
      let chart = this.createChart (this.$()[0]);
      this.set ('chart', chart);
    });
  },

  /**
   * Draw the chart.
   *
   * There are two ways a client can draw the chart. The first is by extending a Chart
   * component, and overloading this method. The second approach is passing an action
   * to the onDrawChart component attribute.
   */
  drawChart: Ember.observer ('chart', 'data', 'options', function () {
    Ember.run.once (this, 'drawChartOnce');
  }),

  drawChartOnce () {
    let data = this.get ('data');

    if (Ember.isArray (data)) {
      data = google.visualization.arrayToDataTable (data);
    }

    let options = this.get ('options');
    let chart = this.get ('chart');

    chart.draw (data, options);
  }
});
