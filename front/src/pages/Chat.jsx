import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import io from 'socket.io-client';
import { AuthContext } from '../context/auth/auth.context.jsx';

export const Chat = () => {
  const [socket, setSocket] = useState(null);
  const API = `http://localhost:3000`;
  const [selectedConversation, setSelectedConversation] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversaciones, setConversaciones] = useState([]);
const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const socketConnection = io(API, {
      query: { token: localStorage.getItem('AUTH_TOKEN') },
    });

    socketConnection.on('connect', () => {
      console.log('Conectado al socket');
    });
    console.log('Configurando evento mensaje...');
    socketConnection.on('mensaje', (mensaje) => {
      console.log('Mensaje recibido del servidor:', mensaje);
      
      // Agregar el mensaje recibido al estado de messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          mensaje: mensaje.mensaje,
          incomming: true, // o false, dependiendo de quién envió el mensaje
        },
      ]);
    });
    // Recepción de mensajes del servidor
    

    setSocket(socketConnection);
    return () => {
      socketConnection.disconnect();
    };
  }, [API]);

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        const response = await fetch(`${API}/conversaciones`, {
          method: 'GET',
          headers: {
            'authorization': `${localStorage.getItem('AUTH_TOKEN')}`,
          },
        });
        const data = await response.json();
        
        setConversaciones(data.data);
      } catch (error) {
        console.error('Error al obtener las conversaciones:', error);
      }
    };
    fetchConversaciones();
  }, [API]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          const response = await fetch(`${API}/mensajes/${selectedConversation.id}`, {
            method: 'GET',
            headers: {
              'authorization': `${localStorage.getItem('AUTH_TOKEN')}`,
            },
          });
          const data = await response.json();
          setMessages(data.data);
        } catch (error) {
          console.error('Error al obtener los mensajes:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // Actualizar el método handleSelectUser para unir a la sala de la conversación
  const handleSelectUser = (user) => {
    setSelectedConversation(user);

    // Emitir el evento 'joinRoom' al servidor para unirse a la conversación
    if (socket) {
      socket.emit('joinRoom', { idConversacion: user.id });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
  
    if (message.trim() !== '' && socket) {
      
  
      // Obtener el ID del usuario logueado
      const userId = currentUser.id; // Asegúrate de que `currentUser` contenga el ID
  
      // Determina el destinatario
      const idDestinatario =
        selectedConversation.usuario1 === userId
          ? selectedConversation.usuario2
          : selectedConversation.usuario1;
  
      socket.emit('mensaje', {
        idConversacion: selectedConversation.id,
        texto: message,
        idDestinatario: idDestinatario,
      });
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          mensaje: message,
          incomming: false, // Marca el mensaje como saliente
        },
      ]);
  
      e.target.elements.message.value = ''; // Limpia el input
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex h-screen">
        <div className="w-[300px] flex flex-col gap-2 px-4 bg-[#93F]/40 border rounded">
          <h2 className="text-2xl text-center my-4">Chats</h2>
          <input type="text" placeholder="Buscar usuario" className="form-input self-start m-0" />
          <button className="btn-buscar self-start mx-auto">Buscar</button>
          <ul className="list-none my-4">
            {conversaciones.map((conversacion) => (
              <li
                key={conversacion.id}
                className="flex gap-2 items-center p-2 rounded-lg bg-[#93F]/20 cursor-pointer"
                onClick={() => handleSelectUser(conversacion)}
              >
                <img src={conversacion.img} alt={conversacion.name} className="w-10 h-10 rounded-full" />
                <h3>{conversacion.name}</h3>
              </li>
            ))}
          </ul>
        </div>

        <div className="border w-full mx-4 flex flex-col h-full">
          <div className="border flex-grow-0 flex place-items-center gap-4 p-4">
            {selectedConversation ? (
              <>
                <img src={selectedConversation.img} alt={selectedConversation.name} className="w-10 h-10 rounded-full" />
                <h2 className="text-2xl">Chat con {selectedConversation.name}</h2>
              </>
            ) : (
              <h2 className="text-2xl">Selecciona un usuario para chatear</h2>
            )}
          </div>

          <div className="flex-grow p-4">
            {selectedConversation ? (
              messages.map((message,index) => (
                <div key={index} className={`flex gap-2 ${message.incomming ? 'justify-start' : 'justify-end'}`}>
                  <div className={`p-2 rounded-lg bg-${message.incomming ? 'gray' : 'blue'}-200`}>
                    <p>{message.mensaje}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No has seleccionado ningún chat.</p>
            )}
          </div>

          {selectedConversation && (
            <div className="flex-0">
              <form onSubmit={handleSubmit} className="flex gap-2 bottom-2 left-0 right-0 max-w-4xl mx-auto px-4">
                <input
                  type="text"
                  name="message"
                  placeholder={`Escribe tu mensaje para ${selectedConversation.name}`}
                  className="form-input m-0 flex-grow"
                />
                <button className="btn-buscar">Enviar</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
