var mysql = require('mysql');
// var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
* need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
 var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

 dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

 var dbQuery = function(func, cb) {
  var called=[];
  dbConnection.query(func, function(err, result) {
    if (err) throw err;
    called.push(cb(result));
  });
return called[0];
}

exports.findAllMessages = function(cb){
  var sql = 'SELECT * FROM messages;';
  dbQuery(sql, cb);
};

exports.findUser = function(username, cb){
  // 'SELECT' username 'FROM users'
  var sql = 'SELECT '+ username +' FROM users;';
  dbQuery(sql, cb);
};

exports.saveUser = function(username, cb){
  // 'INSERT into users' username
  var sql = 'INSERT INTO users (username) values (\'' + username + '\');';
  dbQuery(sql, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  // some function to give us r_id from roomname
  var findRoom = function (roomname) {
    var sqlQuery = 'SELECT r_id FROM rooms WHERE roomname = "'+ roomname +'";';
    return dbQuery(sqlQuery, function(data) {
      return data[0]['r_id'];
    });
  };
  roomid = findRoom(roomname);
  // console.log(roomid);

  var sql = 'INSERT INTO messages (msg, u_id, r_id) SELECT '+ message +', '+ userid +', '+ roomid +' FROM users u CROSS JOIN rooms r WHERE u.u_id = '+ userid +'AND r.r_id = '+ roomid +';';

  dbQuery(sql, cb);
};

exports.roomid = function (roomname) {
  // var sqlQuery = 'SELECT r_id FROM rooms WHERE roomname = '+ roomname +';';
  var test = 0;
  var sql = 'SELECT r_id FROM rooms WHERE roomname = \'samsroom\';';
  return dbQuery(sql, function(data) {
    console.log('hey there wow okay', data[0]['r_id']);
    return data[0]['r_id'];
  });

  // return test;
};
