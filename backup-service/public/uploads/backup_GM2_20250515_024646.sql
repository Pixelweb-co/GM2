/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: db    Database: GM2
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `direccion_cliente` varchar(255) DEFAULT NULL,
  `contacto_cliente` varchar(255) DEFAULT NULL,
  `date_added` date DEFAULT NULL,
  `email_cliente` varchar(255) DEFAULT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `identificacion_cliente` varchar(255) DEFAULT NULL,
  `telefono_cliente` varchar(255) DEFAULT NULL,
  `cargo_cliente` varchar(255) DEFAULT NULL,
  `status_cliente` bit(1) DEFAULT NULL,
  `tipo_entidad` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES
(1,'cra 40 N 88 - 110','sdsd','2025-04-28','egbmaster2007@gmail.com','Edwin guevara','54545454','3235796356','Napse Global','\0','1');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratacion`
--

DROP TABLE IF EXISTS `contratacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) NOT NULL,
  `fecha_final` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKlsw6avg3inhwshfbynenwqp47` (`customer_id`),
  CONSTRAINT `FKc13g7k7ug6g8b8q2l1q55cmwy` FOREIGN KEY (`customer_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratacion`
--

LOCK TABLES `contratacion` WRITE;
/*!40000 ALTER TABLE `contratacion` DISABLE KEYS */;
INSERT INTO `contratacion` VALUES
(1,'','1','2000-01-01','2000-01-01',NULL,1);
/*!40000 ALTER TABLE `contratacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `det_solicitud`
--

DROP TABLE IF EXISTS `det_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `det_solicitud` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(120) DEFAULT NULL,
  `dife` varchar(14) DEFAULT NULL,
  `estado_equipo` int DEFAULT NULL,
  `firma` varchar(80) DEFAULT NULL,
  `hora_fin` varchar(14) DEFAULT NULL,
  `hora_ini` varchar(14) DEFAULT NULL,
  `obser` text,
  `recibe` varchar(120) DEFAULT NULL,
  `repuesto` text,
  `id_solicitud` bigint DEFAULT NULL,
  `trabajo_rea` text,
  `ubicacion` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `det_solicitud`
--

LOCK TABLES `det_solicitud` WRITE;
/*!40000 ALTER TABLE `det_solicitud` DISABLE KEYS */;
INSERT INTO `det_solicitud` VALUES
(1,'ETH/USDT Classic trading',NULL,2,NULL,NULL,NULL,'ok',NULL,NULL,1,'ok',NULL),
(2,'medellin',NULL,2,NULL,NULL,NULL,'hjhjh',NULL,NULL,2,'ok',NULL);
/*!40000 ALTER TABLE `det_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(10) DEFAULT NULL,
  `enabled` int DEFAULT NULL,
  `equipment` bigint DEFAULT NULL,
  `hour` varchar(10) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `report` bit(1) DEFAULT NULL,
  `tag` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES
(1,'04-28-25',1,1,'19:21:14','39726_permisoespanol.pdf','\0','ll');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_solicitud`
--

DROP TABLE IF EXISTS `estado_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_solicitud` (
  `id_estado_sol` bigint NOT NULL AUTO_INCREMENT,
  `desc_estado_sol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_estado_sol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_solicitud`
--

LOCK TABLES `estado_solicitud` WRITE;
/*!40000 ALTER TABLE `estado_solicitud` DISABLE KEYS */;
INSERT INTO `estado_solicitud` VALUES
(1,'ABIERTA'),
(2,'EN PROCESO'),
(3,'FINALIZADA');
/*!40000 ALTER TABLE `estado_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firma_soporte`
--

DROP TABLE IF EXISTS `firma_soporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `firma_soporte` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firma` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK87r9rsvb6nc7m9xcwftkd1cub` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firma_soporte`
--

LOCK TABLES `firma_soporte` WRITE;
/*!40000 ALTER TABLE `firma_soporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `firma_soporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firmas`
--

