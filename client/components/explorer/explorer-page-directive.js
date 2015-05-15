/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 *
 * @fileoverview ExplorerPageDirective encapsulates HTML, style and behavior
 *     for the Explorer page and dashboard layout.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.explorer.ExplorerPageDirective');
goog.provide('p3rf.perfkit.explorer.components.explorer.module');


goog.scope(function() {

const explorer = p3rf.perfkit.explorer;


/**
 * See module docstring for more information about purpose and usage.
 *
 * @return {Object} Directive definition object.
 * @ngInject
 * @export
 */
explorer.components.explorer.ExplorerPageDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: '/static/components/explorer/explorer-page-directive.html',
    controllerAs: 'pageCtrl',
    controller: ['$scope', function($scope) {
      console.log('Controlled');
    }],
    link: function() {
      console.log('Linked');
    }
  };
};


/**
 * Angular module.
 * @type {!angular.Module}
 */
explorer.components.explorer.module = angular.module(
  'p3rf.perfkit.explorer', [])
    .directive(
      'explorerPage', explorer.components.explorer.ExplorerPageDirective);
    
});  // goog.scope
