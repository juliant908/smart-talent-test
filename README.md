# SmartTalentTest

Prueba de smart talent para desarrollador angular

## Conceptos usados

- RXJS (Observables, BehviorSubjects, Operadores de RXJS)
- Signals
- Auth Guards
- Conceptos de Angular 17 (@if/@else/@for/signals)
- Lazy loading de componentes
- Manipulación de Local Storage

## Credenciales 

### Administrador

user: smart@email.com
password: admin123

### Usuario

user: arnold123@email.com
password: arnold123

## Setup

Para iniciar el proyecto ejecute `````ng serve````

## Con la aplicación podrás

- Añadir, eliminar y modificar productos como administrador
- Ver los pedidos realizados por los usuarios como administrador
- Registrar usuarios
- Realizar pedidos como usuario

# Patrones de diseño implementados

- Singleton
- Observer
- Depedency Injection

## Observaciones

En un escenario ideal la data la enviaríamos y recibiríamos a través de HTTP requests con el HTTPClient de angular (en el angular 17 a través del provideHttpClient() en el appConfig)
