var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '18.209.99.140',
    user     : 'india',
    password : 'india',
    database : 'radmus',
    multipleStatements: true
});

// connection.connect(function(err) {
//     if (err) throw err;
// });

module.exports = connection;