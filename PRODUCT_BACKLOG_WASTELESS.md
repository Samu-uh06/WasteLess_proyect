# 📋 PRODUCT BACKLOG - WASTELESS

## 🎯 VISIÓN DEL PRODUCTO

**WasteLess** es un sistema integral de gestión gastronómica que permite a las empresas gestionar comedores corporativos, crear menús semanales, y a los empleados seleccionar sus comidas desde una aplicación móvil, optimizando la producción y reduciendo el desperdicio de alimentos.

---

## 📊 ESCALA DE TALLAS (COMPLEJIDAD)

| Talla | Complejidad | Descripción | Tiempo Estimado |
|-------|-------------|-------------|-----------------|
| **XS** | Muy Baja | Tarea simple, cambios mínimos | 1-2 horas |
| **S** | Baja | Funcionalidad simple con formulario básico | 2-4 horas |
| **M** | Media | Funcionalidad completa con validaciones | 1-2 días |
| **L** | Alta | Módulo completo con CRUD y lógica compleja | 2-3 días |
| **XL** | Muy Alta | Módulo grande con múltiples componentes | 3-5 días |
| **2XL** | Épica | Funcionalidad crítica del sistema | 1-2 semanas |

---

## 🏗️ ÉPICAS DEL PROYECTO

### **ÉPICA 1**: Infraestructura y Autenticación
### **ÉPICA 2**: Gestión de Catálogos y Maestros
### **ÉPICA 3**: Gestión de Menús Semanales
### **ÉPICA 4**: Aplicación Móvil para Empleados
### **ÉPICA 5**: Gestión de Pedidos y Producción
### **ÉPICA 6**: Dashboard y Reportes
### **ÉPICA 7**: Gestión de Usuarios y Permisos

---

## 📝 PRODUCT BACKLOG COMPLETO

---

## 🔷 ÉPICA 1: Infraestructura y Autenticación

### **PB-001** | Configuración del Proyecto Base
**Como** desarrollador  
**Quiero** configurar la estructura inicial del proyecto  
**Para** tener una base sólida sobre la cual desarrollar

**Talla**: `M`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 0  
**Tipo**: Técnica

**Criterios de Aceptación**:
- [x] Proyecto React configurado con TypeScript
- [x] Tailwind CSS v4 instalado y configurado
- [x] React Router configurado
- [x] Estructura de carpetas definida (/components, /pages, /utils)
- [x] Variables CSS y tema configurado
- [x] Componentes base de shadcn/ui instalados

**Notas Técnicas**:
- Usar Vite como bundler
- Configurar ESLint y Prettier

---

### **PB-002** | Sistema de Autenticación Web
**Como** usuario administrativo  
**Quiero** iniciar sesión en el sistema web  
**Para** acceder a las funcionalidades según mi rol

**Talla**: `L`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 1  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Formulario de login con email y password
- [ ] Validación de credenciales contra base de datos
- [ ] Manejo de sesión con tokens JWT
- [ ] Redireccionamiento según rol del usuario
- [ ] Mensaje de error si credenciales incorrectas
- [ ] Opción "Recordarme" (localStorage)
- [ ] Botón "Olvidé mi contraseña" (UI only)

**Diseño**:
- Pantalla de login centrada
- Formulario con validaciones en tiempo real
- Spinner durante autenticación

---

### **PB-003** | Sistema de Autenticación Móvil
**Como** empleado  
**Quiero** iniciar sesión en la app móvil  
**Para** acceder a mis funcionalidades

**Talla**: `M`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 3  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Formulario de login móvil (documento y password)
- [x] Validación de credenciales
- [x] Persistencia de sesión en localStorage
- [x] Redireccionamiento a Home después del login
- [x] Manejo de errores con toast
- [x] Link a registro

**Notas**:
- Ya implementado en `/src/app/pages/mobile/MobileLogin.tsx`

---

### **PB-004** | Registro de Empleados Móvil
**Como** empleado nuevo  
**Quiero** registrarme en la app móvil  
**Para** poder hacer pedidos de comida

**Talla**: `M`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 3  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Formulario completo de registro
- [x] Validación de todos los campos
- [x] Selección de comedor desde lista
- [x] Validación de documento único
- [x] Confirmación de contraseña
- [x] Redireccionamiento automático a login
- [x] Persistencia en localStorage

**Notas**:
- Ya implementado en `/src/app/pages/mobile/MobileRegister.tsx`

---

### **PB-005** | Protección de Rutas
**Como** sistema  
**Quiero** proteger las rutas según autenticación y roles  
**Para** garantizar la seguridad del sistema

**Talla**: `S`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 1  
**Tipo**: Técnica

