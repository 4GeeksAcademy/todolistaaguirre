import React, { useState } from "react";
import Encabezado from "./encabezado";
import FormularioTareas from "./formularioTareas";





//create your first component
const Home = () => {

	return (
		<div className="contenedor">
			<Encabezado />
			<FormularioTareas />

		</div>
	);
};

export default Home;
