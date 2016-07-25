var clx =[];

function cloudteststart(){



var con = get('cloudtestcon');

var dh = ch(con);
var dw = cw(con);

csvg = get('cloudsvg').prop('height',dh).prop('width',dw);





var sp =10;
var hsp =7;

var bigwidth = 20;

for (var j = 0; j < 4; j++) {

for (var i = 0; i < 4; i++) {
	
//circtango(200+(sp*i),200+(j*hsp),40,7,125);
circtango(bigwidth+(sp*i),bigwidth+(j*hsp),5,7,10);

};//i loop


};//jloop


}//cloudteststart


function wcirc(x,y,r){
var ci = new svgel('circle')
.shap('cx',x).shap('cy',y).shap('r',r)
.stroke('none').fill('white').sw(2)
.pendto( csvg  );//.prop('speed',20).prop('limit',50);


//cloudtestcon
clx.push(ci);
return ci;
}



function circtango(x,y,r,c,w){


var cent = new vect(x,y);

wcirc(x,y,r);

/*

if(c>0){

//c==0
}else if(c===1){



 wcirc(x,y,r);


//c==1
}else if(c>1){

*/

var out = w/2;

var roffset =w/2;

var upvect = new vect(0,1).unit( out );

console.log(upvect.prnt()+"  upvcet");


var ang = 360/c;

console.log(ang+" ang is");
for (var i = 0; i < c ; i++) {
	

	var rplus = ( Math.random()*( 2 * roffset ) )-roffset;

console.log(rplus+"  rplus");

var roff = out + rplus;

var rovect = upvect.unit( roff ).mult( rotm( ang * i ) );
console.log(rovect.prnt()+"  rovcet");




var rox = rovect.x ;

var roy = rovect.y;

var nvx = cent.x+ rox;

var nvy = cent.y+ roy;



var nc = new vect( nvx , nvy );
console.log(nc.prnt()+"  rovcet");


wcirc( nc.x , nc.y , r );


};//count cloop

//c>1
//}







}//circatangs(