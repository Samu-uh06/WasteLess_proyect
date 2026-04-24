# 📋 DOCUMENTACIÓN COMPLETA DEL SISTEMA WASTELESS

## 🎯 DESCRIPCIÓN GENERAL

**WasteLess** es un sistema administrativo integral para la gestión gastronómica empresarial que facilita la planeación, producción y distribución de alimentos en comedores corporativos. El sistema está compuesto por:

1. **Panel Administrativo Web** (Desktop) - Para administradores y gestores
2. **Aplicación Móvil** (Mobile) - Para empleados/trabajadores

---

## 🎨 IDENTIDAD VISUAL

### Colores del Sistema:
- **Rojo Principal**: `#E7000B` - Logo, botones principales, elementos de marca
- **Verde**: `#10b981` - Confirmaciones, estados positivos
- **Naranja**: `#f59e0b` - Alertas, elementos secundarios
- **Azul**: `#3b82f6` - Información (deprecado, en proceso de migración a rojo)

---

## 👥 ACTORES DEL SISTEMA

### 1. Administrador del Sistema
- Gestiona todo el sistema
- Crea y administra usuarios
- Configura roles y permisos
- Gestiona empresas, comedores, platillos y menús

### 2. Gestor de Producción
- Visualiza pedidos de empleados
- Genera órdenes de producción
- Controla la producción de alimentos

### 3. Empleado/Trabajador (Usuario Móvil)
- Se registra en el sistema
- Selecciona menús semanales
- Visualiza sus pedidos históricos
- Gestiona su perfil

---

## 🖥️ PANEL ADMINISTRATIVO WEB

### **MÓDULO 1: DASHBOARD (Principal)**

**Ruta**: `/`

**Descripción**: Panel principal con métricas y estadísticas del sistema.

**Funcionalidades**:
- **Tarjetas de métricas**:
  - Pedidos activos (completados/pendientes)
  - Impacto económico mensual
  - Control del desperdicio (kg reducidos)
  
- **Gráficos**:
  - Gráfico de barras: Desperdicio por categoría de alimentos
  - Gráfico de área: Tendencias de empresas, pedidos y desperdicio
  
- **Lista de órdenes de producción**:
  - Visualización de pedidos recientes
  - Estados: Completada, Pendiente, Atrasada, En Progreso

**Datos visualizados**:
- Estadísticas en tiempo real
- Información histórica mensual
- Estado de órdenes de producción

---

### **MÓDULO 2: GESTIÓN DE USUARIOS**

#### 2.1 Gestión de Usuarios
**Ruta**: `/usuarios/gestion`

**Descripción**: Administración completa de usuarios del sistema.

**Funcionalidades**:
- **Crear usuario**: 
  - Nombre completo
  - Email
  - Rol (Admin, Usuario, Gestor)
  - Contraseña
  - Estado (Activo/Inactivo)

- **Listar usuarios**:
  - Tabla con todos los usuarios
  - Búsqueda por nombre/email
  - Filtros por rol y estado

- **Editar usuario**:
  - Modificar información personal
  - Cambiar rol
  - Cambiar estado

- **Eliminar usuario**:
  - Eliminación con confirmación

- **Toggle de estado**:
  - Activar/Desactivar usuario con switch

**Campos del usuario**:
- ID
- Nombre
- Email
- Rol
- Estado
- Fecha de creación

---

#### 2.2 Gestión de Acceso
**Ruta**: `/usuarios/acceso`

**Descripción**: Control de permisos y accesos de usuarios.

**Funcionalidades**:
- Asignación de permisos granulares
- Control de acceso por módulo
- Gestión de sesiones activas

---

### **MÓDULO 3: GESTIÓN DE PLATILLOS**

**Ruta**: `/platillos/gestion`

**Descripción**: Catálogo de platillos individuales que componen los menús.

**Funcionalidades**:
- **Crear platillo**:
  - Nombre del platillo
  - Descripción
  - Categoría (Plato Fuerte, Ensalada, Sopa, Postre, Bebida, Desayuno)
  - Calorías
  - Imagen (URL de Unsplash o upload)
  - Precio
  - Ingredientes
  - Estado (Disponible/No Disponible)

- **Listar platillos**:
  - Tarjetas con imagen y datos
  - Búsqueda por nombre
  - Filtro por categoría
  - Vista de galería

