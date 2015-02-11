var Map = function () {
    this.width = 0;
    this.height = 0;
    this.tiles = [];
}


Map.prototype.SetTiles = function (data) {
    this.Id = data.areaId;
    this.width = data.width;
    this.height = data.height;
    this.startX = data.startX;
    this.startY = data.startY;
    var i = 0;
    for (var x = data.startX; x < data.startX + 26; x++) {
        for (var y = data.startY; y < data.startY + 38; y++) {
            var tileDesc = data.tiles[i];
            var tile = new Tile(new Position(x, y, 1));
            tile.Ground = new Item(tileDesc.groundId);
            if (typeof this.tiles[x] === 'undefined') {
                this.tiles[x] = [];
            }
            this.tiles[x][y] = tile;
            i++;
        }
    }
}





var Position = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

var Item = function (id) {
    this.Id = id;
}

var Tile = function (position) {
    this.Position = position;
    this.Ground;
    this.Items = [];
}


