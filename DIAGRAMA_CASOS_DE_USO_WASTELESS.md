# 📊 DIAGRAMA DE CASOS DE USO - WASTELESS

## 👥 ACTORES DEL SISTEMA

### 🔵 Actor 1: ADMINISTRADOR
**Descripción**: Usuario con acceso completo al sistema web. Responsable de la configuración y gestión general.

**Responsabilidades**:
- Configurar el sistema (empresas, comedores, platillos)
- Gestionar usuarios administrativos
- Crear y gestionar roles y permisos
- Crear menús semanales
- Supervisar todo el sistema

---

### 🟢 Actor 2: GESTOR DE PRODUCCIÓN
**Descripción**: Usuario del sistema web encargado de la gestión de pedidos y órdenes de producción.

**Responsabilidades**:
- Visualizar pedidos de empleados
- Gestionar estados de pedidos
- Crear órdenes de producción
- Consolidar pedidos
- Monitorear producción en cocina

---

### 🟡 Actor 3: EMPLEADO/TRABAJADOR
**Descripción**: Usuario final de la aplicación móvil. Empleado de alguna empresa cliente.

**Responsabilidades**:
- Registrarse en el sistema
- Iniciar sesión en app móvil
- Seleccionar menús semanales
- Ver sus pedidos
- Gestionar su perfil

---

## 📋 DIAGRAMA DE CASOS DE USO

```
                    SISTEMA WASTELESS
    ┌────────────────────────────────────────────────────────────┐
    │                                                            │
    │  ┌──────────────────────────────────────────────────┐     │
    │  │         MÓDULO ADMINISTRATIVO (WEB)              │     │
    │  │                                                  │     │
🔵  │  │  CU-01: Gestionar Empresas                      │     │
ADMIN│  │    ├── Crear Empresa                            │     │
══════►  │    ├── Editar Empresa                           │     │
    │  │    ├── Ver Empresa                              │     │
    │  │    └── Eliminar Empresa                         │     │
    │  │                                                  │     │
    │  │  CU-02: Gestionar Comedores                     │     │
    │  │    ├── Crear Comedor                            │     │
══════►  │    ├── Editar Comedor                           │     │
    │  │    ├── Ver Comedor                              │     │
    │  │    └── Eliminar Comedor                         │     │
    │  │                                                  │     │
    │  │  CU-03: Gestionar Platillos                     │     │
    │  │    ├── Crear Platillo                           │     │
══════►  │    ├── Editar Platillo                          │     │
    │  │    ├── Ver Platillo                             │     │
    │  │    └── Eliminar Platillo                        │     │
    │  │                                                  │     │
    │  │  CU-04: Gestionar Menús Semanales               │     │
    │  │    ├── Crear Menú                               │     │
══════►  │    ├── Editar Menú                              │     │
    │  │    ├── Ver Menú                                 │     │
    │  │    ├── Duplicar Menú                            │     │
    │  │    └── Asignar Platillos por Día               │     │
    │  │                                                  │     │
    │  │  CU-05: Gestionar Usuarios                      │     │
    │  │    ├── Crear Usuario                            │     │
══════►  │    ├── Editar Usuario                           │     │
    │  │    ├── Ver Usuario                              │     │
    │  │    ├── Eliminar Usuario                         │     │
    │  │    └── Activar/Desactivar Usuario               │     │
    │  │                                                  │     │
    │  │  CU-06: Gestionar Roles                         │     │
    │  │    ├── Crear Rol                                │     │
══════►  │    ├── Editar Rol                               │     │
    │  │    ├── Asignar Permisos                         │     │
    │  │    └── Eliminar Rol                             │     │
    │  │                                                  │     │
    │  │  CU-07: Ver Dashboard                           │     │
══════►  │    └── Ver Métricas y Estadísticas             │     │
    │  │                                                  │     │
    │  └──────────────────────────────────────────────────┘     │
    │                                                            │
    │  ┌──────────────────────────────────────────────────┐     │
    │  │       MÓDULO DE PRODUCCIÓN (WEB)                │     │
    │  │                                                  │     │
🟢  │  │  CU-08: Gestionar Pedidos                       │     │
GESTOR   │    ├── Ver Lista de Pedidos                     │     │
══════►  │    ├── Ver Detalle de Pedido                    │     │
    │  │    ├── Cambiar Estado de Pedido                │     │
    │  │    └── Filtrar Pedidos                          │     │
    │  │                                                  │     │
    │  │  CU-09: Gestionar Órdenes de Producción         │     │
    │  │    ├── Crear Orden de Producción                │     │
══════►  │    ├── Consolidar Pedidos                       │     │
    │  │    ├── Ver Orden de Producción                  │     │
    │  │    ├── Cambiar Estado de Orden                  │     │
    │  │    └── Imprimir Orden                           │     │
    │  │                                                  │     │
    │  │  CU-07: Ver Dashboard                           │     │
══════►  │    └── Ver Métricas de Producción              │     │
    │  │                                                  │     │
    │  └──────────────────────────────────────────────────┘     │
    │                                                            │
    │  ┌──────────────────────────────────────────────────┐     │
    │  │          APLICACIÓN MÓVIL (EMPLEADOS)            │     │
    │  │                                                  │     │
🟡  │  │  CU-10: Registrarse en el Sistema               │     │
EMPLEADO │    ├── Llenar Formulario de Registro            │     │
══════►  │    ├── Seleccionar Comedor                      │     │
    │  │    └── Crear Contraseña                         │     │
    │  │         │                                        │     │
    │  │         ├──«include»──┐                          │     │
    │  │         │              ▼                         │     │
    │  │  CU-11: Iniciar Sesión                          │     │
══════►  │    ├── Ingresar Documento                       │     │
    │  │    ├── Ingresar Contraseña                      │     │
    │  │    └── Validar Credenciales                     │     │
    │  │                                                  │     │
    │  │  CU-12: Seleccionar Menú Semanal                │     │
    │  │    ├── Ver Menús Disponibles                    │     │
══════►  │    ├── Seleccionar Menú                         │     │
    │  │    ├── Seleccionar Platillos por Día            │     │
    │  │    ├── Revisar Selecciones                      │     │
    │  │    └── Confirmar Pedido                         │     │
    │  │         │                                        │     │
    │  │         ├──«include»──┐                          │     │
    │  │         │              ▼                         │     │
    │  │  CU-13: Ver Mis Pedidos                         │     │
══════►  │    ├── Ver Lista de Pedidos                     │     │
    │  │    ├── Ver Detalle de Pedido                    │     │
    │  │    └── Filtrar por Estado                       │     │
    │  │                                                  │     │
    │  │  CU-14: Gestionar Perfil                        │     │
    │  │    ├── Ver Información Personal                 │     │
══════►  │    ├── Ver Datos de Empresa                     │     │
    │  │    └── Cerrar Sesión                            │     │
    │  │                                                  │     │
    │  └──────────────────────────────────────────────────┘     │
    │                                                            │
    └────────────────────────────────────────────────────────────┘

RELACIONES:
  ════►  Asociación (Actor ejecuta Caso de Uso)
  «include»  Relación de inclusión (CU siempre incluye otro CU)
  «extend»   Relación de extensión (CU opcionalmente extiende otro CU)
```