- **Editar platillo**:
  - Modificar todos los campos
  - Cambiar imagen
  - Actualizar disponibilidad

- **Eliminar platillo**:
  - Eliminación con confirmación

- **Ver detalles**:
  - Modal con información completa
  - Información nutricional
  - Lista de ingredientes

**Categorías de platillos**:
- Plato Fuerte
- Ensalada
- Sopa
- Postre
- Bebida
- Desayuno

**Platillos de ejemplo**:
- Arroz con Pollo
- Ensalada César
- Bandeja Paisa
- Sopa de Lentejas
- Tiramisu
- Jugo Natural
- Pescado al Horno
- Pasta Carbonara
- Huevos Revueltos
- Arepas con Queso
- Café con Leche
- Pan Tostado

---

### **MÓDULO 4: PLANEACIÓN GASTRONÓMICA**

#### 4.1 Gestión de Empresas
**Ruta**: `/planeacion/empresas`

**Descripción**: Administración de empresas clientes y restaurantes.

**Funcionalidades**:
- **Crear empresa**:
  - Nombre
  - Tipo (Cliente o Restaurante)
  - NIT
  - Ciudad
  - Dirección
  - Contacto
  - Email
  - Teléfono
  - Estado (Activa/Inactiva)

- **Listar empresas**:
  - Tabla con todas las empresas
  - Búsqueda por nombre
  - Filtro por tipo y estado
  - Badge visual por tipo

- **Editar empresa**:
  - Modificar información completa
  - Cambiar tipo y estado

- **Ver detalles**:
  - Modal con información completa
  - Datos de contacto
  - Ubicación

- **Ver comedores**:
  - Lista de comedores asociados
  - Acceso directo a gestión de comedores

- **Toggle de estado**:
  - Activar/Desactivar empresa

**Tipos de empresa**:
- **Cliente**: Empresas que tienen comedores para sus empleados
- **Restaurante**: Establecimientos de comida

**Empresas de ejemplo**:
- Ecopetrol S.A. (Cliente)
- Restaurante El Buen Sabor (Restaurante)
- Universidad Nacional de Colombia (Cliente)
- Comedor Social Norte (Restaurante)
- Hospital San Ignacio (Cliente)
- Bancolombia (Cliente)
- Avianca (Cliente)

---

#### 4.2 Gestión de Comedores
**Ruta**: `/planeacion/comedores`

**Descripción**: Administración de comedores asociados a empresas.

**Funcionalidades**:
- **Crear comedor**:
  - Nombre del comedor
  - Empresa asociada (selector)
  - Ubicación/Dirección
  - Capacidad (número de personas)
  - Horarios de servicio
  - Responsable
  - Teléfono de contacto
  - Estado (Activo/Inactivo)

- **Listar comedores**:
  - Tabla con todos los comedores
  - Búsqueda por nombre
  - Filtro por empresa
  - Filtro por estado
  - Vista de la empresa asociada

- **Editar comedor**:
  - Modificar información
  - Cambiar empresa
  - Actualizar capacidad

- **Ver detalles**:
  - Modal con información completa
  - Datos de la empresa
  - Horarios de servicio

- **Eliminar comedor**:
  - Eliminación con confirmación

**Comedores de ejemplo**:
- Comedor Central - Ecopetrol (Bogotá)
- Comedor Norte - Ecopetrol (Bogotá)
- Comedor Principal - Bancolombia (Medellín)
- Comedor Ejecutivo - Avianca (Bogotá)
- Comedor Hospital San Ignacio (Bogotá)
- Comedor Universidad Nacional (Bogotá)

---

#### 4.3 Gestión de Menú
**Ruta**: `/planeacion/menu`

**Descripción**: Composición de menús semanales combinando platillos existentes.

**Funcionalidades**:
- **Crear menú semanal**:
  - Nombre del menú
  - Comedor destino
  - Semana de vigencia (fecha inicio - fin)
  - Selección de platillos por día y tipo de comida
  
- **Matriz de planificación**:
  - **Días**: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado
  - **Tipos de comida**: Desayuno, Almuerzo, Cena
  - **Selector de platillos**: Por cada combinación día/comida
  
- **Listar menús**:
  - Tabla con menús creados
  - Búsqueda por nombre
  - Filtro por comedor
  - Filtro por semana
  - Estado (Activo/Programado/Vencido)

- **Editar menú**:
  - Modificar platillos asignados
  - Cambiar semana de vigencia
  - Actualizar comedor

