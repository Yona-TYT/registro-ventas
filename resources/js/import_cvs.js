
var gl_save_list = new save_list_ex();

var gl_type = [	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"application/vnd.ms-excel.sheet.macroEnabled.12", "application/vnd.ms-excel",
				"text/csv", "text/comma-separated-values"
			];

function importar_main() {
	//importar_simple_list();
	impor_chag_mode();

	var input_advan = document.getElementById("advan_mode");
	input_advan.addEventListener("change", function(){
		impor_chag_mode();
	});

	// Modo simple
	var simp_file = document.getElementById("file_simp");
	importar_simp_list(simp_file);
	simp_file.addEventListener("change", function(){importar_simp_list(simp_file)});

	// Modo avanzado
	var adv_file = document.getElementById("archivos");
	importar_advan_list(adv_file);
	adv_file.addEventListener("change", function(){importar_advan_list(adv_file)});

	var selec = document.getElementById("startfila");
	selec.addEventListener("change", function(){importar_advan_list(adv_file)});
}

function impor_chag_mode() {
	sec1 = document.getElementById("sec_import1");
	sec2 = document.getElementById("sec_import2");

	var input_advan = document.getElementById("advan_mode");
	if(input_advan.checked) {
		sec1.setAttribute("class","element_style_hidden");
		sec2.setAttribute("class","cajas_style");	
	}
	else {
		sec1.setAttribute("class","cajas_style");
		sec2.setAttribute("class","element_style_hidden");	
	}
}

function importar_simp_list(elem) {
	var butt = document.getElementById("butlistimport");
	butt.disabled = false;
	butt.setAttribute("class", "mask_style");

	var file_date = elem.files[0];
	if(file_date){
		var current_type = file_date.type;
		//console.log(current_type);
		if(current_type == gl_type[3] || current_type == gl_type[4]){
			Papa.parse(file_date,{
				config: {
					delimiter: ";"
				},
				complete: function(results) {
					save_exp_date(results.data);
					//console.log("Finished:",results.data);
				}
			});
		}
		if(current_type == gl_type[0] || current_type == gl_type[1] || current_type == gl_type[2]){
			var reader = new FileReader();
			reader.readAsArrayBuffer(file_date);
			reader.onload = function(e) {
				var data = new Uint8Array(reader.result);
				var wb = XLSX.read(data,{type:'array'});
				var htmlstr = XLSX.write(wb,{sheet:wb.SheetNames[0], type:'binary',bookType:'csv'});
				Papa.parse(htmlstr,{
					config: {
						delimiter: ";"
					},
					complete: function(results) {
						save_exp_date(results.data);
					}
				});
			}
		}
	}
}


function importar_advan_list(elem) {
	var butt = document.getElementById("butsavelist");
	butt.disabled = false;
	butt.setAttribute("class", "mask_style");

	var file_date = elem.files[0];
	if(file_date){
		var current_type = file_date.type;
		//console.log(current_type);
		if(current_type == gl_type[0] || current_type == gl_type[1] || current_type == gl_type[2]){
			var reader = new FileReader();
			reader.readAsArrayBuffer(file_date);
			reader.onload = function(e) {
				var data = new Uint8Array(reader.result);
				var wb = XLSX.read(data,{type:'array'});
				var htmlstr = XLSX.write(wb,{sheet:wb.SheetNames[0], type:'binary',bookType:'csv'});
				Papa.parse(htmlstr,{
					config: {
						delimiter: ";"
					},
					complete: function(results) {
						save_exp_date(results.data);
						mostrar_tabla();
					}
				});
			}
		}
		if(current_type == gl_type[3] || current_type == gl_type[4]){
			Papa.parse(file_date,{
				config: {
					delimiter: ";"
				},
				complete: function(results) {
					save_exp_date(results.data);
					//console.log("Finished:",results.data);
					mostrar_tabla();
				}
			});
		}
	}
}

function mostrar_tabla() {
	var select = document.getElementById("startfila");
	var st_value = select.options[select.selectedIndex];
	var start = parseInt(st_value.value);
	//console.log("Ddd"+start);
	for (i = 0; i < 4; i++) {
        for (j = 0; j <7 && save_expdate[i+start]; j++) {
			var celda = document.getElementById("celda01"+i+j);
			var save = save_expdate[i+start][j];
			if(save){
				celda.innerHTML = save;
			}
			else celda.innerHTML = "";
		}
    }
}

var save_expdate = new Array();

function save_exp_date(results) {
    var data = results
	save_expdate = new Array();
	doc_siz_fila = data.length;
	gl_save_list.filas = data.length;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var cells = row.join(",").split(",");
		save_expdate[i] = new Array();
        for (var j = 0; j < cells.length; j++) {

			if(cells[j].includes("ï»¿"))
				cells[j] = cells[j].replaceAll("ï»¿", "");

			if(cells[j].includes("Ã")){
				cells[j] = cells[j].replaceAll("Ã", "Ñ");
				cells[j] = cells[j].replaceAll("Ã³", "ó");
				cells[j] = cells[j].replaceAll("Ã", "Ó");
			}
			if(cells[j].includes("ã"))
				cells[j] = cells[j].replaceAll("ã", "ñ");

			save_expdate[i][j] = cells[j];	
        }
		if(i==0)
		doc_siz_col = cells.length;
    }
}

