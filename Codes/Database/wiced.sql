-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 23, 2016 at 06:57 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wiced`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(11) UNSIGNED NOT NULL,
  `one` int(30) DEFAULT NULL,
  `two` int(30) DEFAULT NULL,
  `three` int(30) DEFAULT NULL,
  `four` int(30) DEFAULT NULL,
  `five` int(30) DEFAULT NULL,
  `six` int(30) DEFAULT NULL,
  `seven` int(30) DEFAULT NULL,
  `eight` int(30) DEFAULT NULL,
  `nine` int(30) DEFAULT NULL,
  `ten` int(30) DEFAULT NULL,
  `eleven` int(11) NOT NULL,
  `twelve` int(11) NOT NULL,
  `thirteen` int(11) NOT NULL,
  `EncoderL` double NOT NULL,
  `EncoderR` double NOT NULL,
  `reg_date` timestamp(3) NOT NULL DEFAULT '0000-00-00 00:00:00.000' ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `EncoderL`, `EncoderR`, `reg_date`) VALUES
(1, 7, 3, 84, -190, 15, 128, 663, -426, -682, 0, 0, 0, 50, 0, 0, '2016-07-22 07:53:03.952');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
