var utils = require('loader-utils');

var replace = function(url)
{
    if (utils.isUrlRequest(url))
    {
        url = utils.urlToRequest(url);
    }
    url = utils.stringifyRequest(this, url);
    return 'require(' + url + ')';
};

var Loader = function(resolver)
{
    this.resolver = resolver;
};

Loader.prototype.replaceMarksWithRequire = function(source)
{
    var regex = /"__PHASER_PACK_LOADER_URL__\(([^)]+)\)"/g;
    return source.replace(regex, function(match, url){
        return replace(this.resolver.resolve(url));
    }.bind(this));
};

Loader.prototype.exportJson = function(source)
{
    return 'exports = module.exports = ' + source;
};

module.exports = Loader;
