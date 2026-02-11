# OnboardingApp

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 21.0.1.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Cuando el servidor esté corriendo, abre el navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques archivos fuente.

## Generación de código (scaffolding)

Angular CLI incluye herramientas potentes de scaffolding. Para generar un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para ver la lista completa de esquemas disponibles (`components`, `directives`, `pipes`, etc.), ejecuta:

```bash
ng generate --help
```

## Construcción (build)

Para construir el proyecto, ejecuta:

```bash
ng build
```

Esto compilará el proyecto y dejará los artefactos en el directorio `dist/`. Por defecto, el build de producción optimiza la aplicación para rendimiento y velocidad.

## Pruebas unitarias

Para ejecutar pruebas unitarias con [Vitest](https://vitest.dev/), usa el siguiente comando:

```bash
ng test
```

## Pruebas end-to-end (e2e)

Para ejecutar pruebas end-to-end, ejecuta:

```bash
ng e2e
```

Angular CLI no viene con un framework de e2e por defecto; puedes elegir el que mejor se adapte a tus necesidades.

## Recursos adicionales

Para más información sobre Angular CLI, incluidos los comandos disponibles, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

## Visión general del proyecto (Onboarding Frontend)

Esta aplicación Angular es el **frontend** para la kata **“Apertura de Cuentas para Clientes Nuevos”**.

A alto nivel, permite:

- Crear **clientes** (con validaciones básicas y una UI amigable).
- Mostrar un **listado de clientes** en una tabla.
- Seleccionar un cliente y solicitar la creación de una **cuenta bancaria** para ese cliente.
- Comunicarse con el backend (Spring Boot) mediante **APIs HTTP** que intercambian **JSON**.

El foco está en una experiencia de usuario limpia y sencilla y en una separación clara entre **presentación** (componentes) y **acceso a datos** (servicios).

---

## Arquitectura del frontend

La aplicación sigue una **arquitectura basada en componentes**:

- **Páginas** (pantallas de alto nivel)
  - Página `Dashboard`: página principal que contiene tanto la sección de clientes como la de cuentas.

- **Componentes** (bloques reutilizables)
  - `CustomerForm` – formulario para crear un nuevo cliente.
  - `CustomerList` – tabla que lista todos los clientes.
  - `AccountSection` – UI para seleccionar un cliente y crear cuentas para ese cliente.

- **Servicios** (acceso a datos – pensados para la integración)
  - `CustomerService` – responsable de llamar a los endpoints `/api/customers` del backend.
  - `AccountService` – responsable de llamar a los endpoints `/api/accounts` del backend.

La idea es similar al backend: cada pieza tiene una responsabilidad clara.

### Tipo de arquitectura, patrones de diseño y código limpio

En este frontend se aplican las siguientes ideas:

- **Arquitectura basada en componentes** (estándar en Angular):
  - Las páginas (`Dashboard`) componen componentes más pequeños.
  - Los componentes (`CustomerForm`, `CustomerList`, `AccountSection`) se centran en la UI y la interacción.
  - Los servicios (`CustomerService`, `AccountService`) se centran en hablar con el backend.

- **Separación de responsabilidades** (similar a una arquitectura en capas):
  - **Capa de presentación**: componentes y plantillas de Angular.
  - **Capa de datos**: servicios Angular que envuelven las llamadas HTTP.
  - Esto mantiene la UI independiente de cómo y dónde se almacenan los datos.

- **Patrones aplicados**:
  - **Smart vs. Dumb Components** (contenedor/presentacional):
    - `Dashboard` actúa como contenedor "smart" que coordina datos y eventos.
    - `CustomerForm`, `CustomerList`, `AccountSection` son más "presentational": renderizan UI, validan localmente y emiten eventos.
  - **Patrón Service**:
    - `CustomerService` y `AccountService` aíslan toda la lógica HTTP en un solo lugar.

- **Principios SOLID (visión práctica)**:
  - **S – Single Responsibility**:
    - `CustomerForm` → solo se ocupa del formulario de cliente.
    - `CustomerList` → solo se ocupa de mostrar la tabla.
    - `AccountSection` → solo se ocupa de la UI para crear cuentas.
    - `Dashboard` → orquesta las secciones, sin lógica de bajo nivel.
    - Servicios → solo para llamadas HTTP.
  - **D – Dependency Inversion** (a nivel frontend):
    - Los componentes dependen de **abstracciones** (servicios Angular inyectados) y no de detalles concretos del backend.

- **Prácticas de Clean Code**:
  - Nombres claros y en inglés: `CustomerForm`, `AccountSection`, `selectedDocumentNumber`, `createAccount`, etc.
  - Componentes pequeños con una responsabilidad clara.
  - Validaciones y mensajes de error localizados cerca de la UI correspondiente.
  - Uso de TailwindCSS para evitar CSS innecesario y mantener estilos consistentes.

---

## Flujo principal de la UI

El flujo principal se implementa en la página `Dashboard`:

1. **Sección de Clientes**
   - Muestra el componente `CustomerForm`.
   - Cuando el usuario envía el formulario, el componente:
     - Valida los campos (vacíos, formato de email, etc.).
     - Emite un evento con los datos del cliente.
   - `Dashboard` escucha este evento y actualiza la lista en memoria de clientes o, al integrarlo, dispara una llamada al backend.
   - `CustomerList` recibe la lista de clientes como `@Input` y la muestra en una tabla.

2. **Sección de Cuentas**
   - `AccountSection` recibe la lista de clientes como `@Input`.
   - El usuario selecciona un cliente en un desplegable y pulsa **“Crear cuenta”**.
   - El componente valida que haya un cliente seleccionado y muestra mensajes de éxito/error.
   - Una vez integrado con el backend, llamará a `/api/accounts` con el id de cliente y mostrará el resultado.

Esta separación mantiene la página (`Dashboard`) como **orquestador**, mientras que los componentes se centran en UI + validación local y los servicios en la comunicación con el backend.

---

## Angular 21: características y buenas prácticas

El proyecto usa Angular 21 y aplica varias buenas prácticas modernas:

- **Standalone Components**
  - Componentes como `CustomerForm`, `CustomerList`, `AccountSection` y `Dashboard` son standalone, es decir, declaran sus propias dependencias sin usar módulos clásicos de Angular.

- **Nuevo control de flujo** (Angular v17+)
  - En lugar de `*ngIf` y `*ngFor`, la app usa la nueva sintaxis:
    - `@if (condition) { ... } @else { ... }`
    - `@for (item of items; track item.id) { ... }`
  - Esto mantiene las plantillas alineadas con los estándares actuales de Angular.

- **Eventos e inputs tipados**
  - `CustomerForm` define un `@Output` fuertemente tipado para emitir clientes creados.
  - `CustomerList` y `AccountSection` definen `@Input` tipados para recibir la lista de clientes.

---

## UI/UX y estilos (TailwindCSS)

Para estilos, la app usa **TailwindCSS** (importado en `src/styles.css`). Algunas decisiones clave:

- El layout principal centra el contenido de `Dashboard` y usa un fondo suave:
  - `min-h-screen bg-slate-100 flex items-center justify-center`.

- `Dashboard` organiza las secciones de **Clientes** y **Cuentas** lado a lado en pantallas grandes usando una grid responsiva:
  - `grid grid-cols-1 md:grid-cols-2 gap-6`.

- Cada sección se muestra como una **card**:
  - `bg-white rounded-lg shadow-sm p-4 border border-slate-200`.

- **Formularios e inputs** usan utilidades Tailwind para espaciado, bordes y estados de foco consistentes, por ejemplo:
  - Labels: `text-sm font-medium text-slate-700 mb-1`.
  - Inputs/selects: `border border-slate-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500`.
  - Botones: `rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700`.

- **Mensajes de validación**
  - En el formulario de clientes, los errores de validación se muestran bajo cada campo con texto rojo pequeño.

Este enfoque entrega una UI moderna y limpia con muy poco CSS manual y alta legibilidad.

---

## Manejo de errores y validaciones (frontend)

- **CustomerForm**
  - Realiza validaciones básicas en el cliente antes de emitir datos:
    - Campos requeridos: `documentType`, `documentNumber`, `fullName`, `email`.
    - Comprobación de formato de email con una expresión regular sencilla.
  - Muestra mensajes de error por campo usando el nuevo control de flujo `@if`.

- **AccountSection**
  - Valida que haya un cliente seleccionado antes de “Crear cuenta”.
  - Muestra mensajes de feedback en diferentes colores según el resultado (error o éxito).

Estas validaciones complementan las validaciones del backend y mejoran la experiencia de usuario.

---

## Integración con el backend (vista general)

El frontend está diseñado para integrarse con el backend **Onboarding App Server**:

- **Clientes**
  - `CustomerService` llamará a:
    - `POST http://localhost:8080/api/customers` para crear un cliente.
    - `GET http://localhost:8080/api/customers` para listar clientes existentes.
  - `Dashboard` usará este servicio en lugar de (o además de) mantener solo datos en memoria.

- **Cuentas**
  - `AccountService` llamará a:
    - `POST http://localhost:8080/api/accounts` con `{ customerId }` para crear una cuenta.
    - `GET http://localhost:8080/api/accounts?customerId=...` para listar cuentas de un cliente.
  - `AccountSection` usará este servicio para realizar la creación real de cuentas y mostrar errores/mensajes provenientes del servidor.

Esta separación mantiene el frontend libre de detalles específicos del backend (como SQL o la base de datos) y lo enfoca en la interacción con el usuario y el renderizado.
