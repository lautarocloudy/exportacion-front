import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import Header from './Header';
import Nav from './Nav';

export const PrivateLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {
        <h1>Cargando...</h1>
    } else {
        return (
            <>
                <Header />
                <Nav />

                <section className="layout__content">

                    {auth._id ?
                        (auth.role == "admin" ?
                            <Outlet /> :

                            auth.role == "solo-empresas" ?
                                <Navigate to='/empresas' /> :

                                auth.role == "labscisco" ?
                                    <Navigate to='/labscisco' /> :

                                    auth.role == "inversok" ?
                                        <Navigate to='/inversok' /> :

                                        auth.role == "labcisco-gvn" ?
                                            <Navigate to='/labcisco-gvn' /> :

                                            auth.role == "simac" ?
                                                <Navigate to='/simac' /> :

                                                auth.role == "blue corp" ?
                                                    <Navigate to='/blue-corp' /> :

                                                    auth.role == "paginas" ?
                                                        <Navigate to='/paginas' /> :

                                                        auth.role == "mactred" ?
                                                            <Navigate to='/mactred' /> :

                                                            auth.role == "claves" ?
                                                                <Navigate to='/claves' /> :

                                                                auth.role == "claves1" ?
                                                                    <Navigate to='/claves1' /> :

                                                                    auth.role == "claves2" ?
                                                                        <Navigate to='/claves2' /> :

                                                                        auth.role == "pagina-mactred" ?
                                                                            <Navigate to='/pagina-mactred' /> :

                                                                            auth.role == "hci" ?
                                                                                <Navigate to='/hci' /> :

                                                                                auth.role == "mi-contador" ?
                                                                                    <Navigate to='/mi-contador-online' /> :

                                                                                    auth.role == "smart-ceo" ?
                                                                                    <Navigate to='/smart-ceo' /> :

                                                                                    auth.role == "cloudy" ?
                                                                                    <Navigate to='/cloudy' /> :

                                                                                    <Navigate to='/' />

                        )
                        : <Navigate to='/' />
                    }

                </section>
            </>
        )
    }
}