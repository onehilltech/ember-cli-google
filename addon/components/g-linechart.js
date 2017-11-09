import XYChart from '../-private/g-xychart';

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
