var markUrl = function(url)
{
    return '__PHASER_PACK_LOADER_URL__(' + url + ')';
};

var UrlMarker = function()
{
};

UrlMarker.prototype.markAsset = function(asset)
{
    asset.url = markUrl(asset.url);
    return asset;
};

UrlMarker.prototype.markMedia = function(media)
{
    for (var i = 0; i < media.urls.length; i++)
    {
        media.urls[i] = markUrl(media.urls[i]);
    }
    return media;
};

UrlMarker.prototype.markAudioSprite = function(sprite)
{
    for (var i = 0; i < sprite.urls.length; i++)
    {
        sprite.urls[i] = markUrl(sprite.urls[i]);
    }
    sprite.jsonURL = markUrl(sprite.jsonURL);
    return sprite;
};

UrlMarker.prototype.markAtlas = function(atlas)
{
    atlas.textureURL = markUrl(atlas.textureURL);
    atlas.atlasURL = markUrl(atlas.atlasURL);
    return atlas;
};

module.exports = UrlMarker;