---

## 📝 DESCRIPCIÓN DETALLADA DE CASOS DE USO

### 🔵 CASOS DE USO DEL ADMINISTRADOR

---

#### **CU-01: Gestionar Empresas**

**Actor**: Administrador

**Descripción**: Permite al administrador crear, editar, ver y eliminar empresas (clientes y restaurantes) en el sistema.

**Precondiciones**: 
- Usuario autenticado como Administrador
- Tener permisos de gestión de empresas

**Flujo Principal**:
1. Administrador accede al módulo "Gestión de Empresas"
2. Sistema muestra lista de empresas existentes
3. Administrador selecciona una acción:
   - **Crear**: Llena formulario con datos de la empresa
   - **Editar**: Modifica datos de empresa existente
   - **Ver**: Visualiza detalles completos
   - **Eliminar**: Elimina empresa (con confirmación)
4. Sistema valida y procesa la acción
5. Sistema muestra mensaje de confirmación
6. Sistema actualiza la lista de empresas

**Postcondiciones**: 
- Empresa creada/modificada/eliminada en el sistema
- Cambios reflejados en la base de datos

**Flujos Alternativos**:
- **3a**: Si hay datos inválidos, mostrar errores y solicitar corrección
- **3b**: Si intenta eliminar empresa con comedores asociados, mostrar advertencia

**Campos del formulario**:
- Nombre de la empresa
- Tipo (Cliente/Restaurante)
- NIT
- Ciudad
- Dirección
- Contacto
- Email
- Teléfono
- Estado (Activa/Inactiva)

