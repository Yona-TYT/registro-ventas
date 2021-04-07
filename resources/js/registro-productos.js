function guardar_rp(){
	var nombre = document.getElementById("inputrp10");
	var cantidad = document.getElementById("inputrp11");
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");

	console.log(gl_list[gl_selc].nombre[table_fila]);
	if(nombre.value != "" && precio.value != ""){
		gl_list[gl_selc].nombre[table_fila] = nombre.value;
		gl_list[gl_selc].cantidad[table_fila] = cantidad.value;
		gl_list[gl_selc].margen[table_fila] = margen.value;
		gl_list[gl_selc].precio[table_fila] = precio.value;

		gl_list[gl_selc].listatamaño++;
		table_fila = gl_list[gl_selc].listatamaño;
		start_one = true;
		agregarobjeto(gl_list[gl_selc], gl_selc, 1);//1 es para lectura y escritra

		nombre.value = "";
		cantidad.value = "";
		margen.value = "";
		precio.value = "";
	}
	else alert("Nombre y Precio no deben estar vacios.");
}

function get_celda_value_rp(){
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");

	var margen_mask = document.getElementById("text_maskrp12");
	var precio_mask = document.getElementById("text_maskrp13");

	margen_mask.value = get_mask_simple(margen.value,"%");
	precio_mask.value = get_mask(precio.value,"$");
}
