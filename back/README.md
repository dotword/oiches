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

| Campo                | Tipo         | Descripción                                 |
| -------------------- | ------------ | ------------------------------------------- |
| id                   | INT          | Identificador único del usuario             |
| email                | VARCHAR(100) | Correo electrónico del usuario              |
| password             | VARCHAR(250) | Contraseña del usuario (hash)               |
| username             | VARCHAR(50)  | Nombre de usuario del usuario               |
| avatar               | VARCHAR(25 ) | URL del avatar del usuario                  |
| role                 | ENUM         | Rol del usuario ("admin", "sala" o "grupo") |
| active               | TINYINT      | Indica si el usuario está activo o no       |
| registrationCode     | VARCHAR(36)  | Código de registro del usuario              |
| \*\* recoverPassCode | VARCHAR(36)  | Código de recuperación de contraseña        |
| createdAt            | DATETIME     | Fecha y hora de creación del usuario        |
| modifiedAt           | DATETIME     | Fecha y hora de la última modificación      |
| deletedAT            | DATETIME     | Fecha y hora eliminación                    |

### salas

| Campo        | Tipo          | Descripción                            |
| ------------ | ------------- | -------------------------------------- |
| id           | INT           | Identificador único del usuario        |
| usuario_id   | VARCHAR(100)  | Identificador del usuario creado       |
| nombre       | VARCHAR(100)  | Nombre de la sala                      |
| provincia    | VARCHAR(255)  | Provincia de la sala                   |
| genero       | VARCHAR(50)   | Género/s musical de la sala            |
| precios      | DECIMAL(10,2) | Precio del alquiler de la sala         |
| direccion    | VARCHAR(255)  | Dirección de la sala                   |
| condiciones  | TEXT          | Condiciones de la sala                 |
| equipamiento | TEXT          | Equipamiento de la sala                |
| email        | VARCHAR(100)  | Email de contacto                      |
| createdAt    | DATETIME      | Fecha y hora de creación de la sala    |
| updatedAt    | DATETIME      | Fecha y hora de la última modificación |
| deletedAT    | DATETIME      | Fecha y hora eliminación               |

### grupos

| Campo       | Tipo         | Descripción                            |
| ----------- | ------------ | -------------------------------------- |
| id          | INT          | Identificador único del usuario        |
| usuario_id  | INT          | Identificador del usuario creado       |
| nombre      | VARCHAR(50)  | Nombre del grupo                       |
| provincia   | VARCHAR(255) | Provincia del grupo                    |
| honorarios  | INT          | Caché del grupo                        |
| biografia   | TEXT         | Biografía del grupo                    |
| genero      | VARCHAR(255) | Género/s musical del grupo             |
| rider       | VARCHAR(255) | Rider del grupo                        |
| \*\* avatar | VARCHAR(255) | Avatar del grupo                       |
| \*\*enlaces | VARCHAR(255) | Enlaces de audio/video del grupo       |
| email       | VARCHAR(255) | Email de contacto                      |
| createdAt   | DATETIME     | Fecha y hora de creación del grupo     |
| updatedAt   | DATETIME     | Fecha y hora de la última modificación |
| deletedAT   | DATETIME     | Fecha y hora eliminación               |

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

-   **POST** - `/users/registro` - Crea un nuevo usuario pendiente de activar.
-   **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
-   **POST** - `/users/login` - Logea a un usuario retornando un token.
-   **GET** - `/users/:userId` - Retorna información pública de un usuario (ver el perfil).
-   **GET** - `/users` - Retorna información privada del usuario con el id del token.
<!-- -   **PUT** - `/users/avatar` - Permite actualizar el avatar del usuario. -->
-   **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.
-   **PUT** - `/users/password/reset` - Actualiza la contraseña de un usuario mediante un código de recuperación.
-   **PATCH** - `/users/password` - Actualiza la contraseña de un usuario una vez logeado.

## Endpoints del salas

<!-- -   **POST** - `/entries` - Crea una entrada.
-   **GET** - `/entries` - Retorna el listado de entradas. -->

-   **GET** - `/salas/:idSala` - Retorna el detalle de una sala
<!-- -   **POST** - `/entries/:entryId/photos` - Agregar una foto a una entrada.
-   **DELETE** - `/entries/:entryId/photos/:photoId` - Eliminar una foto de una entrada.
-   **POST** - `/entries/:entryId/votes` - Vota una entrada (entre 1 y 5).
-   **DELETE** - `/entries/:entryId` - Eliminar una entrada. -->

## Endpoints del grupos

<!-- -   **POST** - `/entries` - Crea una entrada.
-   **GET** - `/entries` - Retorna el listado de entradas.
-   **GET** - `/entries/:entryId` - Retorna una entrada en concreto.
-   **POST** - `/entries/:entryId/photos` - Agregar una foto a una entrada.
-   **DELETE** - `/entries/:entryId/photos/:photoId` - Eliminar una foto de una entrada.
-   **POST** - `/entries/:entryId/votes` - Vota una entrada (entre 1 y 5).
-   **DELETE** - `/entries/:entryId` - Eliminar una entrada. -->

## Endpoints de reservas

**POST** - `/reservar-sala/:sala_id` - Crea una reserva de sala.
**DELETE** - `/cancelar-reserva/:sala_id` - Cancela una reserva
