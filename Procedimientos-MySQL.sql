USE TrabajosGraduacion;

DELIMITER //
CREATE PROCEDURE `DetalleRoles`(pAnioInicio int, pAnioFin int)
-- Muestra un listado ordenado por año con la cantidad de trabajos
-- en los que un docente participó como tutor, cotutor y jurado
BEGIN
	DECLARE pAnioAux int;
    -- Invierto las fechas
	IF pAnioInicio > pAnioFin THEN
		SET pAnioAux = pAnioInicio;
        SET pAnioInicio = pAnioFin;
        SET pAnioFin = pAnioAux;
    END IF;
    
    SELECT	YEAR(r.desde) `Año`, p.dni DNI, pe.apellidos Apellidos, pe.nombres Nombres,
				sum(r.rol = 'Tutor') Tutor, sum(r.rol = 'Cotutor') Cotutor, sum(r.rol = 'Jurado') Jurado
    FROM Profesores p JOIN Personas pe USING(dni)
    JOIN RolesEnTrabajos r USING(dni)
    WHERE YEAR(r.desde) BETWEEN pAnioInicio AND pAnioFin
    GROUP BY YEAR(r.desde), p.dni
    ORDER BY YEAR(r.desde), pe.apellidos, pe.nombres, p.dni;
END //
DELIMITER ;

-- CALL DetalleRoles(2012, 2018);

DROP VIEW IF EXISTS TrabajosConArea1;
CREATE VIEW TrabajosConArea1
AS
-- todos los trabajos cuya área sea la 1
	SELECT idTrabajo, idArea, fechaAprobacion
	FROM AreasDeTrabajos JOIN Trabajos
	USING (idTrabajo)
	WHERE idArea = 1
	ORDER BY idTrabajo;

DROP VIEW IF EXISTS TrabajosConArea2;    
CREATE VIEW TrabajosConArea2
AS
-- todos los trabajos cuya área sea la 2
	SELECT idTrabajo, idArea, fechaAprobacion
	FROM AreasDeTrabajos JOIN Trabajos
	USING (idTrabajo)
	WHERE idArea = 2
	ORDER BY idTrabajo;

DROP VIEW IF EXISTS TrabajosConArea3; 
CREATE VIEW TrabajosConArea3
AS
-- todos los trabajos cuya área sea la 3
	SELECT idTrabajo, idArea, fechaAprobacion
	FROM AreasDeTrabajos JOIN Trabajos
	USING (idTrabajo)
	WHERE idArea = 3
	ORDER BY idTrabajo;

DROP VIEW IF EXISTS TrabajosSoloConArea1;
CREATE VIEW TrabajosSoloConArea1
AS
-- todos los trabajos solamente con área 1    
	SELECT idTrabajo, fechaAprobacion
	FROM TrabajosConArea1
	WHERE (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea2)) AND (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea3));

DROP VIEW IF EXISTS TrabajosSoloConArea2;
CREATE VIEW TrabajosSoloConArea2
AS
-- todos los trabajos solamente con área 2    
	SELECT idTrabajo, fechaAprobacion
	FROM TrabajosConArea2
	WHERE (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea1)) AND (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea3));

DROP VIEW IF EXISTS TrabajosSoloConArea3;
CREATE VIEW TrabajosSoloConArea3
AS
-- todos los trabajos solamente con área 3
	SELECT idTrabajo, fechaAprobacion
	FROM TrabajosConArea3
	WHERE (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea1)) AND (idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea2));

DROP VIEW IF EXISTS TrabajosSoloConArea1y2;
CREATE VIEW TrabajosSoloConArea1y2
AS
-- todos los trabajos solamente con área 1 y 2
	SELECT idTrabajo, TrabajosConArea1.fechaAprobacion
	FROM TrabajosConArea1 JOIN TrabajosConArea2
    	USING (idTrabajo)
    	WHERE idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea3);
	
DROP VIEW IF EXISTS TrabajosSoloConArea1y3;   
CREATE VIEW TrabajosSoloConArea1y3
AS
-- todos los trabajos solamente con área 1 y 3    
	SELECT idTrabajo, TrabajosConArea1.fechaAprobacion
	FROM TrabajosConArea1 JOIN TrabajosConArea3
    	USING (idTrabajo)
	WHERE idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea2);

DROP VIEW IF EXISTS TrabajosSoloConArea2y3;
CREATE VIEW TrabajosSoloConArea2y3
AS
-- todos los trabajos solamente con área 2 y 3
	SELECT idTrabajo, TrabajosConArea2.fechaAprobacion
	FROM TrabajosConArea2 JOIN TrabajosConArea3
	USING (idTrabajo)
	WHERE idTrabajo NOT IN (SELECT idTrabajo FROM TrabajosConArea1);
    
DROP VIEW IF EXISTS TrabajosSoloConArea12y3;
CREATE VIEW TrabajosSoloConArea12y3
AS
-- todos los trabajos solamente con área 1, 2 y 3    
	SELECT idTrabajo, TrabajosConArea1.fechaAprobacion
	FROM TrabajosConArea1 JOIN TrabajosConArea2
	USING (idTrabajo)
    	JOIN TrabajosConArea3
    	USING (idTrabajo);

