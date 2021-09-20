
var cajadatos, bd;
var claveventa = 001;

function set_basededatos(name)
{
	cajadatos = document.getElementById("cajadatos");
	var solicitud = indexedDB.open(name, 1);
	solicitud.addEventListener("error", mostrarerror);
	solicitud.addEventListener("success", comenzar);
	solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
	alert("Error: tyt tyt " + evento.code + " " + evento.message);
}
function comenzar(evento) {
	var select = document.getElementById("selectlistaname");
	var current_select = select.options[select.selectedIndex].value;

	var names = new allnames_list();
	var list_a = new result_list_a();


	var clave = current_select;


	var clavename = names.clave;

	bd = evento.target.result;
	mostrar_nombres(clavename);

	//Datos para controlar historial
	mostrar_hist_date(gl_hist_date.clave);



	//Test lista de productos
	gl_selc = parseInt(current_select);
	gl_list[gl_selc] = new result_list_a();
	start_one = true;
	mostrar_lista(gl_selc);

	var list_id = gl_listname.list_id;
	for (var j = 0; j < list_id.length ; j++) {
		if (j == gl_selc) continue;
		//console.log("contar "+j);
		gl_list[j] = new result_list_a();
		mostrar_lista(j);
	}
	//----------------------------------------------
	//menu_main();
}

function crearbd(evento) {
	var basededatos = evento.target.result;
	var almacen_productos = basededatos.createObjectStore("nombre_lista", {keyPath:"id", autoIncrement: true});
	almacen_productos.createIndex("buscarnombre", "nombre", {unique: true});

	var almacen_nombreslista = basededatos.createObjectStore("nombre_saves", {keyPath:"id", autoIncrement: true});
	almacen_nombreslista.createIndex("buscarnombre", "nombre", {unique: true});

	var almacen_ventas = basededatos.createObjectStore("ventas_saves", {keyPath:"id", autoIncrement: true});
	almacen_ventas.createIndex("buscarnombre", "nombre", {unique: true});

	var almacen_history = basededatos.createObjectStore("history_data", {keyPath:"id", autoIncrement: true});
	almacen_history.createIndex("buscarnombre", "nombre", {unique: true});

}

function enviar_index() {
	//var result = new result_list();

	var nombre_id = 1+""+0;
	var cantidad_id = 2+""+0;
	var margen_id = 1+""+1;
	var precio_id = 2+""+1;

	var gen_precio_id = 0+""+2;
	var gen_margen_id = 0+""+4;

	//Entradas numericas de precio bs y ganancia general
	gl_listname.genprecio = document.getElementById("input02").value;
	gl_listname.genmargen = document.getElementById("input04").value;
	
	if(gl_current_selec != null){
		gl_list[gl_selc].nombre[gl_current_selec] = document.getElementById("input"+nombre_id).value;
		gl_list[gl_selc].cantidad[gl_current_selec] = document.getElementById("input"+cantidad_id).value;
		gl_list[gl_selc].margen[gl_current_selec] = document.getElementById("input"+margen_id).value;
		gl_list[gl_selc].precio[gl_current_selec] = document.getElementById("input"+precio_id).value;
	}
	//add_message(document.getElementById("inputest").value);
	agregarobjeto(gl_list[gl_selc], gl_selc, 1);//1 es para lectura y escritra
	agregarnombres(gl_listname);
	return null;
}

//Guarda los datos de la venta
function agregarventas(ventas, id = gl_hist_date.save_id) {
	var transaccion = bd.transaction(["ventas_saves"], "readwrite");
	var almacen = transaccion.objectStore("ventas_saves");

	//var id = gl_hist_date.save_id;
	console.log("Vac: "+id )
	var solicitud = almacen.put({id: id, rventas: ventas});

}

//Guarda los datos de las listas como nombres y datalistas
function agregarnombres(names) {
	var transaccion = bd.transaction(["nombre_saves"], "readwrite");
	var almacen = transaccion.objectStore("nombre_saves");

	var solicitud = almacen.put({id: names.clave, nombrelista: names});
}

