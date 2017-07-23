/*global google*/

import XYChart from './g-xychart';

export default XYChart.extend({
  chartOptionsMapping: {
    curveType: 'curveType',

    trendlines: 'trendlines',
  },

  createChart (element) {
    return new google.visualization.LineChart (element);
  }
});
