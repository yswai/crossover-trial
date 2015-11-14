(function () {

  'use strict';

  var app = angular.module('app');

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

        scope.getIconName = function (status) {

          var ICON_MAP = {
            'PASSED': 'fa-check-circle-o',
            'FAILED': 'fa-times-circle-o',
            'PENDING': 'fa-ellipsis-h',
            'RUNNING': 'fa-refresh'
          };

          return ICON_MAP[status.toUpperCase()];

        };

        GridController.registerHandler(function(id) {
          scope.isSelected = (id === scope.rowData.id);
          scope.$apply();
          if (scope.isSelected) {
            $(el).addClass('selected');
          } else {
            $(el).removeClass('selected');
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

  app.directive('coRowItemDetail', function () {
    return {
      restrict: 'AE',
      require: '^coGrid',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el, attr, GridController) {
        scope.isSelected = false;
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
      templateUrl: 'templates/co-row-item-detail.html'
    }
  });


})();
