import React, {useState} from "react";
import Encabezado from "./encabezado";
import FormularioTareas from "./formularioTareas";





//create your first component
const Home = () => {
	const [tarea, cambiarTarea]= useState(
		[
			{
				id: 1,
				texto: 'Sacar perro',
				completada: false,

			}
		]
	)
	return (
		<div className="contenedor">
			<Encabezado/>
			<FormularioTareas tarea={tarea} cambiarTarea={cambiarTarea}/>
		
		</div>
	);
};

export default Home;
