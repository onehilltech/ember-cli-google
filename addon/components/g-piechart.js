/*global google*/

import Chart from './g-chart';

export default Chart.extend({
  packages: ['corechart'],

  createChart (element) {
    return new google.visualization.PieChart (element);
  }
});
