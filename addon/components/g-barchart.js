import XYChart from './g-xychart';

export default XYChart.extend({
  packages: ['corechart'],

  chartOptionsMapping: {
    barGroupWidth: 'bar.groupWidth',
    bars: 'bars'
  },

  createChart (element) {
    return new google.visualization.BarChart (element);
  }
});
