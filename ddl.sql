CREATE TABLE clients(
	document INT PRIMARY KEY CHECK(document >= 1),
	name VARCHAR(70) NOT NULL,
	address VARCHAR(125) NOT NULL,
	phone_number VARCHAR(45) NOT NULL,
	email VARCHAR(125) UNIQUE NOT NULL
);

CREATE TABLE bills(
	id CHAR(7) PRIMARY KEY,
	period ENUM('2024-06','2024-07') NOT NULL,
	total_amount INT CHECK(total_amount >= 0) NOT NULL,
	paid_amount INT CHECK(paid_amount >= 0) NOT NULL,
	id_client INT,
	FOREIGN KEY (id_client)
	REFERENCES clients(document)
	 	ON DELETE CASCADE
	 	ON UPDATE CASCADE
);


CREATE TABLE transactions(
	id CHAR(6) PRIMARY KEY,
	general_date DATETIME NOT NULL,
	amount_sent INT NOT NULL,
	state ENUM('Pendiente','Fallida','Completada') NOT NULL,
	kind ENUM('Pago de Factura') NOT NULL,
	platform ENUM('Nequi','Daviplata') NOT NULL,
	id_bill CHAR(7),
	FOREIGN KEY (id_bill)
	REFERENCES bills(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE

);

CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(75) NOT NULL,
	email VARCHAR(125) UNIQUE NOT NULL,
	password VARCHAR(60) NOT NULL
);


INSERT INTO users(name,email,password) VALUES('Johan','johan@gmail.com','password');