var Resolver = function(alias)
{
    this.alias = alias;
};

Resolver.prototype.resolve = function(url)
{
    for (var name in this.alias)
    {
        if (url.startsWith(name + '/'))
        {
            return this.alias[name] + url.substr(name.length);
        }
    }
    return url;
};

module.exports = Resolver;