---

#### **CU-02: Gestionar Comedores**

**Actor**: Administrador

**Descripción**: Permite gestionar los comedores asociados a las empresas.

**Precondiciones**: 
- Usuario autenticado como Administrador
- Existir al menos una empresa en el sistema

**Flujo Principal**:
1. Administrador accede al módulo "Gestión de Comedores"
2. Sistema muestra lista de comedores con su empresa asociada
3. Administrador selecciona una acción:
   - **Crear**: Selecciona empresa y llena datos del comedor
   - **Editar**: Modifica información del comedor
   - **Ver**: Visualiza detalles y empresa asociada
   - **Eliminar**: Elimina comedor (con confirmación)
4. Sistema valida y procesa la acción
5. Sistema muestra mensaje de confirmación

**Postcondiciones**: 
- Comedor creado/modificado/eliminado
- Comedor asociado correctamente a una empresa

**Campos del formulario**:
- Nombre del comedor
- Empresa (selector)
- Ubicación/Dirección
- Capacidad
- Horarios de servicio
- Responsable
- Teléfono
- Estado (Activo/Inactivo)

---

#### **CU-03: Gestionar Platillos**

**Actor**: Administrador

**Descripción**: Gestión del catálogo de platillos disponibles en el sistema.

**Precondiciones**: 
- Usuario autenticado como Administrador

**Flujo Principal**:
1. Administrador accede a "Gestión de Platillos"
2. Sistema muestra catálogo de platillos en tarjetas con imagen
3. Administrador puede filtrar por categoría
4. Administrador selecciona una acción:
   - **Crear**: Llena formulario y sube imagen
   - **Editar**: Modifica datos y/o imagen
   - **Ver**: Visualiza información completa y nutricional
   - **Eliminar**: Elimina platillo (con confirmación)
5. Sistema valida y procesa la acción
6. Sistema actualiza el catálogo

**Postcondiciones**: 
- Platillo creado/modificado/eliminado
- Imagen almacenada/actualizada

**Campos del formulario**:
- Nombre del platillo
- Descripción
- Categoría (Plato Fuerte, Ensalada, Sopa, Postre, Bebida, Desayuno)
- Calorías
- Imagen (URL o upload)
- Precio
- Ingredientes (lista)
- Estado (Disponible/No Disponible)

**Flujos Alternativos**:
- **4a**: Si intenta eliminar platillo usado en menús activos, mostrar advertencia

---

#### **CU-04: Gestionar Menús Semanales**

**Actor**: Administrador

**Descripción**: Creación y gestión de menús semanales combinando platillos del catálogo.

**Precondiciones**: 
- Usuario autenticado como Administrador
- Existir comedores activos
- Existir platillos disponibles

**Flujo Principal - Crear Menú**:
1. Administrador accede a "Gestión de Menú"
2. Administrador hace clic en "Crear Menú"
3. Sistema muestra formulario de creación
4. Administrador ingresa:
   - Nombre del menú
   - Selecciona comedor destino
   - Define semana (fecha inicio - fecha fin)
5. Sistema muestra matriz de planificación (6 días × 3 comidas)
6. Para cada celda (día/tipo de comida):
   - Administrador selecciona platillo del catálogo
   - Sistema asigna platillo a esa combinación
7. Administrador revisa el menú completo
8. Administrador guarda el menú
9. Sistema valida que haya al menos un platillo
10. Sistema guarda el menú y lo marca como "Activo" o "Programado"

**Flujo Principal - Editar Menú**:
1. Administrador selecciona menú existente
2. Sistema muestra matriz con platillos asignados
3. Administrador modifica selecciones
4. Sistema guarda cambios

**Flujo Principal - Duplicar Menú**:
1. Administrador selecciona menú existente
2. Administrador hace clic en "Duplicar"
3. Sistema crea copia con nueva semana
4. Administrador ajusta fechas y platillos
5. Sistema guarda nuevo menú

**Postcondiciones**: 
- Menú semanal creado y disponible
- Platillos asignados correctamente por día/comida
- Empleados del comedor pueden ver el menú

**Matriz de planificación**:
```
         | Lunes    | Martes   | Miércoles | Jueves   | Viernes  | Sábado
---------|----------|----------|-----------|----------|----------|--------
Desayuno | Platillo | Platillo | Platillo  | Platillo | Platillo | Platillo
Almuerzo | Platillo | Platillo | Platillo  | Platillo | Platillo | Platillo
Cena     | Platillo | Platillo | Platillo  | Platillo | Platillo | Platillo
```

