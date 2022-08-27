/* 
 *  Create & init site content
 */

-- users --
drop table if EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY ,
  username TEXT unique ,
  password TEXT DEFAULT "",
  email TEXT DEFAULT "",
  avatar TEXT DEFAULT "",
  signupTime TIMESTAMP default (datetime('now', 'localtime'))
);

INSERT INTO users
  (id, username, password, email, avatar) 
VALUES 
  (1, "teddyxiong53", "123456", "1073167306@qq.com", "111"),
  (2, "xhl", "123456", "teddyxiong53@sina.com", "222");

-- posts --
drop table if EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT DEFAULT "",
  content TEXT DEFAULT "",
  createTime TIMESTAMP default (datetime('now', 'localtime')),
  username TEXT DEFAULT "",
  userId INTEGER, 
  CONSTRAINT fk_users 
  FOREIGN KEY(userId) 
  REFERENCES users(id)
);

INSERT INTO posts
  (title, content, username, userId) 
VALUES 
  ("first post", "this is first post", "teddyxiong53", 1),
  ("second post", "this is second post", "xhl", 2);