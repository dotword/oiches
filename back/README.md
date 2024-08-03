# OICHES

Plataforma para conectar salas de conciertos y grupos musicales.
Los grupos seleccionan la sala y pueden contactar con ellos y/o hacer la reserva del espacio en las fechas disponibles.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### usuarios

| Campo            | Tipo          | Descripción                                 |
| ---------------- | ------------- | ------------------------------------------- |
| id               | CHAR(36)      | Identificador único del usuario             |
| email            | VARCHAR(100)  | Correo electrónico del usuario              |
| password         | VARCHAR(250)  | Contraseña del usuario (hash)               |
| username         | VARCHAR(50)   | Nombre de usuario del usuario               |
| avatar           | VARCHAR(100 ) | URL del avatar del usuario                  |
| role             | ENUM          | Rol del usuario ("admin", "sala" o "grupo") |
| active           | BOOLEAN       | Indica si el usuario está activo o no       |
| registrationCode | CHAR(30)      | Código de registro del usuario              |
| recoverPassCode  | CHAR(10)      | Código de recuperación de contraseña        |
| createdAt        | DATETIME      | Fecha y hora de creación del usuario        |
| modifiedAt       | DATETIME      | Fecha y hora de la última modificación      |
| deletedAT        | DATETIME      | Fecha y hora eliminación                    |

### generos_musicales

| Campo     | Tipo        | Descripción                            |
| --------- | ----------- | -------------------------------------- |
| id        | INT         | Identificador único del genero         |
| nombre    | VARCHAR(50) | nombre del género                      |
| createdAt | DATETIME    | Fecha y hora de creación               |
| updatedAt | DATETIME    | Fecha y hora de la última modificación |

### provincias

| Campo     | Tipo         | Descripción                            |
| --------- | ------------ | -------------------------------------- |
| id        | INT          | Identificador único del genero         |
| provincia | VARCHAR(255) | nombre del género                      |
| createdAt | DATETIME     | Fecha y hora de creación               |
| updatedAt | DATETIME     | Fecha y hora de la última modificación |

### salas

| Campo             | Tipo          | Descripción                            |
| ----------------- | ------------- | -------------------------------------- |
| id                | CHAR(36)      | Identificador único de la sala         |
| usuario_id        | CHAR(36)      | Identificador del usuario              |
| nombre            | VARCHAR(100)  | Nombre de la sala                      |
| provincia         | INT           | Identificador de la provincia          |
| generos           | INT           | Identificador del género musical       |
| capacidad         | INT           | Aforo de la sala                       |
| descripcion       | TEXT          | descripcion de la sala                 |
| precios           | DECIMAL(10,2) | Precio del alquiler de la sala         |
| direccion         | VARCHAR(255)  | Dirección de la sala                   |
| condiciones       | TEXT          | Condiciones de la sala                 |
| equipamiento      | TEXT          | Equipamiento de la sala                |
| horaReservasStart | VARCHAR(255)  | Hora comienzo reservas                 |
| horaReservasEnd   | VARCHAR(255)  | Hora fin reservas                      |
| createdAt         | DATETIME      | Fecha y hora de creación de la sala    |
| updatedAt         | DATETIME      | Fecha y hora de la última modificación |
| deletedAT         | DATETIME      | Fecha y hora eliminación               |

### generos_salas

| Campo     | Tipo     | Descripción                            |
| --------- | -------- | -------------------------------------- |
| id        | CHAR(36) | Identificador único                    |
| salaId    | CHAR(36) | Id de la sala                          |
| generoId  | INT      | Id del genero                          |
| createdAt | DATETIME | Fecha y hora de creación               |
| updatedAt | DATETIME | Fecha y hora de la última modificación |

### grupos

| Campo      | Tipo        | Descripción                            |
| ---------- | ----------- | -------------------------------------- |
| id         | CHAR(36)    | Identificador único del usuario        |
| usuario_id | CHAR(36)    | Identificador del usuario creado       |
| provincia  | INT         | Identificador de la provincia          |
| generos    | INT         | Identificador del género musical       |
| nombre     | VARCHAR(50) | Nombre del grupo                       |
| honorarios | INT         | Caché del grupo                        |
| biografia  | TEXT        | Biografía del grupo                    |
| createdAt  | DATETIME    | Fecha y hora de creación del grupo     |
| updatedAt  | DATETIME    | Fecha y hora de la última modificación |
| deletedAT  | DATETIME    | Fecha y hora eliminación               |

### generos_grupos

| Campo     | Tipo     | Descripción                            |
| --------- | -------- | -------------------------------------- |
| id        | CHAR(36) | Identificador único                    |
| grupoId   | CHAR(36) | Id del grupo                           |
| generoId  | INT      | Id del genero                          |
| createdAt | DATETIME | Fecha y hora de creación               |
| updatedAt | DATETIME | Fecha y hora de la última modificación |

### Sala_fotos

| Campo     | Tipo         | Descripción                                         |
| --------- | ------------ | --------------------------------------------------- |
| id        | CHAR(36)     | Identificador único de la foto                      |
| name      | VARCHAR(100) | Nombre de la foto                                   |
| salaId    | CHAR(36)     | Identificador de la sala a la que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                 |

### Grupo_fotos

| Campo     | Tipo         | Descripción                                      |
| --------- | ------------ | ------------------------------------------------ |
| id        | CHAR(36)     | Identificador único de la foto                   |
| name      | VARCHAR(100) | Nombre de la foto                                |
| grupoId   | CHAR(36)     | Identificador del grupo al que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto              |

### Grupo_media

