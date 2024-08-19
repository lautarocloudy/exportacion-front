import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <nav className="custom-nav">
        <ul className="cont-ul">
          <li className="develop">
            Claves impositivas
            <ul className="ul-second">
              <li className="front">
                Claves Fiscales
                <ul className="ul-third">
                  <li className="back"><NavLink to="/social/crear-claves-fiscal">Cargar</NavLink></li>
                  <li className="back"><NavLink to="/social/lista-claves-fiscal">Ver</NavLink></li>

                </ul>
              </li>
            </ul>
          </li>
          <li className="develop">
            {/* contable */}
            {/* <ul className="ul-second"> */}
              <li className="front">
               contable
                <ul className="ul-third">
                  <li className="back"><NavLink to="/social/cargar-egreso">Egreso</NavLink></li>
                  <li className="back"><NavLink to="/social/cargar-ingreso">Ingreso</NavLink></li>
                  <li className="back"><NavLink to="/social/Resultado-Ingreso-Egreso">Resultado</NavLink></li>
                </ul>
              </li>
            {/* </ul> */}
            
          </li>

          <li className="develop">
            <NavLink aria-current="page" to="/social/salir">Salir</NavLink>
          </li>
        </ul>
        {/* partes del medio superior */}


        {/* parte medio inferior */}


      </nav>

    </>
  );
};

export default Nav;