# 🗄️ ESTRUCTURA DE BASE DE DATOS - WASTELESS (SQL SERVER)

## 📊 DIAGRAMA DE ENTIDAD-RELACIÓN

```
┌─────────────────┐
│     EMPRESAS    │
│─────────────────│
│ PK: EmpresaID   │
│ Nombre          │
│ Tipo            │
│ NIT             │
│ Ciudad          │
│ ...             │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────▼────────┐       ┌─────────────────┐
│    COMEDORES    │   N   │    EMPLEADOS    │
│─────────────────│◄──────┤─────────────────│
│ PK: ComedorID   │       │ PK: EmpleadoID  │
│ FK: EmpresaID   │       │ FK: ComedorID   │
│ Nombre          │       │ FK: EmpresaID   │
│ Ubicacion       │       │ Nombre          │
│ Capacidad       │       │ Documento       │
│ ...             │       │ Email           │
└────────┬────────┘       │ ...             │
         │ 1              └────────┬────────┘
         │                         │ 1
         │                         │
         │ N                       │ N
┌────────▼────────┐       ┌────────▼────────┐
│      MENUS      │       │     PEDIDOS     │
│─────────────────│       │─────────────────│
│ PK: MenuID      │   1   │ PK: PedidoID    │
│ FK: ComedorID   │◄──────┤ FK: EmpleadoID  │
│ Nombre          │       │ FK: MenuID      │
│ FechaInicio     │       │ FK: ComedorID   │
│ FechaFin        │       │ Fecha           │
│ Estado          │       │ Estado          │
└────────┬────────┘       │ TotalComidas    │
         │                └────────┬────────┘
         │ 1                       │ 1
         │                         │
         │ N                       │ N
┌────────▼────────┐       ┌────────▼────────┐
│ MENU_PLATILLOS  │       │PEDIDO_DETALLES  │
│─────────────────│       │─────────────────│
│PK:MenuPlatilloID│       │PK:PedidoDetID   │
│ FK: MenuID      │       │ FK: PedidoID    │
│ FK: PlatilloID  │       │ FK: PlatilloID  │
│ DiaSemana       │       │ DiaSemana       │
│ TipoComida      │       │ TipoComida      │
└────────┬────────┘       └────────┬────────┘
         │ N                       │ N
         │                         │
         │ 1                       │ 1
┌────────▼──────────────────────────▼────────┐
│              PLATILLOS                     │
│────────────────────────────────────────────│
│ PK: PlatilloID                             │
│ Nombre                                     │
│ Descripcion                                │
│ Categoria                                  │
│ Calorias                                   │
│ ImagenURL                                  │
│ Precio                                     │
│ Ingredientes                               │
│ Estado                                     │
└────────────────────────────────────────────┘

┌─────────────────┐       ┌─────────────────┐
│    USUARIOS     │   N   │      ROLES      │
│─────────────────│──────►│─────────────────│
│ PK: UsuarioID   │   1   │ PK: RolID       │
│ FK: RolID       │       │ Nombre          │
│ Nombre          │       │ Descripcion     │
│ Email           │       │ Permisos        │
│ Password        │       └─────────────────┘
│ Estado          │
└─────────────────┘

┌──────────────────┐      ┌──────────────────┐
│ORDENES_PRODUCCION│  1   │ ORDEN_PLATILLOS  │
│──────────────────│◄─────┤──────────────────│
│PK: OrdenID       │      │PK:OrdenPlatilloID│
│FK: ComedorID     │  N   │ FK: OrdenID      │
│ Fecha            │      │ FK: PlatilloID   │
│ Estado           │      │ Cantidad         │
│ TotalEmpleados   │      └──────────────────┘
└──────────────────┘
```

---

## 📋 TABLAS Y CAMPOS DETALLADOS

### **1. EMPRESAS**
Almacena las empresas clientes y restaurantes del sistema.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| EmpresaID        | INT           | Identificador único de la empresa              | PK, IDENTITY(1,1)       |
| Nombre           | NVARCHAR(200) | Nombre de la empresa                           | NOT NULL                |
| Tipo             | NVARCHAR(50)  | Tipo: 'Cliente' o 'Restaurante'                | NOT NULL, CHECK         |
| NIT              | NVARCHAR(50)  | Número de identificación tributaria            | NOT NULL, UNIQUE        |
| Ciudad           | NVARCHAR(100) | Ciudad donde se ubica                          | NOT NULL                |
| Direccion        | NVARCHAR(300) | Dirección física                               | NULL                    |
| Contacto         | NVARCHAR(100) | Nombre del contacto principal                  | NOT NULL                |
| Email            | NVARCHAR(150) | Email de contacto                              | NULL                    |
| Telefono         | NVARCHAR(20)  | Teléfono de contacto                           | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado: 'Activa' o 'Inactiva'                  | NOT NULL, DEFAULT       |
| FechaRegistro    | DATETIME      | Fecha de registro en el sistema                | DEFAULT GETDATE()       |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Relaciones:**
- 1 Empresa → N Comedores
- 1 Empresa → N Empleados