DROP PROCEDURE IF EXISTS `ResumenTrabajos`;
DELIMITER //
CREATE PROCEDURE `ResumenTrabajos`(pAnioInicio int, pAnioFin int)
-- Muestra la cantidad de trabajos discriminada por área
BEGIN
	DECLARE pAnioAux int;
    DECLARE pTotalTrabajos varchar(100);
    DECLARE pTotalTrabajosArea1 varchar(100);
    DECLARE pTotalTrabajosArea2 varchar(100);
    DECLARE pTotalTrabajosArea3 varchar(100);
    DECLARE pTotalTrabajosArea1y2 varchar(100);
    DECLARE pTotalTrabajosArea1y3 varchar(100);
    DECLARE pTotalTrabajosArea2y3 varchar(100);
    DECLARE pTotalTrabajosArea12y3 varchar(100);
    
    IF pAnioInicio IS NULL AND pAnioFin IS NOT NULL THEN
		-- Total de trabajos desde el primero hasta la fecha de fin
        SET pTotalTrabajos = (SELECT COUNT(idTrabajo) FROM Trabajos WHERE YEAR(fechaAprobacion) <= pAnioFin);
        SET pTotalTrabajosArea1 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1 WHERE YEAR(fechaAprobacion) <= pAnioFin);
        SET pTotalTrabajosArea2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2 WHERE YEAR(fechaAprobacion) <= pAnioFin);
		SET pTotalTrabajosArea3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea3 WHERE YEAR(fechaAprobacion) <= pAnioFin);        
		SET pTotalTrabajosArea1y2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y2 WHERE YEAR(fechaAprobacion) <= pAnioFin);        
		SET pTotalTrabajosArea1y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y3 WHERE YEAR(fechaAprobacion) <= pAnioFin);        
        SET pTotalTrabajosArea2y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2y3 WHERE YEAR(fechaAprobacion) <= pAnioFin);
        SET pTotalTrabajosArea12y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea12y3 WHERE YEAR(fechaAprobacion) <= pAnioFin);
	ELSEIF pAnioInicio IS NOT NULL AND pAnioFin IS NULL THEN
		-- Total de trabajos desde la fecha de inicio hasta el final
        SET pTotalTrabajos = (SELECT COUNT(idTrabajo) FROM Trabajos WHERE YEAR(fechaAprobacion) >= pAnioInicio);
		SET pTotalTrabajosArea1 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1 WHERE YEAR(fechaAprobacion) >= pAnioInicio);        
        SET pTotalTrabajosArea2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2 WHERE YEAR(fechaAprobacion) >= pAnioInicio);
		SET pTotalTrabajosArea3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea3 WHERE YEAR(fechaAprobacion) >= pAnioInicio);        
		SET pTotalTrabajosArea1y2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y2 WHERE YEAR(fechaAprobacion) >= pAnioInicio);        
		SET pTotalTrabajosArea1y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y3 WHERE YEAR(fechaAprobacion) >= pAnioInicio);        
        SET pTotalTrabajosArea2y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2y3 WHERE YEAR(fechaAprobacion) >= pAnioInicio);
        SET pTotalTrabajosArea12y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea12y3 WHERE YEAR(fechaAprobacion) >= pAnioInicio);        
	ELSEIF pAnioInicio IS NOT NULL AND pAnioFin IS NOT NULL THEN
		-- Total de trabajos entre las fechas especificadas
		IF pAnioInicio > pAnioFin THEN
			-- Si están al revés las fechas se las invierte
			SET pAnioAux = pAnioInicio;
			SET pAnioInicio = pAnioFin;
			SET pAnioFin = pAnioAux;
		END IF;
        SET pTotalTrabajos = (SELECT COUNT(idTrabajo) FROM Trabajos WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);
		SET pTotalTrabajosArea1 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);                
        SET pTotalTrabajosArea2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);
		SET pTotalTrabajosArea3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea3 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);        
		SET pTotalTrabajosArea1y2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y2 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);        
		SET pTotalTrabajosArea1y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y3 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);        
        SET pTotalTrabajosArea2y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2y3 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);
        SET pTotalTrabajosArea12y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea12y3 WHERE YEAR(fechaAprobacion) BETWEEN pAnioInicio AND pAnioFin);                
	ELSE
		-- No pueden ser nulas las 2 fechas
        SET pTotalTrabajos = (SELECT COUNT(idTrabajo) FROM Trabajos);
		SET pTotalTrabajosArea1 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1);                        
        SET pTotalTrabajosArea2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2);
		SET pTotalTrabajosArea3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea3);        
		SET pTotalTrabajosArea1y2 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y2);        
		SET pTotalTrabajosArea1y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea1y3);        
        SET pTotalTrabajosArea2y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea2y3);
        SET pTotalTrabajosArea12y3 = (SELECT COUNT(idTrabajo) FROM TrabajosSoloConArea12y3);                        
    END IF;
        
	SELECT CONCAT("Total de trabajos: ", pTotalTrabajos, "\n", "Total de trabajos sólo HW: ", pTotalTrabajosArea1, "\n", "Total de trabajos sólo Redes: ", pTotalTrabajosArea2, "\n", "Total de trabajos sólo SW: ", pTotalTrabajosArea3, "\n", "Total de trabajos HW y Redes: ", pTotalTrabajosArea1y2, "\n", "Total de trabajos HW y SW: ", pTotalTrabajosArea1y3, "\n", "Total de trabajos Redes y SW: ", pTotalTrabajosArea2y3, "\n", "Total de trabajos 3 áreas: ", pTotalTrabajosArea12y3); 

END //
DELIMITER ;

CALL ResumenTrabajos(NULL, NULL);