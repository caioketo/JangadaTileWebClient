var Parser = {

};


Parser.Parse = function (alchemy, data) {
    var inMessages = Messages.decode64(data).Networkmessage;
    for (var i = 0; i < inMessages.length; i++) {
        switch (inMessages[i].type) {
            //CHARACTERS
            case 1:
                var characterList = inMessages[i].charactersPacket.CharacterList;
                jangUI.CreateCharList(characterList);
                //messageHelper.SendCharacterSelect(alchemy, characterList[0].id);
                break;
            //AREA_DESCRIPTION
            case 3:
                var areaDescription = inMessages[i].areaDescriptionPacket;
                map.SetTiles(areaDescription);
                jangUI.CreateCanvas();
                client.Draw();
                break;
            //PLAYER_MOVEMENT
            case 5:
                map.SetMapSlice(inMessages[i].playerMovementPacket);
                break;
        }
    }
};