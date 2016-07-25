var mbx =[];

function movemBoxes(){

for (var i = 0; i < mbx.length; i++) {
	var mb = mbx[i];

mb.move();

};// mbx loop



}//movemboxes


function fricboxes(){

for (var i = 0; i < mbx.length; i++) {
	var mb = mbx[i];

mb.fric();

};// mbx loop



}//movemboxes


function placemovebox(mb,x,y){

var box = mb.box;

get("moveboard").pend(box);



box.style.left=x+"px";

box.style.top=y+"px";

box.style.width = ch(box)+"px";

mbx.push(mb);

}//placemovebox




function movebox(){


this.box = div().cl("movebox");
this.mx = 0;
this.my = 0;

this.setmVect =function(vect){

this.mx = vect.x;
this.my = vect.y;

return vect;
}//setvect

this.getmVect =function(){


return new vect(this.mx,this.my);
}//setvect

this.fric = function(){

var ov = this.getmVect();

console.log(ov.prnt()+"   ov");

var nv = new vect( ov.x-(ov.x*.1) , ov.y-(ov.y*.1) );

console.log(nv.prnt()+"   nv");

this.setmVect(nv);

return this;
}//fric



this.move = function(){

var box = this.box;
var ox = hnum(box);
var oy = tnum(box);

var nx = ox + this.mx;
var ny =  oy + this.my;

var bnds ={};

bnds.x1 =0;
bnds.x2 = cw( get('moveboard') );

bnds.y1 =0;
bnds.y2 = ch( get('moveboard') );


if(nx<bnds.x1 || nx > bnds.x2 ){

this.mx = -this.mx;

}

if(ny<bnds.y1 || ny > bnds.y2 ){

this.my = -this.my;

}

 nx = ox + this.mx;
 ny =  oy + this.my;
box.style.top=ny+"px";
box.style.left=nx+"px";

}//move


}//movebox



