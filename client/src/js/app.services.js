(function() {

  'use strict';

  var app = angular.module('app');

  app.service('helper', [function() {

    this.getColumnNames = function(columnDefs) {
      return _.keys(columnDefs);
    };

    this.getColumnValue = function(rowData, columnName, columnDefs) {
      var columnDef = columnDefs[columnName];
      if (angular.isString(columnDef.get)) {
        return rowData[columnDef.get];
      } else if (angular.isFunction(columnDef.get)) {
        return columnDef.get(rowData);
      }
      return null;
    }

  }]);

})();