- **Ver detalles**:
  - Vista completa del menú semanal
  - Grilla visual día/comida
  - Información nutricional total

- **Duplicar menú**:
  - Clonar menú existente para nueva semana

**Flujo de creación**:
1. Seleccionar comedor destino
2. Definir semana de vigencia
3. Para cada día de la semana:
   - Seleccionar desayuno (opcional)
   - Seleccionar almuerzo (opcional)
   - Seleccionar cena (opcional)
4. Revisar y guardar

**Validaciones**:
- Al menos un platillo por menú
- Fechas de vigencia coherentes
- Comedor debe estar activo

---

### **MÓDULO 5: GESTIÓN DE PRODUCCIÓN**

#### 5.1 Gestión de Pedidos
**Ruta**: `/produccion/pedidos`

**Descripción**: Visualización y gestión de pedidos realizados por empleados.

**Funcionalidades**:
- **Listar pedidos**:
  - Tabla con todos los pedidos
  - Búsqueda por empleado/empresa
  - Filtro por estado
  - Filtro por fecha
  - Filtro por comedor

- **Estados de pedido**:
  - **Confirmado**: Pedido recibido y validado
  - **En Producción**: En proceso de preparación
  - **Completado**: Listo para entrega
  - **Entregado**: Entregado al empleado
  - **Cancelado**: Pedido cancelado

- **Ver detalles del pedido**:
  - Información del empleado
  - Empresa y comedor
  - Semana seleccionada
  - Desglose de comidas por día
  - Total de platillos
  - Resumen nutricional

- **Cambiar estado**:
  - Actualizar estado del pedido
  - Registro de cambios de estado

- **Generar orden de producción**:
  - Crear orden basada en pedidos
  - Consolidar múltiples pedidos

**Información del pedido**:
- ID del pedido
- Empleado (nombre, documento)
- Empresa
- Comedor
- Semana (fecha inicio - fin)
- Fecha del pedido
- Estado
- Total de comidas
- Desglose diario (desayuno/almuerzo/cena)

---

#### 5.2 Gestión de Orden de Producción
**Ruta**: `/produccion/ordenes`

**Descripción**: Consolidación de pedidos para producción en cocina.

**Funcionalidades**:
- **Crear orden de producción**:
  - Seleccionar fecha de producción
  - Seleccionar comedor
  - Filtrar pedidos confirmados
  - Consolidar platillos
  - Generar cantidades totales

- **Lista de órdenes**:
  - Tabla con órdenes creadas
  - Búsqueda por fecha
  - Filtro por comedor
  - Filtro por estado

- **Detalle de orden**:
  - Lista de platillos a producir
  - Cantidades totales por platillo
  - Lista de ingredientes consolidados
  - Número de pedidos incluidos
  - Número de empleados atendidos

- **Consolidación automática**:
  - Suma automática de platillos repetidos
  - Cálculo de ingredientes necesarios
  - Resumen nutricional total

- **Estados de orden**:
  - **Pendiente**: Orden creada
  - **En Producción**: En proceso
  - **Completada**: Producción finalizada
  - **Entregada**: Alimentos distribuidos

- **Imprimir orden**:
  - Generar documento para cocina
  - Lista de producción
  - Checklist de platillos

**Ejemplo de consolidación**:
- Si 50 empleados pidieron "Arroz con Pollo" el lunes
- La orden muestra: "Arroz con Pollo: 50 porciones"

---

### **MÓDULO 6: CONFIGURACIÓN**

#### 6.1 Gestión de Roles
**Ruta**: `/configuracion/roles`

**Descripción**: Administración de roles y permisos del sistema.

**Funcionalidades**:
- **Crear rol**:
  - Nombre del rol
  - Descripción
  - Permisos por módulo

- **Listar roles**:
  - Tabla con roles del sistema
  - Cantidad de usuarios por rol
  - Estado del rol

- **Editar rol**:
  - Modificar nombre y descripción
  - Actualizar permisos

- **Asignar permisos**:
  - Permisos granulares por módulo
  - Lectura, Escritura, Edición, Eliminación

- **Eliminar rol**:
  - Solo si no tiene usuarios asignados

**Roles predefinidos**:
- **Administrador**: Acceso total
- **Gestor**: Gestión de producción y pedidos
- **Usuario**: Consulta de información
- **Cocinero**: Gestión de órdenes de producción

