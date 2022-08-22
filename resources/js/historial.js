gl_curr_optsel = 0;
gl_hist_save = new reg_ventas();

gl_hist_date = new history_data();


function preloder_filtro_fec() {
	var selec = document.getElementById("selchisfec");

	var index = gl_general.clv_max;
	var selc_tx = "";
	for (var j = index; j >= 0; j--) {
		var name = gl_general.fechalist[j]
		if(name){
			selc_tx += "<option id='fech"+j+"' value='"+j+"'>"+name+"</option>";
		}
	}
	selec.innerHTML = selc_tx;
	selec.setAttribute("onchange","selec_fechas('selchisfec');");
	var current_opt = selec.options[selec.selectedIndex];
	gl_curr_optsel = current_opt?parseInt(current_opt.value):0;
}

function selec_fechas(id,mostrar = true) {
	var secc_his = document.getElementById("historialventa");
	secc_his.innerHTML ="";
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	if(current_opt && mostrar){
		gl_curr_optsel = parseInt(current_opt.value);
		mostrar_selec_hist(gl_curr_optsel);
	}

}

function crear_historial(index) {
	var detalles = gl_hist_save.detalles[index];
	var prdol = gl_hist_save.totaldol[index];
	var prbsf = gl_hist_save.totalbsf[index];
	var hora = gl_hist_save.hora[index];
	var fecha = gl_hist_save.fecha[index];
	var estado = gl_hist_save.estado[index];

	var cl = gl_hist_save.cliente[index];

	var est_txa = "<strong id='txesta"+index+"'> Estado: "+estado+"</strong>";
	var est_txb = "<strong id='txestb"+index+"'> Estado: "+estado+"</strong>";

	var secc_his = document.getElementById("historialventa");
	var titulo = "["+cl+", "+est_txa+ "], "+fecha+" "+hora+" <strong class='total_style'>Total: "+get_mask(prdol,gl_mon_b)+" / "+get_mask(prbsf,gl_mon_a+" </strong>");

	var buttm = "<button type='button' onclick='button_detalles("+index+");'>Detalles</button>";


	var buttq = "";
	if(estado=="Aprobada")
		buttq = "<button id='bott_reint"+index+"' type='button' onclick='button_reint_hist("+index+");'>Reintegrar</button>";
	else if(estado=="Pendiente")
		buttq = "<button id='bott_pend"+index+"' type='button' onclick='button_pend_hist("+index+");'>Confirmar</button>";

	var inside = "<div class='element_style_hidden' id='divhis"+index+"'>"+ detalles + buttq + est_txb +"</div>";


	secc_his.innerHTML +=  "<div class='div_list_style'>" + buttm  + titulo + inside + "</div>";
}
function crear_lista_cl() {
	//var sect_lista = document.getElementById("list_cl");
	var data_lista = document.getElementById("list_datacl");
	//sect_lista.innerHTML = "";
	data_lista.innerHTML = "";
	var lista_tx = "";
	var data_tx = "";
	for (var j = 0; j < gl_listname.nombrecl.length; j++) {
		//lista_tx += add_text_cl(j,1);
		data_tx += add_text_cl(j,2);
	}
	// agregamos la hilera a la seccion de lista
	//sect_lista.innerHTML = lista_tx;
	data_lista.innerHTML = data_tx;
}

function add_text_cl(index,opt){
	var nombre = gl_listname.nombrecl[index]?gl_listname.nombrecl[index]:"";

	if(opt==1){
		return "<div> </div>";
	}
	if(opt==2){
		return "<option value='"+nombre+"'>";
	}
}
function button_detalles(index) {
	var secc_div = document.getElementById("divhis"+index);
	var class_name = secc_div.className;
	if(class_name == "element_style_hidden")
		secc_div.setAttribute("class", "");
	else
		secc_div.setAttribute("class", "element_style_hidden");
}

function button_reint_hist(index) {
	var etd = "Reintegrada";
	if(gl_hist_save.estado[index]=="Aprobada"){
		//console.log(index);
		var bott = document.getElementById("bott_reint"+index);
		bott.setAttribute("class", "element_style_hidden");

		var listindex = gl_hist_save.pdtindex[index];
		var listclave = gl_hist_save.pdtclave[index];
		var listcantidad = gl_hist_save.pdtcantidad[index];
		var listdesc = gl_hist_save.pdtdesc[index];
		for (var j = 0; j < listindex.length ; j++) {

			var lindex = parseInt(listindex[j]);
			var clave = parseInt(listclave[j]);

			var num = listdesc[j];
			  
			console.log("Finished::" +num +" :: "+lindex )

			if (!cop_list[clave])
				cop_list[clave] = new cop_products();

			cop_list[clave].clave = clave;
			cop_list[clave].index.push(lindex);
			cop_list[clave].num.push(num);
		}

		var cl_max = 6;
		mostrar_prod_opt(cl_max) //Clave para ubicar la lista, index para encontrar el producto,  num la cantidad rewsultante 

		//console.log("index"+" "+index);
		var txesta = document.getElementById("txesta"+index);
		var txestb = document.getElementById("txestb"+index);

		txesta.innerHTML = " Estado: "+etd;
		txestb.innerHTML = " Estado: "+etd;

		//Datos De la venta -----------------------------------------------------
		gl_hist_save.estado[index] = etd;
		gl_hist_save.clave = gl_curr_optsel;		//Valor de la clave segun el selector de fechas
		agregar_ventas(gl_hist_save);				//Envia los datos para ser guardados
		//mostrar_lista(gl_currt_list_selec);

	}
}
function button_pend_hist(index) {
	var etd = "Aprobada";

	gl_hist_save.estado[index] = etd;

	var txesta = document.getElementById("txesta"+index);
	var txestb = document.getElementById("txestb"+index);


	txesta.innerHTML = " Estado: "+etd;
	txestb.innerHTML = " Estado: "+etd;

	agregar_ventas(gl_hist_save, gl_curr_optsel);
	
	start_one = true;
	//mostrar_lista(gl_currt_list_selec);

	//Cambia el boton
	var bott = document.getElementById("bott_pend"+index);
	bott.setAttribute("id", "bott_reint"+index);
	bott.setAttribute("onclick", "button_reint_hist("+index+");");
	bott.innerHTML = "Reintegrar";
}

function eliminar_todo(opt){
	var butt = document.getElementById("buthist");
	var label = document.getElementById("histlabel");
	var check = document.getElementById("histcheck");
	if(opt==0){
		label.setAttribute("class", "cajas_style");
		check.checked = false;
		butt.setAttribute("onclick", "eliminar_todo(1)");
		alert("Estas a punto de borrar todo, marque la casilla para confirmar y vuelva a pulsar.");
	}
	if(opt==1){
		label.setAttribute("class", "input_style_hidden");
		butt.setAttribute("onclick", "eliminar_todo(0)");
		if(check.checked){
			check.checked = false;
			clear_history();
			alert("Se ha borrado Todo el Historial.");
		}
	}
}
function clear_history(){

	for (var j = 0; j <= gl_hist_date.save_id; j++) {
		remover_ventas(j);
	}

	//Restaura los valores de control de historial
	gl_hist_date = new history_data();
	remove_his_data(gl_hist_date.clave);
	

	gl_hist_save = new reg_ventas();

	gl_lista_rv = new reg_ventas();

	preloder_filtro_fec();
	selec_fechas("selchisfec");

}



