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

| Campo            | Tipo         | Descripción                                 |
| ---------------- | ------------ | ------------------------------------------- |
| id               | INT          | Identificador único del usuario             |
| email            | VARCHAR(100) | Correo electrónico del usuario              |
| password         | VARCHAR(250) | Contraseña del usuario (hash)               |
| username         | VARCHAR(50)  | Nombre de usuario del usuario               |
| avatar           | VARCHAR(25 ) | URL del avatar del usuario                  |
| role             | ENUM         | Rol del usuario ("admin", "sala" o "grupo") |
| active           | TINYINT      | Indica si el usuario está activo o no       |
| registrationCode | VARCHAR(36)  | Código de registro del usuario              |
| recoverPassCode  | VARCHAR(36)  | Código de recuperación de contraseña        |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario        |
| modifiedAt       | DATETIME     | Fecha y hora de la última modificación      |
| deletedAT        | DATETIME     | Fecha y hora eliminación                    |

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

| Campo        | Tipo          | Descripción                            |
| ------------ | ------------- | -------------------------------------- |
| id           | INT           | Identificador único de la sala         |
| usuario_id   | VARCHAR(100)  | Identificador del usuario              |
| nombre       | VARCHAR(100)  | Nombre de la sala                      |
| capacidad    | INT           | Aforo de la sala                       |
| descripcion  | TEXT          | descripcion de la sala                 |
| precios      | DECIMAL(10,2) | Precio del alquiler de la sala         |
| direccion    | VARCHAR(255)  | Dirección de la sala                   |
| condiciones  | TEXT          | Condiciones de la sala                 |
| equipamiento | TEXT          | Equipamiento de la sala                |
| email        | VARCHAR(100)  | Email de contacto                      |
| createdAt    | DATETIME      | Fecha y hora de creación de la sala    |
| updatedAt    | DATETIME      | Fecha y hora de la última modificación |
| deletedAT    | DATETIME      | Fecha y hora eliminación               |

### generos_salas

| Campo     | Tipo     | Descripción                            |
| --------- | -------- | -------------------------------------- |
| id        | INT      | Identificador único                    |
| salaId    | INT      | Id de la sala                          |
| generoId  | INT      | Id del genero                          |
| createdAt | DATETIME | Fecha y hora de creación               |
| updatedAt | DATETIME | Fecha y hora de la última modificación |

### provincias_salas

| Campo       | Tipo     | Descripción                            |
| ----------- | -------- | -------------------------------------- |
| id          | INT      | Identificador único                    |
| salaId      | INT      | Id de la sala                          |
| provinciaId | INT      | Id de la provincia                     |
| createdAt   | DATETIME | Fecha y hora de creación               |
| updatedAt   | DATETIME | Fecha y hora de la última modificación |

### grupos

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | INT          | Identificador único del usuario        |
| usuario_id | INT          | Identificador del usuario creado       |
| nombre     | VARCHAR(50)  | Nombre del grupo                       |
| honorarios | INT          | Caché del grupo                        |
| biografia  | TEXT         | Biografía del grupo                    |
| rider      | VARCHAR(255) | Rider del grupo                        |
| email      | VARCHAR(255) | Email de contacto                      |
| createdAt  | DATETIME     | Fecha y hora de creación del grupo     |
| updatedAt  | DATETIME     | Fecha y hora de la última modificación |
| deletedAT  | DATETIME     | Fecha y hora eliminación               |

### generos_grupos

| Campo     | Tipo     | Descripción                            |
| --------- | -------- | -------------------------------------- |
| id        | INT      | Identificador único                    |
| grupoId   | INT      | Id del grupo                           |
| generoId  | INT      | Id del genero                          |
| createdAt | DATETIME | Fecha y hora de creación               |
| updatedAt | DATETIME | Fecha y hora de la última modificación |

### provincias_grupos

| Campo       | Tipo     | Descripción                            |
| ----------- | -------- | -------------------------------------- |
| id          | INT      | Identificador único                    |
| grupoId     | INT      | Id del grupo                           |
| provinciaId | INT      | Id de la provincia                     |
| createdAt   | DATETIME | Fecha y hora de creación               |
| updatedAt   | DATETIME | Fecha y hora de la última modificación |

### Sala_fotos

| Campo     | Tipo         | Descripción                                         |
| --------- | ------------ | --------------------------------------------------- |
| id        | INT          | Identificador único de la foto                      |
| name      | VARCHAR(100) | Nombre de la foto                                   |
| salaId    | INT          | Identificador de la sala a la que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                 |

### Grupo_fotos

