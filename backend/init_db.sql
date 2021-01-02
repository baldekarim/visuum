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
  `opening_date` date,
  `pictures` varchar(64),
  `description` text,
  `region` varchar(32), 
  `prefecture` varchar(32),
  `sub-prefecture` varchar(32),
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
  `password` varchar(32) NOT NULL,
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
  PRIMARY KEY(`recipient_id`)
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
  PRIMARY KEY(`user_id`, `recipient_id`, `transaction_reference`, `withdrawal_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`recipient_id`) REFERENCES `recipient` (`recipient_id`) ON DELETE CASCADE,
  FOREIGN KEY (`transaction_reference`) REFERENCES `transaction` (`reference`) ON DELETE CASCADE, 
  FOREIGN KEY (`withdrawal_id`) REFERENCES `withdrawal` (`withdrawal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------------------
-- Dumping data for table `user`
-- --------------------------------------------------------------------

INSERT INTO `user` (`last_name`, `first_name`, `address`, `city`, `zip_code`, `country`, `phone_number`, `email`, `password`, `is_admin`) VALUES
('BARRY', 'Ammar', '15 rue Henri Barbusse', 'Limeil Brevannes', 94450, 'FRANCE', '+33 7 53 77 19 04', 'ambarry85@gmail.com', 'testMP1', 0), 
('DIALLO', 'Fatima', 'Hamdallaye Pharmacie', 'Conakry', 99330, 'GUINEE', '+224 622 05 32 88', 'fatima.diallo@orange.fr', 'testMP2', 1), 
('BALDÉ', 'Karim', '4 Avenue Paul Verlaine', 'Villeneuve Saint-Georges', 94190, 'FRANCE', '+33 6 2 74 37 94', 'adbkarim.balde@gmail.com', 'testMP3', 0);

-- --------------------------------------------------------------------
-- Dumping data for table `recipient`
-- --------------------------------------------------------------------

INSERT INTO `recipient` (`name`, `phone_number`) VALUES
('Abdourahmane DIALLO', '+224 622 35 78 90'), 
('Aïssatou BAH', '+224 664 42 20 07'), 
('Hafsatou BARRY', '+224 622 51 23 06');

-- --------------------------------------------------------------------
-- Dumping data for table `transaction`
-- --------------------------------------------------------------------

INSERT INTO `transaction` VALUES
('2012152203518', '2020-12-15'), 
('2003181121682', '2020-03-18'),
('2006220831559', '2020-06-22'),
('2001011925020', '2020-01-01'),
('1911291506371', '2019-11-29');

-- --------------------------------------------------------------------
-- Dumping data for table `withdrawal`
-- --------------------------------------------------------------------

INSERT INTO `withdrawal` (`name`, `description`, `manager`, `phone_number`, `email`) VALUES
('Marché Madina', 'Vente de produits de tout genre, échange de devises, ...', 'Saliou DIALLO', '+224 664 84 90 01', 'saliou.diallo@test.gn'),
('Bambéto', 'Télécentre vente de carte de crédit, transfert Orange Money', 'Ilyass SOW', '+224 621 30 74 52', 'il-sow52@test.gn'),
('Enco 5', 'Épicerie vente de produits alimentaires', 'Mariam BALDÉ', '+224 666 57 22 09', 'mame-bald95@test.gn');

-- --------------------------------------------------------------------
-- Dumping data for table `transaction_details`
-- --------------------------------------------------------------------

INSERT INTO `transaction_details` (`user_id`, `recipient_id`, `transaction_reference`, `withdrawal_id`, `number_of_vouchers`, `shipping`, `total_amount`) VALUES
(1, 1, '2012152203518', 1, 150, 7.00, 157.00), 
(2, 3, '2003181121682', 2, 100, 4.50, 104.50),
(1, 2, '2006220831559', 2, 80, 2.75, 82.75),
(1, 1, '2001011925020', 3, 50, 2, 52),
(2, 3, '1911291506371', 1, 120, 6, 126);

COMMIT;