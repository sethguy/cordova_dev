function throwsign(num) {

    var a = Math.abs(num) / num;
    return a;
}

function tnum(el){
return parseInt( el.style.top.replace("px","").replace("%","") );
}//tnum

function numpx(n){
return parseInt(n.replace("px","").replace("%",""));	
}//numpx

function hnum(el){
return parseInt( el.style.left.replace("px","").replace("%",""));
}//hnum

function ctop( el ){
	var rect = el.getBoundingClientRect();

    return parseFloat( rect.top);
}//ctop



function cleft( el ){
	var rect = el.getBoundingClientRect();
    return parseFloat( rect.left);
}//cleft

function cent( el ){
   
var t = tnum( el );

var l = hnum( el );

var h = ch( el );

var w = cw( el );
//console.log(  h+"  :: in cent: "+w );

var cent = new vect(l + ( .5 * w ),t + ( .5 * h )); //{ "y":  , "x":  };

return cent;
}//cent


function dist( v1 , v2 ){
   


return cent;
}//cent


function cw(el){
	var rect = el.getBoundingClientRect();
    return parseFloat( rect.right-rect.left);
}//cw


function ch(el){
	var rect = el.getBoundingClientRect();
    return parseFloat( rect.bottom-rect.top);
}//ch