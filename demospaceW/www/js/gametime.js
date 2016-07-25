var showWelcome = function() {

        get('welcome').stprop('display', 'block');

        get('startplay').stprop('display', 'none');

        get('startname').stprop('display', 'none');

    } //showWelcome


var hitEvent = function(data) {

        console.log("hit even :: ", data)

                socket.emit('hitEvent', { client: client , hit:data });

    } //hitEvent

var getRooms = function() {

        socket.emit('getGames', { client: client });

    } //getRooms


var gotostartplay = function() {

    get('welcome').stprop('display', 'none');

    get('startplay').stprop('display', 'block');

    get('startname').stprop('display', 'none');

    console.log('gotostartplay')

}

socket.on('showGames', function(data) {

    console.log('showGames' + JSON.stringify(data))

    games = Object.keys(data.games).map(function(key) {

        return data.games[key]


    });

    console.log(data.games)

    get('joinscr').inn('').pendray(games, function(game) {

        return div().cl('row joinrow').pendray([1], function(dex) {

            return div().cl('col-xs-6 col-xs-offset-3 joinlet').pend(el('p').inn(game.name)).props({
                ontouchstart: function() {

                    socket.emit('JoinGame', { client: client, game: game });

                }
            })
        })

    });

    gotostartplay();

});

var startnewgame = function() {

    get('welcome').stprop('display', 'none');

    get('startplay').stprop('display', 'none');

    get('startname').stprop('display', 'block');

}

var namePutGo = function(e, put) {

        console.log('nameput' + put.value)

        var key = e.keyCode;

        console.log(key)

        if (key === 13) {

            sendNewGameRequest(put.value);

        }

    } //namePutGo

socket.on('JoinedRoom', function(data) {


    if (!flightSocket) {

        flightSocket = true;

        setFlightLauncher();

    } //??flightSocket

    if (data.cancleFlightLauncher) {

        client.control = false;

        cancleFlightLauncher();


    } else {

        client.control = true;

        // eventually 
        //cancleFlightsockets?

    } //cancleFlightLauncher

    get('welcome').stprop('display', 'none');

    get('startplay').stprop('display', 'none');

    get('startname').stprop('display', 'none');

    console.log('you have joined room :: ' + JSON.stringify(data));

    client.room = data.game.name

    pboxes.map(function(pbox) {

        pbox.parentNode.removeChild(pbox);

        pbox.ctrips.map(function(ctrip) {

            ctrip.parentNode.removeChild(ctrip);

        })

        pbox.ctrips = [];

    })

    pboxes = [];
    pboxHash = {};

    sboxes = [];

    data.game.clients.map(function(listclient) {

        makePbox({ client: listclient });

    })

    var filteresClients = data.game.clients.filter(function(listclient) {

        return listclient.id != client.id; //&& check for pbox in pboxes

    })

    console.log('PId list after filter', filteresClients);
    /*
        filteresClients.map(function(listclient) {

            makePbox({client:listclient});

        })*/

});


socket.on('userJoined', function(data) {
    /*

        console.log('user joined room :: ' + JSON.stringify(data));

        pboxes.map(function(pbox) {

            pbox.parentNode.removeChild(pbox);

            pbox.ctrips.map(function(ctrip) {

                ctrip.parentNode.removeChild(ctrip);


            })

            pbox.ctrips = [];

        })

        pboxes = [];
        pboxHash = {};

        sboxes = [];

        data.game.clients.map(function(listclient) {

            makePbox({ client: listclient });

        })
    */


    pboxHash[client.pid].stProps({
            top: (window.innerHeight / 2) + 'px',
            left: (window.innerWidth / 2) + 'px'
        })
        /*.props({


        })*/

    makePbox(data);

});


var sendNewGameRequest = function(word) {

    console.log('send')
    socket.emit('newgame', {
        client: client,
        game: {
            name: word
        }
    });

    //get('startname').stprop('display','none');

}
