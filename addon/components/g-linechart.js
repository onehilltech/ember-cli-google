/*global google*/

import Ember from 'ember';
import Chart from './g-chart';

export default Chart.extend({
  packages: ['corechart'],

  /// @{ Chart Options

  aggregationTarget: Ember.computed.alias ('options.aggregationTarget'),
  animationDuration: Ember.computed.alias ('options.animation.duration'),
  animationStartup: Ember.computed.alias ('options.animation.startup'),
  animationEasing: Ember.computed.alias ('options.animation.easing'),
  annotationsBoxStyle: Ember.computed.alias ('options.annotations.boxStyle'),
  annotationsDatum: Ember.computed.alias ('options.annotations.datum'),
  annotationsDomain: Ember.computed.alias ('options.annotations.domain'),
  annotationsHighContrast: Ember.computed.alias ('options.annotations.highContrast'),
  annotationsStem: Ember.computed.alias ('options.annotations.stem'),
  annotationsStyle: Ember.computed.alias ('options.annotations.style'),
  annotationsTextStyle: Ember.computed.alias ('options.annotations.textStyle'),
  axisTitlesPosition: Ember.computed.alias ('options.axisTitlesPosition'),
  backgroundColor: Ember.computed.alias ('options.backgroundColor'),
  backgroundColorStroke: Ember.computed.alias ('options.backgroundColor.stroke'),
  backgroundColorStrokeWidth: Ember.computed.alias ('options.backgroundColor.strokeWidth'),
  backgroundColorFill: Ember.computed.alias ('options.backgroundColor.fill'),
  chartArea: Ember.computed.alias ('options.chartArea'),
  chartAreaBackgroundColor: Ember.computed.alias ('options.chartArea.backgroundColor'),
  chartAreaLeft: Ember.computed.alias ('options.chartArea.left'),
  chartAreaTop: Ember.computed.alias ('options.chartArea.top'),
  chartAreaWidth: Ember.computed.alias ('options.chartArea.width'),
  chartAreaHeight: Ember.computed.alias ('options.chartArea.height'),
  colors: Ember.computed.alias ('options.colors'),
  crosshair: Ember.computed.alias ('options.crosshair'),
  crosshairColor: Ember.computed.alias ('options.crosshair.color'),
  crosshairFocused: Ember.computed.alias ('options.crosshair.focused'),
  crosshairOpacity: Ember.computed.alias ('options.crosshair.opacity'),
  crosshairOrientation: Ember.computed.alias ('options.crosshair.orientation'),
  crosshairSelected: Ember.computed.alias ('options.crosshair.selected'),
  crosshairTrigger: Ember.computed.alias ('options.crosshair.trigger'),
  curveType: Ember.computed.alias ('options.curveType'),
  dataOpacity: Ember.computed.alias ('options.dataOpacity'),
  enableInteractivity: Ember.computed.alias ('options.enableInteractivity'),
  explorer: Ember.computed.alias ('options.explorer'),
  explorerActions: Ember.computed.alias ('options.explorer.actions'),
  explorerAxis: Ember.computed.alias ('options.explorer.axis'),
  explorerKeepInBounds: Ember.computed.alias ('options.explorer.keepInBounds'),
  explorerMaxZoomIn: Ember.computed.alias ('options.explorer.maxZoomIn'),
  explorerMaxZoomOut: Ember.computed.alias ('options.explorer.maxZoomOut'),
  explorerZoomDelta: Ember.computed.alias ('options.explorer.zoomDelta'),

  title: Ember.computed.alias ('options.title'),
  titlePosition: Ember.computed.alias ('options.titlePosition'),
  titleTextStyle: Ember.computed.alias ('options.titleTextStyle'),
  tooltip: Ember.computed.alias ('options.tooltip'),
  tooltipIgnoreBounds: Ember.computed.alias ('options.tooltip.ignoreBounds'),

  /// @}

  createChart (element) {
    return new google.visualization.LineChart (element);
  }
});