**Permisos por módulo**:
- Dashboard: Ver
- Usuarios: Ver, Crear, Editar, Eliminar
- Platillos: Ver, Crear, Editar, Eliminar
- Empresas: Ver, Crear, Editar, Eliminar
- Comedores: Ver, Crear, Editar, Eliminar
- Menús: Ver, Crear, Editar, Eliminar
- Pedidos: Ver, Gestionar
- Órdenes: Ver, Crear, Gestionar

---

## 📱 APLICACIÓN MÓVIL PARA EMPLEADOS

### **PANTALLA 1: LOGIN**

**Ruta**: `/mobile/login`

**Descripción**: Pantalla de autenticación para empleados.

**Funcionalidades**:
- **Inicio de sesión**:
  - Documento de identidad
  - Contraseña
  - Validación de credenciales

- **Credenciales de prueba**:
  - Documento: `1234567890`
  - Contraseña: `empleado123`

- **Link a registro**:
  - "¿No tienes cuenta? Regístrate aquí"

- **Validación**:
  - Verifica usuario mock predeterminado
  - Verifica usuarios registrados en localStorage
  - Guarda sesión en localStorage

**Datos de sesión guardados**:
- empleadoLoggedIn: "true"
- empleadoData: Objeto con información del empleado

---

### **PANTALLA 2: REGISTRO**

**Ruta**: `/mobile/register`

**Descripción**: Formulario de registro para nuevos empleados.

**Funcionalidades**:
- **Formulario de registro**:
  - Nombre completo (requerido)
  - Documento de identidad (mínimo 6 caracteres)
  - Email corporativo (validación de formato)
  - Teléfono (mínimo 10 dígitos)
  - Cargo (requerido)
  - Comedor asignado (selector)
  - Contraseña (mínimo 6 caracteres)
  - Confirmar contraseña (validación de coincidencia)

- **Comedores disponibles**:
  - Comedor Central - Ecopetrol
  - Comedor Norte - Ecopetrol
  - Comedor Principal - Bancolombia
  - Comedor Ejecutivo - Avianca

- **Validaciones**:
  - Todos los campos obligatorios
  - Formato de email válido
  - Contraseñas coinciden
  - Documento único

- **Proceso de registro**:
  1. Llenar formulario
  2. Validar datos
  3. Guardar en localStorage
  4. Mensaje de éxito
  5. Redirección automática a login

- **Link a login**:
  - "¿Ya tienes cuenta? Inicia Sesión"

---

### **PANTALLA 3: HOME (Principal)**

**Ruta**: `/mobile/home`

**Descripción**: Pantalla principal del empleado con menús disponibles.

**Funcionalidades**:
- **Header con información del empleado**:
  - Avatar con iniciales
  - Nombre del empleado
  - Empresa y comedor asignado
  - Botón de cerrar sesión

- **Selector de semana**:
  - Selector de fecha
  - Visualiza semana actual por defecto
  - Permite seleccionar semanas futuras

- **Listado de menús disponibles**:
  - Tarjetas con información del menú
  - Nombre del menú
  - Comedor
  - Rango de fechas (semana)
  - Badge con cantidad de platillos
  - Estado (Disponible/Próximamente)

- **Acciones por menú**:
  - Botón "Seleccionar" para hacer pedido
  - Redirección a pantalla de selección semanal

- **Validación de sesión**:
  - Si no hay sesión, redirige a login

- **Estado de pedido**:
  - Indicador si ya hizo pedido esta semana

**Menús de ejemplo**:
- Menú Semanal Ejecutivo - Ecopetrol
- Menú Vegetariano - Bancolombia
- Menú Tradicional - Avianca

---

### **PANTALLA 4: SELECCIÓN DE MENÚ SEMANAL**

**Ruta**: `/mobile/weekly-menu`

**Descripción**: Interfaz para seleccionar platillos día por día.

**Funcionalidades**:
- **Selector de día**:
  - Tabs horizontales deslizables
  - Lunes, Martes, Miércoles, Jueves, Viernes, Sábado
  - Indicador visual del día seleccionado (rojo)

- **Vista de platillos por día**:
  - Agrupados por tipo de comida:
    -  Desayuno
    -  Almuerzo
    -  media tarde

- **Tarjetas de platillos**:
  - Imagen del platillo
  - Nombre
  - Categoría
  - Descripción
  - Calorías
  - Botón "Seleccionar" / "Seleccionado"

