(function() {

   'use strict';

    var app = angular.module('app', ['ui.router', 'lbServices', 'highcharts-ng', 'slugifier']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('jobs', {
          url: '/jobs',
          controller: 'JobsController',
          controllerAs: 'JobsController',
          resolve: {
            'jobs': ['Job', function(Job) {
              return Job.find({}).$promise;
            }]
          },
          template: ['<div ng-if="!noData" class="panel panel-default"><co-grid options="JobsController.gridOptions"></co-grid></div>',
            '<div ng-if="noData" class="col-md-offset-6"><i class="fa fa-exclamation-triangle fa-2x co-status-failed"></i>',
            '<span class="co-no-data">&nbsp;No Data</span></div>'].join('')
        });

      $urlRouterProvider.otherwise('/jobs');

    }]);

    app.filter('slugify', ['Slug', function(Slug) {
      return function(input) {
        return Slug.slugify(input);
      };
    }]);

})();
