/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 *
 * @fileoverview WidgetEditorService is an angular service used to provide
 * and edit configuration for charts (GvizChartConfig). It uses the
 * google.visualization ChartEditor to provide a basic UX
 * (similar to Google Spreadsheets).
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.dashkit.explorer.components.widget.data_viz.WidgetEditorService');

goog.require('p3rf.dashkit.explorer.components.widget.data_viz.gviz.ChartWrapperService');
goog.require('p3rf.dashkit.explorer.components.widget.data_viz.gviz.GvizEvents');
goog.require('p3rf.dashkit.explorer.components.widget.data_viz.gviz.getGvizChartEditor');
goog.require('p3rf.dashkit.explorer.models.ChartModel');

goog.scope(function() {
var explorer = p3rf.dashkit.explorer;
var ChartModel = explorer.models.ChartModel;
var ChartWrapperService = (
    explorer.components.widget.data_viz.gviz.ChartWrapperService);



/**
 * See module docstring for more information about purpose and usage.
 *
 * @param {!angular.$q} $q
 * @param {!angular.Scope} $rootScope
 * @param {ChartWrapperService} chartWrapperService
 * @param {function(new:google.visualization.ChartEditor)} GvizChartEditor
 * @param {*} gvizEvents
 * @constructor
 * @ngInject
 */
explorer.components.widget.data_viz.WidgetEditorService = function(
    $q, $rootScope, chartWrapperService, GvizChartEditor, gvizEvents) {
  /**
   * @type {!angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {ChartWrapperService}
   * @private
   */
  this.chartWrapperService_ = chartWrapperService;

  /**
   * @type {function(new:google.visualization.ChartEditor)}
   * @private
   */
  this.GvizChartEditor_ = GvizChartEditor;

  /**
   * @type {*}
   * @private
   */
  this.gvizEvents_ = gvizEvents;
};
var WidgetEditorService = (
    explorer.components.widget.data_viz.WidgetEditorService);


/**
 * Opens a google.visualization ChartEditor with the parameters provided.
 * When the editor is closed, it resolves a promise with the new chart
 * configuration.
 *
 * @param {ChartModel} chartModel
 * @param {google.visualization.DataTable} dataTable
 * @return {angular.$q.Promise.<ChartModel>}
 */
WidgetEditorService.prototype.showEditor = function(chartModel, dataTable) {
  var deferred = this.q_.defer();

  var editorClosed = function() {
    var newChartWrapper = editor.getChartWrapper();
    var newChartConfig =
        this.chartWrapperService_.getChartModel(newChartWrapper);

    this.rootScope_.$apply(function() {
      deferred.resolve(newChartConfig);
    });
  };

  var editor = new this.GvizChartEditor_();
  // TODO: Investigate if we have to unlisten this event.
  this.gvizEvents_.addListener(editor, 'ok', angular.bind(this, editorClosed));

  // Create a new chart wrapper based on the chart configuration
  var chartWrapper = this.chartWrapperService_.create(chartModel.chartType,
      chartModel.options, dataTable);
  editor.openDialog(chartWrapper);

  return deferred.promise;
};

});  // goog.scope
