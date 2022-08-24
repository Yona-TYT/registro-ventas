
function menu_main(){
	var select = document.getElementById("selectlistaname");
	var opt = select.options[select.selectedIndex];
	var input2 = document.getElementById("inputlistaname");

	if(edit_mode){
		input2.setAttribute("class","mask_style");
		select.setAttribute("class","element_style_hidden");
	}

	reset_inputs_rv();
	document.getElementById("rv_totaldol").value = 0.00+" $";
	document.getElementById("rv_totalbsf").value = 0.00+" BsF";

	var select1 = document.getElementById("selcregvent");
}

function mostrar_lista_menu(){
	var lista = document.getElementById("menulist");
	var class_name = lista.className;
	if(class_name == "element_style_hidden")
		lista.setAttribute("class","");
	else
		lista.setAttribute("class","element_style_hidden");
}

function visible_element(opt) {
	var lista = document.getElementById("menulist");
	lista.setAttribute("class","element_style_hidden");

	//Cambia el titulo del al menu seleccionado
	var title = document.getElementById("div_title");
	var menu_opt = document.getElementById("menuopt"+opt);
	title.innerHTML = menu_opt.innerHTML;

	for(var j = 1; j<6;j++){
		var bot_temp = document.getElementById("butopt"+j);
		bot_temp.setAttribute("class","butt_menu_style");
		
	}

	var bott = document.getElementById("butopt"+opt);
	if(bott)
		bott.setAttribute("class","butt_selec_style");


	var table_regvent = document.getElementById("seccion1");
	var table_regpro = document.getElementById("seccion2");
	var historial = document.getElementById("seccion3");
	var table_list = document.getElementById("tablproductos");
	var table_panel = document.getElementById("seccion4");
	var table = document.getElementById("tableprev0");
	var import_data = document.getElementById("seccion5");


	//Registro de Ventas
	if(opt==1) {
		table_list.setAttribute("class","element_style_hidden");
		table_panel.setAttribute("class","element_style_hidden");
		import_data.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","label_style");

	}
	//Registro de Productos
	if(opt==2) {
		table_list.setAttribute("class","element_style_hidden");
		table_panel.setAttribute("class","element_style_hidden");
		import_data.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","label_style");
	}
	//Historial de Ventas
	if(opt==3) {
		table_list.setAttribute("class","element_style_hidden");
		table_panel.setAttribute("class","element_style_hidden");
		import_data.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","label_style");

	}
	//Lista general de productos
	if(opt==4) {
		table_list.setAttribute("class","fila_style");
		table_panel.setAttribute("class","label_style");
		import_data.setAttribute("class","element_style_hidden");
		table.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");

	}
	//Importar datos
	if(opt==5) {
		table_list.setAttribute("class","element_style_hidden");
		table_panel.setAttribute("class","element_style_hidden");
		table_regvent.setAttribute("class","element_style_hidden");
		historial.setAttribute("class","element_style_hidden");
		table_regpro.setAttribute("class","element_style_hidden");
		import_data.setAttribute("class","label_style");
		table.setAttribute("class","label_style");
	}
}

function crear_datalist(list,id) {
	var data_lista = document.getElementById(id);
	data_lista.innerHTML = "";
	//console.log("Finished:"+gl_general.cl_save_id)
	for (var j = 0; j <list.length; j++) {
		//console.log("Nr: "+j+" Name: "+gl_general.cuentlist[j]+" Estd: "+list[j] );
		data_lista.innerHTML += "<option value='"+list[j]+"'>";
	}
}

function mostrar_input() {
	var mask = document.activeElement;
	mask.setAttribute("placeholder", "");
	var id_name = mask.id;
	var id_input = id_name.replace("text_mask", "input"); //remplaza  palabaras en cadenas de texto

	var input = document.getElementById(id_input);
	//var fila = document.getElementById("fila"+id_a);
	//var celda = document.getElementById("celd"+id_b);
	//var input = document.getElementById("input"+id_c);
	//var mask = document.getElementById("text_mask"+id_d);

	if(input && id_name.includes("text_mask")){
		input.setAttribute("class","input_style_visible");
		mask.setAttribute("disabled", "");
		input.focus();
		if(current_element == input)
			current_element = null;

		else
			current_element = input;
	}
	return null
}

function ocultar_input(otros = false)
{
	var current_input = document.activeElement;
	var current_id_name = current_input.id;
	var input_old = current_element;

	var result = true;
	if(!otros){				//Otros inputs distintos a los de ingresar valores numericos
		try {
			el_selec(current_id_name);
		}
		catch (err) {
			result = false;
		}
	}
	
	if(input_old && result){
		var id_name_old = input_old.id;
		var id_mask_old = id_name_old.replace("input", "text_mask"); //remplaza  palabaras en cadenas de texto
		var mask_old = document.getElementById(id_mask_old);
		if(mask_old && id_name_old.includes("input")){
			input_old.setAttribute("class","input_style_hidden");
			mask_old.setAttribute("placeholder", "Ingrese Valor");
			mask_old.disabled=false;
			if(id_name_old != current_id_name)
				current_element = null;
		}
	}
}

function el_selec(id){
	var elm = document.getElementById(id);
	elm.select();
}
function el_unselec(){
	var elm = document.activeElement;
	var sel = elm.blur();

}

