var BackgroundLayer = cc.LazyLayer.extend({
    ctor: function() {
        this._super();
    },

    init: function() {
        var size = cc.Director.getInstance().getWinSize();
        var background = cc.Sprite.create(imgBackground);
        background.setPosition(new cc.Point(size.width/2, size.height/2));
        this.addChild(background);
    }
});

BackgroundLayer.create = function() {
    var layer = new BackgroundLayer();
    layer.init();
    return layer;
};
BackgroundLayer.scene = function() {
    var scene = cc.Scene.create();
    var layer = BackgroundLayer.create();
    scene.addChild(layer);
    return scene;
};
