(function () {

  'use strict';

  var app = angular.module('app');

  app.directive('coGrid', function () {
    return {
      restrict: 'E',
      scope: {
        options: '='
      },
      templateUrl: 'templates/co-grid.html'
    }
  });

  app.directive('coRowItemHead', function () {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el) {
      },
      controller: 'RowItemController',
      controllerAs: 'RowItemController',
      templateUrl: 'templates/co-row-item-head.html'
    }
  });

  app.directive('coRowItemDetail', function () {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        rowData: '='
      },
      link: function (scope, el) {
      },
      templateUrl: 'templates/co-row-item-detail.html'
    }
  });


})();
