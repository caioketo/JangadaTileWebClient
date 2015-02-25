var CanvasFullMap = Class.extend({
    x: 999,
    y: 999,
    w: 100,
    h: 100,
    tileW: 0,
    tileH: 0,
    cvsHdl: null,
    ctx: null,
    //-----------------------------
    create: function (width, height) {
        this.x = -1;
        this.y = -1;
        this.w = width * renderEngine.tileSize;
        this.h = height * renderEngine.tileSize;
        this.tileW = width;
        this.tileH = height;
        $('<canvas id="main2" width="' + this.w + '" height="' + this.h + '" style="display: none;"></canvas>').appendTo(jangUI.body);
        var can2 = document.getElementById('main2');
        this.cvsHdl = can2;
        this.ctx = can2.getContext('2d');
    },
    //----------------------------
    update: function () {
        if (this.x < 0 || map.startX < this.x) {
            this.x = map.startX;
        }
        if (this.y < 0 || map.startY < this.y) {
            this.y = map.startY;
        }
        this.sX = player.Position.x - 19;
        this.sY = player.Position.y - 13;
        for (var r = this.y; r < this.y + this.tileH; r++) {
            for (var c = this.x; c < this.x + this.tileW; c++) {
                if (c > 0 && r > 0) {
                    var xTile = map.tiles[c];
                    if (xTile == null || typeof xTile == 'undefined') {
                        continue;
                    }
                    var tile = xTile[r];
                    if (tile == null || typeof tile == 'undefined') {
                        continue;
                    }
                    var ground = tile.Ground.Id;
                    var tileRow = (ground / renderEngine.imageNumTiles) | 0;
                    var tileCol = (ground % renderEngine.imageNumTiles) | 0;
                    this.ctx.drawImage(renderEngine.tilesetImage, (tileCol * renderEngine.tileSize),
                        (tileRow * renderEngine.tileSize), renderEngine.tileSize, renderEngine.tileSize,
                        ((c - this.sX) * renderEngine.tileSize), ((r - this.sY) * renderEngine.tileSize),
                        renderEngine.tileSize, renderEngine.tileSize);

                    if (tile.Creatures.length > 0) {
                        tile.Creatures[0].Sprite.Draw(this.ctx, ((c - this.sX) * renderEngine.tileSize),
                            ((r - this.sY) * renderEngine.tileSize));
                    }

                    if (c == player.Position.x && r == player.Position.y) {
                        player.Sprite.Draw(this.ctx, ((c - this.sX) * renderEngine.tileSize),
                            ((r - this.sY) * renderEngine.tileSize));
                    }
                }
            }
        }
    }
});