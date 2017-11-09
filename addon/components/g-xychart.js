/*global google*/

import Chart from './g-chart';

export default Chart.extend({
  classNames: ['g-xychart'],

  packages: ['corechart'],

  chartOptionsMapping: {
    aggregationTarget: 'aggregationTarget',

    animationDuration: 'animation.duration',
    animationEasing: 'animation.easing',
    animationStartup: 'animation.startup',

    annotationsBoxStyle: 'annotations.boxStyle',
    annotationsDatum: 'annotations.datum',
    annotationsDomain: 'annotations.domain',
    annotationsHighContrast: 'annotations.highContrast',
    annotationsStem: 'annotations.stem',
    annotationsStyle: 'annotations.style',
    annotationsTextStyle: 'annotations.textStyle',

    axisTitlesPosition: 'axisTitlesPosition',

    crosshair: 'crosshair',
    crosshairColor: 'crosshair.color',
    crosshairFocused: 'crosshair.focused',
    crosshairOpacity: 'crosshair.opacity',
    crosshairOrientation: 'crosshair.orientation',
    crosshairSelected: 'crosshair.selected',
    crosshairTrigger: 'crosshair.trigger',

    dataOpacity: 'dataOpacity',

    explorer: 'explorer',
    explorerActions: 'explorer.actions',
    explorerAxis: 'explorer.axis',
    explorerKeepInBounds: 'explorer.keepInBounds',
    explorerMaxZoomIn: 'explorer.maxZoomIn',
    explorerMaxZoomOut: 'explorer.maxZoomOut',
    explorerZoomDelta: 'explorer.zoomDelta',

    focusTarget: 'focusTarget',

    hAxis: 'hAxis',
    hAxisBaseline: 'hAxis.baseline',
    hAxisBaselineColor: 'hAxis.baselineColor',
    hAxisDirection: 'hAxis.direction',
    hAxisFormat: 'hAxis.format',
    hAxisGridlines: 'hAxis.gridlines',
    hAxisGridlinesColor: 'hAxis.gridlines.color',
    hAxisGridlinesCount: 'hAxis.gridlines.count',
    hAxisGridlinesUnits: 'hAxis.gridlines.units',
    hAxisMinorGridlines: 'hAxis.minorGridlines',
    hAxisMinorGridlinesColor: 'hAxis.minorGridlines.color',
    hAxisMinorGridlinesCount: 'hAxis.minorGridlines.count',
    hAxisMinorGridlinesUnits: 'hAxis.minorGridlines.units',
    hAxisLogScale: 'hAxis.logScale',
    hAxisScaleType: 'hAxis.scaleType',
    hAxisTextPosition: 'hAxis.textPosition',
    hAxisTextStyle: 'hAxis.textStyle',
    hAxisTicks: 'hAxis.ticks',
    hAxisTitle: 'hAxis.title',
    hAxisTitleTextStyle: 'hAxis.titleTextStyle',
    hAxisAllowContainerBoundaryTextCufoff: 'hAxis.allowContainerBoundaryTextCufoff',
    hAxisSlantedText: 'hAxis.slantedText',
    hAxisSlantedTextAngle: 'hAxis.slantedTextAngle',
    hAxisMaxAlternation: 'hAxis.maxAlternation',
    hAxisMaxTextLines: 'hAxis.maxTextLines',
    hAxisMinTextSpacing: 'hAxis.minTextSpacing',
    hAxisShowTextEvery: 'hAxis.showTextEvery',
    hAxisMaxValue: 'hAxis.maxValue',
    hAxisMinValue: 'hAxis.minValue',
    hAxisViewWindowMode: 'hAxis.viewWindowMode',
    hAxisViewWindow: 'hAxis.viewWindow',
    hAxisViewWindowMax: 'hAxis.viewWindow.max',
    hAxisViewWindowMin: 'hAxis.viewWindow.min',

    interpolateNulls: 'interpolateNulls',

    lineDashStyle: 'lineDashStyle',
    lineWidth: 'lineWidth',

    orientation: 'orientation',

    pointShape: 'pointShape',
    pointSize: 'pointSize',
    pointsVisible: 'pointsVisible',

    reverseCategories: 'reverseCategories',

    selectionMode: 'selectionMode',
    series: 'series',

    theme: 'theme',

    title: 'title',
    titlePosition: 'titlePosition',
    titleTextStyle: 'titleTextStyle',

    vAxis: 'vAxis',
    vAxisBaseline: 'vAxis.baseline',
    vAxisBaselineColor: 'vAxis.baselineColor',
    vAxisDirection: 'vAxis.direction',
    vAxisFormat: 'vAxis.format',
    vAxisGridlines: 'vAxis.gridlines',
    vAxisGridlinesColor: 'vAxis.gridlines.color',
    vAxisGridlinesCount: 'vAxis.gridlines.count',
    vAxisGridlinesUnits: 'vAxis.gridlines.units',
    vAxisMinorGridlines: 'vAxis.minorGridlines',
    vAxisMinorGridlinesColor: 'vAxis.minorGridlines.color',
    vAxisMinorGridlinesCount: 'vAxis.minorGridlines.count',
    vAxisMinorGridlinesUnits: 'vAxis.minorGridlines.units',
    vAxisLogScale: 'vAxis.logScale',
    vAxisScaleType: 'vAxis.scaleType',
    vAxisTextPosition: 'vAxis.textPosition',
    vAxisTextStyle: 'vAxis.textStyle',
    vAxisTicks: 'vAxis.ticks',
    vAxisTitle: 'vAxis.title',
    vAxisTitleTextStyle: 'vAxis.titleTextStyle',
    vAxisAllowContainerBoundaryTextCufoff: 'vAxis.allowContainerBoundaryTextCufoff',
    vAxisSlantedText: 'vAxis.slantedText',
    vAxisSlantedTextAngle: 'vAxis.slantedTextAngle',
    vAxisMaxAlternation: 'vAxis.maxAlternation',
    vAxisMaxTextLines: 'vAxis.maxTextLines',
    vAxisMinTextSpacing: 'vAxis.minTextSpacing',
    vAxisShowTextEvery: 'vAxis.showTextEvery',
    vAxisMaxValue: 'vAxis.maxValue',
    vAxisMinValue: 'vAxis.minValue',
    vAxisViewWindowMode: 'vAxis.viewWindowMode',
    vAxisViewWindow: 'vAxis.viewWindow',
    vAxisViewWindowMax: 'vAxis.viewWindow.max',
    vAxisViewWindowMin: 'vAxis.viewWindow.min'
  },

  didCreateChart (chart) {
    this._super (...arguments);

    google.visualization.events.addListener (chart, 'animationfinish', this.didFinishAnimation.bind (this));
  },

  didFinishAnimation (ev) {
    this.sendAction ('finishAnimation', ev);
  }
});
