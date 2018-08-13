USE TrabajosGraduacion;

-- delete from RolesEnTrabajos;
-- delete from AlumnosEnTrabajos;
-- delete from Profesores;
-- delete from Cargos;
-- delete from AreasDeTrabajos;
-- delete from Trabajos;
-- delete from Alumnos;
-- delete from Personas;
-- delete from Areas;


INSERT INTO Cargos VALUES(1, 'Titular');
INSERT INTO Cargos VALUES(2, 'Asociado');
INSERT INTO Cargos VALUES(3, 'Adjunto');
INSERT INTO Cargos VALUES(4, 'JTP');
INSERT INTO Cargos VALUES(5, 'ADG');
INSERT INTO Cargos VALUES(6, 'Externo');

INSERT INTO Areas VALUES(1, 'Hardware');
INSERT INTO Areas VALUES(2, 'Redes');
INSERT INTO Areas VALUES(3, 'Software');

-- Profesores

INSERT INTO Personas VALUES(23662807, 'Mendiondo', 'Matías');
INSERT INTO Personas VALUES(23517082, 'Odstrcil', 'Maximiliano');
INSERT INTO Personas VALUES(23518045, 'Nieto', 'Luis');
INSERT INTO Personas VALUES(28883519, 'Odstrcil', 'Gabriela');
INSERT INTO Personas VALUES(12598702, 'Luccioni', 'Griselda');
INSERT INTO Personas VALUES(16039418, 'Saade', 'Sergio');
INSERT INTO Personas VALUES(30117830, 'Albaca', 'Carlos');
INSERT INTO Personas VALUES(28223267, 'Nahas', 'Romina');
INSERT INTO Personas VALUES(10013664, 'Cohen', 'Daniel');
INSERT INTO Personas VALUES(26923992, 'Guzmán', 'Fernanda');
INSERT INTO Personas VALUES(28476143, 'Sánchez', 'Mariana');
INSERT INTO Personas VALUES(20433775, 'Juárez', 'Gustavo');
INSERT INTO Personas VALUES(29878607, 'Menéndez', 'Franco');
INSERT INTO Personas VALUES(13014668, 'Mitre', 'Marcelo');
INSERT INTO Personas VALUES(10012916, 'Ferrao', 'Nilda');
INSERT INTO Personas VALUES(12796743, 'Pérez', 'Jorge');
INSERT INTO Personas VALUES(23517968, 'Volentini', 'Esteban');
INSERT INTO Personas VALUES(23239465, 'Nader', 'Fernando');
INSERT INTO Personas VALUES(27650932, 'Rossi', 'Guillermo');
INSERT INTO Personas VALUES(17458321, 'Pacheco', 'Fabián');
INSERT INTO Personas VALUES(26485355, 'Cardozo', 'Teresa');
INSERT INTO Personas VALUES(13279734, 'Solarz', 'Pablo'); 
INSERT INTO Personas VALUES(23930075, 'Lutz', 'Federico');
INSERT INTO Personas VALUES(24340992, 'Bilbao', 'Javier');
INSERT INTO Personas VALUES(11909386, 'De la Zerda', 'Luis');
INSERT INTO Personas VALUES(27365680, 'Majorel Padilla', 'Nicolás');
INSERT INTO Personas VALUES(08564856, 'Agliano', 'Humberto');
INSERT INTO Personas VALUES(11007967, 'González', 'Ricardo');
INSERT INTO Personas VALUES(1029, 'Lafuente', 'Cristian'); -- ******************
INSERT INTO Personas VALUES(28222901, 'Giori', 'Gustavo');
INSERT INTO Personas VALUES(29997715, 'Sueldo', 'Carlos');
INSERT INTO Personas VALUES(10993401, 'Steifensand', 'Jorge');
INSERT INTO Personas VALUES(14352785, 'Estévez', 'Miguel');
INSERT INTO Personas VALUES(28223959, 'Juárez', 'Martín');
INSERT INTO Personas VALUES(27364012, 'Silvera', 'Ricardo José');
INSERT INTO Personas VALUES(10219453, 'Bazzano', 'Miguel Angel');
INSERT INTO Personas VALUES(18168175, 'Will', 'Adrián');
INSERT INTO Personas VALUES(30, 'Moreno Madrid', 'Ana Paula');
INSERT INTO Personas VALUES(14561966, 'Weyerstall', 'Walter');
INSERT INTO Personas VALUES(23116845, 'Gómez López', 'María de los Angeles');
INSERT INTO Personas VALUES(12622784, 'Saade', 'Raúl');
INSERT INTO Personas VALUES(17578290, 'Younes', 'José');
INSERT INTO Personas VALUES(32775706, 'Talebi', 'Daniel');
INSERT INTO Personas VALUES(24802176, 'Naigeboren', 'Gustavo');


-- Alumnos

