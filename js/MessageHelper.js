﻿var ProtoBuf = dcodeIO.ProtoBuf;
var Messages;
var Networkmessage;
var LoginPacket;
var SelectCharacterPacket;
var MessageHelper = function () {
    this.builder = ProtoBuf.loadProtoFile("res/Networkmessage.proto");
    Messages = this.builder.build("Messages");
    Networkmessage = this.builder.build("Networkmessage");
    LoginPacket = this.builder.build("LoginPacket");
    SelectCharacterPacket = this.builder.build("SelectCharacterPacket");
};


MessageHelper.prototype.SendLogin = function (alchemy, user, password) {
    var loginPacket = new LoginPacket({
        "login": user,
        "password": password
    });

    var messages = new Messages();
    messages.add("Networkmessage", new Networkmessage({
        "type": "LOGIN",
        "loginPacket": loginPacket
    }));

    var buffer = messages.encode();
    console.log(buffer.toBase64());
    alchemy.Send(buffer.toBase64());
};

MessageHelper.prototype.SendSelectChar = function (alchemy, charId) {
    var selectCharacterPacket = new SelectCharacterPacket({
        "id": charId
    });

    var messages = new Messages();
    messages.add("Networkmessage", new Networkmessage({
        "type": "SELECTEDCHAR",
        "selectCharacterPacket": selectCharacterPacket
    }));

    var buffer = messages.encode();
    console.log(buffer.toBase64());
    alchemy.Send(buffer.toBase64());
};