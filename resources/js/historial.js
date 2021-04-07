function preloder_filtro_fec() {
	var selec = document.getElementById("selchisfec");
	var indexfec = gl_lista_ventas.indexfec;
	var selc_tx = "";
	for (var j = indexfec;  j >= 0; j--) {
		var fechalist = gl_lista_ventas.fechalist[j];
		selc_tx += "<option id='fech"+j+"' value='"+j+"'>"+fechalist+"</option>";
	}
	selec.innerHTML = selc_tx;
	selec.setAttribute("onchange","selec_fechas('selchisfec');");
	//selec.setAttribute("onclick","selec_fechas('selchisfec');");
}

function selec_fechas(id) {
	var secc_his = document.getElementById("historialventa");
	secc_his.innerHTML ="";
	var selec = document.getElementById(id);
	var current_opt = selec.options[selec.selectedIndex];
	//console.log(current_opt.value);
	//var count = gl_lista_ventas.countfec[current_opt.value];
	if(current_opt){
		var start = gl_lista_ventas.indexstart[current_opt.value];
		var end = gl_lista_ventas.indexend[current_opt.value];

		for (var j = start; start != null && j < (end+1); j++) {
			//var index = gl_lista_ventas.savindex[j];
			crear_historial(j);
		}
	}
}

function crear_historial(index) {
	var detalles = gl_lista_ventas.detalles[index];
	var prdol = gl_lista_ventas.totaldol[index];
	var prbsf = gl_lista_ventas.totalbsf[index];
	var hora = gl_lista_ventas.hora[index];
	var fecha = gl_lista_ventas.fecha[index];
	var estado = gl_lista_ventas.estado[index];

	var cl = gl_lista_ventas.cliente[index];

	var est_txa = "<strong id='txesta"+index+"'> Estado: "+estado+"</strong>";
	var est_txb = "<strong id='txestb"+index+"'> Estado: "+estado+"</strong>";

	var secc_his = document.getElementById("historialventa");
	var titulo = "["+cl+", "+est_txa+ "], compra de: ("+get_mask(prdol,"$")+" / "+get_mask(prbsf,"Bsf")+") Fecha:("+fecha+") Hora:("+hora+") ";

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
	for (var j = 0; j < gl_lista_ventas.nombrecl.length; j++) {
		//lista_tx += add_text_cl(j,1);
		data_tx += add_text_cl(j,2);
	}
	// agregamos la hilera a la seccion de lista
	//sect_lista.innerHTML = lista_tx;
	data_lista.innerHTML = data_tx;
}

function add_text_cl(index,opt){
	var nombre = gl_lista_ventas.nombrecl[index]?gl_lista_ventas.nombrecl[index]:"";

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
	if(gl_lista_ventas.estado[index]=="Aprobada"){
		//console.log(index);
		var bott = document.getElementById("bott_reint"+index);
		bott.setAttribute("class", "element_style_hidden");

		var listindex = gl_lista_ventas.pdtindex[index];
		var listclave = gl_lista_ventas.pdtclave[index];
		var listcantidad = gl_lista_ventas.pdtcantidad[index];
		var listdesc = gl_lista_ventas.pdtdesc[index];
		for (var j = 0; j < listindex.length ; j++) {
			var nr_a = parseFloat(listdesc[j]);

			var lindex = listindex[j];
			var clave = listclave[j];
			var nr_cant = parseFloat(gl_list[clave].cantidad[lindex]);
			console.log("lindex"+nr_cant+ " "+nr_a);
			gl_list[clave].cantidad[lindex] = nr_cant + nr_a;
			agregarobjeto(gl_list[clave], clave, 1);//1 es para lectura y escritra
		}

		gl_lista_ventas.estado[index] = etd;

		//console.log("index"+" "+index);
		var txesta = document.getElementById("txesta"+index);
		var txestb = document.getElementById("txestb"+index);


		txesta.innerHTML = " Estado: "+etd;
		txestb.innerHTML = " Estado: "+etd;

		agregarventas(gl_lista_ventas);
		

		start_one = true;
		mostrar_lista(gl_selc);
	}
	else{console.log("Test error calc");};
}
function button_pend_hist(index) {
	var etd = "Aprobada";

	gl_lista_ventas.estado[index] = etd;

	var txesta = document.getElementById("txesta"+index);
	var txestb = document.getElementById("txestb"+index);


	txesta.innerHTML = " Estado: "+etd;
	txestb.innerHTML = " Estado: "+etd;

	agregarventas(gl_lista_ventas);
	
	start_one = true;
	mostrar_lista(gl_selc);

	//Cambia el boton
	var bott = document.getElementById("bott_pend"+index);
	bott.setAttribute("id", "bott_reint"+index);
	bott.setAttribute("onclick", "button_reint_hist("+index+");");
	bott.innerHTML = "Reintegrar";
}


