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

    app.run(['$rootScope', 'Slug', function($rootScope, Slug) {
        $rootScope.slugify = function(input) {
          return Slug.slugify(input);
        };
    }]);

    app.filter('slugify', ['Slug', function(Slug) {
      return function(input) {
        Slug.slugify(input);
      };
    }]);

})();
