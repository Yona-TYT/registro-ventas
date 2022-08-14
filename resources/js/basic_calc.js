
function calc_dolarporunidad(margen, margenunidad, precio)
{
	var a =  parseFloat(precio)? parseFloat(precio):0;
	var b =  parseFloat(margenunidad)? parseFloat(margenunidad):0;	
	var c =  parseFloat(margen)? parseFloat(margen):0;

	var calc = (a*(b+c)*0.01)+a;
	//add_message(""+a+"---"+b+"---"+(c)+"");
	var result = parseFloat(calc)? parseFloat(calc) : 0;

	return calc;
}


function calc_bolivarprecio(bolivares, dolar)
{
	var a =  parseFloat(bolivares)?parseFloat(bolivares):0;
	var b =  parseFloat(dolar)?parseFloat(dolar):0;
	//add_message(""+a+"---"+b+"");

	var calc = a*b;

	return calc;
}

function addCommas(nStr,simb = false){
		
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		   x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		if(simb)
			return x1 + x2 + " "+simb;

		else return x1 + x2;
}

function get_mask(numer,simb){
	numer = parseFloat(numer)? parseFloat(numer).toFixed(2) : parseFloat(0).toFixed(2);
	return addCommas(numer,simb);
}

function get_mask_simple(numer,simb){
	numer = parseFloat(numer)? parseFloat(numer).toFixed(2) : parseFloat(0).toFixed(2);
	return numer+" "+simb;

}

function get_colum_nr(num, tabble_siz, j){
		return j+(tabble_siz*j)-num;
}

function get_fila_nr(num, tabble_siz, i){

		var resusl = ((num)/(tabble_siz))-(2/tabble_siz);

		return resusl;
}

function get_dignr(num){
	return Math.log(num) * Math.LOG10E + 1 | 0;  // for positive integers
}

function get_time_zero(num){
	if (get_dignr(num) == 1)
		return "0"+num;

	if (get_dignr(num) == 0)
		return "00";

	return num;
}

function Queue() {

    this.dataStore = Array.prototype.slice.call(arguments, 0);
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.empty = empty;

    this.print = print;

    function enqueue(element) {
        this.dataStore.push(element);
    }

    function dequeue() {
        return this.dataStore.shift();
    }

    function empty() {
        return this.dataStore = [];
    }

    function print(element) {
        this.dataStore.forEach(function (item) {
            // element.appendChild(item.node);
            console.log(item);
			return(item);
        });
    }
}
