var gl_lista_rv = new lista_actual_rv();
function buscar_lista_rv(id)
{
	var text = document.getElementById(id).value;
	reset_inputs_rv();
	var result = false;
	var count = 0;
	//console.log("Finished: ");
	for (var j = 0; j<gl_list[gl_selc].listatamaño; j++) {

		if(count>4) break;
		var nombre = gl_list[gl_selc].nombre[j]
		
		if (nombre!=null) nombre = nombre.toLowerCase();
		else continue;
		result = nombre.includes(text.toLowerCase());

		if(result){
			var cantidad = parseInt(gl_list[gl_selc].cantidad[j])?gl_list[gl_selc].cantidad[j]:0;
			var margen = gl_list[gl_selc].margen[j];
			var precio = gl_list[gl_selc].precio[j];
			var genmargen = gl_listname.genmargen;
			var genprecbs = gl_listname.genprecio;

			var calc_precio = calc_dolarporunidad(genmargen, margen, precio);
			var calc_precbs = calc_bolivarprecio(genprecbs, calc_precio);

			var input_nomb = document.getElementById("rvinput01"+count+""+0);
			var input_cant = document.getElementById("rvinput01"+count+""+1);
			var input_pdol = document.getElementById("rvinput01"+count+""+2);
			var input_pbsf = document.getElementById("rvinput01"+count+""+3);
			var input_tvent = document.getElementById("rvinput01"+count+""+4);

			input_nomb.value = nombre;
			input_cant.value = cantidad;
			input_pdol.value = get_mask(calc_precio,"$");
			input_pbsf.value = get_mask(calc_precbs,"BsF");

			gl_lista_rv.clave[count] = gl_selc;
			gl_lista_rv.index[count] = j;
			gl_lista_rv.nombre[count] = nombre;
			gl_lista_rv.cantidad[count] = cantidad;
			gl_lista_rv.precio[count] = precio;
			gl_lista_rv.margen[count] = margen;
			gl_lista_rv.totalvent[count] = input_tvent;

			//gloval_test += "result:"+result+ " ";
			count++;
			
		}
	}
}

var gl_venta_rv = new  venta_actual();
var nw_index = new Array();
var nw_clave = new Array();
var nw_cantidad = new Array();
var nw_desc = new Array();
function button_reg_venta(nr) {

	if(gl_lista_rv.index[nr] != null){
		var select = document.getElementById("selcregvent");
		var sel_nombre = select.options[select.selectedIndex].innerHTML;

		var clave = gl_lista_rv.clave[nr];
//	console.log("Finished:"+clave +"  "+gl_list[gl_selc].clave);

		var index = gl_lista_rv.index[nr];
		var nombre = gl_lista_rv.nombre[nr];
		var cantidad = gl_lista_rv.cantidad[nr];
		var precio = gl_lista_rv.precio[nr];
		var margen = gl_lista_rv.margen[nr];
		var total = gl_lista_rv.totalvent[nr];
		var genmargen = gl_listname.genmargen;
		var genprecbs = gl_listname.genprecio;

		if(clave == gl_selc){
			//Para guardar datos de producto
			nw_index[gl_venta_rv.count] = index;
			nw_clave[gl_venta_rv.count] = clave;
			nw_cantidad[gl_venta_rv.count] = cantidad;
			nw_desc[gl_venta_rv.count] = parseFloat(total.value);

			gl_venta_rv.listnomb[gl_venta_rv.count] = sel_nombre;
			gl_venta_rv.clave[gl_venta_rv.count] = clave;
			gl_venta_rv.index[gl_venta_rv.count] = index;
			gl_venta_rv.nombre[gl_venta_rv.count] = nombre;
			gl_venta_rv.totalvent[gl_venta_rv.count] = parseFloat(total.value);

			var calc_precio = calc_dolarporunidad(genmargen, margen, precio);
			var calc_precbs = calc_bolivarprecio(genprecbs, calc_precio);

			gl_venta_rv.prdol[gl_venta_rv.count] = calc_precio;
			gl_venta_rv.prbsf[gl_venta_rv.count] = calc_precbs;
		}

		var comp = comparar_rv(index);

		if(comp){
			gl_venta_rv.count++;
			mostrar_lista_rv();
		}
		else {
			alert("Producto duplicado, use el boton [Quitar].");
		}
	}
}

