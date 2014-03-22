-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 22, 2014 at 01:57 PM
-- Server version: 5.5.31
-- PHP Version: 5.3.10-1ubuntu3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `siots`
--

-- --------------------------------------------------------

--
-- Table structure for table `communication`
--

CREATE TABLE IF NOT EXISTS `communication` (
  `type` varchar(500) NOT NULL,
  `communicationId` int(50) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`communicationId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `communication`
--

INSERT INTO `communication` (`type`, `communicationId`) VALUES
('virtual', 1),
('zigbee', 3),
('wifi', 4);

-- --------------------------------------------------------

--
-- Table structure for table `device_capability_template`
--

CREATE TABLE IF NOT EXISTS `device_capability_template` (
  `capability_category` varchar(50) NOT NULL,
  `capability_name` varchar(500) NOT NULL,
  `capability_id` int(11) NOT NULL AUTO_INCREMENT,
  `command_name` varchar(100) DEFAULT NULL,
  `command_parameter` varchar(50) DEFAULT NULL,
  `property_name` varchar(100) DEFAULT NULL,
  `property_value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`capability_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `device_capability_template`
--

INSERT INTO `device_capability_template` (`capability_category`, `capability_name`, `capability_id`, `command_name`, `command_parameter`, `property_name`, `property_value`) VALUES
('command', 'command_on', 4, 'on', NULL, NULL, NULL),
('command', 'command_off', 5, 'off', NULL, NULL, NULL),
('command', 'command_lock', 7, 'lock', NULL, NULL, NULL),
('command', 'command_unlock', 8, 'unlock', NULL, NULL, NULL),
('command', 'command_set_temp', 11, 'set_temp', 'temp', NULL, NULL),
('command', 'command_set_channel', 12, 'set_channel', 'channel', NULL, NULL),
('command', 'command_dimming', 13, 'set_dimming', 'percent', NULL, NULL),
('property', 'property_motion', 14, NULL, NULL, 'motion', 'motion_detected'),
('property', 'property_motion', 15, NULL, NULL, 'motion', 'motion_not_detected'),
('property', 'property_lock', 16, NULL, NULL, 'lock', 'locked'),
('property', 'property_lock', 17, NULL, NULL, 'lock', 'unlocked'),
('property', 'property_contact', 18, NULL, NULL, 'contact', 'open'),
('property', 'property_contact', 19, NULL, NULL, 'contact', 'closed'),
('property', 'property_temperature', 20, NULL, NULL, 'temperature', 'temperature_value'),
('property', 'property_dimming', 21, NULL, NULL, 'dimming', 'light_level_value');

-- --------------------------------------------------------

--
-- Table structure for table `device_instance`
--

CREATE TABLE IF NOT EXISTS `device_instance` (
  `belongTo` varchar(50) NOT NULL,
  `deviceType` varchar(50) NOT NULL,
  `indoorLocation` varchar(50) NOT NULL,
  `deviceName` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `communicationType` varchar(500) NOT NULL,
  `deviceId` varchar(50) NOT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `device_status`
--

CREATE TABLE IF NOT EXISTS `device_status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `device_instance_deviceid` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `device_template`
--

CREATE TABLE IF NOT EXISTS `device_template` (
  `deviceTemplateId` int(50) NOT NULL,
  `deviceType` varchar(50) NOT NULL,
  `capabilities` varchar(500) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `communication` varchar(100) NOT NULL,
  PRIMARY KEY (`deviceTemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `device_template`
--

INSERT INTO `device_template` (`deviceTemplateId`, `deviceType`, `capabilities`, `brand`, `model`, `communication`) VALUES
(1, 'simple_light', 'command_on, command_off', 'philips', 'philips123', 'wifi'),
(2, 'dimmer_light', 'command_dimming', 'philips', 'philips124', 'wifi'),
(3, 'thermostat', 'command_set_temp, property_temp', 'bosch', 'bosch123', 'zigbee'),
(4, 'motion_sensor', 'property_motion', 'bosch', 'bosch321', 'zigbee');

-- --------------------------------------------------------

--
-- Table structure for table `indoor_location`
--

CREATE TABLE IF NOT EXISTS `indoor_location` (
  `userid` varchar(50) NOT NULL,
  `indoorLocationId` varchar(50) NOT NULL,
  `friendlyName` varchar(50) NOT NULL,
  `listOfRooms` varchar(500) NOT NULL,
  `gps_lat` varchar(50) NOT NULL,
  `gps_lon` varchar(50) NOT NULL,
  PRIMARY KEY (`indoorLocationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` varchar(50) NOT NULL,
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

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `lastname`, `firstname`, `streetadd`, `city`, `state`, `country`, `gps_lat`, `gps_lon`) VALUES
('123', 'jieunatbosch', 'jieunatbosch', 'Kim', 'JiEun', '4716 Ellsworth Ave.', 'Pittsburgh', 'PA', 'USA', '40.4417', '80.0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
