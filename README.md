# Phaser pack loader

## Usage
This loader parses phaser's asset pack file, resolves URLs for referenced assets
and exports an object representing the pack, which can be given to Phaser's pack
loader.

Loading of individual assets must be handled with other loaders, i.e. with file
loader. This is shown in and example [below](#example).

```js
module.exports = {
    module: {
        rules: [{
            test: /packs\/.+\.json$/,
            use: ['phaser-pack-loader']
        }]
    }
};
```

## Options
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`alias`**|`{Object}`|`{}`|Aliases for sipmlified import of modules|

## Example
**webpack.config.js**

```js
var path = require('path');

module.exports = {
    entry: './index.js',
    module: {
        rules: [{
            test: /\.(png)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }, {
            test: /\.(mp3|ogg)$/,
            loader: 'file-loader?name=audio/[name].[ext]'
        }, {
            test: /atlases\/.+\.json$/,
            loader: 'file-loader?name=atlases/[name].[ext]'
        }, {
            test: /packs\/.+\.json$/,
            use: [{
                loader: 'phaser-pack-loader',
                options: {
                    alias: {
                        assets: path.resolve('./assets')
                    }
                }
            }]
        }]
    }
};
```

**assets/packs/game.json**

```json
{
    "level1": [
        {
            "type": "image",
            "key": "logo",
            "url": "assets/sprites/logo.png",
            "overwrite": false
        },
        {
            "type": "audio",
            "key": "music",
            "urls": [
                "assets/audio/music.mp3",
                "assets/audio/music.ogg"
            ],
            "autoDecode": true
        },
        {
            "type": "atlas",
            "key": "sprites",
            "textureURL": "assets/atlases/sprites.png",
            "atlasURL": "assets/atlases/sprites.json",
            "format": "TEXTURE_ATLAS_JSON_HASH"
        }
    ],
    "meta": {
        "generated": "1492085027042",
        "app": "Phaser Editor",
        "url": "http://phasereditor.boniatillo.com",
        "version": "1.0",
        "copyright": "Arian Fornaris (c) 2015,2016"
    }
}
```

**index.js**

```js
require('phaser-ce/build/custom/p2');
require('phaser-ce/build/custom/pixi');
var Phaser = require('phaser-ce/build/custom/phaser-split');
var pack = require('./assets/packs/game.json');

var game = new Phaser.Game(640, 512, Phaser.CANVAS, 'example', {
    preload: function(){
        this.game.load.pack('level1', null, pack);
    },
    create: function(){
        this.game.add.sprite(0, 0, 'sprites', 'background');
        this.game.add.sprite(0, 0, 'logo');
        this.game.add.audio('music', 1, true);
    }
});
```
