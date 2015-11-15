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
            'FAILED': isInverted ? 'fa-exclamation-circle' : 'fa-times-circle',
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

          $scope.getColumnValue = function (columnName) {
            return helper.getColumnValue($scope.rowData, columnName, JOBS_COLUMN_MAP);
          };
          $scope.showModal = function (folderType) {
            //TODO: showmodal
          };
          $scope.unitTestChartConfig = _.extend(_.cloneDeep(PIE_CHART_CONFIG), {
            series: [{
              name: "Test Results",
              colorByPoint: true,
              data: [{
                name: "Passed",
                y: 342,
                color: '#1AB394'
              }, {
                name: "Failed",
                y: 3,
                color: '#F8AC59'
              }]
            }]
          });

          $scope.functionalTestChartConfig = _.extend(_.cloneDeep(PIE_CHART_CONFIG), {
            series: [{
              name: "Test Results",
              colorByPoint: true,
              data: [{
                name: "Passed",
                y: 14321,
                color: '#1AB394'
              }, {
                name: "Failed",
                y: 2000,
                color: '#F8AC59'
              }]
            }]
          });

        }],
      templateUrl: 'templates/co-row-item-detail.html'
    }
  });


})();
