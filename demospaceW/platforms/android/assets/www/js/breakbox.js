var brboxes = new Array();

var rpad = 20;

freeBoxes = [];
over = 0;

scheduledflights = [];

var flighscheduler = function() {

        scheduledflights = scheduledflights.filter(function(msg) {

            var now = new Date().getTime();

           // diff = now - msg.time;
           // console.log(diff + "   ::  vs", msg.time + "  vs  " + now)

           // diff = Math.abs(now - msg.time);

            if (now >= msg.time) {


                flighter(msg);

            }
            return now <= msg.time
        });
    } //flighscheduler

/*

it seems that their are still time delays depite the buffer

while i search for a solution
i will keep this behavior for now and use it as a componet in the game:
if a flight gets sent out late >50

    */


var toscheduler = function(data) {

        scheduledflights.push(data)

    } //toscheduler

var flighter = function(msg) {

        msg = msg || {};

        var ff = freeform(msg).pendto(get("moveboard"));

        if (ff.brboxes.length > 0 && msg.outersplace) {

            freeBoxes.push(ff);

        }

    } //flighter


function freeform(msg) {
    var minpad = 10;

    var ff = {};
    ff.brboxes = [];
    var fi = 3;
    var fj = 3;

    var mat = new Array();

    var op = outersplace();

    var bv = genpoint(op.x, op.y);

    var brkHt = 45 / 2;
    var brkWd = 45 / 2;


    //op.x + (  i * (brkWd + minpad)  ) , op.y + (j * (brkHt + minpad))


    ff.getTop = function() {

        return ff.y + ((brkHt + minpad))


    }


    ff.getLeft = function() {

        return ff.x + ((brkWd + minpad))


    }


    /*
    for (var i = 0; i < fi; i++) {
        
        mat.push( new Array() );
    for (var j = 0; j < fj; j++) {
        var sp = 1;

    var rr = Math.random();

    if(rr>.5){

    sp = 0;

    }
        mat[i].push(sp);

    };//jloop

    };//iloop
    */


    ff.getCent = function() {


            var bigL = ((fi - 1) * (brkHt + minpad)) + 45;


            pac = {
                x: ff.getPos().x + (bigL / 2),
                y: ff.getPos().y + (bigL / 2)
            }

            return pac;


        } //getRadius


    ff.getRadius = function() {

            var bigL = ((fi - 1) * (brkHt + minpad)) + 45;


            return bigL + 50;

        } //getRadius


    ff.getPos = function() {


        for (var i = 0; i < ff.brboxes.length; i++) {

            var brbx = ff.brboxes[i];
            var id = brbx.id;

            var ffi = id.substring(0, 1)

            var ffj = id.substring(id.indexOf('}') + 1)


            //op.x + (i * (brkWd + minpad)), op.y + (j * (brkHt + minpad))   ,


            var topDis = (ffj * (brkHt + minpad));

            var leftDis = (ffi * (brkWd + minpad));

            var bx = cleft(brbx);

            var by = ctop(brbx);

            centDate = {};

            centDate.x = bx - leftDis

            centDate.y = by - topDis

            return centDate;


        }

        return { x: 0, y: 0 }


    }

    ff.pendto = function(tt) {

        var rpoints = [
            [],
            [],
            []
        ]

        var nbv = null;

        var makeUp = null;

        /*if (msg.outersplace) {

            var time = msg.time;
            var now = new Date().getTime();

            var diff = now - time;

            console.log("time diff", diff);

            cycs = (diff / 50)+over;


                if(diff<100)cycs=1;


            var ops = msg.outersplace

            nbv = msg.point

            var a = nbv.x * cycs;

            var b = nbv.y * cycs;

            console.log("befor", ops);

            makeUp = new vect(ops.x + a, ops.y + b);

            console.log("after", makeUp);

        }*/

        var op = msg.outersplace || outersplace();

        var bv = msg.point || genpoint(op.x, op.y);

        for (var i = 0; i < fi; i++) {
            mat.push(new Array());
            for (var j = 0; j < fj; j++) {

                var rpoint = Math.random();

                if (msg.rpoints) rpoint = msg.rpoints[i][j]

                rpoints[i].push(rpoint)

                if (rpoint > .5) {

                    fbcount++

                    if (fbcount > 500) fbcount = 0;

                    idnum = msg.id || fbcount;

                    var fb = freebox(op.x + (i * (brkWd + minpad)), op.y + (j * (brkHt + minpad)), brkHt, brkWd, i + '{' + idnum + '}' + j);

                    fb.ff = ff;

                    fb.inn(fb.id);

                    fb.mx = -bv.x / 2;
                    fb.my = -bv.y / 2;


                    if (msg.outersplace) {
                        tt.appendChild(fb);
                        //console.log('pend')
                        //console.log(fb)
                        brboxes.push(fb);
                        ff.brboxes.push(fb);
                    }
                    mat[i].push(fb);

                } // >.5 

            }; //jlopp

        }; //i loop

        if (client.control && !msg.outersplace) socket.emit('freeform', {
            id: fbcount,
            client: client,
            outersplace: op,
            point: bv,
            rpoints: rpoints,
            time: new Date().getTime() + (10 * 1000)
        });

        //   console.log('mat maker ' + JSON.stringify(mat))

        //send freeform msg

        return ff;
    }


    ff.setm = function(m) {


        } //sdtm


    return ff;
} //freeform

