const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'finalnode',
  password: '',
});
module.exports=pool.promise();