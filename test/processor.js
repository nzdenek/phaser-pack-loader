require('chai').should();
var sinon = require('sinon');
var Processor = require('../src/processor');
var UrlMarker = require('../src/url-marker');

describe('Processor', function(){
    it('should process each section in an asset pack', function(){
        var intoAssets = [];
        var menuAssets = [];
        var gameAssets = [];

        var assetPack = {
            "into": intoAssets,
            "menu": menuAssets,
            "game": gameAssets
        };

        var processSection = sinon.spy();
        var processor = new Processor(null);
        processor.processSection = processSection;
        processor.processAssetPack(assetPack);

        processSection.calledWith(intoAssets).should.be.true;
        processSection.calledWith(menuAssets).should.be.true;
        processSection.calledWith(gameAssets).should.be.true;
    });

    it('should process each asset in a section', function(){
        var image = {};
        var audio = {};
        var sheet = {};

        var processAsset = sinon.spy();
        var processor = new Processor(null);
        processor.processAsset = processAsset;
        processor.processSection([image, audio, sheet]);

        processAsset.calledWith(image).should.be.true;
        processAsset.calledWith(audio).should.be.true;
        processAsset.calledWith(sheet).should.be.true;
    });

    it('should process audio asset with media URL marker', function(){
        var audio = {"type": "audio", "urls": ["1.mp3", "1.ogg"]};

        var mediaMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markMedia = mediaMarker;
        var processor = new Processor(marker)
        processor.processAsset(audio);

        mediaMarker.calledWith(audio).should.be.true;
    });

    it('should process video asset with media URL marker', function(){
        var video = {"type": "video", "urls": ["1.m4a", "1.oga"]};

        var mediaMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markMedia = mediaMarker;
        var processor = new Processor(marker);
        processor.processAsset(video);

        mediaMarker.calledWith(video).should.be.true;
    });

    it('should process audiosprite asset with audiosprite URL marker', function(){
        var sprite = {
            "type": "audiosprite",
            "jsonURL": "sprite.json",
            "urls": ["1.mp3", "1.ogg"]
        };

        var audioSpriteMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAudioSprite = audioSpriteMarker;
        var processor = new Processor(marker);
        processor.processAsset(sprite);

        audioSpriteMarker.calledWith(sprite).should.be.true;
    });

    it('should process bitmap font asset with atlas URL marker', function(){
        var font = {
            "type": "bitmapFont",
            "textureURL": "symbols.png",
            "atlasURL": "symbols.json"
        };

        var atlasMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAtlas = atlasMarker;
        var processor = new Processor(marker);
        processor.processAsset(font);

        atlasMarker.calledWith(font).should.be.true;
    });

    it('should process atlasJSONArray asset with atlas URL marker', function(){
        var atlas = {
            "type": "atlasJSONArray",
            "textureURL": "symbols.png",
            "atlasURL": "symbols.json"
        };

        var atlasMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAtlas = atlasMarker;
        var processor = new Processor(marker);
        processor.processAsset(atlas);

        atlasMarker.calledWith(atlas).should.be.true;
    });

    it('should process atlasJSONHash asset with atlas URL marker', function(){
        var atlas = {
            "type": "atlasJSONHash",
            "textureURL": "symbols.png",
            "atlasURL": "symbols.json"
        };

        var atlasMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAtlas = atlasMarker;
        var processor = new Processor(marker);
        processor.processAsset(atlas);

        atlasMarker.calledWith(atlas).should.be.true;
    });

    it('should process atlasXML asset with atlas URL marker', function(){
        var atlas = {
            "type": "atlasXML",
            "textureURL": "symbols.png",
            "atlasURL": "symbols.xml"
        };

        var atlasMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAtlas = atlasMarker;
        var processor = new Processor(marker);
        processor.processAsset(atlas);

        atlasMarker.calledWith(atlas).should.be.true;
    });

    it('should process atlas asset with atlas URL marker', function(){
        var atlas = {
            "type": "atlas",
            "textureURL": "symbols.png",
            "atlasURL": "symbols.json"
        };

        var atlasMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAtlas = atlasMarker;
        var processor = new Processor(marker);
        processor.processAsset(atlas);

        atlasMarker.calledWith(atlas).should.be.true;
    });

    it('should process asset with asset URL marker', function(){
        var asset = {"url": "asset.png"};

        var assetMarker = sinon.spy();
        var marker = new UrlMarker();
        marker.markAsset = assetMarker;
        var processor = new Processor(marker);
        processor.processAsset(asset);

        assetMarker.calledWith(asset).should.be.true;
    });
});
