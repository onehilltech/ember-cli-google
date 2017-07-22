/*global google*/

import Chart from './g-chart';

export default Chart.extend({
  packages: ['corechart'],

  chartOptionsMapping: {
    pieHole: 'pieHole',
    pieSliceBorderColor: 'pieSliceBorderColor',
    pieSliceText: 'pieSliceText',
    pieSliceTextStyle: 'pieSliceTextStyle',
    pieStartAngle: 'pieStartAngle',
    reverseCategories: 'reverseCategories',
    pieResidueSliceColor: 'pieResidueSliceColor',
    pieResidueSliceLabel: 'pieResidueSliceLabel',
    slices: 'slices',
    sliceVisibilityThreshold: 'sliceVisibilityThreshold'
  },

  createChart (element) {
    return new google.visualization.PieChart (element);
  }
});
