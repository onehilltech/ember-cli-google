import XYChart from '../-private/g-xychart';

export default XYChart.extend({
  classNames: ['g-columnchart'],

  packages: ['corechart'],

  chartOptionsMapping: {
    barGroupWidth: 'bar.groupWidth',
    bars: 'bars'
  },

  createChart () {
    return new google.visualization.ColumnChart (this.element);
  }
});
