'use strict';

console.log('[datasources.local.js] MONGOLAB_URI = ' + process.env.MONGOLAB_URI);

var dsConfig = {
  "mongolab": {
    "debug": true,
    "name": "mongolab",
    "connector": "loopback-connector-mongodb",
    "url": process.env.MONGOLAB_URI || "mongodb://co:1234@ds053894.mongolab.com:53894/crossover-test"
  }
};

module.exports = dsConfig;
