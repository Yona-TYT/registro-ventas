
function create_table_rv(){

	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Producto", "Cant. Dispon.", "En Dolar", "En Bs", "Cant. Venta", "Accion"];
	var name_siz = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("sect_rv");

	sect_table.innerHTML = "";

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table_rv");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	var siz_col = gl_mobil? 2:name_siz;
	var siz_fil = gl_mobil? name_siz:5;
	for (var j = 0; j < siz_fil; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "filarv"+j);

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < siz_col; i++) {

			var siz_f = gl_mobil?i:j;
			var siz_c = gl_mobil?j:i;
			var celda_id = siz_f+""+siz_c;
			
			//Cuadros de nombres de columnas
			if(siz_f==0){
				var celda = document.createElement("td");

				celda.setAttribute("id", "celdrv"+celda_id)
				celda.setAttribute("class","celda_style");

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "inputrv"+celda_id);
				input.setAttribute("type", "text");
				input.setAttribute("value", name_cel[siz_c]);
				input.setAttribute("readonly", "");
				input.setAttribute("class","colum_name_style");
				celda.appendChild(input);
			
				fila.appendChild(celda);

			}
			//--------------------------------------------------------------------------------------------------
			else if(siz_f>0){
				//lista_tx += add_text_fila(siz_f);
				var celda = document.createElement("td");
				celda.setAttribute("id", "celdrv"+celda_id)
				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "rvinput"+celda_id);
				//Cuadros de cantidad
				if (siz_c==4){
					input.setAttribute("class","input_style_visible");
					input.setAttribute("type", "number");
					input.setAttribute("step", "any");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}

				//Cuadros de solo lectura
				else if (siz_c != 5){
					input.setAttribute("class","input_style_td");
					input.setAttribute("class","input_style_td");
					input.setAttribute("type", "text");
					input.setAttribute("readonly", "");
					celda.appendChild(input);
				}
				//Boton de accion
				if(siz_c==5){
					celda.setAttribute("class", "button_style_r");
					var button = document.createElement("button");
					button.setAttribute("class", "mask_style");
					button.setAttribute("type", "button");
					button.innerHTML= "Registrar";
					button.setAttribute("onclick","button_reg_venta("+siz_f+");");
					button.setAttribute("id", "buttrv"+siz_f+"5");
					celda.appendChild(button);
				}
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	return null;
}

