import { stringify } from "query-string";
import React, { useEffect, useState } from "react";


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

    //uso la función para crear el usuario con url de la api. 
    const obtenerTareas = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre")
            .then((resultado) => {
                console.log(resultado);
                if (resultado.ok === false) {
                    crearUsuario()
                } else {
                    return resultado.json()
                }
            })
            .then((data) => {
                console.log(data);
                setToDoList(data.todos)
            })
            .catch(() => {

            })
    }

    //función creada para crear el usuario en caso de que no lo este o se borrara de la api dsps de las 24h (se recetea)
    const crearUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre", { method: "POST" })
            .then((resultado) => {
                console.log(resultado);
                return resultado.json()
            })
            .then((data) => {
                obtenerTareas(data.tarea)

            })
    }
    //añado una funcion para agregar las tareas a mi api 
    const agregarTarea = (tarea) => {
        fetch("https://playground.4geeks.com/todo/todos/alejandraAguirre", { method: 'POST',
            headers: {"content-Type": "application/json" },
            body: JSON/stringify({
                 label: inputValor,
                 is_done: false
            })
         })
        .then((resultado) => {
            console.log(resultado);
            return resultado.json()
        })
        .then((data) => {
            
            obtenerTareas()
            inputValor("")
            
        })
        .catch(()=>{

        })
    }


        


        useEffect(() => {
            obtenerTareas();
        }, [])

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {

                if (inputValor.trim().length > 0) {
                    toDoList.push(inputValor);
                }
                else {
                    alert('Introduzca una tarea correcta')
                }

                setActualizar(true);
               

                //aqui agrego la nueva funcion para q se guarde en la api
                
                agregarTarea(tarea)
                obtenerTareas(tarea)
                
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

                    {toDoList.map((tarea, index) =>
                        <div className=" tareas-creadas">
                            <input
                                className="inputModificar"
                                type="texto"
                                placeholder={toDoList[index]}
                                value={tarea.label}
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