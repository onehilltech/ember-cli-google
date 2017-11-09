/*global google*/

import XYChart from './g-xychart';

export default XYChart.extend({
  classNames: ['g-linechart'],

  chartOptionsMapping: {
    curveType: 'curveType',

    trendlines: 'trendlines',
  },

  createChart () {
    return new google.visualization.LineChart (this.element);
  }
});
