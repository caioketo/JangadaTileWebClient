var RenderEngine = function () {
    renderEngine = this;
    this.tileSize = 32;
    this.rowTileCount = 32;
    this.colTileCount = 20;
    this.imageNumTiles = 16;
    this.tilesetImage = new Image();
    this.playerImage = new Image();
    this.playerImage.src = 'res/player.jpg';
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
        messageHelper.SendRequestMovement(AlchemyChatServer, "LEFT");
    }
        //UP
    else if (keyCode == 38) {
        messageHelper.SendRequestMovement(AlchemyChatServer, "UP");
    }
        //RIGHT
    else if (keyCode == 39) {
        messageHelper.SendRequestMovement(AlchemyChatServer, "RIGHT");
    }
        //DOWN
    else if (keyCode == 40) {
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
    var tileX = Math.floor(x / 32) + sX;
    var tileY = Math.floor(y / 32) + sY;
    //alert('x: ' + tileX + ' - y: ' + tileY);
};


function drawImage() {
    requestAnimationFrame(drawImage);
    renderEngine.sX = player.Position.x - (renderEngine.rowTileCount / 2);
    renderEngine.sY = player.Position.y - (renderEngine.colTileCount / 2);
    for (var r = renderEngine.sY; r < renderEngine.sY + renderEngine.colTileCount; r++) {
        for (var c = renderEngine.sX; c < renderEngine.sX + renderEngine.rowTileCount; c++) {
            if (c < 0 || r < 0) {
                //ctx.rect(((c - sX) * tileSize), ((r - sY) * tileSize), tileSize, tileSize);
                //ctx.fill();
            }
            else {
                var tile = map.tiles[c][r].Ground.Id;
                var tileRow = (tile / renderEngine.imageNumTiles) | 0; // Bitwise OR operation
                var tileCol = (tile % renderEngine.imageNumTiles) | 0;
                renderEngine.ctx.drawImage(renderEngine.tilesetImage, (tileCol * renderEngine.tileSize),
                    (tileRow * renderEngine.tileSize), renderEngine.tileSize, renderEngine.tileSize,
                    ((c - renderEngine.sX) * renderEngine.tileSize), ((r - renderEngine.sY) * renderEngine.tileSize), renderEngine.tileSize, renderEngine.tileSize);
                if (c == player.Position.x && r == player.Position.y) {
                    renderEngine.ctx.drawImage(renderEngine.playerImage, 0, 0, renderEngine.tileSize, renderEngine.tileSize,
                        ((c - renderEngine.sX) * renderEngine.tileSize), ((r - renderEngine.sY) * renderEngine.tileSize), renderEngine.tileSize, renderEngine.tileSize);
                }
            }
        }
    }
}