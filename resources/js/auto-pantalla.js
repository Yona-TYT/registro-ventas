gl_mobil = false;

function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	if(!gl_mobil){
		if(ancho < 1024){
			//console.log(+ancho+"  " +font_siz);
			objref.style.setProperty("--alig-text", 'left');
			objref.style.setProperty("--cel-siz", '35%');
			gl_mobil = true;
			
		}
	}
	else if(ancho >= 1024) {
		//console.log(+ancho+"  " +font_siz);
		objref.style.setProperty("--alig-text", 'center');
		objref.style.setProperty("--cel-siz", 'auto');
		gl_mobil = false;

	}
}
