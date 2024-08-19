import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Listado from './ListadoClave';
import { CSVLink } from "react-csv";

import Global from '../../../Helpers/Global';
import { PetitionFetchToken } from '../../../Helpers/Peticion';
import useAuth from '../../../hooks/useAuth';

const ListaClave = () => {

    const [claves, setClaves] = useState([]);
    const navegar = useNavigate();
    const { auth, loding } = useAuth();

    const busqueda = auth.name;

    useEffect(() => {
        conseguirEmpresa();
    }, []);

    const conseguirEmpresa = async () => {

        if(busqueda == "guillermo"){
            const { datos, cargando } = await PetitionFetchToken(Global.url + "clave/claves", "GET", localStorage.getItem("token"));

            if (datos.status === "success") {
                setClaves(datos.clave);
                
    
            }
        }else{
            const { datos, cargando } = await PetitionFetchToken(`${Global.url}clave/buscarpersona/${busqueda}`, "GET", localStorage.getItem("token") );

            if (datos.status === "success") {
                setClaves(datos.claves);
                
            }
        }
        
    }

    const header = [
        { label: "empresa", key: "nombreEmpresa" },
        { label: "Email", key: "email" },
        { label: "Contraseña", key: "contraseña" },
        { label: "Telefono", key: "telefono" },
        { label: "Direccion", key: "direccion" },
        { label: "Actividad", key: "actividad" },
        { label: "Clave Fiscal", key: "claveFiscal" },
        { label: "Nombre de la Persona Juridica o Fisica", key: "nombrePersonaJuridicaFisica" },
        { label: "CUIT", key: "cuit" },
        { label: "Facebool", key: "facebook" },
        { label: "Instagram", key: "instagram" },
        { label: "Twitter", key: "twitter" },
    ]

    const csvReport = {
        filename: "backUp de claves fiscales",
        headers: header,
        data: claves
    }

   

    return (
        <aside className="lateral">
            <h1> Claves Fiscales </h1>
            {
                claves.length >= 1 ?
                    <Listado claves={claves} setClaves={setClaves} />
                    : <h3>No tienes claves fiscales asignadas </h3>
            }
            <CSVLink className='btn btn-info' {...csvReport}> Exportar claves</CSVLink>
        </aside>
    )
}

export default ListaClave