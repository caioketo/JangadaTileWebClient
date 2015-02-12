var client;
var messageHelper = new MessageHelper();
var jangUI;
var tileSize = 32;       // The size of a tile (32×32)
var rowTileCount = 20;   // The number of tiles in a row of our background
var colTileCount = 32;   // The number of tiles in a column of our background
var imageNumTiles = 16;  // The number of tiles per row in the tileset image
var canvas;
var ctx;
var map = new Map();
var player;
var Client = function () {
    jangUI = new JangUI($('body'));
};

Modernizr.load({
    test: Modernizr.websockets,
    nope: 'js/web-socket-js/web_socket.js'
});

// Set URL of your WebSocketMain.swf here, for web-socket-js
WEB_SOCKET_SWF_LOCATION = 'js/web-socket-js/WebSocketMain.swf';
WEB_SOCKET_DEBUG = true;

var AlchemyChatServer = {};
var me = {};
var tilesetImage = new Image();
var playerImage = new Image();
playerImage.src = 'res/player.jpg';
Client.prototype.Start = function () {
    tilesetImage.src = 'res/tileset.png';

    AlchemyChatServer = new Alchemy({
        Server: '127.0.0.1',
        Port: '81',
        Action: 'chat',
        DebugMode: true
    });

    AlchemyChatServer.Connected = function () {
        console.log('Connection established!');
        jangUI.CreateLogin();
    };

    AlchemyChatServer.Disconnected = function () {
        console.log('Connection closed.');
    };

    AlchemyChatServer.MessageReceived = function (event) {
        Parser.Parse(AlchemyChatServer, event.data);
    };

    AlchemyChatServer.Start();
};

function ParseResponse(response) {
    
};

Client.prototype.Login = function (user, password) {
    messageHelper.SendLogin(AlchemyChatServer, user, password);
}

Client.prototype.SelectChar = function (charId) {
    messageHelper.SendSelectChar(AlchemyChatServer, charId);
}

Client.prototype.Draw = function () {    
    canvas = document.getElementById('main');
    canvas.addEventListener('keydown', doKeyDown, true);
    canvas.addEventListener('click', onClickCanvas, false);
    ctx = canvas.getContext('2d');
    drawImage();
}

client = new Client();

client.Start();

function doKeyDown(e) {
    var keyCode = e.which;
    //LEFT
    if (keyCode == 37) {
    }
    //UP
    else if (keyCode == 38) {
    }
    //RIGHT
    else if (keyCode == 39) {
    }
    //DOWN
    else if (keyCode == 40) {
    }
};

function onClickCanvas(e) {
    e = e || window.event;

    var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var tileX = Math.floor(x / 32) + sX;
    var tileY = Math.floor(y / 32) + sY;
    alert('x: ' + tileX + ' - y: ' + tileY);
};

var sX;
var sY;

function drawImage() {
    sX = player.Position.x - 16;
    sY = player.Position.y - 10;
    for (var r = sY; r < sY + 20; r++) {
        for (var c = sX; c < sX + 32; c++) {
            var tile = map.tiles[c][r].Ground.Id;
            var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
            var tileCol = (tile % imageNumTiles) | 0;
            ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, ((c - sX) * tileSize), ((r - sY) * tileSize), tileSize, tileSize);
            if (c == player.Position.x && r == player.Position.y) {
                ctx.drawImage(playerImage, 0, 0, tileSize, tileSize, ((c - sX) * tileSize), ((r - sY) * tileSize), tileSize, tileSize);
            }
        }
    }
    requestAnimationFrame(drawImage);
}