require('chai').should();
var sinon = require('sinon');
var Loader = require('../src/loader');
var Resolver = require('../src/resolver');

describe('Loader', function(){
    it('should replace mark with require', function(){
        var source = '"__PHASER_PACK_LOADER_URL__(assets/sprites/shinyball.png)"';
        var expected = 'require("./assets/sprites/shinyball.png")';
        var resolver = new Resolver();
        sinon.stub(resolver, 'resolve').returnsArg(0);
        var loader = new Loader(resolver);
        loader.replaceMarksWithRequire(source).should.be.equal(expected);
    });

    it('should replace mark in multiple assets with require', function(){
        var source = '[{url:"__PHASER_PACK_LOADER_URL__(1.png)"},{url:"__PHASER_PACK_LOADER_URL__(2.png)"}]';
        var expected = '[{url:require("./1.png")},{url:require("./2.png")}]';
        var resolver = new Resolver();
        sinon.stub(resolver, 'resolve').returnsArg(0);
        var loader = new Loader(resolver);
        loader.replaceMarksWithRequire(source).should.be.equal(expected);
    });

    it('should replace marks with url resolved by given resolver', function(){
        var source = '"__PHASER_PACK_LOADER_URL__(assets/sprites/shinyball.png)"';
        var resolver = new Resolver();
        sinon.spy(resolver, 'resolve');
        var loader = new Loader(resolver);
        loader.replaceMarksWithRequire(source);
        resolver.resolve.calledOn(resolver).should.be.true;
    });

    it('should export JSON as a module', function(){
        var json = {"level1": [], "meta": {}};
        var source = JSON.stringify(json);
        var expected = 'exports = module.exports = {"level1":[],"meta":{}}';
        var loader = new Loader(null);
        loader.exportJson(source).should.be.equal(expected);
    });
});
