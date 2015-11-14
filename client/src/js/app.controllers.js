(function() {

  'use strict';

  var app = angular.module('app');

  app.constant('JOBS_COLUMN_MAP', {
    ChangeList: {
      get: 'changeset'
    },
    Owner: {
      get: 'owner'
    },
    'Time Started': {
      get: 'timeStarted'
    },
    'Build': {
      get: function(row) {
        return _.findWhere(row.testStatuses, {type: 'BUILD'});
      }
    },
    'Unit Test': {
      get: function(row) {
        return _.findWhere(row.testStatuses, {type: 'UNIT'});
      }
    },
    'Functional Test': {
      get: function(row) {
        return _.findWhere(row.testStatuses, {type: 'FUNCTIONAL'});
      }
    },
    'Status': {
      get: function(row) {
        if (_.isEmpty(row.testStatuses)) {
          return 'N/A';
        }
        return _.last(row.testStatuses).status;
      }
    }
  });

  app.controller('JobsController', ['$scope', 'jobs', 'helper', 'JOBS_COLUMN_MAP',
    function($scope, jobs, helper, JOBS_COLUMN_MAP) {
      var JobsController = this;

      JobsController.gridOptions = {
        columnNames: helper.getColumnNames(JOBS_COLUMN_MAP),
        data: jobs
      };

    }]);

  app.controller('RowItemController',
    ['$scope', 'helper', 'JOBS_COLUMN_MAP', 'Slug', function($scope, helper, JOBS_COLUMN_MAP, Slug) {
      var RowItemController = this;
      RowItemController.getColumnValue = function (columnName) {
        return helper.getColumnValue($scope.rowData, columnName, JOBS_COLUMN_MAP);
      };
  }]);

})();