INSERT INTO Personas VALUES(37497717, 'Ortíz', 'Juan Pablo');
INSERT INTO Personas VALUES(37312195, 'Ledesma', 'Facundo');
INSERT INTO Personas VALUES(32408625, 'Pary', 'Nélson Guillermo');
INSERT INTO Personas VALUES(30719537, 'Albarracín', 'María Carolina'); 
INSERT INTO Personas VALUES(34604527, 'Bono', 'Gustavo');
INSERT INTO Personas VALUES(33540077, 'Uezen', 'Héctor');
INSERT INTO Personas VALUES(38184937, 'Mariné', 'Juan Luis');
INSERT INTO Personas VALUES(37655938, 'Sfriso', 'Mauricio');
INSERT INTO Personas VALUES(30357705, 'Guanco', 'Juan Marcos');
INSERT INTO Personas VALUES(33703650, 'Gómez Salas', 'Pablo');
INSERT INTO Personas VALUES(34133106, 'Ferrari', 'Franco');
INSERT INTO Personas VALUES(33756926, 'Rodríguez', 'Jorge Luis');
INSERT INTO Personas VALUES(35809463, 'Córdoba', 'Facundo Sebastián');
INSERT INTO Personas VALUES(32243732, 'Aparicio', 'Ezequiel Andrés');
INSERT INTO Personas VALUES(38509440, 'Anzorena Ostengo', 'Agustín');
INSERT INTO Personas VALUES(38185470, 'Ruíz', 'Ana Pamela');
INSERT INTO Personas VALUES(32569631, 'Soliz', 'Benjamín Alejandro');
INSERT INTO Personas VALUES(33760555, 'González Carballo', 'Luis Edil');
INSERT INTO Personas VALUES(37504300, 'Dip', 'Raúl Alberto');
INSERT INTO Personas VALUES(29081056, 'González', 'Martín Walter');
INSERT INTO Personas VALUES(29835558, 'Medina', 'Jorge Ariel');
INSERT INTO Personas VALUES(22, 'Insaurralde Alcaraz', 'Melisa Belén');
INSERT INTO Personas VALUES(23, 'Barchini', 'Raúl Alejandro');
INSERT INTO Personas VALUES(29334356, 'Avalos', 'Miriam Marcela'); 
INSERT INTO Personas VALUES(33628483, 'Rodríguez', 'Ignacio Rafael José');
INSERT INTO Personas VALUES(33050649, 'Turpo Fernández', 'Bruno Benjamín');
INSERT INTO Personas VALUES(33756768, 'Rodríguez', 'Juan Sebastián');
INSERT INTO Personas VALUES(26, 'Aguilar', 'Gabiriel Antonio');
INSERT INTO Personas VALUES(27, 'Muñoz', 'Juan José');
INSERT INTO Personas VALUES(30175915, 'García', 'Enzo Oscar');
INSERT INTO Personas VALUES(32207318, 'Guerra', 'Juan Carlos');
INSERT INTO Personas VALUES(36866277, 'Guerrero', 'Ramiro Alejandro');
INSERT INTO Personas VALUES(36865251, 'Abbás', 'Rodrigo Alejandro');
INSERT INTO Personas VALUES(34159181, 'Gómez Véliz', 'Kevin Shionen');
INSERT INTO Personas VALUES(33971162, 'Bruno', 'Ricardo Hugo');
INSERT INTO Personas VALUES(37309622, 'Alvarez', 'Pamela Victoria');
INSERT INTO Personas VALUES(34603951, 'Moreno', 'Jorge Antonio');
INSERT INTO Personas VALUES(35917837, 'Gutiérrez', 'Leandro Emanuel');
INSERT INTO Personas VALUES(30919732, 'Roldán', 'Graciana');
INSERT INTO Personas VALUES(35822926, 'Martínez', 'Gimena del Rocío');
INSERT INTO Personas VALUES(34953697, 'Gallardo Grazio', 'Franco');
INSERT INTO Personas VALUES(34286439, 'González', 'Mauricio Ezequiel');
INSERT INTO Personas VALUES(31451758, 'Lazarte', 'Diego Ezequiel');
INSERT INTO Personas VALUES(30072261, 'Salinas', 'Pablo Daniel');
INSERT INTO Personas VALUES(28223166, 'Molineri', 'Luis Matías');
INSERT INTO Personas VALUES(33567927, 'Ponce', 'José Alejandro');
INSERT INTO Personas VALUES(30271112, 'Adbes', 'Pablo Agustín');
INSERT INTO Personas VALUES(34133064, 'Díaz', 'María Emilia');
INSERT INTO Personas VALUES(31030183, 'Torres', 'Marcelo Alejandro');
INSERT INTO Personas VALUES(93909308, 'Rojas Villegas', 'Andrés Sebastián');
INSERT INTO Personas VALUES(29997259, 'Andriani', 'Daniel Esteban');
INSERT INTO Personas VALUES(36551535, 'Cruz', 'Diego César');
INSERT INTO Personas VALUES(36836896, 'Paredes', 'Oscar Alberto');
INSERT INTO Personas VALUES(33922004, 'Caro', 'Darío Fernando');
INSERT INTO Personas VALUES(29729479, 'Fernández', 'Martín Alejandro');
INSERT INTO Personas VALUES(34185343, 'Díaz Uría', 'Gonzalo');
INSERT INTO Personas VALUES(33374831, 'Sánchez', 'Julio Alberto');
INSERT INTO Personas VALUES(34348845, 'De la Fuente', 'Lucas Rafael');
INSERT INTO Personas VALUES(33756689, 'Cuevas', 'Sabrina Maribel');
INSERT INTO Personas VALUES(32459196, 'Rosino', 'Rubén');
INSERT INTO Personas VALUES(37527908, 'Quinteros', 'Luciano Nicolás');
INSERT INTO Personas VALUES(34764910, 'Salinas Mendoza', 'Franco Javier');
INSERT INTO Personas VALUES(34185948, 'Abuin', 'Juan Pablo');
INSERT INTO Personas VALUES(33884158, 'Bravo Córdoba', 'Jorge Ezequiel');
INSERT INTO Personas VALUES(34096422, 'Ciotola', 'Marco Vittorio');
INSERT INTO Personas VALUES(34603843, 'Forcada', 'Pablo Nicolás');
INSERT INTO Personas VALUES(35195464, 'Masclef', 'Gabriel Alejandro');
INSERT INTO Personas VALUES(31001007, 'Pedraza', 'Alvaro Esteban');
INSERT INTO Personas VALUES(33703030, 'Alderete', 'Sofía Soledad');
INSERT INTO Personas VALUES(33391730, 'Villagra', 'María Constanza');
INSERT INTO Personas VALUES(33431455, 'Hardoy', 'Víctor Alfonso');
INSERT INTO Personas VALUES(32460297, 'Avellaneda', 'Gabriel Darío');
INSERT INTO Personas VALUES(37191010, 'Vázquez Lozano', 'Franfo Emanuel');
INSERT INTO Personas VALUES(35256570, 'Vega', 'Carlos Exequiel');
INSERT INTO Personas VALUES(38248621, 'Pérez', 'Franco David');
INSERT INTO Personas VALUES(31505375, 'Lucianna', 'Facundo');
INSERT INTO Personas VALUES(37191647, 'Navarro Peralta', 'Pablo');
INSERT INTO Personas VALUES(37636901, 'Forns', 'Antonio Ignacio');
INSERT INTO Personas VALUES(37456013, 'García Zeman', 'Carlos Luciano');
INSERT INTO Personas VALUES(36867442, 'Maciel Rodríguez', 'María Laura');
INSERT INTO Personas VALUES(34132393, 'Wolfenson', 'Alejandro');
INSERT INTO Personas VALUES(36865839, 'De Amicis', 'Gonzalo Damián');
INSERT INTO Personas VALUES(39142069, 'Balsells', 'Guido Alejandro');
INSERT INTO Personas VALUES(39574773, 'José Liezún', 'Miguel Angel');
INSERT INTO Personas VALUES(39478639, 'Pace', 'Pablo Agustín');
INSERT INTO Personas VALUES(33690456, 'Benicio', 'Mariela del Valle');
INSERT INTO Personas VALUES(36838523, 'Albornoz', 'Máximo Augusto');
INSERT INTO Personas VALUES(36866011, 'Toledo', 'Pablo Gabriel');
INSERT INTO Personas VALUES(35199972, 'Richard', 'Carlos Emiliano');
INSERT INTO Personas VALUES(32116229, 'Barrionuevo', 'Luciana Maité');




-- delete from Personas where dni in (5, 6, 14, 32, 33)

