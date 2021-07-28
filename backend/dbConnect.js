// Importations
const mysql = require('mysql');

// Configuration pool de connexion à la base de données

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '@toDbm20!',
  database        : 'visuum_db'
});

module.exports = {
    getPool: function() {
        return pool
    }
}