---

### **2. COMEDORES**
Comedores asociados a empresas donde los empleados consumen alimentos.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| ComedorID        | INT           | Identificador único del comedor                | PK, IDENTITY(1,1)       |
| EmpresaID        | INT           | ID de la empresa a la que pertenece            | FK → EMPRESAS, NOT NULL |
| Nombre           | NVARCHAR(200) | Nombre del comedor                             | NOT NULL                |
| Ubicacion        | NVARCHAR(300) | Dirección o ubicación del comedor              | NOT NULL                |
| Capacidad        | INT           | Capacidad máxima de personas                   | NULL                    |
| HorarioServicio  | NVARCHAR(200) | Horarios de atención (ej: "7am-6pm")           | NULL                    |
| Responsable      | NVARCHAR(100) | Nombre del responsable del comedor             | NULL                    |
| Telefono         | NVARCHAR(20)  | Teléfono del comedor                           | NULL                    |
| Estado           | NVARCHAR(20)  | Estado: 'Activo' o 'Inactivo'                  | NOT NULL, DEFAULT       |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Relaciones:**
- N Comedores → 1 Empresa
- 1 Comedor → N Menús
- 1 Comedor → N Empleados
- 1 Comedor → N Pedidos
- 1 Comedor → N Órdenes de Producción

---

### **3. PLATILLOS**
Catálogo de platillos disponibles en el sistema.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| PlatilloID       | INT           | Identificador único del platillo               | PK, IDENTITY(1,1)       |
| Nombre           | NVARCHAR(200) | Nombre del platillo                            | NOT NULL                |
| Descripcion      | NVARCHAR(500) | Descripción del platillo                       | NULL                    |
| Categoria        | NVARCHAR(50)  | Categoría del platillo                         | NOT NULL, CHECK         |
| Calorias         | INT           | Calorías del platillo                          | NULL                    |
| ImagenURL        | NVARCHAR(500) | URL de la imagen del platillo                  | NULL                    |
| Precio           | DECIMAL(10,2) | Precio del platillo                            | NULL                    |
| Ingredientes     | NVARCHAR(1000)| Lista de ingredientes (texto o JSON)           | NULL                    |
| Estado           | NVARCHAR(20)  | Estado: 'Disponible' o 'No Disponible'         | NOT NULL, DEFAULT       |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Categorías válidas:**
- 'Plato Fuerte'
- 'Ensalada'
- 'Sopa'
- 'Postre'
- 'Bebida'
- 'Desayuno'

**Relaciones:**
- 1 Platillo → N MenuPlatillos
- 1 Platillo → N PedidoDetalles
- 1 Platillo → N OrdenPlatillos

---

### **4. MENUS**
Menús semanales configurados para cada comedor.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| MenuID           | INT           | Identificador único del menú                   | PK, IDENTITY(1,1)       |
| ComedorID        | INT           | ID del comedor al que pertenece                | FK → COMEDORES, NOT NULL|
| Nombre           | NVARCHAR(200) | Nombre del menú                                | NOT NULL                |
| FechaInicio      | DATE          | Fecha de inicio de la semana                   | NOT NULL                |
| FechaFin         | DATE          | Fecha de fin de la semana                      | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado: 'Activo', 'Programado', 'Vencido'      | NOT NULL, DEFAULT       |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Relaciones:**
- N Menús → 1 Comedor
- 1 Menú → N MenuPlatillos
- 1 Menú → N Pedidos

---

