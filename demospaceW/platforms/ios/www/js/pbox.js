pboxes = [];
var ivtdeg = 0;
//pullswitch = false;

var makePbox = function(data) {

        var dclient = data.client;

        // if (dclient.id==client.id ) {

        console.log("@startPbox/makePbox :: " + JSON.stringify(data));
        if (!client.pid) client.pid = dclient.pid;

        // alert(window.innerWidth+'  ::: '+window.innerHeight)

        var pb0 = pbox(window.innerWidth / 2, window.innerHeight / 2, 0).inn(dclient.pid)
            //pb0.initData = data;
        pb0.id = dclient.pid;
        pboxHash[pb0.id] = pb0;
        pboxes.push(pb0);

        if (!welcomed) {
            showWelcome();
            welcomed = true;
        }
        // }

    } // makePbox

var requestPbox = function() {

        socket.emit('requestPbox', { client: client });
        console.log('request client')

    } // makePbox

var pboxmo = function() {
        var pbx = {};

        ivtdeg = ivtdeg + degfac;

        for (var i = 0; i < pboxes.length; i++) {
            var pb = pboxes[i];
            pb.move();
            //pb.innerHTML=pb.mx+"   "+pb.my;
            pbx["pbs" + i] = { "ar": pb.ramp, "fdx": pb.fdx, "fdy": pb.fdy };
            //console.log(pbx["pbs" + i])
        } //pboxe loop

        //get("reply").innerHTML=  JSON.stringify(  pbx  ) ;
    } //pboxmo

function pbox(x, y, itry) {

    var one = div().cl("pbox").stprop("position", "absolute"

    ).stprop("border", "2px solid red").sh("30px").sw("30px").stprop("top", y + "px").stprop("left", x + "px").prop("place", true)

    one.prop("pox", { "b": 3, "m": (3 / 2) }

    ).prop("poy", { "b": 3, "m": (3 / 2) });

    one.prop("pxfunc", function(x) {

        var ans = 0;

        var h = cent(one).x;

        var diff = (x - h);

        //ans = one.pox.m * ( x - h ) + one.pox.b;

        ans = maxamp * Math.pow(Math.E, -(Math.pow(diff, 2) / pwidth));

        return ans;

    }).prop("pyfunc", function(y) {
        var ans = 0;

        var t = cent(one).y;

        ans = one.poy.m * (y - t) + one.poy.b;

        var diff = (y - t);
        //ans = one.pox.m * ( x - h ) + one.pox.b;

        ans = maxamp * Math.pow(Math.E, -(Math.pow(diff, 2) / pwidth));

        return ans;

    });

    one.mx = 0;
    one.my = grav;

    one.mousex = 0;
    one.mousey = 0;

    one.dex = itry

    one.disp = { "x": 0, "y": 0 };
    /*
    var wait = tbox( cent(one).x , cent(one).y );

    document.body.appendChild(wait);

     = [wait];
    */
    one.ctrips = new Array();

    one.props({
        coords: function(){
            return {
                x: cleft(one),
                y: ctop(one)
            }
        }
    })


    loadup(one, tripnum);


    one.ivt = function(off) {

            var iout = new vect(0, tlength);


            iout = iout.mult(rotm(ivtdeg + off));


            return iout;
        } //pdid.ivt

    one.strx = function(mx) {
            one.disp.x = one.disp.x + mx;
            one.innerHTML = one.disp.x;

            return mx;
        } //strx


    one.count = 0;

    one.stry = function(my) {

            one.disp.y = one.disp.y + my;

            return my;
        } //stry


    one.move = function() {

            if (one.pullswitch) {


            } else {

                var ox = hnum(one);

                var oy = tnum(one);

                var rx = (cent(one).x - one.mousex);

                var ry = (cent(one).y - one.mousey);

                one.dr = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

                one.ramp = maxamp * Math.pow(Math.E, -(Math.pow(one.dr, 2) / pwidth));

                one.fdx = throwsign((2 * maxamp * (rx) * Math.pow(Math.E, -(Math.pow(rx, 2) / pwidth))) / pwidth);

                one.fdy = throwsign((2 * maxamp * (ry) * Math.pow(Math.E, -(Math.pow(ry, 2) / pwidth))) / pwidth);

                one.fdxa = maxamp * Math.pow(Math.E, -(Math.pow(rx, 2) / pwidth));

                one.fdya = maxamp * Math.pow(Math.E, -(Math.pow(ry, 2) / pwidth));


                if (one.dex > 0) {

                    one.ramp = 0;
                    //one.style.backgroundColor = "white";

                } //one.dex

                if (one.ramp < 1) {

                    one.ramp = 0;
                    one.fdx = 0;
                    one.fdy = 0;

                }

                if (one.ramp > 0) {

                    one.mx = (one.fdx * one.ramp) / 2;

                    one.my = (grav + one.fdy * one.ramp) / 2;

                    touchbox = one;

                }


                one.walls = { "xmin": 0, "xmax": window.innerWidth, "ymin": 0, "ymax": window.innerHeight };

                if (Math.abs(rx) < 25) {

                    //one.mx = 0

                }

                if (Math.abs(ry) < 25) {

                    //one.my = grav; 

                }


                if (one.mx > maxpspd) {

                    one.mx = maxpspd;

                }

                if (one.my > maxpspd) {

                    one.my = maxpspd;

                }


                var nx = ox + one.mx;

                var ny = oy + one.my;


                //one.innerHTML= oy-ny+"\n"+oy+"::"+ny;

                /*

                if( nx > window.innerWidth ){

                nx = -100;

                }

                if( nx < -100  ){

                nx = window.innerWidth+100;

                }


                if( ny > window.innerHeight ){

                ny = -100;

                }

                if( ny < -100  ){

                ny = window.innerHeight+100;

                }

                */
                if (ny < (one.walls.ymin) + 100 || ny > (one.walls.ymax - 100)) {

                    one.my = -one.my;

                    ny = ny + (one.my);

                    //var nuvect = new vect(nx-ox,ny-oy)

                } //---------------------

                if (nx < one.walls.xmin + 80 || nx > one.walls.xmax - 80) {

                    one.mx = -one.mx;

                    nx = nx + (one.mx);

                } //---------------------

                one.newpos = {
                    x: nx,
                    y: ny
                };

                one.style.left = nx + "px"

                one.style.top = ny + "px"


            } //pull flag

            runtrips(one);

            //one.innerHTML= JSON.stringify(one.disp);
        } //one.move


    one.setmove = function(pos) {

            one.style.left = pos.x + "px"

            one.style.top = pos.y + "px"


            //runtrips(one);


        } // one.setmove

    get("moveboard").pend(one);

    return one;
} //pbox