---

#### **CU-05: Gestionar Usuarios**

**Actor**: Administrador

**Descripción**: Gestión de usuarios administrativos del sistema web.

**Precondiciones**: 
- Usuario autenticado como Administrador
- Tener permisos de gestión de usuarios

**Flujo Principal**:
1. Administrador accede a "Gestión de Usuarios"
2. Sistema muestra tabla con usuarios existentes
3. Administrador puede buscar/filtrar usuarios
4. Administrador selecciona una acción:
   - **Crear**: Llena formulario con datos y asigna rol
   - **Editar**: Modifica información y/o rol
   - **Ver**: Visualiza perfil completo
   - **Eliminar**: Elimina usuario
   - **Activar/Desactivar**: Cambia estado con switch
5. Sistema valida y procesa la acción
6. Sistema actualiza lista de usuarios

**Postcondiciones**: 
- Usuario creado/modificado/eliminado
- Permisos asignados según rol

**Campos del formulario**:
- Nombre completo
- Email
- Rol (Administrador, Gestor, Usuario, Cocinero)
- Contraseña (solo al crear)
- Estado (Activo/Inactivo)

---

#### **CU-06: Gestionar Roles**

**Actor**: Administrador

**Descripción**: Configuración de roles y permisos del sistema.

**Precondiciones**: 
- Usuario autenticado como Administrador

**Flujo Principal**:
1. Administrador accede a "Gestión de Roles"
2. Sistema muestra lista de roles
3. Administrador selecciona una acción:
   - **Crear**: Define nombre, descripción y permisos
   - **Editar**: Modifica permisos del rol
   - **Eliminar**: Elimina rol (solo si no tiene usuarios)
4. Sistema muestra matriz de permisos por módulo
5. Administrador marca permisos (Ver, Crear, Editar, Eliminar)
6. Sistema guarda configuración
7. Sistema aplica permisos a usuarios con ese rol

**Postcondiciones**: 
- Rol creado/modificado con permisos específicos
- Usuarios con ese rol tienen acceso actualizado

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

#### **CU-07: Ver Dashboard**

**Actor**: Administrador, Gestor de Producción

**Descripción**: Visualización de métricas, estadísticas y gráficos del sistema.

**Precondiciones**: 
- Usuario autenticado

**Flujo Principal**:
1. Usuario accede al Dashboard (ruta raíz)
2. Sistema muestra:
   - **Tarjetas de métricas**:
     - Pedidos activos (completados/pendientes)
     - Impacto económico mensual
     - Control del desperdicio (kg reducidos)
   - **Gráfico de barras**: Desperdicio por categoría de alimentos
   - **Gráfico de área**: Tendencias mensuales
   - **Lista de órdenes**: Pedidos recientes con estados
3. Usuario puede filtrar por período de tiempo
4. Sistema actualiza visualizaciones

**Postcondiciones**: 
- Métricas visualizadas
- Usuario tiene visión general del sistema

---

### 🟢 CASOS DE USO DEL GESTOR DE PRODUCCIÓN

---

#### **CU-08: Gestionar Pedidos**

**Actor**: Gestor de Producción

**Descripción**: Visualización y gestión de pedidos realizados por empleados.

**Precondiciones**: 
- Usuario autenticado como Gestor
- Existir pedidos en el sistema

**Flujo Principal**:
1. Gestor accede a "Gestión de Pedidos"
2. Sistema muestra tabla con todos los pedidos
3. Gestor puede filtrar por:
   - Estado (Confirmado, En Producción, Completado, etc.)
   - Comedor
   - Fecha/Semana
   - Empresa
4. Gestor selecciona un pedido
5. Sistema muestra detalle completo:
   - Información del empleado
   - Empresa y comedor
   - Semana del pedido
   - Desglose de comidas por día
   - Total de comidas
6. Gestor puede cambiar estado del pedido
7. Sistema actualiza estado y notifica cambios

**Postcondiciones**: 
- Estado del pedido actualizado
- Cambios registrados en el sistema

**Estados de pedido**:
- Confirmado
- En Producción
- Completado
- Entregado
- Cancelado

---

#### **CU-09: Gestionar Órdenes de Producción**

