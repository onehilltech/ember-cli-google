import XYChart from './g-xychart';

export default XYChart.extend({
  packages: ['corechart'],

  chartOptionsMapping: {
    bubble: 'bubble',
    bubbleOpacity: 'bubble.opacity',
    bubbleStroke: 'bubble.stroke',
    bubbleTextStyle: 'bubble.textStyle'
  },

  createChart (element) {
    return new google.visualization.BubbleChart (element);
  }
});
