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
    ctx = canvas.getContext('2d');
    drawImage();
}

client = new Client();

client.Start();

function onClickCanvas(event) {
    event = event || window.event;

    var x = event.pageX,
        y = event.pageY;

    alert(x + ' ' + y);

    var tileX = (y / 32) + (x / 64);

    var tileY = (x / 64) - (y / 32);

    alert(tileX + ' ' + tileY);
};

function drawImage() {
    for (var r = map.startX; r < map.startX + rowTileCount; r++) {
        for (var c = map.startY; c < map.startY + colTileCount; c++) {
            var tile = map.tiles[r][c].Ground.Id;
            var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
            var tileCol = (tile % imageNumTiles) | 0;
            ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, ((c - map.startY) * tileSize), ((r - map.startX) * tileSize), tileSize, tileSize);
        }
    }
    requestAnimationFrame(drawImage);
}