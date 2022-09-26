
function lista_produc_main() {

	//Comprueba y activa/desactiva el modo editor
	//check_edit_mode();
	activadesactiva_editmode();
	//-------------------------------------------

	//Buscador para la lista de productos
	var input_buscar = document.getElementById("buscar");
	input_buscar.addEventListener("input", function(){buscar_lista(input_buscar.value);});

	selec_to_input();

}

//Actualiza el nombre de lista con el valor del input
function input_to_selec() {
	var input = document.getElementById("inputlistaname");
	gl_general.list_nam[gl_currt_list_selec] = input.value;
	preloder_filtro_lista();
	agregar_gene_datos(gl_general);			//Guarda los datos generales
}

//Actualiza el input de lista con el nombre de lista
function selec_to_input() {
	//console.log("Finished name: "+ gl_general.list_nam[gl_currt_list_selec]);
	var input = document.getElementById("inputlistaname");
	input.value = gl_general.list_nam[gl_currt_list_selec];
}

function check_edit_mode(){
	var input_edit = document.getElementById("edit_mode");
	edit_mode = input_edit.checked;
	input_edit.addEventListener("change", function(){

		reset_inputs_rv();
		activadesactiva_editmode()

	});
}

function activadesactiva_editmode(){
	return null;
	/*
	//console.log("tes selc: aquiiii ")
	var input_edit = document.getElementById("edit_mode");
	var id_list = ["listp_check", "inputlistaname", "text_mask04", "inputlp10",
				 "inputlp11", "text_masklp12", "text_masklp13", "inputlp14"];
	var butt = document.getElementById("buttlp15");
	edit_mode = input_edit.checked;
	if(edit_mode){
		butt.removeAttribute("disabled");
		butt.setAttribute("class", "mask_style");
		
		for (var j = 0; j < id_list.length; j++) {
			var id = id_list[j];
			var input = document.getElementById(id);
			input.setAttribute("class","mask_style");
			(j==7)?"":input.removeAttribute("readonly");
			input.removeAttribute("disabled");
		}
	}
	else{
		butt.setAttribute("disabled", "");
		butt.setAttribute("class", "button_style_disable");

		for (var j = 0; j < id_list.length; j++) {
			var input = document.getElementById(id_list[j]);
			input.setAttribute("readonly", "");
			input.setAttribute("class","element_style_disable");
			input.setAttribute("disabled", "");
		}
	}
	if(gl_current_selec != null){
		button_selec_product(gl_current_selec);
	}
	//contador = setInterval(cambio_valor, 1000);
	load_general_data();
	*/
}

function load_edit_input(j,i){
	var multiplo = (j*table_col);
	var input_id = j+""+i;

	var input = document.getElementById("input"+input_id);
	var tex_mask = document.getElementById("text_mask"+input_id);

	input.setAttribute(edit_mode?"readwrite":"readonly", "");
	tex_mask.setAttribute("readonly", "");
	tex_mask.setAttribute("class", edit_mode?"input_style_edicion_td":"mask_style");
	input.setAttribute("class", "element_style_hidden");

	//Cuadros de MArgen  ganancia y Precio del dolar----------------------------------------------
	tex_mask.setAttribute("onClick", edit_mode?"mostrar_input();":"");
	tex_mask.setAttribute("onSelect", edit_mode?"mostrar_input();":"");
	input.setAttribute("onFocus", edit_mode?"ocultar_input();":"");
}

function crear_lista_productos() {
	var sect_lista = document.getElementById("listageneral");
	var data_lista = document.getElementById("listproducts");
	sect_lista.innerHTML = "";
	data_lista.innerHTML = "";
	var lista_tx = "";
	var data_tx = "";
	var max = gl_products.length;
	//console.log("Finished: "+max);
	for (var j = 0; j < max; j++) {
		lista_tx += add_text_fila(j,1);
		data_tx += add_text_fila(j,2);
	}
	// agregamos la hilera a la seccion de lista
	sect_lista.innerHTML = lista_tx;
	data_lista.innerHTML = data_tx;
}