**Criterios de Aceptación**:
- [ ] Componente ProtectedRoute creado
- [ ] Redirige a login si no autenticado
- [ ] Verifica permisos según rol
- [ ] Página 403 (No autorizado)
- [ ] Página 404 (No encontrado)
- [ ] Rutas públicas vs privadas separadas

---

## 🔷 ÉPICA 2: Gestión de Catálogos y Maestros

### **PB-010** | CRUD de Empresas
**Como** administrador  
**Quiero** gestionar las empresas clientes y restaurantes  
**Para** mantener actualizado el catálogo de empresas

**Talla**: `L`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 1  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de empresas (paginada)
- [ ] Filtros: por nombre, tipo, estado, ciudad
- [ ] Botón "Crear Empresa"
- [ ] Formulario de creación con todos los campos
- [ ] Validaciones: NIT único, campos requeridos
- [ ] Edición de empresa existente
- [ ] Cambio de estado (Activa/Inactiva) con switch
- [ ] Eliminación con confirmación
- [ ] Alerta si tiene comedores asociados
- [ ] Toast de éxito/error

**Campos del Formulario**:
- Nombre, Tipo, NIT, Ciudad, Dirección
- Contacto, Email, Teléfono, Estado

**Diseño**:
- Tabla con acciones en columna derecha
- Modal para crear/editar
- Badges para tipo y estado

---

### **PB-011** | CRUD de Comedores
**Como** administrador  
**Quiero** gestionar los comedores de las empresas  
**Para** configurar los puntos de servicio

**Talla**: `L`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 1  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de comedores
- [ ] Mostrar empresa asociada en cada fila
- [ ] Filtros: por empresa, estado
- [ ] Selector de empresa al crear
- [ ] Formulario completo de comedor
- [ ] Validaciones de campos requeridos
- [ ] CRUD completo (Create, Read, Update, Delete)
- [ ] Alerta si tiene empleados/menús asociados
- [ ] Toast de éxito/error

**Campos del Formulario**:
- Nombre, Empresa, Ubicación, Capacidad
- Horarios, Responsable, Teléfono, Estado

**Diseño**:
- Card por cada comedor
- Badge con nombre de empresa
- Iconos para capacidad y horarios

---

### **PB-012** | CRUD de Platillos
**Como** administrador  
**Quiero** gestionar el catálogo de platillos  
**Para** tener disponibles opciones de comida

**Talla**: `XL`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 2  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Vista de catálogo en grid (3-4 columnas)
- [ ] Tarjetas con imagen, nombre, categoría
- [ ] Filtros: por categoría, estado
- [ ] Búsqueda por nombre
- [ ] Formulario de creación con upload de imagen
- [ ] Vista previa de imagen antes de guardar
- [ ] Categorías predefinidas (selector)
- [ ] Campo de ingredientes (textarea o chips)
- [ ] Validación de campos obligatorios
- [ ] Edición completa
- [ ] Eliminación con confirmación
- [ ] Alerta si está en menús activos
- [ ] Estado Disponible/No Disponible

**Categorías**:
- Plato Fuerte, Ensalada, Sopa, Postre, Bebida, Desayuno

**Campos del Formulario**:
- Nombre, Descripción, Categoría
- Calorías, Precio, Ingredientes
- Imagen (URL), Estado

**Diseño**:
- Tarjetas estilo "food card" con imagen destacada
- Badge de categoría con color
- Iconos para calorías y precio
- Modal full para crear/editar

---

## 🔷 ÉPICA 3: Gestión de Menús Semanales

### **PB-020** | Crear Menú Semanal
**Como** administrador  
**Quiero** crear menús semanales para cada comedor  
**Para** que los empleados puedan seleccionar sus comidas

**Talla**: `2XL`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 2  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Formulario inicial: nombre, comedor, semana
- [ ] Selector de fecha inicio (autocalcula fin)
- [ ] Matriz de planificación 6 días × 3 comidas
- [ ] Selector de platillo para cada celda
- [ ] Mostrar imagen y nombre del platillo seleccionado
- [ ] Filtro de platillos por categoría
- [ ] Vista previa del menú completo
- [ ] Validación: al menos 1 platillo
- [ ] Guardado con estado "Activo" o "Programado"
- [ ] Confirmación antes de guardar
- [ ] Toast de éxito

**Estructura de la Matriz**:
```
         | Lunes | Martes | Miércoles | Jueves | Viernes | Sábado
---------|-------|--------|-----------|--------|---------|-------
Desayuno | [🍳]  | [🍳]   | [🍳]      | [🍳]   | [🍳]    | [🍳]
Almuerzo | [🍽️]  | [🍽️]   | [🍽️]      | [🍽️]   | [🍽️]    | [🍽️]
Cena     | [🌙]  | [🌙]   | [🌙]      | [🌙]   | [🌙]    | [🌙]
```

