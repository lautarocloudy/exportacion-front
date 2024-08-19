import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {

    localStorage.clear();
    setAuth({});
    navigate("/login")
  })

  return (
    <h1>cerrando sesion...</h1>
  )
}