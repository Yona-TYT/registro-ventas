
var cajadatos, bd;
var claveventa = 001;

function set_basededatos(name)
{
	cajadatos = document.getElementById("cajadatos");
	var solicitud = indexedDB.open(name, 5);
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
	mostrar_ventas(claveventa);


	//Test lista de productos
	gl_selc = parseInt(current_select);
	gl_list[gl_selc] = new result_list_a();
	start_one = true;
	mostrar_lista(gl_selc);
	var list_id = gl_listname.list_id;
	for (var j = 0; j < list_id.length && j != gl_selc; j++) {
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

}

function enviar_index() {
	//var result = new result_list();

	var nombre_id = 2+""+1;
	var cantidad_id = 2+""+2;
	var margen_id = 2+""+5;
	var precio_id = 2+""+6;

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

function agregarventas(ventas) {

	var transaccion = bd.transaction(["ventas_saves"], "readwrite");
	var almacen = transaccion.objectStore("ventas_saves");

	var solicitud = almacen.put({
							id: claveventa, rventas: ventas
				});

}

function agregarnombres(names) {

	var transaccion = bd.transaction(["nombre_saves"], "readwrite");
	var almacen = transaccion.objectStore("nombre_saves");

	var solicitud = almacen.put({
							id: names.clave, nombrelista: names
				});

}

function agregarobjeto(result, clave, opt) {
	var transaccion = bd.transaction(["nombre_lista"], "readwrite");
	var almacen = transaccion.objectStore("nombre_lista");
	//transaccion.addEventListener("complete", mostrar_lista);
	transaccion.addEventListener("complete", function() {
		mostrar_lista(clave);
	});
	transaccion.addEventListener("error", function() {
		mostrar_lista(clave);
	});
	//transaccion.addEventListener("error", mostrar_lista);

	if (opt == 0){
		var solicitud = almacen.add({
									id: clave, datos: result
						});
	}
	if (opt == 1){
		var solicitud = almacen.put({
									id: clave, datos: result
						});
	}
}
function mostrar_lista(clave) {

	var transaccion = bd.transaction(["nombre_lista"]);
	var almacen = transaccion.objectStore("nombre_lista");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", function(evento) {
		var resultado = evento.target.result;

		if(resultado){

		//console.log("tes clave"+clave + " "+resultado.datos.listatamaño + "" +start_one)
				resultado.datos.listatamaño != null? gl_list[parseInt(clave)] = resultado.datos : gl_list[parseInt(clave)] = new result_list_a();
				//console.log("test "+gl_list[clave].nombre[0]);
				if (start_one){

					load_save_data();
				}

		}
	});
	//solicitud.addEventListener("success", obtener_lista);
	
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
	preloder_selec_list("selectlistaname");
	
}
//----------------------------------------------------------------------

//Se obtine la lista de ventas -----------------------------------------
function mostrar_ventas(clave) {
	//cajadatos.innerHTML = "";
	var transaccion = bd.transaction(["ventas_saves"]);
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_ventas);
	
}

function obtener_ventas(evento) {
	var resultado = evento.target.result;
	if(resultado){
		gl_lista_ventas = resultado.rventas;

		crear_lista_cl();

		var hoy = new Date();
		var index = gl_lista_ventas.index;
		var indexfec = gl_lista_ventas.indexfec;
		var fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();
		var fechalist = gl_lista_ventas.fechalist[indexfec];

		if(fechalist != fecha) {

			if(!fechalist) {

				gl_lista_ventas.indexstart[indexfec] = index;
				gl_lista_ventas.fechalist[indexfec] = fecha;
			}

			else{
				indexfec++
				gl_lista_ventas.indexstart[indexfec] = index;
				gl_lista_ventas.indexfec = indexfec;
				gl_lista_ventas.fechalist[indexfec] = fecha;
			}
		}
		preloder_filtro_fec();
		selec_fechas("selchisfec");
	}
}
//----------------------------------------------------------------------

function all_ventas() {
	this.indexnomb = 0;
	this.nombrecl = new Array();

	this.indexfec = 0;
	this.fechalist = new Array();

	this.indexstart = new Array();
	this.indexend = new Array();

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
	this.clave = 0001;
	this.genmargen = 0;
	this.genprecio = 0;
}

function result_list_a() {
	this.listatamaño = 10;
	this.clave = 0001;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
function result_list_b() {
	this.listatamaño = 10;
	this.clave = 0002;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
function result_list_c() {
	this.listatamaño = 10;
	this.clave = 0003;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
function result_list_d() {
	this.listatamaño = 10;
	this.clave = 0004;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
function result_list_e() {
	this.listatamaño = 10;
	this.clave = 0005;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}

