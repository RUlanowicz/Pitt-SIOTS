-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 16, 2014 at 03:31 PM
-- Server version: 5.5.35
-- PHP Version: 5.3.10-1ubuntu3.9

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
  `communicationId` varchar(50) NOT NULL,
  PRIMARY KEY (`communicationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
