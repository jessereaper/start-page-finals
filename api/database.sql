--
-- Table structure for table `users`
--
DROP DATABASE usersdb;
CREATE DATABASE usersdb;
USE usersdb;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `user_widget`;
DROP TABLE IF EXISTS `widgets`

CREATE TABLE `users`  (
  `user_id` int(max) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
CREATE TABLE `user_widget`  (
  `position_id` int(max) NOT NULL AUTO_INCREMENT,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `widget_id` varchar(255) DEFAULT NULL,
  FOREIGN KEY(`user_id`) REFERENCES users(`user_id`),
  FOREIGN KEY(`widget_id`) REFERENCES widgets(`widget_id`),
  PRIMARY KEY (`position_id`)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
CREATE TABLE `widgets`  (
  `widget_id` int(max) NOT NULL AUTO_INCREMENT,
  `names` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`widget_id`)
)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`,`username`,`password`,`name`) VALUES (1,'jesse','password','gesamel');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
