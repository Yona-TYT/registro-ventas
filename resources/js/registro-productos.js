function guardar_rp(){
	var nombre = document.getElementById("inputrp10");
	var cantidad = document.getElementById("inputrp11");
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");

	var margen_mask = document.getElementById("text_maskrp12");
	var precio_mask = document.getElementById("text_maskrp13");

	//console.log(gl_products.list_prd.nombre[table_fila]);
	if(nombre.value != "" && precio.value != ""){
		gl_products.list_prd.nombre.push(nombre.value);
		gl_products.list_prd.cantidad.push(cantidad.value);
		gl_products.list_prd.margen.push(margen.value);
		gl_products.list_prd.precio.push(precio.value);

		gl_products.list_prd.listatamaño++;
		table_fila = gl_products.list_prd.listatamaño;

		gl_products.clave = gl_currt_list_selec;
		crear_datalist(gl_products.list_prd.nombre, "listproducts");
		agregar_producto(gl_products);		//Guarda los valores de productos

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
}
