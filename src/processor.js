var Processor = function(urlMarker)
{
    this.marker = urlMarker;
};

Processor.prototype.processAssetPack = function(assetPack)
{
    for (var section in assetPack)
    {
        assetPack[section] = this.processSection(assetPack[section]);
    }
    return assetPack;
};

Processor.prototype.processSection = function(section)
{
    for (var i = 0; i < section.length; i++)
    {
        section[i] = this.processAsset(section[i]);
    }
    return section;
};

Processor.prototype.processAsset = function(asset)
{
    switch (asset.type)
    {
        case 'audio':
        case 'video':
            return this.marker.markMedia(asset);
            break;
        case 'audiosprite':
            return this.marker.markAudioSprite(asset);
            break;
        case 'bitmapFont':
        case 'atlasJSONArray':
        case 'atlasJSONHash':
        case 'atlasXML':
        case 'atlas':
            return this.marker.markAtlas(asset);
            break;
        default:
            return this.marker.markAsset(asset);
            break;
    };
};

module.exports = Processor;
