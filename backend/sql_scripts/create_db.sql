--
-- Create Database
--

CREATE DATABASE IF NOT EXISTS visuum_db;

--
-- Select the database
--
USE visuum_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `area_of_activities`
--

CREATE TABLE IF NOT EXISTS `area_of_activities` (
  `area_of_activities_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(64),
  PRIMARY KEY(`area_of_activities_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type_of_shops`
--

CREATE TABLE IF NOT EXISTS `type_of_shops` (
  `type_of_shops_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(64),
  PRIMARY KEY(`type_of_shops_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `shop_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `acronym` varchar(8),
  `logo` varchar(64),
  `manager` varchar(128),
  `address` varchar(128),
  `phone_1` VARCHAR(20),
  `phone_2` VARCHAR(20),
  `phone_3` VARCHAR(20),
  `email` VARCHAR(64),
  `opening_date` date,
  `pictures` varchar(64),
  `description` text,
  `region` varchar(32), 
  `prefecture` varchar(32),
  `sub-prefecture` varchar(32),
  `district` varchar(32),
  `fbk_page` VARCHAR(128), 
  `opening_hours` VARCHAR(64), 
  `website` VARCHAR(128),
  `type_of_shops_id` int UNSIGNED,
  PRIMARY KEY(`shop_id`),
  FOREIGN KEY (`type_of_shops_id`) REFERENCES `type_of_shops` (`type_of_shops_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `designation` varchar(64),
  `description` varchar(256),
  `price` int,
  `image` varchar(64),
  `shop_id` int UNSIGNED,
  PRIMARY KEY(`product_id`),
  FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64),
  `acronym` varchar(8),
  `slogan` varchar(16),
  `logo` varchar(64),
  `apip_number` varchar(32),
  `tax_number` varchar(32),
  `creation_date` date,
  `address` varchar(128),
  `manager` varchar(128),
  `pictures` varchar(64),
  `company_introduction` text,
  `activity` varchar(128),
  `region` varchar(32),
  `prefecture` varchar(32),
  `sub-prefecture` varchar(32),
  `district` varchar(32),
  `legal_form` varchar(16),
  `area_of_activities_id` int UNSIGNED,
  PRIMARY KEY(`company_id`),
  FOREIGN KEY (`area_of_activities_id`) REFERENCES `area_of_activities` (`area_of_activities_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `job_offer`
--

CREATE TABLE IF NOT EXISTS `job_offer` (
  `job_offer_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64),
  `logo` varchar(64),
  `description` text,
  `company_type` varchar(64),
  `job_title` varchar(64),
  `vacancy_number` varchar(32),
  `address` varchar(128),
  `tasks` text,
  `profile` text,
  `starting_date` date,
  `end_date` date,
  `publication` datetime,
  `required_level` varchar(32),
  `type_of_contract` varchar(64),
  `required_experience` smallint,
  `salary` decimal(10, 2),
  `region` varchar(32),
  `prefecture` varchar(32),
  `sub-prefecture` varchar(32),
  `district` varchar(32),
  `contact_fullname` varchar(128),
  `contact_email` varchar(64),
  `contact_phone_number` varchar(20),
  `area_of_activities_id` int UNSIGNED,
  PRIMARY KEY(`job_offer_id`),
  FOREIGN KEY (`area_of_activities_id`) REFERENCES `area_of_activities` (`area_of_activities_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `last_name` varchar(32) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `address` varchar(256),
  `city` varchar(64),
  `zip_code` int,
  `country` varchar(64) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint NOT NULL,
  PRIMARY KEY(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipient`
--

CREATE TABLE IF NOT EXISTS `recipient` (
  `recipient_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `user_id` int UNSIGNED,
  PRIMARY KEY(`recipient_id`)
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE IF NOT EXISTS `transaction` (
  `reference` varchar(16) NOT NULL,
  `transaction_date` date NOT NULL,
  PRIMARY KEY(`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE IF NOT EXISTS `transaction_details` (
  `user_id` int UNSIGNED NOT NULL,
  `recipient_id` int UNSIGNED NOT NULL,
  `transaction_reference` varchar(16) NOT NULL,
  `withdrawal_id` int UNSIGNED NOT NULL,
  `number_of_vouchers` smallint NOT NULL,
  `shipping` decimal(5, 2) NOT NULL,
  `total_amount` decimal(6, 2) NOT NULL,
  `amount_gnf` int NOT NULL,
  `exchange_rate` int NOT NULL,
  PRIMARY KEY(`user_id`, `recipient_id`, `transaction_reference`, `withdrawal_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`recipient_id`) REFERENCES `recipient` (`recipient_id`) ON DELETE CASCADE,
  FOREIGN KEY (`transaction_reference`) REFERENCES `transaction` (`reference`) ON DELETE CASCADE, 
  FOREIGN KEY (`withdrawal_id`) REFERENCES `withdrawal` (`withdrawal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal`
--

CREATE TABLE IF NOT EXISTS `withdrawal` (
  `withdrawal_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(256) NOT NULL,
  `manager` varchar(128) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY(`withdrawal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_to_be`
--

CREATE TABLE IF NOT EXISTS `user_to_be` (
  `key_user` varchar(64) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `address` varchar(256),
  `city` varchar(64),
  `zip_code` int,
  `country` varchar(64) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY(`key_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

COMMIT;