- **Selección de platillos**:
  - Click en "Seleccionar" para elegir
  - Cambio visual a "Seleccionado" (verde)
  - Permite cambiar selección
  - Máximo 1 platillo por tipo de comida por día

- **Resumen flotante**:
  - Badge con total de comidas seleccionadas
  - Acceso rápido al resumen

- **Botón confirmar pedido**:
  - Fijo en la parte inferior
  - Muestra total de selecciones
  - Confirmación antes de guardar

- **Proceso de confirmación**:
  1. Revisar selecciones
  2. Confirmar pedido
  3. Guardar en localStorage
  4. Generar ID único de pedido
  5. Mensaje de éxito
  6. Redirección a "Mis Pedidos"

**Validaciones**:
- Al menos 1 comida seleccionada
- Usuario debe estar logueado
- Menú debe estar disponible para su comedor

---

### **PANTALLA 5: MIS PEDIDOS**

**Ruta**: `/mobile/my-orders`

**Descripción**: Historial de pedidos realizados por el empleado.

**Funcionalidades**:
- **Lista de pedidos**:
  - Tarjetas con información resumida
  - ID del pedido (últimos 4 dígitos)
  - Semana del pedido
  - Fecha de realización
  - Estado (Confirmado/En Producción/Completado)
  - Badge con total de comidas

- **Estados visuales**:
  - Confirmado: Verde
  - En Producción: Naranja
  - Completado: Azul

- **Ver detalles**:
  - Botón "Ver Detalles" por pedido
  - Modal con información completa

- **Modal de detalle**:
  - Semana del pedido
  - Total de comidas
  - Desglose por día:
    - Nombre del día
    - Por cada comida:
      - Tipo (Desayuno/Almuerzo/Cena)
      - Nombre del platillo
      - Check de confirmación

- **Estado vacío**:
  - Mensaje cuando no hay pedidos
  - Botón "Hacer Pedido"
  - Redirección a selección de menú

- **Filtros** (futuro):
  - Por semana
  - Por estado

---

### **PANTALLA 6: PERFIL**

**Ruta**: `/mobile/profile`

**Descripción**: Información personal del empleado.

**Funcionalidades**:
- **Avatar del empleado**:
  - Icono de usuario
  - Gradiente rojo-naranja
  - Visual destacado

- **Información personal**:
  - Nombre completo
  - Cargo
  - Número de documento

- **Tarjetas de información**:
  - 📧 **Email**: Email corporativo
  - 📞 **Teléfono**: Número de contacto
  - 🏢 **Empresa**: Nombre de la empresa
  - 📍 **Comedor Asignado**: Comedor donde come
  - 💼 **Cargo**: Puesto de trabajo

- **Acciones del perfil**:
  - **Ver Mis Pedidos**: Redirección a historial
  - **Cerrar Sesión**: 
    - Confirmación con diálogo
    - Limpia localStorage
    - Redirección a login

- **Diálogo de cierre de sesión**:
  - Mensaje de confirmación
  - Botón "Cancelar"
  - Botón "Cerrar Sesión" (rojo)

**Datos mostrados**:
- Información de empleadoData (localStorage)
- Estado de sesión

---

### **NAVEGACIÓN MÓVIL (Bottom Navigation)**

**Presente en**: Home, Mis Pedidos, Perfil

**Opciones**:
1. **🍽️ Inicio** → `/mobile/home`
2. **📋 Mis Pedidos** → `/mobile/my-orders`
3. **👤 Perfil** → `/mobile/profile`

**Indicador visual**:
- Pestaña activa: Fondo rojo claro, texto rojo
- Pestañas inactivas: Texto gris

---

## 🔄 FLUJOS PRINCIPALES DEL SISTEMA

### **FLUJO 1: Configuración Inicial (Administrador)**

```
1. Crear Empresas
   ↓
2. Crear Comedores (asociados a empresas)
   ↓
3. Crear Platillos (catálogo de comidas)
   ↓
4. Crear Menús Semanales (combinar platillos)
   ↓
5. Publicar menús para comedores
```

**Actores**: Administrador

**Objetivo**: Preparar el sistema para que empleados puedan hacer pedidos

---

### **FLUJO 2: Registro y Selección de Menú (Empleado)**

