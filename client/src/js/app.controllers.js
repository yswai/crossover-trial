(function() {

  'use strict';

  var PIE_CHART_CONFIG = {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical'
      }
    },
    title: {
      text: ''
    },
    size: {
      height: 120,
      width: 150
    }
  };

  var app = angular.module('app');

  app.constant('PIE_CHART_CONFIG', PIE_CHART_CONFIG);

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

  app.controller('GridController', ['$scope',
    function($scope) {
      var GridController = this;
      GridController.handlers = [];
      GridController.options = $scope.options;

      GridController.registerHandler = function (handler) {
        GridController.handlers.push(handler);
      };

      GridController.selectRow = function (id) {
        GridController.selectedRowId = id;
        _.each(GridController.handlers, function(handler) {
          handler(id);
        });
      };

      if (!_.isEmpty($scope.data)) {
        GridController.selectedRowId = _.first($scope.data).id;
        GridController.selectRow(GridController.selectedRowId);
      };

    }]);

})();
