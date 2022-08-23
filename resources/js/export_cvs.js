

function cuent_datos_csv() {

	var ventas = crear_array_ventas();

	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "";
		contenido += ventas.join(";") ;			//Se agregan datos de ventas
		start_save(ventas);
	}
	else {
		alert("Su navegador no permite esta acción");
	}
}
function start_save(ventas) {
	//console.log(hash);
	var contenido = "",
		d = new Date(),
		blob,
		reader,
		save,
		clicEvent;
	//creamos contenido del archivo
	contenido += ventas.join(";") ;			//Se agregan datos de ventas

	const regex_a = /(\r\n|\r|\n)\;/ig;		//Exp Regula, indica un salto de linea seguido de ;
	contenido = contenido.replaceAll(regex_a, '\n');

	const regex_b = /<[^>]*>/ig;		//Exp Regula, Elimina las etiquetas html
	contenido = contenido.replaceAll(regex_b, '');

	contenido = contenido.replaceAll('&nbsp', '');

	console.log(""+contenido);
	//return null;
	//creamos el blob
	blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
	//creamos el reader
	var reader = new FileReader();
	reader.onload = function (event) {
		//escuchamos su evento load y creamos un enlace en dom
		save = document.createElement('a');
		save.href = event.target.result;
		save.target = '_blank';
		//aquí le damos nombre al archivo
		save.download = "historial" + "_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() + "_" + d.getHours() + d.getMinutes() + d.getSeconds()+".csv";
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
	var count = 0;
	for (var j = 0 ; j < gl_ventas_save.pdtindex.length ; j++) {
		result.push(verificar_text(gl_ventas_save.cliente[j]));
		result.push(verificar_text(gl_ventas_save.totaldol[j]));
		result.push(verificar_text(gl_ventas_save.totalbsf[j]));
		result.push(gl_ventas_save.fecha[j]);
		result.push(gl_ventas_save.hora[j]);
		result.push(gl_ventas_save.estado[j]);
		result.push(verificar_text(gl_ventas_save.detalles[j]));

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
function verificar_text(text) {
	text = text.replaceAll(',', '');
	text = text.replaceAll(';', '');
	return text;
}



