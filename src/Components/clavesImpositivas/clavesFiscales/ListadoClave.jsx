import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth';


export default function Listado({ claves, setClaves }) {
    const navigate = useNavigate();
    // const { auth, loading } = useAuth();

    const Navegar = (url) =>{
        // if(auth.role == "admin"){
        //     navigate("/social/"+url)
        // }else{
        //     navigate("/mi-contador-online/"+url)
        // }       
        navigate("/social/"+url)
    }

    return (
        claves.map((clave) => {
            return (
                <div className="container-listado" key={clave._id}>
                    <div className="row">
                        <div className="col-lg">
                        <p className='nombre-lista'>    {clave.nombreEmpresa} </p>
                        </div>
                        <div className="col-lg">
                            <button type="submit" className="btn btn-primary" 
                            onClick={  ()=> Navegar("ver-clave-fiscal/"+ clave._id)}
                            > <Link> Ver</Link></button>
                            <button type="submit" className="btn btn-success" 
                            onClick={  ()=> Navegar("editar-clave-fiscal/"+ clave._id)}
                            ><Link> Editar </Link> </button>
                        </div>
                    </div>
                </div>
            )
        })
    )
}