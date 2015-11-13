(function() {

   'use strict';

    var app = angular.module('app', ['ui.router']);

    app.config([function() {
      console.log('config phase');
    }]);

})();