**Actor**: Gestor de Producción

**Descripción**: Consolidación de pedidos en órdenes de producción para la cocina.

**Precondiciones**: 
- Usuario autenticado como Gestor
- Existir pedidos confirmados

**Flujo Principal - Crear Orden**:
1. Gestor accede a "Gestión de Órdenes de Producción"
2. Gestor hace clic en "Crear Orden"
3. Sistema muestra formulario:
   - Seleccionar fecha de producción
   - Seleccionar comedor
4. Sistema filtra pedidos confirmados para esa fecha/comedor
5. Sistema consolida automáticamente:
   - Suma cantidades de platillos repetidos
   - Calcula ingredientes totales
   - Cuenta empleados incluidos
6. Sistema muestra resumen de la orden:
   - Lista de platillos con cantidades
   - Total de porciones por platillo
   - Número de empleados
   - Ingredientes consolidados
7. Gestor revisa y confirma
8. Sistema crea orden de producción
9. Sistema cambia estado de pedidos a "En Producción"

**Flujo Principal - Gestionar Orden**:
1. Gestor visualiza órdenes existentes
2. Gestor selecciona una orden
3. Sistema muestra detalle completo
4. Gestor puede:
   - Cambiar estado (Pendiente → En Producción → Completada → Entregada)
   - Imprimir orden para cocina
   - Agregar observaciones
5. Sistema actualiza estado

**Postcondiciones**: 
- Orden de producción creada
- Pedidos consolidados
- Cocina tiene lista de producción

**Ejemplo de consolidación**:
```
Si hay 50 pedidos que incluyen "Arroz con Pollo" para el lunes:
Orden muestra: "Arroz con Pollo: 50 porciones - Lunes - Almuerzo"
```

---

### 🟡 CASOS DE USO DEL EMPLEADO

---

#### **CU-10: Registrarse en el Sistema**

**Actor**: Empleado

**Descripción**: Registro de nuevo empleado en la aplicación móvil.

**Precondiciones**: 
- Tener acceso a la app móvil
- Tener datos corporativos

**Flujo Principal**:
1. Empleado abre app móvil
2. Empleado hace clic en "Registrarse"
3. Sistema muestra formulario de registro
4. Empleado completa:
   - Nombre completo
   - Número de documento
   - Email corporativo
   - Teléfono
   - Cargo
   - Comedor asignado (selector con opciones)
   - Contraseña
   - Confirmar contraseña
5. Sistema valida datos:
   - Todos los campos completos
   - Email válido
   - Documento único (no registrado)
   - Contraseñas coinciden (mínimo 6 caracteres)
6. Sistema guarda registro
7. Sistema muestra mensaje de éxito
8. Sistema redirige a Login automáticamente

**Postcondiciones**: 
- Empleado registrado en el sistema
- Puede iniciar sesión
- Datos almacenados en localStorage

**Flujos Alternativos**:
- **5a**: Si documento ya existe, mostrar error "Ya existe cuenta con este documento"
- **5b**: Si contraseñas no coinciden, solicitar corrección
- **5c**: Si email inválido, mostrar formato esperado

---

#### **CU-11: Iniciar Sesión**

**Actor**: Empleado

**Descripción**: Autenticación del empleado en la app móvil.

**Precondiciones**: 
- Estar registrado en el sistema

**Flujo Principal**:
1. Empleado abre app móvil
2. Sistema muestra pantalla de Login
3. Empleado ingresa:
   - Número de documento
   - Contraseña
4. Empleado hace clic en "Iniciar Sesión"
5. Sistema valida credenciales:
   - Busca usuario por documento
   - Verifica contraseña
6. Si credenciales correctas:
   - Sistema crea sesión
   - Guarda datos en localStorage
   - Muestra mensaje de bienvenida
   - Redirige a Home
7. Si credenciales incorrectas:
   - Muestra error "Credenciales incorrectas"

**Postcondiciones**: 
- Sesión activa
- Usuario autenticado
- Acceso a funcionalidades de la app

**Credenciales de prueba**:
- Documento: `1234567890`
- Contraseña: `empleado123`

---

#### **CU-12: Seleccionar Menú Semanal**

**Actor**: Empleado

**Descripción**: Selección de platillos para las comidas de la semana.

**Precondiciones**: 
- Sesión activa
- Existir menús disponibles para su comedor
- No haber hecho pedido para esa semana

