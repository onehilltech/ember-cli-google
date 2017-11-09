import Chart from '../lib/g-chart';

export default Chart.extend({
  classNames: ['g-piechart'],

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

  createChart () {
    return new google.visualization.PieChart (this.element);
  }
});
