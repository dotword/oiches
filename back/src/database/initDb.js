import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS votos_salas, votos_grupos, reservas, grupo_media, grupo_fotos, sala_fotos, generos_grupos, grupos, generos_salas, salas, provincias, generos_musicales, usuarios'
        );

        console.log('Creando tablas...');

        // Creando tablas Usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Usuarios(
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL,
                avatar CHAR(100),
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
            CREATE TABLE IF NOT EXISTS Provincias(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
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
            capacidad INT NOT NULL,
            descripcion TEXT,
            precios DECIMAL(10,2),
            direccion VARCHAR(255) NOT NULL,
            condiciones TEXT,
            equipamiento TEXT,
            horaReservasStart VARCHAR(255) NOT NULL,
            horaReservasEnd VARCHAR(255) NOT NULL,
            FOREIGN KEY(provincia) REFERENCES Provincias(id),
            FOREIGN KEY(generos) REFERENCES generos_musicales(id),
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
                FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
                FOREIGN KEY(provincia) REFERENCES Provincias(id),
                FOREIGN KEY(generos) REFERENCES generos_musicales(id),
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
                sala_id CHAR(36) NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                confirmada BOOLEAN DEFAULT false,
                fecha VARCHAR(15),
                horaInicio VARCHAR(15),
                horaFin VARCHAR(15),
                FOREIGN KEY(sala_id) REFERENCES Salas(id),
                FOREIGN KEY(grupo_id) REFERENCES Grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_salas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                voto TINYINT UNSIGNED NOT NULL,
                comentario TEXT,
                reservaId CHAR(36) NOT NULL,
                grupoVota CHAR(36) NOT NULL,
                salaVotada CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reservaId) REFERENCES Reservas(id),
                FOREIGN KEY (grupoVota) REFERENCES Grupos(id),
                FOREIGN KEY (salaVotada) REFERENCES Salas(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS votos_grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                voto TINYINT UNSIGNED NOT NULL,
                comentario TEXT,
                reservaId CHAR(36) NOT NULL,
                salaVota CHAR(36) NOT NULL,
                grupoVotado CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reservaId) REFERENCES Reservas(id),
                FOREIGN KEY (grupoVotado) REFERENCES Grupos(id),
                FOREIGN KEY (salaVota) REFERENCES Salas(id)
            );
        `);

        await pool.query(`
            INSERT INTO Generos_musicales (nombre) VALUES
                ('Rock'),
                ('Pop'),
                ('Metal'),
                ('Funk'),
                ('Country'),
                ('Folk'),
                ('Jazz'),
                ('Reggae'),
                ('Indie'),
                ('Electrónica'),
                ('Soul'),
                ('Canción de autor'),
                ('Flamenco'),
                ('Clásica'),
                ('Latina'),
                ('Reaggeton'),
                ('Hip-Hop'),
                ('Blues');
        `);

        await pool.query(`
            INSERT INTO Provincias (provincia) VALUES
            ('A Coruña'), ('Álava'), ('Albacete'), ('Alicante'), ('Almería'), ('Asturias'), ('Ávila'), ('Badajoz'), ('Baleares'), ('Barcelona'), ('Burgos'), ('Cáceres'), ('Cádiz'), ('Cantabria'), ('Castellón'), ('Ciudad Real'), ('Córdoba'), ('Cuenca'), ('Girona'), ('Granada'), ('Guadalajara'), ('Guipúzcoa'), ('Huelva'), ('Huesca'), ('Jaén'), ('La Rioja'), ('Las Palmas'), ('León'), ('Lleida'), ('Lugo'), ('Madrid'), ('Málaga'), ('Murcia'), ('Navarra'), ('Ourense'), ('Palencia'), ('Pontevedra'), ('Salamanca'), ('Segovia'), ('Sevilla'), ('Soria'), ('Tarragona'), ('Santa Cruz de Tenerife'), ('Teruel'), ('Toledo'), ('Valencia'), ('Valladolid'), ('Vizcaya'), ('Zamora'), ('Zaragoza')
        
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