```
1. Empleado se registra en app móvil
   ↓
2. Selecciona su comedor asignado
   ↓
3. Inicia sesión con documento y contraseña
   ↓
4. Ve menús disponibles para su comedor
   ↓
5. Selecciona un menú para la semana
   ↓
6. Para cada día, selecciona desayuno/almuerzo/cena
   ↓
7. Revisa sus selecciones
   ↓
8. Confirma el pedido
   ↓
9. Pedido guardado como "Confirmado"
   ↓
10. Puede ver su pedido en "Mis Pedidos"
```

**Actores**: Empleado

**Objetivo**: Empleado planifica sus comidas de la semana

---

### **FLUJO 3: Gestión de Pedidos y Producción (Gestor)**

```
1. Gestor accede a "Gestión de Pedidos"
   ↓
2. Filtra pedidos por comedor y semana
   ↓
3. Revisa pedidos "Confirmados"
   ↓
4. Selecciona pedidos para producción
   ↓
5. Crea "Orden de Producción"
   ↓
6. Sistema consolida platillos:
   - Suma cantidades de platillos repetidos
   - Calcula ingredientes totales
   - Genera lista de producción
   ↓
7. Orden de Producción se envía a cocina
   ↓
8. Cocina marca orden como "En Producción"
   ↓
9. Al terminar, marca como "Completada"
   ↓
10. Alimentos se entregan según pedidos
   ↓
11. Pedidos se marcan como "Entregados"
```

**Actores**: Gestor de Producción, Cocinero

**Objetivo**: Consolidar pedidos y producir alimentos eficientemente

---

### **FLUJO 4: Creación de Menú Semanal (Administrador)**

```
1. Accede a "Gestión de Menú"
   ↓
2. Click en "Crear Menú"
   ↓
3. Selecciona comedor destino
   ↓
4. Define semana (fecha inicio - fin)
   ↓
5. Para cada día (Lunes a Sábado):
   a. Selecciona platillo para DESAYUNO (opcional)
   b. Selecciona platillo para ALMUERZO (opcional)
   c. Selecciona platillo para CENA (opcional)
   ↓
6. Revisa el menú completo
   ↓
7. Guarda el menú
   ↓
8. Menú queda disponible para empleados de ese comedor
```

**Actores**: Administrador

**Objetivo**: Crear menús semanales variados para los comedores

---

### **FLUJO 5: Gestión de Usuarios (Administrador)**

```
1. Accede a "Gestión de Usuarios"
   ↓
2. Click en "Crear Usuario"
   ↓
3. Ingresa datos:
   - Nombre
   - Email
   - Rol
   - Contraseña
   ↓
4. Guarda usuario
   ↓
5. Usuario creado con estado "Activo"
   ↓
6. Puede editar, desactivar o eliminar usuarios
```

**Actores**: Administrador

**Objetivo**: Administrar usuarios del panel web

---

## 📊 MODELO DE DATOS

### Entidades Principales:

1. **Usuario (Panel Web)**
   - id
   - nombre
   - email
   - password
   - rol (Admin/Gestor/Usuario)
   - estado (Activo/Inactivo)
   - fechaCreacion

2. **Empleado (App Móvil)**
   - id
   - nombre
   - documento
   - email
   - telefono
   - cargo
   - empresa
   - comedorId
   - comedor
   - password

3. **Empresa**
   - id
   - nombre
   - tipo (Cliente/Restaurante)
   - nit
   - ciudad
   - direccion
   - contacto
   - email
   - telefono
   - estado (Activa/Inactiva)
   - fechaRegistro

4. **Comedor**
   - id
   - nombre
   - empresaId
   - empresa (nombre)
   - ubicacion
   - capacidad
   - horarios
   - responsable
   - telefono
   - estado (Activo/Inactivo)

5. **Platillo**
   - id
   - nombre
   - descripcion
   - categoria (Plato Fuerte/Ensalada/Sopa/Postre/Bebida/Desayuno)
   - calorias
   - imagen (URL)
   - precio
   - ingredientes
   - estado (Disponible/No Disponible)

6. **Menú**
   - id
   - nombre
   - comedorId
   - comedor (nombre)
   - semana (fecha inicio - fin)
   - platillos (matriz día/tipo de comida)
   - estado (Activo/Programado/Vencido)

7. **Pedido**
   - id
   - empleadoId
   - empleado (datos)
   - empresaId
   - comedorId
   - menuId
   - semana
   - selecciones (matriz día/tipo de comida/platillo)
   - fecha
   - estado (Confirmado/En Producción/Completado/Entregado/Cancelado)
   - totalComidas

