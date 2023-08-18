CREATE DATABASE store;
USE store;

CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) UNIQUE,
    password CHAR(32),
    full_name VARCHAR(255),
    email VARCHAR(320) NOT NULL UNIQUE ,
    phone_number BIGINT(11) UNIQUE,
    role_id TINYINT(1) DEFAULT 1,
    is_active BOOL DEFAULT 0,
    reg_token VARCHAR(6),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS addresses (
    address_id integer PRIMARY KEY AUTO_INCREMENT,
    user_id integer,
    state VARCHAR(255),
    city CHAR(255),
    address TEXT(500),
    zip_code BIGINT(255) NOT NULL UNIQUE,
    house_number SMALLINT,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE    
);

CREATE TABLE IF NOT EXISTS products (
    product_id integer PRIMARY KEY AUTO_INCREMENT,
    stuck INT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price integer NOT NULL,
    weight FLOAT NOT NULL,
    disscount INT,
    disscount_time TIMESTAMP,
    brand_id INT NOT NULL,
    GPU_brand enum("intel","AMD","nVIDIA","Apple") NOT NULL,
    GPU_vRAM enum("0","512MB","1GB","2GB","4GB","8GB","12GB") NOT NULL,
    GPU_name VARCHAR(255) NOT NULL,
    storage_type enum("HDD","SSD","HYBRIDE") NOT NULL,
    storage_capacity enum("256GB","512GB","1TB","2TB") NOT NULL,
    RAM_capacity enum("4GB","8GB","16GB","32GB","64GB") NOT NULL,
    RAM_type enum("DDR3","DDR4","DDR5") NOT NULL,
    screen_size enum("13","14","16","17") NOT NULL,
    screen_type enum("TN","IPS","OLED") NOT NULL,
    CPU_id INT NOT NULL,
    category_id INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (CPU_id) REFERENCES CPU_data(CPU_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES catergories(category_id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE IF NOT EXISTS categories (
  category_id  integer PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(50) NOT NULL,
  parent_id INT NOT NULL DEFAULT 0
  );

CREATE TABLE IF NOT EXISTS brands (
    brand_id integer PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255),
    logo_link VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS CPU_data (
    CPU_id integer PRIMARY KEY AUTO_INCREMENT,
    CPU_brand enum("intel","AMD","Apple") NOT NULL,
    CPU_serie enum("Core i9","Core i7","Core i5","Core i3","Ryzen 9","Ryzen 7","Ryzen 5","Ryzen 3","M1","M2") NOT NULL,
    CPU_gen VARCHAR(255) UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_pictures (
    pic_id integer PRIMARY KEY AUTO_INCREMENT,
    product_id integer NOT NULL,
    is_default BOOL DEFAULT 0 ,
    pic_URL VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);



/* insert  into `categories`(`category_id`,`category_name`,`category_link`,`parent_id`,`sort_order`) values 
(1,'Home','',0,0),
(2,'Tutorials','#',0,1),
(3,'Java','java',2,1),
(4,'Liferay','liferay',2,1),
(5,'Frameworks','#',0,2),
(6,'JSF','jsf',5,2),
(7,'Struts','struts',5,2),
(8,'Spring','spring',5,2),
(9,'Hibernate','hibernate',5,2),
(10,'Webservices','#',0,3),
(11,'REST','rest',10,3),
(12,'SOAP','soap',10,3),
(13,'Contact','contact',0,4),
(14,'About','about',0,5);


SELECT
  `category_id`,
  `category_name`,
  `category_link`,
  `parent_id`,
  `sort_order`
FROM `categories`
ORDER BY parent_id, sort_order, category_name; */