//Guarda los datos para controlar el historial
function agregar_his_data(data) {
	var transaccion = bd.transaction(["history_data"], "readwrite");
	var almacen = transaccion.objectStore("history_data");

	var solicitud = almacen.put({id: data.clave, data_his: data});
}

//Guarda los productos en las listas
function agregarobjeto(result, clave, opt) {
	var transaccion = bd.transaction(["nombre_lista"], "readwrite");
	var almacen = transaccion.objectStore("nombre_lista");
	//transaccion.addEventListener("complete", mostrar_lista);
	transaccion.addEventListener("complete", function() {mostrar_lista(clave);});
	transaccion.addEventListener("error", function() {mostrar_lista(clave)});
	//transaccion.addEventListener("error", mostrar_lista);
	if (opt == 0){
		var solicitud = almacen.add({id: clave, datos: result});
	}
	if (opt == 1){
		var solicitud = almacen.put({id: clave, datos: result});
	}
}

// Manejos de las listas de productos------------------------------------------------------------------
function mostrar_lista(clave) {
	var transaccion = bd.transaction(["nombre_lista"]);
	var almacen = transaccion.objectStore("nombre_lista");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", function(evento) {
	var resultado = evento.target.result;

	if(resultado){
		//console.log("tes tamaño: "+resultado.datos.listatamaño  )
		//console.log("tes clave"+clave + " "+resultado.datos.listatamaño + "" +start_one)
		resultado.datos.listatamaño != null? gl_list[parseInt(clave)] = resultado.datos : gl_list[parseInt(clave)] = new result_list_a();
		//console.log("test "+gl_list[clave].nombre[0]);
		if (start_one){
			load_save_data();
		}
	}
	else{
		//console.log("Vaciooooo: " )
		gl_list[parseInt(clave)] = new result_list_a();
	}
	});
}

