var Fibula = Fibula ||
{

};

Fibula.OrthogonalRenderer = function (settings) {
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || this.settings;

    /**
     * The PIXI Stage object, which is the root of the display tree. If you don't provide this, it will be auto-created.
     * @type {PIXI.Stage}
     */
    this.stage = settings.stage || this.stage;

    /**
     * The PIXI renderer object. If you don't provide this, it will be auto-detected.
     * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer} 
     */
    this.renderer = settings.renderer || this.renderer;

    /**
     * The tile map object.
     * @type {Fibula.TileMap}
     */
    this.tileMap = settings.tileMap || this.tileMap;

    /**
     * The view area object.
     * @type {Object}
     */
    this.viewArea = {
        x: this.viewArea.x,
        y: this.viewArea.y,
        width: this.viewArea.width,
        height: this.viewArea.height
    };
};

Fibula.OrthogonalRenderer.prototype = {
    stage: new PIXI.Stage(0xffffff, true),
    renderer: PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
    tileMap: null,
    viewArea: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    }
};

Fibula.OrthogonalRenderer.prototype.render = function (viewArea) {
    document.body.appendChild(this.renderer.view);

    this.createTileMap(viewArea);
    var me = this;

    function animate() {
        requestAnimFrame(animate);
        me.renderer.render(me.stage);
    }

    requestAnimFrame(animate);
};

/**
 * Creates the tile map textures.
 * @param {Object} viewArea The object that defines the view area to render.
 */
Fibula.OrthogonalRenderer.prototype.createTileMap = function (viewArea) {
    var viewX = viewArea.x || this.viewArea.x,
        viewY = viewArea.y || this.viewArea.y,
        viewWidth = viewArea.width || this.viewArea.width,
        viewHeight = viewArea.height || this.viewArea.height;

    this.tileMap.layers.forEach(function (layer) {
        if (layer.visible) {
            this.createLayers(layer, viewX, viewY, viewWidth, viewHeight, this.tileMap, this.stage);
        }
    }, this);
};

/**
 * Renders the layer to the specific context using a rendering area.
 *
 * @param {Fibula.TileMapLayer} layer The layer to render.
 * @param {number} viewX The x point from where to start rendering.
 * @param {number} viewY The y point from where to start rendering.
 * @param {number} viewWidth The width of the rendering area.
 * @param {number} viewHeight The height of the rendering area.
 * @param {Fibula.TileMap} tileMap The tile map.
 * @param {PIXI.DisplayObjectContainer} stage The PIXI Stage object.
 */
Fibula.OrthogonalRenderer.prototype.createLayers = function (layer, viewX, viewY, viewWidth, viewHeight, tileMap, stage) {
    var tileWidth = tileMap.tileWidth,
        tileHeight = tileMap.tileHeight,
        tileOffsetX = Math.ceil(viewX / tileWidth),
        tileOffsetY = Math.ceil(viewY / tileHeight),

        viewTileWidth = Math.ceil(viewWidth / tileWidth),
        viewTileHeight = Math.ceil(viewHeight / tileHeight),

        // Set min and max to have one more tile for half visible tiles
        visibleTileMinX = tileOffsetX - 1,
        visibleTileMaxX = tileOffsetX + viewTileWidth + 1,

        visibleTileMinY = tileOffsetY - 1,
        visibleTileMaxY = tileOffsetY + viewTileHeight + 1,

        texture = PIXI.Texture.fromImage(layer.tileSet.image.src),

        x, y, tile, tileSetCoordinates, orthogonalX, orthogonalY, sprite;

    for (x = visibleTileMinX; x < visibleTileMaxX; x++) {
        for (y = visibleTileMinY; y < visibleTileMaxY; y++) {

            if (typeof layer.tiles[x] !== "undefined") {
                tile = layer.tiles[x][y];
            }

            if (!tile) {
                continue;
            }

            tileSetCoordinates = layer.tileSet.findCoordinates(tile.tileSetPosition, tileWidth, tileHeight);

            orthogonalX = x * tileWidth;
            orthogonalY = y * tileHeight;

            sprite = new PIXI.TilingSprite(texture, tileWidth, tileHeight);
            sprite.x = orthogonalX;
            sprite.y = orthogonalY;
            sprite.tilePosition.x = -tileSetCoordinates.x;
            sprite.tilePosition.y = -tileSetCoordinates.y;

            stage.addChild(sprite);
        }
    }
};

Fibula.OrthogonalRenderer.prototype.constructor = Fibula.OrthogonalRenderer;