INSERT INTO Profesores VALUES(23662807, 5);
INSERT INTO Profesores VALUES(23517082, 2);
INSERT INTO Profesores VALUES(23518045, 2);
INSERT INTO Profesores VALUES(28883519, 4);
INSERT INTO Profesores VALUES(12598702, 1);
INSERT INTO Profesores VALUES(16039418, 1);
INSERT INTO Profesores VALUES(30117830, 4);
INSERT INTO Profesores VALUES(28223267, 3);
INSERT INTO Profesores VALUES(10013664, 1);
INSERT INTO Profesores VALUES(26923992, 3);
INSERT INTO Profesores VALUES(28476143, 3);
INSERT INTO Profesores VALUES(20433775, 2);
INSERT INTO Profesores VALUES(29878607, 3);
INSERT INTO Profesores VALUES(13014668, 3);
INSERT INTO Profesores VALUES(10012916, 2);
INSERT INTO Profesores VALUES(12796743, 2);
INSERT INTO Profesores VALUES(23517968, 3);
INSERT INTO Profesores VALUES(23239465, 3);
INSERT INTO Profesores VALUES(27650932, 5);
INSERT INTO Profesores VALUES(17458321, 3);
INSERT INTO Profesores VALUES(26485355, 4);
INSERT INTO Profesores VALUES(13279734, 3);
INSERT INTO Profesores VALUES(23930075, 4);
INSERT INTO Profesores VALUES(24340992, 4);
INSERT INTO Profesores VALUES(11909386, 3);
INSERT INTO Profesores VALUES(27365680, 3);
INSERT INTO Profesores VALUES(08564856, 1);
INSERT INTO Profesores VALUES(11007967, 1);
INSERT INTO Profesores VALUES(1029, 5);
INSERT INTO Profesores VALUES(28222901, 5);
INSERT INTO Profesores VALUES(29997715, 3);
INSERT INTO Profesores VALUES(10993401, 2);
INSERT INTO Profesores VALUES(14352785, 1);
INSERT INTO Profesores VALUES(28223959, 4);
INSERT INTO Profesores VALUES(31505375, 6); 
INSERT INTO Profesores VALUES(27364012, 5);
INSERT INTO Profesores VALUES(10219453, 3);
INSERT INTO Profesores VALUES(18168175, 2);
INSERT INTO Profesores VALUES(30, 3); -- Moreno Madrid
INSERT INTO Profesores VALUES(14561966, 1);
INSERT INTO Profesores VALUES(23116845, 2);
INSERT INTO Profesores VALUES(12622784, 3);
INSERT INTO Profesores VALUES(17578290, 3);
INSERT INTO Profesores VALUES(32775706, 6);
INSERT INTO Profesores VALUES(24802176, 6);


INSERT INTO Alumnos VALUES(37497717, '1414641');
INSERT INTO Alumnos VALUES(37312195, '1412969');
INSERT INTO Alumnos VALUES(32408625, '1414822');
INSERT INTO Alumnos VALUES(30719537, '1408513');
INSERT INTO Alumnos VALUES(34604527, '1409492');
INSERT INTO Alumnos VALUES(33540077, '1417417');
INSERT INTO Alumnos VALUES(38184937, '1413513');
INSERT INTO Alumnos VALUES(37655938, '1416773');
INSERT INTO Alumnos VALUES(30357705, '0303890');
INSERT INTO Alumnos VALUES(33703650, '1411805');
INSERT INTO Alumnos VALUES(34133106, '1411300');
INSERT INTO Alumnos VALUES(33756926, '1415802');
INSERT INTO Alumnos VALUES(35809463, '1410486');
INSERT INTO Alumnos VALUES(32243732, '0502983');
INSERT INTO Alumnos VALUES(38509440, '1408824');
INSERT INTO Alumnos VALUES(38185470, '1416177');
INSERT INTO Alumnos VALUES(32569631, '0503983');
INSERT INTO Alumnos VALUES(33760555, '1411905');
INSERT INTO Alumnos VALUES(37504300, '1411000');
INSERT INTO Alumnos VALUES(29081056, '1418265');
INSERT INTO Alumnos VALUES(29835558, '1412065');
INSERT INTO Alumnos VALUES(22, '1412561');
INSERT INTO Alumnos VALUES(23, '0401688');
INSERT INTO Alumnos VALUES(29334356, '1409045');
INSERT INTO Alumnos VALUES(33628483, '1415788');
INSERT INTO Alumnos VALUES(33050649, '1417404');
INSERT INTO Alumnos VALUES(33756768, '0705676');
INSERT INTO Alumnos VALUES(26, '1014033');
INSERT INTO Alumnos VALUES(27, '1014981');
INSERT INTO Alumnos VALUES(30175915, '1411621');
INSERT INTO Alumnos VALUES(32207318, '1412201');
INSERT INTO Alumnos VALUES(36866277, '1412227');
INSERT INTO Alumnos VALUES(36865251, '1408235');
INSERT INTO Alumnos VALUES(34159181, '1411828');
INSERT INTO Alumnos VALUES(33971162, '1409686');
INSERT INTO Alumnos VALUES(37309622, '1408742');
INSERT INTO Alumnos VALUES(34603951, '0900645');
INSERT INTO Alumnos VALUES(35917837, '1004523');
INSERT INTO Alumnos VALUES(30919732, '1415963');
INSERT INTO Alumnos VALUES(35822926, '1413572');
INSERT INTO Alumnos VALUES(38248621, '1415052');
INSERT INTO Alumnos VALUES(34953697, '1411499');
INSERT INTO Alumnos VALUES(34286439, '1412073');
INSERT INTO Alumnos VALUES(31451758, '1412895');
INSERT INTO Alumnos VALUES(30072261, '1416326');
INSERT INTO Alumnos VALUES(28223166, '1414046');
INSERT INTO Alumnos VALUES(33567927, '1415212');
INSERT INTO Alumnos VALUES(30271112, '1408321');
INSERT INTO Alumnos VALUES(34133064, '0801676');
INSERT INTO Alumnos VALUES(31030183, '0419798');
INSERT INTO Alumnos VALUES(93909308, '0503900');
INSERT INTO Alumnos VALUES(29997259, '1408815');
INSERT INTO Alumnos VALUES(36551535, '1410623');
INSERT INTO Alumnos VALUES(36836896, '1414809');
INSERT INTO Alumnos VALUES(33922004, '0704590');
INSERT INTO Alumnos VALUES(29729479, '1411277');
INSERT INTO Alumnos VALUES(34185343, '0801424');
INSERT INTO Alumnos VALUES(33374831, '0700423');
INSERT INTO Alumnos VALUES(34348845, '0702604');
INSERT INTO Alumnos VALUES(33756689, '1410698');
INSERT INTO Alumnos VALUES(32459196, '0602969');
INSERT INTO Alumnos VALUES(37527908, '1415260');
INSERT INTO Alumnos VALUES(34764910, '0800291');
INSERT INTO Alumnos VALUES(34185948, '1408244');
INSERT INTO Alumnos VALUES(33884158, '1409575');
INSERT INTO Alumnos VALUES(34096422, '1410342');
INSERT INTO Alumnos VALUES(34603843, '1418314');
INSERT INTO Alumnos VALUES(35195464, '1413606');
INSERT INTO Alumnos VALUES(31001007, '1015120');
INSERT INTO Alumnos VALUES(33703030, '1408563');
INSERT INTO Alumnos VALUES(33391730, '1417883');
INSERT INTO Alumnos VALUES(33431455, '1412345');
INSERT INTO Alumnos VALUES(32460297, '1409079');
INSERT INTO Alumnos VALUES(37191010, '1417631');
INSERT INTO Alumnos VALUES(35256570, '1417657');
INSERT INTO Alumnos VALUES(37191647, '1414284');
INSERT INTO Alumnos VALUES(37636901, '1411400');
INSERT INTO Alumnos VALUES(37456013, '1411571');
INSERT INTO Alumnos VALUES(36867442, '1413364');
INSERT INTO Alumnos VALUES(34132393, '1417999');
INSERT INTO Alumnos VALUES(36865839, '1410753');
INSERT INTO Alumnos VALUES(39142069, '1409216');
INSERT INTO Alumnos VALUES(39574773, '1412687');
INSERT INTO Alumnos VALUES(39478639, '1506573');
INSERT INTO Alumnos VALUES(33690456, '1409445');
INSERT INTO Alumnos VALUES(36838523, '1408532');
INSERT INTO Alumnos VALUES(36866011, '1417221');
INSERT INTO Alumnos VALUES(35199972, '1415527');
INSERT INTO Alumnos VALUES(32116229, '1409282');

