import XYChart from '../lib/g-xychart';

export default XYChart.extend({
  classNames: ['g-bubblechart'],

  packages: ['corechart'],

  chartOptionsMapping: {
    bubble: 'bubble',
    bubbleOpacity: 'bubble.opacity',
    bubbleStroke: 'bubble.stroke',
    bubbleTextStyle: 'bubble.textStyle'
  },

  createChart () {
    return new google.visualization.BubbleChart (this.element);
  }
});
