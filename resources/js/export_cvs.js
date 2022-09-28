

function hist_datos_to_csv() {

	var ventas = crear_array_ventas();

	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "";
		contenido += ventas.join(";") ;			//Se agregan datos de ventas

		//Se envian los datops para ser guardados
		file_name = "Historial";
		start_save(ventas, file_name);
	}
	else {
		alert("Su navegador no permite esta acción");
	}
}

function produ_datos_to_csv() {

	var produ = crear_array_produ();

	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "";
		contenido += produ.join(";") ;			//Se agregan datos de ventas
		
		//Se envian los datops para ser guardados
		file_name = "Lista_Guardada";
		start_save(produ, file_name);
	}
	else {
		alert("Su navegador no permite esta acción");
	}
}

function start_save(text, name) {
	//console.log(hash);
	var contenido = "", d = new Date(), blob, reader, save, clicEvent, tx_name = name;
	//creamos contenido del archivo
	contenido += text.join(";") ;			//Se agregan datos de ventas

	const regex_a = /(\r\n|\r|\n)\;/ig;		//Exp Regula, indica un salto de linea seguido de ;
	contenido = contenido.replaceAll(regex_a, '\n');

	//console.log(""+contenido);
	//return null;
	//creamos el blob
	blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
	//creamos el reader
	var reader = new FileReader();


	reader.onload = function (event, name) {
		//console.log(""+tx_name);
		//escuchamos su evento load y creamos un enlace en dom
		save = document.createElement('a');
		save.href = event.target.result;
		save.target = '_blank';
		//aquí le damos nombre al archivo
		save.download = tx_name + "_"+ d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + "_(" + d.getHours() + "," + d.getMinutes() + "," + d.getSeconds()+").csv";
		try {
			//creamos un evento click
			clicEvent = new MouseEvent('click', {
				'view': window,
				'bubbles': true,
				'cancelable': true
			});
		} catch (e) {
			//si llega aquí es que probablemente implemente la forma antigua de crear un enlace
			clicEvent = document.createEvent("MouseEvent");
			clicEvent.initEvent('click', true, true);
		}
		//disparamos el evento
		save.dispatchEvent(clicEvent);
		//liberamos el objeto window.URL
		(window.URL || window.webkitURL).revokeObjectURL(save.href);
	}
	//leemos como url
	reader.readAsDataURL(blob);
}

function crear_array_ventas() {
	var result = new Array();
	result.push("Nombre Cliente");
	result.push("Total Venta ("+gl_mon_a+")");
	result.push("Total Venta ("+gl_mon_b+")");
	result.push("Fecha");
	result.push("Hora");
	result.push("Estado");
	result.push("\n");
	for (var j = 0 ; j < gl_ventas_save.pdtindex.length ; j++) {
		result.push(verificar_text(gl_ventas_save.cliente[j]));
		result.push(verificar_text(gl_ventas_save.totaldol[j]));
		result.push(verificar_text(gl_ventas_save.totalbsf[j]));
		result.push(gl_ventas_save.fecha[j]);
		result.push(gl_ventas_save.hora[j]);
		result.push(gl_ventas_save.estado[j]);
		result.push(verificar_text_detall(gl_ventas_save.detalles[j]));

		//Informacion adicional no relevante para el usuario
		/*
		result.push(gl_ventas_save.pdtindex[j]);
		result.push(gl_ventas_save.pdtclave[j]);
		result.push(gl_ventas_save.pdtcantidad[j]);
		result.push(""+gl_ventas_save.pdtdesc[j]);
		*/
		result.push("\n");

	}
	return result;
}

function crear_array_produ() {
	var result = new Array();
	result.push("Nombre");
	result.push("Cantidad");
	result.push("Ganancia (%)");
	result.push("Precio de entrada ("+gl_mon_b+")");
	result.push("Ganancia Global:");
	result.push(gl_general.gen_margen);
	result.push("\n");
	for (var j = 0 ; j < gl_products.length ; j++) {
		var nombre = gl_products[j].products.nombre;
		var cant = gl_products[j].products.cantidad;
		var marg = gl_products[j].products.margen;
		var prec = gl_products[j].products.precio;

		result.push(verificar_text(""+nombre));
		result.push(verificar_text(""+cant));
		result.push(verificar_text(""+marg));
		result.push(verificar_text(""+prec));
		result.push("\n");

	}
	return result;
}

function verificar_text(text) {
	//console.log(text);
	if(text){
		text = text.replaceAll(',', '');
		text = text.replaceAll(';', '');
	}
	else
		text = "";

	return text;
}

function verificar_text_detall(text) {
	text = text.replaceAll(',', '');
	text = text.replaceAll(';', '');

	const regex_b = /<[^>]*>/ig;		//Exp Regula, Elimina las etiquetas html
	text = text.replaceAll(regex_b, '');

	text = text.replaceAll('&nbsp', ';');
	return text;
}


