var Menu = cc.Layer.extend({
    init: function() {
        this._super();

        var size = cc.Director.getInstance().getWinSize();
        this.addChild(BackgroundLayer.create());

        var logo = cc.Sprite.create(imgHeader);
        logo.setPosition(new cc.Point(size.width/2, size.height-logo.getContentSize().height/2 - 40));
        this.addChild(logo);

        var bush1 = cc.Sprite.create(imgBush1);
        bush1.setPosition(new cc.Point(0, 0));
        bush1.setAnchorPoint(new cc.Point(0, 0));
        this.addChild(bush1);
        console.log(bush1.getAnchorPoint());

        var bush2 = cc.Sprite.create(imgBush2);
        bush2.setPosition(new cc.Point(size.width, 0));
        bush2.setAnchorPoint(new cc.Point(1, 0));
        this.addChild(bush2);

        var play = cc.MenuItemLabel.create(cc.LabelBMFont.create('Play', fntBig), function() {
            this.clickEffect();
            this.play();
        }, this);
        var options = cc.MenuItemLabel.create(cc.LabelBMFont.create('Options', fntSmall), function() {
            this.clickEffect();
            this.options();
        }, this);
        var box2d = cc.MenuItemLabel.create(cc.LabelBMFont.create('box2d', fntBig), function() {
            this.clickEffect();
            this.gotoBox2d();
        }, this);

        var menu = cc.Menu.create(play, options, box2d);
        menu.alignItemsVerticallyWithPadding(20);
        this.addChild(menu);

        var kirby = new BirdKirby();
        kirby.setPosition(new cc.Point(100, 500));
        this.addChild(kirby);
        kirby.fly();

        var pablo = new BirdPablo();
        pablo.setPosition(new cc.Point(200, 500));
        this.addChild(pablo);

        var pebbles = new BirdPebbles();
        pebbles.setPosition(new cc.Point(300, 500));
        this.addChild(pebbles);

        var houdini = new BirdHoudini();
        houdini.setPosition(new cc.Point(100, 400));
        this.addChild(houdini);
        houdini.fly();

        var smoky = new BirdSmoky();
        smoky.setPosition(new cc.Point(200, 400));
        this.addChild(smoky);

        var perky = new BirdPerky();
        perky.setPosition(new cc.Point(300, 400));
        this.addChild(perky);

        var burpy = new BirdBurpy();
        burpy.setPosition(new cc.Point(100, 300));
        this.addChild(burpy);
        burpy.fly();

        return true;
    },

    clickEffect: function() {
        cc.AudioEngine.getInstance().playEffect(effectClick);
    },

    options: function() {
        var scene = cc.Scene.create();
        scene.addChild(MyFirstApp.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    play: function() {
        this.clickEffect();
    },

    gotoBox2d: function() {
        var scene = cc.Scene.create();
        scene.addChild(Box2dLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

Menu.create = function() {
    var sg = new Menu();
    if(sg && sg.init()) {
        return sg;
    }
    return null;
};

Menu.scene = function() {
    var scene = cc.Scene.create();
    var layer = Menu.create();
    scene.addChild(layer);
    return scene;
};