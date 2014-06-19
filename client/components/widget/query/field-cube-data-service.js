/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 *
 * @fileoverview fieldCubeDataService is an angular service used to fetch and
 * cache data from the field metadata cube.  See go/dashkit-cubes for cube
 * design and intent.  It requests data from a REST service (/data/fields,
 * backed by the GAE handler p3rf.dashkit.explorer.data).
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.dashkit.explorer.components.widget.query.FieldCubeDataService');

goog.require('p3rf.dashkit.explorer.dateUtil');
goog.require('p3rf.dashkit.explorer.models.dashkit_simple_builder.PicklistModel');
goog.require('p3rf.dashkit.explorer.models.dashkit_simple_builder.QueryFilterModel');
goog.require('goog.Uri');

goog.scope(function() {
var explorer = p3rf.dashkit.explorer;
var dateUtil = explorer.dateUtil;
var PicklistModel = explorer.models.dashkit_simple_builder.PicklistModel;
var QueryFilterModel = explorer.models.dashkit_simple_builder.QueryFilterModel;



/**
 * See module docstring for more information about purpose and usage.
 *
 * @param {!angular.$http} $http
 * @param {!angular.$q} $q
 * @constructor
 * @ngInject
 */
explorer.components.widget.query.FieldCubeDataService = function($http, $q) {
  /**
   * @type {!angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {!angular.$q}
   * @private
   */
  this.q_ = $q;
};
var FieldCubeDataService = (
    explorer.components.widget.query.FieldCubeDataService);


/**
 * Returns a list of fields or metadata, depending on the field_name.
 * @param {string} field_name The name of the field to list.
 * @param {QueryFilterModel} filters The filters to apply to the returned list
 *     of fields or metadata.
 * @return {angular.$q.Promise.<PicklistModel>} An object containing the list
 *     of fields or metadata.
 */
FieldCubeDataService.prototype.list = function(field_name, filters) {
  switch (field_name) {
    case 'metadata':
      return this.listMetadata(field_name, filters);
    default:
      return this.listFields(field_name, filters);
  }
};


/**
 * Returns a PicklistModel based on cube data and a set of filters.
 * @param {string} field_name The field name that autocomplete entries are
 *     listed for.
 * @param {!QueryFilterModel} filters The current filters.
 * @return {angular.$q.Promise.<PicklistModel>}
 */
FieldCubeDataService.prototype.listFields = function(field_name, filters) {
  var deferred = this.q_.defer();

  var query_parameters = {
    field_name: field_name,
    filters: filters
  };

  var promise = this.http_.get('/data/fields', {
    params: query_parameters,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });

  promise.then(angular.bind(this, function(response) {
    var data = response['data']['rows'];
    deferred.resolve(data);
  }));

  promise.then(null, angular.bind(this, function(error) {
    deferred.reject(error);
  }));

  return deferred.promise;
};


/**
 * Returns a PicklistModel based on cube data and a set of filters.
 * @param {string} field_name The field name that autocomplete entries are
 *     listed for.
 * @param {!QueryFilterModel} filters The current filters.
 * @return {angular.$q.Promise.<PicklistModel>}
 */
FieldCubeDataService.prototype.listMetadata = function(field_name, filters) {
  var deferred = this.q_.defer();

  var query_parameters = {
    field_name: field_name,
    filters: filters
  };

  var promise = this.http_.get('/data/metadata', {
    params: query_parameters,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });

  promise.then(angular.bind(this, function(response) {
    var data = response['data']['labels'];
    deferred.resolve(data);
  }));

  promise.then(null, angular.bind(this, function(error) {
    deferred.reject(error);
  }));

  return deferred.promise;
};



});  // goog.scope