**Diseño**:
- Stepper: Paso 1 (Info) → Paso 2 (Platillos) → Paso 3 (Confirmar)
- Modal de selección de platillo con buscador
- Grid responsive para la matriz

---

### **PB-021** | Visualizar Menús
**Como** administrador  
**Quiero** ver la lista de menús creados  
**Para** gestionar y revisar los menús disponibles

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 2  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de menús
- [ ] Columnas: ID, Nombre, Comedor, Semana, Total platillos, Estado
- [ ] Filtros: por comedor, estado, semana
- [ ] Badge de estado con colores
- [ ] Botón "Ver Detalle" por cada menú
- [ ] Ordenamiento por fecha
- [ ] Paginación (10 por página)

**Estados**:
- **Activo** (verde): Semana en curso
- **Programado** (azul): Fecha futura
- **Vencido** (gris): Fecha pasada

---

### **PB-022** | Ver Detalle de Menú
**Como** administrador  
**Quiero** ver el detalle completo de un menú  
**Para** revisar los platillos asignados

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 2  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Modal o página de detalle
- [ ] Información del menú (nombre, comedor, semana)
- [ ] Matriz visual con platillos asignados
- [ ] Tarjeta de platillo con imagen y datos
- [ ] Total de platillos únicos
- [ ] Botón "Editar Menú"
- [ ] Botón "Duplicar Menú"
- [ ] Botón "Eliminar Menú"

---

### **PB-023** | Editar Menú Existente
**Como** administrador  
**Quiero** editar un menú ya creado  
**Para** hacer cambios en los platillos asignados

**Talla**: `L`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 2  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Cargar datos del menú en el formulario
- [ ] Permitir cambio de nombre y fechas
- [ ] Permitir cambiar platillos en la matriz
- [ ] Validación de cambios
- [ ] Confirmación antes de guardar
- [ ] Actualización en base de datos
- [ ] Toast de éxito

**Restricciones**:
- No editable si tiene pedidos confirmados (mostrar alerta)

---

### **PB-024** | Duplicar Menú
**Como** administrador  
**Quiero** duplicar un menú existente  
**Para** reutilizar configuraciones de semanas anteriores

**Talla**: `M`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 3  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Botón "Duplicar" en detalle de menú
- [ ] Copiar estructura completa del menú
- [ ] Solicitar nueva semana (fecha inicio)
- [ ] Permitir cambiar nombre
- [ ] Crear nuevo menú con platillos copiados
- [ ] Redirigir a edición del nuevo menú
- [ ] Toast de éxito

---

## 🔷 ÉPICA 4: Aplicación Móvil para Empleados

### **PB-030** | Home Móvil - Selección de Menú
**Como** empleado  
**Quiero** ver los menús disponibles en mi comedor  
**Para** seleccionar mis comidas de la semana

**Talla**: `XL`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 3  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Pantalla Home con saludo personalizado
- [x] Lista de menús disponibles para el comedor del empleado
- [x] Tarjetas de menú con: nombre, semana, total platillos
- [x] Filtrar solo menús activos/programados
- [x] Botón "Seleccionar" por cada menú
- [x] Redirige a selector de platillos
- [x] Mensaje si no hay menús disponibles

**Notas**:
- Ya implementado parcialmente en `/src/app/pages/mobile/MobileHome.tsx`

---

### **PB-031** | Selector de Platillos por Día
**Como** empleado  
**Quiero** seleccionar mis platillos para cada día de la semana  
**Para** armar mi pedido personalizado

**Talla**: `2XL`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 3-4  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabs para cada día de la semana
- [ ] Por cada día, secciones por tipo de comida
- [ ] Tarjetas de platillos disponibles con:
  - Imagen destacada
  - Nombre y descripción
  - Categoría y calorías
  - Botón "Seleccionar"
- [ ] Marcar platillo seleccionado (check verde)
- [ ] Permitir cambiar selección
- [ ] Máximo 1 platillo por tipo de comida por día
- [ ] Badge flotante con total de comidas seleccionadas
- [ ] Botón "Confirmar Pedido" fijo en bottom
- [ ] Validación: al menos 1 comida seleccionada
- [ ] Modal de confirmación con resumen

**Diseño**:
- Tabs horizontales con scroll
- Cards de platillos estilo food delivery
- Animación al seleccionar
- Bottom sheet para confirmar

---

### **PB-032** | Confirmar Pedido
**Como** empleado  
**Quiero** confirmar mi pedido semanal  
**Para** que quede registrado en el sistema

**Talla**: `M`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 4  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Modal de confirmación con resumen:
  - Semana del pedido
  - Total de comidas
  - Desglose por día y tipo
