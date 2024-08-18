
import React, { useEffect, useState } from "react";


const FormularioTareas = () => {
    //Esta constante sirve para forzar el renderizado y que se actualice el HTML con el valor que se va modificando
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

    const Modificar = (value, id) => {

        toDoList[id] = value;

        forceUpdate();
    }

    const [inputValor, setInputValor] = useState('');
    const [actualizar, setActualizar] = useState(true);
    const [toDoList, setToDoList] = useState([]);




    const obtenerUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre")
            .then((respuesta) => {
                console.log(respuesta);
                if (respuesta.ok === false) {
                    crearUsuario()
                } else {
                    return respuesta.json()
                }
            })
            .then((data) => {
                console.log(data);
                setToDoList(data.todos)

            })
            .catch((error) => {
                console.log("Solicitud fallida", error);

            })
    }


    const crearUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre", {
            method: "POST"
        })
            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.json()
            })
            .then((data) => {
                obtenerUsuario()
            })
            .catch((error) => {
                console.log("Petición fallida", error);
            })
    }


    const agregarTarea = () => {
        fetch("https://playground.4geeks.com/todo/todos/alejandraAguirre", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    "label": inputValor,
                    "is_done": false
                })
        })
            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.json()
            })
            .then((data) => {
                obtenerUsuario()
                setInputValor("")
            })
            .catch((error) => {
                console.log("No se encontraron tareas", error);

            })
    }

   

    const eliminarTarea = (id) => { ///id lo paso de manera dinamica para q lo busque lo edite. 
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })

            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.text() //string 
            })
            .then((data) => {
                obtenerUsuario()


            })
            .catch((error) => {
                console.log("No se encontraron tareas", error);
            })
    }



    const actualizarTareaApi = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    "label": toDoList,
                    "is_done": false
                }
            ),
        })
            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.text() //string 
            })
            .then((data) => {
                actualizar(data.id, data.label)
            })
            .catch((error) => {
                console.log("No se encontraron tareas", error);
            })
    }

    const borrarTodasTareas = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })

            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.text() //string 
            })
            .then((data) => {
                obtenerUsuario()


            })
            .catch((error) => {
                console.log("No se encontraron tareas", error);
            })
    }


    useEffect(() => {

        obtenerUsuario();

    }, [])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {

            if (inputValor.trim().length > 0) {
                toDoList.push(inputValor);

            }
            else {
                alert('Introduzca una tarea correcta')
            }

            agregarTarea() 


        }
    }
    return (
        <div >
            <ul className="formulario-tareas"  >
                <input
                    type="texto"
                    className="formulario-tareas__input"
                    placeholder="Ingresa tu tarea"
                    value={inputValor}
                    onChange={(e) => setInputValor(e.target.value)}
                    onKeyDown={handleKeyPress}

                />

                {toDoList.map((tarea, id) =>
                    <div className=" tareas-creadas" key={tarea.id}>
                        <input
                            className="inputModificar"
                            type="texto"
                            placeholder={toDoList[tarea]}
                            value={tarea.label}

                            onChange={(e) => Modificar(e.target.value, id)}
                            disabled={actualizar} />

                        <div className="iconos"  >
                            <button className="boton" type="submit" disabled={actualizar} onClick={() => setActualizar(true)}>Actualizar</button>
                            <i className=" fa fa-solid fa-pen" onClick={() => setActualizar(false)}></i>
                            <i className="fa fa-solid fa-trash"
                                //onClick={() => setToDoList(toDoList.filter(tarea => tarea != tarea.id))}  esto serìa para el antiguo ejercicio, ahora tengo q borrar con el id de cada tarea. 
                                onClick={() => eliminarTarea(tarea.id)}>
                            </i>

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
            <button className="boton-borrar_todo" onClick={() => toDoList.map(tarea => borrarTodasTareas(tarea.id))}>Borra todas las tareas</button>
        </div >

    );
}


export default FormularioTareas;