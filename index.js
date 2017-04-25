var utils = require('loader-utils');
var Loader = require('./src/loader');
var Processor = require('./src/processor');
var UrlMarker = require('./src/url-marker');
var Resolver = require('./src/resolver');

var main = function(source)
{
    var defaults = {
        alias: {}
    };
    var options = utils.getOptions(this) || defaults;
    var loader = new Loader(new Resolver(options.alias));
    var processor = new Processor(new UrlMarker());
    var assetPack = JSON.parse(source);
    assetPack = processor.processAssetPack(assetPack);
    var string = JSON.stringify(assetPack);
    string = loader.replaceMarksWithRequire(string);
    return loader.exportJson(string);
};

module.exports = main;