- [ ] Botones: "Cancelar" y "Confirmar"
- [ ] Al confirmar:
  - Crear pedido en base de datos
  - Estado inicial: "Confirmado"
  - Guardar relación con empleado y menú
  - Guardar detalles (platillos por día/comida)
- [ ] Toast de éxito
- [ ] Redirigir a "Mis Pedidos"
- [ ] Limpiar selecciones del formulario

**Reglas de Negocio**:
- No permitir pedidos duplicados (misma semana)
- Calcular total de comidas automáticamente

---

### **PB-033** | Mis Pedidos
**Como** empleado  
**Quiero** ver el historial de mis pedidos  
**Para** conocer el estado y detalles de mis comidas

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 4  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Lista de pedidos del empleado
- [x] Tarjetas con: ID, semana, fecha, estado, total comidas
- [x] Badge de estado con color
- [x] Botón "Ver Detalles"
- [x] Modal de detalle con desglose completo
- [x] Ordenar por fecha (más reciente primero)
- [x] Mensaje si no hay pedidos
- [x] Botón "Hacer Pedido" si lista vacía

**Estados visuales**:
- Confirmado (verde)
- En Producción (naranja)
- Completado (azul)
- Entregado (verde oscuro)

**Notas**:
- Ya implementado en `/src/app/pages/mobile/MobilePedidos.tsx`

---

### **PB-034** | Perfil de Empleado
**Como** empleado  
**Quiero** ver mi información personal y de empresa  
**Para** verificar mis datos y cerrar sesión

**Talla**: `S`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 4  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Avatar con iniciales
- [x] Nombre completo y cargo
- [x] Tarjetas de información: Email, Teléfono, Empresa, Comedor
- [x] Botón "Ver Mis Pedidos"
- [x] Botón "Cerrar Sesión" (rojo)
- [x] Confirmación antes de cerrar sesión
- [x] Limpiar localStorage al cerrar sesión
- [x] Redirigir a Login

**Notas**:
- Ya implementado en `/src/app/pages/mobile/MobilePerfil.tsx`

---

### **PB-035** | Navegación Móvil
**Como** empleado  
**Quiero** navegar fácilmente entre las secciones  
**Para** acceder rápidamente a las funcionalidades

**Talla**: `S`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 3  
**Tipo**: UI/UX

**Criterios de Aceptación**:
- [x] Bottom navigation con 3 opciones:
  - 🏠 Home
  - 📋 Mis Pedidos
  - 👤 Perfil
