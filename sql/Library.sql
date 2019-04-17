CREATE DATABASE IF NOT EXISTS library;

USE library;

CREATE TABLE IF NOT EXISTS book(
    bno CHAR(10) NOT NULL,
    category VARCHAR(30) NOT NULL,
    title VARCHAR(40)  NOT NULL,
    press VARCHAR(30),
    year INT,
    author VARCHAR(40),
    price DECIMAL(7,2),
    total INT,
    stock INT,
    PRIMARY KEY (bno)
);

CREATE TABLE IF NOT EXISTS card(
    cno CHAR(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    department VARCHAR(30),
    type ENUM('S', 'T'),
    PRIMARY KEY (cno)
);

CREATE TABLE IF NOT EXISTS admin(
    id VARCHAR(15) NOT NULL,
    password VARCHAR(15) NOT NULL,
    name VARCHAR(20) NOT NULL,
    tel CHAR(11) NOT NULL,
    book_search BOOL NOT NULL,
    book_insert BOOL NOT NULL,
    book_remove BOOL NOT NULL,
    card_query BOOL NOT NULL,
    card_borrow BOOL NOT NULL,
    card_return BOOL NOT NULL,
    online BOOL NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS borrow(
    bno CHAR(10),
    cno CHAR(10),
    borrow_date DATETIME,
    return_date DATETIME,
    admin_id VARCHAR(15),
    PRIMARY KEY (bno, cno),
    FOREIGN KEY (bno) REFERENCES book(bno) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cno) REFERENCES card(cno) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE
);