Fibula.Tile = function (x, y, tileSetPosition) {
    /**
     * The position of the tile set of this tile.
     * @type {number}
     */
    this.tileSetPosition = tileSetPosition;

    /**
     * The x coordinate of the tile on the tile map.
     * @type {number}
     */
    this.x = x;

    /**
     * The y coordinate of the tile on the tile map.
     * @type {number}
     */
    this.y = y;
};

Fibula.Tile.prototype.constructor = Fibula.Tile;


Fibula.TileMap = function (settings) {
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || {};

    /**
     * The tile width for this tile map.
     * @type {number}
     */
    this.tileWidth = settings.tileWidth || this.tileWidth;

    /**
     * The tile height of this tile map.
     * @type {number}
     */
    this.tileHeight = settings.tileHeight || this.tileHeight;

    /**
     * The array of tile map layers.
     * @type {Array}<Fibula.TileMapLayer>
     */
    this.layers = settings.layers || [];
    /**
     * The string key of the tile map.
     * @type {string}
     */
    this.key = settings.key || this.key;

};

Fibula.TileMap.prototype = {
    constructor: Fibula.TileMap,
    tileWidth: false,
    tileHeight: false,
    layers: false,
    key: 'no_key'
};

Fibula.TileMapLayer = function (settings) {
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || {};

    /**
     * The name of the layer.
     * @type {string}
     */
    this.name = settings.name || this.name;

    /**
     * The opacity of the layer (1 == 100%).
     * @type {number}
     */
    this.opacity = settings.opacity || this.opacity;

    /**
     * Weather the layer is visible or not.
     * @type {boolean}
     */
    this.visible = typeof settings.visible !== "undefined" ? settings.visible : this.visible;

    /**
     * The tile set to be used with this layer.
     * @type {Fibula.TileSet}
     */
    this.tileSet = settings.tileSet || this.tileSet;

    /**
     * The array of tiles of this layer.
     * @type {Array}
     */
    this.tiles = [];

    /**
     * The width of the layer.
     * @type {number}
     */
    this.width;

    /**
     * The height of the layer.
     * @type {number}
     */
    this.height;

    if (settings.data) {
        this.fillTiles(settings.data);
    }
};

Fibula.TileMapLayer.prototype = {
    name: 'no_name',
    tiles: false,
    opacity: 1,
    visible: true,
    tileSet: null,
    width: false,
    height: false
};

/**
 * Fills the layer with tiles using the data information of the tile set.
 * 
 * @param {Array} data The tile set data array for the layer.
 */
Fibula.TileMapLayer.prototype.fillTiles = function (data) {
    this.tiles = [];
    this.height = data.length;
    this.width = data[0].length;

    var pos;

    for (var x = 0; x < this.width; x++) {
        this.tiles[x] = [];

        for (var y = 0; y < this.height; y++) {
            pos = data[y][x] != null ? data[y][x] : NaN;
            this.tiles[x][y] = new Fibula.Tile(x, y, pos);
        }
    }
};

Fibula.TileMapLayer.prototype.constructor = Fibula.TileMapLayer;

Fibula.TileMapParser = function () {

};

Fibula.TileMapParser.prototype.constructor = Fibula.TileMapParser;

Fibula.TileSet = function (image) {
    /**
     * The image to be used on the tile set.
     * @type {HTMLImageElement}
     */
    this.image = image;

    /**
     * The width of the tile set.
     * @type {number}
     */
    this.width = image.width;

    /**
     * The height of the tile set.
     * @type {number}
     */
    this.height = image.height;
};

Fibula.TileSet.prototype = {
    image: false,
    width: false,
    height: false
};

/**
 * Finds the coordinates for a given tile on the tile set.
 * 
 * @param {number} index The tile index.
 * @param {number} tileWidth The tile width.
 * @param {number} tileHeight The tile height.
 * @returns {{x: number, y: number}}
 */
Fibula.TileSet.prototype.findCoordinates = function (index, tileWidth, tileHeight) {
    var tilesPerColumn = this.width / tileWidth,
        tileX = Math.floor(index / tilesPerColumn),
        tileY = Math.floor(index % tilesPerColumn),
        x = tileY * tileHeight,
        y = tileX * tileWidth;

    return { x: x, y: y };
};

Fibula.TileSet.prototype.constructor = Fibula.TileSet;