function add_text_fila(index,opt){
	//console.log("tes selc"+gl_currt_list_selec)
	var r_nombre = gl_products[index].products.nombre?gl_products[index].products.nombre:"";
	var r_cantidad = gl_products[index].products.cantidad?gl_products[index].products.cantidad:0;
	var r_margen = gl_products[index].products.margen?gl_products[index].products.margen:0;
	var r_precio = gl_products[index].products.precio?gl_products[index].products.precio:0;

	//console.log(r_nombre)
	r_nombre = r_nombre ?r_nombre.toLowerCase():"";

	var values_tx = r_nombre+" Cantidad ("+r_cantidad+") Margen c/u ("+get_mask_simple(r_margen,"%")+") Entrada c/u ("+get_mask(r_precio,gl_mon_b)+")";
	if(opt==1){
		return "<div class='div_list_style' id='divlp"+index+"'><button type='button' class='butt_style' onclick='button_selec_product("+index+");'>Seleccionar</button> "+values_tx+"</div>";
	}
	if(opt==2){
		return "<option id='optlist"+index+"' value='"+r_nombre+"'>";
	}
}

function button_selec_product(index){
	gl_current_selec = index;

	var r_nombre = gl_products[index].products.nombre?gl_products[index].products.nombre:"";
	var r_cantidad = gl_products[index].products.cantidad?gl_products[index].products.cantidad:0;
	var r_margen = gl_products[index].products.margen?gl_products[index].products.margen:0;
	var r_precio = gl_products[index].products.precio?gl_products[index].products.precio:0;

	var nombre = document.getElementById("inputlp10");
	var cantidad = document.getElementById("inputlp11");
	var margen = document.getElementById("inputlp12");
	var precio = document.getElementById("inputlp13");
	var pdol = document.getElementById("inputlp14");
	var pbsf = document.getElementById("inputlp14");

	var margen_mask = document.getElementById("text_masklp12");
	var precio_mask = document.getElementById("text_masklp13");

	nombre.value = r_nombre.toLowerCase();
	cantidad.value = r_cantidad;
	margen.value = r_margen;
	margen_mask.value = get_mask_simple(r_margen,"%");
	precio.value = r_precio;
	precio_mask.value = get_mask(r_precio,gl_mon_b);

	//Se actualizan los inputs de solo lectura
	update_input_lectura();
}

function buscar_lista(text) {
	var result = true;
	var max = gl_products.length;
	//console.log("Finished: "+max);
	for (var j = 0; j < max; j++) {
		var div = document.getElementById("divlp"+j);
		//Obtine todas las columnas de nombres
		var nombre = gl_products[j].products.nombre?gl_products[j].products.nombre:"";

		if (nombre!=null) nombre = nombre.toLowerCase();
		else continue;



		var tx = nombre;
		result = tx.includes(text.toLowerCase());
		//console.log("a:"+tx+"b:"+text.toLowerCase());
		if(!result){
			div.setAttribute("class","element_style_hidden");
		}
		else{
			//Deselecciona el elemento para ocultar teclado en android
			const regex_a = /[^\w\.@-]/ig;		//Exp Regula, Elimina Caracteres especiales
			text = text.replaceAll(regex_a, '')
			//console.log("Text: "+text)
			var regex_b = new RegExp("(^)" + text + "($)");
			var test = nombre.search(regex_b);
			//console.log("Test: "+test)
			if( test != -1 && text.length>1){
				el_unselec();
			}
			div.setAttribute("class","div_list_style");
		}
	}
}

function load_general_data() {
	//Precio de dolar en Bs
	var celd_bolivares = document.getElementById("input_dolar");
	celd_bolivares.setAttribute("onblur",'ocultar_input(\''+true+'\');');

	var celd_bolivares_mask = document.getElementById("text_mask_dolar");
	celd_bolivares.value = gl_general.gen_bs;
	celd_bolivares_mask.value = get_mask(gl_general.gen_bs,gl_mon_a);

	//Margen de ganancias
	var celd_margen = document.getElementById("input04");
	celd_margen.setAttribute("onblur",'ocultar_input(\''+true+'\');');

	var celd_margen_mask = document.getElementById("text_mask04");
	celd_margen.value = gl_general.gen_margen;
	celd_margen_mask.value = get_mask_simple(gl_general.gen_margen,"%");
}

