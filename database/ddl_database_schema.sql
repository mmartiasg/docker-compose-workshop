CREATE DATABASE `model` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE model.requests (
	model varchar(100) NOT NULL,
	param_index int NOT NULL,
	tita1 float NOT NULL,
	tita2 float NOT NULL,
	value float NOT NULL,
	results float NOT NULL,
	request_id INT UNSIGNED auto_increment NOT NULL,
	CONSTRAINT request_PK PRIMARY KEY (request_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE model.params (
	model varchar(100) NOT NULL,
	param_index int NOT NULL,
	tita1 float NOT NULL,
	tita2 float NOT NULL,
	eval_mse float NOT NULL,
	experiment_id INT UNSIGNED auto_increment NOT NULL,
	CONSTRAINT test_new_table_PK PRIMARY KEY (experiment_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
