var mysql = require('mysql');
require('dotenv/config');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tonimane',
    database : 'Code_Academy_A2',
    port : 3306
});

   
connection.connect((error) => {
  if (error) {
    console.log('Problem with DB connection : ' + error.message);
  } else {
    console.log('DB connected!');
  }
});


module.exports = connection;