function comparar_rv(index) {
	var nr = gl_venta_rv.count;
	for (var i = 0; i <nr; i++) {
		var clave = gl_venta_rv.clave[i];
		if(clave==gl_selc){
			var new_index = gl_venta_rv.index[i];
			if(new_index == index){
				return false;
				break;
			}
		}
	}
	return true;
}

function mostrar_lista_rv() {

	var secc_reg = document.getElementById("registroactual");
	var total_dol = document.getElementById("rv_totaldol");
	var total_bsf = document.getElementById("rv_totalbsf");
	var cl_nombre = document.getElementById("rv_clnombre");

	secc_reg.innerHTML = "";
	var venta_tx = "";
	var hist_tx = "<ul>";
	var t_dol = 0;
	var t_bsf = 0;

	var nr = gl_venta_rv.count;
	for (var i = 0; i <nr; i++) {
		var sel_nombre = gl_venta_rv.listnomb[i];
		var index = gl_venta_rv.index[i];
		var nombre = gl_venta_rv.nombre[i];
		//var precio = gl_venta_rv.precio[i];
		//var margen = gl_venta_rv.margen[i];
		var total = gl_venta_rv.totalvent[i];
		var prdol = gl_venta_rv.prdol[i];
		var prbsf = gl_venta_rv.prbsf[i];

		var calc_precio = prdol*total;
		var calc_precbs = prbsf*total;

		t_dol += calc_precio;
		t_bsf += calc_precbs;

		//console.log(prdol+"  "+ total);
		var butt = "<button type='button' onclick='button_borr_venta("+i+");'>Quitar</button>";
		var detalles = "["+total+"] "+nombre+" c/u:( "+get_mask(prdol,"$")+" / "+get_mask(prbsf,"Bsf )")+" Total:( "+get_mask(calc_precio,"$")+" / "+get_mask(calc_precbs,"Bsf )")+" Lista:("+sel_nombre+")";
		venta_tx= "<div class='div_list_style' id='divrv"+i+"'>" + butt + detalles + "</div>";

		secc_reg.innerHTML += venta_tx;
		hist_tx += "<li>"+detalles+"</li>";
	}

	total_dol.value = get_mask(t_dol,"$");
	total_bsf.value = get_mask(t_bsf,"Bsf");

	gl_lista_ventas.detalles[gl_lista_ventas.index] = hist_tx+"</ul>";
	gl_lista_ventas.totaldol[gl_lista_ventas.index] = t_dol;
	gl_lista_ventas.totalbsf[gl_lista_ventas.index] = t_bsf;

	gl_lista_ventas.pdtindex[gl_lista_ventas.index] = nw_index;
	gl_lista_ventas.pdtclave[gl_lista_ventas.index] = nw_clave;
	gl_lista_ventas.pdtcantidad[gl_lista_ventas.index] = nw_cantidad;
	gl_lista_ventas.pdtdesc[gl_lista_ventas.index] = nw_desc;

}
function button_borr_venta(index){
	
	var clave = gl_venta_rv.clave[index];
	//if(clave==gl_list[gl_selc].clave){
		document.getElementById("divrv"+index).remove();
		gl_venta_rv.listnomb.splice(index, 1);
		gl_venta_rv.clave.splice(index, 1);
		gl_venta_rv.index.splice(index, 1);
		gl_venta_rv.nombre.splice(index, 1);
		gl_venta_rv.prdol.splice(index, 1);
		gl_venta_rv.prbsf.splice(index, 1);
		gl_venta_rv.totalvent.splice(index, 1);

		gl_venta_rv.count--;
		mostrar_lista_rv()
	//}
}
function reset_inputs_rv() {
	gl_lista_rv = new lista_actual_rv();
	for (var i = 0; i < 5; i++) {
		var input_nomb = document.getElementById("rvinput01"+i+""+0);
		var input_cant = document.getElementById("rvinput01"+i+""+1);
		var input_pdol = document.getElementById("rvinput01"+i+""+2);
		var input_pdbs = document.getElementById("rvinput01"+i+""+3);
		var input_tvent = document.getElementById("rvinput01"+i+""+4);


		input_nomb.value = "";
		input_cant.value = "";
		input_pdol.value = "";
		input_pdbs.value = "";
		input_tvent.value = "1";

		//gloval_test += "result:"+result+ " ";
	}
}
var gl_lista_ventas = new all_ventas();

