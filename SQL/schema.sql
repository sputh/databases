CREATE DATABASE chat;

USE chat;


-- Users
CREATE TABLE users (
  username VARCHAR(20),
  u_id int(11) NOT NULL auto_increment,
  PRIMARY KEY (u_id)
);

-- Rooms
CREATE TABLE rooms (
  roomname VARCHAR(30),
  r_id int(11) NOT NULL auto_increment,
  PRIMARY KEY (r_id)
);

-- Messages
CREATE TABLE messages (
  createdAt TIMESTAMP(6),
  msg TEXT,
  m_id int(11) NOT NULL auto_increment,
  u_id int(11) NOT NULL,
  r_id int(11) NOT NULL,
  PRIMARY KEY (m_id),
  FOREIGN KEY (u_id) REFERENCES users(u_id),
  FOREIGN KEY (r_id) REFERENCES rooms(r_id)
);


-- ### Functions ###

-- all messages of specific user
-- SELECT m.createdAt, m.msg, u.username
-- FROM messages m
-- JOIN users u
-- ON u.u_id = m.userID
-- WHERE u.username = "Mario"

-- -- function call (users)
-- INSERT INTO messages
-- SELECT new date(), ...., u.id
-- FROM users u
-- CROSS JOIN rooms r
-- where u.username = 'Mario'
-- and r.roomName = 'This room'


-- ### Guidelines for creating groups of friends

-- CREATE TABLE FORUMS
--   id
--   name

-- CREATE TABLE forum_users (
--   id
--   userID
--   forumID
-- )

-- SELECT *
-- FROM forums
-- JOIN forum_users
-- on f.id = forumusers.forumID
-- JOIN users
-- on u.id = forumusers.userId

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