var goSplodeBox = function(brbox) {


    var brcent = cent(brbox);


    get('moveboard').pend(

        el('img').props({
            src: 'img/explosion.png',
            startTime: new Date().getTime()
        }).cl('splodeBox').stProps({
            height: numpx(brbox.style.height) * (1.5) + 'px',
            top: numpx(brbox.style.top) - (numpx(brbox.style.height) / 2) + 'px',
            left: numpx(brbox.style.left) - (numpx(brbox.style.width) / 2) + 'px',
            opacity: '1'
        }).wait({
            wait: 1,
            boom: function(msg) {
                msg.dio.stProps({
                    height: (numpx(brbox.style.height) * 3) + 'px',
                    top: numpx(brbox.style.top) - ((numpx(brbox.style.height) * 3) / 2) + 'px',
                    left: numpx(brbox.style.left) - ((numpx(brbox.style.width) * 3) / 2) + 'px',
                    opacity: '.5'
                }).wait({
                    wait: 500,
                    boom: function(msg) {
                        msg.dio.parentNode.removeChild(msg.dio);
                    }
                })

            }
        })
    )
}

function freebox(x, y, h, w, id) {
    var fb = div().cl("freebox").sh(h + "px").sw(w + "px");

    fb.style.top = y + "px";
    fb.style.left = x + "px";
    fb.h = h;
    fb.w = w;
    fb.id = id;

    fb.splode = function() {

            //spit( -20 , 18 , cent(fb).x , cent(fb).y, 5 );

            brboxes.splice(brboxes.indexOf(fb), 1);

            fb.ff.brboxes.splice(fb.ff.brboxes.indexOf(fb), 1);

            if (fb.ff.brboxes.length == 0) freeBoxes.splice(freeBoxes.indexOf(fb), 1);

            var brcent = cent(fb);

            goSplodeBox(fb);

            get("moveboard").removeChild(fb);


            //socket.emit('fbsplode' , {fbid:fb.id,ny:ny,nx:nx});


            /// send splode msg


        } //splode


    fb.move = function(msg) {

            var ox = cleft(fb);

            var oy = ctop(fb);

            var nx = ox + fb.mx;

            var ny = oy + fb.my;

            var frc = new vect(nx - (window.innerWidth / 2), ny - (window.innerHeight / 2)).length;

            //console.log( frc+"::: fmod  ");

            if (frc > (1.5 * Math.max(window.innerWidth, window.innerHeight))) {

                brboxes.splice(brboxes.indexOf(fb), 1);

                fb.ff.brboxes.splice(fb.ff.brboxes.indexOf(fb), 1);

                if (fb.ff.brboxes.length == 0) freeBoxes.splice(freeBoxes.indexOf(fb), 1);

                get("moveboard").removeChild(fb);

            } else { //out of bounds

                fb.stprop("top", (msg.ny || ny) + "px").stprop("left", (msg.nx || nx) + "px");

            }

        } //move

    return fb;
}


function peade(l, x, y) {

    var pd = {};
    pd.plist = new Array();

    for (var i = 0; i < l; i++) {

        var bk = breakbox(x + (i * 105), y);

        pd.plist.push(bk);


    } //l loop

    pd.pendto = function(tt) {

        for (var i = 0; i < pd.plist.length; i++) {
            tt.appendChild(pd.plist[i]);
            brboxes.push(pd.plist[i]);
        }; //plist loop

    }

    pd.setm = function(m) {

            for (var i = 0; i < pd.plist.length; i++) {
                pd.plist[i].mx = m.x;
                pd.plist[i].my = m.y;
            } //plist loop

        } //sdtm


    return pd;
} //peade


