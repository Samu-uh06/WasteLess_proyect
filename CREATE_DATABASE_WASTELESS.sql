-- =============================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS
-- SISTEMA: WASTELESS
-- DBMS: SQL SERVER
-- VERSIÓN: 1.0
-- FECHA: 2026-03-25
-- =============================================

-- =============================================
-- 1. CREAR BASE DE DATOS
-- =============================================
USE master;
GO

-- Eliminar base de datos si existe (solo para desarrollo)
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'WasteLess')
BEGIN
    ALTER DATABASE WasteLess SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE WasteLess;
END
GO

-- Crear nueva base de datos
CREATE DATABASE WasteLess;
GO

USE WasteLess;
GO

-- =============================================
-- 2. CREAR TABLAS
-- =============================================

-- ---------------------------------------------
-- TABLA: EMPRESAS
-- Descripción: Empresas clientes y restaurantes
-- ---------------------------------------------
CREATE TABLE EMPRESAS (
    EmpresaID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(200) NOT NULL,
    Tipo NVARCHAR(50) NOT NULL CHECK (Tipo IN ('Cliente', 'Restaurante')),
    NIT NVARCHAR(50) NOT NULL UNIQUE,
    Ciudad NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(300) NULL,
    Contacto NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NULL,
    Telefono NVARCHAR(20) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activa' CHECK (Estado IN ('Activa', 'Inactiva')),
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),
    FechaModificacion DATETIME NULL
);
GO

-- ---------------------------------------------
-- TABLA: COMEDORES
-- Descripción: Comedores asociados a empresas
-- ---------------------------------------------
CREATE TABLE COMEDORES (
    ComedorID INT IDENTITY(1,1) PRIMARY KEY,
    EmpresaID INT NOT NULL,
    Nombre NVARCHAR(200) NOT NULL,
    Ubicacion NVARCHAR(300) NOT NULL,
    Capacidad INT NULL,
    HorarioServicio NVARCHAR(200) NULL,
    Responsable NVARCHAR(100) NULL,
    Telefono NVARCHAR(20) NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaModificacion DATETIME NULL,
    CONSTRAINT FK_Comedores_Empresas FOREIGN KEY (EmpresaID) REFERENCES EMPRESAS(EmpresaID)
);
GO

-- ---------------------------------------------
-- TABLA: PLATILLOS
-- Descripción: Catálogo de platillos
-- ---------------------------------------------
CREATE TABLE PLATILLOS (
    PlatilloID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(200) NOT NULL,
    Descripcion NVARCHAR(500) NULL,
    Categoria NVARCHAR(50) NOT NULL CHECK (Categoria IN ('Plato Fuerte', 'Ensalada', 'Sopa', 'Postre', 'Bebida', 'Desayuno')),
    Calorias INT NULL,
    ImagenURL NVARCHAR(500) NULL,
    Precio DECIMAL(10,2) NULL,
    Ingredientes NVARCHAR(1000) NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Disponible' CHECK (Estado IN ('Disponible', 'No Disponible')),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaModificacion DATETIME NULL
);
GO

-- ---------------------------------------------
-- TABLA: MENUS
-- Descripción: Menús semanales por comedor
-- ---------------------------------------------
CREATE TABLE MENUS (
    MenuID INT IDENTITY(1,1) PRIMARY KEY,
    ComedorID INT NOT NULL,
    Nombre NVARCHAR(200) NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Programado', 'Vencido')),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaModificacion DATETIME NULL,
    CONSTRAINT FK_Menus_Comedores FOREIGN KEY (ComedorID) REFERENCES COMEDORES(ComedorID),
    CONSTRAINT CHK_Menus_FechaValida CHECK (FechaFin >= FechaInicio)
);
GO

-- ---------------------------------------------
-- TABLA: MENU_PLATILLOS
-- Descripción: Relación entre menús y platillos
-- ---------------------------------------------
CREATE TABLE MENU_PLATILLOS (
    MenuPlatilloID INT IDENTITY(1,1) PRIMARY KEY,
    MenuID INT NOT NULL,
    PlatilloID INT NOT NULL,
    DiaSemana NVARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')),
    TipoComida NVARCHAR(20) NOT NULL CHECK (TipoComida IN ('Desayuno', 'Almuerzo', 'Cena')),
    FechaAsignacion DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_MenuPlatillos_Menus FOREIGN KEY (MenuID) REFERENCES MENUS(MenuID) ON DELETE CASCADE,
    CONSTRAINT FK_MenuPlatillos_Platillos FOREIGN KEY (PlatilloID) REFERENCES PLATILLOS(PlatilloID),
    CONSTRAINT UQ_MenuPlatillos_Dia_Comida UNIQUE (MenuID, DiaSemana, TipoComida, PlatilloID)
);
GO