var gl_result_temp = new Array();

var timeoutID;
function start_read_list() {
	var butt = document.getElementById("butlistimport");
	butt.disabled = true;
	butt.setAttribute("class", "button_style_disable");
	timeoutID = setTimeout(recovery_simple_list, 100);
}

function recovery_simple_list() {
	 clearTimeout(timeoutID);

	//Limpia la lista anterior
	remove_all_product();

	var siz = save_expdate.length;
	var index = 0;
	var margen = save_expdate[0][5];
	margen = parseFloat(margen)? parseFloat(margen):0;
    for (var i = 1; i < siz ; i++) {
		if(save_expdate[i][0] == "")
			continue;

		var product = new reg_curr_prod();
		var curr_prod = new r_product();

		product.active = true;
		product.nombre = save_expdate[i][0];
		product.cantidad = get_string_num(""+save_expdate[i][1]);
		product.margen = get_string_num(""+save_expdate[i][2])
		product.precio = get_string_num(""+save_expdate[i][3])

		//Guarda y agg productos
		curr_prod.id = index;
		curr_prod.products = product;
		agregar_all_producto(curr_prod);

		gl_result_temp.push(curr_prod);
		index++;

	}
	if(siz > 0){
		gl_products = gl_result_temp;

		//crea las listas de productos -------------------------------
		crear_lista_productos();
		//------------------------------------------------------------

		gl_general.gen_margen = margen;
		agregar_gene_datos(gl_general);

		//Margen de ganancias
		var celd_margen = document.getElementById("input04");
		var celd_margen_mask = document.getElementById("text_mask04");
		celd_margen.value = margen;
		celd_margen_mask.value = get_mask_simple(margen,"%");

		gl_result_temp = new Array();
		alert("Lista Guardada Correctamente.");
		reset_inputs_lp();
		reset_inputs_rv();

		var butt = document.getElementById("butlistimport");
		butt.disabled = false;
		butt.setAttribute("class", "mask_style");
	}
	else {
		alert("La Lista esta Vacia!.");
		gl_result_temp = new Array();
	}
}
function get_string_num(text) {
	var tx = "";
	var punto = true;
	for (var j = 0; j < text.length; j++) {
		if(parseInt(text[j]) || text[j] == "0"){
			tx += text[j];
			continue;
		}
		if( text[j] == "." && punto){
			tx += text[j];
			punto = false;
			continue;
		}
	}
	//console.log("Este es el bueno : " +tx);
	return parseFloat(tx)? parseFloat(tx) : 0;
}

function recovery_data() {

	//Limpia la lista anterior
	remove_all_product();

	var butt = document.getElementById("butsavelist");
	butt.disabled = true;
	butt.setAttribute("class", "button_style_disable");

	gl_result_temp = new Array();

	var select = document.getElementById("listbasedato");

	var current_opt = select.options[select.selectedIndex];
	var clave = current_opt.value;

	gl_result_temp.listatamaño=doc_siz_fila;

	var index = gl_save_list.start_filas_index;
	//console.log(index);
	var num = 0;
	for (var i = index; (save_expdate[0] && i < doc_siz_fila ); i++) {
		var product = new reg_curr_prod();
		var curr_prod = new r_product();

		product.active = true;
		product.margen = 0;		
		for (var j = 0;( j < save_expdate[0].length); j++) {

			if(j == gl_save_list.nombre_index){
				product.nombre = save_expdate[i][j];
			}
			if(j == gl_save_list.cantida_index){
				product.cantidad = get_string_num(""+save_expdate[i][j]);
			}
			if(j == gl_save_list.precio_index){
				product.precio = get_string_num(""+save_expdate[i][j]);
			}
			//console.log(gl_result_temp.precio[i]);

        }
		//Guarda y agg productos
		if(product.nombre != ""){
			console.log(product.cantidad)
			curr_prod.id = num;
			num++;
			curr_prod.products = product;
			agregar_all_producto(curr_prod);

			gl_result_temp.push(curr_prod);
		}
    }
	remove_empy_name();			//Quita filas con nombres vacios
	var opt = 1;
	start_one = true;

	gl_products = gl_result_temp;

	//crea las listas de productos -------------------------------
	crear_lista_productos();
	//------------------------------------------------------------

 	reset_preview();
	gl_result_temp = new Array();
	save_expdate = new Array;
	alert("Lista Guardada Correctamente.");
	reset_inputs_lp();
	reset_inputs_rv();

	butt.disabled = false;
	butt.setAttribute("class", "mask_style");
}

function remove_empy_name(){
	var siz = gl_result_temp.length;
    for (var j = 0;j<siz ; j++) {
		var nombre = gl_result_temp[j].products.nombre;
		if(nombre && nombre.length==0){
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
			gl_result_temp.splice(j, 1);
		}
	}
}

