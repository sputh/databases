var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

//  var dbConnection = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "chat"
// });

// --- Build Database --
var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Room = sequelize.define('Room', {
  roomname: Sequelize.STRING
});

var Message = sequelize.define('Message' {
  userid: Sequelize.INTEGER,
  roomid: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  text: Sequelize.STRING,
});

User.hasMany(Message);
Message.belongsTo(User);
Room.hasMany(Message);
Message.belongsTo(Message);

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
  exports.findRoomID(roomname, function(data) {
    var sql = 'INSERT INTO messages (msg, u_id, r_id) SELECT "'+ message +'", '+ userid +', '+ data +' FROM users u CROSS JOIN rooms r WHERE u.u_id = '+ userid +' AND r.r_id = '+ data +';';

    console.log("THIS SHOULD BE 1: ", data);
    dbQuery(sql, cb);
  });
};

exports.findRoomID = function (roomname, cb) {
  var sql = 'SELECT r_id FROM rooms WHERE roomname = "'+ roomname +'";';
  dbQuery(sql, function(result) {
    cb(result[0]['r_id']);
  });
};
