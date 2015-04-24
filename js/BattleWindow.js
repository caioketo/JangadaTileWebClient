var mouseOverI = -1;
var mouseClickedI = -1;
var dialogWindow;
var dialogOffset = 0;
var dialogScroll = 0;
var battleWindowOffset = 5;

var BattleWindow = function () {
    this.SelectedIndex = 0;
    this.canvas = document.getElementById('battle');
    this.canvas.addEventListener('mousemove', handleMouseMove, false);
    this.canvas.addEventListener('click', handleMouseClick, false);
    this.ctx = this.canvas.getContext('2d');
    $("#dialog").dialog();
    dialogWindow = $("#dialog");
    dialogOffset = dialogWindow.offset();
    dialogScroll = dialogWindow.scrollTop();
    dialogWindow.on("dialogdragstop", function (event, ui) {
        dialogOffset = dialogWindow.offset();
    });
    dialogWindow.on("scroll", function (event, ui) {
        dialogScroll = dialogWindow.scrollTop();
    });
}

BattleWindow.prototype.Draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var creaturesView = map.CreaturesInViewArea(player.Position);
    this.canvas.height = battleWindowOffset + (creaturesView.length * ((renderEngine.tileSize / 2) + 2));
    dialogWindow.height = battleWindowOffset + (creaturesView.length * ((renderEngine.tileSize / 2) + 2)) + 20;
    for (var i = 0; i < creaturesView.length; i++) {
        var renderY = (((renderEngine.tileSize / 2) + 2) * i) + battleWindowOffset;
        this.ctx.drawImage(renderEngine.playerImage, 0, 0, renderEngine.tileSize, renderEngine.tileSize,
            2, renderY, renderEngine.tileSize / 2, renderEngine.tileSize / 2);
        if (mouseOverI == i) {
            this.ctx.save();
            this.ctx.beginPath();
            //this.ctx.strokeStyle = "#FF0000";
            this.ctx.strokeStyle = "#000000";
            this.ctx.lineWidth = this.strokewidth;
            this.ctx.rect(1, renderY - 2, (renderEngine.tileSize / 2) + 2, (renderEngine.tileSize / 2) + 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
        if (mouseClickedI == i) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#FF0000";
            //this.ctx.strokeStyle = "#000000";
            this.ctx.lineWidth = this.strokewidth;
            this.ctx.rect(1, renderY - 2, (renderEngine.tileSize / 2) + 2, (renderEngine.tileSize / 2) + 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
        var textX = renderEngine.tileSize + 5;
        var textY = (((renderEngine.tileSize / 2) + 2) * i) + (renderEngine.tileSize / 2) - 4;
        this.ctx.font = '6pt Sans-serif';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.textAlign = 'right';
        this.ctx.strokeText(creaturesView[i].Name, textX, textY);
        this.ctx.fillStyle = 'LimeGreen';
        this.ctx.fillText(creaturesView[i].Name, textX, textY);
    }
}

function handleMouseMove(e) {
    mouseOverI = getIPos(e);
}

function getIPos(e) {
    e = e || window.event;

    var x;
    var y;
    x = e.clientX;
    y = e.clientY;
    x -= battleWindow.canvas.offsetLeft;
    y -= dialogOffset.top + battleWindowOffset;
    y += dialogScroll;

    y = y / ((renderEngine.tileSize / 2) + 2);
    y = Math.floor(y);
    return y;
}

function handleMouseClick(e) {
    mouseClickedI = getIPos(e);
}