var Camera = Class.extend({
    player: null,
    w: 0,
    h: 0,
    fullMap: null,
    create: function (width, height, player) {
        this.w = width;
        this.h = height;
        this.player = player;
        //this.fullMap = new CanvasFullMap();
        //this.fullMap.create(10000, 10000);
        //this.fullMap.update();
    },
    draw: function (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.sX = player.Position.x - 16;
        this.sY = player.Position.y - 10;
        this.eX = player.Position.x + 16;
        this.eY = player.Position.y + 10;
        for (var r = this.sY; r < this.eY; r++) {
            for (var c = this.sX; c < this.eX; c++) {
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
                    context.drawImage(renderEngine.tilesetImage, (tileCol * renderEngine.tileSize),
                        (tileRow * renderEngine.tileSize), renderEngine.tileSize, renderEngine.tileSize,
                        ((c - this.sX) * renderEngine.tileSize), ((r - this.sY) * renderEngine.tileSize),
                        renderEngine.tileSize, renderEngine.tileSize);

                    if (tile.Creatures.length > 0) {
                        tile.Creatures[0].Sprite.Draw(context, ((c - this.sX) * renderEngine.tileSize),
                            ((r - this.sY) * renderEngine.tileSize));
                    }

                    if (c == player.Position.x && r == player.Position.y) {
                        player.Sprite.Draw(context, ((c - this.sX) * renderEngine.tileSize),
                            ((r - this.sY) * renderEngine.tileSize));
                    }
                }
            }
        }
    }
});