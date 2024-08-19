import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import Global from '../../Helpers/Global';
import { Peticion } from '../../Helpers/Peticion';

export const Login = () => {

  const { formulario, cambiado } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();


  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = formulario;

    const { datos } = await Peticion(Global.url + "user/login", "POST", userToLogin);
    if (datos.status === "success") {
      localStorage.setItem("token", datos.token);
      localStorage.setItem("user", JSON.stringify(datos.user));
      setSaved("login");

      setAuth(datos.user);
      setTimeout(() => {
        window.location.reload();
      }, 10)

    } else {
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">.</h1>
      </header>
      <div className="content__posts ">

        {saved == "login" ?
          <strong className='alert alert-success'> "Ingreso correctamente" </strong>
          : ""}
        {saved == "error" ?
          <strong className='alert alert-danger'> "Los datos proporcionasdos son incorrectos" </strong>
          : ""}

        <section className='secction-login1'>
          <form onSubmit={loginUser}>
            <div className='div-login'>
              <label className="form-label" htmlFor='email'>Email</label>
              <input type="email" name='email' className="form-login" onChange={cambiado} />
            </div>
            <div >
              <label className="form-label" htmlFor='password'>Contraseña</label>
              <input type="password" name='password' className="form-login" onChange={cambiado} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-tamaño mb-4">Ingresar</button>
          </form>
        </section>

      </div>
    </>
  )
}