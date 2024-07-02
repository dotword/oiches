import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS votos_salas, votos_grupos, grupo_comments, sala_comments, reservas, grupo_media, grupo_fotos, sala_fotos, generos_grupos, grupos, generos_salas, salas, generos_musicales, usuarios'
        );

        console.log('Creando tablas...');

        // Creando tablas Usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Usuarios(
                id INT AUTO_INCREMENT PRIMARY KEY,
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
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS Salas(
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            usuario_id INT NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            provincia VARCHAR(255) NOT NULL,
            capacidad INT,
            descripcion TEXT,
            precios DECIMAL(10,2),
            direccion VARCHAR(255) NOT NULL,
            FOREIGN KEY(usuario_id) REFERENCES Usuarios(id),
            condiciones TEXT,
            equipamiento TEXT,
            email VARCHAR(100) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Generos_salas(
                id INT AUTO_INCREMENT PRIMARY KEY,
                salaId INT NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (salaId) REFERENCES Salas(id),
                FOREIGN KEY (generoId) REFERENCES Generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Creando tabla Grupos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupos(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50)  NOT NULL UNIQUE,
                provincia VARCHAR(255),
                honorarios INT,
                biografia TEXT,
                usuario_id INT,
                FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
                rider VARCHAR(255),
                email VARCHAR(255),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Generos_grupos(
                id INT AUTO_INCREMENT PRIMARY KEY,
                grupoId INT NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (grupoId) REFERENCES Grupos(id),
                FOREIGN KEY (generoId) REFERENCES Generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Sala_fotos(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    salaId INT,
                    FOREIGN KEY (salaId) REFERENCES Salas(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_fotos(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    grupoId INT,
                    FOREIGN KEY (grupoId) REFERENCES Grupos(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_media(
                id INT AUTO_INCREMENT PRIMARY KEY,
                grupo_id INT,
                url VARCHAR(255) NOT NULL,
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Reservas(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                sala_id INT,
                grupo_id INT,
                confirmada BOOLEAN DEFAULT false,
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY(grupo_id) REFERENCES Grupos(id),
                fecha VARCHAR(15),
                hora VARCHAR(15),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Sala_comments(
                id INT AUTO_INCREMENT PRIMARY KEY,
                descripcion TEXT,
                sala_id INT,
                grupo_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Grupo_comments(
                id INT AUTO_INCREMENT PRIMARY KEY,
                descripcion TEXT,
                sala_id INT,
                grupo_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY(grupo_id) REFERENCES Grupos(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_grupos(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                grupo_id INT,
                voto_sala_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (grupo_id) REFERENCES Grupos(id),
                FOREIGN KEY (voto_sala_id) REFERENCES Salas(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_salas(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                voto_grupo_id INT,
                sala_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (voto_grupo_id) REFERENCES Grupos(id),
                FOREIGN KEY (sala_id) REFERENCES Salas(id)
            );
        `);

        await pool.query(`
            INSERT INTO Generos_musicales VALUES
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

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
