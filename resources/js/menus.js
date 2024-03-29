
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


	var sec_regvent = document.getElementById("seccion1");
	var sec_regpro = document.getElementById("seccion2");
	var sec_hist = document.getElementById("seccion3");
	var sec_listprod = document.getElementById("seccion4");
	var sec_impdata = document.getElementById("seccion5");


	//Registro de Ventas
	if(opt==1) {
		sec_listprod.setAttribute("class","element_style_hidden");
		sec_impdata.setAttribute("class","element_style_hidden");
		sec_hist.setAttribute("class","element_style_hidden");
		sec_regpro.setAttribute("class","element_style_hidden");
		sec_regvent.setAttribute("class","label_style");
	}

	//Registro de Productos
	if(opt==2) {
		sec_listprod.setAttribute("class","element_style_hidden");
		sec_impdata.setAttribute("class","element_style_hidden");
		sec_regvent.setAttribute("class","element_style_hidden");
		sec_hist.setAttribute("class","element_style_hidden");
		sec_regpro.setAttribute("class","label_style");
	}

	//Historial de Ventas
	if(opt==3) {
		sec_listprod.setAttribute("class","element_style_hidden");
		sec_impdata.setAttribute("class","element_style_hidden");
		sec_regvent.setAttribute("class","element_style_hidden");
		sec_regpro.setAttribute("class","element_style_hidden");
		sec_hist.setAttribute("class","label_style");
	}

	//Lista general de productos
	if(opt==4) {
		sec_listprod.setAttribute("class","label_style");
		sec_impdata.setAttribute("class","element_style_hidden");
		sec_regvent.setAttribute("class","element_style_hidden");
		sec_hist.setAttribute("class","element_style_hidden");
		sec_regpro.setAttribute("class","element_style_hidden");

	}
	//Importar datos
	if(opt==5) {
		sec_listprod.setAttribute("class","element_style_hidden");
		sec_regvent.setAttribute("class","element_style_hidden");
		sec_hist.setAttribute("class","element_style_hidden");
		sec_regpro.setAttribute("class","element_style_hidden");
		sec_impdata.setAttribute("class","label_style");
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

