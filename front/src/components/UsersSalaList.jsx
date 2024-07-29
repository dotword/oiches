import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import FetchUsersSalasService from '../services/FetchUsersSalasService';

const UsersSalaList = () => {
    const { token } = useAuth();

    const [salasList, setSalasList] = useState([]);

    useEffect(() => {
        const fetchUserSalas = async () => {
            const salas = await FetchUsersSalasService({ token });

            setSalasList(salas);
        };

        fetchUserSalas();
    }, [token]);

    return (
        <section>
            <h2>Gestiona tus salas</h2>
            {salasList.length > 0
                ? salasList.map((sala) => (
                      <>
                          <div key={sala.id}>
                              <a href={`/sala/${sala.id}/edit`}>
                                  {sala.nombre}
                              </a>
                              <a href={`/sala/${sala.id}/edit`}>Editar Sala</a>
                          </div>
                      </>
                  ))
                : 'ajdios'}
        </section>
    );
};

export default UsersSalaList;