Fibula.IsometricRenderer = function (settings) {
    /**
     * The settings object.
     * @type {Object}
     */
    settings = settings || this.settings;

    /**
     * The PIXI Stage object, which is the root of the display tree. If you don't provide this, it will be auto-created.
     * @type {PIXI.Stage}
     */
    this.stage = settings.stage || this.stage;

    /**
     * The PIXI renderer object. If you don't provide this, it will be auto-detected.
     * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
     */
    this.renderer = settings.renderer || this.renderer;

    /**
     * The tile map object.
     * @type {Fibula.TileMap}
     */
    this.tileMap = settings.tileMap || this.tileMap;

    /**
     * The view area object.
     * @type {Object}
     */
    this.viewArea = {
        x: this.viewArea.x,
        y: this.viewArea.y,
        width: this.viewArea.width,
        height: this.viewArea.height
    };
};

Fibula.IsometricRenderer.prototype = {
    stage: new PIXI.Stage(0xffffff, true),
    renderer: PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
    viewArea: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    }
};

/**
 * Renders the tile map to the canvas.
 * @param {Object} viewArea The object that defines the view area to render.
 */
Fibula.IsometricRenderer.prototype.render = function (viewArea) {
    document.body.appendChild(this.renderer.view);

    this.createTileMap(viewArea);
    var me = this;

    function animate() {
        requestAnimFrame(animate);
        me.renderer.render(me.stage);
    }

    requestAnimFrame(animate);
};

Fibula.IsometricRenderer.prototype.createTileMap = function (viewArea) {
    var viewX = viewArea.x || this.viewArea.x,
        viewY = viewArea.y || this.viewArea.y,
        viewWidth = viewArea.width || this.viewArea.width,
        viewHeight = viewArea.height || this.viewArea.height;

    this.tileMap.layers.forEach(function (layer) {
        if (layer.visible) {
            this.createLayers(layer, viewX, viewY, viewWidth, viewHeight, this.tileMap, this.stage);
        }
    }, this);
};

/**
 * Renders the layer to the specific context using a rendering area.
 *
 * @param {Fibula.TileMapLayer} layer The layer to render.
 * @param {number} viewX The x point from where to start rendering.
 * @param {number} viewY The y point from where to start rendering.
 * @param {number} viewWidth The width of the rendering area.
 * @param {number} viewHeight The height of the rendering area.
 * @param {Fibula.TileMap} tileMap The tile map.
 * @param {PIXI.DisplayObjectContainer} stage The PIXI Stage object.
 */
Fibula.IsometricRenderer.prototype.createLayers = function (layer, viewX, viewY, viewWidth, viewHeight, tileMap, stage) {
    var tileWidth = tileMap.tileWidth,
        tileHeight = tileMap.tileHeight * 2,
        tileOffsetX = Math.ceil(viewX / tileWidth),
        tileOffsetY = Math.ceil(viewY / tileHeight),

        viewTileWidth = Math.ceil(viewWidth / tileWidth),
        viewTileHeight = Math.ceil(viewHeight / tileHeight),

        // Set min and max to have one more tile for half visible tiles
        visibleTileMinX = tileOffsetX - 1,
        visibleTileMaxX = tileOffsetX + viewTileWidth + 1,

        visibleTileMinY = tileOffsetY - 1,
        visibleTileMaxY = tileOffsetY + viewTileHeight + 1,

        texture = PIXI.Texture.fromImage(layer.tileSet.image.src),

        x, y, tile, tileSetCoordinates, isometricX, isometricY, sprite;

    for (x = visibleTileMinX; x < visibleTileMaxX; x++) {
        for (y = visibleTileMinY; y < visibleTileMaxY; y++) {

            if (typeof layer.tiles[x] !== "undefined") {
                tile = layer.tiles[x][y];
            }

            if (!tile) {
                continue;
            }

            tileSetCoordinates = layer.tileSet.findCoordinates(tile.tileSetPosition, tileWidth, tileHeight);

            isometricX = (x - y) * (tileWidth / 2);
            isometricY = (x + y) * (tileHeight / 4); // Divide by 4 to get the 2:1 ratio (i.e.: 64x32)

            isometricX += tileWidth * 2; // Adjust the center of the "camera"

            sprite = new PIXI.TilingSprite(texture, tileWidth, tileHeight);
            sprite.x = isometricX;
            sprite.y = isometricY;
            sprite.tilePosition.x = -tileSetCoordinates.x;
            sprite.tilePosition.y = -tileSetCoordinates.y;

            stage.addChild(sprite);
        }
    }
};

Fibula.IsometricRenderer.prototype.constructor = Fibula.IsometricRenderer;