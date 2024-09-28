import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import io from 'socket.io-client';
import { AuthContext } from '../context/auth/auth.context.jsx';
import Noimage from '../../src/assets/noimage.png';
export const Chat = () => {
  const [socket, setSocket] = useState(null);
  const API = `http://localhost:3000`;
  const [selectedConversation, setSelectedConversation] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
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
      if(!currentUser){
        console.error('No se puede recibir mensajes si no hay un usuario logueado');
        return
      }
      // Agregar el mensaje recibido al estado de messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
            mensaje: mensaje.mensaje,
            incomming: mensaje.destinatario !== currentUser.id, // Determina si es un mensaje entrante
        },
    ]);
    });
    // Recepción de mensajes del servidor
    

    setSocket(socketConnection);
    return () => {
      socketConnection.disconnect();
    };
  }, [API,currentUser]);

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
        console.log(data);
        setConversaciones(data.data.conversaciones);
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
          const response = await fetch(`${API}/mensajes/${selectedConversation.conversacion_id}`, {
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
    console.log(user);
    setSelectedConversation(user);

    // Emitir el evento 'joinRoom' al servidor para unirse a la conversación
    if (socket) {
      socket.emit('joinRoom', { idConversacion: user.conversacion_id });
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    if(!value){
      setSearchedUsers([]);
      return
    }
    try {
      const fetchUsers = await fetch(`${API}/users/${value}`, {
        method: 'GET',
        headers: {
          'authorization': `${localStorage.getItem('AUTH_TOKEN')}`,
        },
      });
  
      const data = await fetchUsers.json();
  
      // Imprimir la respuesta para ver la estructura de `data`
      console.log("Response data:", data);
  
      // Verifica si `data.data` es un array
      if (Array.isArray(data.data)) {
        const filteredUsers = data.data.filter((user) => user.id !== currentUser.id);
        console.log(filteredUsers);
        setSearchedUsers(filteredUsers);
      } else {
        console.error("Expected an array but received:", data.data);
      }
  
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
  
    if (message.trim() !== '' && socket) {
      
  
      // Obtener el ID del usuario logueado
      const userId = currentUser.id; // Asegúrate de que `currentUser` contenga el ID
      console.log(selectedConversation,'selectedConversation');
      // Determina el destinatario
      const idDestinatario =
        selectedConversation.usuario1 === userId
          ? selectedConversation.usuario2
          : selectedConversation.usuario1;
      if(!idDestinatario){
        console.error('No se puede enviar mensajes si no hay un destinatario');
        return
      }
      socket.emit('mensaje', {
        idConversacion: selectedConversation.conversacion_id,
        texto: message,
        idDestinatario: idDestinatario,
      });
  
  
  
      e.target.elements.message.value = ''; // Limpia el input
      setMessages((prev) => [ ...prev, { mensaje: message, incomming: false } ]);
    }
  };
  const handleIniciateConversacion = async (id) => {
    const response = await fetch(`${API}/conversaciones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('AUTH_TOKEN')}`,
        },
        body: JSON.stringify({ idUsuarioDestino: id }),
    });

    const data = await response.json();
    console.log("Respuesta de la creación de la conversación:", data);

    // Verifica si la conversación fue creada exitosamente
    if (data.status === 'ok' && data.data) {
        // Usar data.data directamente ya que ahora contiene la conversación completa
        setConversaciones((prev) => [...prev, data.data]);
        setSelectedConversation(data.data); // Esto selecciona la nueva conversación
        setSearchedUsers([]); // Limpiar la lista de usuarios buscados
    } else {
        console.error("La conversación no es válida:", data);
    }
};





  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl flex h-screen">
        <div className="w-2/4 flex flex-col gap-2 mx-4 bg-[#93F]/40 border rounded h-3/4 my-10 px-8">
          <h2 className="text-2xl text-center my-4">Chats</h2>
          <input onChange={handleChange} type="search" placeholder="Buscar usuario" className="form-input self-start m-0" />
          {
            searchedUsers.length > 0 && (
              <ul className="list-none my-4">
                {searchedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex gap-2 items-center p-2 rounded-lg bg-[#93F]/20 cursor-pointer"
                    onClick={() => handleIniciateConversacion(user.id)}
                  >
                    {user.avatar ? (
                      <img src={`${API}/uploads/${user.avatar}`} alt={user.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={Noimage}
                        alt="No image"
                      />
                    )}
                    <h3>{user.username}</h3>
                  </li>
                ))}
              </ul>
            )
          }
          <ul className="list-none my-4 overflow-y-auto ">
  {conversaciones.length > 0 &&
    conversaciones.map((conversacion, index) => (
      <li
        key={conversacion.id || index}
        className="flex gap-2 items-center p-2 my-4 rounded-lg bg-[#93F]/20 cursor-pointer"
        onClick={() => handleSelectUser(conversacion)}
      >
        {conversacion.usuario1_id === currentUser.id ? (
          <>
            {conversacion.usuario2_avatar ? (
              <img
                src={`${API}/uploads/${conversacion.usuario2_avatar}`}
                alt={conversacion.usuario2_username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img className="w-10 h-10 rounded-full" src={Noimage} alt="No image" />
            )}
            <h3>{conversacion.usuario2_username}</h3>
          </>
        ) : (
          <>
            {conversacion.usuario1_avatar ? (
              <img
                src={`${API}/uploads/${conversacion.usuario1_avatar}`}
                alt={conversacion.usuario1_username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img className="w-10 h-10 rounded-full" src={Noimage} alt="No image" />
            )}
            <h3>{conversacion.usuario1_username}</h3>
          </>
        )}
      </li>
    ))}
</ul>

        </div>

        <div className="border w-full mx-4 flex flex-col h-3/4 my-10">
          <div className="border flex-grow-0 flex place-items-center gap-4 p-4">
            {selectedConversation ? (
              <>
                  
                <h2 className="text-2xl">Chat con {selectedConversation.usuario1_id != currentUser.id ? selectedConversation.usuario1_username : selectedConversation.usuario2_username }</h2>
              </>
            ) : (
              <h2 className="text-2xl">Selecciona un usuario para chatear</h2>
            )}
          </div>

          <div className="flex-grow p-4 overflow-y-auto">
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
