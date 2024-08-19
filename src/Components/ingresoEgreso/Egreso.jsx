import React, { useState } from 'react';
import { PetitionFetchToken } from '../../Helpers/Peticion';
import Global from '../../Helpers/Global';
import { useForm } from '../../hooks/useForm';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const CrearEgreso = () => {
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no enviado");
  const [contable] = useState([{ _id: 1, name: "Banco" }, { _id: 2, name: "Caja" }]);
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    const event = {
      target: {
        name: 'fecha',
        value: date
      }
    };
    cambiado(event);
    setStartDate(date);
  };

  const guardarArticulo = async (e) => {
    e.preventDefault();
    const nuevo = { ...formulario, fecha: startDate };

    const { datos } = await PetitionFetchToken(Global.url + "egreso/crear", "POST", localStorage.getItem("token"), nuevo);
    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
      console.log(datos);
    }
  };

  return (
    <div className='jumbo'>
      <h1>Cargar Egreso</h1>
      <strong>{resultado === "guardado" ? "La información se ha guardado con éxito" : ""}</strong>
      <strong>{resultado === "error" ? "Falta cargar el nombre de la empresa" : ""}</strong>
      <br /><br />
      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor='name'>Usuario permitido</label>
          <select name="name" onChange={cambiado}>
            <option value="">Seleccione una cuenta</option>
            {contable.length > 0 && contable.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='egresos'>Egreso</label>
          <input type="text" name='egresos' onChange={cambiado} />
        </div>
        <div className="form-group">
          <label htmlFor='fecha'>Fecha</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            showFourColumnMonthYearPicker
          />
        </div>
        <br />
        <input type="submit" value="Guardar" className='btn btn-success' />
      </form>
    </div>
  )
}
