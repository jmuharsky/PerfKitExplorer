/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Primary module for the Explorer application.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

'use strict';

goog.provide('p3rf.perfkit.explorer.application.module');

goog.require('p3rf.perfkit.explorer.components.explorer.module');


goog.scope(function() {
const explorer = p3rf.perfkit.explorer;


/**
 * The main module for the Explorer app.
 */
explorer.application.module = angular.module('explorer', [
    'ui.grid', 'ui.grid.autoResize', 'ui.grid.resizeColumns',
    'ui.grid.selection',
    'p3rf.perfkit.explorer.templates',
    p3rf.perfkit.explorer.components.explorer.module.name
]);

});  // goog.scope
