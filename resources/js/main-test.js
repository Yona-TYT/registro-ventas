function saludo()
{
	alert("Hola mundo");
}

function add_message(text)
{
	alert(text);
}

function precio_dolar()
{
	var format=document.f;		//Formato objeto
	var vmarg=format.vmargen; 	//margen de ganancia c/u objeto
	var vint=format.vintro;		//precio de entrada objeto
	var vdol=format.vdolar;		//precio en dolares objeto
	var marge=format.margen;	//margen de ganancia general objeto
	

	var v_marg=valor_inval_fix(vmarg);		//margen de ganancia c/u valor
	var v_int=valor_inval_fix(vint);		//precio de entrada valor
	var v_dol =valor_inval_fix(vdol);		//precio en dolares valor
	var v_gmarg=valor_inval_fix(marge);		//margen de ganancia general objeto

	var calc = calc_precio_dolar(v_gmarg, v_marg, v_int)

	vdol.value = calc
}

function precio_bs()
{
	precio_dolar();
}

function calc_precio_dolar(gmarg, marg, int)
{
	var a =  parseFloat(int)	//.toString();
	var b =  parseFloat(marg)	//.toString();
	var c =  parseFloat(gmarg)	//.toString();

	var calc = (a*(b+c)*0.01);
	//add_message(""+calc+"---"+int+"---"+(calc+a)+"");
	var result = parseFloat(calc)? calc+a : 0;
	return result;
}

function valor_inval_fix(obj)
{
	var result = parseFloat(obj.value);

	if(!result && result != 0){
		add_message("El valor ingresado ["+obj.value+"] es invalido!.");
		obj.value = 0;
	}

	return result;
}

function set_cell(siz)
{
	var format=document.f;		//Formato objeto
	var tabl = format.tab		//Tabla de celdas
	var vmarg=format.vmargen; 	//margen de ganancia c/u objeto
	var vint=format.vintro;		//precio de entrada objeto
	var vdol=format.vdolar;		//precio en dolares objeto
	var marge=format.margen;	//margen de ganancia general objeto

	add_message(""+tabl+"")
	vmarg.size = siz
	vint.size = siz
	vdol.size = siz
	marge.size = siz
}
	 
function multiplo_onclick(id)
{
	var format=document.f;		//Formato objeto
	var vmarg=format.vmargen; 	//margen de ganancia c/u objeto
	var vint=format.vintro;		//precio de entrada objeto
	var vdol=format.vdolar;		//precio en dolares objeto
	var marge=format.margen;	//margen de ganancia general objeto
	if(id==0){
		var nr = parseInt(marge.value)
		marge.value = 10+nr				
	}
}
function init(){
	var input_siz = 4;
	set_cell(input_siz);
	precio_dolar();
}