**Flujo Principal**:
1. Empleado accede a "Home"
2. Sistema muestra menús disponibles para su comedor
3. Empleado selecciona un menú
4. Sistema muestra selector de días (tabs):
   - Lunes, Martes, Miércoles, Jueves, Viernes, Sábado
5. Empleado selecciona un día
6. Sistema muestra platillos agrupados por tipo:
   - ☀️ Desayuno
   - 🍽️ Almuerzo
   - 🌙 Cena
7. Para cada tipo de comida:
   - Empleado ve tarjetas de platillos disponibles
   - Cada tarjeta muestra: imagen, nombre, categoría, descripción, calorías
   - Empleado hace clic en "Seleccionar"
   - Sistema marca como seleccionado (visual verde)
8. Empleado repite para cada día de la semana
9. Sistema muestra badge con total de comidas seleccionadas
10. Empleado hace clic en "Confirmar Pedido"
11. Sistema muestra resumen de selecciones
12. Empleado confirma
13. Sistema valida que haya al menos 1 comida
14. Sistema crea pedido con estado "Confirmado"
15. Sistema guarda en localStorage
16. Sistema muestra mensaje de éxito
17. Sistema redirige a "Mis Pedidos"

**Postcondiciones**: 
- Pedido creado y guardado
- Empleado tiene comidas asignadas para la semana
- Pedido visible en historial

**Reglas de negocio**:
- Máximo 1 platillo por tipo de comida por día
- Puede cambiar selección antes de confirmar
- Una vez confirmado, no se puede editar (versión actual)

---

#### **CU-13: Ver Mis Pedidos**

**Actor**: Empleado

**Descripción**: Visualización del historial de pedidos realizados.

**Precondiciones**: 
- Sesión activa

**Flujo Principal**:
1. Empleado accede a "Mis Pedidos"
2. Sistema carga pedidos del empleado desde localStorage
3. Sistema muestra lista de pedidos en tarjetas:
   - ID del pedido (últimos 4 dígitos)
   - Semana (fecha inicio - fin)
   - Fecha del pedido
   - Estado (badge con color)
   - Total de comidas
4. Empleado puede hacer clic en "Ver Detalles"
5. Sistema muestra modal con:
   - Semana del pedido
   - Total de comidas
   - Desglose por día:
     - Día de la semana
     - Por cada comida seleccionada:
       - Tipo (Desayuno/Almuerzo/Cena)
       - Nombre del platillo
       - Check de confirmación
6. Empleado cierra modal

**Postcondiciones**: 
- Empleado conoce estado de sus pedidos
- Puede verificar comidas asignadas

**Estados visuales**:
- **Confirmado**: Badge verde
- **En Producción**: Badge naranja
- **Completado**: Badge azul
- **Entregado**: Badge verde oscuro

**Flujo Alternativo - Sin Pedidos**:
1. Si no hay pedidos, mostrar mensaje "No has hecho pedidos aún"
2. Mostrar botón "Hacer Pedido"
3. Botón redirige a selección de menú

---

#### **CU-14: Gestionar Perfil**

**Actor**: Empleado

**Descripción**: Visualización y gestión de información personal del empleado.

**Precondiciones**: 
- Sesión activa

**Flujo Principal**:
1. Empleado accede a "Perfil"
2. Sistema muestra:
   - Avatar con iniciales
   - Nombre completo
   - Cargo
   - Número de documento
   - Tarjetas de información:
     - 📧 Email corporativo
     - 📞 Teléfono
     - 🏢 Empresa
     - 📍 Comedor asignado
     - 💼 Cargo
3. Empleado puede:
   - Ver Mis Pedidos (botón que redirige)
   - Cerrar Sesión (botón rojo)
4. Si hace clic en "Cerrar Sesión":
   - Sistema muestra diálogo de confirmación
   - "¿Estás seguro de que deseas cerrar sesión?"
   - Botones: "Cancelar" | "Cerrar Sesión"
5. Si confirma:
   - Sistema limpia localStorage
   - Sistema cierra sesión
   - Sistema redirige a Login

**Postcondiciones**: 
- Empleado conoce su información
- Puede cerrar sesión de forma segura

---

## 🔗 RELACIONES ENTRE CASOS DE USO

### Relaciones de Inclusión («include»)

```
CU-10: Registrarse
    │
    ├──«include»──► CU-11: Iniciar Sesión
    │
    └─► Después del registro exitoso, 
        el sistema automáticamente redirige al login
```