-- ---------------------------------------------
-- TABLA: EMPLEADOS
-- Descripción: Empleados/trabajadores usuarios móviles
-- ---------------------------------------------
CREATE TABLE EMPLEADOS (
    EmpleadoID INT IDENTITY(1,1) PRIMARY KEY,
    EmpresaID INT NOT NULL,
    ComedorID INT NOT NULL,
    Nombre NVARCHAR(200) NOT NULL,
    Documento NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(150) NOT NULL,
    Telefono NVARCHAR(20) NULL,
    Cargo NVARCHAR(100) NULL,
    PasswordHash NVARCHAR(500) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),
    UltimoAcceso DATETIME NULL,
    CONSTRAINT FK_Empleados_Empresas FOREIGN KEY (EmpresaID) REFERENCES EMPRESAS(EmpresaID),
    CONSTRAINT FK_Empleados_Comedores FOREIGN KEY (ComedorID) REFERENCES COMEDORES(ComedorID)
);
GO

-- ---------------------------------------------
-- TABLA: PEDIDOS
-- Descripción: Pedidos de empleados
-- ---------------------------------------------
CREATE TABLE PEDIDOS (
    PedidoID INT IDENTITY(1,1) PRIMARY KEY,
    EmpleadoID INT NOT NULL,
    MenuID INT NOT NULL,
    ComedorID INT NOT NULL,
    FechaPedido DATETIME NOT NULL DEFAULT GETDATE(),
    SemanaInicio DATE NOT NULL,
    SemanaFin DATE NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Confirmado' CHECK (Estado IN ('Confirmado', 'En Producción', 'Completado', 'Entregado', 'Cancelado')),
    TotalComidas INT NOT NULL DEFAULT 0,
    FechaModificacion DATETIME NULL,
    CONSTRAINT FK_Pedidos_Empleados FOREIGN KEY (EmpleadoID) REFERENCES EMPLEADOS(EmpleadoID),
    CONSTRAINT FK_Pedidos_Menus FOREIGN KEY (MenuID) REFERENCES MENUS(MenuID),
    CONSTRAINT FK_Pedidos_Comedores FOREIGN KEY (ComedorID) REFERENCES COMEDORES(ComedorID),
    CONSTRAINT CHK_Pedidos_SemanaValida CHECK (SemanaFin >= SemanaInicio)
);
GO

-- ---------------------------------------------
-- TABLA: PEDIDO_DETALLES
-- Descripción: Detalles de comidas seleccionadas
-- ---------------------------------------------
CREATE TABLE PEDIDO_DETALLES (
    PedidoDetalleID INT IDENTITY(1,1) PRIMARY KEY,
    PedidoID INT NOT NULL,
    PlatilloID INT NOT NULL,
    DiaSemana NVARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')),
    TipoComida NVARCHAR(20) NOT NULL CHECK (TipoComida IN ('Desayuno', 'Almuerzo', 'Cena')),
    FechaSeleccion DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_PedidoDetalles_Pedidos FOREIGN KEY (PedidoID) REFERENCES PEDIDOS(PedidoID) ON DELETE CASCADE,
    CONSTRAINT FK_PedidoDetalles_Platillos FOREIGN KEY (PlatilloID) REFERENCES PLATILLOS(PlatilloID),
    CONSTRAINT UQ_PedidoDetalles_Dia_Comida UNIQUE (PedidoID, DiaSemana, TipoComida)
);
GO

-- ---------------------------------------------
-- TABLA: ORDENES_PRODUCCION
-- Descripción: Órdenes de producción para cocina
-- ---------------------------------------------
CREATE TABLE ORDENES_PRODUCCION (
    OrdenID INT IDENTITY(1,1) PRIMARY KEY,
    ComedorID INT NOT NULL,
    FechaProduccion DATE NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Pendiente' CHECK (Estado IN ('Pendiente', 'En Producción', 'Completada', 'Entregada')),
    TotalEmpleados INT NOT NULL DEFAULT 0,
    TotalPlatillos INT NOT NULL DEFAULT 0,
    Observaciones NVARCHAR(500) NULL,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaModificacion DATETIME NULL,
    CONSTRAINT FK_OrdenesProd_Comedores FOREIGN KEY (ComedorID) REFERENCES COMEDORES(ComedorID)
);
GO

