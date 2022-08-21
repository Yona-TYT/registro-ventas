
var save_expdate = new Array();
var save_expdate_cell = new Array();

var fila_selec = new Array(3);
var col_selec = new Array(6);

//Necesitan guardarse ---------------------------------------
var doc_siz_fila = 0;
var doc_siz_col = 0;
var table_col = 7;
var table_fila = 10;

var save_id_filas = new Array(); 
var save_id_colum = new Array();
var save_celda = new Array();
var save_id = new Array();
//-------------------------------------------------------

var edit_mode = false;

var current_element = null;
var current_key = null;
var gloval_test = "";

// Datos generales
var gl_general = new general_datos();

var gl_result = new prod_detalles();

//Datos de los productos
var gl_products = new reg_products();

var start_one = true;
var is_start = true;


//Unidades fijas -------------
var gl_mon_a = "Bs";
var gl_mon_b = "$";
//---------------------------


function add_message(text)
{
	alert(text);
}

function notSupported(){ alert("El navegador no lo soporta."); }


function click_test(){
	for(var j = 0; j<5 && cop_list[j]; j++){
			console.log(""+cop_list[j].start+" :: "+j+" :: "+cop_list[j].index[0] +" :: "+cop_list[j].num[0])
	}

	//var result = new result_list();
	//agregar_producto(result);

	//get_celda_value(table_fila,table_col);
	//gloval_test += "input "+document.getElementById("input0").value;

	//create_table(table_fila,table_col);
	
      //for (var j = 0; j < save_expdate.length; j++) {

		//gloval_test += " ["+save_expdate[0][j]+"] ";
		//gloval_test += " ["+save_expdate[1][j]+"] ";
		//gloval_test += " ["+save_expdate[2][j]+"] ";
		//gloval_test += " ["+save_expdate[3][j]+"] ";
     //}
		//setCaretPosition("inputest", 5);
	//add_message(gloval_test);
	//gloval_test ="";

	//get_celda_value(table_fila,table_col);
//var gl_products.list_prda_ventas = new reg_ventas();
	//	agregarventas(gl_products.list_prda_ventas);

}

//contador para esperar mientras los valores se cargan
var segundos = 0;
// var contador = setInterval(cambio_valor, 1000);
var cont_sw = true;

function cursor_en_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_selec_style");
}

function cursor_no_fila(id)
{
	var fila = document.getElementById("fila"+id);
	fila.setAttribute("class","fila_style");
}

function cursor_en_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_selec");
}

function cursor_no_button(id)
{
	var butt = document.getElementById(id);
	butt.setAttribute("class","input_style_td");
}

function init(){

	check_windows_siz();

	create_table_rv();

	//Iniciaaliza la base de datos
	set_basededatos("registroventas6");

	//Leer documentos tipo hojas de datos
	importar_datos();

	//Tabal vista previa de documentos
	table_preview_ex()

	//Solo visible la tabla de lista
 	visible_element(1);

	example_preview();

	//Comprueba y activa/desactiva el modo editor
	check_edit_mode();
	activadesactiva_editmode();
	//-------------------------------------------

	//Crea la tabla de lista productos
	create_table();

	//Crea la tabla de Registro de productos
	create_table_rp();

	var boton = document.getElementById("load_start");
	//boton.addEventListener("click", agregar_producto);
	//boton.addEventListener("focus", cambio_valor);
}

window.addEventListener("resize", check_windows_siz);

window.addEventListener("keypress", function() {
	var key = window.event.key;

	current_key = key;
	//add_message("");
	var input = document.activeElement;
	var class_name = input.className;

	//console.log("key"+class_name);
	if(class_name == "input_style_visible"){
		return soloNumeros(event);
	}
});

window.addEventListener("keyup", function() {
	var input = document.activeElement;
	var class_name = input.className;

	current_key = null;
	if(class_name == "input_style_visible"){
		input.addEventListener("keyup", function(){ 
		return soltar_tecla(event);
		}, false);
	}

var key = window.event.key;
if(key == "Enter"){
	var id_name = input.id;
			//add_message(id_name);
	if(id_name.includes("input")){
		var class_name = input.className;
		//add_message(class_name);
		if(class_name == "input_style_visible"){
			ocultar_input()
		}
	}
	input.blur();
}

if(key == "Tab"){
	var id_name = input.id;
	//id_name = id_name.replace("text_mask", "input"); //remplaza  palabaras en cadenas de texto
	//add_message(id_name);
	var mask = document.getElementById(id_name.replace("input", "text_mask"));
	if(mask && id_name.includes("input")){
		input.setAttribute("class","input_style_hidden");
		mask.setAttribute("readwrite", "");
		mask.focus();
	}
}
});

//Solo permite introducir números.
function soloNumeros(e){
	var input_test = document.getElementById("inputest");

	var input = document.activeElement;
	var num = input.value;
    var key = window.event ? e.which : e.keyCode;
	if(key == 46){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes(".")){
			return null;
		}	
	}
	else if(key == 45){
		if (num == "")
			return e.preventDefault();

	 	else if(!num.includes("-")){
			return null;
		}
	}

    if (key < 48 || key > 57) {
        //Usando la definición del DOM level 2, "return" NO funciona.
        e.preventDefault();
    }
}

function soltar_tecla(e){
	var key = window.event.key;
	//add_message(key);
	if(key == "."){
		var input_test = document.getElementById("inputest");

		var input = document.activeElement;
		var num = input.value;
	 	if (!num.includes(".")){
			input.value = remplace_test(num);
			//input.value = parseFloat(input.value).toFixed(2);
			return null;
		}
	}
}

function remplace_test(num) {
	//num = num.replace(/(\.)(\d){2,}/g, 128);
	 num = num.replace(/($)/g, ".00");
	 //num.replace(/\.$/, "128");
	// num.replace(/[\.]$/, 128);
	//add_message(num);
	return num;
}


