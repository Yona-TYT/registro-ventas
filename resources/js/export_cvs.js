

function cuent_datos_csv() {

	var ventas = crear_array_ventas();

	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "";
		contenido += ventas.join(";") + "\n";			//Se agregan datos de ventas
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
	contenido += ventas.join(";") + "\n";			//Se agregan datos de ventas

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
	for (var j = 0 ; j < gl_ventas_save.pdtindex.length ; j++) {
		result.push(gl_ventas_save.cliente[j]);
		result.push(gl_ventas_save.detalles[j]);
		result.push(gl_ventas_save.totaldol[j]);
		result.push(gl_ventas_save.totalbsf[j]);
		result.push(""+gl_ventas_save.fecha[j]+"");
		result.push(""+gl_ventas_save.hora[j]+"");
		result.push(gl_ventas_save.estado[j]);
		result.push(gl_ventas_save.pdtindex[j]);
		result.push(gl_ventas_save.pdtclave[j]);
		result.push(gl_ventas_save.pdtcantidad[j]);
		result.push(gl_ventas_save.pdtdesc[j]);
	}
	return result;
}



