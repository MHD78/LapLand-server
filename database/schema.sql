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

CREATE TABLE IF NOT EXISTS reg_token (
    token_id integer PRIMARY KEY AUTO_INCREMENT,
    user_id integer,
    token VARCHAR(6),
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
);
