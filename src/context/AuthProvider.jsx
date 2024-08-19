import React, { createContext, useState, useEffect } from 'react'
import Global from '../Helpers/Global';
import { PetitionFetchToken } from '../Helpers/Peticion';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState({});

    useEffect(() => {
        authUser();

    }, []);

    const authUser = async () => {
        const tokenInvalido = () => {
            localStorage.clear()
            navigate("/")
        }
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            setLoading(false);
            return false;
        }

        const userObj = JSON.parse(user);
        const userId = userObj.id;

        const { datos } = await PetitionFetchToken(Global.url + "user/profile/" + userId, "GET", token);

        if (datos.message == "Token invalido" || datos.message == "Token expirado") {
            tokenInvalido()
        } else {
            setAuth(datos.user);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;