import React, { useState, useEffect } from 'react';
import { useForm } from '../../../hooks/useForm';
import Global from '../../../Helpers/Global';
import { PetitionFetchToken } from '../../../Helpers/Peticion';

export const CrearClaves = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no enviado")
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    conseguirUsuario();
  }, []);

  const conseguirUsuario = async () => {
    const { datos } = await PetitionFetchToken(Global.url + "user/usuario", "GET", localStorage.getItem("token"));

    if (datos.status === "success") {
      setUsuario(datos.usuario);
    }
  }


  const guardarArticulo = async (e) => {
    e.preventDefault();

    let nuevaClave = formulario;

    const { datos } = await PetitionFetchToken(Global.url + "clave/crear", "POST", localStorage.getItem("token"), nuevaClave);
    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Cargar Claves</h1>
      <strong>{resultado == "guardado" ? "La clave se ha guardado con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Falta cargar el nombre de la empresa" : ""}</strong>
      <br /><br />
      <form className="formulario" onSubmit={guardarArticulo} >
        <div className="form-group">
          <label htmlFor='titulo'>Empresa o Persona</label>
          <input type="text" name='nombreEmpresa' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT del usuario</label>
          <input type="text" name='cuitUsuario' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT de la empresa</label>
          <input type="text" name='cuitEmpresa' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>clave fiscal afip</label>
          <input type="text" name='claveFiscalAfip' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Clave fiscal agip</label>
          <input type="text" name='claveFiscalAgip' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Clave Arba</label>
          <input type="text" name='claveFiscalArba' onChange={cambiado} />
        </div>
        <br />
        <div className="form-group">
          <label>Usuario permitido</label>
          <select name="persona1" onChange={cambiado}>
            <option value="">Seleccione un usuario</option>
            {usuario.length > 0 && usuario.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Usuario permitido</label>
          <select name="persona2" onChange={cambiado}>
            <option value="">Seleccione un usuario</option>
            {usuario.length > 0 && usuario.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

        </div>
        <br />
        <input type="submit" value="Guardar" className='btn btn-success' />
      </form>
    </div>
  )
}
