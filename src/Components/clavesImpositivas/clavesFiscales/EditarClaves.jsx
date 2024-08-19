import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetitionFetchToken } from '../../../Helpers/Peticion';
import { useForm } from '../../../hooks/useForm';
import Global from '../../../Helpers/Global';

export const EditarClaves = () => {

  const { formulario, cambiado } = useForm({});
  const [clave, setClave] = useState({});
  const [resultado, setResultado] = useState("no enviado")
  const [usuario, setUsuario] = useState([]);
  const params = useParams();

  useEffect(() => {
    conseguirClave();
    conseguirUsuario();
  }, []);

  const conseguirClave = async () => {
    const { datos } = await PetitionFetchToken(Global.url + "clave/clave/" + params.id, "GET", localStorage.getItem("token"));

    if (datos.status === "success") {
      setClave(datos.clave);
    }
  };

  const conseguirUsuario = async () => {
    const { datos } = await PetitionFetchToken(Global.url + "user/usuario", "GET", localStorage.getItem("token"));

    if (datos.status === "success") {
      setUsuario(datos.usuario);
    }
  }

  const editarClave = async (e) => {
    e.preventDefault();

    let nuevoClave = formulario;

    const { datos } = await PetitionFetchToken(Global.url + "clave/editar/" + params.id, "PUT", localStorage.getItem("token"), nuevoClave);
    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>
      <h1>editar clave fiscal</h1>
      <strong>{resultado == "guardado" ? "se actualizo con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionasdos son incorrectos" : ""}</strong>
      <br /><br />
      <form className="formulario" onSubmit={editarClave} >
        <div className="form-group">
          <label htmlFor='titulo'>Empresa o persona</label>
          <input type="text" name='nombreEmpresa' onChange={cambiado} defaultValue={clave.nombreEmpresa} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT del usuario</label>
          <input type="text" name='cuitUsuario' onChange={cambiado} defaultValue={clave.cuitUsuario} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT de la empresa</label>
          <input type="text" name='cuitEmpresa' onChange={cambiado} defaultValue={clave.cuitEmpresa} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>clave Fiscal Afip</label>
          <input type="text" name='claveFiscalAfip' onChange={cambiado} defaultValue={clave.claveFiscalAfip} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>clave Fiscal Agip</label>
          <input type="text" name='claveFiscalAgip' onChange={cambiado} defaultValue={clave.claveFiscalAgip} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>clave Fiscal Arba</label>
          <input type="text" name='claveFiscalArba' onChange={cambiado} defaultValue={clave.claveFiscalArba} />
        </div>
        <br />
        <div className="form-group">
          <label>Usuario permitido: {clave.persona1? <h4>{clave.persona1}</h4>:<p>No hay ningun usuario seleccionado</p> }</label>
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
          <label htmlFor='titulo'>Usuario permitido: {clave.persona2? <h4>{clave.persona2}</h4>:<p>No hay ningun usuario seleccionado</p> }</label>
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