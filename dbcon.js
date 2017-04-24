var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_wongkevi',
  password        : '4300',
  database        : 'cs290_wongkevi'
});

module.exports.pool = pool;