function create_table_lp(){

	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Nombre", "Cantidad", "Ganancia C/U", "Precio (Entrada)", "Precio (Salida)", "Activ/Desact"];
	var name_siz = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("sect_lp");

	sect_table.innerHTML = "";

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table_lp");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	var siz_col = gl_mobil? 2:name_siz;
	var siz_fil = gl_mobil? name_siz:2;
	for (var j = 0; j < siz_fil; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "filalp"+j);

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < siz_col; i++) {

			var siz_f = gl_mobil?i:j;
			var siz_c = gl_mobil?j:i;
			var celda_id = siz_f+""+siz_c;
			
			//Cuadros de nombres de columnas
			if(siz_f==0){
				var celda = document.createElement("td");
				celda.setAttribute("id", "celdlp"+celda_id)
				celda.setAttribute("class","celda_style");

				if(siz_c < name_siz){
					// Creamos 2 elementos de entrada
					var input = document.createElement("input");
					input.setAttribute("id", "inputlp"+celda_id);
					input.setAttribute("type", "number");
					input.setAttribute("step", "any");
					var tex_mask = document.createElement("input");
					input.setAttribute(edit_mode?"readwrite":"readonly", "");

					tex_mask.setAttribute("readonly", "");
					tex_mask.setAttribute("class", "input_style_edicion_td");

					input.setAttribute("type", "text");
					input.setAttribute("value", name_cel[siz_c]);
					input.setAttribute("readonly", "");
					input.setAttribute("class","colum_name_style");

					celda.innerHTML= input.outerHTML;
				
				}
				if(gl_mobil) celda.style.width = "300px"
				fila.appendChild(celda);
			}
			//--------------------------------------------------------------------------------------------------

			else if(siz_f==1){
				var celda = document.createElement("td");
				celda.setAttribute("id", "celdlp"+celda_id)

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("type", "number");
				input.setAttribute("step", "any");
				var tex_mask = document.createElement("input");
				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");
				tex_mask.setAttribute("placeholder", "Ingrese Valor");
				input.setAttribute("id", "inputlp"+celda_id);
				siz_c!=4?input.setAttribute("placeholder", "Ingrese Valor"):"";

				//Cuadro De nombres
				if (siz_c==0){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","update_product_cu();");
					input.setAttribute("onkeyup","update_product_cu();");
					input.setAttribute("onchange","update_product_cu();");
					input.setAttribute("type", "text");
					input.setAttribute("onFocus", "ocultar_input();");
					celda.appendChild(input);
				}
				//Cuadro cantidad
				else if (siz_c==1){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","update_product_cu();");
					input.setAttribute("onkeyup","update_product_cu();");
					input.setAttribute("onchange","update_product_cu();");
					input.setAttribute("type", "number");
					input.setAttribute("step", "any");
					input.setAttribute("onFocus", "ocultar_input();");
					celda.appendChild(input);
				}
				//Cuadros de entrada numerica
				else if(siz_c==2 || siz_c==3){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","update_product_cu();");
					input.setAttribute("onkeyup","update_product_cu();");
					input.setAttribute("onchange","update_product_cu();");
					input.setAttribute("onblur",'ocultar_input(\''+true+'\');');
					input.setAttribute("class","input_style_hidden");

					//para la mask del cuadro
					tex_mask.setAttribute("id", "text_masklp"+celda_id);
					tex_mask.setAttribute("onClick", "mostrar_input();");
					tex_mask.setAttribute("onSelect", "mostrar_input();");
					input.setAttribute("onFocus", "ocultar_input();");
					celda.appendChild(tex_mask);
					celda.appendChild(input);
				}
				//Cuadros de solo lectura
				else if (siz_c == 4){
					//console.log("siz: "+input);
					//input.setAttribute("class","input_style_td");
					//input.setAttribute("type", "text");
					//input.setAttribute("readonly", "");
					//input.setAttribute("onFocus", "ocultar_input();");
					//celda.appendChild(input);
					celda.innerHTML = "<input type='text' id='inputlp14' class='input_style_td'  readonly='';>"
				}
				//Boton de Accion
				else if(siz_c==5){
					celda.setAttribute("class", "celda_style_x");
					var button = document.createElement("button");
					button.setAttribute("class","mask_style");
					button.setAttribute("type", "button");
					button.innerHTML= "Activ / Desact";
					button.setAttribute("onclick","remove_product();");
					button.setAttribute("id", "buttlp"+celda_id);
					celda.appendChild(button);
				}
				if(gl_mobil) celda.style.width = "60%";
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	return null;
}



function create_table_rp(){
	//----------------------------------------------------------------
	//Nombre de las celdas value--------------------------------------
	var name_cel = ["Nombre", "Cantidad", "Ganancia C/U", "Precio", "Precio (Salida)", "Accion"];
	var name_siz = name_cel.length;
	//----------------------------------------------------------------

	var sect_table = document.getElementById("sect_rp");

	sect_table.innerHTML = "";

	var tabla = document.createElement("table");
	tabla.setAttribute("id", "table_rp");

	// Creamos un elemento <table> y un elemento <tbody>
	var tblBody = document.createElement("tbody");

	// Creamos las celdas
	var siz_col = gl_mobil? 2:name_siz;
	var siz_fil = gl_mobil? name_siz:2;
	for (var j = 0; j < siz_fil; j++) {
		// Creamos las hileras de la tabla
		var fila = document.createElement("tr");

		fila.setAttribute("id", "filarp"+j);

		var multiplo = (j*table_col);
		save_id_filas[j] = j+multiplo;
		for (var i = 0; i < siz_col; i++) {
			var siz_f = gl_mobil?i:j;
			var siz_c = gl_mobil?j:i;
			var celda_id = siz_f+""+siz_c;
			//Cuadros de nombres de columnas
			if(siz_f==0){
				var celda = document.createElement("td");

				celda.setAttribute("id", "celdrp"+celda_id)
				celda.setAttribute("class","celda_style");

				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("id", "inputrp"+celda_id);
				input.setAttribute("type", "number");
				input.setAttribute("step", "any");
				var tex_mask = document.createElement("input");
				input.setAttribute(edit_mode?"readwrite":"readonly", "");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");

				input.setAttribute("type", "text");
				input.setAttribute("value", name_cel[siz_c]);
				input.setAttribute("readonly", "");
				input.setAttribute("class","colum_name_style");
				celda.innerHTML= input.outerHTML;
			
				fila.appendChild(celda);

			}
			//--------------------------------------------------------------------------------------------------
			else if(siz_f==1){
				var celda = document.createElement("td");
				celda.setAttribute("id", "celdrp"+celda_id);
				// Creamos 2 elementos de entrada
				var input = document.createElement("input");
				input.setAttribute("type", "number");
				input.setAttribute("step", "any");
				var tex_mask = document.createElement("input");

				tex_mask.setAttribute("readonly", "");
				tex_mask.setAttribute("class", "input_style_edicion_td");
				tex_mask.setAttribute("placeholder", "Ingrese Valor");

				input.setAttribute("id", "inputrp"+celda_id);
				input.setAttribute("placeholder", "Ingrese Valor");

				//Cuadro De nombres
				if (siz_c==0){
					input.setAttribute("class","input_style_td");
					input.setAttribute("class","input_style_edicion_td");
					input.setAttribute("type", "text");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}
				//Cuadro cantidad
				if (siz_c==1){
					input.setAttribute("class","input_style_td");
					input.setAttribute("class","input_style_edicion_td");
					input.setAttribute("type", "number");
					input.setAttribute("step", "any");
					celda.appendChild(input);
					input.setAttribute("onFocus", "ocultar_input();");
				}
				//Cuadros de entrada numerica
				if(siz_c==2 || siz_c==3){
					input.setAttribute("class","input_style_td");
					input.setAttribute("onclick","get_celda_value_rp();");
					input.setAttribute("onkeyup","get_celda_value_rp();");
					input.setAttribute("onchange","get_celda_value_rp();");
					input.setAttribute("onblur",'ocultar_input(\''+true+'\');');

					input.setAttribute("class","input_style_hidden");

					//para la mask del cuadro
					tex_mask.setAttribute("id", "text_maskrp"+celda_id);
					celda.appendChild(tex_mask);
					celda.appendChild(input);

					var total_id_a = j;
					var total_id_b = multiplo;
					tex_mask.setAttribute("onClick", "mostrar_input();");
					tex_mask.setAttribute("onSelect", "mostrar_input();");
					input.setAttribute("onFocus", "ocultar_input();");

				}
				if(siz_c==4){
					celda.innerHTML = "<input type='text' id='inputrp14' class='input_style_td' readonly='';>"
				}
				if(siz_c==5){
					celda.setAttribute("class", "button_style_r");
					var button = document.createElement("button");
					button.setAttribute("class", "mask_style");
					button.setAttribute("type", "button");
					button.innerHTML= "Registrar";
					button.setAttribute("onclick","guardar_rp();");
					button.setAttribute("id", "buttrp"+j);
					celda.appendChild(button);
				}
				fila.appendChild(celda);
			}
		}
		tblBody.appendChild(fila);
	}

	// posicionamos el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);

	sect_table.appendChild(tabla);  ///innerHTML = tabla.innerHTML;

	return null;
}

