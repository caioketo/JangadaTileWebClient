var CreatureSprite = function (creature) {
    this.Creature = creature;
    this.Texture = renderEngine.playerImage;
    var animations = [];
    animations['UP'] = {
        y: 2,
        length: 4
    };
    animations['DOWN'] = {
        y: 1,
        length: 4
    };
    animations['LEFT'] = {
        y: 3,
        length: 4
    };
    animations['RIGHT'] = {
        y: 0,
        length: 4
    };
    this.animations = animations;
    this.currentAnimation = {
        y: 0,
        length: 5
    };
    this.currentFrame = 0;
    this.moving = false;
};

CreatureSprite.prototype.Move = function (direction) {
    this.currentAnimation = this.animations[direction];
    this.currentFrame = 0;
    this.iStepX = Math.floor((renderEngine.tileSize / this.currentAnimation.length));
    this.iStepY = Math.floor((renderEngine.tileSize / this.currentAnimation.length));
    if (direction == 'LEFT') {
        this.iStepX = -this.iStepX;
    }
    else if (direction == 'UP') {
        this.iStepY = -this.iStepY
    }
    if (direction == 'LEFT' || direction == 'RIGHT') {
        this.iStepY = 0;
    }
    else if (direction == 'UP' || direction == 'DOWN') {
        this.iStepX = 0;
    }
    this.stepX = 0;
    this.stepY = 0;
    this.moving = true;
    setInterval(this.nextFrame, this.Creature.Speed * 10, this);
}

CreatureSprite.prototype.nextFrame = function (csprite) {
    if (csprite.currentFrame + 1 == csprite.currentAnimation.length) {
        csprite.moving = 0;
    }
    csprite.currentFrame = (csprite.currentFrame + 1) % csprite.currentAnimation.length;
    csprite.stepX += csprite.iStepX;
    csprite.stepY += csprite.iStepY;
};

CreatureSprite.prototype.Draw = function (context, x, y) {
    var renderX = x;
    var renderY = y;
    if (this.moving) {
        renderX -= this.stepX;
        renderY -= this.stepY;
    }
    context.drawImage(this.Texture, this.currentFrame * renderEngine.tileSize, this.currentAnimation.y * renderEngine.tileSize,
        renderEngine.tileSize, renderEngine.tileSize, renderX, renderY, renderEngine.tileSize, renderEngine.tileSize);
    var textX = renderX + 3;
    var textY = renderY - 5;
    context.font = '8pt Sans-serif';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.textAlign = 'center';
    var metrics = context.measureText(this.Creature.Name);
    var width = Math.floor(metrics.width);
    textX = Math.floor(Math.floor((renderX + (renderEngine.tileSize / 2))) - Math.floor((width / 2))) + 3;
    context.strokeText(this.Creature.Name, textX, textY);
    context.fillStyle = 'LimeGreen';
    context.fillText(this.Creature.Name, textX, textY);
};