import React, { useState, useEffect } from 'react';
import { PetitionFetchToken } from '../../Helpers/Peticion';
import Global from '../../Helpers/Global';
import { useForm } from '../../hooks/useForm';

export const ResultadoIngresoEgreso = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no enviado");
  const [contable] = useState([{ _id: 1, name: "Banco" }, { _id: 2, name: "Caja" }]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    if (opcionSeleccionada) {
      buscarYCalcular(opcionSeleccionada);
    }
  }, [opcionSeleccionada]);

  const buscarYCalcular = async (opcion) => {
    const { datos: datosIngresos } = await PetitionFetchToken(Global.url + "ingreso/ingreso", "GET", localStorage.getItem("token"));
    if (datosIngresos && datosIngresos.status === "success" && datosIngresos.ingresos) {
        const totalIngresos = datosIngresos.ingresos.filter(item => item.name === opcion).reduce((acc, item) => acc + parseFloat(item.ingresos || 0), 0);
        setIngresos(totalIngresos);
      }

    const { datos: datosEgresos } = await PetitionFetchToken(Global.url + "egreso/egreso", "GET", localStorage.getItem("token"));

    if (datosEgresos.status === "success") {
      const totalEgresos = datosEgresos.egreso.filter(item => item.name === opcion).reduce((acc, item) => acc + parseFloat(item.egresos || 0), 0);
      setEgresos(totalEgresos);
    }
  }

  useEffect(() => {
    const saldoCalculado = ingresos - egresos;
    setSaldo(saldoCalculado);
  }, [ingresos, egresos]);

  return (
    <div className='jumbo'>
      <div className="form-group">
        <label htmlFor='titulo'>Usuario permitido</label>
        <select name="name" onChange={(e) => setOpcionSeleccionada(e.target.value)}>
          <option value="">Seleccione una cuenta</option>
          {contable.length > 0 && contable.map((user) => (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor='titulo'>Ingresos</label>
        <input type="text" name='ingresos' value={ingresos} readOnly />
      </div>
      
      <div className="form-group">
        <label htmlFor='titulo'>Egresos</label>
        <input type="text" name='egresos' value={egresos} readOnly />
      </div>
    
      <div className="form-group">
        <label htmlFor='titulo'>Saldo</label>
        <input type="text" name='saldo' value={saldo} readOnly />
      </div>
      <br />
    </div>
  )
}

// import React, { useState, useEffect } from 'react';

// import { PetitionFetchToken } from '../../Helpers/Peticion';
// import Global from '../../Helpers/Global';
// import { useForm } from '../../hooks/useForm';

// export const ResultadoIngresoEgreso = () => {

//   const { formulario, enviado, cambiado } = useForm({});
//   const [resultado, setResultado] = useState("no enviado")
// //   const [contable, setContable] = useState([
// //     contable = "Banco"
// //   ]);
// const [contable] = useState([{ _id: 1, name: "Banco" }]);
// const [ingreso, setIngreso] = useState()
// const [egreso, setEgreso] = useState()


// useEffect(() => {
//     VerIngresos();
//     VerEgresos();
// }, []);

//   const VerIngresos = async () => {

//     const { datos } = await PetitionFetchToken(Global.url + "ingreso/ingreso", "GET", localStorage.getItem("token"));
//     if (datos.status === "success") {
//       setIngreso(datos.ingreso)
//     } 

//   }

//   const VerEgresos = async () => {

//     const { datos } = await PetitionFetchToken(Global.url + "egreso/egreso", "GET", localStorage.getItem("token"));
//     if (datos.status === "success") {
//       setIngreso(datos.egreso)
//     } 

//   }

//   return (
//     <div className='jumbo'>
     
//       <div className="form-group">
//           <label htmlFor='titulo'>Usuario permitido</label>
//           <select name="name" onChange={cambiado}>
//             <option value="">Seleccione una cuenta</option>
//             {contable.length > 0 && contable.map((user) => (
//               <option key={user._id} value={user.name}>
//                 {user.name}
//               </option>
//             ))}
//           </select>

//         </div>

//         <div className="form-group">
//           <label htmlFor='titulo'>Ingreso</label>
//           <input type="text" name='ingresos' defaultValue/>
//         </div>
//         <div className="form-group">
//           <label htmlFor='titulo'>Egreso</label>
//           <input type="text" name='Egreso' defaultValue/>
//         </div>
    
//         <div className="form-group">
//           <label htmlFor='titulo'>Total</label>
//           <input type="text" name='total' defaultValue/>
//         </div>
//         <br />
//     </div>
//   )
// }
