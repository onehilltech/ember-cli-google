import XYChart from './g-xychart';

export default XYChart.extend({
  chartOptionsMapping: {
    isStacked: 'isStacked'
  },

  createChart (element) {
    return new google.visualization.LineChart (element);
  }
});
