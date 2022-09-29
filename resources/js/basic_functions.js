

// Gestionan los selectores de listas --------------------------------------------------------------------------------------------
var gl_current_selec = null;
var gl_currt_list_selec = 0;

function preloder_filtro_lista() {
	var id_list = ["selcregvent", "listbasedato"];

	//console.log("tes selc: "+gl_currt_list_selec)
	for (var j = 0; j < id_list.length; j++) {
		var index = gl_general.list_nam.length;
		var selc_tx = "";
		for (var i = 0; i < index; i++) {
			var name = gl_general.list_nam[i]
			if(name){
				selc_tx += "<option id='nameproduct"+i+"' value='"+i+"'>"+name+"</option>";
			}
			else	
				selc_tx += "<option id='nameproduct"+i+"' value='"+i+"'>Vacio</option>";
		}

		var selec = document.getElementById(id_list[j]);
		selec.innerHTML = selc_tx;
		selec.options[gl_currt_list_selec].selected=true;
		selec.setAttribute("onchange",'selec_list(\''+id_list[j]+'\');');
	}
}

function selec_list(id,mostrar = true) {
	//console.log("tes selc: "+id)
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	//console.log("tes selc: "+current_opt)

	if(current_opt && mostrar){
		gl_currt_list_selec = parseInt(current_opt.value);
		selec_to_input();		//Input del lista productos obtiene el nombre de la lista
		//Guarda los datos generales
		gl_general.sel_list = gl_currt_list_selec;
		agregar_gene_datos(gl_general);

		mostrar_producto(gl_currt_list_selec);	//Muestra la lista de productos seleccionada	
	}
}

//------------------------------------------------------------------------------------------------------------------------------------

function comprobar_mensaje(elm, i, j) {
	elm.setAttribute("required","");
	var text = "no";
	if(j == 0){
		if(i == 1)
			text = "Ingrese Nombre del Producto";
		else if(i == 2)
			text = "Ingrese Cantidad Disponible";
	}
	if(j == 1) {
		if(i == 1)
			text = "Ingrese Valor de Ganancia (%)";

		else if(i == 2)
			text = "Ingrese Precio de Entrada en $";
	}

  	if(elm)
		elm.setCustomValidity(text);
}

//-------------------------------------------------------------------------------------------------------------------------------------

//Genera la lista ventas en el histoprial
function crea_hist_list(){
	var input = document.getElementById("totalhist");
	var secc_his = document.getElementById("historialventa");
	secc_his.innerHTML ="";
	var total = 0;
	var nr = gl_hist_save.index;
	if (nr == 0){
		gl_general.fechetd[gl_curr_optsel] = false;
		agregar_gene_datos(gl_general);
		return preloder_filtro_fec();
	}
	else {
		gl_general.fechetd[gl_curr_optsel] = true;
		agregar_gene_datos(gl_general);
	}

	for (var j = nr-1;  j >= 0; j--) {
		total += crear_historial(j);
	}
	input.value = get_mask(total, gl_mon_b);
}

//Genera los datalist
function crear_datalist(list,id) {
	var data_lista = document.getElementById(id);
	data_lista.innerHTML = "";
	//console.log("Finished:"+gl_general.cl_save_id)
	for (var j = 0; j <list.length; j++) {
		//console.log("Nr: "+j+" Name: "+gl_general.cuentlist[j]+" Estd: "+list[j] );
		data_lista.innerHTML += "<option value='"+list[j]+"'>";
	}
}

//Genera los datalist
function set_datalist_list(index, activ) {
	var data_lista = document.getElementById('optlist'+index);
	var data_lista = document.getElementById("listproducts");
	if(activ){
		gl_data_list[index] = "<option id='optlist"+index+"' value='"+gl_products[index].products.nombre+"'>";
		gl_data_list.join("");
		data_lista.innerHTML = gl_data_list.join("");
	}
	else {

		gl_data_list[index] = "";
		gl_data_list.join("");
		data_lista.innerHTML = gl_data_list.join("");
	}
}

//Compara las fechas para incrementar el index y crear lista de fechas para el selector
function check_current_fech(curr_fecha) {
	var fecha = gl_general.fecha;
	if(fecha != curr_fecha) {
		if(!fecha) {
			gl_general.fechalist.push(curr_fecha);
			gl_general.fecha = curr_fecha;
		}
		else {
			gl_general.fechalist.push(curr_fecha);
			gl_general.fecha = curr_fecha;
			gl_general.clv_max++;

		}
	}
}

