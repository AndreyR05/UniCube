CREATE DATABASE unicube;

USE unicube;

CREATE TABLE Cuber(
	idCuber INT PRIMARY KEY AUTO_INCREMENT,
    nameCuber VARCHAR(50),
    passwordCuber VARCHAR(50),
    imageUrl VARCHAR(100)
);

CREATE TABLE Publication(
	idPublication INT PRIMARY KEY AUTO_INCREMENT,
    titlePublication VARCHAR(50),
    contentPublication VARCHAR(1000),
    imageUrl VARCHAR(50),
    datePublication DATE,
    fkCuber INT,
    FOREIGN KEY (fkCuber) REFERENCES Cuber(idCuber)
);

CREATE TABLE Likes(
	fkCuber INT,
    fkPublication INT,
    likeDate DATE,
	FOREIGN KEY (fkCuber) REFERENCES Cuber(idCuber),
	FOREIGN KEY (fkPublication) REFERENCES Publication(idPublication),
	PRIMARY KEY(fkCuber, fkPublication)
);

CREATE TABLE Followers(
	fkCuber INT,
    fkFollower INT,
    followDate DATE,
    FOREIGN KEY (fkCuber) REFERENCES Cuber(idCuber),
	FOREIGN KEY (fkFollower) REFERENCES Cuber(idCuber),
    PRIMARY KEY (fkCuber, fkFollower)
);

CREATE TABLE CubeCollection(
	idCube INT,
    nameCube VARCHAR(50),
    rarity VARCHAR(20) CHECK (rarity in('Comum','Pouco Comum','Raro','Muito Raro')),
	fkCuber INT,
    FOREIGN KEY (fkCuber) REFERENCES Cuber(idCuber),
	PRIMARY KEY(idCube, fkCuber)
);