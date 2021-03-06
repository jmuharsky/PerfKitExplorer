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
 * @fileoverview Contains sample QueryProperties objects and the subcomponents
 * that make up a QueryProperties object.  The idea is to include
 * QueryProperties objects here that will be used by multiple tests.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.query_builder.SampleQueryProperties');

goog.require('p3rf.perfkit.explorer.components.query_builder.Filter');
goog.require('p3rf.perfkit.explorer.components.query_builder.FilterClause');
goog.require('p3rf.perfkit.explorer.components.query_builder.QueryProperties');

goog.scope(function() {
var explorer = p3rf.perfkit.explorer;
var Filter = explorer.components.query_builder.Filter;
var FilterClause = explorer.components.query_builder.FilterClause;
var QueryProperties = explorer.components.query_builder.QueryProperties;

var COLUMN = Filter.DisplayMode.COLUMN;
var HIDDEN = Filter.DisplayMode.HIDDEN;


/**
 * Contains sample QueryProperies.
 */
explorer.components.query_builder.SampleQueryProperties = function() {};
var SampleQueryProperties =
    explorer.components.query_builder.SampleQueryProperties;


/**
 * An empty QueryProperties Object.
 * @const
 */
SampleQueryProperties.EMPTY = new QueryProperties([], [], []);


/**
 * A query properties object with a few selects and a filter.  Includes fields,
 * and metadata using both the column and hidden display mode.
 * @const
 */
SampleQueryProperties.BASIC_SELECT_WHERE_NO_AGG = new QueryProperties(
    [],
    [new Filter('field1', [], COLUMN, 'alias-1'),
     new Filter('field2',
         [new FilterClause(['string-value'], FilterClause.MatchRule.EQ)],
         COLUMN),
     new Filter('field3',
         [new FilterClause([2], FilterClause.MatchRule.GT),
          new FilterClause([0], FilterClause.MatchRule.LT)],
         HIDDEN),
     new Filter('value', [], COLUMN)],
    [new Filter('meta1', [], COLUMN),
     new Filter('meta2',
         [new FilterClause([11], FilterClause.MatchRule.EQ)],
         COLUMN),
     new Filter('meta3',
         [new FilterClause([22], FilterClause.MatchRule.GT),
          new FilterClause([13], FilterClause.MatchRule.LT)],
         HIDDEN)]);


/**
 * A query properties object with a few selects, a filter, and aggregations.
 * Includes fields, and metadata using both the column and hidden display mode.
 * @const
 */
SampleQueryProperties.BASIC_SELECT_WHERE_AGG = new QueryProperties(
    ['mean', 'std'],
    [new Filter('field1', [], COLUMN, 'alias-1'),
     new Filter('field2', [new FilterClause(
         ['string-value'], FilterClause.MatchRule.EQ)], HIDDEN)],
    [new Filter('meta1', [], COLUMN),
     new Filter('meta2', [new FilterClause(
         [2], FilterClause.MatchRule.EQ)], HIDDEN)]);

});  // goog.scope