function valid_current_fech() {
	const messg = "Se detecto inconsistencia con fecha y hora del sistema, actualizar fecha y hora ?.";
	var hoy = new Date();
	var curr_h = hoy.getHours() +""+get_time_zero(hoy.getMinutes()) +""+ get_time_zero(hoy.getSeconds());
	var curr_d = hoy.getDate();
	var curr_m = hoy.getMonth();
	var curr_y = hoy.getFullYear();
	var hour = gl_general.hour;
	var day = gl_general.day;
	var month = gl_general.month;
	var year = gl_general.year;
	curr_h = parseInt(curr_h);

	var result = null;
	if(hour){
		if(year > curr_y) { 
			result = confirm(messg);
		}
		else if(year == curr_y) {
			if(month > curr_m) { 
				result = confirm(messg);
			}
			else if(month == curr_m) {
				if(day > curr_d) { 
					result = confirm(messg);
				}
				else if(day == curr_d) {
				//console.log(" Validar fecha---"+ curr_h +" -- "+ +get_dignr(parseInt(curr_h))+"  --  "+hour +" - "+ curr_h);
					if (hour > curr_h) { 
						result = confirm(messg);
					}				
				}
			}
		}
	}
	if(result === null) {
		gl_general.hour = curr_h;
		gl_general.day = curr_d;
		gl_general.month = curr_m;
		gl_general.year = curr_y;

		agregar_gene_datos(gl_general);
	}
	else if(result){
		var dialogo = document.getElementById('dialog');
		dialogo.show();
	}
}
var gl_update_fech = null;
function update_fech_hora(){
	var input = document.activeElement;
	gl_update_fech = input.value;
}
function acept_fech_hora(){
	var input = document.getElementById('dateinput');
	var dialogo = document.getElementById('dialog');

	gl_update_fech = input.value;
	if (gl_update_fech !== null) {
		var d = new Date(input.value);

		var day = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();


		gl_general.day = day;
		gl_general.month = month;
		gl_general.year = year;

		agregar_gene_datos(gl_general);

		dialogo.close();
		//console.log(""+day+" :: "+ gl_general.day );
	}
}

function remplace_doble_punto(){
	var input = document.activeElement;
	var type = input.getAttribute('type');
	if(type == "number"){
		var val = input.value;
		var dig = (val);
		//console.log(""+val+"::"+dig)
		if (val==="0")
			return null;

		else if (gl_browser && !parseFloat(val) && current_key =="."){
			input.value = "0.";

		}
	}
}

function set_lev_datalist(siz){
	var input = document.activeElement;
	if(siz == gl_list_lv) {
		input.setAttribute("list","listproducts");
		input.setAttribute("onfocus","el_selec(false);");
		input.blur();
		input.focus();
		input.setAttribute("onfocus","el_selec(true);");
	}
	if(siz < gl_list_lv)
		input.removeAttribute("list");
}

function elm_show_list(force = false){

	var input = document.activeElement;
	var att = input.getAttribute("list"); 
	//console.log(att)
	input.setAttribute("list","listproducts");
	if(!att){
		input.blur();
		input.focus();
		input.setAttribute("onfocus","el_selec(true);");
	}
	


}


function action_compatibility(opt){
	//Compatibilidad para pasar lista a modo de clave individual
	if(opt == 1){
		var list_prodt = new Array();
		var list = gl_products[0].products.nombre;
		if(list !== undefined){
			for (var j = 0; j <list.length; j++) {
				var product = new reg_curr_prod();
				var curr_prod = new r_product();

				var nombre = gl_products[0].products.nombre[j];
				var cantidad = gl_products[0].products.cantidad[j];
				var margen = gl_products[0].products.margen[j];
				var precio = gl_products[0].products.precio[j];

				product.active = true;
				product.nombre = !Array.isArray(nombre)?nombre:"";
				product.cantidad = parseFloat(cantidad)? parseFloat(cantidad):0;
				product.margen = parseFloat(margen)? parseFloat(margen):0;
				product.precio = parseFloat(precio)? parseFloat(precio):0;

				curr_prod.id = j;
				curr_prod.products = product;

				agregar_all_producto(curr_prod);

				list_prodt.push(curr_prod);

			}
			gl_products = list_prodt;

			gl_general.comp = false;
			agregar_gene_datos(gl_general);		//Se guarda el estado de compatibilidad
		}
	}
}

function is_browser_active(name){
	var result = navigator.userAgent.toLowerCase().indexOf(name) > -1;
	if(result){
		return true;
	}
	return false;
}

