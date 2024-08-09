import React, { useState } from "react";

const FormularioTareas = () => {

    const [inputValor, setInputValor] = useState('');

    const [actualizarTarea, setActualizarTarea] = useState(true);
    const [toDoList, setToDoList] = useState([]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (inputValor.trim().length > 0) {
                toDoList.push(inputValor);
                setToDoList(toDoList);
            }
            else {
                alert('Introduzca una tarea correcta')
            }
            setInputValor("");
        }



    }
    return (
        <div>
            <ul className="formulario-tareas" >
                <input
                    type="texto"
                    className="formulario-tareas__input"
                    placeholder="Ingresa tu tarea"
                    value={inputValor}
                    onChange={(e) => setInputValor(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                {toDoList.map((a, index) =>
                    <li className="tareas-creadas" key={index}>{a}
                        <i className="fa fa-solid fa-trash"
                            onClick={() => setToDoList(toDoList.filter((u, uIndex) => index != uIndex))} > </i>
                    </li>)}

            </ul>
            {
                toDoList.length == 1 && <div className="valores-tarea">Tienes {toDoList.length} tarea</div>
            }
            {
                toDoList.length != 1 && <div className="valores-tarea">Tienes {toDoList.length} tareas</div>
            }

        </div>

    );
}


export default FormularioTareas;