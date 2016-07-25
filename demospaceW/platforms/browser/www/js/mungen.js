var mgboxes = new Array();

var goCloudScroll = function(){

get('moveboard').stprop('height','100%').stprop('width','100%')

var one = mungen();

one.style.left = 50+"px";

one.style.top = 100+"px";

get('phonebox').pend( one );

}//goCloudScroll


var wacthscroll = function(){




}//wacthscroll


var goclouds = function(){

addtwatch( itwatch( 50 , [mgboxmo] ) );

addtwatch( itwatch( 1500 , [shapen] ) );

var one = mungen();

one.style.left = 100+"px";

one.style.top = 100+"px";

get('moveboard').stprop('height','100%').stprop('width','100%').pend( one );

mgboxes.push( one );

var two = mungen();

two.style.left = 200+"px";

two.style.top = 300+"px";

two.mx = -5;
two.my = 5;

get('moveboard').stprop('height','100%').stprop('width','100%').pend( two );

mgboxes.push( two );

var three = mungen();

three.style.left = 200+"px";

three.style.top = 300+"px";

three.mx = 5;
three.my = -5;

//get('moveboard').stprop('height','100%').stprop('width','100%').pend( three );

//mgboxes.push( three );

}


var shapen = function(){

for (var i = 0; i < mgboxes.length; i++) {
	mgx = mgboxes[i];
	mgx.gochange();
};

}//shapen

var mgboxmo =function(){


for (var i = 0; i < mgboxes.length; i++) {
	mgx = mgboxes[i];


	mgx.move();
};


}//mgboxmo


var mungen = function(){
var mg = div().cl('mungenbox');

mg.sth = 100;
mg.stw = 100;


mg.mx = 3;
mg.my = 3;

mg.style.height = mg.sth+"px"

mg.style.width = mg.stw+"px"

 mg.mxw = 40;
 mg.mxh = 40;

 mg.mnw = 10;
 mg.mnh = 10;

mg.many = 15;
mg.drops = [];


var drop = function(){
var dr = document.createElement("div");

dr.className = 'cloudlet';
var ph  = mg.sth;//ch(p);
var pw = mg.stw;//cw(p);

var cx = ( Math.random()* pw);
var cy =( Math.random()* ph);


var cth = (Math.random()* mg.mxh)+mg.mnh;
var ctw = (Math.random()* mg.mxw)+mg.mnw;


dr.style.left = cx+"px"

dr.style.top = cy+"px"

dr.style.height = cth+"px"

dr.style.width = cth+"px"


return dr;
}// drop

var gochange = function(){
i=0
while(i<mg.many){

if(mg.drops[ i ])changeUp( mg.drops[ i ]) ;

i++
}


}//goch


mg.gochange = gochange

mg.onmousedown = function(){

mg.gochange();

}//mouse down

var i = 0;
while(i<mg.many){
mg.drops.push( drop()  );
i++
}// while


var i = 0;
while(i<mg.many){
mg.appendChild( mg.drops[i] );

i++
}// while





var changeUp = function(lop){

var ph  = mg.sth;
var pw = mg.stw;

var cx = ( Math.random()* pw);
var cy =( Math.random()* ph);


var cth = (Math.random()* mg.mxh)+mg.mnh;
var ctw = (Math.random()* mg.mxw)+mg.mnw;


lop.style.left = cx+"px";

lop.style.top = cy+"px";

lop.style.height = cth+"px";

lop.style.width = cth+"px";


lop.style.backgroundColor = rcol();

}// changeUp

mg.move = function(){

ol = parseFloat( mg.style.left.replace('px','') );

ot = parseFloat( mg.style.top.replace('px','') );


var ww = window.innerWidth;

var wh = window.innerHeight;


var nl = ol+mg.mx;
var nt = ot+mg.my;


if( nl < 0 || nl > (ww-mg.stw) ){


mg.mx = -mg.mx;

nl = ol+mg.mx;
nt = ot+mg.my;

}

if( nt < 0 || nt > (wh-mg.sth) ){

mg.my = -mg.my;

nl = ol+mg.mx;
nt = ot+mg.my;

}


mg.style.left = nl+"px";

mg.style.top = nt+"px";

}

return mg;
}//mungbox























