gl_mobil = false;

function check_windows_siz() {
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	var objref = document.body
	var font_siz = getComputedStyle(objref).getPropertyValue("--siz-text");

	//Muestra y oculto los menus
	var menu_list = document.getElementById("allmenu");
	var menu_butt = document.getElementById("allbutons");

	if(ancho < 1024){
		//console.log(+ancho+"  " +font_siz);
		if(gl_menu_sw)
			menu_list.setAttribute("class","header_div");
		menu_butt.setAttribute("class","element_style_hidden");	
		if(!gl_mobil) {
			//console.log(+ancho+"  " +font_siz);
			objref.style.setProperty("--alig-text", 'left');
			objref.style.setProperty("--cel-siz", '5%');
			gl_mobil = true;
			create_table_rv();
			create_table_rp();
			create_table_lp();
		}
	}
	else if(ancho >= 1024) {
		//console.log(+ancho+"  " +font_siz);

		menu_butt.setAttribute("class","");
		menu_list.setAttribute("class","element_style_hidden");
		objref.style.setProperty("--alig-text", 'center');
		objref.style.setProperty("--cel-siz", '10%');
		if(gl_mobil) {
			gl_mobil = false;
			create_table_rv();
			create_table_rp();
			create_table_lp();
		}
	}
}