function obtener_lista(evento) {
	var resultado = evento.target.result;
	var text = "";
	if(resultado){
		//Solo una vez por inicio o en un cambio de lista
		if (start_one){
			//contador = setInterval(cambio_valor, 1000);
			//gl_list[gl_selc] = resultado.datos;
			//load_save_data();
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------

//Se obtienen los nombres lista y valores generales ------------------------------
function mostrar_nombres(clave) {
	//cajadatos.innerHTML = "";
	var transaccion = bd.transaction(["nombre_saves"]);
	var almacen = transaccion.objectStore("nombre_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_nombres);
	
}

function obtener_nombres(evento) {
	var resultado = evento.target.result;
	if(resultado){
		gl_listname = resultado.nombrelista;
	}
}
//----------------------------------------------------------------------

//Manejo de datos desde la venta y al inicio -----------------------------------------
function mostrar_ventas(clave) {
	//cajadatos.innerHTML = "";
	var transaccion = bd.transaction(["ventas_saves"]);
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_ventas);
	
}

function obtener_ventas(evento) {
	var resultado = evento.target.result;

	var hoy = new Date();
	var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();
	var index = gl_hist_date.index;
	var fecha = gl_hist_date.fecha;
	var curr_id = gl_hist_date.save_id;

	if(resultado){

		var id = resultado.id;
		if(id == curr_id){
			if(!fecha){
				gl_hist_date.fecha = curr_fecha;
				gl_hist_date.fechalist[gl_hist_date.index] = curr_fecha;
				//gl_trasn_save = new trasn_save();
				//console.log(+puntero.value.id+"  noo" );
			}
			else if(curr_fecha != fecha){
				gl_hist_date.index = 0;
				gl_hist_date.save_id++;
				gl_hist_date.fecha = curr_fecha;
				gl_hist_date.fechalist[gl_hist_date.save_id] = curr_fecha;

			}
		}	
		//console.log(" ---" +resultado.rtdatos.id+"");
		if(curr_fecha == fecha){
			gl_lista_ventas = resultado.rventas;
			gl_hist_save = resultado.rventas;
		}

		//console.log(""+gl_trasn_datos.save_id+" index");
	}
	crear_lista_cl();
	preloder_filtro_fec();
	selec_fechas("selchisfec", false);
	var nr = gl_hist_save.index;
	for (var j = nr-1;  j >= 0; j--) {
		crear_historial(j);
	}

}
//----------------------------------------------------------------------

function remover_ventas(clave) {

	var transaccion = bd.transaction(["ventas_saves"], "readwrite");
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.delete(clave);

}

function remove_datos(clave) {

	var transaccion = bd.transaction(["nombre_saves"], "readwrite");
	var almacen = transaccion.objectStore("nombre_saves");
	var solicitud = almacen.delete(clave);

}

function remove_his_data(clave) {

	var transaccion = bd.transaction(["history_data"], "readwrite");
	var almacen = transaccion.objectStore("history_data");
	var solicitud = almacen.delete(clave);

}


//Manejo de datos desde el selector de fechas -----------------------------------------
function mostrar_selec(clave) {
	var transaccion = bd.transaction(["ventas_saves"]);
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_selec);
	
}
function obtener_selec(evento) {
	var resultado = evento.target.result;
	gl_hist_save = new all_ventas();

	console.log(gl_hist_date.save_id);	
	if(resultado){
		//var id = resultado.id;
		gl_hist_save = resultado.rventas;
		var nr = gl_hist_save.index;
		for (var j = nr-1;  j >= 0; j--) {
			crear_historial(j);
		}		
	}
		//console.log(""+resultado.id+" fech index");
}
//---------------------------------------------------------------------------------------


//Manejo de datos para el control del historial ------------------------------
function mostrar_hist_date(clave) {
	var transaccion = bd.transaction(["history_data"]);
	var almacen = transaccion.objectStore("history_data");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_hist_date);
	
}

function obtener_hist_date(evento) {
	var resultado = evento.target.result;

	if(resultado){
		gl_hist_date = resultado.data_his;
		mostrar_ventas(gl_hist_date.save_id);
	}
	preloder_selec_list("selectlistaname");
}
//----------------------------------------------------------------------


function history_save() {
	this.indexnomb = 0;
	this.nombrecl = new Array();

	this.indexfec = 0;

	this.pdtindex = new Array();
	this.pdtclave = new Array();
	this.pdtcantidad = new Array();
	this.pdtdesc = new Array();

	//Control de trasn_save()
	this.index = 0;					//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	this.fecha = null;				//Fecha actual
	this.save_id = 0;				//ID actual (Va incrementando por dia)
	this.fechalist = new Array(); 	//Lista de fechas por dia
}

function all_ventas() {
	this.indexfec = 0;
	this.fechalist = new Array();

	this.index = 0;
	this.cliente = new Array();
	this.detalles = new Array();
	this.totaldol = new Array();
	this.totalbsf = new Array();
	this.fecha = new Array();
	this.hora = new Array();
	this.estado = new Array();

	this.pdtindex = new Array();
	this.pdtclave = new Array();
	this.pdtcantidad = new Array();
	this.pdtdesc = new Array();
}

function allnames_list() {
	this.list_id = [0, 1, 2, 3, 4, 5];
	this.list_nam = ["Liata Numero 1", "Liata Numero 2", "Liata Numero 3", "Liata Numero 4", "Liata Numero 5", "Liata Numero 6"];
	this.clave = 0;
	this.genmargen = 0;
	this.genprecio = 0;

	//Lista de clientes en datalist
	this.indexnomb = 0;
	this.nombrecl = new Array();

	//Control de history_save()
	this.index = 0;					//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	this.fecha = null;				//Fecha actual
	this.save_id = 0;				//ID actual (Va incrementando por dia)
	this.fechalist = new Array(); 	//Lista de fechas por dia
}

function history_data() {
	this.clave = 0;
	//Control de history_save()
	this.index = 0;					//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	this.fecha = null;				//Fecha actual
	this.save_id = 0;				//ID actual (Va incrementando por dia)
	this.fechalist = new Array(); 	//Lista de fechas por di
}

function result_list_a() {
	this.listatamaño = 0;
	this.clave = 0001;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}

