--
-- Table structure for table `users`
--
DROP DATABASE usersdb;
CREATE DATABASE usersdb;
USE usersdb;

CREATE TABLE users  (
  `id` int(60) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL UNIQUE,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  CONSTRAINT users PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
CREATE TABLE widgets  (
  `id` int(60) NOT NULL AUTO_INCREMENT,
  `names` varchar(255) DEFAULT NULL,
  CONSTRAINT widgets PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
CREATE TABLE user_widget  (
  `position_id` int(60) NOT NULL AUTO_INCREMENT,
  `top` varchar(255) DEFAULT NULL,
  `left` varchar(255) DEFAULT NULL,
  `user_id` int(60) DEFAULT NULL,
  `widget_id` int(60) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  PRIMARY KEY (position_id)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;


--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`,`username`,`password`,`name`) VALUES (1,'jesse','password','gesamel');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
