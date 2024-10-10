CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `VacationID_idx` (`vacationId`),
  CONSTRAINT `fk_likes_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserID` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (7,2),(8,2),(18,2),(25,2),(19,3),(20,3),(23,3),(8,4),(20,4),(24,4),(25,4),(4,5),(18,5),(23,5),(24,5),(25,5),(20,7),(24,7),(28,7),(7,8),(14,8),(19,8),(22,8),(23,8),(29,8),(31,8),(7,9),(9,9),(14,9),(19,9),(22,9),(23,9),(28,9),(29,9),(30,9),(31,9),(8,11),(19,11),(24,11),(28,11),(4,12),(7,12),(8,12),(9,12),(8,25),(9,25),(24,25),(25,25),(4,28),(7,28),(4,29),(19,29),(20,29),(23,29),(24,29),(25,29),(16,36),(19,36),(20,36),(23,36),(25,36),(28,36),(22,47),(23,47),(29,47),(30,47),(22,48),(29,48),(22,49),(23,49),(29,49),(31,49),(20,50),(21,50),(22,50),(25,50),(26,50),(27,50),(28,50),(29,50),(30,50),(22,51),(29,51),(31,51),(22,52),(26,52),(27,52),(29,52),(30,52),(20,53),(22,53),(25,53),(26,53),(27,53),(28,53),(30,53);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserRole_idx` (`roleId`),
  CONSTRAINT `UserRole` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Ollie','Davenport','meetollie@gmail.com','8705d822002891c347545a71e0792214eea437058cdf31a1bb4fcfea936910d23615b33b77d70fa8232b676d027ac093cee24d0048be9c5498638e369226f7b3',1),(4,'Tal','Argaman','tal.argamanbib@gmail.com','db519c9da7da0e03affcfcfdd5e4ee46687b3b5baaec1e0f58249d5fa8400d61e4ea35fba1f9e683f83b44085de23ec29dcbd9439b796ed32dd38ff631d326b0',2),(6,'kipi','aharoni','itay.aharoni@gmail.com','b569629f8e2b8219ef510be1acf58e5dd8dfa5eb27c70190e375886ec78e40b44309ca2ddc320361738f77301a8d9a2e497c9af1b33f33abfd24347b95f5cdc6',2),(7,'Yaron','Saghiv','yaron.s@uveye.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(8,'Miky','Levi','miky@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(9,'Kipi','Kip','kipi@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(10,'Teva','Teva','teva@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(11,'Toulouse','Adjiman','Toulouse@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(12,'pini','bALILI','pini@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(13,'Lullu','lulu','lulu@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(14,'Hadar','Hadar','Hadar@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(15,'Gabi','Gabi','gabi@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(16,'Gabriel','Gabriel','Gabriel@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(17,'Yoffi','Toffi','Yoffi@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(18,'Buti','Buti','buti@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(19,'ruti','ruti','ruti@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(20,'Pini','Pini','Pini.b@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(21,'Rona','Lofair','Rona.l@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(22,'Rivi','Rivi','Rivi@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(23,'yuval','vuval','yuval@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(24,'Roe','Aharoni','roe@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(25,'Rotem','Pinto','rotem.p@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(26,'marcos','pinto','Marcos@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(27,'lol','LOL','lol@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(28,'Toulouse','Toulouse','toulouse6@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(29,'Amal','Aqawi','Amal@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(30,'Yarin','Yarin','Yarin@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2),(31,'sima','vaknin','sima@gmail.com','1cbc36be51bf253f926716dda2dc0ba8509ab4d11d4f9bebf622969ace4bcc5efc1beb1ba4d9fd60727a7ed694bc6cf6482ba19eaa9f7174bc2edd0c4ff7e945',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Paris','Indulge in Parisian allure with exquisite art, culinary delights, and the Eiffel Tower\'s timeless grace on a romantic getaway.','2024-03-29','2024-04-10',800.0000,'b4b1827c-dd2f-4f1a-ac9e-3e3a411ced64.PNG'),(3,'London','Immerse in London\'s rich history, royal elegance, and cosmopolitan energy, discovering iconic landmarks and diverse cultural treasures.','2024-03-21','2024-03-31',790.0000,'670b506a-dd7e-4f8e-923b-a8701d07bf5e.png'),(4,'New York','Dive into the vibrant energy of NYC, where skyscrapers, Broadway lights, and Central Park beckon for an unforgettable urban adventure.','2024-03-25','2024-03-29',990.0000,'cb29203b-8dd4-4b60-9c96-6a37ba5f6f0e.PNG'),(5,'Ko Phangan','Escape to Thailand\'s tropical paradise, where golden beaches, lush jungles, and vibrant markets invite you to embrace exotic beauty and serenity.','2024-03-06','2024-03-19',980.0000,'e72c84cc-44dd-43b7-9d5f-5e9e2e7dd1c1.PNG'),(7,'Miami','Savor the sun-soaked vibes of Miami\'s glamorous beaches, vibrant nightlife, and eclectic culture for an unforgettable tropical escape.\"','2024-03-29','2024-04-06',900.0000,'4ad9332d-9b47-4549-9d53-3983d9641e71.jpeg'),(8,'Hong Kong','Discover the dynamic blend of tradition and modernity in Hong Kong, where skyscrapers, vibrant markets, and rich history create an unforgettable urban experience.','2024-05-08','2024-05-24',950.0000,'1a4da2fb-05cc-49ee-ab17-afbf197c5dd9.jpeg'),(9,'Athens','Immerse yourself in the timeless beauty of Greece, with its ancient ruins, turquoise waters, and charming villages—a Mediterranean paradise awaits.','2024-06-03','2024-06-17',460.0000,'9368e36f-b4b3-4a1c-b5e6-24000eca82d9.jpeg'),(11,'Rome','Embark on a historical voyage through Rome\'s ancient wonders, where the Colosseum, Vatican City, and timeless architecture captivate at every turn.','2024-03-21','2024-03-26',480.0000,'c09ad117-a106-4483-a6e3-61ea46b4cad7.jpeg'),(12,'Lisbon','Experience the soulful charm of Lisbon, where cobbled streets, historic districts, and riverside views create a captivating blend of tradition and modernity.','2024-04-23','2024-04-27',440.0000,'75630f99-853d-44ce-874d-313eec17cbc1.jpg'),(25,'Berlin','Explore landmarks like the Brandenburg Gate and East Side Gallery. Embrace diverse neighborhoods, art scenes, and culinary delights.','2024-03-21','2024-03-30',430.0000,'88393641-d03b-4c87-a005-77f2e2dafece.PNG'),(28,'Petra',' Unearth the wonders of Petra, a UNESCO site nestled within crimson cliffs. Delve into its ancient secrets amidst stunning landscapes.','2024-04-17','2024-04-26',570.0000,'0045b773-2fe3-44d5-a0fd-5aa943da5b3a.jpeg'),(29,'Tel Aviv (ISL)','Embrace the vibrant energy of Tel Aviv, where modernity meets Mediterranean charm.','2024-03-17','2024-03-22',420.0000,'a5603aea-52a9-47d4-9696-1e4a5d5f2b94.jpeg'),(36,'Amsterdam',' Explore Amsterdam\'s historic canals, vibrant culture, and iconic landmarks on a dreamy vacation filled with art, bicycles, and Dutch charm.','2024-03-19','2024-03-28',1200.0000,'d218b6f8-88a7-4ac9-bfd3-365e80ff0ca6.png'),(47,'Kenya','From the thrilling Maasai Mara wildlife safaris to the pristine beaches of Mombasa. Embrace adventure and local culture in a journey filled with unforgettable experiences.','2024-05-10','2024-05-28',3200.0000,'a0911278-5787-4332-8abe-7d6ec0abf974.jpeg'),(48,'Jerusalem','Immerse yourself in the rich history of Jerusalem. Wander ancient streets, explore significant religious sites, and experience a mosaic of cultures and traditions.','2024-05-03','2024-05-09',760.0000,'105cb8c6-578b-4603-a593-e3f7a4294622.jpeg'),(49,'Ko Samui','Thailand\'s island paradise. Enjoy crystal-clear waters, vibrant nightlife, and lush tropical landscapes. Perfect for those seeking both serenity and adventure.','2024-05-11','2024-06-21',8700.0000,'82b268b5-f80e-4867-a1e8-15bf6cf44687.png'),(50,'Seoul','The vibrant blend of ancient traditions and cutting-edge technology. Experience its bustling markets, serene palaces, and dynamic cultural scene. Seoul offers an exciting and unique urban adventure.','2024-05-01','2024-05-11',985.0000,'5c1fc902-ddd5-4990-86f1-62006d754d69.jpeg'),(51,'Barcelona','Experience the vibrant culture of Barcelona, where historic architecture meets contemporary life. Stroll through lively streets, savor Catalan cuisine, and explore iconic landmarks.','2024-05-03','2024-05-21',670.0000,'f60bfd34-814e-41b4-83ae-81541c058df5.png'),(52,'Sydney','Explore Sydney, a bustling city known for its stunning harbor, iconic Opera House, and vibrant arts scene. Enjoy beautiful beaches, delicious cuisine, and a warm, welcoming atmosphere.','2024-05-01','2024-05-20',2300.0000,'d94231ac-12ef-4b99-863f-f8bc944d5266.jpeg'),(53,'Shanghai','Discover Shanghai, a dazzling blend of historic charm and futuristic skyline. Wander the Bund, explore ancient gardens, and enjoy cutting-edge art and culinary scenes in China\'s most dynamic city.','2024-04-30','2024-05-19',1890.0000,'c6cd4e2f-4a21-493c-a778-afb8a615a8e2.png');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 15:47:30