8. **Orden de Producción**
   - id
   - fecha
   - comedorId
   - pedidosIncluidos (IDs)
   - platillosConsolidados (platillo + cantidad)
   - ingredientesConsolidados
   - totalEmpleados
   - estado (Pendiente/En Producción/Completada/Entregada)

9. **Rol**
   - id
   - nombre
   - descripcion
   - permisos (array de módulos/acciones)
   - usuariosAsignados

---

## 🔐 AUTENTICACIÓN Y SEGURIDAD

### Panel Web:
- Login con email y contraseña
- Sesión persistente (localStorage)
- Control de acceso por roles
- Permisos granulares por módulo

### App Móvil:
- Login con documento y contraseña
- Registro de nuevos empleados
- Sesión persistente (localStorage)
- Validación de comedor asignado

---

## 💾 ALMACENAMIENTO (Estado Actual)

### Panel Web:
- Datos mock en memoria (estado de React)
- Actualizar en memoria durante sesión
- Se pierde al recargar

### App Móvil:
- **localStorage** para persistencia:
  - empleadoLoggedIn
  - empleadoData
  - pedidosEmpleado
  - usuariosRegistrados

---

## 🎨 COMPONENTES UI (shadcn/ui)

### Componentes utilizados:
- Button
- Input
- Card
- Table
- Dialog
- Select
- Switch
- Badge
- Tabs
- ScrollArea
- AlertDialog
- Toast (Sonner)

---

## 📱 RUTAS DEL SISTEMA

### Panel Web (con Layout):
- `/` - Dashboard
- `/usuarios/gestion` - Gestión de Usuarios
- `/usuarios/acceso` - Gestión de Acceso
- `/platillos/gestion` - Gestión de Platillos
- `/planeacion/empresas` - Gestión de Empresas
- `/planeacion/comedores` - Gestión de Comedores
- `/planeacion/menu` - Gestión de Menú
- `/produccion/pedidos` - Gestión de Pedidos
- `/produccion/ordenes` - Gestión de Órdenes de Producción
- `/configuracion/roles` - Gestión de Roles

### App Móvil (sin Layout):
- `/mobile/login` - Login de Empleado
- `/mobile/register` - Registro de Empleado
- `/mobile/home` - Home del Empleado
- `/mobile/weekly-menu` - Selección de Menú Semanal
- `/mobile/my-orders` - Mis Pedidos
- `/mobile/profile` - Perfil del Empleado

---

## 🚀 CASOS DE USO PRINCIPALES

### CU-01: Registrar Empleado
**Actor**: Empleado
**Precondición**: Tener datos corporativos
**Flujo**:
1. Accede a /mobile/register
2. Llena formulario de registro
3. Selecciona comedor asignado
4. Define contraseña
5. Sistema valida y guarda datos
6. Redirecciona a login

### CU-02: Iniciar Sesión Empleado
**Actor**: Empleado
**Precondición**: Estar registrado
**Flujo**:
1. Accede a /mobile/login
2. Ingresa documento y contraseña
3. Sistema valida credenciales
4. Guarda sesión
5. Redirecciona a home

### CU-03: Seleccionar Menú Semanal
**Actor**: Empleado
**Precondición**: Estar logueado, existir menú disponible
**Flujo**:
1. Ve menús disponibles en home
2. Selecciona un menú
3. Para cada día selecciona platillos
4. Revisa selecciones
5. Confirma pedido
6. Sistema guarda pedido como "Confirmado"

### CU-04: Crear Platillo
**Actor**: Administrador
**Precondición**: Tener sesión activa con permisos
**Flujo**:
1. Accede a /platillos/gestion
2. Click en "Crear Platillo"
3. Llena formulario (nombre, categoría, etc.)
4. Sube imagen
5. Guarda platillo
6. Platillo disponible para menús

### CU-05: Crear Empresa
**Actor**: Administrador
**Precondición**: Tener sesión activa con permisos
**Flujo**:
1. Accede a /planeacion/empresas
2. Click en "Crear Empresa"
3. Llena formulario (nombre, NIT, tipo, etc.)
4. Guarda empresa
5. Empresa disponible para comedores

