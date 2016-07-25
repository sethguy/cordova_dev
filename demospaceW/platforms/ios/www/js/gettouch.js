function gettouch(ev) {

    //var e = ev.originalEvent.touches[0];
    if (ev.touches != null) ev = ev.touches[0];
    //.pageX;
    var x = ev.pageX;
    var y = ev.pageY;


    socket.emit('touchAction', {
        client: client,
        action: {
            pid: client.pid,
            cords: {
                x: x,
                y: y
            }
        }
    });

    touchAction({
        pid: client.pid,
        cords: {
            x: x,
            y: y
        }
    })


} // gettouch

function toc(ev) {

    if (ev.touches != null) ev = ev.touches[0];
    //.pageX;
    var x = ev.pageX;
    var y = ev.pageY;

    //ev.preventDefault();


} //toc

function tmove(ev) {
    ev.preventDefault();
    if (ev.touches != null) ev = ev.touches[0];
    //.pageX;
    var x = ev.pageX;
    var y = ev.pageY;

    socket.emit('moveAction', {
        client: client,
        action: {
            pid: client.pid,
            cords: {
                x: x,
                y: y
            }
        },
        pboxcords:pboxHash[client.pid].coords()
    });



    moveAction({
        client: client,
        action: {
            pid: client.pid,
            cords: {
                x: x,
                y: y
            }
        }
        //pboxcords:pboxHash[client.pid].coords()
    })

} //tmove

function getup(ev) {

    //var e = ev.originalEvent.touches[0];

    console.log('touch up!!!!!!!!!!!!')

    if (ev.changedTouches != null) ev = ev.changedTouches[0];

    var x = ev.pageX;
    var y = ev.pageY;

    socket.emit('upAction', {
        client: client,
        action: {
            pid: client.pid,
            cords: {
                x: x,
                y: y
            }
        }
    });

    upAction({
        pid: client.pid,
        cords: {
            x: x,
            y: y
        }
    })

} // getup

var getpBox = function(pid) {

    //return pboxHash[pid]

    return pboxHash[pid];
}


var touchAction = function(data) {


        var x = data.cords.x;
        var y = data.cords.y;


        //alert(x+"   "+y)
        //var dv = getdiffv(x,y);

        mbc = cent(getpBox(data.pid));

        var dl = mbc.disTo(new vect(x, y))
        console.log(dl + 'dl c gettouh')


        if (dl < (.5 * ch(getpBox(data.pid)) + (tlength))) {
            //start pull back process

            console.log('pull')
            getpBox(data.pid).pullswitch = true;

        } else {
            // carry on push    
            getpBox(data.pid).mousex = x;
            getpBox(data.pid).mousey = y;

            console.log('push')

        }


        for (var i = 0; i < pboxes.length; i++) {

            var pb = pboxes[i];

            var px = cent(pb).x;
            var py = cent(pb).y;

            var dv = new vect(px - x, py - y);

            //console.log( dv.length+" at touch_   "+dv.prnt() );

            if (dv.length < 200) {

                pb.backgroundColor = "red";
                /*
                            var togo = pb.ctrips[0];

                            togo.p0 = new vect(cent(togo).x, cent(togo).y);


                            //console.log(    );
                            togo.v0 = new vect(cent(togo).x - px, cent(togo).y - py);

                            var stend = godist(x, dv.x, y, dv.y, 800) - 1;

                            togo.v1 = new vect(dv.x * stend, dv.y * stend);

                            togo.p1 = new vect(cent(togo).x + togo.v1.x, cent(togo).y + togo.v1.y);


                            togo.orbit = false;
                            pb.ctrips.splice(0, 1);
                            pb.ctrips.push(togo);

                            */
                //togo.mx = dv.x ;

                //togo.my = dv.y ;
                // if dv.length <70 
            } else {


                pb.backgroundColor = "black";

            } // if dv.length >70 


        }; // pboxes loop


        /*
        var cshape = new svgel('circle')
        .shap('cx',x).shap('cy',y).shap('r',0)
        .stroke('blue').fill('none').sw(2)
        .pendto(get('mbsvglay')).prop('speed',20).prop('limit',100);
        crx.push(cshape);

        */

        //socket.emit('touch', { "x": x , "y": y } );

        //var xPos = e.originalEvent.touches[0].pageX;


    } //touchAction

var moveAction = function(data) {

        var x = data.action.cords.x;
        var y = data.action.cords.y;

        console.log("move action alt"+JSON.stringify(data))

        mbc = cent(getpBox(data.action.pid));

        var dl = mbc.disTo(new vect(x, y))

        if (getpBox(data.action.pid).pullswitch) {

        } else {

            getpBox(data.action.pid).mousex = x;
            getpBox(data.action.pid).mousey = y;

            //var dist = new vect()

            if( data.pboxcords && function(){

                return new vect( data.pboxcords.x - getpBox(data.action.pid).coords().x , data.pboxcords.y - getpBox(data.action.pid).coords().y ).length > 500

            } ){

                getpBox(data.action.pid).stProps({
                    top:data.pboxcords.y+"px",
                    left:data.pboxcords.x+"px",
                });
                        
            }

        }

        if (dl < .5 * (ch(getpBox(data.action.pid)))) {
            //start pull back process

            getpBox(data.action.pid).pullswitch = true;
            console.log('pull')

            //mousex = 'off';
            //mousey = 'off';

        } else {
            // carry on push    

            console.log('push')

        }

        //console.log(mousex + 'moveaction' + mousey);

    } //moveaction


var upAction = function(data) {

        var x = data.cords.x;
        var y = data.cords.y;

        var pb = getpBox(data.pid);
        mbc = cent(pb);

        var dl = mbc.disTo(new vect(x, y))
        console.log(dl + 'dl c')

        if (getpBox(data.pid).pullswitch) {


            getpBox(data.pid).pullswitch = false;

            var px = cent(pb).x;
            var py = cent(pb).y;

            var dv = new vect(px - x, py - y);

            var togo = pb.ctrips[0];

            togo.p0 = new vect(cent(togo).x, cent(togo).y);

            //console.log(    );
            togo.v0 = new vect(cent(togo).x - px, cent(togo).y - py);

            var stend = godist(x, dv.x, y, dv.y, 800) - 1;

            togo.v1 = new vect(dv.x * stend, dv.y * stend);

            togo.p1 = new vect(cent(togo).x + togo.v1.x, cent(togo).y + togo.v1.y);


            togo.orbit = false;
            pb.ctrips.splice(0, 1);
            pb.ctrips.push(togo);


        } else {


        }

        if (dl < .5 * (ch(getpBox(data.pid)))) {
            //start pull back process

            console.log('pull')


        } else {
            // carry on push    

            console.log('push')

        }

    } //upAction


function getdiffv(x, y, scale) {
    var dv = {};

    var box = mbx[0].box;

    var bx = hnum(box);
    var by = tnum(box);

    var dx = bx - x;
    var dy = by - y;

    var dv = new vect(dx, dy);

    var dl = dv.length;

    var nv = dv.unit(scale);

    console.log("get diff  bvect is ::" + mbx[0].getmVect().prnt());

    var mv = mbx[0].getmVect();

    cv = new vect(nv.x + mv.x, nv.y + mv.y);

    mbx[0].setmVect(cv);


} //getdiffv
