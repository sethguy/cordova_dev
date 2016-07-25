var tlength = window.innerWidth / 8;
var ivt; //new vect( ( cent( swingx ).x - cent( seec ).x  )  , ( cent( swingx ).y - cent( seec ).y  )  );
var ivtdeg = 0;
var curvechop = 10;
var maxtrip = 2000;
var dspread = -60;
//var tripWidth = 45/2; 

brIdcount = 0;

var degfac = 5;

function tripsup() {

    var winh = window.innerHeight;
    var winw = window.innerWidth;

    var p0 = {};

    p0.x = winw / 2;

    p0.y = winh / 2;
    var pdid = div().cl("pdid").stprop("top", p0.y + "px").stprop("left", p0.x + "px").prop("mx", 5).prop("my", 8).prop("id", "seec");

    var swing = div().cl("sbox").stprop(

        "top", (p0.y + (tlength)) + "px").stprop(

        "left", p0.x + "px").prop(

        "id", "swing").prop

        ("mx", 0).prop("my", 0);

    get("moveboard").pend(pdid);
    get("moveboard").pend(swing);

    pdid.ivt = function() {

            var iout = new vect(0, tlength);

            ivtdeg = ivtdeg + degfac;

            iout = iout.mult(rotm(ivtdeg));

            console.log(iout.prnt());

            return iout;
        } //pdid.ivt

    gears();

    addtwatch(itwatch(50, tripup));

    //document.body.appendChild(  );

} //tripsup


function tripup() {

    var swingx = get("swing");

    var seec = get("seec");

    var ox = cleft(swingx);

    var oy = ctop(swingx);

    var tovt = seec.ivt();

    var vr = new vect((cent(swingx).x - cent(seec).x), (cent(swingx).y - cent(seec).y));

    var vrm = (vr.y / vr.x);

    var msign = vrm / Math.abs(vrm);

    swingx.mx = (((cent(seec).x + tovt.x) - cent(swingx).x) / 10) + seec.mx; //vr.x/10 ;

    swingx.my = (((cent(seec).y + tovt.y) - cent(swingx).y) / 10) + seec.my; //-vr.y/10 ;

    var nx = ox + swingx.mx;

    var ny = oy + swingx.my;

    movedude();

    swingx.stprop("top", ny + "px").stprop("left", nx + "px");

} //tripup // twatch callback motion function


function movedude() {

    var seec = get("seec");

    var ox = cleft(seec);

    var oy = ctop(seec);

    if (ox > (window.innerWidth - 100) || ox < 0) {

        seec.mx = -seec.mx;

    }

    if (oy > (window.innerHeight - 100) || oy < 0) {

        seec.my = -seec.my;

    }

    var nx = ox + seec.mx;

    var ny = oy + seec.my;

    seec.stprop("top", ny + "px").stprop("left", nx + "px");

} //movedude


