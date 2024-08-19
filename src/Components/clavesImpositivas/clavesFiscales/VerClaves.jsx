import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetitionFetchToken } from '../../../Helpers/Peticion';
import Global from '../../../Helpers/Global';

export const VerClaves = () => {

  const [clave, setClave] = useState({});
  const [resultado, setResultado] = useState("no enviado")
  const params = useParams();

  useEffect(() => {
    conseguirClave();

  }, []);

  const conseguirClave = async () => {
    const { datos } = await PetitionFetchToken(Global.url + "clave/clave/" + params.id, "GET", localStorage.getItem("token"));

    if (datos.status === "success") {
      setClave(datos.clave);
    }

  };


  return (
    <div className='jumbo'>
      <h1>{clave.nombreEmpresa}</h1>
      <strong>{resultado == "guardado" ? "se actualizo con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionasdos son incorrectos" : ""}</strong>
      <br /><br />
      <form className="formulario"  >
        <div className="form-group">
          <label htmlFor='titulo'>Empresa o persona</label>
          <input type="text" name='nombreEmpresa' defaultValue={clave.nombreEmpresa} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT del usuario</label>
          <input type="text" name='cuitUsuario' defaultValue={clave.cuitUsuario} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>CUIT de la empresa</label>
          <input type="text" name='cuitEmpresa' defaultValue={clave.cuitEmpresa} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Clave Fiscal Afip</label>
          <input type="text" name='claveFiscalAfip' defaultValue={clave.claveFiscalAfip} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Clave fiscal Agip</label>
          <input type="text" name='claveFiscalAgip' defaultValue={clave.claveFiscalAgip} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Clave fiscal arba</label>
          <input type="text" name='claveFiscalArba' defaultValue={clave.claveFiscalArba} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Usuario permitidos </label>
          <input type="text" name='persona1' defaultValue={clave.persona1} disabled={true} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor='titulo'>Usuario permitidos </label>
          <input type="text" name='persona2' defaultValue={clave.persona2} disabled={true} />
        </div>
        <br />
        <br />
      </form>
    </div>
  )
}