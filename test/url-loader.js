require('chai').should();
var UrlMarker = require('../src/url-marker');

describe('URL marker', function(){
    it('should mark url of an asset', function(){
        var image = {
            "type": "image",
            "key": "ball",
            "url": "assets/sprites/shinyball.png",
            "overwrite": false
        };
        var expected = {
            "type": "image",
            "key": "ball",
            "url": "__PHASER_PACK_LOADER_URL__(assets/sprites/shinyball.png)",
            "overwrite": false
        };
        new UrlMarker().markAsset(image).should.be.eql(expected);
    });

    it('should mark url of a media', function(){
        var audio  = {
            "type": "audio",
            "key": "loop",
            "urls": [
                "assets/audio/loop.mp3",
                "assets/audio/loop.ogg"
            ],
            "autoDecode": true
        };
        var expected = {
            "type": "audio",
            "key": "loop",
            "urls": [
                "__PHASER_PACK_LOADER_URL__(assets/audio/loop.mp3)",
                "__PHASER_PACK_LOADER_URL__(assets/audio/loop.ogg)"
            ],
            "autoDecode": true
        };
        new UrlMarker().markMedia(audio).should.be.eql(expected);
    });

    it('should mark url of an audiosprite', function(){
        var sprite = {
            "type": "audiosprite",
            "key": "dialog",
            "urls": [
                "assets/audiosprites/dialog.m4a",
                "assets/audiosprites/dialog.oga"
            ],
            "jsonURL": "assets/audiosprites/dialog.json",
            "jsonData": null,
            "autoDecode": true
        };
        var expected = {
            "type": "audiosprite",
            "key": "dialog",
            "urls": [
                "__PHASER_PACK_LOADER_URL__(assets/audiosprites/dialog.m4a)",
                "__PHASER_PACK_LOADER_URL__(assets/audiosprites/dialog.oga)"
            ],
            "jsonURL": "__PHASER_PACK_LOADER_URL__(assets/audiosprites/dialog.json)",
            "jsonData": null,
            "autoDecode": true
        };
        new UrlMarker().markAudioSprite(sprite).should.be.eql(expected);
    });

    it('should mark url of an atlas', function(){
        var atlas = {
            "type": "atlas",
            "key": "map",
            "textureURL": "assets/sprites/map.png",
            "atlasURL": "assets/sprites/map.json",
            "atlasData": null,
            "format": "TEXTURE_ATLAS_JSON_HASH"
        };
        var expected = {
            "type": "atlas",
            "key": "map",
            "textureURL": "__PHASER_PACK_LOADER_URL__(assets/sprites/map.png)",
            "atlasURL": "__PHASER_PACK_LOADER_URL__(assets/sprites/map.json)",
            "atlasData": null,
            "format": "TEXTURE_ATLAS_JSON_HASH"
        };
        new UrlMarker().markAtlas(atlas).should.be.eql(expected);
    });
});