function guardar_venta() {

	var cl_nombre = document.getElementById("rv_clnombre");
	if(gl_venta_rv.count>0){

		//console.log("Finished:" + (cl_nombre.value == ""?"N/A": cl_nombre.value));

		var input_pend = document.getElementById("pend_mark");
		if(input_pend.checked)
			gl_lista_ventas.estado[gl_lista_ventas.index] = "Pendiente";
		else
			gl_lista_ventas.estado[gl_lista_ventas.index] = "Aprobada";

		input_pend.checked = false;

		gl_lista_ventas.cliente[gl_lista_ventas.index] = (cl_nombre.value == ""?"N/A": cl_nombre.value);

		var tx_cl = (cl_nombre.value == ""?"N/A": cl_nombre.value);
		cliente_check(tx_cl.toLowerCase());

		var hoy = new Date();

		//Restaura los datos de venta y arreglos
		gl_venta_rv = new  venta_actual();
		nw_index = new Array();
		nw_clave = new Array();
		nw_cantidad = new Array();
		nw_desc = new Array();

		var secc_reg = document.getElementById("registroactual");

		var index = gl_listname.index;
		var indexfec = gl_lista_ventas.indexfec;
		var fechalist = gl_lista_ventas.fechalist[indexfec];
		
		var prdol = gl_lista_ventas.totaldol[index];
		var prbsf = gl_lista_ventas.totalbsf[index];



		var hoy = new Date();
		var hora =  hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
		var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();

		var fecha = gl_listname.fecha;

		if(fecha != curr_fecha) {
			if(!fecha) {
				gl_listname.fecha = curr_fecha;
				gl_listname.fechalist[gl_listname.index] = curr_fecha;
			}
			else {
				gl_listname.index = 0;
				gl_listname.save_id++;
				gl_listname.fecha = curr_fecha;
				gl_listname.fechalist[gl_listname.index] = curr_fecha;
			}
		}

		gl_lista_ventas.hora[index] = hora;
		gl_lista_ventas.fecha[index] = curr_fecha;


		descontar_pdt(index);


		//Cambia a la siguiente venta
		gl_listname.index++;
		gl_lista_ventas.index = gl_listname.index;
		//----------------------------------------

		document.getElementById("rv_totaldol").value = 0;
		document.getElementById("rv_totalbsf").value = 0;
		cl_nombre.value = "";
		secc_reg.innerHTML = "";

		agregarnombres(gl_listname);
		agregarventas(gl_lista_ventas);
		mostrar_ventas(gl_listname.save_id);
	}
	else {
		alert("La lista esta vacia!.");
	}
}

function descontar_pdt(lindex) {
	var listindex = gl_lista_ventas.pdtindex[lindex];
	var listclave = gl_lista_ventas.pdtclave[lindex];
	var listcantidad = gl_lista_ventas.pdtcantidad[lindex];
	var listdesc = gl_lista_ventas.pdtdesc[lindex];
	for (var j = 0; j < listindex.length ; j++) {

		var nr_a = listcantidad[j];
		var nr_b = listdesc[j];
		var nw_cant = nr_a - nr_b;

		var index = listindex[j];
		var clave = listclave[j];

		gl_list[clave].cantidad[index] = nw_cant;
		agregarobjeto(gl_list[clave], clave, 1);//1 es para lectura y escritra
	}
	start_one = true;
	mostrar_lista(gl_selc);
}

function cliente_check(text) {
	var nomb_test = gl_listname.nombrecl[0];
	if (!nomb_test){
		 gl_listname.nombrecl[0] = "N/A";
	}

	var nomb_list = gl_listname.nombrecl;

	var result = false;
	for (var j = 0; j < nomb_list.length ; j++) {
		var name = nomb_list[j].toLowerCase()
		result = name.includes(text);
		if(result){
			break;
		}
	}

	if(!result){

		gl_listname.indexnomb++;
		gl_listname.nombrecl[gl_listname.indexnomb] = text;

		var data_lista = document.getElementById("list_datacl");

		data_lista.innerHTML += "<option value='"+text+"'>";
	}
}

function lista_actual_rv() {
	this.clave = new Array();
	this.index = new Array();
	this.nombre = new Array();
	this.cantidad = new Array();
	this.precio = new Array();
	this.margen = new Array();
	this.totalvent = new Array();
}

function venta_actual() {
	this.count = 0;
	this.listnomb = new Array();
	this.clave = new Array();
	this.index = new Array();
	this.nombrecl = new Array();
	this.nombre = new Array();
	this.prdol = new Array();
	this.prbsf = new Array();
	this.totalvent = new Array();
}
