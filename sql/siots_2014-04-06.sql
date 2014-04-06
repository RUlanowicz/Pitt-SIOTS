# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.17)
# Database: siots
# Generation Time: 2014-04-06 22:05:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table communication
# ------------------------------------------------------------

DROP TABLE IF EXISTS `communication`;

CREATE TABLE `communication` (
  `type` varchar(500) NOT NULL,
  `communicationId` int(50) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`communicationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;

INSERT INTO `communication` (`type`, `communicationId`)
VALUES
	('virtual',1),
	('zigbee',3),
	('wifi',4);

/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table device_capability_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `device_capability_template`;

CREATE TABLE `device_capability_template` (
  `capability_category` varchar(50) NOT NULL,
  `capability_name` varchar(500) NOT NULL,
  `capability_id` int(11) NOT NULL AUTO_INCREMENT,
  `command_name` varchar(100) DEFAULT NULL,
  `command_parameter` varchar(50) DEFAULT NULL,
  `property_name` varchar(100) DEFAULT NULL,
  `property_value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`capability_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `device_capability_template` WRITE;
/*!40000 ALTER TABLE `device_capability_template` DISABLE KEYS */;

INSERT INTO `device_capability_template` (`capability_category`, `capability_name`, `capability_id`, `command_name`, `command_parameter`, `property_name`, `property_value`)
VALUES
	('command','command_on',4,'on',NULL,NULL,NULL),
	('command','command_off',5,'off',NULL,NULL,NULL),
	('command','command_lock',7,'lock',NULL,NULL,NULL),
	('command','command_unlock',8,'unlock',NULL,NULL,NULL),
	('command','command_set_temp',11,'set_temp','temp',NULL,NULL),
	('command','command_set_channel',12,'set_channel','channel',NULL,NULL),
	('command','command_dimming',13,'set_dimming','percent',NULL,NULL),
	('property','property_motion',14,NULL,NULL,'motion','motion_detected'),
	('property','property_motion',15,NULL,NULL,'motion','motion_not_detected'),
	('property','property_lock',16,NULL,NULL,'lock','locked'),
	('property','property_lock',17,NULL,NULL,'lock','unlocked'),
	('property','property_contact',18,NULL,NULL,'contact','open'),
	('property','property_contact',19,NULL,NULL,'contact','closed'),
	('property','property_temp',20,NULL,NULL,'temp','temp_value'),
	('property','property_dimming',21,NULL,NULL,'dimming','light_level_value'),
	('property','property_channel',22,NULL,NULL,'channel','channel_value');

/*!40000 ALTER TABLE `device_capability_template` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table device_instance
# ------------------------------------------------------------

DROP TABLE IF EXISTS `device_instance`;

CREATE TABLE `device_instance` (
  `belongTo` varchar(50) CHARACTER SET utf8 NOT NULL,
  `deviceType` varchar(50) NOT NULL,
  `indoorLocation` varchar(50) NOT NULL,
  `deviceName` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `communicationType` varchar(500) NOT NULL,
  `deviceId` int(50) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `device_instance` WRITE;
/*!40000 ALTER TABLE `device_instance` DISABLE KEYS */;

INSERT INTO `device_instance` (`belongTo`, `deviceType`, `indoorLocation`, `deviceName`, `brand`, `model`, `communicationType`, `deviceId`)
VALUES
	('ryan','radio','living room','boombox','bosch','bosch789','wifi',1),
	('ryan','thermostat','living room','thermy','bosch','bosch123','wifi',2);

/*!40000 ALTER TABLE `device_instance` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table device_status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `device_status`;

CREATE TABLE `device_status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `deviceId` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`status_id`),
  KEY `deviceId` (`deviceId`),
  CONSTRAINT `device_status_ibfk_1` FOREIGN KEY (`deviceId`) REFERENCES `device_instance` (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `device_status` WRITE;
/*!40000 ALTER TABLE `device_status` DISABLE KEYS */;

INSERT INTO `device_status` (`status_id`, `deviceId`, `property_id`, `status`)
VALUES
	(1,1,22,'93.7');

/*!40000 ALTER TABLE `device_status` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table device_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `device_template`;

CREATE TABLE `device_template` (
  `deviceTemplateId` int(50) NOT NULL,
  `deviceType` varchar(50) NOT NULL,
  `capabilities` varchar(500) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `communication` varchar(100) NOT NULL,
  PRIMARY KEY (`deviceTemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `device_template` WRITE;
/*!40000 ALTER TABLE `device_template` DISABLE KEYS */;

INSERT INTO `device_template` (`deviceTemplateId`, `deviceType`, `capabilities`, `brand`, `model`, `communication`)
VALUES
	(1,'simple_light','command_on, command_off','philips','philips123','wifi'),
	(2,'dimmer_light','command_dimming','philips','philips124','wifi'),
	(3,'thermostat','command_set_temp, property_temp','bosch','bosch123','zigbee'),
	(4,'motion_sensor','property_motion','bosch','bosch321','zigbee'),
	(5,'radio','command_on, command_off, command_set_channel, property_channel','bosch','bosch789','wifi');

/*!40000 ALTER TABLE `device_template` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table indoor_location
# ------------------------------------------------------------

DROP TABLE IF EXISTS `indoor_location`;

CREATE TABLE `indoor_location` (
  `userid` varchar(50) NOT NULL,
  `indoorLocationId` varchar(50) NOT NULL,
  `friendlyName` varchar(50) NOT NULL,
  `listOfRooms` varchar(500) NOT NULL,
  `gps_lat` varchar(50) NOT NULL,
  `gps_lon` varchar(50) NOT NULL,
  PRIMARY KEY (`indoorLocationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table relationship
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relationship`;

CREATE TABLE `relationship` (
  `id` int(11) NOT NULL,
  `relationship_temp_id` int(11) NOT NULL,
  `subject_type` int(11) NOT NULL,
  `object_type` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table relationship_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relationship_template`;

CREATE TABLE `relationship_template` (
  `relationship_temp_id` int(11) NOT NULL AUTO_INCREMENT,
  `relationship_temp_name` varchar(100) NOT NULL,
  `subject_type` varchar(100) NOT NULL,
  `object_type` varchar(100) NOT NULL,
  PRIMARY KEY (`relationship_temp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `relationship_template` WRITE;
/*!40000 ALTER TABLE `relationship_template` DISABLE KEYS */;

INSERT INTO `relationship_template` (`relationship_temp_id`, `relationship_temp_name`, `subject_type`, `object_type`)
VALUES
	(1,'friendship','human','human'),
	(2,'ownership','human','device'),
	(3,'kinship','device','device'),
	(4,'colocationship','human, device','human, device'),
	(5,'thriendship','human, device','human, device');

/*!40000 ALTER TABLE `relationship_template` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Sessions`;

CREATE TABLE `Sessions` (
  `sid` varchar(255) NOT NULL,
  `expires` int(11) DEFAULT NULL,
  `json` text,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;

INSERT INTO `Sessions` (`sid`, `expires`, `json`, `id`, `createdAt`, `updatedAt`)
VALUES
	('GiOfGCAbCUDIipipQffZCuU5',1396901494,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{}}',2,'2014-04-06 11:56:58','2014-04-06 16:11:33'),
	('uHv9svxHAIw4QdF3h2mpoYY3',1396903886,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{}}',3,'2014-04-06 13:06:04','2014-04-06 16:51:25');

/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userid` int(50) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `streetadd` varchar(200) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `gps_lat` varchar(50) NOT NULL,
  `gps_lon` varchar(50) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`userid`, `username`, `password`, `lastname`, `firstname`, `streetadd`, `city`, `state`, `country`, `gps_lat`, `gps_lon`)
VALUES
	(1,'ryan','123','Ryan','Ulanowicz','310 Walntut St.','Pittsburgh','PA','USA','47.0001','-80'),
	(123,'jieunatbosch','jieunatbosch','Kim','JiEun','4716 Ellsworth Ave.','Pittsburgh','PA','USA','47.4417','80.0'),
	(124,'bob','asdf','Smith','bob','1234 fake st.','pittsburgh','PA','USA','20','20'),
	(125,'richard','5678','Knight','Richard','5678 Boom St.','Philadelphia','PA','USA','20','20'),
	(126,'josef','1234','Grzenda','Josef','1234 asdf st.','asdf','AL','USA','20','20'),
	(129,'tammy','asdf','asdf','asdf','asdf 124jasdflkj','asdfasdf','AL','USA','20','20'),
	(130,'james','asdf','ubob','asdf','123 tjas st.','asdf','AL','USA','20','20'),
	(131,'ryan2','asldlksdjf','jfjfjjfkasdfkj','jfjfjfjfj','12444','jfjfj','AL','USA','20','20'),
	(132,'ryan3','asdf','asdf','asdf','asdf 12','asdf','AL','USA','20','20');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
