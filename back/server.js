import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import crearMensajeService from './src/services/mensajes/crearMensajeService.js';
import routes from './src/routes/index.js';
import { PORT, UPLOADS_DIR } from './env.js';
import getPool from './src/database/getPool.js';
import { jwtDecode } from 'jwt-decode';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Cambia esto a tu dominio en producción
    methods: ['GET', 'POST'],
  },
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(routes);

app.use((req, res) => {
  res.status(404).send('Recurso no encontrado');
});

io.on('connection', async (socket) => {
  console.log('Cliente conectado:', socket.id);

  const user_id = socket.handshake.query.token;
  let decoded;
console.log(user_id);
  try {
    decoded = jwtDecode(user_id);
  } catch (error) {
    console.error('Error al decodificar el token:', error.message);
    socket.disconnect();
    return; // Salir si el token no es válido
  }

  const socket_id = socket.id;
  const pool = await getPool();

  // Update the user's socket ID in the database
  await pool.query('UPDATE usuarios SET socket = ? WHERE id = ?', [socket_id, decoded.id]);
  socket.on('joinRoom', ({ idConversacion }) => {
    socket.join(idConversacion); // El usuario se une a una sala basada en idConversacion
    console.log(`Usuario con ID ${socket.id} se unió a la conversación ${idConversacion}`);
  });
  // Handle incoming messages
  socket.on('mensaje', async (data) => {
    try {
        console.log('DATA',data);
      const { idConversacion, texto, idDestinatario } = data;
      
      // Guardar el mensaje en la base de datos
      const mensaje = await crearMensajeService(decoded.id, idConversacion, texto, idDestinatario);

      // Emitir el mensaje solo a la sala específica de la conversación
      console.log(`Enviando mensaje a la conversación ${idConversacion}: ${texto}`);
      io.to(idConversacion).emit('mensaje', {
        idConversacion,
        mensaje: texto,
        usuario: socket.user_id,
        destinatario: idDestinatario
      });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  });

  // Handle socket disconnection
  socket.on('disconnect', async () => {
    try {
      console.log('Cliente desconectado:', socket_id, decoded.id);
      await pool.query('UPDATE usuarios SET socket = NULL WHERE id = ?', [decoded.id]);
    } catch (error) {
      console.error('Error al desconectar:', error);
    }
  });
  
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
});

// Use server for listen
server.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
