import XYChart from '../lib/g-xychart';

export default XYChart.extend({
  classNames: ['g-barchart'],

  packages: ['corechart'],

  chartOptionsMapping: {
    barGroupWidth: 'bar.groupWidth',
    bars: 'bars'
  },

  createChart () {
    return new google.visualization.BarChart (this.element);
  }
});
