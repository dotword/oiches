import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS votos_salas, votos_grupos, grupo_comments, sala_comments, reservas, grupo_media, grupo_fotos, sala_fotos, generos_grupos, grupos, generos_salas, salas, provincias, generos_musicales, usuarios'
        );

        console.log('Creando tablas...');

        // Creando tablas Usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Usuarios(
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL,
                avatar VARCHAR(25),
                registrationCode CHAR(30),
                roles ENUM('admin','sala','grupo') DEFAULT 'grupo',
                active BOOLEAN DEFAULT false,
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME NULL
            );
    `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Generos_musicales(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Provincias(
                id INT AUTO_INCREMENT PRIMARY KEY,
                provincia VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS Salas(
            id CHAR(36) PRIMARY KEY NOT NULL,
            usuario_id CHAR(36) NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            provincia INT NOT NULL,
            capacidad INT,
            descripcion TEXT,
            precios DECIMAL(10,2),
            direccion VARCHAR(255) NOT NULL,
            condiciones TEXT,
            equipamiento TEXT,
            email VARCHAR(100) NOT NULL,
            FOREIGN KEY(provincia) REFERENCES Provincias(id),
            FOREIGN KEY(usuario_id) REFERENCES Usuarios(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Generos_salas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                salaId CHAR(36) NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (salaId) REFERENCES Salas(id),
                FOREIGN KEY (generoId) REFERENCES Generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                nombre VARCHAR(50) NOT NULL UNIQUE,
                provincia INT NOT NULL,
                honorarios INT,
                biografia TEXT,
                usuario_id CHAR(36) NOT NULL,
                rider VARCHAR(255),
                email VARCHAR(255),
                FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
                FOREIGN KEY(provincia) REFERENCES Provincias(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Generos_grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                grupoId CHAR(36) NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (grupoId) REFERENCES Grupos(id),
                FOREIGN KEY (generoId) REFERENCES Generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Sala_fotos(
                    id CHAR(36) PRIMARY KEY NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    salaId CHAR(36) NOT NULL,
                    FOREIGN KEY (salaId) REFERENCES Salas(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_fotos(
                    id CHAR(36) PRIMARY KEY NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    grupoId CHAR(36) NOT NULL,
                    FOREIGN KEY (grupoId) REFERENCES Grupos(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_media(
                id CHAR(36) PRIMARY KEY NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                url VARCHAR(255) NOT NULL,
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Reservas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                sala_id CHAR(36) NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                confirmada BOOLEAN DEFAULT false,
                fecha VARCHAR(15),
                hora VARCHAR(15),
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY(grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Sala_comments(
                id CHAR(36) PRIMARY KEY NOT NULL,
                descripcion TEXT,
                sala_id CHAR(36) NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_comments(
                id CHAR(36) PRIMARY KEY NOT NULL,
                descripcion TEXT,
                sala_id CHAR(36) NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY(grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                voto_sala_id CHAR(36) NOT NULL,
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id),
                FOREIGN KEY (voto_sala_id) REFERENCES Salas(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_salas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                voto_grupo_id CHAR(36) NOT NULL,
                sala_id CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (voto_grupo_id) REFERENCES Grupos(id),
                FOREIGN KEY (sala_id) REFERENCES Salas(id)
            );
        `);

        await pool.query(`
            INSERT INTO Generos_musicales VALUES
                (DEFAULT, 'Todos', DEFAULT, DEFAULT),
                (DEFAULT, 'Rock', DEFAULT, DEFAULT),
                (DEFAULT, 'Pop', DEFAULT, DEFAULT),
                (DEFAULT, 'Metal', DEFAULT, DEFAULT),
                (DEFAULT, 'Funk', DEFAULT, DEFAULT),
                (DEFAULT, 'Country', DEFAULT, DEFAULT),
                (DEFAULT, 'Folk', DEFAULT, DEFAULT),
                (DEFAULT, 'Jazz', DEFAULT, DEFAULT),
                (DEFAULT, 'Reggae', DEFAULT, DEFAULT),
                (DEFAULT, 'Indie', DEFAULT, DEFAULT),
                (DEFAULT, 'Electrónica', DEFAULT, DEFAULT),
                (DEFAULT, 'Soul', DEFAULT, DEFAULT),
                (DEFAULT, 'Canción de autor', DEFAULT, DEFAULT),
                (DEFAULT, 'Flamenco', DEFAULT, DEFAULT),
                (DEFAULT, 'Clásica', DEFAULT, DEFAULT),
                (DEFAULT, 'Latina', DEFAULT, DEFAULT),
                (DEFAULT, 'Reaggeton', DEFAULT, DEFAULT),
                (DEFAULT, 'Hip-Hop', DEFAULT, DEFAULT),
                (DEFAULT, 'Blues', DEFAULT, DEFAULT);
        `);

        await pool.query(`
            INSERT INTO Provincias VALUES
            (DEFAULT, 'Álava', DEFAULT, DEFAULT), (DEFAULT, 'Albacete', DEFAULT, DEFAULT), (DEFAULT, 'Alicante', DEFAULT, DEFAULT), (DEFAULT, 'Almería', DEFAULT, DEFAULT), (DEFAULT, 'Asturias', DEFAULT, DEFAULT), (DEFAULT, 'Ávila', DEFAULT, DEFAULT), (DEFAULT, 'Badajoz', DEFAULT, DEFAULT), (DEFAULT, 'Baleares', DEFAULT, DEFAULT), (DEFAULT, 'Barcelona', DEFAULT, DEFAULT), (DEFAULT, 'Burgos', DEFAULT, DEFAULT), (DEFAULT, 'Cáceres', DEFAULT, DEFAULT), (DEFAULT, 'Cádiz', DEFAULT, DEFAULT), (DEFAULT, 'Cantabria', DEFAULT, DEFAULT), (DEFAULT, 'Castellón', DEFAULT, DEFAULT), (DEFAULT, 'Ciudad Real', DEFAULT, DEFAULT), (DEFAULT, 'Córdoba', DEFAULT, DEFAULT), (DEFAULT, 'Cuenca', DEFAULT, DEFAULT), (DEFAULT, 'Girona', DEFAULT, DEFAULT), (DEFAULT, 'Granada', DEFAULT, DEFAULT), (DEFAULT, 'Guadalajara', DEFAULT, DEFAULT), (DEFAULT, 'Guipúzcoa', DEFAULT, DEFAULT), (DEFAULT, 'Huelva', DEFAULT, DEFAULT), (DEFAULT, 'Huesca', DEFAULT, DEFAULT), (DEFAULT, 'Jaén', DEFAULT, DEFAULT), (DEFAULT, 'La Rioja', DEFAULT, DEFAULT), (DEFAULT, 'Las Palmas', DEFAULT, DEFAULT), (DEFAULT, 'León', DEFAULT, DEFAULT), (DEFAULT, 'Lleida', DEFAULT, DEFAULT), (DEFAULT, 'Lugo', DEFAULT, DEFAULT), (DEFAULT, 'Madrid', DEFAULT, DEFAULT), (DEFAULT, 'Málaga', DEFAULT, DEFAULT), (DEFAULT, 'Murcia', DEFAULT, DEFAULT), (DEFAULT, 'Navarra', DEFAULT, DEFAULT), (DEFAULT, 'Ourense', DEFAULT, DEFAULT), (DEFAULT, 'Palencia', DEFAULT, DEFAULT), (DEFAULT, 'Pontevedra', DEFAULT, DEFAULT), (DEFAULT, 'Salamanca', DEFAULT, DEFAULT), (DEFAULT, 'Segovia', DEFAULT, DEFAULT), (DEFAULT, 'Sevilla', DEFAULT, DEFAULT), (DEFAULT, 'Soria', DEFAULT, DEFAULT), (DEFAULT, 'Tarragona', DEFAULT, DEFAULT), (DEFAULT, 'Santa Cruz de Tenerife', DEFAULT, DEFAULT), (DEFAULT, 'Teruel', DEFAULT, DEFAULT), (DEFAULT, 'Toledo', DEFAULT, DEFAULT), (DEFAULT, 'Valencia', DEFAULT, DEFAULT), (DEFAULT, 'Valladolid', DEFAULT, DEFAULT), (DEFAULT, 'Vizcaya', DEFAULT, DEFAULT), (DEFAULT, 'Zamora', DEFAULT, DEFAULT), (DEFAULT, 'Zaragoza', DEFAULT, DEFAULT)

        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
