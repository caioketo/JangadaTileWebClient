var client;
var messageHelper = new MessageHelper();
var jangUI;
var map = new Map();
var camera;
var renderEngine = new RenderEngine();
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
IS_LOCAL = true;

var AlchemyChatServer = {};
var me = {};
Client.prototype.Start = function () {
    if (IS_LOCAL) {
        AlchemyChatServer = new Alchemy({
            Server: '127.0.0.1',
            Port: '81',
            Action: 'chat',
            DebugMode: true
        });
    }
    else {
        AlchemyChatServer = new Alchemy({
            Server: 'jangadaserver.no-ip.info',
            Port: '81',
            Action: 'chat',
            DebugMode: true
        });
    }

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
    renderEngine.Start(canvas);
}

client = new Client();

client.Start();







