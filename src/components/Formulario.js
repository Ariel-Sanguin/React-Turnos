import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

uuidv4();

const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita, actualizarCita]= useState({
        mascota:'',
        dueño:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const[error, actualizarError]= useState(false)

    //Funcion que se ejecuta cada vez que el usuario escribe
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer valores
    const{mascota, dueño, fecha, hora, sintomas} = cita;

    //Cuando se presiona agregar turno
    const submitCita = e =>{
        e.preventDefault();

        //Validacion
        if(mascota.trim()==='' || dueño.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()===''){
            actualizarError(true);
            return;
        }
        //Eliminar el msj previo  de error
        actualizarError(false);
        //Asignacion de ID
        cita.id= uuidv4();
        
        //Creacion de de cita
        crearCita(cita);
        //Reinicio del formulario
        actualizarCita({
            mascota: '',
            dueño: '',
            fecha:'',
            hora: '',
            sintomas: ''
        })
    }
    return ( 
        <Fragment>
            <h2>Crear citas</h2>
            {error?<p className="alerta-error">Todos los campos son obligatorios</p>  : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="dueño"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={actualizarState}
                    value={dueño}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submmit"
                    className="u-full-width button-primary"
                >
                    Agregar cita
                </button>
            </form>
        </Fragment>
     );
}
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
} 
export default Formulario;
