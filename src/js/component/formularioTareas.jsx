import React, { useState } from "react";

const FormularioTareas = () => {

    const [inputValor, setInputValor] = useState('');

    const [toDoList, setToDoList] = useState([]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {

            toDoList.push(inputValor);
            setToDoList(toDoList);
            setInputValor("");

        }
    }
    return (
        <ul className="formulario-tareas" >
            <input
                type="texto"
                className="formulario-tareas__input"
                placeholder="Ingresa tu tarea"
                value={inputValor}
                onChange={(e) => setInputValor(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {toDoList.map((a, index) => <li key={index}>{a}</li>)}

        </ul>

    );
}


export default FormularioTareas;