function breakbox(x, y) {
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    var bb = div().cl("breakbox");
    bb.style.left = x + "px";
    bb.style.top = y + "px";

    bb.splode = function() {

            spit(-20, 18, cent(bb).x, cent(bb).y, 5);

            brboxes.splice(brboxes.indexOf(bb), 1);

            get("moveboard").removeChild(bb);


        } //splode

    bb.move = function() {

            var ox = cleft(bb);

            var oy = ctop(bb);


            var nx = ox + bb.mx;

            var ny = oy + bb.my;

            var frc = new vect(nx - (window.innerWidth / 2), ny - (window.innerHeight / 2)).length;

            //console.log( frc+"::: fmod  ");

            if (frc > (1.5 * Math.max(window.innerWidth, window.innerHeight))) {

                brboxes.splice(brboxes.indexOf(bb), 1);

                get("moveboard").removeChild(bb);


            } else { //out of bounds

                bb.stprop("top", ny + "px").stprop("left", nx + "px");

            }

        } //move


    return bb;
} // break box


function genpoint(spx, spy) {
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    var rx = Math.floor(rpad + (Math.random() * (ww - rpad)));

    var ry = Math.floor(rpad + (Math.random() * (wh - rpad)));


    var rp = new vect(rx, ry);


    var bv = new vect(spx - rx, spy - ry).unit(5);

    return bv;
} //genpoint 


function outersplace() {
    var ww = window.innerWidth / 2;
    var wh = window.innerHeight / 2;

    var outray = Math.max(ww, wh);

    var Rang = Math.floor(Math.random() * 360);


    var cup = new vect(0, outray);

    var pointer = cup.mult(rotm(Rang));


    var spx = pointer.x + ww / 2;

    var spy = pointer.y + wh / 2;


    var op = new vect(spx, spy);

    return op;
} //op


function genpeade() {

    var op = outersplace();

    var bv = genpoint(op.x, op.y);

    var tp = peade(3, op.x, op.y);

    var m = new vect(-bv.x, -bv.y);

    tp.setm(m);

    tp.pendto(get("moveboard"));

} //gen peade


function genbreak() {


    ////// position breaker
    /*
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    var outray = Math.max( ww , wh );

    var Rang = Math.floor( Math.random() * 360 );


    var cup = new vect( 0 , outray );

    var pointer = cup.mult(  rotm( Rang ) );


    var spx = pointer.x + ww / 2;

    var spy = pointer.y + wh / 2;
    */


    var sp = outersplace();

    var breaker = breakbox(sp.x, sp.y);

    var bv = genpoint(sp.x, sp.y);

    //// point breaker
    /*
    var rx  = Math.floor( rpad + ( Math.random() * ( ww - rpad ) ) );

    var ry  = Math.floor( rpad + ( Math.random() * ( wh - rpad ) ) );


    var rp = new vect( rx , ry );

    var bv = new vect( sp.x - rx , sp.y - ry ).unit(5);
    */
    breaker.mx = -bv.x;

    breaker.my = -bv.y;

    get("moveboard").pend(breaker);

    brboxes.push(breaker);

} //genbreak


function rcol() {

    var rc = Math.floor(Math.random() * 255).toString(16);
    var gc = Math.floor(Math.random() * 255).toString(16);
    var bc = Math.floor(Math.random() * 255).toString(16);

    var rdchex = "#" + rc + "" + gc + "" + bc + "";
    return rdchex;
} //rcol

var bboxmoCount = 0;
var bboxmoNum = 80;

function bboxmo(msg) {
    msg = msg || {};
    bboxmoCount++

    if (bboxmoCount > bboxmoNum) {

        bboxmoCount = 0;

    }

    for (var i = 0; i < brboxes.length; i++) {
        var brk = brboxes[i];

        if (brk) {

            if (bboxmoCount == 0) {
                brk.style.backgroundColor = rcol();
                //brk.style.border = "3px solid " + rcol();
            }

            brk.move(msg);
        }

    }; //brk loop

} //bboxmo