-- delete from Alumnos where dni in (5, 6, 14, 32, 33);

INSERT INTO Trabajos VALUES(1, 'Sistema de Gestión de Presupuestación de Obras de Construcción', 6, '2018-05-04', '2018-05-24', NULL);
INSERT INTO Trabajos VALUES(2, 'Implementación de políticas de tráfico para enrutamiento con BGP', 6, '2018-05-04', '2018-05-24', NULL);
INSERT INTO Trabajos VALUES(3, 'Sistema de Gestión y Seguimiento de Trabajos de Graduación de Ingeniería en Computación', 9, '2015-12-15', '2015-12-15', NULL);
INSERT INTO Trabajos VALUES(4, 'Sistema de gestión y página web para una escuela de cocina', 6, '2017-04-03', '2017-04-03', NULL);
INSERT INTO Trabajos VALUES(5, 'Módulo de interfaz de usuario de sistema SCADA', 6, '2018-05-09', '2018-05-24', NULL);
INSERT INTO Trabajos VALUES(6, 'Realización de filtros digitales empleando operador delta', 5, '2014-04-16', '2014-05-13', NULL);
INSERT INTO Trabajos VALUES(7, 'Sistema de seguimiento de egresados', 6, '2018-03-01', '2018-05-24', NULL);
INSERT INTO Trabajos VALUES(8, 'Sistema gestor para farmacia de Centro Asistencia Primaria de Salud (CAPS)', 6, '2017-11-29', '2017-11-29', NULL);
INSERT INTO Trabajos VALUES(9, 'Desarrollo de servicios web para interoperabilidad entre sistemas de gestión de pacientes y de gestión de imágenes estándar', 5, '2017-11-13', '2017-11-29', NULL);
INSERT INTO Trabajos VALUES(10, 'Metodología para auditorías en redes inalámbricas con protocolos IPv4 e IPv6', 6, '2017-08-23', '2017-08-23', NULL);
INSERT INTO Trabajos VALUES(11, 'Sistema específico para la gestión de empresa basado en PHP, HTML, MySQL y JS', 6, '2017-07-05', '2017-07-05', NULL);
INSERT INTO Trabajos VALUES(12, 'Sistema de tutorías web', 6, '2017-07-04', '2017-07-04', NULL);
INSERT INTO Trabajos VALUES(13, 'Modelado de implementación de IPv6 en red de la UNT', 6, '2016-07-28', '2016-08-12', NULL);
INSERT INTO Trabajos VALUES(14, 'Sistema de telemetría y control remoto GSM/GPRS', 4, '2015-12-15', '2015-12-15', NULL);
INSERT INTO Trabajos VALUES(15, 'Redes de transporte de fibra óptica: multiplexación por división de longitud de onda (WDM)', 12, '2015-03-13', '2015-04-21', NULL);
INSERT INTO Trabajos VALUES(16, 'Sistema de gestión de mutuales', 5, '2017-12-13', '2017-12-13', NULL);
INSERT INTO Trabajos VALUES(17, 'Framework para pruebas de seguridad en dispositivos de red', 7, '2017-10-27', '2017-11-29', NULL);
INSERT INTO Trabajos VALUES(18, 'Sistema de gestión y control de invernadero automatizado con Arduino', 6, '2017-03-29', '2017-07-05', NULL);
INSERT INTO Trabajos VALUES(19, 'Aplicación Web Configurable Dinámicamente por Metadatos', 6, '2013-06-25', '2013-06-27', NULL);
INSERT INTO Trabajos VALUES(20, 'Estudio e implementación de una red de telefonía IP', 5, '2017-07-05', '2017-07-05', NULL);
INSERT INTO Trabajos VALUES(21, 'Osciloscopio para dispositivos móviles', 6, '2016-06-16', '2016-08-12', NULL);
INSERT INTO Trabajos VALUES(22, 'Dispositivos móviles para identificar y registrar la contaminación de afluentes y ríos', 6, '2017-04-21', '2017-05-17', NULL);
INSERT INTO Trabajos VALUES(23, 'Desarrollo de sistema de optimización mediante partículas utilizando lenguaje orientado a agentes', 3, '2016-09-05', '2016-08-12', NULL);
INSERT INTO Trabajos VALUES(24, 'Software de gestión y administración - Frigorífico C.T.S.A. Ltda.', 5, '2015-12-01', '2015-12-09', NULL);
-- INSERT INTO Trabajos VALUES(25, 'Método de estimación de Puntos de Casos de Uso Mejorado', 3, '2018-05-29', '', NULL); Roldán, Graciana
-- INSERT INTO Trabajos VALUES(26, 'Aplicación móvil de Gestión para Laboratorio de Análisis Clínicos', 5, '2018-05-24', '', NULL); Martínez, Gimena
-- INSERT INTO Trabajos VALUES(27, 'Sistema inalámbrico para relacionar la actividad muscular con los movimientos de las extremidades', 10, '2018-06-05', '', NULL); Pérez, Franco
-- INSERT INTO Trabajos VALUES(28, 'Sistema para seguimiento de órdenes y solicitudes de compra', 6, '2018-04-17', '', NULL); Gallardo Grazio - González
INSERT INTO Trabajos VALUES(29, 'Sistema de Gestión Web para el manejo de una empresa de Serigrafía', 6, '2015-12-15', '2015-12-15', NULL); 
INSERT INTO Trabajos VALUES(30, 'Estudio de la optimización de la gestión de una mesa de ayuda de un contact center utilizando ITIL', 5, '2013-10-29', '2013-10-29', NULL); 
INSERT INTO Trabajos VALUES(31, 'Framework en Java para Gene Expression Programming (GEPFramework)', 6, '2015-10-08', '2015-10-27', NULL); 
INSERT INTO Trabajos VALUES(32, 'Sistema de modelado de defectos óseos en 3D', 6, '2016-11-29', '2016-12-06', NULL); 
INSERT INTO Trabajos VALUES(33, 'Implementación de un microprocesador mediante metodlogías de diseño VLSI', 4, '2015-10-22', '2015-10-22', NULL); 
INSERT INTO Trabajos VALUES(34, 'Relevamiento y reestructuración de la red de datos de empaque de cítricos', 7, '2017-07-05', '2017-07-05', NULL); 
INSERT INTO Trabajos VALUES(35, 'Auto robot con sistema de conducción y toma de datos controlados', 4, '2017-10-02', '2017-10-02', NULL); 
INSERT INTO Trabajos VALUES(36, 'SDN, Estudio, Experimentación e Implementación de una Red Definida por Software para distribución de contenido multimedia', 7, '2015-10-22', '2015-10-22', NULL); 
INSERT INTO Trabajos VALUES(37, 'Técnicas de intrusión en infraestructura de red y aplicaciones web', 5, '2014-04-01', '2014-05-13', NULL); 
INSERT INTO Trabajos VALUES(38, 'Sistema de gestión y validación de preguntas para la generación de exámenes de calidad', 5, '2016-04-05', '2016-06-02', NULL); 
INSERT INTO Trabajos VALUES(39, 'Sistema de gestión para laboratorio de análisis clínico', 6, '2017-08-23', '2017-08-23', NULL); 
INSERT INTO Trabajos VALUES(40, 'Desarrollo de un sistema de conducción autónoma mediante visión artificial para un robot móvil tipo auto', 6, '2016-09-06', '2016-12-06', NULL); 
INSERT INTO Trabajos VALUES(41, 'Laboratorios de Transmisión de Datos en EDU-CIAA', 6, '2016-12-02', '2016-12-06', NULL); 
INSERT INTO Trabajos VALUES(42, 'Desarrollo de un framework en lenguaje C para controladores difusos', 6, '2015-07-28', '2015-08-13', NULL); 
INSERT INTO Trabajos VALUES(43, 'Sistema de análisis estadístico de tráfico mediante detección de movimiento en tiempo real', 6, '2015-10-07', '2015-10-27', NULL); 
INSERT INTO Trabajos VALUES(44, 'Sistema de inscripción y seguimiento de alumnos del Instituto de Perfeccionamiento Docente', 6, '2015-08-13', '2015-08-13', NULL); 
INSERT INTO Trabajos VALUES(45, 'Sistema de gestión académica con tecnologías web y herramientas freeware', 6, '2014-11-11', '2014-11-11', NULL); 
INSERT INTO Trabajos VALUES(46, 'Realidad aumentada en el teatro: prototipo de una aplicación para mejorar la experiencia de los espectadores', 3, '2015-12-10', '2015-12-10', NULL); 
INSERT INTO Trabajos VALUES(47, 'Análisis de rendimiento y optimización de una red MPLS', 5, '2015-10-22', '2015-10-22', NULL); 
INSERT INTO Trabajos VALUES(48, 'Diseño y desarrollo de un video juego interactivo aplicando realidad aumentada', 4, '2015-12-15', '2015-12-15', NULL); 
INSERT INTO Trabajos VALUES(49, 'Sistema de conversión de textos a voz', 6, '2016-10-10', '2016-10-10', NULL); 
INSERT INTO Trabajos VALUES(50, 'Aplicación Web GEFOUNT Módulo de stock y facturación', 6, '2016-09-09', '2016-09-09', NULL); 
INSERT INTO Trabajos VALUES(51, 'Aplicación Web GEFOUNT Módulo contable', 6, '2016-09-09', '2016-09-09', NULL); 
INSERT INTO Trabajos VALUES(52, 'Investigación y experimentación con protocolos y procesos asociados a IPv6', 4, '2016-05-10', '2016-06-02', NULL); 
INSERT INTO Trabajos VALUES(53, 'Diseño y desarrollo de un co-procesador de imágenes basado en redes neuronales convolucionales utilizando RISC V', 4, '2015-10-14', '2015-09-27', NULL); 
-- INSERT INTO Trabajos VALUES(54, 'Sistema operativo de tiempo real con tareas dinámicas (PortOS)', 6, '2018-07-26', '', NULL); Balsells/José Liezún/Pace
INSERT INTO Trabajos VALUES(55, 'Trabajos prácticos y laboratorios de concurrencia para Sistemas Operativos', 5, '2015-12-10', '2016-08-19', NULL); 
INSERT INTO Trabajos VALUES(56, 'Desarrollo y análisis comparativo de medidores de energía monofásicos', 6, '2015-12-04', '2015-12-04', NULL); 
INSERT INTO Trabajos VALUES(57, 'Refactorización del modelo de presentación de una aplicación web de comercio electrónico', 6, '2015-12-14', '2015-12-14', NULL); 

