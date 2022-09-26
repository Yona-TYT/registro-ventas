//Datos de los productos

function guardar_rp(){
	var nombre = document.getElementById("inputrp10");
	var cantidad = document.getElementById("inputrp11");
	var margen = document.getElementById("inputrp12");
	var precio = document.getElementById("inputrp13");
	var salida = document.getElementById("inputrp14");

	var margen_mask = document.getElementById("text_maskrp12");
	var precio_mask = document.getElementById("text_maskrp13");

	//console.log(gl_curr_prod.nombre[table_fila]);
	if(nombre.value != "" && precio.value != ""){
		var product = new reg_curr_prod();
		var curr_prod = new r_product();
		product.active = true;
		product.nombre = nombre.value;
		product.cantidad = parseFloat(cantidad.value)? parseFloat(cantidad.value):0;
		product.margen = margen.value;
		product.precio = precio.value;

		curr_prod.clave = gl_currt_list_selec;

		agregar_producto(product);		//Guarda los valores de productos
		curr_prod.products = product;
		gl_products.push(curr_prod);


		//crea las listas de productos -------------------------------
		crear_lista_productos();
		//------------------------------------------------------------

		nombre.value = "";
		cantidad.value = "";
		margen.value = "";
		precio.value = "";
		salida.value = "";

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
