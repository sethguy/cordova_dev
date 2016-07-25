
var client = {
    name: 'sethguy'
};



//var socketConnectionUrl = "http://192.168.1.5:8080";
//var socketConnectionUrl = "https://users-spacewith.rhcloud.com/";
/*
socket = io(socketConnectionUrl).on('startup', function(data) {

    client.id = data.clientId;

    console.log("@startup :: " + JSON.stringify(data));


});
*/
Array.prototype.riMap = function(func) {
    var nuray = [];
    for (var i = this.length; i > -1; i--) {

      nuray.push(func(this[i], i, this));

    } // back loop for safe removal 
    return nuray;
  } //inverseMap




function start() {



    get("loader")





} //start
