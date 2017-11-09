import XYChart from './g-xychart';

export default XYChart.extend({
  classNames: ['g-areachart'],

  chartOptionsMapping: {
    isStacked: 'isStacked'
  },

  createChart () {
    return new google.visualization.LineChart (this.element);
  }
});
