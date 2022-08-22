
var bd;	//Para la base de datos

function set_basededatos(name)
{
	var solicitud = indexedDB.open(name, 3);
	solicitud.addEventListener("error", mostrarerror);
	solicitud.addEventListener("success", comenzar);
	solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
	alert("Error: tyt tyt " + evento.code + " " + evento.message);
}
function comenzar(evento) {

	bd = evento.target.result;
	var clave = 0;					//Siempre sera 0
	mostrar_general(clave);			//Se cargan los datos generales guardados
}

//Se crean todos los almacenes
function crearbd(evento) {
	var basededatos = evento.target.result;

	//Guarda los datos generales
	var alma_general = basededatos.createObjectStore("general_datos", {keyPath:"id", autoIncrement: true});
	alma_general.createIndex("buscarnombre", "nombre", {unique: true});

	//Guarda lista de Productos
	var alma_productos = basededatos.createObjectStore("productos_lista", {keyPath:"id", autoIncrement: true});
	alma_productos.createIndex("buscarnombre", "nombre", {unique: true});

	//Guarda lista de Clientes
	//var alma_nombreslista = basededatos.createObjectStore("nombre_saves", {keyPath:"id", autoIncrement: true});
	//alma_nombreslista.createIndex("buscarnombre", "nombre", {unique: true});

	//Guarda los registros de ventas
	var alma_ventas = basededatos.createObjectStore("ventas_saves", {keyPath:"id", autoIncrement: true});
	alma_ventas.createIndex("buscarnombre", "nombre", {unique: true});

	//Guarda el Historial
	var alma_history = basededatos.createObjectStore("history_data", {keyPath:"id", autoIncrement: true});
	alma_history.createIndex("buscarnombre", "nombre", {unique: true});

}

//Guarda los datos generales
function agregar_gene_datos(datos) {
	var transaccion = bd.transaction(["general_datos"], "readwrite");
	var almacen = transaccion.objectStore("general_datos");
	var solicitud = almacen.put({id: datos.clave, datos_gene: datos});
}

//Guarda los datos de la venta
function agregar_ventas(data) {
	var transaccion = bd.transaction(["ventas_saves"], "readwrite");
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.put({id: data.clave, rventas: data});
}

//Guarda los datos para controlar el historial
function agregar_his_data(data) {
	var transaccion = bd.transaction(["history_data"], "readwrite");
	var almacen = transaccion.objectStore("history_data");

	var solicitud = almacen.put({id: data.clave, data_his: data});
}

//Guarda los productos en las listas
function agregar_producto(data) {
	var transaccion = bd.transaction(["productos_lista"], "readwrite");
	var almacen = transaccion.objectStore("productos_lista");
	var solicitud = almacen.put({id: data.clave, products: data});
}

//----------------------------------------------------------------------------------------------------------------------------------------

//Manejo de datos generales -----------------------------------------
function mostrar_general(clave) {
	var transaccion = bd.transaction(["general_datos"]);
	var almacen = transaccion.objectStore("general_datos");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_general);
	
}

function obtener_general(evento) {
	var resultado = evento.target.result;

	if(resultado){
		gl_general = resultado.datos_gene;

		var hoy = new Date();
		var curr_fecha = hoy.getDate()+ "-" + ( hoy.getMonth() + 1 ) + "-" + hoy.getFullYear();
		check_current_fech(curr_fecha); // Compara las fechas y determina si es un dia nuevo

		gl_currt_list_selec = gl_general.sel_list;
		mostrar_producto(gl_currt_list_selec);
		mostrar_ventas(gl_general.clv_max);

		crear_datalist(gl_general.nomblist, "list_datacl");

		load_general_data();	//Se cargan precios del dolar y margen de ganancia

	}
	else {
		preloder_filtro_lista();
		mostrar_producto(gl_currt_list_selec);
	}
}

//-----------------------------------------------------------------------------------------------------------

// Manejos de las listas de productos------------------------------------------------------------------------
function mostrar_producto(clave) {
	var transaccion = bd.transaction(["productos_lista"]);
	var almacen = transaccion.objectStore("productos_lista");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_producto);

}

function obtener_producto(evento) {
	var resultado = evento.target.result;
	if(resultado){
		gl_products = resultado.products;
		crear_datalist(gl_products.list_prd.nombre, "listproducts");
		//console.log(""+gl_products.nombre[0]+" ??  " );
	}
	else {
		gl_products = new reg_products();
		crear_datalist(gl_products.list_prd.nombre, "listproducts");
	}
	preloder_filtro_lista();
	ventas_main();

}

//Funcion experimental para descontar/reintegrar productos -----------------------------------------------------------------
function mostrar_prod_opt(max) {
	//console.log(" max:: "+max)
	var transaccion = bd.transaction(["productos_lista"]);
	var almacen = transaccion.objectStore("productos_lista");
	for(var j = max; j>=0; ){
		if(!cop_list[j]){
			j--;
			continue;
		}
		//console.log(""+cop_list[j].start+" :: "+j+" :: "+cop_list[j].index[0] +" :: "+cop_list[j].num[0])
		var solicitud = almacen.get(j);
		solicitud.addEventListener("success", function(){obtener_prod_opt(event, j);});
		break;
	}
}

