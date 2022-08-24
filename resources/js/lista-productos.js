
function lista_produc_main() {

	//Comprueba y activa/desactiva el modo editor
	check_edit_mode();
	activadesactiva_editmode();
	//-------------------------------------------

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
	//console.log("tes selc: aquiiii ")
	var input_edit = document.getElementById("edit_mode");
	edit_mode = input_edit.checked;

	//table.remove();
	var select_name = document.getElementById("selectlistaname");
	var input_name = document.getElementById("inputlistaname");
	if(edit_mode){

		input_name.setAttribute("class","mask_style");
		input_name.removeAttribute("readonly");
		//select_name.setAttribute("class","element_style_hidden");
	}
	else{
		input_name.setAttribute("readonly", "");
		input_name.setAttribute("class","element_style_disable");
	}

	create_table(table_fila,table_col);

	if(gl_current_selec != null){
		button_selec_product(gl_current_selec);
	}
	//contador = setInterval(cambio_valor, 1000);
	load_general_data();
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
	var max = gl_products.list_prd.nombre.length;
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
	var r_nombre = gl_products.list_prd.nombre[index]?gl_products.list_prd.nombre[index]:"";
	var r_cantidad = gl_products.list_prd.cantidad[index]?gl_products.list_prd.cantidad[index]:0;
	var r_margen = gl_products.list_prd.margen[index]?gl_products.list_prd.margen[index]:0;
	var r_precio = gl_products.list_prd.precio[index]?gl_products.list_prd.precio[index]:0;

	r_nombre = r_nombre?r_nombre.toLowerCase():"";

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

	var r_nombre = gl_products.list_prd.nombre[index]?gl_products.list_prd.nombre[index]:"";
	var r_cantidad = gl_products.list_prd.cantidad[index]?gl_products.list_prd.cantidad[index]:0;
	var r_margen = gl_products.list_prd.margen[index]?gl_products.list_prd.margen[index]:0;
	var r_precio = gl_products.list_prd.precio[index]?gl_products.list_prd.precio[index]:0;

	var nombre = document.getElementById("input10");
	var cantidad = document.getElementById("input20");
	var margen = document.getElementById("input11");
	var precio = document.getElementById("input21");
	var pdol = document.getElementById("input12");
	var pbsf = document.getElementById("input22");

	var margen_mask = document.getElementById("text_mask11");
	var precio_mask = document.getElementById("text_mask21");

	nombre.value = r_nombre.toLowerCase();
	cantidad.value = r_cantidad;
	margen.value = r_margen;
	margen_mask.value = get_mask_simple(r_margen,"%");
	precio.value = r_precio;
	precio_mask.value = get_mask(r_precio,gl_mon_b);

	get_celda_value_test();
}

function buscar_lista(text) {
	var result = true;
	var max = gl_products.list_prd.nombre.length;
	//console.log("Finished: "+max);
	for (var j = 0; j < max; j++) {
		var div = document.getElementById("divlp"+j);
		//Obtine todas las columnas de nombres
		var r_nombre = gl_products.list_prd.nombre[j]?gl_products.list_prd.nombre[j]:"";
		var tx = r_nombre.toLowerCase();
		result = tx.includes(text.toLowerCase());
		//console.log("a:"+tx+"b:"+text.toLowerCase());
		if(!result){
			div.setAttribute("class","element_style_hidden");
		}
		else{
			div.setAttribute("class","div_list_style");
		}
		//gloval_test += "result:"+result+ " ";
	}
}

function load_general_data() {

	//Precio de dolar en Bs
	var celd_bolivares = document.getElementById("input_dolar");
	var celd_bolivares_mask = document.getElementById("text_mask_dolar");
	celd_bolivares.value = gl_general.gen_bs;
	celd_bolivares_mask.value = get_mask(gl_general.gen_bs,gl_mon_a);



	//Margen de ganancias
	var celd_margen = document.getElementById("input04");
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

	get_celda_value_test();
	buscar_lista_rv("buscar_rv");
}

function get_celda_value_test(){

	if(gl_current_selec != null){
		var nombre = document.getElementById("input10");
		var cantidad = document.getElementById("input20");
		var margen = document.getElementById("input11");
		var precio = document.getElementById("input21");
		var pdol = document.getElementById("input12");
		var pbsf = document.getElementById("input22");

		var margen_mask = document.getElementById("text_mask11");
		var precio_mask = document.getElementById("text_mask21");

		var unimargen = margen.value;
		var celd_precio = precio.value;

		margen_mask.value = get_mask_simple(unimargen,"%");
		precio_mask.value = get_mask(celd_precio,gl_mon_b);

		var gen_margen = document.getElementById("input04").value;

		var dolar = calc_dolarporunidad(gen_margen, unimargen, celd_precio).toFixed(2);
		pdol.value = get_mask(dolar,gl_mon_b);

		var gen_bsf = document.getElementById("input02").value;
		var calc = calc_bolivarprecio(gen_bsf, dolar).toFixed(2);

		pbsf.value = get_mask(calc,gl_mon_a);

		var sect_div = document.getElementById("divlp"+gl_current_selec);
		var values_tx = nombre.value+" Cantidad ("+cantidad.value+") Margen c/u ("+margen_mask.value+") Entrada c/u ("+precio_mask.value+")";
		sect_div.innerHTML = "<button type='button' class='butt_style' onclick='button_selec_product("+gl_current_selec+");'>Seleccionar</button> "+values_tx;

		gl_products.list_prd.nombre[gl_current_selec] = nombre.value;
		gl_products.list_prd.cantidad[gl_current_selec] = cantidad.value;
		gl_products.list_prd.margen[gl_current_selec] = margen.value;
		gl_products.list_prd.precio[gl_current_selec] = precio.value;

		gl_products.clave = gl_currt_list_selec;
		crear_datalist(gl_products.list_prd.nombre, "listproducts");
		agregar_producto(gl_products);		//Guarda los valores de productos

	}
	//enviar_index();
}

function remove_product(){
	if(gl_current_selec != null){
		
		var check = document.getElementById("listp_check");
		if(check.checked){
			gl_products.list_prd.nombre.splice(gl_current_selec, 1);
			gl_products.list_prd.cantidad.splice(gl_current_selec, 1);
			gl_products.list_prd.margen.splice(gl_current_selec, 1);
			gl_products.list_prd.precio.splice(gl_current_selec, 1);
			gl_products.list_prd.listatamaño--;
			table_fila = gl_products.list_prd.listatamaño;


			gl_products.clave = gl_currt_list_selec;
			crear_datalist(gl_products.list_prd.nombre, "listproducts");
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