DROP TABLE IF EXISTS `firmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `firmas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firma` varchar(255) DEFAULT NULL,
  `id_solicitud` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmn2yslqcna5m8b1f33dudpb4v` (`id_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firmas`
--

LOCK TABLES `firmas` WRITE;
/*!40000 ALTER TABLE `firmas` DISABLE KEYS */;
INSERT INTO `firmas` VALUES
(1,'sign-1745886035.png',1),
(3,'cloudflare.png',2);
/*!40000 ALTER TABLE `firmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(10) DEFAULT NULL,
  `equipment` bigint DEFAULT NULL,
  `hour` varchar(10) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES
(1,'04-28-25',1,'19:12:12','477150899_122159611070356691_3082026622835024076_n.jpg'),
(2,'05-12-25',2,'20:29:54','477150899_122159611070356691_3082026622835024076_n.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpnvtwliis6p05pn6i3ndjrqt2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES
(3,'CREATE'),
(4,'DELETE'),
(1,'READ'),
(2,'UPDATE');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantillas`
--

DROP TABLE IF EXISTS `plantillas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantillas` (
  `id_plantilla` bigint NOT NULL AUTO_INCREMENT,
  `alias` varchar(12) DEFAULT NULL,
  `date_time` datetime(6) DEFAULT NULL,
  `marca` varchar(80) DEFAULT NULL,
  `modelo` varchar(80) DEFAULT NULL,
  `nom` varchar(120) DEFAULT NULL,
  `tipo` bigint DEFAULT NULL,
  `tipo_element` bigint DEFAULT NULL,
  `valor` int DEFAULT NULL,
  PRIMARY KEY (`id_plantilla`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantillas`
--

LOCK TABLES `plantillas` WRITE;
/*!40000 ALTER TABLE `plantillas` DISABLE KEYS */;
INSERT INTO `plantillas` VALUES
(1,NULL,'2025-04-28 19:13:04.271790','nuevo','2323','calibracion',NULL,1,NULL),
(2,NULL,'2025-04-28 19:13:04.278743','nuevo','2323','medidas',NULL,1,NULL);
/*!40000 ALTER TABLE `plantillas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_contrato`
--

DROP TABLE IF EXISTS `productos_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_contrato` (
  `id_contrato` bigint NOT NULL,
  `id_producto` bigint NOT NULL,
  PRIMARY KEY (`id_contrato`,`id_producto`),
  KEY `FK12l2ktotgy5kytff4xaoqdih6` (`id_producto`),
  CONSTRAINT `FK12l2ktotgy5kytff4xaoqdih6` FOREIGN KEY (`id_producto`) REFERENCES `products` (`id_producto`),
  CONSTRAINT `FKir1bn7dfuafa5ek8q1ny3eave` FOREIGN KEY (`id_contrato`) REFERENCES `contratacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_contrato`
--

LOCK TABLES `productos_contrato` WRITE;
/*!40000 ALTER TABLE `productos_contrato` DISABLE KEYS */;
INSERT INTO `productos_contrato` VALUES
(1,1),
(1,2);
/*!40000 ALTER TABLE `productos_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_producto` bigint NOT NULL AUTO_INCREMENT,
  `amperios_producto` varchar(255) DEFAULT NULL,
  `valor_contable_producto` int DEFAULT NULL,
  `marca_producto` varchar(255) DEFAULT NULL,
  `clasificacion_producto` varchar(255) DEFAULT NULL,
  `cliente_producto` bigint DEFAULT NULL,
  `date_added` date DEFAULT NULL,
  `frecuencia_producto` varchar(255) DEFAULT NULL,
  `reginv_producto` varchar(255) DEFAULT NULL,
  `placa_producto` varchar(255) DEFAULT NULL,
  `sede_producto` varchar(255) DEFAULT NULL,
  `manual_producto` varchar(255) DEFAULT NULL,
  `modelo_producto` varchar(255) DEFAULT NULL,
  `procedencia_producto` varchar(255) DEFAULT NULL,
  `periocidad` varchar(255) DEFAULT NULL,
  `ubicacion_producto` varchar(255) DEFAULT NULL,
  `potencia_producto` varchar(255) DEFAULT NULL,
  `clase_producto` varchar(255) DEFAULT NULL,
  `codigo_producto` varchar(255) DEFAULT NULL,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `tipo_producto` bigint DEFAULT NULL,
  `fecha_compra_producto` date DEFAULT NULL,
  `status_producto` varchar(255) DEFAULT NULL,
  `proveedor_producto` varchar(255) DEFAULT NULL,
  `verification` bit(1) DEFAULT NULL,
  `voltaje_producto` varchar(255) DEFAULT NULL,
  `garantia_producto` varchar(255) DEFAULT NULL,
  `fin_garantia_producto` date DEFAULT NULL,
  `inicio_garantia_producto` date DEFAULT NULL,
  `id_contrato` bigint DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `UKaox0mf8fyerjsh7u4evl70r5e` (`image_id`),
  KEY `FKjuchgcd2q59f76ey7kw71vxsv` (`id_contrato`),
  CONSTRAINT `FKjuchgcd2q59f76ey7kw71vxsv` FOREIGN KEY (`id_contrato`) REFERENCES `contratacion` (`id`),
  CONSTRAINT `FKn18ti2byyc5pbjr9cpjj7qkl9` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'10',35000,'nuevo','1',1,'2025-04-28','10','34','csd3','334','10','2323','34','4','34','10',NULL,'asas','sd',1,'2025-03-30','2','sas',NULL,'10 ','asas','2025-04-23','2025-04-08',NULL,1),
(2,'434',3455,'sdsd','1',1,'2025-05-12','34','SD','sd','sds','34','ssds','SD','4','SD','23',NULL,'jhjh','sd 2',1,'2025-05-12','2','DSD',NULL,'23','SDSD','2025-05-12','2025-05-12',NULL,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` bigint NOT NULL,
  `permission_id` bigint NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FKegdk29eiy7mdtefy5c7eirr6e` (`permission_id`),
  CONSTRAINT `FKegdk29eiy7mdtefy5c7eirr6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `FKn5fotdgk8d1xvo8nav9uv3muc` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES
(1,1),
(1,2),
(2,2),
(1,3);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` enum('ADMIN','BIOMEDICAL','SUPERADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'ADMIN'),
(2,'BIOMEDICAL'),
(3,'SUPERADMIN'),
(4,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `device` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjp0wspfxgf05wl8d9apxqk5je` (`device`),
  CONSTRAINT `FKjp0wspfxgf05wl8d9apxqk5je` FOREIGN KEY (`device`) REFERENCES `products` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES
(1,'2025-05-12','ACTIVE',1),
(2,'2025-08-30','ACTIVE',1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `id_solicitud` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(10) DEFAULT NULL,
  `fecha` varchar(12) DEFAULT NULL,
  `hora` varchar(10) DEFAULT NULL,
  `id_tipo_servicio` bigint DEFAULT NULL,
  `id_entidad` bigint DEFAULT NULL,
  `id_equipo` bigint DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `id_usuario_asignado` bigint DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`),
  KEY `FKj36wmwwvn1q7afw32w8h1ki9y` (`id_entidad`),
  KEY `FK2605s4aqy5my2xg04o7doiimt` (`id_equipo`),
  KEY `FK8nipry5iud2vhmbfc9x3ll052` (`status`),
  KEY `FKwqbd8020mv7uvagk6erk2t0f` (`id_tipo_servicio`),
  KEY `FKqg1rynd7e8xabyj1r82w8042k` (`id_usuario_asignado`),
  CONSTRAINT `FK2605s4aqy5my2xg04o7doiimt` FOREIGN KEY (`id_equipo`) REFERENCES `products` (`id_producto`),
  CONSTRAINT `FK8nipry5iud2vhmbfc9x3ll052` FOREIGN KEY (`status`) REFERENCES `estado_solicitud` (`id_estado_sol`),
  CONSTRAINT `FKj36wmwwvn1q7afw32w8h1ki9y` FOREIGN KEY (`id_entidad`) REFERENCES `clientes` (`id`),
  CONSTRAINT `FKqg1rynd7e8xabyj1r82w8042k` FOREIGN KEY (`id_usuario_asignado`) REFERENCES `users` (`id`),
  CONSTRAINT `FKwqbd8020mv7uvagk6erk2t0f` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `tipo_servicio` (`id_tipo_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES
(1,'jhhjhjh','2025-03-30',NULL,1,1,1,3,1),
(2,'fdfd','2025-05-12',NULL,1,1,2,3,1);
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_checkeo`
--

DROP TABLE IF EXISTS `tb_checkeo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_checkeo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_time` varchar(30) DEFAULT NULL,
  `id_orden` bigint DEFAULT NULL,
  `id_plantilla` varchar(90) DEFAULT NULL,
  `nombre` varchar(140) DEFAULT NULL,
  `valor` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_checkeo`
--

LOCK TABLES `tb_checkeo` WRITE;
/*!40000 ALTER TABLE `tb_checkeo` DISABLE KEYS */;
INSERT INTO `tb_checkeo` VALUES
(1,'2025-04-28 | 19:18:55',1,NULL,'calibracion','SI'),
(2,'2025-04-28 | 19:18:55',1,NULL,'medidas','SI');
/*!40000 ALTER TABLE `tb_checkeo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_verification`
--

DROP TABLE IF EXISTS `tb_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_verification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `equipment` varchar(255) DEFAULT NULL,
  `id_plantilla` varchar(255) DEFAULT NULL,
  `id_grupo` varchar(255) DEFAULT NULL,
  `option_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_verification`
--

LOCK TABLES `tb_verification` WRITE;
/*!40000 ALTER TABLE `tb_verification` DISABLE KEYS */;
INSERT INTO `tb_verification` VALUES
(1,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','l'),
(2,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','lk'),
(3,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','lkl'),
(4,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','lklk'),
(5,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','j'),
(6,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','jh'),
(7,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','jhj'),
(8,'fac1ebce-363b-4718-9634-b34414f2f700','1','1745885618023','1745885629303','jhjh');
/*!40000 ALTER TABLE `tb_verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_servicio`
--

DROP TABLE IF EXISTS `tipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_servicio` (
  `id_tipo_servicio` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `desc_tipo_servicio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_servicio`
--

LOCK TABLES `tipo_servicio` WRITE;
/*!40000 ALTER TABLE `tipo_servicio` DISABLE KEYS */;
INSERT INTO `tipo_servicio` VALUES
(1,'#fda0a0','MANTENIMIENTO CORRECTIVO X SERVICIO.'),
(2,'#99ceff','MANTENIMIENTO PREVENTIVO'),
(3,'#ffe294','VISITA DE DIAGNOSTICO-');
/*!40000 ALTER TABLE `tipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_device`
--

DROP TABLE IF EXISTS `type_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_device` (
  `id_type_device` bigint NOT NULL AUTO_INCREMENT,
  `id_plantilla` varchar(255) DEFAULT NULL,
  `type_device` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_type_device`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_device`
--

LOCK TABLES `type_device` WRITE;
/*!40000 ALTER TABLE `type_device` DISABLE KEYS */;
INSERT INTO `type_device` VALUES
(1,'1','MONITOR SIGNOS VITALES');
/*!40000 ALTER TABLE `type_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES
(1,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_no_expired` bit(1) NOT NULL,
  `account_no_locked` bit(1) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `credential_no_expired` bit(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_enabled` bit(1) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `recovery_token` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  KEY `FK6b1ydjntxbmh776nuicomfyso` (`customer_id`),
  CONSTRAINT `FK6b1ydjntxbmh776nuicomfyso` FOREIGN KEY (`customer_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'\0','','guevara','','egbmaster2007@gmail.com','','Edwin','$2a$10$Wjq.H8RDG4/fmN.KIKaOpuKSEse/kWOrNRZhYkDmAgJT/DR7.F7jq',NULL,'ingenieria','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_templates`
--

DROP TABLE IF EXISTS `verification_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_templates` (
  `id_plantilla` bigint NOT NULL AUTO_INCREMENT,
  `equimentlist` text,
  `plantilla_verificacion` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `template_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_plantilla`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_templates`
--

LOCK TABLES `verification_templates` WRITE;
/*!40000 ALTER TABLE `verification_templates` DISABLE KEYS */;
INSERT INTO `verification_templates` VALUES
(1,'[{\"id\":\"fac1ebce-363b-4718-9634-b34414f2f700\",\"equipment\":{\"nom\":\"ed\",\"serialNumber\":\"medellin\",\"brand\":\"sala\",\"model\":\"2323\"},\"groupsData\":[{\"id\":1745885618023,\"name\":\"uno\",\"options\":[{\"id\":1745885629303,\"name\":\"dos\"}]}]}]',NULL,NULL,'pl1');
/*!40000 ALTER TABLE `verification_templates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-15  2:46:46
