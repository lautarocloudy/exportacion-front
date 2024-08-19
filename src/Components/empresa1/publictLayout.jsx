import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const PublicLayout = () => {
    const { auth } = useAuth();

    return (
        <>
            <section className="img-login">
                {!auth._id ?
                    <Outlet />
                    : <Navigate to='/social' />
                }
            </section>
        </>
    )
}