function update_celdas_generales(){

	//Precio de dolar en Bs
	var celd_bolivares = document.getElementById("input_dolar");
	var celd_bolivares_mask = document.getElementById("text_mask_dolar");
	var gen_bsf = celd_bolivares.value;
	celd_bolivares_mask.value = get_mask(gen_bsf,gl_mon_a);

	//Margen de ganancias
	var celd_margen = document.getElementById("input04");
	var celd_margen_mask = document.getElementById("text_mask04");
	var gen_margen = celd_margen.value;
	celd_margen_mask.value = get_mask_simple(gen_margen,"%");

	//Guarda los datos generales
	gl_general.gen_bs = gen_bsf;
	gl_general.gen_margen = gen_margen;
	agregar_gene_datos(gl_general);		

	//Actualiza valores del redistro de productos
	get_celda_value_rp();

	update_product_cu();
	buscar_lista_rv("buscar_rv", false);
}

function update_product_cu(){

	if(gl_current_selec != null){
		var nombre = document.getElementById("inputlp10");
		var cantidad = document.getElementById("inputlp11");
		var margen = document.getElementById("inputlp12");
		var precio = document.getElementById("inputlp13");
		var margen_mask = document.getElementById("text_masklp12");
		var precio_mask = document.getElementById("text_masklp13");

		//Se obtienen los valores de cada uno
		var unimargen = margen.value;
		var celd_precio = precio.value;

		//Muestra la mask para los inputs
		margen_mask.value = get_mask_simple(unimargen,"%");
		precio_mask.value = get_mask(celd_precio,gl_mon_b);

		//Actualiza los valores de la lista
		var sect_div = document.getElementById("divlp"+gl_current_selec);
		var values_tx = nombre.value+" Cantidad ("+cantidad.value+") Margen c/u ("+margen_mask.value+") Entrada c/u ("+precio_mask.value+")";
		sect_div.innerHTML = "<button type='button' class='butt_style' onclick='button_selec_product("+gl_current_selec+");'>Seleccionar</button> "+values_tx;



		//Se actualizan las variable globales de los productos
		gl_products[gl_current_selec].products.nombre = nombre.value;
		gl_products[gl_current_selec].products.cantidad = cantidad.value;
		gl_products[gl_current_selec].products.margen = margen.value;
		gl_products[gl_current_selec].products.precio = precio.value;


		var product = new reg_curr_prod();
		var curr_prod = new r_product();

		product.active = true;
		product.nombre = nombre.value;
		product.cantidad = parseFloat(cantidad.value)? parseFloat(cantidad.value):0;
		product.margen = parseFloat(margen.value)? parseFloat(margen.value):0;
		product.precio = parseFloat(precio.value)? parseFloat(precio.value):0;

		curr_prod.id = gl_current_selec;
		curr_prod.products = product;
		agregar_all_producto(curr_prod);

		//Se actualizan los inputs de solo lectura
		update_input_lectura();

		crear_datalist(gl_products, "listproducts");

		console.log(gl_products[gl_current_selec]);


	}
}

function update_input_lectura(){
		var input = document.getElementById("inputlp14");

		//Se otienen los valores generles
		var gen_margen = gl_general.gen_margen;
		var gen_bsf = gl_general.gen_bs;

		//Se obtienen los valores de cada uno
		var unimargen = gl_products[gl_current_selec].products.margen;
		var celd_precio = gl_products[gl_current_selec].products.precio;

		//Se calculan los precios
		var dolar = calc_dolarporunidad(gen_margen, unimargen, celd_precio).toFixed(2);
		var calc = calc_bolivarprecio(gen_bsf, dolar).toFixed(2);

		//Valores de inputs solo lectura
		input.value = ""+get_mask(dolar,gl_mon_b)+" / "+get_mask(calc,gl_mon_a);
}

function remove_product(){
	if(gl_current_selec != null){
		
		var check = document.getElementById("listp_check");
		if(check.checked){
			gl_products.nombre.splice(gl_current_selec, 1);
			gl_products.cantidad.splice(gl_current_selec, 1);
			gl_products.margen.splice(gl_current_selec, 1);
			gl_products.precio.splice(gl_current_selec, 1);
			gl_products.listatamaño--;
			table_fila = gl_products.listatamaño;


			gl_products.clave = gl_currt_list_selec;
			crear_datalist(gl_products.nombre, "listproducts");
			agregar_producto(gl_products);
			crear_lista_productos();

			gl_current_selec = null;
			create_table(table_fila,table_col);
			var input_buscar = document.getElementById("buscar");
			buscar_lista(input_buscar.value);
		}
		else return alert("Primero Marque la casilla para confirmar!.");
	}
}
