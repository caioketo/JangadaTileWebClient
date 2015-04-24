var JangUI = function (body) {
    this.body = body;
};

JangUI.prototype.CreateLogin = function () {
    this.loginDiv = $('<div />');
    this.loginA = $('<a>Login:</a>');
    this.loginText = $('<input name="login" />');
    this.passwordA = $('<a>Password:</a>');
    this.passwordText = $('<input name="password" />');
    this.loginA.appendTo(this.loginDiv);
    $("<br />").appendTo(this.loginDiv);
    this.loginText.appendTo(this.loginDiv);
    $("<br />").appendTo(this.loginDiv);
    this.passwordA.appendTo(this.loginDiv);
    $("<br />").appendTo(this.loginDiv);
    this.passwordText.appendTo(this.loginDiv);
    $("<br />").appendTo(this.loginDiv);
    $('<input name="connect" type="button" onclick="connectBtn()" value="LOGIN"/>').appendTo(this.loginDiv);
    this.loginDiv.appendTo(this.body);
};

JangUI.prototype.CreateCharList = function (chars) {
    this.loginDiv.hide();
    this.charListDiv = $('<div />');
    this.charListSelect = $('<select name="chars" id="chars">');
    for (var i = 0; i < chars.length; i++) {
        $('<option value="' + chars[i].id + '">' + chars[i].name + '</option>').appendTo(this.charListSelect);
    }
    $('</select>').appendTo(this.charListSelect);
    //this.charListSelect.selectmenu();
    this.charListSelect.appendTo(this.charListDiv);
    $('<input name="connect" type="button" onclick="charSel()" value="LOGIN"/>').appendTo(this.charListDiv);
    this.charListDiv.appendTo(this.body);
};

JangUI.prototype.CreateCanvas = function () {
    this.charListDiv.hide();
    $('<canvas id="main" width="1024" height="640"></canvas>').appendTo(this.body);
    $('<div id="dialog" title="Battle Window"><canvas id="battle" width="100" height="640"></canvas></div>').appendTo(this.body);
}

function connectBtn() {
    client.Login(jangUI.loginText[0].value, jangUI.passwordText[0].value);
};

function charSel() {
    client.SelectChar(parseInt(jangUI.charListSelect[0].value, 10));
};
