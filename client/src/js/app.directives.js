(function () {

  'use strict';

  var app = angular.module('app');

  /**
   * Parent grid directive
   */
  app.directive('coGrid', function () {
    return {
      restrict: 'E',
      scope: {
        options: '='
      },
      controller: 'GridController',
      controllerAs: 'GridController',
      templateUrl: 'templates/co-grid.html'
    }
  });

  /**
   * Decoration ines directive
   */
  app.directive('coRowHr', function () {
    return {
      restrict: 'A',
      require: '^coGrid',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el, attr, GridController) {

        GridController.registerHandler(function(id) {
          scope.isSelected = (id === scope.rowData.id);
          scope.$apply();
        });

      },
      controller: ['$scope', 'helper', 'JOBS_COLUMN_MAP',
        function($scope, helper, JOBS_COLUMN_MAP) {
          $scope.getColumnValue = function (columnName) {
            return helper.getColumnValue($scope.rowData, columnName, JOBS_COLUMN_MAP);
          };
        }],
      templateUrl: 'templates/co-row-hr.html'
    }
  });

  /**
   * Row header directive
   */
  app.directive('coRowItemHead', function () {
    return {
      restrict: 'AE',
      require: '^coGrid',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el, attr, GridController) {
        var $el = $(el);

        scope.getIconName = function (status, isInverted) {

          var ICON_MAP = {
            'PASSED': isInverted ? 'fa-check-circle' : 'fa-check-circle-o',
            'FAILED': isInverted ? 'fa-exclamation-circle' : 'fa-times-circle-o',
            'PENDING': 'fa-ellipsis-h',
            'RUNNING': 'fa-refresh'
          };

          return status ? ICON_MAP[status.toUpperCase()] : '';

        };

        GridController.registerHandler(function(id) {
          scope.isSelected = (id === scope.rowData.id);
          scope.$apply();
          var $lastTd = $el.find('td:last');
          if (scope.isSelected) {
            $el.addClass('selected');
            $lastTd.addClass('expanded');
            $lastTd.attr('rowspan', '2');
          } else {
            $el.removeClass('selected');
            $lastTd.removeClass('expanded');
            $lastTd.attr('rowspan', '1');
          }
          scope.$apply();
        });

        $el.on('click', function() {
          GridController.selectRow(scope.rowData.id);
        });
      },
      controller: ['$scope', 'helper', 'JOBS_COLUMN_MAP',
        function($scope, helper, JOBS_COLUMN_MAP) {
          $scope.getColumnValue = function (columnName) {
            return helper.getColumnValue($scope.rowData, columnName, JOBS_COLUMN_MAP);
          };
        }],
      templateUrl: 'templates/co-row-item-head.html'
    }
  });

  /**
   * Row detail directive
   */
  app.directive('coRowItemDetail', function () {
    return {
      restrict: 'AE',
      require: '^coGrid',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el, attr, GridController) {

        var defaultIcon = 'fa-minus-circle co-status-failed';

        scope.isSelected = false;

        scope.getIconName = function (status, isCircleOutlined) {

          var ICON_MAP = {
            'PASSED': isCircleOutlined ? 'fa-check-circle-o' : 'fa-check-square',
            'FAILED': isCircleOutlined ? 'fa-times-circle-o' : 'fa-times-circle',
            'PENDING': 'fa-ellipsis-h',
            'RUNNING': 'fa-refresh'
          };

          return status ? ICON_MAP[status.toUpperCase()] || defaultIcon : defaultIcon;

        };

        GridController.registerHandler(function(id) {

          scope.isSelected = (id === scope.rowData.id);

          if (scope.isSelected) {
            $(el).addClass('selected');
          } else {
            $(el).removeClass('selected');
          }

          scope.$apply();
        });
      },
      controller: ['$scope', 'helper', 'JOBS_COLUMN_MAP', 'PIE_CHART_CONFIG',
        function($scope, helper, JOBS_COLUMN_MAP, PIE_CHART_CONFIG) {

          var defaultDate = new Date();

          $scope.getColumnValue = function (columnName) {
            return helper.getColumnValue($scope.rowData, columnName, JOBS_COLUMN_MAP);
          };
          $scope.showModal = function (folderType) {
            //TODO: showmodal
          };

          var unitTestData = $scope.getColumnValue('Unit Test');
          $scope.unitTestTimeStarted = unitTestData ? unitTestData.timeStarted : defaultDate;
          $scope.unitTestTimeFinish = unitTestData ? unitTestData.timeFinish : defaultDate;
          $scope.unitTestDuration = moment(moment($scope.unitTestTimeFinish).diff(moment($scope.unitTestTimeStarted))).format('HH:mm:ss');
          var unitTestCovered = unitTestData ? unitTestData.covered : 0;
          var unitTestTotal = unitTestData ? unitTestData.total : 0;
          var unitTestCoverage = unitTestTotal > 0 ? ((unitTestCovered / unitTestTotal) * 100) : 0;
          $scope.unitTestCoverage = unitTestCoverage;
          $scope.unitTestCovered = unitTestCovered;
          $scope.unitTestMissed = unitTestTotal - unitTestCovered;
          $scope.unitTestChartConfig = _.extend(_.cloneDeep(PIE_CHART_CONFIG), {
            series: [{
              name: "Test Results",
              colorByPoint: true,
              data: [{
                name: "Covered",
                y: unitTestCovered,
                color: '#1AB394'
              }, {
                name: "Missed",
                y: $scope.unitTestMissed,
                color: '#F8AC59'
              }]
            }]
          });

          var funcTestData = $scope.getColumnValue('Functional Test');
          $scope.funcTestTimeStarted = funcTestData ? funcTestData.timeStarted : defaultDate;
          $scope.funcTestTimeFinish = funcTestData ? funcTestData.timeFinish : defaultDate;
          $scope.funcTestDuration = moment(moment($scope.funcTestTimeFinish).diff(moment($scope.funcTestTimeStarted))).format('HH:mm:ss');
          var funcTestCovered = funcTestData ? funcTestData.covered : 0;
          var funcTestTotal = funcTestData ? funcTestData.total : 0;
          var funcTestCoverage = funcTestTotal > 0 ? ((funcTestCovered / funcTestTotal) * 100) : 0;
          $scope.funcTestCoverage = funcTestCoverage;
          $scope.funcTestCovered = funcTestCovered;
          $scope.funcTestMissed = funcTestTotal - funcTestCovered;
          $scope.functionalTestChartConfig = _.extend(_.cloneDeep(PIE_CHART_CONFIG), {
            series: [{
              name: "Test Results",
              colorByPoint: true,
              data: [{
                name: "Covered",
                y: funcTestCovered,
                color: '#1AB394'
              }, {
                name: "Missed",
                y: $scope.funcTestMissed,
                color: '#F8AC59'
              }]
            }]
          });

        }],
      templateUrl: 'templates/co-row-item-detail.html'
    }
  });


})();
