require('chai').should();
var Resolver = require('../src/resolver');

describe('Resolver', function(){
    it('should resolve by module name', function(){
        var url = 'assets/audio/loop.mp3';
        var expected = '/abs/path/to/assets/audio/loop.mp3';
        var alias = {
            assets: '/abs/path/to/assets'
        };
        var resolver = new Resolver(alias);
        resolver.resolve(url).should.be.equal(expected);
    });

    it('should resolve url as is with matching aliases', function(){
        var url = 'assets/audio/loop.mp3';
        var expected = 'assets/audio/loop.mp3';
        var alias = {};
        var resolver = new Resolver(alias);
        resolver.resolve(url).should.be.equal(expected);
    });
});
