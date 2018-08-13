--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      unt
-- Project :      Trabajos Finales.DM1
-- Author :       estudiante
--
-- Date Created : Tuesday, July 03, 2018 09:02:01
-- Target DBMS : MySQL 5.x
--

-- 
-- DATABASE: TrabajosGraduacion
--

CREATE SCHEMA IF NOT EXISTS TrabajosGraduacion;

USE TrabajosGraduacion;

-- 
-- TABLE: Alumnos 
--

CREATE TABLE Alumnos(
    dni    INT        NOT NULL,
    cx     CHAR(7)    NOT NULL,
    PRIMARY KEY (dni)
)ENGINE=INNODB
;



-- 
-- TABLE: AlumnosEnTrabajos 
--

CREATE TABLE AlumnosEnTrabajos(
    idTrabajo    INT             NOT NULL,
    dni          INT             NOT NULL,
    desde        DATE            NOT NULL,
    hasta        DATE,
    razon        VARCHAR(100),
    PRIMARY KEY (idTrabajo, dni)
)ENGINE=INNODB
;



-- 
-- TABLE: Areas 
--

CREATE TABLE Areas(
    idArea    INT            NOT NULL,
    nombre    VARCHAR(10)    NOT NULL,
    PRIMARY KEY (idArea)
)ENGINE=INNODB
;



-- 
-- TABLE: AreasDeTrabajos 
--

CREATE TABLE AreasDeTrabajos(
    idArea       INT    NOT NULL,
    idTrabajo    INT    NOT NULL,
    PRIMARY KEY (idArea, idTrabajo)
)ENGINE=INNODB
;



-- 
-- TABLE: Cargos 
--

CREATE TABLE Cargos(
    idCargo    INT            NOT NULL,
    cargo      VARCHAR(20)    NOT NULL,
    PRIMARY KEY (idCargo)
)ENGINE=INNODB
;



-- 
-- TABLE: Personas 
--

CREATE TABLE Personas(
    dni          INT            NOT NULL,
    apellidos    VARCHAR(40)    NOT NULL,
    nombres      VARCHAR(40)    NOT NULL,
    PRIMARY KEY (dni)
)ENGINE=INNODB
;



-- 
-- TABLE: Profesores 
--

CREATE TABLE Profesores(
    dni        INT    NOT NULL,
    idCargo    INT    NOT NULL,
    PRIMARY KEY (dni)
)ENGINE=INNODB
;



-- 
-- TABLE: RolesEnTrabajos 
--

CREATE TABLE RolesEnTrabajos(
    idTrabajo    INT             NOT NULL,
    dni          INT             NOT NULL,
    rol          VARCHAR(7)      NOT NULL,
    desde        DATE            NOT NULL,
    hasta        DATE,
    razon        VARCHAR(100),
    PRIMARY KEY (idTrabajo, dni)
)ENGINE=INNODB
;



-- 
-- TABLE: Trabajos 
--

CREATE TABLE Trabajos(
    idTrabajo            INT             NOT NULL,
    titulo               VARCHAR(150)    NOT NULL,
    duracion             INT             NOT NULL,
    fechaPresentacion    DATE            NOT NULL,
    fechaAprobacion      DATE            NOT NULL,
    fechaFinalizacion    DATE,
    PRIMARY KEY (idTrabajo)
)ENGINE=INNODB
;



-- 
-- INDEX: AK_DNI 
--

CREATE UNIQUE INDEX AK_DNI ON Alumnos(cx)
;
-- 
-- INDEX: Ref22 
--

CREATE INDEX Ref22 ON Alumnos(dni)
;
-- 
-- INDEX: Ref15 
--

CREATE INDEX Ref15 ON AlumnosEnTrabajos(idTrabajo)
;
-- 
-- INDEX: Ref46 
--

CREATE INDEX Ref46 ON AlumnosEnTrabajos(dni)
;
-- 
-- INDEX: AK_nombre 
--

CREATE UNIQUE INDEX AK_nombre ON Areas(nombre)
;
-- 
-- INDEX: Ref88 
--

CREATE INDEX Ref88 ON AreasDeTrabajos(idArea)
;
-- 
-- INDEX: Ref19 
--

CREATE INDEX Ref19 ON AreasDeTrabajos(idTrabajo)
;
-- 
-- INDEX: AK_cargo 
--

CREATE UNIQUE INDEX AK_cargo ON Cargos(cargo)
;
-- 
-- INDEX: Ref21 
--

CREATE INDEX Ref21 ON Profesores(dni)
;
-- 
-- INDEX: Ref77 
--

CREATE INDEX Ref77 ON Profesores(idCargo)
;
-- 
-- INDEX: Ref13 
--

CREATE INDEX Ref13 ON RolesEnTrabajos(idTrabajo)
;
-- 
-- INDEX: Ref34 
--

CREATE INDEX Ref34 ON RolesEnTrabajos(dni)
;
-- 
-- INDEX: AK_titulo 
--

CREATE UNIQUE INDEX AK_titulo ON Trabajos(titulo)
;
-- 
-- TABLE: Alumnos 
--

ALTER TABLE Alumnos ADD CONSTRAINT RefPersonas2 
    FOREIGN KEY (dni)
    REFERENCES Personas(dni)
;


-- 
-- TABLE: AlumnosEnTrabajos 
--

ALTER TABLE AlumnosEnTrabajos ADD CONSTRAINT RefTrabajos5 
    FOREIGN KEY (idTrabajo)
    REFERENCES Trabajos(idTrabajo)
;

ALTER TABLE AlumnosEnTrabajos ADD CONSTRAINT RefAlumnos6 
    FOREIGN KEY (dni)
    REFERENCES Alumnos(dni)
;


-- 
-- TABLE: AreasDeTrabajos 
--

ALTER TABLE AreasDeTrabajos ADD CONSTRAINT RefAreas8 
    FOREIGN KEY (idArea)
    REFERENCES Areas(idArea)
;

ALTER TABLE AreasDeTrabajos ADD CONSTRAINT RefTrabajos9 
    FOREIGN KEY (idTrabajo)
    REFERENCES Trabajos(idTrabajo)
;


-- 
-- TABLE: Profesores 
--

ALTER TABLE Profesores ADD CONSTRAINT RefPersonas1 
    FOREIGN KEY (dni)
    REFERENCES Personas(dni)
;

ALTER TABLE Profesores ADD CONSTRAINT RefCargos7 
    FOREIGN KEY (idCargo)
    REFERENCES Cargos(idCargo)
;


-- 
-- TABLE: RolesEnTrabajos 
--

ALTER TABLE RolesEnTrabajos ADD CONSTRAINT RefTrabajos3 
    FOREIGN KEY (idTrabajo)
    REFERENCES Trabajos(idTrabajo)
;

ALTER TABLE RolesEnTrabajos ADD CONSTRAINT RefProfesores4 
    FOREIGN KEY (dni)
    REFERENCES Profesores(dni)
;


