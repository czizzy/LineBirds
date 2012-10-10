var MenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
    },

    init: function() {
//        this._super();
//        this.initWithColor(new cc.Color4B(255,0,0,80));
        var size = cc.Director.getInstance().getWinSize();
        this.addChild(BackgroundLayer.create());

        var logo = cc.Sprite.create(imgHeader);
        logo.setPosition(new cc.Point(size.width/2, size.height-logo.getContentSize().height/2-30));
        this.addChild(logo);
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function() {
        var layer = new MenuLayer();
        this.addChild(layer);
        layer.init();
    }
});
