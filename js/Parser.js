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
            //PLAYER_LOGIN
            case 6:
                map.AddPlayer(inMessages[i].playerLoginPacket.player);
                break;
            //CHARACTER_MOVEMENT
            case 7:
                var creature = map.GetCreature(inMessages[i].characterMovementPacket.player.playerGuid);
                var tile = map.tiles[creature.Position.x][creature.Position.y];
                var index = tile.Creatures.indexOf(creature);
                tile.Creatures.splice(index, 1);
                creature.SetPosition(inMessages[i].characterMovementPacket.player.playerPosition);
                break;
            //CREATURE_RESPAWN
            case 9:
                var creatureDesc = inMessages[i].creatureRespawnPacket.creatureDescription;
                map.AddCreature(creatureDesc);
                break;
            //NOT_POSSIBLE
            case 10:
                console.log('not possible');
                break;
            //CREATURE_MOVEMENT
            case 11:
                var creature = map.GetCreature(inMessages[i].creatureMovementPacket.creature.creatureGuid);
                var tile = map.tiles[creature.Position.x][creature.Position.y];
                var index = tile.Creatures.indexOf(creature);
                tile.Creatures.splice(index, 1);
                creature.SetPosition(inMessages[i].creatureMovementPacket.creature.creaturePosition);
                break;
        }
    }
};