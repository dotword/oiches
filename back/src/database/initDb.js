import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS conciertos,agencias, votos_salas, votos_grupos, fechas_disponibles, reservas, grupo_media, grupo_fotos, sala_fotos, generos_grupos, grupos, generos_salas, salas, provincias, generos_musicales, usuarios'
        );

        console.log('Creando tablas...');

        // Creando tablas Usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios(
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL,
                avatar CHAR(100),
                registrationCode CHAR(30),
                roles ENUM('admin','sala','grupo','agencia') DEFAULT 'grupo',
                active BOOLEAN DEFAULT false,
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME NULL
            );
    `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS generos_musicales(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS provincias(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                provincia VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS salas(
            id CHAR(36) PRIMARY KEY NOT NULL,
            usuario_id CHAR(36) NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            provincia INT NOT NULL,
            capacidad INT NOT NULL,
            descripcion TEXT,
            precios INT,
            direccion VARCHAR(255) NOT NULL,
            ciudad VARCHAR(255) NOT NULL,
            condiciones TEXT,
            equipamiento TEXT,
            web VARCHAR(255),
            calendarActive BOOLEAN DEFAULT false,
            published BOOLEAN DEFAULT false,
            FOREIGN KEY(provincia) REFERENCES provincias(id),
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS generos_salas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                salaId CHAR(36) NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (salaId) REFERENCES salas(id),
                FOREIGN KEY (generoId) REFERENCES generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                provincia INT NOT NULL,
                web VARCHAR(255),
                honorarios INT,
                honorarios_to INT,
                condiciones TEXT,
                biografia TEXT,
                usuario_id CHAR(36) NOT NULL,
                published BOOLEAN DEFAULT false,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY(provincia) REFERENCES provincias(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS generos_grupos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                grupoId CHAR(36) NOT NULL,
                generoId INT NOT NULL,
                FOREIGN KEY (grupoId) REFERENCES grupos(id),
                FOREIGN KEY (generoId) REFERENCES generos_musicales(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS sala_fotos(
                    id CHAR(36) PRIMARY KEY NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    salaId CHAR(36) NOT NULL,
                    es_principal BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (salaId) REFERENCES salas(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS grupo_fotos(
                    id CHAR(36) PRIMARY KEY NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    grupoId CHAR(36) NOT NULL,
                    es_principal BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (grupoId) REFERENCES grupos(id),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS grupo_media(
                id CHAR(36) PRIMARY KEY NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                url VARCHAR(255) NOT NULL,
                FOREIGN KEY (grupo_id) REFERENCES grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS reservas(
                id CHAR(36) PRIMARY KEY NOT NULL,
                sala_id CHAR(36) NOT NULL,
                grupo_id CHAR(36) NOT NULL,
                confirmada ENUM('0', '1', '2') DEFAULT '0',
                fecha DATE NOT NULL,
                FOREIGN KEY(sala_id) REFERENCES salas(id),
                FOREIGN KEY(grupo_id) REFERENCES grupos(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS fechas_disponibles (
                id CHAR(36) PRIMARY KEY NOT NULL,
                sala_id CHAR(36) NOT NULL,
                fecha_disponible DATE NOT NULL,
                FOREIGN KEY (sala_id) REFERENCES salas(id),
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
                FOREIGN KEY (reservaId) REFERENCES reservas(id),
                FOREIGN KEY (grupoVota) REFERENCES grupos(id),
                FOREIGN KEY (salaVotada) REFERENCES salas(id)
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
                FOREIGN KEY (reservaId) REFERENCES reservas(id),
                FOREIGN KEY (grupoVotado) REFERENCES grupos(id),
                FOREIGN KEY (salaVota) REFERENCES salas(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS agencias(
                id CHAR(36) PRIMARY KEY NOT NULL,
                usuario_id CHAR(36) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                provincia INT NOT NULL,
                descripcion TEXT,
                web VARCHAR(255),
                published BOOLEAN DEFAULT false,
                hidden BOOLEAN DEFAULT false,
                FOREIGN KEY(provincia) REFERENCES provincias(id),
                FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS conciertos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                reservaId CHAR(36),
                title TEXT(255),
                fecha DATE NOT NULL,
                hora TIME NOT NULL,
                precioAnticipada DECIMAL(10, 2),
                precio DECIMAL(10, 2),
                otroTipoEntrada TEXT(100),
                description LONGTEXT,
                link VARCHAR(255),
                salaLink VARCHAR(255),
                poster VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reservaId) REFERENCES reservas(id)
            );
        `);

        await pool.query(`
            INSERT INTO generos_musicales (nombre) VALUES
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
                ('Blues'),
                ('Punk'),
                ('Ska'),
                ('Rap'),
                ('Hardcore'),
                ('Heavy'),
                ('Ópera'),
                ('Versiones'),
                ('Fado'),
                ('Rancheras'),
                ('Rumba'),('Cumbia'), ('Góspel'), ('Músicas del mundo'), ('Músicas urbanas');
        `);

        await pool.query(`
            INSERT INTO provincias (provincia) VALUES
            ('A Coruña'), ('Álava'), ('Albacete'), ('Alicante'), ('Almería'), ('Asturias'), ('Ávila'), ('Badajoz'), ('Baleares'), ('Barcelona'), ('Burgos'), ('Cáceres'), ('Cádiz'), ('Cantabria'), ('Castellón'), ('Ciudad Real'), ('Córdoba'), ('Cuenca'), ('Girona'), ('Granada'), ('Guadalajara'), ('Guipúzcoa'), ('Huelva'), ('Huesca'), ('Jaén'), ('La Rioja'), ('Las Palmas'), ('León'), ('Lleida'), ('Lugo'), ('Madrid'), ('Málaga'), ('Murcia'), ('Navarra'), ('Ourense'), ('Palencia'), ('Pontevedra'), ('Salamanca'), ('Segovia'), ('Sevilla'), ('Soria'), ('Tarragona'), ('Santa Cruz de Tenerife'), ('Teruel'), ('Toledo'), ('Valencia'), ('Valladolid'), ('Vizcaya'), ('Zamora'), ('Zaragoza'), ('Ceuta'), ('Melilla');
        
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