function obtener_prod_opt(evento, max) {
	var resultado = evento.target.result;
	if(resultado){
		var produc = resultado.products;
		var list = cop_list[produc.clave];
		for(var j=0; j<list.index.length;j++) {
			var can = parseFloat(produc.list_prd.cantidad[list.index[j]]);
			var num = parseFloat(list.num[j]);
			produc.list_prd.cantidad[list.index[j]] = (can + num);
			//console.log(""+list.index[j]+" :: "+list.num[j] +" :: "+can)
		}
		agregar_producto(produc);
		max--;
		mostrar_prod_opt(max);
		//console.log("-- "+max)
		if(max<0){
			cop_list = new Array();	//Se restaura la copia temporal de descuento producto
			mostrar_producto(gl_currt_list_selec);
		}
	}
}
//------------------------------------------------------------------------------------------------

//Manejo de datos desde la venta y al inicio -----------------------------------------------------
function mostrar_ventas(clave) {
	var transaccion = bd.transaction(["ventas_saves"]);
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_ventas);
	
}

function obtener_ventas(evento) {
	var resultado = evento.target.result;
	var index = gl_hist_date.index;
	var fecha = gl_hist_date.fecha;
	var curr_id = gl_hist_date.save_id;

	if(resultado){
		gl_lista_ventas = resultado.rventas;
		gl_hist_save = resultado.rventas;
	}
	preloder_filtro_fec();
	selec_fechas("selchisfec", false);
	var nr = gl_hist_save.index;
	for (var j = nr-1;  j >= 0; j--) {
		crear_historial(j);
	}

}
//----------------------------------------------------------------------

//Manejo de datos desde el selector de fechas -----------------------------------------
function mostrar_selec_hist(clave) {
	var transaccion = bd.transaction(["ventas_saves"]);
	var almacen = transaccion.objectStore("ventas_saves");
	var solicitud = almacen.get(clave);
	solicitud.addEventListener("success", obtener_selec_hist);	
}

function obtener_selec_hist(evento) {
	var resultado = evento.target.result;
	gl_hist_save = new reg_ventas();

	//console.log(gl_hist_date.save_id);	
	if(resultado){
		//var id = resultado.id;
		gl_hist_save = resultado.rventas;
		var nr = gl_hist_save.index;
		for (var j = nr-1;  j >= 0; j--) {
			crear_historial(j);
		}		
	}
}
//===========================================================================================

//Eliminar objetos de la base de datos ------------------------------------------------------
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
//Datos generales
function general_datos() {
	this.clave = 0;						//Clave para guardar/cargar el registro
	this.cu_save_id = 0;				//Clave clave mayor para el registro cuentas
	this.cl_save_id = 0;				//Clave clave mayor para el registro clientes
	this.demo = null;

	//Guarda valor de input bolivares y margen
	this.gen_bs = 0;
	this.gen_margen = 0;

	//Guarda el estado de selector
	this.sel_list = 0;
	this.sel_hist = 0;

	//Controles de fechas por dia
	this.clv_max = 0;					//Clave actual, va icrementando por dias
	this.fecha = null;					//Fecha actual
	this.fechalist = new Array(); 		//Lista de fechas, cada dia agg una nueva fecha

	//Validadores de Fechas
	this.hour = null;
	this.day = null;
	this.month = null;
	this.year = null;

	//Se registran los nombres de lista de productos
	this.list_nam = ["Liata Numero 1", "Liata Numero 2", "Liata Numero 3", "Liata Numero 4", "Liata Numero 5", "Liata Numero 6"];

	//Lista de clientes en datalist
	this.indexnomb = 0;
	this.nomblist = new Array();
}

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

	//Validadores de Fechas
	this.hour = null;
	this.day = null;
	this.month = null;
	this.year = null;
}

//Detalles de las ventas
function reg_ventas() {
	this.clave = 0;
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

//Lista de productos
function reg_products() {
	this.list_id = [0, 1, 2, 3, 4, 5];
	this.list_prd = new prod_detalles();
	this.clave = 0;
}
// Copia de Lista de productos
function cop_products() {
	this.start = false;

	this.index = new Array();
	this.num = new Array();

	this.list_prd = new prod_detalles();
	this.clave = 0;
}

function history_data() {
	this.clave = 0;
	//Control de history_save()
	this.index = 0;					//Index actual (Va incrementando por operacion, regresa a 0 por dia)
	this.fecha = null;				//Fecha actual
	this.save_id = 0;				//ID actual (Va incrementando por dia)
	this.fechalist = new Array(); 	//Lista de fechas por di
}

function prod_detalles() {
	this.listatamaño = 0;
	this.nombre = new Array();
	this.cantidad = new Array();
	this.margen = new Array();
	this.precio = new Array();
}
