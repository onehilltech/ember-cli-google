import Ember from 'ember';
import layout from '../templates/components/g-chart';

export default Ember.Component.extend({
  layout,

  classNames: ['g-chart'],

  gCharts: Ember.inject.service (),

  mergedProperties: ['chartOptionsMapping', 'packagesOptions'],
  concatenatedProperties: ['packages'],

  packages: [],
  packagesOptions: {},

  // Options that are common across all charts.

  chartOptionsMapping: {
    backgroundColor: 'backgroundColor',
    backgroundColorStroke: 'backgroundColor.stroke',
    backgroundColorStrokeWidth: 'backgroundColor.strokeWidth',
    backgroundColorFill: 'backgroundColor.fill',

    chartArea: 'chartArea',
    chartAreaBackgroundColor: 'chartArea.backgroundColor',
    chartAreaLeft: 'chartArea.left',
    chartAreaRight: 'chartArea.right',
    chartAreaTop: 'chartArea.top',
    chartAreaWidth: 'chartArea.width',
    chartAreaHeight: 'chartArea.height',

    colors: 'colors',

    enableInteractivity: 'enableInteractivity',

    fontSize: 'fontSize',
    fontName: 'fontName',

    forceIFrame: 'forceIFrame',

    height: 'height',

    is3D: 'is3D',

    legend: 'legend',
    legendAlignment: 'legend.alignment',
    legendMaxLines: 'legend.maxLines',
    legendPosition: 'legend.position',
    legendTextStyle: 'legend.textStyle',

    title: 'title',
    titlePosition: 'titlePosition',
    titleTextStyle: 'titleTextStyle',
    subtitle: 'subtitle',

    tooltip: 'tooltip',

    tooltipIgnoreBounds: 'tooltip.ignoreBounds',
    tooltipIsHtml: 'tooltip.isHtml',
    tooltipShowColorCode: 'tooltip.showColorCode',
    tooltipText: 'tooltip.text',
    tooltipTextStyle: 'tooltip.textStyle',
    tooltipTrigger: 'tooltip.trigger',

    width: 'width',
  },

  init () {
    this._super (...arguments);

    this.set ('options', {});
  },

  exists: Ember.computed.bool ('chart'),

  imageURI: Ember.computed ('chart', function () {
    return this.get ('chart').getImageURI ();
  }),

  selection: Ember.computed ('chart', {
    get () {
      return this.get ('chart').getSelection ();
    },

    set (key, value) {
      this.get ('chart').setSelection (value);

      return value;
    }
  }),

  didReceiveAttrs () {
    this._super (...arguments);

    this._buildChartOptions ();
  },

  didInsertElement () {
    this._super (...arguments);

    // Let's register for the resize event for the window so we can redraw the chart
    // when the window resize. This will make the chart responsive.
    Ember.$ (window).on ('resize', this.didResize.bind (this));

    // Request the packages used by the concrete chart.
    let {packages, packagesOptions} = this.getProperties (['packages', 'packagesOptions']);

    this.get ('gCharts').load (packages, packagesOptions,  () => {
      // Instruct the subclass to create the concrete chart object so we can
      // store a reference to it.
      let chart = this.createChart ();
      this.didCreateChart (chart);

      this.set ('chart', chart);
      this.drawChart ();
    });
  },

  willDestroyElement () {
    this._super (...arguments);

    Ember.$ (window).off ('resize', this.didResize.bind (this));
  },

  _buildChartOptions () {
    let chartOptionsMapping = this.get ('chartOptionsMapping');
    let chartOptions = {};

    for (let propName in this.attrs) {
      // Check if we have a value in our component for this chart option.
      let value = this.get (propName);

      if (Ember.isNone (value)) {
        continue;
      }

      let targetChartOption = chartOptionsMapping[propName];

      if (Ember.isNone (targetChartOption)) {
        continue;
      }

      let targetChartOptionParts = targetChartOption.split ('.');

      if (targetChartOptionParts.length > 1) {
        // Make sure the parents of this option exist.
        targetChartOptionParts.pop ();

        let parentOptionKey = targetChartOptionParts[0];
        let option = Ember.get (chartOptions, parentOptionKey);

        if (Ember.isNone (option)) {
          Ember.set (chartOptions, parentOptionKey, {});
        }

        for (let i = 1; i < targetChartOptionParts.length; ++ i) {
          let part = targetChartOptionParts[i];
          parentOptionKey += `.${part}`;

          let parentOption = Ember.get (chartOptions, parentOptionKey);

          if (Ember.isNone (parentOption)) {
            Ember.set (chartOptions, parentOptionKey, {});
          }
        }
      }

      // Now, we can set the value on the options.
      Ember.set (chartOptions, targetChartOption, value);
    }

    this.set ('options', chartOptions);
  },

  /**
   * The chart has been created. At this point, the class can perform some do some
   * post creation configuration.
   *
   * @param chart
   */
  didCreateChart (chart) {
    google.visualization.events.addListener (chart, 'ready', this.didReady.bind (this));
    google.visualization.events.addListener (chart, 'select', this.didSelect.bind (this));
    google.visualization.events.addListener (chart, 'error', this.didError.bind (this));
    google.visualization.events.addListener (chart, 'onmouseover', this.didMouseOver.bind (this));
    google.visualization.events.addListener (chart, 'onmouseout', this.didMouseOut.bind (this));
  },

  /**
   * Draw the chart.
   */
  drawChart () {
    // Prepare the data. If the data object is an array, then we need to convert
    // the data object to a DataTable object. Otherwise, we are going to assume the
    // data is a DataTable or a DataView.
    let {options, chart, data} = this.getProperties (['options', 'chart', 'data']);

    if (Ember.isNone (chart)) {
      return;
    }

    if (Ember.isArray (data)) {
      data = google.visualization.arrayToDataTable (data);
    }

    let material = this.getWithDefault ('material', false);

    if (material) {
      options = this.convertOptions (options);
    }

    // Draw the chart, and then notify the subclass.
    chart.draw (data, options);

    this.didDrawChart ();
  },

  /**
   * Convert the options to material design options. This method is only called if
   * the `material` property is true.
   */
  convertOptions (opts) {
    return opts;
  },

  clear () {
    this.get ('chart').clearChart ();
    this.didClear ();
  },

  /**
   * Notify the subclass the chart has been drawn.
   */
  didDrawChart () {
    this.sendAction ('draw');
  },

  didResize () {
    // Force the chart to redraw itself.
    this.drawChart ();
    this.sendAction ('resize');
  },

  didClear () {
    this.sendAction ('clear');
  },

  didReady (ev) {
    this.sendAction ('ready', ev);
  },

  didError (ev) {
    this.sendAction ('error', ev);
  },

  didSelect (ev) {
    this.sendAction ('select', ev);
  },

  didMouseOver (ev) {
    this.sendAction ('mouseOver', ev);
  },

  didMouseOut (ev) {
    this.sendAction ('mouseOut', ev);
  }
});
