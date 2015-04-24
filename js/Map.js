var Map = function () {
    this.width = 0;
    this.height = 0;
    this.tiles = [];
    this.Creatures = [];
}


Map.prototype.SetTiles = function (data) {
    this.Id = data.areaId;
    this.width = data.width;
    this.height = data.height;
    this.startX = data.startX;
    this.startY = data.startY;
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
    player = new Player(data.player.playerGuid, data.player.playerPosition, data.player.name, data.player.speed);
    for (var p = 0; p < data.players.length; p++) {
        map.AddPlayer(data.players[p]);
    }
    for (var c = 0; c < data.creatures.length; c++) {
        map.AddCreature(data.creatures[c]);
    }
    camera = new Camera();
    camera.create(32, 20, player);
}

Map.prototype.SetMapSlice = function (data) {
    player.SetPosition(data.newPosition);
    //this.startX = data.mapSlice.startX;
    //this.startY = data.mapSlice.startY;
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
}

Map.prototype.AddPlayer = function (data) {
    var creature = new Player(data.playerGuid, data.playerPosition, data.name, data.speed);
    creature.Tile = map.tiles[data.playerPosition.x][data.playerPosition.y];
    map.tiles[data.playerPosition.x][data.playerPosition.y].Creatures[0] = creature;
    map.Creatures.push(creature);
}

Map.prototype.AddCreature = function (data) {
    //TODO Speed
    var creature = new Creature(data.creatureGuid, data.creaturePosition, data.name, 1);
    creature.Tile = map.tiles[data.creaturePosition.x][data.creaturePosition.y];
    map.tiles[data.creaturePosition.x][data.creaturePosition.y].Creatures[0] = creature;
    map.Creatures.push(creature);
}

Map.prototype.GetCreature = function (guid) {
    for (var i = 0; i < map.Creatures.length; i++) {
        if (map.Creatures[i].Guid == guid) {
            return map.Creatures[i];
        }
    }
    return null;
}

Map.prototype.CreaturesInViewArea = function (pos) {
    var creaturesInView = [];

    for (var i = 0; i < map.Creatures.length; i++) {
        if (map.Creatures[i].IsVisible(pos) && map.Creatures[i].Guid !== player.Guid) {
            creaturesInView.push(map.Creatures[i])
        }
    }
    return creaturesInView;
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
    this.Creatures = [];
}




var Creature = function (guid, position, name, speed, textId) {
    this.Guid = guid;
    this.Position = position;
    this.TextureId = 0;
    this.Tile = map.tiles[this.Position.x][this.Position.y];
    this.Name = name;
    this.Sprite = new CreatureSprite(this);
    this.Speed = speed;
}

Creature.prototype.SetPosition = function (position) {
    this.Position = position;
    map.tiles[this.Position.x][this.Position.y].Creatures.push(this);
}

Creature.prototype.IsVisible = function (position) {
    return (position.x >= this.Position.x - 16 && position.x <= this.Position.x + 16 &&
                position.y >= this.Position.y - 10 && position.y <= this.Position.y + 10 &&
                position.z == this.Position.z);
}

var Player = function (guid, position, name, speed) {
    this.Guid = guid;
    this.Position = position;
    this.Tile = map.tiles[this.Position.x][this.Position.y];
    this.Name = name;
    this.TextureId = 0;
    this.Sprite = new CreatureSprite(this);
    this.Speed = speed;
}

Player.prototype.SetPosition = function (position) {
    var index = map.tiles[this.Position.x][this.Position.y].Creatures.indexOf(this);
    map.tiles[this.Position.x][this.Position.y].Creatures.splice(index, 1);
    this.Position = position;
    map.tiles[this.Position.x][this.Position.y].Creatures.push(this);
}

Player.prototype.Move = function (direction) {
    this.Sprite.Move(direction);
}


Player.prototype.IsVisible = function (position) {
    return (position.x >= this.Position.x - 19 && position.x <= this.Position.x + 19 &&
                position.y >= this.Position.y - 13 && position.y <= this.Position.y + 13 &&
                position.z == this.Position.z);
}