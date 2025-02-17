-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: test_edii
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `biodata`
--

DROP TABLE IF EXISTS `biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biodata` (
  `id` varchar(50) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `no_ktp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `posisi_lamaran` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tempat_lahir` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `agama` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gol_darah` varchar(5) DEFAULT NULL,
  `status_perkawinan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `alamat_ktp` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `alamat_sekarang` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `no_telp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `orang_terdekat` text,
  `skill` text,
  `ketersediaan_penempatan` enum('YA','TIDAK') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `expected_salary` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `biodata_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biodata`
--

LOCK TABLES `biodata` WRITE;
/*!40000 ALTER TABLE `biodata` DISABLE KEYS */;
INSERT INTO `biodata` VALUES ('1b97a300-0858-4a99-b4d3-b5bbd87955db','49e4f61b-b499-48c9-9eea-2c2cf510fd9c','3603123412341234','Frontend Developer','Jakarta','1998-05-10','Laki-laki','Islam','AB','Lajang','Telaga Bestari, Kab Tangerang','Rawamangun, Jakarta Timur','081212341234','Ghina Nabilah (Teman)','HTML, CSS, Javascript','TIDAK',9000000);
/*!40000 ALTER TABLE `biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pekerjaan`
--

DROP TABLE IF EXISTS `riwayat_pekerjaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pekerjaan` (
  `id` varchar(50) NOT NULL,
  `id_biodata` varchar(50) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `salary` int NOT NULL,
  `tahun` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_biodata` (`id_biodata`),
  CONSTRAINT `riwayat_pekerjaan_ibfk_1` FOREIGN KEY (`id_biodata`) REFERENCES `biodata` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pekerjaan`
--

LOCK TABLES `riwayat_pekerjaan` WRITE;
/*!40000 ALTER TABLE `riwayat_pekerjaan` DISABLE KEYS */;
INSERT INTO `riwayat_pekerjaan` VALUES ('a3205b60-e246-40fa-8948-757df5162cef','1b97a300-0858-4a99-b4d3-b5bbd87955db','PT Electronic Data Interchange Indonesia','Programmer',8000000,'Nov 2023 - Des 2024');
/*!40000 ALTER TABLE `riwayat_pekerjaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pelatihan`
--

DROP TABLE IF EXISTS `riwayat_pelatihan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pelatihan` (
  `id` varchar(50) NOT NULL,
  `id_biodata` varchar(50) NOT NULL,
  `jenis_pelatihan` varchar(100) NOT NULL,
  `sertifikat` enum('ada','tidak') NOT NULL,
  `tahun` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_biodata` (`id_biodata`),
  CONSTRAINT `riwayat_pelatihan_ibfk_1` FOREIGN KEY (`id_biodata`) REFERENCES `biodata` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pelatihan`
--

LOCK TABLES `riwayat_pelatihan` WRITE;
/*!40000 ALTER TABLE `riwayat_pelatihan` DISABLE KEYS */;
INSERT INTO `riwayat_pelatihan` VALUES ('659281bc-c718-46b9-872d-efcfd4128754','1b97a300-0858-4a99-b4d3-b5bbd87955db','Full Stack Developer','ada','2022');
/*!40000 ALTER TABLE `riwayat_pelatihan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pendidikan`
--

DROP TABLE IF EXISTS `riwayat_pendidikan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pendidikan` (
  `id` varchar(50) NOT NULL,
  `id_biodata` varchar(50) NOT NULL,
  `jenjang_pendidikan` varchar(20) NOT NULL,
  `jurusan` varchar(30) DEFAULT NULL,
  `tahun_lulus` varchar(20) NOT NULL,
  `ipk` varchar(4) DEFAULT NULL,
  `instansi` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_biodata` (`id_biodata`),
  CONSTRAINT `riwayat_pendidikan_ibfk_1` FOREIGN KEY (`id_biodata`) REFERENCES `biodata` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pendidikan`
--

LOCK TABLES `riwayat_pendidikan` WRITE;
/*!40000 ALTER TABLE `riwayat_pendidikan` DISABLE KEYS */;
INSERT INTO `riwayat_pendidikan` VALUES ('7561e024-d7af-4c9f-af21-a33d7b1c70e6','1b97a300-0858-4a99-b4d3-b5bbd87955db','SMA','IPA','2016','80.6','SMA 19 Tangerang'),('9c6af13f-a1e8-4532-8c97-e4b7b8108fb3','1b97a300-0858-4a99-b4d3-b5bbd87955db','Sarjana','Teknik Informatika','2023','3,53','Universitas Pamulang');
/*!40000 ALTER TABLE `riwayat_pendidikan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1732d221-9cfe-40be-a511-28dd0d3148d6','admin@test.com','$2b$10$flWBKqoIMmfQx5ICYq1zBuAHsCTqS/sCK1Y8WSseooFESlZAyM2x.','admin','admin'),('49e4f61b-b499-48c9-9eea-2c2cf510fd9c','hadis@test.com','$2b$10$YhGSWDqey4rCnSyRDlvHDuF2XKAsHEaiKUDtQgdDsR9PX8kRxKY0O','Hadis','user'),('a0cec599-c93f-4c91-b673-eaaf113fd163','ucup@mail.com','$2b$10$tvp.j407b0j0pTDZypbfoenuJ/QC8WuhN1/VnjFKkUd32PJ2xpsna','Ucup','user'),('b3896a8e-2ba3-47a7-b115-c39560d799b5','test1@test.com','$2b$10$2VBFjnZ095Hf.Iy0ZCLBme.FhUVSD4KcnPowD0j3QJeCJe6IAuK9K','test 1','user'),('be8852cb-e287-45ca-98de-8fdac8503dd0','test@test.com','$2b$10$DZ4S/7YWrIkpteXgdkgDiuFb2da/z5IxV4FEug6GhRLHEyNmAfhJG','test update','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test_edii'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-17 10:56:59
