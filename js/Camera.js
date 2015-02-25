var Camera = Class.extend({
    player: null,
    w: 0,
    h: 0,
    fullMap: null,
    create: function (width, height, player) {
        this.w = width;
        this.h = height;
        this.player = player;
        this.fullMap = new CanvasFullMap();
        this.fullMap.create(38, 26);
        this.fullMap.update();
    },
    draw: function (context) {
        this.fullMap.update();
        var mapX = (this.player.Position.x - 16 - this.fullMap.x) * renderEngine.tileSize;
        var mapY = (this.player.Position.y - 10 - this.fullMap.y) * renderEngine.tileSize;
        //mapX += this.player.Sprite.stepX;
        //mapY += this.player.Sprite.stepY;
        var mapW = 32 * renderEngine.tileSize;
        var mapH = 20 * renderEngine.tileSize;
        console.log('SpriteStep: x: ' + this.player.Sprite.stepX + ' - y: ' + this.player.Sprite.stepY);
        console.log('ViewArea: x: ' + mapX + ' - y: ' + mapY + ' - w: ' + mapW + ' - h: ' + mapH);
        context.drawImage(this.fullMap.cvsHdl, mapX, mapY, mapW, mapH, 0, 0, mapW, mapH);
    }
});