### CU-06: Crear Comedor
**Actor**: Administrador
**Precondición**: Existir al menos una empresa
**Flujo**:
1. Accede a /planeacion/comedores
2. Click en "Crear Comedor"
3. Llena formulario
4. Selecciona empresa
5. Guarda comedor
6. Comedor disponible para menús

### CU-07: Crear Menú Semanal
**Actor**: Administrador
**Precondición**: Existir comedor y platillos
**Flujo**:
1. Accede a /planeacion/menu
2. Click en "Crear Menú"
3. Selecciona comedor
4. Define semana
5. Asigna platillos por día/comida
6. Guarda menú
7. Menú disponible para empleados

### CU-08: Gestionar Pedidos
**Actor**: Gestor de Producción
**Precondición**: Existir pedidos confirmados
**Flujo**:
1. Accede a /produccion/pedidos
2. Filtra pedidos por comedor/semana
3. Revisa detalles de pedidos
4. Cambia estados según avance
5. Genera orden de producción

### CU-09: Crear Orden de Producción
**Actor**: Gestor de Producción
**Precondición**: Existir pedidos confirmados
**Flujo**:
1. Accede a /produccion/ordenes
2. Click en "Crear Orden"
3. Selecciona fecha y comedor
4. Sistema filtra pedidos
5. Sistema consolida platillos
6. Genera cantidades totales
7. Guarda orden
8. Orden disponible para cocina

### CU-10: Ver Historial de Pedidos
**Actor**: Empleado
**Precondición**: Haber realizado pedidos
**Flujo**:
1. Accede a /mobile/my-orders
2. Ve lista de pedidos históricos
3. Puede ver detalles de cada pedido
4. Revisa estado actual

### CU-11: Gestionar Usuarios
**Actor**: Administrador
**Precondición**: Tener permisos de administrador
**Flujo**:
1. Accede a /usuarios/gestion
2. Puede crear, editar, eliminar usuarios
3. Asigna roles
4. Activa/desactiva usuarios

### CU-12: Configurar Roles
**Actor**: Administrador
**Precondición**: Tener permisos de administrador
**Flujo**:
1. Accede a /configuracion/roles
2. Crea o edita roles
3. Asigna permisos por módulo
4. Guarda configuración

---

## 📈 CARACTERÍSTICAS ADICIONALES

### Dashboard:
- Métricas en tiempo real
- Gráficos interactivos (Recharts)
- Visualización de tendencias
- Alertas de pedidos atrasados

### Búsqueda y Filtros:
- Búsqueda en tiempo real
- Filtros múltiples
- Paginación (futuro)

### Responsividad:
- Panel web: Diseño desktop
- App móvil: Diseño mobile-first
- Navegación adaptativa

### Notificaciones:
- Toast notifications (Sonner)
- Confirmaciones de acciones
- Alertas de errores

---

## 🔮 FUNCIONALIDADES FUTURAS

1. **Integración con Backend (Supabase)**
   - Base de datos real
   - Autenticación segura
   - Storage de imágenes

2. **Notificaciones Push**
   - Recordatorios de pedidos
   - Cambios de menú
   - Estados de producción

3. **Reportes y Analytics**
   - Exportar a PDF/Excel
   - Dashboards personalizados
   - Métricas avanzadas

4. **Gestión de Inventario**
   - Control de ingredientes
   - Alertas de stock
   - Integración con proveedores

5. **Sistema de Calificaciones**
   - Empleados califican platillos
   - Feedback de menús
   - Mejora continua

6. **Pagos Integrados**
   - Sistema de créditos
   - Descuentos corporativos
   - Facturación automática

---

## 📞 DATOS DE CONTACTO DEL SISTEMA

- **Nombre**: WasteLess
- **Tagline**: Gestión de Comedores Empresariales
- **Año**: 2026
- **Colores**: #E7000B (rojo principal), #10b981 (verde), #f59e0b (naranja)

---

## 📝 NOTAS IMPORTANTES

1. **Datos actuales**: Todo usa datos mock/localStorage
2. **Persistencia**: Solo en app móvil vía localStorage
3. **Imágenes**: URLs de Unsplash
4. **Framework**: React + TypeScript + Tailwind CSS v4
5. **Routing**: React Router v7
6. **UI Library**: shadcn/ui
7. **Iconos**: Lucide React
8. **Gráficos**: Recharts

---

Este documento describe completamente el sistema WasteLess y puede ser usado para crear diagramas de casos de uso, diagramas de flujo, documentación técnica y presentaciones del proyecto.
