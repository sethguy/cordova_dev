var cshape = null;
var crx = [];
var grav = 0;
var mousex = 0;
var mousey = 0;
var maxamp = 50;
var pwidth = 5000;
var tripnum = 6;
pboxHash = {};
welcomed = false;

var client = {
    name: 'sethguy'
};

var maxpspd = 10;
var brboxes = [];
var fbcount = 0;
//var socketConnectionUrl = "http://192.168.1.5:8080";
var socketConnectionUrl = "https://users-spacewith.rhcloud.com/";

socket = io(socketConnectionUrl).on('startup', function(data) {

    client.id = data.clientId;

    console.log("@startup :: " + JSON.stringify(data));

    socket.on('startPbox', makePbox);

    requestPbox();

});

Array.prototype.riMap = function(func) {
    var nuray = [];
    for (var i = this.length; i > -1; i--) {

      nuray.push(func(this[i], i, this));

    } // back loop for safe removal 
    return nuray;
  } //inverseMap


var clearBreakboxes = function() {

        brboxes.map(function(box) {
            box.parentNode.removeChild(box)
        })
        brboxes = [];

    } //clear break boxes


var setFlightLauncher = function() {

        //clearBreakboxes();

        socket.on('flighter', function(data) {

            console.log('flighter')
            console.log(data)
            toscheduler(data);
            //  flighter(data);

        });

        socket.on('outflighter', function(data) {

            //console.log('bboxmo')
            //console.log(data)
            if (get(data.fbid)) {

                fb = get(data.fbid)

                brboxes.splice(brboxes.indexOf(fb), 1);

                get("moveboard").removeChild(fb);
            }
            //bboxmo(data);
        });

    } //setFlightLauncher


function start() {

    socket.on('moveAction', function(data) {

        // console.log("@moveAction :: " + JSON.stringify(data));

        moveAction(data)

    });

    socket.on('touchAction', function(data) {

        console.log("@touchAction :: " + JSON.stringify(data));
        touchAction(data.action)


    });

    socket.on('upAction', function(data) {

        //   console.log("@upAction :: " + JSON.stringify(data));
        upAction(data.action)

    });

    socket.on('clhitEvent', function(data){

        console.log("@hitEvent :: " + JSON.stringify(data));

        brboxes.riMap(function(br) {

            if (br &&  br.id == data.hit.brk) {

                br.splode();
            }

            return br;
        })

    });

    var mbh = ch(get('moveboard'));

    var mbw = cw(get('moveboard'));

    get('mbsvglay').prop('height', mbh).prop('width', mbw);

    gears();


    flightLauncher = itwatch(3000, [flighter]);

    addtwatch(flightLauncher);


    addtwatch(itwatch(30, [flighscheduler]));


    addtwatch(itwatch(30, [pboxmo]));

    addtwatch(itwatch(50, [bboxmo]));

    //addtwatch( itwatch( 300 , [fricboxes] ) );


    //goclouds();

} //start

var flightSocket = false;

var cancleFlightLauncher = function() {
        flightLauncher.end();
    } //cancleFlightLauncher

function circlegrow() {

    for (var i = 0; i < crx.length; i++) {
        var cr = crx[i];

        var or = parseInt(cr.getAt('r'));

        var nr = (or + cr.speed);

        if (nr < cr.limit) cr.shap('r', nr);

    }; // crx loop

} // circle grow

function godist(x, mx, y, my, d) {

    var tmx = mx;
    var tmy = my;
    var di = 0;
    var star = 1;
    //console.log("in godist before while"+d)
    while (di < d) {
        //console.log("in  while"+di+"   vs "+d);

        di = new vect(x - (x + (mx * star)), y - (y + (my * star))).length;
        //console.log("in  a  while"+di+"   vs "+d);

        tmx = mx * star;
        tmy = my * star;

        star++;
    } //while

    return star;
} //

var svgel = function(kind) {

        var shape = document.createElementNS('http://www.w3.org/2000/svg', kind);

        this.shape = shape;

        this.fill = function(col) {

                this.shap('fill', col);
                return this;
            } //fill

        this.rm = function() {

                this.shape.parentNode.removeChild(this.shape);

            } //rm

        this.prop = function(na, vl) {
            this[na] = vl;
            return this;
        }
        this.stroke = function(col) {

                this.shap('stroke', col);
                return this;
            } //stroke

        this.getAt = function(at) {

                var Atr = this.shape.getAttribute(at);

                return Atr;
            } //getAt

        this.shap = function(na, vl) {
                var shape = this.shape;
                shape.setAttributeNS(null, na, vl);
                return this;
            } //shat

        this.pendto = function(par) {
                par.appendChild(this.shape);
                return this;
            } //pend to

        this.sw = function(sw) {
                this.shap('stroke-width', sw);
                return this;
            } //stroke width


    } //svgel
