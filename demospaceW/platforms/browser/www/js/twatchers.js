var twatches = new Array();

function itwatch(t,funcs){

var tw = {step:t};

tw.last =0;

tw.watch = function(){
var st = new Date().getTime();
var diff = st-tw.last;

if(diff>tw.step){
	
for (var i = 0 ; i < funcs.length ;i++) {

	var tf = funcs[i];

tf();

};


	tw.last = st;
}

};//watch function

tw.end = function(){
var ti = twatches.indexOf( tw );
if( ti > -1 ) twatches.splice( ti , 1  );
};//end

return tw;
}//itwatch

function addtwatch(itwatch){


twatches.push( itwatch );



}//addtwatch
function tyf(Things,calli){
for (var i = 0; i < Things.length; i++) {
	calli(Things[i],i);
}//things loop
}//mtyf

function gears(){
for(var i =0;i<twatches.length;i++){
var twatch = twatches[i];
twatch.watch();

}//twatches loop




timer = setTimeout( function(){ gears(); } , 1 );

}//gears