| Campo     | Tipo         | Descripción                                        |
| --------- | ------------ | -------------------------------------------------- |
| id        | CHAR(36)     | Identificador único de media                       |
| url       | VARCHAR(255) | Ruta del enlace                                    |
| grupo_id  | CHAR(36)     | Identificador del grupo al que pertenece el enlace |
| createdAt | DATETIME     | Fecha y hora de creación del enlace                |

### Reservas

| Campo      | Tipo        | Descripción                                               |
| ---------- | ----------- | --------------------------------------------------------- |
| id         | CHAR(36)    | Identificador único de la reserva                         |
| sala_id    | CHAR(36)    | Identificador del grupo de la sala que se quiere reservar |
| grupo_id   | CHAR(36)    | Identificador del grupo que solicita la reserva           |
| confirmada | BOOLEAN     | Reserva confirmada o no                                   |
| fecha      | VARCHAR(15) | Fecha de la reserva                                       |
| horaInicio | VARCHAR(15) | Hora de inicio de la reserva                              |
| horaFin    | VARCHAR(15) | Hora de final de la reserva                               |
| createdAt  | DATETIME    | Fecha y hora de creación de la reserva                    |
| updatedAt  | DATETIME    | Fecha y hora de la última modificación                    |

### votos_grupos

| Campo       | Tipo     | Descripción                             |
| ----------- | -------- | --------------------------------------- |
| id          | CHAR(36) | Identificador único del voto            |
| voto        | TINYINT  | Valor del voto (del 1 al 5)             |
| comentario  | TEXT     | Comentario de la sala al grupo          |
| reservaId   | CHAR(36) | Identificador de la reserva que se vota |
| salaVota    | CHAR(36) | Identificador de la sala que vota       |
| grupoVotado | CHAR(36) | Identificador del grupo votado          |
| createdAt   | DATETIME | Fecha y hora de creación del voto       |

### votos_salas

| Campo      | Tipo     | Descripción                             |
| ---------- | -------- | --------------------------------------- |
| id         | CHAR(36) | Identificador único del voto            |
| voto       | TINYINT  | Valor del voto (del 1 al 5)             |
| comentario | TEXT     | Comentario del grupo a la sala          |
| reservaId  | CHAR(36) | Identificador de la reserva que se vota |
| grupoVota  | CHAR(36) | Identificador del grupo que vota        |
| salaVotada | CHAR(36) | Identificador de la sala votada         |
| createdAt  | DATETIME | Fecha y hora de creación del voto       |

## Endpoints del usuario

-   **POST** - `/users/registro` - Crea un nuevo usuario pendiente de activar.
-   **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado
-   **POST** - `/users/login` - Logea a un usuario retornando un token.
-   **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.
-   **PUT** - `/users/password` - Actualiza la contraseña de un usuario mediante un código de recuperación.
-   **PATCH** - `/users/password` - Actualiza la contraseña de un usuario una vez logeado.
-   **PUT** - `/users/email/:userId` - Editar email usuario
-   **PUT** - `/users/avatar/:userId` - Editar avatar usuario
-   **GET** - `/users` - Perfil privado del usuario

## Endpoints del salas

-   **POST** - `/users/salas` - Crea una sala.
-   **PUT** - `/salas/:idSala/edit` - Actualizar una sala
-   **POST** - `/salas/photos/:idSala` - Añadir fotos a una sala
-   **DELETE** - `/salas/:photoName/:deletePhoto` - Borrar foto de una sala
-   **GET** - `/salas/:idSala` - Retorna el detalle de una sala
-   **GET** - `/salas?` - Retorna el listado de salas con filtro.

## Endpoints de grupos

-   **POST** - `/grupos/users/grupo` - Crea un nuevo grupo
-   **PUT** - `/grupos/:idGrupo/edit` - Actualizar un grupo
-   **DELETE** - `/grupos/media/:mediaDelete/:idGrupo` - Borrar media de un grupo
-   **POST** - `/grupos/media/:idGrupo` - Añadir media a un grupo
-   **POST** - `/grupos/rider/:idGrupo` - Añadir rider a un grupo
-   **POST** - `/grupos/photos/:idGrupo` - Añadir fotos a un grupo
-   **DELETE** - `/grupos/:photoName/:deletePhoto` - Borrar fotos o rider de un grupo
-   **GET** - `/grupos/:idGrupo` - Retorna el detalle de un grupo
-   **GET** - `/grupos?` - Retorna el listado de grupos con filtro.

## Endpoints del listas

-   **GET** - `/generos` - Lista estilos musicales
-   **GET** - `/provincias` - Lista provincias

## Endpoints de reservas

-   **POST** - `/reservar-sala/:sala_id` - Crea una reserva de sala.
-   **DELETE** - `/cancelar-reserva/:reserva_id` - Grupo borra una reserva
-   **PUT** - `/aprobar-reserva/:reserva_id` - confirmar reserva
-   **DELETE** - `/borrar-reserva/:reserva_id` - Sala borra una reserva
-   **GET** - `/reservas/salas/:sala_id` - Listar reservas de una sala
-   **GET** - `/reservas/grupos/:group_id` - Listar reservas de un grupo

## Endpoints de votos

-   **POST** - `/salas/:idReserva/votes` - votacion y comentarios de un grupo a una sala
-   **POST** - `/grupos/:idReserva/votes` - votacion y comentarios de una sala a un grupo
-   **GET** - `/grupos/votos/:idGrupo` - votos hechos por un grupo
-   **GET** - `/salas/votos/:idSala` - votos hechos por una sala
