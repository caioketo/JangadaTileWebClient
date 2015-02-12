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
    player = new Player(data.player.playerGuid, data.player.playerPosition);
    var i = 0;
    for (var x = data.startX; x < data.startX + 38; x++) {
        for (var y = data.startY; y < data.startY + 26; y++) {
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

Map.prototype.SetMapSlice = function (data) {
    player.SetPosition(data.newPosition);
    var i = 0;
    for (var x = data.mapSlice.startX; x < data.mapSlice.endX + 1; x++) {
        for (var y = data.mapSlice.startY; y < data.mapSlice.endY + 1; y++) {
            var tileDesc = data.mapSlice.tiles[i];
            var tile = new Tile(new Position(x, y, 1));
            tile.Ground = new Item(tileDesc.groundId);
            if (typeof this.tiles[x] === 'undefined' || this.tiles[x] == null) {
                this.tiles[x] = [];
            }
            this.tiles[x][y] = tile;
            i++;
        }
    }
    var nullMem = player.Position.x + 20;
    for (var n = nullMem; n < nullMem + 5; n++) {
        this.tiles[n] = null;
    }
    nullMem = player.Position.x - 20;
    for (var n = nullMem; n > nullMem - 5; n--) {
        this.tiles[n] = null;
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


var Player = function (guid, position) {
    this.Guid = guid;
    this.Position = position;
}

Player.prototype.SetPosition = function (position) {
    this.Position = position;
}