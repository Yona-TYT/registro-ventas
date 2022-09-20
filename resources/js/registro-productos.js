function guardar_rp(){
	var nombre = document.getElementById("inputrp10");
	var cantidad = document.getElementById("inputrp11");
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");

	var margen_mask = document.getElementById("text_maskrp12");
	var precio_mask = document.getElementById("text_maskrp13");

	//console.log(gl_products.nombre[table_fila]);
	if(nombre.value != "" && precio.value != ""){
		gl_products.nombre.push(nombre.value);
		gl_products.cantidad.push(cantidad.value);
		gl_products.margen.push(margen.value);
		gl_products.precio.push(precio.value);

		table_fila = gl_products.listatamaño;

		gl_products.clave = gl_currt_list_selec;

		agregar_producto(gl_products);		//Guarda los valores de productos

		//crea las listas de productos -------------------------------
		crear_datalist(gl_products.nombre, "listproducts");
		crear_lista_productos();
		//------------------------------------------------------------

		nombre.value = "";
		cantidad.value = "";
		margen.value = "";
		precio.value = "";

		margen_mask.value = get_mask_simple(0, "%");
		precio_mask.value = get_mask(0, gl_mon_b);
	}
	else alert("Nombre y Precio no deben estar vacios.");
}

function get_celda_value_rp(){
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");

	var margen_mask = document.getElementById("text_maskrp12");
	var precio_mask = document.getElementById("text_maskrp13");

	margen_mask.value = get_mask_simple(margen.value,"%");
	precio_mask.value = get_mask(precio.value,gl_mon_b);

	//Muestra los valores de precios de salida ---------------------------------------
	var salida = document.getElementById("inputrp14");

	//Se otienen los valores generles
	var gen_margen = gl_general.gen_margen;
	var gen_bsf = gl_general.gen_bs;

	//Se calculan los precios
	var dolar = calc_dolarporunidad(gen_margen, margen.value, precio.value).toFixed(2);
	var calc = calc_bolivarprecio(gen_bsf, dolar).toFixed(2);

	//Valores de inputs solo lectura
	salida.value = ""+get_mask(dolar,gl_mon_b)+" / "+get_mask(calc,gl_mon_a);
	//---------------------------------------------------------------------------------

}

function update_input_lectura_rp(){
		
}
