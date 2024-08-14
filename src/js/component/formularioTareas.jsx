import React, { useState } from "react";


const FormularioTareas = () => {
    //Esta constante sirve para forzar el renderizado y que se actualice el HTML con el valor que se va modificando
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

    const Modificar = (value, index) => {

        toDoList[index] = value;

        forceUpdate();

    }


    const [inputValor, setInputValor] = useState('');
    const [actualizar, setActualizar] = useState(true);
    const [toDoList, setToDoList] = useState([]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {

            if (inputValor.trim().length > 0) {
                toDoList.push(inputValor);
            }
            else {
                alert('Introduzca una tarea correcta')
            }
            setInputValor("");
            setActualizar(true); 
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
                    <div className=" tareas-creadas">
                        <input
                            className="inputModificar"
                            type="texto"
                            placeholder={toDoList[index]}
                            value={a}
                            key={index}
                            onChange={(e) => Modificar(e.target.value, index)}
                            disabled={actualizar} />

                        <div className="iconos">
                            <button className="boton" type="submit" disabled={actualizar} onClick={() => setActualizar(true)}>Actualizar</button>
                            <i className=" fa fa-solid fa-pen" onClick={() => setActualizar(false)}></i>
                            <i className="fa fa-solid fa-trash"
                                onClick={() => setToDoList(toDoList.filter((u, uIndex) => index != uIndex))} > </i>

                        </div>
                    </div>
                )}

            </ul>
            {
                toDoList.length == 1 && <div className="valores-tarea">Tienes {toDoList.length} tarea</div>
            }
            {
                toDoList.length != 1 && <div className="valores-tarea">Tienes {toDoList.length} tareas</div>
            }

        </div >

    );
}


export default FormularioTareas;