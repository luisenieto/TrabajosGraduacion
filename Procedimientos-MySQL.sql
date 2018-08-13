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

