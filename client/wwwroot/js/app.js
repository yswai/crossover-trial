(function() {

   'use strict';

    var app = angular.module('app', ['ui.router', 'lbServices']);

    app.config([function() {
      console.log('config phase');
    }]);

})();