| Campo     | Tipo         | Descripción                                      |
| --------- | ------------ | ------------------------------------------------ |
| id        | INT          | Identificador único de la foto                   |
| name      | VARCHAR(100) | Nombre de la foto                                |
| grupoId   | INT          | Identificador del grupo al que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto              |

### Grupo_media

| Campo     | Tipo         | Descripción                                        |
| --------- | ------------ | -------------------------------------------------- |
| id        | INT          | Identificador único de media                       |
| url       | VARCHAR(255) | Ruta del enlace                                    |
| grupo_id  | INT          | Identificador del grupo al que pertenece el enlace |
| createdAt | DATETIME     | Fecha y hora de creación del enlace                |

### Reservas

| Campo      | Tipo         | Descripción                                               |
| ---------- | ------------ | --------------------------------------------------------- |
| id         | INT          | Identificador único de la reserva                         |
| nombre     | VARCHAR(100) | Nombre de la reserva                                      |
| sala_id    | INT          | Identificador del grupo de la sala que se quiere reservar |
| grupo_id   | INT          | Identificador del grupo que solicita la reserva           |
| confirmada | TINYINT(1)   | Reserva confirmada o no                                   |
| fecha      | VARCHAR(15)  | Fecha de la reserva                                       |
| hora       | VARCHAR(15)  | Hora de la reserva                                        |
| createdAt  | DATETIME     | Fecha y hora de creación de la reserva                    |
| updatedAt  | DATETIME     | Fecha y hora de la última modificación                    |

### sala_comments

| Campo       | Tipo     | Descripción                              |
| ----------- | -------- | ---------------------------------------- |
| id          | INT      | Identificador único del comentario       |
| descripcion | TEXT     | Texto del comentario del grupo a la sala |
| sala_id     | INT      | Identificador de la sala comentada       |
| grupo_id    | INT      | Identificador del grupo que comentó      |
| createdAt   | DATETIME | Fecha y hora de creación del comentario  |
| updatedAt   | DATETIME | Fecha y hora de la última modificación   |

### grupo_comments

| Campo       | Tipo     | Descripción                              |
| ----------- | -------- | ---------------------------------------- |
| id          | INT      | Identificador único del comentario       |
| descripcion | TEXT     | Texto del comentario de la sala al grupo |
| sala_id     | INT      | Identificador del grupo comentado        |
| grupo_id    | INT      | Identificador de la sala que comentó     |
| createdAt   | DATETIME | Fecha y hora de creación del comentario  |
| updatedAt   | DATETIME | Fecha y hora de la última modificación   |

### votos_grupos

| Campo        | Tipo     | Descripción                       |
| ------------ | -------- | --------------------------------- |
| id           | INT      | Identificador único del voto      |
| value        | TINYINT  | Valor del voto (del 1 al 5)       |
| grupo_id     | INT      | Identificador del grupo que vota  |
| voto_sala_id | INT      | Identificador la sala votada      |
| createdAt    | DATETIME | Fecha y hora de creación del voto |

### votos_salas

| Campo         | Tipo     | Descripción                       |
| ------------- | -------- | --------------------------------- |
| id            | INT      | Identificador único del voto      |
| value         | TINYINT  | Valor del voto (del 1 al 5)       |
| sala_id       | INT      | Identificador de la sala que vota |
| voto_grupo_id | INT      | Identificador del grupo votado    |
| createdAt     | DATETIME | Fecha y hora de creación del voto |

## Endpoints del usuario

-   **POST** - `/users/registro` - Crea un nuevo usuario pendiente de activar. (Carmen)
-   **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado. (Isa)
-   **POST** - `/users/login` - Logea a un usuario retornando un token. (Aitor)
-   **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña. (Angel)
-   **PUT** - `/users/password/reset` - Actualiza la contraseña de un usuario mediante un código de recuperación. (Angel)
-   **PATCH** - `/users/password` - Actualiza la contraseña de un usuario una vez logeado. (Aitor)

## Endpoints del salas

-   **POST** - `/users/salas` - Crea una sala. (Isa)
-   **GET** - `/salas/:idSala` - Retorna el detalle de una sala (Carmen)
-   **GET** - `/salas?` - Retorna el listado de salas con filtro. (Fran)

## Endpoints del musicos

-   **GET** - `/generos` - Lista estilos musicales (Isa)

## Endpoints de reservas

-   **POST** - `/reservar-sala/:sala_id` - Crea una reserva de sala. (Aitor)
-   **DELETE** - `/cancelar-reserva/:reserva_id` - Grupo borra una reserva (Aitor)
-   **PUT** - `/aprobar-reserva/:reserva_id` - confirmar reserva (Carmen)
-   **DELETE** - `/borrar-reserva/:reserva_id` - Sala borra una reserva (Carmen)
