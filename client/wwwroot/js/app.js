(function() {

   'use strict';

    var app = angular.module('app', ['ui.router', 'lbServices', 'slugifier']);

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
          template: '<div class="panel panel-default"><co-grid options="JobsController.gridOptions"></co-grid></div>'
        });

      $urlRouterProvider.otherwise('/jobs');

    }]);

    app.filter('slugify', ['Slug', function(Slug) {
      return function(input) {
        return Slug.slugify(input);
      };
    }]);

})();
