-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.6.7-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage de la structure de table scoupart. allergens
CREATE TABLE IF NOT EXISTS `allergens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allergen` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.allergens : ~14 rows (environ)
INSERT INTO `allergens` (`id`, `allergen`) VALUES
	(1, 'Gluten'),
	(2, 'Crustacés'),
	(3, 'Oeufs'),
	(4, 'Poissons'),
	(5, 'Arachides'),
	(6, 'Soja'),
	(7, 'Lactose'),
	(8, 'Fruits à coques'),
	(9, 'Céleri'),
	(10, 'Moutarde'),
	(11, 'Graines de sésame'),
	(12, 'Sulfites'),
	(13, 'Lupin'),
	(14, 'Mollusques');

-- Listage de la structure de table scoupart. categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.categories : ~0 rows (environ)
INSERT INTO `categories` (`id`, `category`) VALUES
	(1, 'Salade');

-- Listage de la structure de table scoupart. contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `subject` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '0',
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.contacts : ~2 rows (environ)
INSERT INTO `contacts` (`id`, `name`, `subject`, `email`, `message`) VALUES
	(1, 'Fab', 'Test contact', 'eter@tet.com', 'Envoi d\'un message via le formulaire de contact'),
	(4, 'Fab2', 'test subject', 'eerer@erer.com', 'teste');

-- Listage de la structure de table scoupart. diets
CREATE TABLE IF NOT EXISTS `diets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diet` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.diets : ~14 rows (environ)
INSERT INTO `diets` (`id`, `diet`) VALUES
	(1, 'Paléolithique'),
	(2, 'Cétogène'),
	(3, 'Dukan'),
	(4, 'Okinawa'),
	(5, 'Méditerranéen'),
	(6, 'Sans gluten'),
	(7, 'Végétarien'),
	(8, 'Vegan'),
	(9, 'Flexitarien'),
	(10, 'Hypocalorique'),
	(11, 'Chrononutrition'),
	(12, 'Atkins'),
	(13, 'Seignalet'),
	(14, 'Dash'),
	(15, 'Acido-basique');

-- Listage de la structure de table scoupart. recipes
CREATE TABLE IF NOT EXISTS `recipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `featuredImage` varchar(200) DEFAULT 'assets/images/recipe-default.jpg',
  `description` text NOT NULL,
  `ingredients` text NOT NULL,
  `directions` text NOT NULL,
  `prepTimeInMinutes` int(3) NOT NULL DEFAULT 0,
  `restTimeInMinutes` int(3) NOT NULL DEFAULT 0,
  `cookTimeInMinutes` int(3) NOT NULL DEFAULT 0,
  `forPatient` tinyint(1) NOT NULL DEFAULT 0,
  `publishedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.recipes : ~0 rows (environ)
INSERT INTO `recipes` (`id`, `title`, `featuredImage`, `description`, `ingredients`, `directions`, `prepTimeInMinutes`, `restTimeInMinutes`, `cookTimeInMinutes`, `forPatient`, `publishedDate`) VALUES
	(1, 'Salade grecque\r\n', 'assets/images/recipe-default.jpg', 'Une salade grecque pour refroidir votre été', '2 tomates, ½ concombre, 50 g de feta, 10 olives noires dénoyautées, quelques brins de coriandre, quelques feuilles de basilic, 1 filet d’huile d’olive, sel, poivre.', '1 – Epluchez les tomates, retirez les pépins. Hachez grossièrement la chair.\r\n\r\n2 – Epluchez, retirez les pépins du concombre. Coupez la chair en petits dés.\r\n\r\n3 – Coupez les olives en fines rondelles. Coupez la feta en petits dés. Lavez, ciselez le basilic et la coriandre.\r\n\r\n4 – Dans des verres, déposez une couche de tomates, ajoutez les dés de concombre, la feta, les olives, le basilic et la coriandre. Salez, poivrez. Arrosez d’un filet d’huile d’olive. Servez frais.', 20, 0, 0, 0, '2022-08-21 11:08:09');

-- Listage de la structure de table scoupart. recipe_allergen
CREATE TABLE IF NOT EXISTS `recipe_allergen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allergenId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipes_allergen` (`recipeId`) USING BTREE,
  KEY `fk_allergens` (`allergenId`) USING BTREE,
  CONSTRAINT `fk_allergens` FOREIGN KEY (`allergenId`) REFERENCES `allergens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipes_allergen` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.recipe_allergen : ~2 rows (environ)
INSERT INTO `recipe_allergen` (`id`, `allergenId`, `recipeId`) VALUES
	(1, 7, 1),
	(2, 10, 1);