-- UPDATE Trabajos SET fechaFinalizacion = '2018-07-26' WHERE idTrabajo = 24; -- Gutiérrez/Moreno
-- UPDATE Trabajos SET fechaFinalizacion = '2018-08-03' WHERE idTrabajo = 10; -- Anzorena Ostengo/Ruíz
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 39; -- Cuevas
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 40; -- Rosino
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 41; -- Quinteros
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 42; -- Salinas Mendoza
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 43; -- Abuin/Bravo Córdoba/Ciotola
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 44; -- Forcada/Masclef
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 45; -- Pedraza
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 46; -- Alderete
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 47; -- Hardoy/Villagra
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 48; -- Avellaneda
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 49; -- Vazquez Lozano/Vega
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 50; -- Forns/Navarro Peralta
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 51; -- García Zeman/Maciel
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 52; -- Wolfenson
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 53; -- De Amicis
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 55; -- Benicio
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 56; -- Albornoz/Richard/Toledo
-- UPDATE Trabajos SET fechaFinalizacion = '' WHERE idTrabajo = 57; -- Barrionuevo

INSERT INTO AreasDeTrabajos VALUES(3, 1);
INSERT INTO AreasDeTrabajos VALUES(2, 2);
INSERT INTO AreasDeTrabajos VALUES(3, 3);
INSERT INTO AreasDeTrabajos VALUES(3, 4);
INSERT INTO AreasDeTrabajos VALUES(3, 5);
INSERT INTO AreasDeTrabajos VALUES(3, 6);
INSERT INTO AreasDeTrabajos VALUES(3, 7);
INSERT INTO AreasDeTrabajos VALUES(2, 8);
INSERT INTO AreasDeTrabajos VALUES(3, 8);
INSERT INTO AreasDeTrabajos VALUES(3, 9);
INSERT INTO AreasDeTrabajos VALUES(1, 10);
INSERT INTO AreasDeTrabajos VALUES(3, 10);
INSERT INTO AreasDeTrabajos VALUES(3, 11);
INSERT INTO AreasDeTrabajos VALUES(3, 12);
INSERT INTO AreasDeTrabajos VALUES(2, 13);
INSERT INTO AreasDeTrabajos VALUES(1, 14);
INSERT INTO AreasDeTrabajos VALUES(3, 14);
INSERT INTO AreasDeTrabajos VALUES(1, 15);
INSERT INTO AreasDeTrabajos VALUES(2, 15);
INSERT INTO AreasDeTrabajos VALUES(2, 16);
INSERT INTO AreasDeTrabajos VALUES(3, 16);
INSERT INTO AreasDeTrabajos VALUES(2, 17);
INSERT INTO AreasDeTrabajos VALUES(3, 17);
INSERT INTO AreasDeTrabajos VALUES(1, 18);
INSERT INTO AreasDeTrabajos VALUES(2, 18);
INSERT INTO AreasDeTrabajos VALUES(3, 18);
INSERT INTO AreasDeTrabajos VALUES(3, 19);
INSERT INTO AreasDeTrabajos VALUES(2, 20);
INSERT INTO AreasDeTrabajos VALUES(1, 21);
INSERT INTO AreasDeTrabajos VALUES(3, 21);
INSERT INTO AreasDeTrabajos VALUES(1, 22);
INSERT INTO AreasDeTrabajos VALUES(2, 22);
INSERT INTO AreasDeTrabajos VALUES(3, 22);
INSERT INTO AreasDeTrabajos VALUES(3, 23);
INSERT INTO AreasDeTrabajos VALUES(3, 24);
-- INSERT INTO AreasDeTrabajos VALUES(3, 25);  Roldán, Graciana
-- INSERT INTO AreasDeTrabajos VALUES(3, 26);  Martínez, Gimena
-- INSERT INTO AreasDeTrabajos VALUES(1, 27);  Pérez, Franco
-- INSERT INTO AreasDeTrabajos VALUES(2, 27);  Pérez, Franco
-- INSERT INTO AreasDeTrabajos VALUES(3, 27);  Pérez, Franco
-- INSERT INTO AreasDeTrabajos VALUES(3, 28);  Gallardo Grazio - González
INSERT INTO AreasDeTrabajos VALUES(3, 29);
INSERT INTO AreasDeTrabajos VALUES(2, 30);
INSERT INTO AreasDeTrabajos VALUES(3, 31);
INSERT INTO AreasDeTrabajos VALUES(3, 32);
INSERT INTO AreasDeTrabajos VALUES(1, 33);
INSERT INTO AreasDeTrabajos VALUES(2, 34);
INSERT INTO AreasDeTrabajos VALUES(1, 35);
INSERT INTO AreasDeTrabajos VALUES(1, 36);
INSERT INTO AreasDeTrabajos VALUES(2, 37);
INSERT INTO AreasDeTrabajos VALUES(3, 38);
INSERT INTO AreasDeTrabajos VALUES(3, 39);
INSERT INTO AreasDeTrabajos VALUES(1, 40);
INSERT INTO AreasDeTrabajos VALUES(3, 40);
INSERT INTO AreasDeTrabajos VALUES(1, 41);
INSERT INTO AreasDeTrabajos VALUES(2, 41);
INSERT INTO AreasDeTrabajos VALUES(3, 42);
INSERT INTO AreasDeTrabajos VALUES(3, 43);
INSERT INTO AreasDeTrabajos VALUES(3, 44);
INSERT INTO AreasDeTrabajos VALUES(3, 45);
INSERT INTO AreasDeTrabajos VALUES(3, 46);
INSERT INTO AreasDeTrabajos VALUES(2, 47);
INSERT INTO AreasDeTrabajos VALUES(3, 48);
INSERT INTO AreasDeTrabajos VALUES(1, 49);
INSERT INTO AreasDeTrabajos VALUES(3, 49);
INSERT INTO AreasDeTrabajos VALUES(3, 50);
INSERT INTO AreasDeTrabajos VALUES(3, 51);
INSERT INTO AreasDeTrabajos VALUES(2, 52);
INSERT INTO AreasDeTrabajos VALUES(1, 53);
INSERT INTO AreasDeTrabajos VALUES(3, 53);
-- INSERT INTO AreasDeTrabajos VALUES(1, 54); Balsells/José Liezún/Pace
-- INSERT INTO AreasDeTrabajos VALUES(3, 54); Balsells/José Liezún/Pace
INSERT INTO AreasDeTrabajos VALUES(3, 55);
INSERT INTO AreasDeTrabajos VALUES(1, 56);
INSERT INTO AreasDeTrabajos VALUES(3, 57);