### **5. MENU_PLATILLOS**
Tabla intermedia que relaciona menús con platillos (muchos a muchos).
Define qué platillos están disponibles en qué día y tipo de comida.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| MenuPlatilloID   | INT           | Identificador único del registro               | PK, IDENTITY(1,1)       |
| MenuID           | INT           | ID del menú                                    | FK → MENUS, NOT NULL    |
| PlatilloID       | INT           | ID del platillo                                | FK → PLATILLOS, NOT NULL|
| DiaSemana        | NVARCHAR(20)  | Día de la semana                               | NOT NULL, CHECK         |
| TipoComida       | NVARCHAR(20)  | Tipo de comida                                 | NOT NULL, CHECK         |
| FechaAsignacion  | DATETIME      | Fecha de asignación                            | DEFAULT GETDATE()       |

**Días válidos:**
- 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'

**Tipos de comida válidos:**
- 'Desayuno', 'Almuerzo', 'Cena'

**Relaciones:**
- N MenuPlatillos → 1 Menú
- N MenuPlatillos → 1 Platillo

**Restricción única:**
- Un menú no puede tener el mismo platillo en el mismo día y tipo de comida
- UNIQUE (MenuID, DiaSemana, TipoComida, PlatilloID)

---

### **6. EMPLEADOS**
Usuarios de la aplicación móvil (trabajadores de las empresas).

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| EmpleadoID       | INT           | Identificador único del empleado               | PK, IDENTITY(1,1)       |
| EmpresaID        | INT           | ID de la empresa donde trabaja                 | FK → EMPRESAS, NOT NULL |
| ComedorID        | INT           | ID del comedor asignado                        | FK → COMEDORES, NOT NULL|
| Nombre           | NVARCHAR(200) | Nombre completo del empleado                   | NOT NULL                |
| Documento        | NVARCHAR(50)  | Número de documento de identidad               | NOT NULL, UNIQUE        |
| Email            | NVARCHAR(150) | Email corporativo                              | NOT NULL                |
| Telefono         | NVARCHAR(20)  | Teléfono de contacto                           | NULL                    |
| Cargo            | NVARCHAR(100) | Cargo o puesto de trabajo                      | NULL                    |
| PasswordHash     | NVARCHAR(500) | Contraseña encriptada                          | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado: 'Activo' o 'Inactivo'                  | NOT NULL, DEFAULT       |
| FechaRegistro    | DATETIME      | Fecha de registro en el sistema                | DEFAULT GETDATE()       |
| UltimoAcceso     | DATETIME      | Última fecha de inicio de sesión               | NULL                    |

**Relaciones:**
- N Empleados → 1 Empresa
- N Empleados → 1 Comedor
- 1 Empleado → N Pedidos

---

### **7. PEDIDOS**
Pedidos realizados por los empleados desde la app móvil.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| PedidoID         | INT           | Identificador único del pedido                 | PK, IDENTITY(1,1)       |
| EmpleadoID       | INT           | ID del empleado que realizó el pedido          | FK → EMPLEADOS, NOT NULL|
| MenuID           | INT           | ID del menú seleccionado                       | FK → MENUS, NOT NULL    |
| ComedorID        | INT           | ID del comedor                                 | FK → COMEDORES, NOT NULL|
| FechaPedido      | DATETIME      | Fecha y hora del pedido                        | DEFAULT GETDATE()       |
| SemanaInicio     | DATE          | Fecha de inicio de la semana del pedido        | NOT NULL                |
| SemanaFin        | DATE          | Fecha de fin de la semana del pedido           | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado del pedido                              | NOT NULL, DEFAULT       |
| TotalComidas     | INT           | Total de comidas seleccionadas                 | NOT NULL, DEFAULT 0     |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Estados válidos:**
- 'Confirmado'
- 'En Producción'
- 'Completado'
- 'Entregado'
- 'Cancelado'

**Relaciones:**
- N Pedidos → 1 Empleado
- N Pedidos → 1 Menú
- N Pedidos → 1 Comedor
- 1 Pedido → N PedidoDetalles

---

### **8. PEDIDO_DETALLES**
Detalles de las comidas seleccionadas por el empleado en su pedido.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| PedidoDetalleID  | INT           | Identificador único del detalle                | PK, IDENTITY(1,1)       |
| PedidoID         | INT           | ID del pedido                                  | FK → PEDIDOS, NOT NULL  |
| PlatilloID       | INT           | ID del platillo seleccionado                   | FK → PLATILLOS, NOT NULL|
| DiaSemana        | NVARCHAR(20)  | Día de la semana                               | NOT NULL, CHECK         |
| TipoComida       | NVARCHAR(20)  | Tipo de comida                                 | NOT NULL, CHECK         |
| FechaSeleccion   | DATETIME      | Fecha de selección                             | DEFAULT GETDATE()       |