-- Listage de la structure de table scoupart. recipe_category
CREATE TABLE IF NOT EXISTS `recipe_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipes_category` (`recipeId`) USING BTREE,
  KEY `fk_categories` (`categoryId`) USING BTREE,
  CONSTRAINT `fk_categories` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipes_category` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.recipe_category : ~1 rows (environ)
INSERT INTO `recipe_category` (`id`, `categoryId`, `recipeId`) VALUES
	(1, 1, 1);

-- Listage de la structure de table scoupart. recipe_diet
CREATE TABLE IF NOT EXISTS `recipe_diet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dietId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipes_diet` (`recipeId`) USING BTREE,
  KEY `fk_diets` (`dietId`) USING BTREE,
  CONSTRAINT `fk_diets` FOREIGN KEY (`dietId`) REFERENCES `diets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipes_diet` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.recipe_diet : ~1 rows (environ)
INSERT INTO `recipe_diet` (`id`, `dietId`, `recipeId`) VALUES
	(1, 5, 1);

-- Listage de la structure de table scoupart. reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `rate` int(11) NOT NULL DEFAULT 1,
  `recipeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_review_recipe` (`recipeId`) USING BTREE,
  CONSTRAINT `fk_review_recipe` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.reviews : ~4 rows (environ)
INSERT INTO `reviews` (`id`, `name`, `comment`, `rate`, `recipeId`) VALUES
	(1, 'Fab', 'Trop bonne cette salade :) !', 5, 1),
	(2, 'Toto', 'Un peu déçu', 2, 1),
	(13, 'Test', 'Horrible !', 1, 1),
	(14, 'Milou', 'Woof!', 3, 1);

-- Listage de la structure de table scoupart. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `isPatient` tinyint(1) NOT NULL DEFAULT 1,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.users : ~1 rows (environ)
INSERT INTO `users` (`id`, `lastname`, `firstname`, `email`, `username`, `password`, `isPatient`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
	(2, 'Tata', 'Toto', 'fab6887@gmail.com', 'admin', '$2b$10$DWgVr33K37DWP7OcV6jTjOKbYiYOOGS8SyQQMtB5MTX4GopzCqQcK', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImxhc3RuYW1lIjoiVGF0YSIsImZpcnN0bmFtZSI6IlRvdG8iLCJlbWFpbCI6ImZhYjY4ODdAZ21haWwuY29tIiwiaWF0IjoxNjYyMTQ0MjYyLCJleHAiOjE2NjIyMzA2NjJ9.UtkVpst52UxNwiKtd8QKg9SnMs3kCgu3czAyOeuPOC0', '2022-08-18 19:23:13', '2022-09-02 18:44:22'),
	(7, 'Lupin', 'Arsène', 'arsene@lupin.com', 'alupin', '$2b$10$NAcH..cKrdbHCH62Xd6dM.Nx8qgMaTVOWw9czxnC/7dKwSvqzEhai', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImxhc3RuYW1lIjoiTHVwaW4iLCJmaXJzdG5hbWUiOiJBcnPDqG5lIiwiZW1haWwiOiJhcnNlbmVAbHVwaW4uY29tIiwiaWF0IjoxNjYyMzk5ODgwLCJleHAiOjE2NjI0ODYyODB9.RvdKE_ASa1MgtDvIsQ2JsxQknVSl1PL1QAqaW7vQipk', '2022-08-29 20:59:30', '2022-09-05 17:44:40');

-- Listage de la structure de table scoupart. user_allergen
CREATE TABLE IF NOT EXISTS `user_allergen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT 0,
  `allergenId` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`userId`),
  KEY `fk_allergen` (`allergenId`),
  CONSTRAINT `fk_allergen` FOREIGN KEY (`allergenId`) REFERENCES `allergens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.user_allergen : ~3 rows (environ)
INSERT INTO `user_allergen` (`id`, `userId`, `allergenId`) VALUES
	(4, 7, 1),
	(5, 7, 13),
	(6, 7, 9);

-- Listage de la structure de table scoupart. user_diet
CREATE TABLE IF NOT EXISTS `user_diet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT 0,
  `dietId` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_user_diet` (`userId`),
  KEY `fk_diet` (`dietId`),
  CONSTRAINT `fk_diet` FOREIGN KEY (`dietId`) REFERENCES `diets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_diet` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table scoupart.user_diet : ~2 rows (environ)
INSERT INTO `user_diet` (`id`, `userId`, `dietId`) VALUES
	(1, 7, 6),
	(2, 7, 5);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;