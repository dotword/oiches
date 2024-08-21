import getPool from './getPool.js';
import { v4 as uuidv4 } from 'uuid'; // Para generar UUIDs

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Poblando la base de datos...');

        // Inserta datos en la tabla `usuarios`
        await pool.query(`
            INSERT INTO usuarios (id, username, email, password, roles, active) VALUES 
            ('${uuidv4()}', 'admin_user', 'admin@example.com', 'hashed_password', 'admin', true),
            ('${uuidv4()}', 'sala_user', 'sala@example.com', 'hashed_password', 'sala', true),
            ('${uuidv4()}', 'grupo_user', 'grupo@example.com', 'hashed_password', 'grupo', true)
        `);

        // Inserta datos en la tabla `salas`
        await pool.query(`
            INSERT INTO salas (id, usuario_id, nombre, provincia, capacidad, descripcion, precios, direccion, condiciones, equipamiento, horaReservasStart, horaReservasEnd) VALUES
            ('${uuidv4()}', (SELECT id FROM usuarios WHERE username = 'sala_user'), 'Sala 1', 1, 100, 'Una sala genial', 50.00, 'Calle Falsa 123', 'Condiciones de uso', 'Equipamiento básico', '09:00', '22:00')
        `);

        // Inserta datos en la tabla `grupos`
        await pool.query(`
            INSERT INTO grupos (id, nombre, provincia, honorarios, biografia, usuario_id) VALUES
            ('${uuidv4()}', 'Grupo 1', 1, 200, 'Biografía del grupo', (SELECT id FROM usuarios WHERE username = 'grupo_user'))
        `);

        // Inserta datos en la tabla `generos_salas`
        await pool.query(`
            INSERT INTO generos_salas (id, salaId, generoId) VALUES
            ('${uuidv4()}', (SELECT id FROM salas WHERE nombre = 'Sala 1'), (SELECT id FROM generos_musicales WHERE nombre = 'Rock'))
        `);

        // Inserta datos en la tabla `generos_grupos`
        await pool.query(`
            INSERT INTO generos_grupos (id, grupoId, generoId) VALUES
            ('${uuidv4()}', (SELECT id FROM grupos WHERE nombre = 'Grupo 1'), (SELECT id FROM generos_musicales WHERE nombre = 'Rock'))
        `);

        // Inserta datos en la tabla `reservas`
        await pool.query(`
            INSERT INTO reservas (id, sala_id, grupo_id, confirmada, fecha, horaInicio, horaFin) VALUES
            ('${uuidv4()}', (SELECT id FROM salas WHERE nombre = 'Sala 1'), (SELECT id FROM grupos WHERE nombre = 'Grupo 1'), true, '2024-08-21', '10:00', '12:00')
        `);

        console.log('¡Base de datos poblada!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

main();
