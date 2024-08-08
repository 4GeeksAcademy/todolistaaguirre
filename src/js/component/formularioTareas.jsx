import React, { useState } from "react";

const FormularioTareas = ({tareas, cambiarTarea}) => {

    const [inputValor, setInputValor] = useState(' ');
    const funcionEnter = (e) => {
        if (e.key === 'enter') {
        }
    }

    return (
        <form action="" className="formulario-tareas">
            <input
                type="texto"
                className="formulario-tareas__input"
                placeholder="Ingresa tu tarea"
                onChange={(funcionEnter)}
            />


        </form>
    );
}

export default FormularioTareas;