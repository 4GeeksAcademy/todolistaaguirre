
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
    

    //CREO LAS 4 FUNCIONES PARA USAR FETCH: 
    //uso la función para crear el usuario con url de la api.

    const obtenerUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre")
            .then((respuesta) => {
                console.log(respuesta);
                if (respuesta.ok === false) { //Le pongo la condición para validar si dicho usuario existe, sino va a funcion crear. 
                    crearUsuario()
                } else { //en caso de si encontrar el usario, lo convierte en json. 
                    return respuesta.json()
                }
            })
            .then((data) => {
                console.log(data);
                setToDoList(data.todos)//todos dentro de data es el arreglo y lo quiero guardar en la lista q había creado. 

            })
            .catch((error) => { //lo uso para capturar los errores 
                console.log("Solicitud fallida", error);

            })
    }


    //función para crear el usuario en caso de que se borre de la API dsps de las 24h
    const crearUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/alejandraAguirre", {
            method: "POST"
        })//lo unico requerido para crear un usuario nuevo segun api es USER_NAME
            .then((respuesta) => {
                console.log(respuesta);
                return respuesta.json()
            }) //ya cuando tengo mi usuario creado, accedo de nuevo a obtener usuario. 
            .then((data) => {
                obtenerUsuario()
            })
            .catch((error) => {
                console.log("Petición fallida", error);

            })
    }

    //función para agregar la tarea a la api 
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

    //función para eliminar las tareas que tengo ya guardadas en la api 

    const eliminarTarea = (id) => { ///id lo paso de manera dinamica para q lo busque lo edite. 
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
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

            //  setActualizar(true); antes se encargaba de agregar la nueva tarea a la lista
            //setInputValor("") lo tengo ya añadido en la función agregar tarea a la api. 
            agregarTarea() //ahora lo sustituyo porque la tarea vendra de fuera, se guarda en la api
           

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

                {toDoList.map((tarea) =>
                    <div className=" tareas-creadas" key={tarea}>
                        <input
                            className="inputModificar"
                            type="texto"
                            placeholder={toDoList[tarea]}
                            value={tarea.label}
                            key={tarea.id}
                            onChange={(e) => Modificar(e.target.value, index)}
                            disabled={actualizar} />

                        <div className="iconos"  >
                            <button className="boton" type="submit" disabled={actualizar} onClick={() => setActualizar(true)}>Actualizar</button>
                            <i className=" fa fa-solid fa-pen" onClick={() => setActualizar(false)}></i>
                            <i className="fa fa-solid fa-trash" 
                                //onClick={() => setToDoList(toDoList.filter(tarea => tarea != tarea.id))}  esto serìa para el antiguo ejercicio, ahora tengo q borrar con el id de cada tarea. 
                                onClick={()=>eliminarTarea(tarea.id)}> 
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

        </div >

    );
}


export default FormularioTareas;