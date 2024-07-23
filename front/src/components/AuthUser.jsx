import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth/auth.context';
import getDataUserLoggedService from '../services/getDataUserLoggedService';
import userIcon from '/image-user-prof.png';

const AuthUser = () => {
    const { signOut, token } = useContext(AuthContext);

    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        const getDateUserLogged = async () => {
            try {
                const data = await getDataUserLoggedService({ token });

                setUserLogged(data);
            } catch (error) {
                console.log(error);
            }
        };

        getDateUserLogged();
    }, [token]);

    return userLogged ? (
        <>
            <p>Usuario: {userLogged.username}</p>
            <p>Email: {userLogged.email}</p>
            <Link to="/user/profile">
                <img
                    src={
                        userLogged.avatar
                            ? `${import.meta.env.VITE_API_URL}/uploads/${
                                  userLogged.avatar
                              }`
                            : userIcon
                    }
                    alt="avatar"
                    width={100}
                    height={100}
                />
            </Link>
            <button onClick={() => signOut()}>Logout</button>
        </>
    ) : (
        <h1 className="text-center text-xl">No puedes acceder a esta página</h1>
    );
};

export default AuthUser;