**Días válidos:**
- 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'

**Tipos de comida válidos:**
- 'Desayuno', 'Almuerzo', 'Cena'

**Relaciones:**
- N PedidoDetalles → 1 Pedido
- N PedidoDetalles → 1 Platillo

**Restricción única:**
- Un pedido no puede tener dos platillos para el mismo día y tipo de comida
- UNIQUE (PedidoID, DiaSemana, TipoComida)

---

### **9. ORDENES_PRODUCCION**
Órdenes de producción consolidadas para la cocina.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| OrdenID          | INT           | Identificador único de la orden                | PK, IDENTITY(1,1)       |
| ComedorID        | INT           | ID del comedor                                 | FK → COMEDORES, NOT NULL|
| FechaProduccion  | DATE          | Fecha de producción                            | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado de la orden                             | NOT NULL, DEFAULT       |
| TotalEmpleados   | INT           | Total de empleados incluidos                   | NOT NULL, DEFAULT 0     |
| TotalPlatillos   | INT           | Total de platillos a producir                  | NOT NULL, DEFAULT 0     |
| Observaciones    | NVARCHAR(500) | Observaciones o notas                          | NULL                    |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Estados válidos:**
- 'Pendiente'
- 'En Producción'
- 'Completada'
- 'Entregada'

**Relaciones:**
- N Órdenes → 1 Comedor
- 1 Orden → N OrdenPlatillos

---

### **10. ORDEN_PLATILLOS**
Platillos consolidados por cantidad en cada orden de producción.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| OrdenPlatilloID  | INT           | Identificador único del registro               | PK, IDENTITY(1,1)       |
| OrdenID          | INT           | ID de la orden de producción                   | FK → ORDENES, NOT NULL  |
| PlatilloID       | INT           | ID del platillo                                | FK → PLATILLOS, NOT NULL|
| Cantidad         | INT           | Cantidad total a producir                      | NOT NULL, DEFAULT 0     |
| DiaSemana        | NVARCHAR(20)  | Día para el que se produce                     | NOT NULL, CHECK         |
| TipoComida       | NVARCHAR(20)  | Tipo de comida                                 | NOT NULL, CHECK         |

**Días válidos:**
- 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'

**Tipos de comida válidos:**
- 'Desayuno', 'Almuerzo', 'Cena'

**Relaciones:**
- N OrdenPlatillos → 1 Orden
- N OrdenPlatillos → 1 Platillo

---

### **11. USUARIOS**
Usuarios administrativos del sistema web (no empleados).

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| UsuarioID        | INT           | Identificador único del usuario                | PK, IDENTITY(1,1)       |
| RolID            | INT           | ID del rol asignado                            | FK → ROLES, NOT NULL    |
| Nombre           | NVARCHAR(200) | Nombre completo del usuario                    | NOT NULL                |
| Email            | NVARCHAR(150) | Email de acceso                                | NOT NULL, UNIQUE        |
| PasswordHash     | NVARCHAR(500) | Contraseña encriptada                          | NOT NULL                |
| Estado           | NVARCHAR(20)  | Estado: 'Activo' o 'Inactivo'                  | NOT NULL, DEFAULT       |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |
| UltimoAcceso     | DATETIME      | Última fecha de inicio de sesión               | NULL                    |
| FechaModificacion| DATETIME      | Última fecha de modificación                   | NULL                    |

**Relaciones:**
- N Usuarios → 1 Rol

---

### **12. ROLES**
Roles de usuario para el sistema administrativo.

| Campo            | Tipo          | Descripción                                    | Restricciones           |
|------------------|---------------|------------------------------------------------|-------------------------|
| RolID            | INT           | Identificador único del rol                    | PK, IDENTITY(1,1)       |
| Nombre           | NVARCHAR(100) | Nombre del rol                                 | NOT NULL, UNIQUE        |
| Descripcion      | NVARCHAR(300) | Descripción del rol                            | NULL                    |
| Permisos         | NVARCHAR(MAX) | JSON con permisos del rol                      | NULL                    |
| Estado           | NVARCHAR(20)  | Estado: 'Activo' o 'Inactivo'                  | NOT NULL, DEFAULT       |
| FechaCreacion    | DATETIME      | Fecha de creación                              | DEFAULT GETDATE()       |

**Roles predefinidos:**
- Administrador
- Gestor de Producción
- Usuario
- Cocinero