```
CU-12: Seleccionar Menú Semanal
    │
    ├──«include»──► CU-13: Ver Mis Pedidos
    │
    └─► Después de confirmar pedido,
        el sistema automáticamente muestra el historial
```

### Relaciones de Extensión («extend»)

```
CU-13: Ver Mis Pedidos
    │
    ├──«extend»──► CU-12: Seleccionar Menú Semanal
    │
    └─► Si no hay pedidos, puede extender
        al flujo de crear nuevo pedido
```

```
CU-04: Gestionar Menús
    │
    ├──«extend»──► Duplicar Menú
    │
    └─► Función opcional que extiende
        la creación de menús
```

### Relaciones de Generalización

```
CU-07: Ver Dashboard
    ├─► Para Administrador: Ver todas las métricas
    └─► Para Gestor: Ver métricas de producción
```

---

## 📊 MATRIZ DE CASOS DE USO POR ACTOR

| Caso de Uso                        | Administrador | Gestor | Empleado |
|------------------------------------|:-------------:|:------:|:--------:|
| CU-01: Gestionar Empresas          |      ✅       |   ❌   |    ❌    |
| CU-02: Gestionar Comedores         |      ✅       |   ❌   |    ❌    |
| CU-03: Gestionar Platillos         |      ✅       |   ❌   |    ❌    |
| CU-04: Gestionar Menús Semanales   |      ✅       |   ❌   |    ❌    |
| CU-05: Gestionar Usuarios          |      ✅       |   ❌   |    ❌    |
| CU-06: Gestionar Roles             |      ✅       |   ❌   |    ❌    |
| CU-07: Ver Dashboard               |      ✅       |   ✅   |    ❌    |
| CU-08: Gestionar Pedidos           |      ✅       |   ✅   |    ❌    |
| CU-09: Gestionar Órdenes           |      ✅       |   ✅   |    ❌    |
| CU-10: Registrarse                 |      ❌       |   ❌   |    ✅    |
| CU-11: Iniciar Sesión              |      ❌       |   ❌   |    ✅    |
| CU-12: Seleccionar Menú Semanal    |      ❌       |   ❌   |    ✅    |
| CU-13: Ver Mis Pedidos             |      ❌       |   ❌   |    ✅    |
| CU-14: Gestionar Perfil            |      ❌       |   ❌   |    ✅    |

---

## 🎯 DIAGRAMA SIMPLIFICADO PARA MIRO

### Estructura sugerida:

```
┌──────────────┐
│ ADMINISTRADOR│
└──────┬───────┘
       │
       ├─► CU-01: Gestionar Empresas
       ├─► CU-02: Gestionar Comedores
       ├─► CU-03: Gestionar Platillos
       ├─► CU-04: Gestionar Menús
       ├─► CU-05: Gestionar Usuarios
       ├─► CU-06: Gestionar Roles
       └─► CU-07: Ver Dashboard

┌──────────────┐
│GESTOR PRODUC.│
└──────┬───────┘
       │
       ├─► CU-07: Ver Dashboard
       ├─► CU-08: Gestionar Pedidos
       └─► CU-09: Gestionar Órdenes de Producción

┌──────────────┐
│   EMPLEADO   │
└──────┬───────┘
       │
       ├─► CU-10: Registrarse ──«include»──► CU-11: Iniciar Sesión
       ├─► CU-11: Iniciar Sesión
       ├─► CU-12: Seleccionar Menú ──«include»──► CU-13: Ver Mis Pedidos
       ├─► CU-13: Ver Mis Pedidos
       └─► CU-14: Gestionar Perfil
```

---

## 📝 RESUMEN EJECUTIVO

### Total de Casos de Uso: **14**

#### Por Actor:
- **Administrador**: 7 casos de uso
- **Gestor de Producción**: 3 casos de uso
- **Empleado**: 5 casos de uso

#### Por Módulo:
- **Configuración y Maestros**: 6 CU
- **Producción**: 2 CU
- **App Móvil**: 5 CU
- **Dashboard**: 1 CU (compartido)

#### Relaciones:
- **Inclusión («include»)**: 2 relaciones
- **Extensión («extend»)**: 2 relaciones
- **Generalización**: 1 relación

---

Este documento proporciona toda la información necesaria para crear un diagrama de casos de uso completo en Miro o cualquier herramienta de diagramación UML.
