var RenderEngine = function () {
    renderEngine = this;
    this.tileSize = 32;
    this.rowTileCount = 32;
    this.colTileCount = 20;
    this.imageNumTiles = 16;
    this.tilesetImage = new Image();
    this.creatureTileset = new Image();
    this.playerImage = new Image();
    this.playerImage.src = 'res/c1.png';
    this.tilesetImage.src = 'res/tileset.png';
    this.sX = 0;
    this.sY = 0;
}

RenderEngine.prototype.Start = function (canvas) {
    this.canvas = canvas;
    this.canvas.tabIndex = 1000;
    this.canvas.style.outline = "none";
    this.canvas.addEventListener('keydown', doKeyDown, false);
    this.canvas.addEventListener('click', onClickCanvas, false);
    this.ctx = this.canvas.getContext('2d');
    drawImage();
}

function doKeyDown(e) {
    var keyCode = e.which;
    //LEFT
    if (keyCode == 37) {
        player.Move('LEFT');
        messageHelper.SendRequestMovement(AlchemyChatServer, "LEFT");
    }
        //UP
    else if (keyCode == 38) {
        player.Move('UP');
        messageHelper.SendRequestMovement(AlchemyChatServer, "UP");
    }
        //RIGHT
    else if (keyCode == 39) {
        player.Move('RIGHT');
        messageHelper.SendRequestMovement(AlchemyChatServer, "RIGHT");
    }
        //DOWN
    else if (keyCode == 40) {
        player.Move('DOWN');
        messageHelper.SendRequestMovement(AlchemyChatServer, "DOWN");
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
    x -= renderEngine.canvas.offsetLeft;
    y -= renderEngine.canvas.offsetTop;
    var tileX = Math.floor(x / 32) + renderEngine.sX;
    var tileY = Math.floor(y / 32) + renderEngine.sY;
};


function drawImage() {
    requestAnimationFrame(drawImage);
    camera.draw(renderEngine.ctx);
}