**Relaciones:**
- 1 Rol → N Usuarios

---

## 🔗 RESUMEN DE RELACIONES

### Relaciones Principales:

1. **EMPRESAS ↔ COMEDORES**: 1:N
   - Una empresa puede tener múltiples comedores

2. **EMPRESAS ↔ EMPLEADOS**: 1:N
   - Una empresa puede tener múltiples empleados

3. **COMEDORES ↔ EMPLEADOS**: 1:N
   - Un comedor puede tener múltiples empleados asignados

4. **COMEDORES ↔ MENUS**: 1:N
   - Un comedor puede tener múltiples menús

5. **MENUS ↔ PLATILLOS**: N:N (a través de MENU_PLATILLOS)
   - Un menú puede tener múltiples platillos
   - Un platillo puede estar en múltiples menús

6. **EMPLEADOS ↔ PEDIDOS**: 1:N
   - Un empleado puede hacer múltiples pedidos

7. **MENUS ↔ PEDIDOS**: 1:N
   - Un menú puede tener múltiples pedidos

8. **PEDIDOS ↔ PLATILLOS**: N:N (a través de PEDIDO_DETALLES)
   - Un pedido puede tener múltiples platillos
   - Un platillo puede estar en múltiples pedidos

9. **COMEDORES ↔ ORDENES_PRODUCCION**: 1:N
   - Un comedor puede tener múltiples órdenes de producción

10. **ORDENES_PRODUCCION ↔ PLATILLOS**: N:N (a través de ORDEN_PLATILLOS)
    - Una orden puede tener múltiples platillos
    - Un platillo puede estar en múltiples órdenes

11. **ROLES ↔ USUARIOS**: 1:N
    - Un rol puede tener múltiples usuarios

---

## 📐 DIAGRAMA VISUAL DE CARDINALIDAD

```
EMPRESAS (1) ──────────── (N) COMEDORES
    │                           │
    │                           │
   (1)                         (1)
    │                           │
    │                           │
   (N)                         (N)
EMPLEADOS                    MENUS
    │                           │
   (1)                         (1)
    │                           │
   (N)                         (N)
 PEDIDOS (N) ──────────── (N) MENU_PLATILLOS
    │                           │
   (1)                         (N)
    │                           │
   (N)                         (1)
PEDIDO_DETALLES (N) ───── (1) PLATILLOS
                                │
                               (1)
                                │
                               (N)
                         ORDEN_PLATILLOS
                                │
                               (N)
                                │
                               (1)
                         ORDENES_PRODUCCION
                                │
                               (N)
                                │
                               (1)
                           COMEDORES

ROLES (1) ──────────── (N) USUARIOS
```

---

## 🎯 ÍNDICES RECOMENDADOS

### Índices para mejorar el rendimiento:

```sql
-- EMPRESAS
CREATE INDEX IX_Empresas_Estado ON EMPRESAS(Estado);
CREATE INDEX IX_Empresas_Tipo ON EMPRESAS(Tipo);

-- COMEDORES
CREATE INDEX IX_Comedores_EmpresaID ON COMEDORES(EmpresaID);
CREATE INDEX IX_Comedores_Estado ON COMEDORES(Estado);

-- PLATILLOS
CREATE INDEX IX_Platillos_Categoria ON PLATILLOS(Categoria);
CREATE INDEX IX_Platillos_Estado ON PLATILLOS(Estado);

-- MENUS
CREATE INDEX IX_Menus_ComedorID ON MENUS(ComedorID);
CREATE INDEX IX_Menus_FechaInicio_FechaFin ON MENUS(FechaInicio, FechaFin);
CREATE INDEX IX_Menus_Estado ON MENUS(Estado);

-- MENU_PLATILLOS
CREATE INDEX IX_MenuPlatillos_MenuID ON MENU_PLATILLOS(MenuID);
CREATE INDEX IX_MenuPlatillos_PlatilloID ON MENU_PLATILLOS(PlatilloID);
CREATE INDEX IX_MenuPlatillos_DiaSemana_TipoComida ON MENU_PLATILLOS(DiaSemana, TipoComida);

-- EMPLEADOS
CREATE INDEX IX_Empleados_EmpresaID ON EMPLEADOS(EmpresaID);
CREATE INDEX IX_Empleados_ComedorID ON EMPLEADOS(ComedorID);
CREATE INDEX IX_Empleados_Documento ON EMPLEADOS(Documento);
CREATE INDEX IX_Empleados_Email ON EMPLEADOS(Email);
CREATE INDEX IX_Empleados_Estado ON EMPLEADOS(Estado);

-- PEDIDOS
CREATE INDEX IX_Pedidos_EmpleadoID ON PEDIDOS(EmpleadoID);
CREATE INDEX IX_Pedidos_MenuID ON PEDIDOS(MenuID);
CREATE INDEX IX_Pedidos_ComedorID ON PEDIDOS(ComedorID);
CREATE INDEX IX_Pedidos_Estado ON PEDIDOS(Estado);
CREATE INDEX IX_Pedidos_FechaPedido ON PEDIDOS(FechaPedido);
CREATE INDEX IX_Pedidos_Semana ON PEDIDOS(SemanaInicio, SemanaFin);

-- PEDIDO_DETALLES
CREATE INDEX IX_PedidoDetalles_PedidoID ON PEDIDO_DETALLES(PedidoID);
CREATE INDEX IX_PedidoDetalles_PlatilloID ON PEDIDO_DETALLES(PlatilloID);

-- ORDENES_PRODUCCION
CREATE INDEX IX_OrdenesProd_ComedorID ON ORDENES_PRODUCCION(ComedorID);
CREATE INDEX IX_OrdenesProd_FechaProduccion ON ORDENES_PRODUCCION(FechaProduccion);
CREATE INDEX IX_OrdenesProd_Estado ON ORDENES_PRODUCCION(Estado);

-- ORDEN_PLATILLOS
CREATE INDEX IX_OrdenPlatillos_OrdenID ON ORDEN_PLATILLOS(OrdenID);
CREATE INDEX IX_OrdenPlatillos_PlatilloID ON ORDEN_PLATILLOS(PlatilloID);

-- USUARIOS
CREATE INDEX IX_Usuarios_RolID ON USUARIOS(RolID);
CREATE INDEX IX_Usuarios_Email ON USUARIOS(Email);
CREATE INDEX IX_Usuarios_Estado ON USUARIOS(Estado);
```

---

## 🔒 CONSIDERACIONES DE SEGURIDAD

1. **Contraseñas**: 
   - Usar algoritmo de hash fuerte (ej: bcrypt, SHA-256)
   - Nunca almacenar contraseñas en texto plano

2. **Autenticación**:
   - Implementar tokens JWT para sesiones
   - Expiración de sesiones después de inactividad

3. **Permisos**:
   - Aplicar principio de mínimo privilegio
   - Roles con permisos granulares

4. **Auditoría**:
   - Registrar cambios importantes (triggers)
   - Campos de FechaCreacion y FechaModificacion

---

## 📊 ESTADÍSTICAS DE LA BASE DE DATOS

### Tablas totales: **12**

**Tablas de datos maestros:** 3
- EMPRESAS
- COMEDORES
- PLATILLOS

**Tablas de configuración:** 2
- USUARIOS
- ROLES

**Tablas de negocio:** 3
- MENUS
- EMPLEADOS
- PEDIDOS

**Tablas de producción:** 1
- ORDENES_PRODUCCION

**Tablas intermedias/relación:** 3
- MENU_PLATILLOS
- PEDIDO_DETALLES
- ORDEN_PLATILLOS

---

## ⚙️ TRIGGERS RECOMENDADOS

### 1. Trigger para actualizar TotalComidas en PEDIDOS

```sql
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
```

### 2. Trigger para actualizar FechaModificacion

```sql
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
```

---

## 🎲 DATOS DE EJEMPLO (SEED DATA)

### Roles predefinidos:
- Administrador (permisos completos)
- Gestor de Producción (gestión de pedidos y órdenes)
- Usuario (solo lectura)
- Cocinero (gestión de órdenes de producción)

### Categorías de platillos:
- Plato Fuerte
- Ensalada
- Sopa
- Postre
- Bebida
- Desayuno

### Estados de sistema:
- Empresas: Activa, Inactiva
- Comedores: Activo, Inactivo
- Platillos: Disponible, No Disponible
- Menús: Activo, Programado, Vencido
- Pedidos: Confirmado, En Producción, Completado, Entregado, Cancelado
- Órdenes: Pendiente, En Producción, Completada, Entregada

---

Este documento proporciona la estructura completa de la base de datos para el sistema WasteLess.
Para el script SQL completo de creación, consultar el archivo `CREATE_DATABASE_WASTELESS.sql`.
