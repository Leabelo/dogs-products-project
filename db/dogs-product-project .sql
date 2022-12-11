-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 11, 2022 בזמן 07:44 PM
-- גרסת שרת: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dogs-product-project`
--
CREATE DATABASE IF NOT EXISTS `dogs-product-project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dogs-product-project`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `followedproducts`
--

CREATE TABLE `followedproducts` (
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `followedproducts`
--

INSERT INTO `followedproducts` (`userId`, `productId`) VALUES
(1, 2),
(2, 5),
(2, 2),
(2, 4),
(3, 5),
(3, 2),
(3, 4),
(3, 3),
(13, 5),
(13, 2),
(13, 7),
(13, 9),
(13, 3),
(14, 5),
(14, 2),
(14, 4),
(14, 3),
(14, 8),
(1, 16),
(1, 14),
(1, 12),
(1, 13),
(1, 3),
(1, 5),
(1, 6),
(14, 16),
(14, 16),
(2, 6),
(2, 3),
(2, 11),
(2, 8),
(2, 12),
(2, 13),
(2, 14),
(2, 17),
(2, 18),
(17, 20),
(17, 8),
(17, 2),
(17, 5),
(17, 3),
(17, 6),
(17, 12),
(17, 13),
(17, 14),
(17, 11);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `priceRange` varchar(100) NOT NULL,
  `imageName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `products`
--

INSERT INTO `products` (`productId`, `name`, `description`, `priceRange`, `imageName`) VALUES
(2, 'ChewStix Ultra Bone', 'Contains real wood providing a safer chewing solution\r\nBacon scent rewards appropriate chewing behavior\r\nFlakes when chewed for added engagement & safety', '59.00-89.00 ', 'chew.jpg'),
(3, 'RForPet Bone', 'Rawhide pressed bone. 100% cowhide. Pleasant entertainment for the dog, it also helps to strengthen the teeth.', '25.00-35.00', 'rforpet.jpg'),
(5, 'KONG CLASSIC', 'The KONG Classic is the gold standard of dog toys and has become the staple for dogs around the world for over forty years. Offering enrichment by helping satisfy dogs’ instinctual needs, the KONG Classic’s unique natural red rubber formula is ultra-durable with an erratic bounce that is ideal for dogs that like to chew while also fulfilling a dog’s need to play. Want to extend play time? Be sure to stuff with tempting bits of kibble and entice with a dash of peanut butter. Add to the fun by adding KONG Snacks and topping with KONG Easy Treat.', '80.00-120.00 ', 'black_kong.jpg'),
(6, 'KONG BALL ', 'The KONG Ball wins the fetching game! Durable, bouncy, natural KONG Classic rubber gives it a bounce for fun games of fetch, delivering tons of healthy and interactive play.\r\n\r\nKONG Classic Red Rubber ball for fetching fun\r\nPuncture resistant for continued safe play\r\nMade in the USA. Globally Sourced Materials.', '45.00-89.00 ', 'ball.jpg'),
(8, 'Giant tooth brush', 'Grooves and ridges on our daily dental treat help remove plaque and tartar like never before. Engineered for the way dogs grip and chew, they turn playtime into fresher breath and cleaner teeth, giving dogs a reason to jump for joy.', '5.00-9.00 ', 'tooth_brush_giant.jpg'),
(11, 'Dental rope', 'Made of selected cotton fibers combined with polyester fibers.\r\nNon-toxic and suitable for prolonged chewing, does not contain AZO', '20.00-45.00 ', 'petex.jpg'),
(12, 'Nutri source', 'Lamb meal, brown rice, barley, oatmeal, dried plain beet pulp, menhaden fish meal (a source of fish oil), flax seed, natural turkey and chicken flavors.', '89.00-320.00 ', 'nutri _source.jpg'),
(13, 'HALTI 2', 'Help train your dog to stop pulling on the lead with the world-famous Halti Headcollar. As the world’s first no pull dog head collar, the Halti Headcollar is a favourite amongst pet parents and trainers alike. The latest design continues to lead the market for innovation and dog comfort.', '99.00-159.00 ', 'halti.jpg'),
(14, 'Beef Ear 4', 'Beef Ears are a great alternative to high-calorie delights. Plus each Beef Ear is a natural source of important nutrients like cartilage that helps to support joint health. Furthermore chewing on the dried Beef Ears dog treats helps to naturally remove \r\nharmful plaque and tartar leading to healthier pearly whites and better smelling breath.', '7.00-12.00 ', 'ear.jpg'),
(20, 'gf', 'df', 'ff', 'fbdc0191-a479-4730-9549-dddd25ed3008.jpeg');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `shops`
--

CREATE TABLE `shops` (
  `shopId` int(11) NOT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
  `location` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
  `link` varchar(1000) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Lea-ADMIN', 'Belotzerkovski', 'admin', 'admin', 2),
(2, 'Lea-USER', 'Belotzerkovski', 'user', 'user', 1),
(3, 'Maria', 'Aharon', 'mariaa', 'ma2022', 1),
(13, 'Eran', 'Yosef', 'erany', 'ey2022', 2),
(14, 'Nofar', 'Avraham', 'nofara', 'na2022', 1),
(17, 'meshi', 'meshiz', 'mshim', 'mm2022', 1);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `followedproducts`
--
ALTER TABLE `followedproducts`
  ADD KEY `userId` (`userId`) USING BTREE,
  ADD KEY `productId` (`productId`) USING BTREE;

--
-- אינדקסים לטבלה `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- אינדקסים לטבלה `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`shopId`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `shopId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