- [x] Icono activo destacado (color #E7000B)
- [x] Navegación entre rutas con React Router
- [x] Animación de transición suave
- [x] Indicador visual de ruta activa

**Notas**:
- Ya implementado en `/src/app/components/MobileLayout.tsx`

---

## 🔷 ÉPICA 5: Gestión de Pedidos y Producción

### **PB-040** | Visualizar Pedidos (Web)
**Como** gestor de producción  
**Quiero** ver todos los pedidos realizados  
**Para** gestionar la producción de alimentos

**Talla**: `L`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 5  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de todos los pedidos
- [ ] Columnas: ID, Empleado, Empresa, Comedor, Semana, Total Comidas, Estado
- [ ] Filtros avanzados:
  - Por estado
  - Por comedor
  - Por semana/fecha
  - Por empresa
- [ ] Búsqueda por nombre de empleado
- [ ] Ordenamiento por columnas
- [ ] Paginación (20 por página)
- [ ] Botón "Ver Detalle" por cada pedido
- [ ] Exportar a Excel/CSV (opcional)

**Diseño**:
- Tabla responsive
- Badges de estado con colores
- Filtros en header

---

### **PB-041** | Ver Detalle de Pedido (Web)
**Como** gestor de producción  
**Quiero** ver el detalle completo de un pedido  
**Para** conocer las comidas solicitadas

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 5  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Modal o página de detalle
- [ ] Información del empleado (nombre, cargo, empresa)
- [ ] Información del pedido (fecha, semana, estado)
- [ ] Desglose por día de la semana
- [ ] Por cada día, mostrar:
  - Tipo de comida (Desayuno/Almuerzo/Cena)
  - Platillo seleccionado con imagen
  - Categoría y calorías
- [ ] Total de comidas
- [ ] Botón "Cambiar Estado"
- [ ] Selector de nuevo estado
- [ ] Confirmación antes de cambiar
- [ ] Toast de éxito

---

### **PB-042** | Cambiar Estado de Pedido
**Como** gestor de producción  
**Quiero** cambiar el estado de los pedidos  
**Para** reflejar el avance en la producción

**Talla**: `S`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 5  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Selector de estado en detalle de pedido
- [ ] Estados disponibles:
  - Confirmado → En Producción
  - En Producción → Completado
  - Completado → Entregado
  - Cualquiera → Cancelado
- [ ] Validación de flujo de estados
- [ ] Confirmación antes de cambiar
- [ ] Actualización en base de datos
- [ ] Registro de fecha de cambio
- [ ] Toast de éxito

---

### **PB-043** | Crear Orden de Producción
**Como** gestor de producción  
**Quiero** crear órdenes de producción consolidadas  
**Para** que la cocina sepa qué y cuánto producir

**Talla**: `2XL`  
**Prioridad**: 🔴 CRÍTICA  
**Sprint**: Sprint 5-6  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Botón "Crear Orden de Producción"
- [ ] Formulario con:
  - Selector de comedor
  - Selector de fecha de producción
- [ ] Sistema consolida automáticamente:
  - Busca pedidos confirmados para esa fecha/comedor
  - Agrupa platillos repetidos
  - Suma cantidades
  - Calcula total de porciones
  - Cuenta empleados únicos
- [ ] Mostrar resumen antes de crear:
  - Lista de platillos con cantidades
  - Total de porciones
  - Total de empleados
  - Ingredientes necesarios (opcional)
- [ ] Botón "Confirmar y Crear"
- [ ] Al confirmar:
  - Crear orden en base de datos
  - Cambiar pedidos a "En Producción"
  - Guardar detalles de la orden
- [ ] Toast de éxito
- [ ] Redirigir a detalle de orden

**Algoritmo de Consolidación**:
```
Para cada pedido confirmado:
  - Extraer platillos por día/comida
  - Agrupar por PlatilloID
  - Sumar cantidades
  - Resultado: [PlatilloID, Cantidad, Día, TipoComida]
```

---

### **PB-044** | Visualizar Órdenes de Producción
**Como** gestor de producción  
**Quiero** ver todas las órdenes de producción  
**Para** gestionar el trabajo de la cocina

**Talla**: `L`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 6  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de órdenes
- [ ] Columnas: ID, Comedor, Fecha, Total Platillos, Total Empleados, Estado
- [ ] Filtros:
  - Por comedor
  - Por fecha
  - Por estado
- [ ] Badges de estado con colores
- [ ] Botón "Ver Detalle"
- [ ] Botón "Imprimir" por cada orden
- [ ] Ordenar por fecha (más reciente primero)
- [ ] Paginación

**Estados**:
- Pendiente (amarillo)
- En Producción (naranja)
- Completada (azul)
- Entregada (verde)

---

### **PB-045** | Ver Detalle de Orden de Producción
**Como** cocinero/gestor  
**Quiero** ver el detalle de una orden de producción  
**Para** saber qué platillos debo preparar

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 6  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Información de la orden (ID, fecha, comedor)
- [ ] Total de empleados y platillos
- [ ] Tabla de platillos con:
  - Nombre del platillo
  - Cantidad a producir
  - Día de la semana
  - Tipo de comida
  - Ingredientes (opcional)
- [ ] Agrupar por tipo de comida
- [ ] Botón "Cambiar Estado"
- [ ] Botón "Imprimir Orden"
- [ ] Campo de observaciones (editable)
- [ ] Toast al guardar cambios

---

### **PB-046** | Imprimir Orden de Producción
**Como** cocinero  
**Quiero** imprimir la orden de producción  
**Para** tenerla físicamente en la cocina

**Talla**: `M`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 6  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Botón "Imprimir" en detalle de orden
- [ ] Generar vista de impresión optimizada
- [ ] Incluir:
  - Logo de WasteLess
  - Información de la orden
  - Tabla de platillos con cantidades
  - Total de porciones
  - Fecha y hora de impresión
- [ ] Abrir diálogo de impresión del navegador
- [ ] Formato A4 vertical
- [ ] CSS específico para impresión (@media print)

---

## 🔷 ÉPICA 6: Dashboard y Reportes

### **PB-050** | Dashboard Principal
**Como** administrador/gestor  
**Quiero** ver métricas y estadísticas del sistema  
**Para** tener visión general del negocio

**Talla**: `XL`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 7  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Layout de dashboard con sidebar
- [x] Tarjetas de métricas principales:
  - Total de pedidos activos
  - Impacto económico mensual
  - Control de desperdicio (kg reducidos)
  - Empresas activas
- [x] Gráfico de barras: Desperdicio por categoría
- [x] Gráfico de área: Tendencias mensuales
- [x] Tabla de últimas órdenes de producción
- [x] Filtro por período de tiempo
- [ ] Datos en tiempo real (actualización automática)

**Métricas**:
- Pedidos completados vs totales
- Dinero ahorrado (estimación)
- Kg de comida no desperdiciada
- Tasa de satisfacción (opcional)

**Notas**:
- Ya implementado parcialmente en `/src/app/pages/Dashboard.tsx`

---

### **PB-051** | Gráficos y Estadísticas
**Como** administrador  
**Quiero** ver gráficos visuales de las operaciones  
**Para** analizar tendencias y tomar decisiones

**Talla**: `L`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 7  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [x] Integración con recharts
- [x] Gráfico de barras para desperdicio por categoría
- [x] Gráfico de área para tendencias mensuales
- [ ] Gráfico de pastel para distribución de pedidos
- [ ] Datos reales desde base de datos
- [ ] Tooltips informativos
- [ ] Colores según diseño de WasteLess
- [ ] Responsive en móvil

---

### **PB-052** | Reporte de Pedidos
**Como** administrador  
**Quiero** generar reportes de pedidos  
**Para** análisis y auditoría

**Talla**: `L`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 8  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Página de reportes
- [ ] Filtros:
  - Rango de fechas
  - Comedor
  - Empresa
  - Estado
- [ ] Botón "Generar Reporte"
- [ ] Mostrar resultados en tabla
- [ ] Métricas calculadas:
  - Total de pedidos
  - Total de comidas
  - Promedio de comidas por empleado
  - Platillos más solicitados
- [ ] Exportar a Excel
- [ ] Exportar a PDF
- [ ] Gráfico de resumen

---

## 🔷 ÉPICA 7: Gestión de Usuarios y Permisos

### **PB-060** | CRUD de Usuarios Administrativos
**Como** administrador  
**Quiero** gestionar los usuarios del sistema web  
**Para** controlar quién tiene acceso

**Talla**: `L`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 1  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de usuarios
- [ ] Columnas: Nombre, Email, Rol, Estado, Último acceso
- [ ] Filtros: por rol, estado
- [ ] Búsqueda por nombre o email
- [ ] Botón "Crear Usuario"
- [ ] Formulario con campos:
  - Nombre, Email, Rol (selector), Contraseña
- [ ] Validación de email único
- [ ] Validación de contraseña (mínimo 8 caracteres)
- [ ] Edición de usuario (sin cambiar contraseña)
- [ ] Opción "Resetear contraseña"
- [ ] Cambio de estado con switch
- [ ] Eliminación con confirmación
- [ ] Toast de éxito/error

---

### **PB-061** | CRUD de Roles y Permisos
**Como** administrador  
**Quiero** gestionar los roles del sistema  
**Para** definir permisos granulares

**Talla**: `L`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 1  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Tabla con lista de roles
- [ ] Botón "Crear Rol"
- [ ] Formulario de creación:
  - Nombre del rol
  - Descripción
  - Matriz de permisos
- [ ] Matriz de permisos por módulo:
  - Módulos en filas
  - Permisos en columnas (Ver, Crear, Editar, Eliminar)
  - Checkboxes para marcar permisos
- [ ] Validación de nombre único
- [ ] Edición de rol existente
- [ ] No permitir eliminar roles con usuarios
- [ ] Roles predefinidos no editables (Administrador)
- [ ] Toast de éxito/error

**Módulos con Permisos**:
- Dashboard, Usuarios, Platillos, Empresas
- Comedores, Menús, Pedidos, Órdenes

---

### **PB-062** | Sistema de Permisos
**Como** sistema  
**Quiero** validar permisos de usuarios  
**Para** restringir acceso según rol

**Talla**: `M`  
**Prioridad**: 🟠 ALTA  
**Sprint**: Sprint 1  
**Tipo**: Técnica

**Criterios de Aceptación**:
- [ ] Hook personalizado `usePermissions()`
- [ ] Componente `<Can>` para renderizado condicional
- [ ] Validación en cada acción (CRUD)
- [ ] Mensaje de error si no tiene permiso
- [ ] Ocultar botones/opciones sin permiso
- [ ] Redirección a página 403 si intenta acceso no autorizado
- [ ] Logs de intentos de acceso no autorizado

**Ejemplo de uso**:
```tsx
<Can do="create" on="platillos">
  <Button>Crear Platillo</Button>
</Can>
```

---

## 🔷 ÉPICA 8: Mejoras y Optimizaciones

### **PB-070** | Notificaciones del Sistema
**Como** usuario  
**Quiero** recibir notificaciones de acciones importantes  
**Para** estar informado de los cambios

**Talla**: `M`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 8  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Sistema de notificaciones en tiempo real
- [ ] Campana de notificaciones en navbar
- [ ] Badge con contador de no leídas
- [ ] Dropdown con lista de notificaciones
- [ ] Tipos de notificaciones:
  - Nuevo pedido creado
  - Cambio de estado de pedido
  - Nueva orden de producción
  - Menú semanal próximo a vencer
- [ ] Marcar como leída
- [ ] Marcar todas como leídas
- [ ] Eliminar notificación
- [ ] Persistencia en base de datos

---

### **PB-071** | Búsqueda Global
**Como** usuario  
**Quiero** buscar en todo el sistema  
**Para** encontrar información rápidamente

**Talla**: `M`  
**Prioridad**: ⚪ BAJA  
**Sprint**: Sprint 9  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Barra de búsqueda global en navbar
- [ ] Atajo de teclado (Ctrl+K / Cmd+K)
- [ ] Buscar en:
  - Empresas
  - Comedores
  - Platillos
  - Menús
  - Pedidos
  - Usuarios
- [ ] Mostrar resultados agrupados por tipo
- [ ] Click en resultado redirige a detalle
- [ ] Resaltado del término buscado
- [ ] Histórico de búsquedas recientes

---

### **PB-072** | Modo Oscuro
**Como** usuario  
**Quiero** activar modo oscuro  
**Para** reducir fatiga visual

**Talla**: `S`  
**Prioridad**: ⚪ BAJA  
**Sprint**: Sprint 9  
**Tipo**: UI/UX

**Criterios de Aceptación**:
- [ ] Toggle en navbar para cambiar tema
- [ ] Persistencia de preferencia en localStorage
- [ ] Variables CSS para tema oscuro
- [ ] Ajustar colores de todos los componentes
- [ ] Transición suave entre temas
- [ ] Detectar preferencia del sistema (prefers-color-scheme)

---

### **PB-073** | Optimización de Imágenes
**Como** sistema  
**Quiero** optimizar la carga de imágenes  
**Para** mejorar el rendimiento

**Talla**: `M`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 8  
**Tipo**: Técnica

**Criterios de Aceptación**:
- [ ] Lazy loading de imágenes
- [ ] Placeholders mientras carga
- [ ] Comprimir imágenes antes de subir
- [ ] Responsive images (srcset)
- [ ] Formato WebP con fallback
- [ ] CDN para imágenes (opcional)

---

### **PB-074** | Testing Unitario
**Como** desarrollador  
**Quiero** tener tests unitarios  
**Para** garantizar calidad del código

**Talla**: `XL`  
**Prioridad**: 🟡 MEDIA  
**Sprint**: Sprint 9  
**Tipo**: Técnica

**Criterios de Aceptación**:
- [ ] Configurar Jest + React Testing Library
- [ ] Tests para componentes clave:
  - Formularios de login/registro
  - CRUD de platillos
  - Selector de menú
  - Dashboard
- [ ] Cobertura mínima del 70%
- [ ] Tests de integración para flujos críticos
- [ ] Mocks de API calls
- [ ] CI/CD con tests automáticos

---

### **PB-075** | PWA (Progressive Web App)
**Como** empleado móvil  
**Quiero** instalar la app en mi teléfono  
**Para** acceder como si fuera nativa

**Talla**: `M`  
**Prioridad**: ⚪ BAJA  
**Sprint**: Sprint 10  
**Tipo**: Funcionalidad

**Criterios de Aceptación**:
- [ ] Configurar service worker
- [ ] Manifest.json configurado
- [ ] Iconos en diferentes tamaños
- [ ] Offline fallback
- [ ] Cache de recursos estáticos
- [ ] Prompt de instalación
- [ ] Funciona sin conexión (modo lectura)

---

## 📊 RESUMEN DEL BACKLOG

### Estadísticas Generales

| Métrica | Valor |
|---------|-------|
| **Total de Historias** | 45 |
| **Épicas** | 8 |
| **Sprints Estimados** | 10 |
| **Duración Estimada** | 3-4 meses |

### Distribución por Talla

| Talla | Cantidad | Porcentaje |
|-------|----------|------------|
| **XS** | 1 | 2% |
| **S** | 7 | 16% |
| **M** | 18 | 40% |
| **L** | 12 | 27% |
| **XL** | 5 | 11% |
| **2XL** | 2 | 4% |

### Distribución por Prioridad

| Prioridad | Cantidad | Porcentaje |
|-----------|----------|------------|
| 🔴 **CRÍTICA** | 13 | 29% |
| 🟠 **ALTA** | 16 | 36% |
| 🟡 **MEDIA** | 12 | 27% |
| ⚪ **BAJA** | 4 | 8% |

### Distribución por Épica

| Épica | Historias | Complejidad Total |
|-------|-----------|-------------------|
| ÉPICA 1: Infraestructura | 5 | 3M + 2L |
| ÉPICA 2: Catálogos | 3 | 2L + 1XL |
| ÉPICA 3: Menús | 5 | 2M + 2L + 1(2XL) |
| ÉPICA 4: App Móvil | 6 | 2S + 3M + 1XL + 1(2XL) |
| ÉPICA 5: Producción | 7 | 3M + 3L + 1(2XL) |
| ÉPICA 6: Dashboard | 3 | 2L + 1XL |
| ÉPICA 7: Usuarios | 3 | 1M + 2L |
| ÉPICA 8: Mejoras | 6 | 3S + 4M + 1XL |

---

## 🗓️ PLAN DE SPRINTS SUGERIDO

### **Sprint 0** (Preparación) - 1 semana
- PB-001: Configuración del proyecto

### **Sprint 1** (Fundamentos) - 2 semanas
- PB-002: Autenticación Web
- PB-005: Protección de rutas
- PB-010: CRUD Empresas
- PB-011: CRUD Comedores
- PB-060: CRUD Usuarios
- PB-061: CRUD Roles

### **Sprint 2** (Catálogo y Menús) - 2 semanas
- PB-012: CRUD Platillos
- PB-020: Crear Menú Semanal
- PB-021: Visualizar Menús
- PB-022: Ver Detalle de Menú
- PB-023: Editar Menú

### **Sprint 3** (App Móvil - Fase 1) - 2 semanas
- PB-003: Autenticación Móvil
- PB-004: Registro Móvil
- PB-030: Home Móvil
- PB-035: Navegación Móvil
- PB-024: Duplicar Menú

### **Sprint 4** (App Móvil - Fase 2) - 2 semanas
- PB-031: Selector de Platillos
- PB-032: Confirmar Pedido
- PB-033: Mis Pedidos
- PB-034: Perfil Empleado

### **Sprint 5** (Gestión de Pedidos) - 2 semanas
- PB-040: Visualizar Pedidos Web
- PB-041: Ver Detalle Pedido
- PB-042: Cambiar Estado Pedido
- PB-043: Crear Orden de Producción (Parte 1)

### **Sprint 6** (Órdenes de Producción) - 2 semanas
- PB-043: Crear Orden de Producción (Parte 2)
- PB-044: Visualizar Órdenes
- PB-045: Ver Detalle Orden
- PB-046: Imprimir Orden

### **Sprint 7** (Dashboard) - 2 semanas
- PB-050: Dashboard Principal
- PB-051: Gráficos y Estadísticas

### **Sprint 8** (Reportes y Optimización) - 2 semanas
- PB-052: Reporte de Pedidos
- PB-070: Notificaciones
- PB-073: Optimización de Imágenes

### **Sprint 9** (Mejoras) - 1 semana
- PB-071: Búsqueda Global
- PB-072: Modo Oscuro
- PB-074: Testing Unitario

### **Sprint 10** (Refinamiento) - 1 semana
- PB-075: PWA
- Corrección de bugs
- Refinamiento de UX

---

## 📝 DEFINITION OF DONE (DoD)

Para considerar una historia como **DONE**, debe cumplir:

✅ **Desarrollo**:
- [ ] Código implementado según criterios de aceptación
- [ ] Componentes React creados y funcionales
- [ ] Integración con backend/localStorage completada
- [ ] Validaciones implementadas

✅ **Calidad**:
- [ ] Sin errores de consola
- [ ] Sin warnings de TypeScript
- [ ] Código formateado con Prettier
- [ ] Lint pasando sin errores

✅ **UI/UX**:
- [ ] Diseño responsive (móvil y desktop)
- [ ] Colores según paleta de WasteLess (#E7000B)
- [ ] Animaciones y transiciones suaves
- [ ] Mensajes de éxito/error (toasts)

✅ **Documentación**:
- [ ] Comentarios en código complejo
- [ ] Props documentadas (interfaces TypeScript)

✅ **Testing**:
- [ ] Probado manualmente en navegador
- [ ] Flujos principales validados
- [ ] Edge cases considerados

✅ **Revisión**:
- [ ] Code review completado
- [ ] Aprobado por Product Owner
- [ ] Merged a rama principal

---

## 🎯 CRITERIOS DE ACEPTACIÓN GLOBALES

Todas las historias deben cumplir:

1. **Responsividad**: Funcionar en desktop (1920px), tablet (768px) y móvil (375px)
2. **Accesibilidad**: Etiquetas ARIA, contraste de colores, navegación por teclado
3. **Validaciones**: Mensajes claros de error, prevención de datos inválidos
4. **Feedback**: Loaders durante carga, confirmaciones para acciones destructivas
5. **Consistencia**: Uso de componentes de shadcn/ui, paleta de colores uniforme
6. **Performance**: Carga rápida, optimización de imágenes, lazy loading

---

Este Product Backlog está listo para ser usado en herramientas como Jira, Trello, Linear o cualquier sistema de gestión ágil.