INSERT INTO RolesEnTrabajos VALUES(1, 23662807, 'Tutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(1, 23517082, 'Cotutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(1, 23518045, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(1, 28883519, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(1, 12598702, 'Jurado', '2018-05-24', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(2, 23239465, 'Tutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(2, 16039418, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(2, 30117830, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(2, 28223267, 'Jurado', '2018-05-24', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(3, 20433775, 'Tutor', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(3, 29878607, 'Cotutor', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(3, 23518045, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(3, 10013664, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(3, 16039418, 'Jurado', '2015-12-15', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(4, 30117830, 'Tutor', '2017-04-03', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(4, 23518045, 'Jurado', '2017-04-03', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(4, 26923992, 'Jurado', '2017-04-03', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(4, 28476143, 'Jurado', '2017-04-03', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(5, 27650932, 'Tutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(5, 23517082, 'Cotutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(5, 23518045, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(5, 20433775, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(5, 13014668, 'Jurado', '2018-05-24', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(6, 17458321, 'Tutor', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(6, 10012916, 'Jurado', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(6, 12796743, 'Jurado', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(6, 23517968, 'Jurado', '2014-05-13', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(7, 23518045, 'Tutor', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(7, 10013664, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(7, 26923992, 'Jurado', '2018-05-24', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(7, 28476143, 'Jurado', '2018-05-24', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(8, 26923992, 'Tutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(8, 26485355, 'Cotutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(8, 23518045, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(8, 28883519, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(8, 28476143, 'Jurado', '2017-11-29', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(9, 23517082, 'Tutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(9, 13279734, 'Cotutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(9, 20433775, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(9, 26923992, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(9, 28476143, 'Jurado', '2017-11-29', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(10, 23930075, 'Tutor', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(10, 24340992, 'Cotutor', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(10, 16039418, 'Jurado', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(10, 30117830, 'Jurado', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(10, 23239465, 'Jurado', '2017-08-23', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(11, 26923992, 'Tutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(11, 26485355, 'Cotutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(11, 23518045, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(11, 28476143, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(11, 20433775, 'Jurado', '2017-07-05', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(12, 11909386, 'Tutor', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(12, 16039418, 'Jurado', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(12, 28883519, 'Jurado', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(12, 28476143, 'Jurado', '2017-07-04', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(13, 16039418, 'Tutor', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(13, 24340992, 'Cotutor', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(13, 23239465, 'Jurado', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(13, 30117830, 'Jurado', '2017-07-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(13, 11909386, 'Jurado', '2017-07-04', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(14, 12796743, 'Tutor', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(14, 27365680, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(14, 23517968, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(14, 10013664, 'Jurado', '2015-12-15', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(15, 16039418, 'Tutor', '2015-04-21', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(15, 08564856, 'Cotutor', '2015-04-21', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(15, 23239465, 'Jurado', '2015-04-21', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(15, 11007967, 'Jurado', '2015-04-21', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(15, 28223267, 'Jurado', '2015-04-21', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(16, 29878607, 'Tutor', '2017-12-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(16, 1029, 'Cotutor', '2017-12-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(16, 20433775, 'Jurado', '2017-12-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(16, 28476143, 'Jurado', '2017-12-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(16, 26485355, 'Jurado', '2017-12-13', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(17, 28222901, 'Tutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(17, 23930075, 'Cotutor', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(17, 16039418, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(17, 23239465, 'Jurado', '2017-11-29', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(17, 24340992, 'Jurado', '2017-11-29', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(18, 29997715, 'Tutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(18, 23518045, 'Cotutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(18, 10013664, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(18, 23517968, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(18, 26923992, 'Jurado', '2017-07-05', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(19, 13279734, 'Tutor', '2013-06-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(19, 23517082, 'Cotutor', '2013-06-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(19, 23518045, 'Jurado', '2013-06-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(19, 20433775, 'Jurado', '2013-06-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(19, 10993401, 'Jurado', '2013-06-27', '2016-09-08', 'Jubilación');
INSERT INTO RolesEnTrabajos VALUES(19, 28476143, 'Jurado', '2016-09-08', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(20, 28223267, 'Tutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(20, 30117830, 'Cotutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(20, 16039418, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(20, 23239465, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(20, 24340992, 'Jurado', '2017-07-05', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(21, 23517968, 'Tutor', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(21, 10013664, 'Cotutor', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(21, 27365680, 'Jurado', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(21, 14352785, 'Jurado', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(21, 28223959, 'Jurado', '2016-08-12', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(22, 10013664, 'Tutor', '2017-05-17', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(22, 23518045, 'Cotutor', '2017-05-17', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(22, 23517968, 'Jurado', '2017-05-17', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(22, 26923992, 'Jurado', '2017-05-17', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(22, 20433775, 'Jurado', '2017-05-17', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(23, 27365680, 'Tutor', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(23, 20433775, 'Jurado', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(23, 23518045, 'Jurado', '2016-08-12', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(23, 29878607, 'Jurado', '2016-08-12', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(24, 23517082, 'Tutor', '2015-12-09', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(24, 23518045, 'Jurado', '2015-12-09', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(24, 20433775, 'Jurado', '2015-12-09', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(24, 26923992, 'Jurado', '2015-12-09', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(25, 23518045, 'Tutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(25, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(25, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(25, , 'Jurado', '', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(26, 26923992, 'Tutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(26, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(26, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(26, , 'Jurado', '', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(27, 23517968, 'Tutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(27, 31505375, 'Cotutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(27, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(27, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(27, , 'Jurado', '', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(28, 30117830, 'Tutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(28, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(28, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(28, , 'Jurado', '', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(29, 27364012, 'Tutor', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(29, 28883519, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(29, 23518045, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(29, 28476143, 'Jurado', '2015-12-15', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(30, 10219453, 'Tutor', '2013-10-29', NULL, NULL);  Bazzano
-- INSERT INTO RolesEnTrabajos VALUES(30, , 'Jurado', '2013-10-29', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(30, , 'Jurado', '2013-10-29', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(30, , 'Jurado', '2013-10-29', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(31, 27365680, 'Tutor', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(31, 18168175, 'Cotutor', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(31, 20433775, 'Jurado', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(31, 29878607, 'Jurado', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(31, 23517968, 'Jurado', '2015-10-27', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(32, 26923992, 'Tutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(32, 30, 'Cotutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(32, 20433775, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(32, 23518045, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(32, 28883519, 'Jurado', '2016-12-06', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(33, 27365680, 'Tutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(33, 14561966, 'Cotutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(33, 10013664, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(33, 23116845, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(33, 23517968, 'Jurado', '2015-10-22', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(34, 27364012, 'Tutor', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(34, 23239465, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(34, 30117830, 'Jurado', '2017-07-05', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(34, 12622784, 'Jurado', '2017-07-05', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(35, 27365680, 'Tutor', '2017-10-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(35, 10013664, 'Jurado', '2017-10-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(35, 20433775, 'Jurado', '2017-10-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(35, 29878607, 'Jurado', '2017-10-02', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(36, 28223267, 'Tutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(36, 24340992, 'Cotutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(36, 23239465, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(36, 16039418, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(36, 30117830, 'Jurado', '2015-10-22', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(37, 23930075, 'Tutor', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(37, 24340992, 'Cotutor', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(37, 23239465, 'Jurado', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(37, 16039418, 'Jurado', '2014-05-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(37, 10219453, 'Jurado', '2014-05-13', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(38, 30117830, 'Tutor', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(38, 11909386, 'Jurado', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(38, 10013664, 'Jurado', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(38, 20433775, 'Jurado', '2016-06-02', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(39, 26923992, 'Tutor', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(39, 17578290, 'Cotutor', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(39, 23518045, 'Jurado', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(39, 28476143, 'Jurado', '2017-08-23', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(39, 20433775, 'Jurado', '2017-08-23', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(40, 27365680, 'Tutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(40, 18168175, 'Cotutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(40, 20433775, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(40, 29878607, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(40, 26923992, 'Jurado', '2016-12-06', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(41, 28223267, 'Tutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(41, 23517968, 'Cotutor', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(41, 23116845, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(41, 12796743, 'Jurado', '2016-12-06', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(41, 10013664, 'Jurado', '2016-12-06', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(42, 23517968, 'Tutor', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(42, 18168175, 'Cotutor', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(42, 20433775, 'Jurado', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(42, 29878607, 'Jurado', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(42, 10013664, 'Jurado', '2015-08-13', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(43, 27650932, 'Tutor', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(43, 32775706, 'Cotutor', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(43, 23518045, 'Jurado', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(43, 23517082, 'Jurado', '2015-10-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(43, 27365680, 'Jurado', '2015-10-27', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(44, 26923992, 'Tutor', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(44, 23518045, 'Jurado', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(44, 20433775, 'Jurado', '2015-08-13', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(44, 29878607, 'Jurado', '2015-08-13', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(45, 23517082, 'Tutor', '2014-11-11', '2015-11-10', 'Razones personales');
INSERT INTO RolesEnTrabajos VALUES(45, 23662807, 'Tutor', '2015-11-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(45, 16039418, 'Jurado', '2014-11-11', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(45, 29878607, 'Jurado', '2014-11-11', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(45, 23518045, 'Jurado', '2014-11-11', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(46, 30117830, 'Tutor', '2014-11-11', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(46, 29878607, 'Jurado', '2014-11-11', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(46, 28476143, 'Jurado', '2014-11-11', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(46, 23518045, 'Jurado', '2014-11-11', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(47, 28223267, 'Tutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(47, 30117830, 'Cotutor', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(47, 16039418, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(47, 23239465, 'Jurado', '2015-10-22', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(47, 24340992, 'Jurado', '2015-10-22', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(48, 30117830, 'Tutor', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(48, 23518045, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(48, 27365680, 'Jurado', '2015-12-15', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(48, 29878607, 'Jurado', '2015-12-15', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(49, 10013664, 'Tutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(49, 23517968, 'Cotutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(49, 27365680, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(49, 23116845, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(49, 12796743, 'Jurado', '2016-10-10', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(50, 23662807, 'Tutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(50, 27650932, 'Cotutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(50, 20433775, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(50, 23517082, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(50, 28883519, 'Jurado', '2016-10-10', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(51, 23662807, 'Tutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(51, 27650932, 'Cotutor', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(51, 20433775, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(51, 23517082, 'Jurado', '2016-10-10', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(51, 28883519, 'Jurado', '2016-10-10', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(52, 16039418, 'Tutor', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(52, 30117830, 'Jurado', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(52, 23239465, 'Jurado', '2016-06-02', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(52, 11909386, 'Jurado', '2016-06-02', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(53, 27365680, 'Tutor', '2015-09-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(53, 10013664, 'Jurado', '2015-09-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(53, 20433775, 'Jurado', '2015-09-27', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(53, 23517968, 'Jurado', '2015-09-27', NULL, NULL);

-- INSERT INTO RolesEnTrabajos VALUES(54, 23517968, 'Tutor', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(54, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(54, , 'Jurado', '', NULL, NULL);
-- INSERT INTO RolesEnTrabajos VALUES(54, , 'Jurado', '', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(55, 11909386, 'Tutor', '2016-08-19', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(55, 16039418, 'Jurado', '2016-08-19', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(55, 23239465, 'Jurado', '2016-08-19', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(55, 28222901, 'Jurado', '2016-08-19', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(56, 16039418, 'Tutor', '2015-12-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(56, 24802176, 'Cotutor', '2015-12-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(56, 23517968, 'Jurado', '2015-12-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(56, 12796743, 'Jurado', '2015-12-04', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(56, 10013664, 'Jurado', '2015-12-04', NULL, NULL);

INSERT INTO RolesEnTrabajos VALUES(57, 30117830, 'Tutor', '2015-12-14', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(57, 23518045, 'Jurado', '2015-12-14', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(57, 29878607, 'Jurado', '2015-12-14', NULL, NULL);
INSERT INTO RolesEnTrabajos VALUES(57, 26923992, 'Jurado', '2015-12-14', NULL, NULL);

INSERT INTO AlumnosEnTrabajos VALUES(1, 37497717, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(1, 37312195, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(2, 32408625, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(3, 30719537, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(3, 29334356, '2015-12-15', '2017-10-31', 'Razones personales');
INSERT INTO AlumnosEnTrabajos VALUES(4, 34604527, '2017-04-03', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(4, 33540077, '2017-04-03', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(5, 38184937, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(5, 37655938, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(6, 30357705, '2014-05-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(7, 33703650, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(7, 34133106, '2018-05-24', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(8, 33756926, '2017-11-29', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(8, 35809463, '2017-11-29', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(9, 32243732, '2017-11-29', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(10, 38509440, '2017-08-23', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(10, 38185470, '2017-08-23', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(11, 32569631, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(12, 33760555, '2017-07-04', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(13, 37504300, '2016-08-12', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(14, 29081056, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(14, 29835558, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(15, 22, '2015-04-21', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(15, 23, '2015-04-21', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(16, 29334356, '2017-12-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(17, 33628483, '2017-11-29', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(18, 33050649, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(18, 33756768, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(19, 26, '2013-06-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(19, 27, '2013-06-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(20, 30175915, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(20, 32207318, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(21, 36866277, '2016-08-12', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(21, 36865251, '2016-08-12', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(22, 34159181, '2017-05-17', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(22, 33971162, '2017-05-17', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(23, 37309622, '2016-08-12', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(24, 34603951, '2015-12-09', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(24, 35917837, '2015-12-09', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(25, 30919732, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(26, 35822926, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(27, 38248621, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(28, 34953697, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(28, 34286439, '', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(29, 31451758, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(29, 30072261, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(30, 28223166, '2013-10-29', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(31, 33567927, '2015-10-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(32, 30271112, '2016-12-06', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(33, 34133064, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(33, 31030183, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(33, 93909308, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(34, 29997259, '2017-07-05', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(35, 36551535, '2017-10-02', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(35, 36836896, '2017-10-02', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(36, 33922004, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(36, 29729479, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(37, 34185343, '2014-05-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(37, 33374831, '2014-05-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(38, 34348845, '2016-06-02', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(39, 33756689, '2017-08-23', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(40, 32459196, '2016-12-06', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(41, 37527908, '2016-12-06', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(42, 34764910, '2015-08-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(43, 34185948, '2015-10-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(43, 33884158, '2015-10-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(43, 34096422, '2015-10-27', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(44, 34603843, '2015-08-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(44, 35195464, '2015-08-13', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(45, 31001007, '2014-11-11', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(46, 33703030, '2014-11-11', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(47, 33391730, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(47, 33431455, '2015-10-22', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(48, 32460297, '2015-12-15', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(49, 37191010, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(49, 35256570, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(50, 37191647, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(50, 37636901, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(51, 37456013, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(51, 36867442, '2016-10-10', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(52, 34132393, '2016-06-02', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(53, 36865839, '2015-09-27', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(54, 39142069, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(54, 39574773, '', NULL, NULL);
-- INSERT INTO AlumnosEnTrabajos VALUES(54, 39478639, '', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(55, 33690456, '2016-08-19', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(56, 36838523, '2015-12-04', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(56, 36866011, '2015-12-04', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(56, 35199972, '2015-12-04', NULL, NULL);
INSERT INTO AlumnosEnTrabajos VALUES(57, 32116229, '2015-12-14', NULL, NULL);

-- delete from AlumnosEnTrabajos where dni in (5, 6, 14, 32, 33)