-- ---------------------------------------------
-- TABLA: ORDEN_PLATILLOS
-- Descripción: Platillos consolidados en órdenes
-- ---------------------------------------------
CREATE TABLE ORDEN_PLATILLOS (
    OrdenPlatilloID INT IDENTITY(1,1) PRIMARY KEY,
    OrdenID INT NOT NULL,
    PlatilloID INT NOT NULL,
    Cantidad INT NOT NULL DEFAULT 0,
    DiaSemana NVARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')),
    TipoComida NVARCHAR(20) NOT NULL CHECK (TipoComida IN ('Desayuno', 'Almuerzo', 'Cena')),
    CONSTRAINT FK_OrdenPlatillos_Ordenes FOREIGN KEY (OrdenID) REFERENCES ORDENES_PRODUCCION(OrdenID) ON DELETE CASCADE,
    CONSTRAINT FK_OrdenPlatillos_Platillos FOREIGN KEY (PlatilloID) REFERENCES PLATILLOS(PlatilloID)
);
GO

-- ---------------------------------------------
-- TABLA: ROLES
-- Descripción: Roles de usuarios administrativos
-- ---------------------------------------------
CREATE TABLE ROLES (
    RolID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL UNIQUE,
    Descripcion NVARCHAR(300) NULL,
    Permisos NVARCHAR(MAX) NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- ---------------------------------------------
-- TABLA: USUARIOS
-- Descripción: Usuarios administrativos del panel web
-- ---------------------------------------------
CREATE TABLE USUARIOS (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    RolID INT NOT NULL,
    Nombre NVARCHAR(200) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    Estado NVARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    UltimoAcceso DATETIME NULL,
    FechaModificacion DATETIME NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (RolID) REFERENCES ROLES(RolID)
);
GO

-- =============================================
-- 3. CREAR ÍNDICES
-- =============================================

-- Índices para EMPRESAS
CREATE INDEX IX_Empresas_Estado ON EMPRESAS(Estado);
CREATE INDEX IX_Empresas_Tipo ON EMPRESAS(Tipo);
GO

-- Índices para COMEDORES
CREATE INDEX IX_Comedores_EmpresaID ON COMEDORES(EmpresaID);
CREATE INDEX IX_Comedores_Estado ON COMEDORES(Estado);
GO

-- Índices para PLATILLOS
CREATE INDEX IX_Platillos_Categoria ON PLATILLOS(Categoria);
CREATE INDEX IX_Platillos_Estado ON PLATILLOS(Estado);
GO

-- Índices para MENUS
CREATE INDEX IX_Menus_ComedorID ON MENUS(ComedorID);
CREATE INDEX IX_Menus_FechaInicio_FechaFin ON MENUS(FechaInicio, FechaFin);
CREATE INDEX IX_Menus_Estado ON MENUS(Estado);
GO

-- Índices para MENU_PLATILLOS
CREATE INDEX IX_MenuPlatillos_MenuID ON MENU_PLATILLOS(MenuID);
CREATE INDEX IX_MenuPlatillos_PlatilloID ON MENU_PLATILLOS(PlatilloID);
CREATE INDEX IX_MenuPlatillos_DiaSemana_TipoComida ON MENU_PLATILLOS(DiaSemana, TipoComida);
GO

-- Índices para EMPLEADOS
CREATE INDEX IX_Empleados_EmpresaID ON EMPLEADOS(EmpresaID);
CREATE INDEX IX_Empleados_ComedorID ON EMPLEADOS(ComedorID);
CREATE INDEX IX_Empleados_Documento ON EMPLEADOS(Documento);
CREATE INDEX IX_Empleados_Email ON EMPLEADOS(Email);
CREATE INDEX IX_Empleados_Estado ON EMPLEADOS(Estado);
GO

-- Índices para PEDIDOS
CREATE INDEX IX_Pedidos_EmpleadoID ON PEDIDOS(EmpleadoID);
CREATE INDEX IX_Pedidos_MenuID ON PEDIDOS(MenuID);
CREATE INDEX IX_Pedidos_ComedorID ON PEDIDOS(ComedorID);
CREATE INDEX IX_Pedidos_Estado ON PEDIDOS(Estado);
CREATE INDEX IX_Pedidos_FechaPedido ON PEDIDOS(FechaPedido);
CREATE INDEX IX_Pedidos_Semana ON PEDIDOS(SemanaInicio, SemanaFin);
GO

-- Índices para PEDIDO_DETALLES
CREATE INDEX IX_PedidoDetalles_PedidoID ON PEDIDO_DETALLES(PedidoID);
CREATE INDEX IX_PedidoDetalles_PlatilloID ON PEDIDO_DETALLES(PlatilloID);
GO

-- Índices para ORDENES_PRODUCCION
CREATE INDEX IX_OrdenesProd_ComedorID ON ORDENES_PRODUCCION(ComedorID);
CREATE INDEX IX_OrdenesProd_FechaProduccion ON ORDENES_PRODUCCION(FechaProduccion);
CREATE INDEX IX_OrdenesProd_Estado ON ORDENES_PRODUCCION(Estado);
GO

-- Índices para ORDEN_PLATILLOS
CREATE INDEX IX_OrdenPlatillos_OrdenID ON ORDEN_PLATILLOS(OrdenID);
CREATE INDEX IX_OrdenPlatillos_PlatilloID ON ORDEN_PLATILLOS(PlatilloID);
GO

-- Índices para USUARIOS
CREATE INDEX IX_Usuarios_RolID ON USUARIOS(RolID);
CREATE INDEX IX_Usuarios_Email ON USUARIOS(Email);
CREATE INDEX IX_Usuarios_Estado ON USUARIOS(Estado);
GO

-- =============================================
-- 4. CREAR TRIGGERS
-- =============================================

-- Trigger: Actualizar TotalComidas en PEDIDOS
CREATE TRIGGER trg_UpdateTotalComidas_After_PedidoDetalle
ON PEDIDO_DETALLES
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE p
    SET p.TotalComidas = (
        SELECT COUNT(*)
        FROM PEDIDO_DETALLES pd
        WHERE pd.PedidoID = p.PedidoID
    ),
    p.FechaModificacion = GETDATE()
    FROM PEDIDOS p
    WHERE p.PedidoID IN (
        SELECT DISTINCT PedidoID FROM inserted
        UNION
        SELECT DISTINCT PedidoID FROM deleted
    );
END;
GO

-- Trigger: Actualizar FechaModificacion en EMPRESAS
CREATE TRIGGER trg_UpdateFechaModificacion_Empresas
ON EMPRESAS
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE EMPRESAS
    SET FechaModificacion = GETDATE()
    WHERE EmpresaID IN (SELECT DISTINCT EmpresaID FROM inserted);
END;
GO

-- Trigger: Actualizar FechaModificacion en COMEDORES
CREATE TRIGGER trg_UpdateFechaModificacion_Comedores
ON COMEDORES
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE COMEDORES
    SET FechaModificacion = GETDATE()
    WHERE ComedorID IN (SELECT DISTINCT ComedorID FROM inserted);
END;
GO

-- Trigger: Actualizar FechaModificacion en PLATILLOS
CREATE TRIGGER trg_UpdateFechaModificacion_Platillos
ON PLATILLOS
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE PLATILLOS
    SET FechaModificacion = GETDATE()
    WHERE PlatilloID IN (SELECT DISTINCT PlatilloID FROM inserted);
END;
GO

-- Trigger: Actualizar FechaModificacion en MENUS
CREATE TRIGGER trg_UpdateFechaModificacion_Menus
ON MENUS
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE MENUS
    SET FechaModificacion = GETDATE()
    WHERE MenuID IN (SELECT DISTINCT MenuID FROM inserted);
END;
GO

-- Trigger: Actualizar FechaModificacion en USUARIOS
CREATE TRIGGER trg_UpdateFechaModificacion_Usuarios
ON USUARIOS
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE USUARIOS
    SET FechaModificacion = GETDATE()
    WHERE UsuarioID IN (SELECT DISTINCT UsuarioID FROM inserted);
END;
GO

-- =============================================
-- 5. DATOS INICIALES (SEED DATA)
-- =============================================

-- Insertar Roles predefinidos
INSERT INTO ROLES (Nombre, Descripcion, Permisos, Estado) VALUES
('Administrador', 'Acceso total al sistema', '{"dashboard": ["ver"], "usuarios": ["ver", "crear", "editar", "eliminar"], "platillos": ["ver", "crear", "editar", "eliminar"], "empresas": ["ver", "crear", "editar", "eliminar"], "comedores": ["ver", "crear", "editar", "eliminar"], "menus": ["ver", "crear", "editar", "eliminar"], "pedidos": ["ver", "gestionar"], "ordenes": ["ver", "crear", "gestionar"]}', 'Activo'),
('Gestor de Producción', 'Gestión de pedidos y órdenes de producción', '{"dashboard": ["ver"], "pedidos": ["ver", "gestionar"], "ordenes": ["ver", "crear", "gestionar"]}', 'Activo'),
('Usuario', 'Solo lectura', '{"dashboard": ["ver"], "usuarios": ["ver"], "platillos": ["ver"], "empresas": ["ver"], "comedores": ["ver"], "menus": ["ver"], "pedidos": ["ver"]}', 'Activo'),
('Cocinero', 'Gestión de órdenes de producción', '{"ordenes": ["ver", "gestionar"]}', 'Activo');
GO

-- Insertar Usuario Administrador por defecto
-- Contraseña: admin123 (debe ser hasheada en producción)
INSERT INTO USUARIOS (RolID, Nombre, Email, PasswordHash, Estado) VALUES
(1, 'Administrador', 'admin@wasteless.com', 'HASH_admin123', 'Activo');
GO

-- Insertar Empresas de ejemplo
INSERT INTO EMPRESAS (Nombre, Tipo, NIT, Ciudad, Direccion, Contacto, Email, Telefono, Estado) VALUES
('Ecopetrol S.A.', 'Cliente', '899.999.068-1', 'Bogotá', 'Cra 13 # 36-24', 'María Rodríguez', 'mrodriguez@ecopetrol.com.co', '+57 310 123 4567', 'Activa'),
('Bancolombia', 'Cliente', '890.903.938-8', 'Medellín', 'Cra 48 # 26-85', 'Carlos Gómez', 'cgomez@bancolombia.com.co', '+57 300 234 5678', 'Activa'),
('Avianca', 'Cliente', '890.704.196-6', 'Bogotá', 'Av. Eldorado # 93-30', 'Ana López', 'alopez@avianca.com', '+57 315 345 6789', 'Activa'),
('Restaurante El Buen Sabor', 'Restaurante', '900.123.456-7', 'Bogotá', 'Av. 68 # 75-50', 'Carlos Méndez', 'carlos@elsabor.com', '+57 300 456 8876', 'Activa');
GO

-- Insertar Comedores de ejemplo
INSERT INTO COMEDORES (EmpresaID, Nombre, Ubicacion, Capacidad, HorarioServicio, Responsable, Telefono, Estado) VALUES
(1, 'Comedor Central - Ecopetrol', 'Edificio Principal, Piso 1', 300, '7:00 AM - 6:00 PM', 'Lucia Martínez', '+57 310 111 2222', 'Activo'),
(1, 'Comedor Norte - Ecopetrol', 'Sede Norte, Piso 2', 150, '7:00 AM - 5:00 PM', 'Jorge Pérez', '+57 310 222 3333', 'Activo'),
(2, 'Comedor Principal - Bancolombia', 'Torre Central, Piso 3', 200, '6:30 AM - 7:00 PM', 'Sandra Torres', '+57 300 333 4444', 'Activo'),
(3, 'Comedor Ejecutivo - Avianca', 'Edificio Administrativo', 250, '6:00 AM - 8:00 PM', 'Miguel Ángel', '+57 315 444 5555', 'Activo');
GO

-- Insertar Platillos de ejemplo
INSERT INTO PLATILLOS (Nombre, Descripcion, Categoria, Calorias, ImagenURL, Precio, Ingredientes, Estado) VALUES
('Arroz con Pollo', 'Delicioso arroz con pollo, zanahoria y arvejas', 'Plato Fuerte', 450, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b', 12000, 'Arroz, Pollo, Zanahoria, Arvejas, Especias', 'Disponible'),
('Ensalada César', 'Ensalada fresca con lechuga, crutones y aderezo césar', 'Ensalada', 200, 'https://images.unsplash.com/photo-1546793665-c74683f339c1', 8000, 'Lechuga, Crutones, Queso parmesano, Aderezo césar', 'Disponible'),
('Sopa de Lentejas', 'Sopa casera de lentejas con verduras', 'Sopa', 180, 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 6000, 'Lentejas, Papa, Zanahoria, Apio, Especias', 'Disponible'),
('Bandeja Paisa', 'Tradicional bandeja paisa completa', 'Plato Fuerte', 850, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26', 18000, 'Frijoles, Arroz, Carne, Chicharrón, Huevo, Aguacate', 'Disponible'),
('Tiramisu', 'Postre italiano clásico', 'Postre', 320, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', 7000, 'Café, Queso mascarpone, Galletas, Cacao', 'Disponible'),
('Jugo Natural', 'Jugo natural de frutas variadas', 'Bebida', 80, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', 3000, 'Frutas frescas, Agua', 'Disponible'),
('Pescado al Horno', 'Filete de pescado al horno con vegetales', 'Plato Fuerte', 380, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', 15000, 'Pescado, Limón, Vegetales, Especias', 'Disponible'),
('Pasta Carbonara', 'Pasta con salsa carbonara cremosa', 'Plato Fuerte', 520, 'https://images.unsplash.com/photo-1612874742237-6526221588e3', 13000, 'Pasta, Crema, Tocino, Queso, Huevo', 'Disponible'),
('Huevos Revueltos', 'Huevos revueltos con tostadas', 'Desayuno', 250, 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 5000, 'Huevos, Mantequilla, Sal, Pimienta', 'Disponible'),
('Arepas con Queso', 'Arepas tradicionales rellenas de queso', 'Desayuno', 300, 'https://images.unsplash.com/photo-1626266061368-46a8f578ddd6', 4000, 'Harina de maíz, Queso, Mantequilla', 'Disponible'),
('Café con Leche', 'Café colombiano con leche', 'Bebida', 60, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 2500, 'Café, Leche, Azúcar', 'Disponible'),
('Pan Tostado', 'Pan integral tostado', 'Desayuno', 150, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 2000, 'Pan integral, Mantequilla', 'Disponible');
GO

-- Insertar Empleado de prueba
-- Contraseña: empleado123 (debe ser hasheada en producción)
INSERT INTO EMPLEADOS (EmpresaID, ComedorID, Nombre, Documento, Email, Telefono, Cargo, PasswordHash, Estado) VALUES
(1, 1, 'Carlos Andrés Pérez', '1234567890', 'carlos.perez@ecopetrol.com', '+57 300 123 4567', 'Ingeniero de Producción', 'HASH_empleado123', 'Activo');
GO

-- =============================================
-- 6. VISTAS ÚTILES
-- =============================================

-- Vista: Información completa de comedores con empresa
CREATE VIEW vw_Comedores_Completo AS
SELECT 
    c.ComedorID,
    c.Nombre AS ComedorNombre,
    c.Ubicacion,
    c.Capacidad,
    c.HorarioServicio,
    c.Responsable,
    c.Telefono,
    c.Estado AS ComedorEstado,
    e.EmpresaID,
    e.Nombre AS EmpresaNombre,
    e.Tipo AS EmpresaTipo,
    e.Ciudad AS EmpresaCiudad
FROM COMEDORES c
INNER JOIN EMPRESAS e ON c.EmpresaID = e.EmpresaID;
GO

-- Vista: Pedidos con información del empleado
CREATE VIEW vw_Pedidos_Completo AS
SELECT 
    p.PedidoID,
    p.FechaPedido,
    p.SemanaInicio,
    p.SemanaFin,
    p.Estado AS PedidoEstado,
    p.TotalComidas,
    emp.EmpleadoID,
    emp.Nombre AS EmpleadoNombre,
    emp.Documento AS EmpleadoDocumento,
    emp.Email AS EmpleadoEmail,
    emp.Cargo AS EmpleadoCargo,
    c.ComedorID,
    c.Nombre AS ComedorNombre,
    e.EmpresaID,
    e.Nombre AS EmpresaNombre,
    m.MenuID,
    m.Nombre AS MenuNombre
FROM PEDIDOS p
INNER JOIN EMPLEADOS emp ON p.EmpleadoID = emp.EmpleadoID
INNER JOIN COMEDORES c ON p.ComedorID = c.ComedorID
INNER JOIN EMPRESAS e ON emp.EmpresaID = e.EmpresaID
INNER JOIN MENUS m ON p.MenuID = m.MenuID;
GO

-- Vista: Menús con información del comedor
CREATE VIEW vw_Menus_Completo AS
SELECT 
    m.MenuID,
    m.Nombre AS MenuNombre,
    m.FechaInicio,
    m.FechaFin,
    m.Estado AS MenuEstado,
    c.ComedorID,
    c.Nombre AS ComedorNombre,
    e.EmpresaID,
    e.Nombre AS EmpresaNombre,
    (SELECT COUNT(*) FROM MENU_PLATILLOS mp WHERE mp.MenuID = m.MenuID) AS TotalPlatillos
FROM MENUS m
INNER JOIN COMEDORES c ON m.ComedorID = c.ComedorID
INNER JOIN EMPRESAS e ON c.EmpresaID = e.EmpresaID;
GO

-- =============================================
-- 7. PROCEDIMIENTOS ALMACENADOS ÚTILES
-- =============================================

-- SP: Obtener menú completo con platillos
CREATE PROCEDURE sp_ObtenerMenuCompleto
    @MenuID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Información del menú
    SELECT 
        m.MenuID,
        m.Nombre,
        m.FechaInicio,
        m.FechaFin,
        m.Estado,
        c.Nombre AS ComedorNombre,
        e.Nombre AS EmpresaNombre
    FROM MENUS m
    INNER JOIN COMEDORES c ON m.ComedorID = c.ComedorID
    INNER JOIN EMPRESAS e ON c.EmpresaID = e.EmpresaID
    WHERE m.MenuID = @MenuID;
    
    -- Platillos del menú
    SELECT 
        mp.DiaSemana,
        mp.TipoComida,
        p.PlatilloID,
        p.Nombre,
        p.Descripcion,
        p.Categoria,
        p.Calorias,
        p.ImagenURL
    FROM MENU_PLATILLOS mp
    INNER JOIN PLATILLOS p ON mp.PlatilloID = p.PlatilloID
    WHERE mp.MenuID = @MenuID
    ORDER BY 
        CASE mp.DiaSemana
            WHEN 'Lunes' THEN 1
            WHEN 'Martes' THEN 2
            WHEN 'Miércoles' THEN 3
            WHEN 'Jueves' THEN 4
            WHEN 'Viernes' THEN 5
            WHEN 'Sábado' THEN 6
        END,
        CASE mp.TipoComida
            WHEN 'Desayuno' THEN 1
            WHEN 'Almuerzo' THEN 2
            WHEN 'Cena' THEN 3
        END;
END;
GO

-- SP: Obtener pedido completo con detalles
CREATE PROCEDURE sp_ObtenerPedidoCompleto
    @PedidoID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Información del pedido
    SELECT * FROM vw_Pedidos_Completo WHERE PedidoID = @PedidoID;
    
    -- Detalles del pedido
    SELECT 
        pd.DiaSemana,
        pd.TipoComida,
        p.PlatilloID,
        p.Nombre,
        p.Descripcion,
        p.Categoria,
        p.Calorias
    FROM PEDIDO_DETALLES pd
    INNER JOIN PLATILLOS p ON pd.PlatilloID = p.PlatilloID
    WHERE pd.PedidoID = @PedidoID
    ORDER BY 
        CASE pd.DiaSemana
            WHEN 'Lunes' THEN 1
            WHEN 'Martes' THEN 2
            WHEN 'Miércoles' THEN 3
            WHEN 'Jueves' THEN 4
            WHEN 'Viernes' THEN 5
            WHEN 'Sábado' THEN 6
        END,
        CASE pd.TipoComida
            WHEN 'Desayuno' THEN 1
            WHEN 'Almuerzo' THEN 2
            WHEN 'Cena' THEN 3
        END;
END;
GO

-- SP: Consolidar pedidos en orden de producción
CREATE PROCEDURE sp_ConsolidarOrdenProduccion
    @ComedorID INT,
    @FechaProduccion DATE,
    @OrdenID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- Crear orden de producción
        INSERT INTO ORDENES_PRODUCCION (ComedorID, FechaProduccion, Estado)
        VALUES (@ComedorID, @FechaProduccion, 'Pendiente');
        
        SET @OrdenID = SCOPE_IDENTITY();
        
        -- Consolidar platillos de pedidos confirmados
        INSERT INTO ORDEN_PLATILLOS (OrdenID, PlatilloID, Cantidad, DiaSemana, TipoComida)
        SELECT 
            @OrdenID,
            pd.PlatilloID,
            COUNT(*) AS Cantidad,
            pd.DiaSemana,
            pd.TipoComida
        FROM PEDIDO_DETALLES pd
        INNER JOIN PEDIDOS p ON pd.PedidoID = p.PedidoID
        WHERE p.ComedorID = @ComedorID
            AND p.Estado = 'Confirmado'
            AND p.SemanaInicio = @FechaProduccion
        GROUP BY pd.PlatilloID, pd.DiaSemana, pd.TipoComida;
        
        -- Actualizar totales de la orden
        UPDATE ORDENES_PRODUCCION
        SET 
            TotalPlatillos = (SELECT SUM(Cantidad) FROM ORDEN_PLATILLOS WHERE OrdenID = @OrdenID),
            TotalEmpleados = (
                SELECT COUNT(DISTINCT p.EmpleadoID)
                FROM PEDIDOS p
                WHERE p.ComedorID = @ComedorID
                    AND p.Estado = 'Confirmado'
                    AND p.SemanaInicio = @FechaProduccion
            )
        WHERE OrdenID = @OrdenID;
        
        -- Actualizar estado de pedidos a "En Producción"
        UPDATE PEDIDOS
        SET Estado = 'En Producción'
        WHERE ComedorID = @ComedorID
            AND Estado = 'Confirmado'
            AND SemanaInicio = @FechaProduccion;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- =============================================
-- 8. MENSAJES FINALES
-- =============================================

PRINT '=============================================';
PRINT 'BASE DE DATOS WASTELESS CREADA EXITOSAMENTE';
PRINT '=============================================';
PRINT '';
PRINT 'Tablas creadas: 12';
PRINT 'Índices creados: 23';
PRINT 'Triggers creados: 5';
PRINT 'Vistas creadas: 3';
PRINT 'Procedimientos almacenados: 3';
PRINT '';
PRINT 'Datos de prueba insertados:';
PRINT '- Roles: 4';
PRINT '- Usuarios: 1 (admin@wasteless.com)';
PRINT '- Empresas: 4';
PRINT '- Comedores: 4';
PRINT '- Platillos: 12';
PRINT '- Empleados: 1 (Documento: 1234567890)';
PRINT '';
PRINT '=============================================';
GO


-- ============================================================
-- MIGRACIÓN DE BASE DE DATOS
-- Archivo: MIGRATION_ADD_PASSWORD_FIELDS.sql
--
-- Agrega los campos necesarios para el manejo de contraseña temporal
-- y el primer inicio de sesión.
-- Ejecutar UNA SOLA VEZ sobre la base de datos existente.
-- ============================================================
 
-- 1. Agregar campo para rastrear si el usuario debe cambiar su contraseña
ALTER TABLE USUARIOS
ADD RequiereCambioContrasena BIT NOT NULL DEFAULT 1;
-- DEFAULT 1 = todos los usuarios existentes deberán cambiar contraseña
-- (Puedes cambiar a DEFAULT 0 si solo quieres aplicarlo a nuevos usuarios)
 
-- 2. Comentario descriptivo (opcional, SQL Server)
-- EXEC sp_addextendedproperty
--   @name = N'MS_Description',
--   @value = N'Indica si el usuario debe cambiar su contraseña en el próximo inicio de sesión',
--   @level0type = N'SCHEMA', @level0name = N'dbo',
--   @level1type = N'TABLE',  @level1name = N'USUARIOS',
--   @level2type = N'COLUMN', @level2name = N'RequiereCambioContrasena';
 
-- 3. Para usuarios existentes que NO deben ser forzados a cambiar:
UPDATE USUARIOS
SET RequiereCambioContrasena = 0
WHERE Estado = 'Activo';
-- Ajusta el WHERE según tu lógica de negocio
 
-- ============================================================
-- PROCEDIMIENTO ALMACENADO: Registrar nuevo usuario con contraseña temporal
-- (Opcional, si quieres mover la lógica al backend/DB)
-- ============================================================
CREATE OR ALTER PROCEDURE sp_CrearUsuarioConContrasenaTemp
    @Documento       NVARCHAR(20),
    @TipoDocumento   NVARCHAR(10),
    @Nombre          NVARCHAR(100),
    @Apellido        NVARCHAR(100),
    @Email           NVARCHAR(100),
    @Telefono        NVARCHAR(20),
    @EmpresaID       INT,
    @RolID           INT,
    @PasswordHash    NVARCHAR(500)   -- Hash de la contraseña temporal
AS
BEGIN
    SET NOCOUNT ON;
 
    INSERT INTO USUARIOS (
        Documento, TipoDocumento, Nombre, Apellido,
        Email, Telefono, EmpresaID, RolID,
        PasswordHash, Estado, RequiereCambioContrasena, FechaCreacion
    )
    VALUES (
        @Documento, @TipoDocumento, @Nombre, @Apellido,
        @Email, @Telefono, @EmpresaID, @RolID,
        @PasswordHash, 'Activo', 1, GETDATE()
    );
 
    SELECT SCOPE_IDENTITY() AS NuevoUsuarioID;
END;
GO
 
-- ============================================================
-- PROCEDIMIENTO ALMACENADO: Cambiar contraseña (primer login)
-- ============================================================
CREATE OR ALTER PROCEDURE sp_CambiarContrasena
    @UsuarioID    INT,
    @NuevoHash    NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
 
    UPDATE USUARIOS
    SET
        PasswordHash              = @NuevoHash,
        RequiereCambioContrasena  = 0,
        FechaModificacion         = GETDATE()
    WHERE UsuarioID = @UsuarioID;
END;
GO