function runtrips(pbox) {

    var trips = pbox.ctrips;
    trips[0].style.backgroundColor = "red";
    for (var i = 0; i < trips.length; i++) {

        var swingx = trips[i];

        if (i > 0) {

            swingx.style.backgroundColor = "blue";

        } // index 0 is special

        var ox = cleft(swingx);

        var oy = ctop(swingx);

        if (swingx.orbit) {

            var off = i * dspread;

            var tovt = pbox.ivt(off);

            //var vr = new vect( ( cent( swingx ).x - cent( pbox ).x  )  ,  ( cent( swingx ).y - cent( pbox ).y  ) );

            //var vrm = ( vr.y / vr.x );

            //var msign = vrm / Math.abs( vrm );

            swingx.mx = (((cent(pbox).x - (cw(pbox) * .25) + tovt.x) - cent(swingx).x) / 10) + pbox.mx; //vr.x/10 ;

            swingx.my = (((cent(pbox).y - (ch(pbox) * .25) + tovt.y) - cent(swingx).y) / 10) + pbox.my; //-vr.y/10 ;


        } else {

            var tripvect = new vect(cent(swingx).x - cent(pbox).x, cent(swingx).y - cent(pbox).y);

            var inflight = true;


            inflight = tripvect.length < maxtrip;

            //inflight = 

            if (inflight && hitables(swingx)) {

                var tc = swingx.tcount++;

                var q0 = new vect((swingx.v0.x / curvechop) * tc, (swingx.v0.y / curvechop) * tc);

                var q1 = new vect((swingx.v1.x / curvechop) * tc, (swingx.v1.y / curvechop) * tc);

                var vq = new vect(q1.x - q0.x, q1.y - q0.y);

                //console.log( q0.prnt()+"   ::    "+q1.prnt()+"   :::::  "+vq.prnt()+"   :::::: ");

                swingx.mx = vq.x / curvechop;
                swingx.my = vq.y / curvechop;

            } else {

                swingx.mx = 0
                swingx.my = 0
                swingx.tcount = 0;

                swingx.orbit = true;
                //trips.splice(i,1);

                //trips.push();

            } // max trip else if 


        } // orbit if else 

        //swingx.innerHTML = swingx.mx +"  <br> "+swingx.my;


        var nx = ox + swingx.mx;

        var ny = oy + swingx.my;

        //console.log("  at runtrips  "+ny+"    "+nx);


        swingx.stprop("top", ny + "px").stprop("left", nx + "px");


    }; //ctrips loop

} //runtrips


function tbox(x, y) {

    var swing = div().cl("tbox").stprop("top", (y - 50) + "px").stprop("left", (x) + "px").prop("mx", 0).prop("my", 0);

    swing.orbit = true;
    swing.tcount = 0;

    return swing;
} //tbox /swing / ctrip


function hitables(ct) {

    var cx = cent(ct).x;

    var cy = cent(ct).y;

    for (var j = 0; j < brboxes.length; j++) {

        var brk = brboxes[j];

        if (brk) {

            var px = cent(brk).x;

            var py = cent(brk).y;

            var dv = new vect(cx - px, cy - py);

            //console.log(dv.length+" dl  "+ct.mx+"  :"+ i+"::   "+ct.my );

            //if (dv.length<80 && brk.ctrips.indexOf(ct)==-1 ) {

            if (dv.length < (ch(brk) + 10)) {

                //ct.style.backgroundColor="red";

                if (!brk.hit) {
                    brk.hit = true;
                    hitEvent({
                        brk: brk.id,
                        pid: ct.pid,
                        ff:brk.ff.id
                    })
                }
                brk.splode();

                //brk.my = ct.my/10;

                //brk.mx = ct.mx/10;

                return false;

            }; // close enough break box
        }

        //ct.style.backgroundColor="blue";

    }; //brkox loop

    /*  for (var i = 0; i < freeBoxes.length; i++) {

          var frb = freeBoxes[i];

          var fcx = frb.getCent().x;

          var fcy = frb.getCent().y;


          var dv0 = new vect(cx - fcx, cy - fcy);

          if (dv0.length < (frb.getRadius() + 10)) {

              console.log('CLOSE CLOSE')

              //if(frb)frb.style.backgroundColor="red";

              frb.brboxes.map(function(box) {

                  box.style.backgroundColor = "red"

              })

              // brk.splode();

              //brk.my = ct.my/10;

              //brk.mx = ct.mx/10;


              //return false;

          };

      } */ // Free box proximity loop, instead of looping thru every break box only break boxes on freeboxes that the 'bullets' are approaching 

    return true;
} //hitables

function loadup(pbox, n) {

    for (var i = 0; i < n; i++) {

        var b = tbox(cent(pbox).x, cent(pbox).y);

        get("moveboard").pend(b);

        tbox.pid = pbox.id;

        pbox.ctrips.push(b);
    };

} // load up
