

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
		}

		var selec = document.getElementById(id_list[j]);
		selec.innerHTML = selc_tx;
		selec.options[gl_currt_list_selec].selected=true;
		selec.setAttribute("onchange",'selec_list(\''+id_list[j]+'\');');
	}
}

function selec_list(id,mostrar = true) {
	//console.log("tes selc: "+id)
	var input_name = document.getElementById("inputlistaname");
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	//console.log("tes selc: "+current_opt)

	console.log("Finished: "+current_opt.value);
	if(current_opt && mostrar){
		gl_currt_list_selec = parseInt(current_opt.value);
		input_name.value = gl_general.list_nam[gl_currt_list_selec];
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
	var secc_his = document.getElementById("historialventa");
	secc_his.innerHTML ="";
	var nr = gl_hist_save.index;
	for (var j = nr-1;  j >= 0; j--) {
		crear_historial(j);
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

	if(hour){
		if(year > curr_y) { 
			alert("Error: La fecha y Hora del sistema son invalidas! ");
			return false;
		}
		else if(year == curr_y) {
			if(month > curr_m) { 
				alert("Error: La fecha y Hora del sistema son invalidas! ");
				return false;
			}
			else if(month == curr_m) {
				if(day > curr_d) { 
					alert("Error: La fecha y Hora del sistema son invalidas! ");
					return false;
				}
				else if(day == curr_d) {
				//console.log(" Validar fecha---"+ curr_h +" -- "+ +get_dignr(parseInt(curr_h))+"  --  "+hour +" - "+ curr_h);
					if (hour > curr_h) { 
						alert("Error: La fecha y Hora del sistema son invalidas! ");
						return false;
					}				
				}
			}
		}
	}
	gl_general.hour = curr_h;
	gl_general.day = curr_d;
	gl_general.month = curr_m;
	gl_general.year = curr_y;
	return true;
}
