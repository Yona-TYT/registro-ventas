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
