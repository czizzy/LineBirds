var MENU_TAG = 1,
    MUSIC_TAG = 21;

var Menu = B2World.extend({
    init: function() {
        this._super();
        var contactListener = new Box2D.Dynamics.b2ContactListener();
        contactListener.BeginContact = function(contact){
            var bird = contact.GetFixtureB().GetBody().GetUserData(),
                other = contact.GetFixtureA();
            if(other.GetUserData() === 'ground') {
                bird.isLaying = true;
            }
        };
        this.world.SetContactListener(contactListener);

        var size = cc.Director.getInstance().getWinSize();
        var logo = cc.Sprite.create(imgHeader);
        logo.setPosition(new cc.Point(size.width/2, size.height-logo.getContentSize().height/2 - 40));
        this.addChild(logo);

        var bush1 = cc.Sprite.create(imgBush1);
        bush1.setPosition(new cc.Point(0, 0));
        bush1.setAnchorPoint(new cc.Point(0, 0));
        this.addChild(bush1, 2);

        var bush2 = cc.Sprite.create(imgBush2);
        bush2.setPosition(new cc.Point(size.width, 0));
        bush2.setAnchorPoint(new cc.Point(1, 0));
        this.addChild(bush2, 2);

        var menu = cc.Menu.create();
        this.addChild(menu, 1, MENU_TAG);

        this.createMainMenu();

        var kirby = new BirdKirby();
        this.addChild(kirby, 1);
        kirby.adaptInBox2dWorld(this.world);
        kirby.setB2AndC2Position(new cc.Point(50, 30));

        var pablo = new BirdPablo();
        this.addChild(pablo, 1);
        pablo.adaptInBox2dWorld(this.world);
        pablo.setB2AndC2Position(new cc.Point(90, 30));

        var pebbles = new BirdPebbles();
        this.addChild(pebbles, 1);
        pebbles.adaptInBox2dWorld(this.world);
        pebbles.setB2AndC2Position(new cc.Point(130, 30));

        var houdini = new BirdHoudini();
        this.addChild(houdini, 1);
        houdini.adaptInBox2dWorld(this.world);
        houdini.setB2AndC2Position(new cc.Point(170, 30));

        var smoky = new BirdSmoky();
        this.addChild(smoky, 1);
        smoky.adaptInBox2dWorld(this.world);
        smoky.setB2AndC2Position(new cc.Point(210, 30));

        var perky = new BirdPerky();
        this.addChild(perky, 1);
        perky.adaptInBox2dWorld(this.world);
        perky.setB2AndC2Position(new cc.Point(240, 30));

        var burpy = new BirdBurpy();
        this.addChild(burpy, 1);
        burpy.adaptInBox2dWorld(this.world);
        burpy.setB2AndC2Position(new cc.Point(280, 30));

        return true;
    },

    updateSprites: function(dt) {
        var bird, random;
        // Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if ((bird = b.GetUserData()) != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                // var myActor = b.GetUserData();
                // myActor.setPosition(cc.PointMake(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                // myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                if(bird.isLaying) {
                    random = Math.random();
                    if(random < 0.05) {
                        bird.isLaying = false;
                        bird.setB2AndC2Position(new cc.Point(50 + 230 * Math.random(), 30));
                        bird.fly();
                        bird.physics.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, 10 + 40 * Math.random()), bird.physics.GetPosition());
                    }
                } else if(bird.isFlying() && bird.physics.GetLinearVelocity().y <= 0) {
                    bird.stopFly();
                }
                bird.updateVelocity();
            }
        }
    },

    clickEffect: function() {
        cc.AudioEngine.getInstance().playEffect(effectClick);
    },

    createMainMenu: function() {
        var menu = this.getChildByTag(MENU_TAG);
        var play = cc.MenuItemLabel.create(cc.LabelBMFont.create('Play', fntBig), function() {
            this.clickEffect();
            this.play();
        }, this);
        var options = cc.MenuItemLabel.create(cc.LabelBMFont.create('Options', fntSmall), function() {
            this.clickEffect();
            this.options();
        }, this);
        menu.removeAllChildren(true);
        menu.addChild(play);
        menu.addChild(options);

        menu.alignItemsVerticallyWithPadding(20);
    },

    options: function() {
        var menu = this.getChildByTag(MENU_TAG);
        var music = cc.MenuItemLabel.create(cc.LabelBMFont.create('Music ' + (musicState? 'On': 'Off'), fntBig), function() {
            this.clickEffect();
            this.toggleMusic();
        }, this);
        var back = cc.MenuItemLabel.create(cc.LabelBMFont.create('Back', fntSmall), function() {
            this.clickEffect();
            this.createMainMenu();
        }, this);
        menu.removeAllChildren(true);
        menu.addChild(music, 1, MUSIC_TAG);
        menu.addChild(back, 1);
        menu.alignItemsVerticallyWithPadding(20);
    },

    play: function() {
        var scene = cc.Scene.create();
        scene.addChild(Box2dLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    toggleMusic: function() {
        var music = this.getChildByTag(MENU_TAG).getChildByTag(MUSIC_TAG);
        if(musicState) {
            cc.AudioEngine.getInstance().stopMusic(false);
        } else {
            cc.AudioEngine.getInstance().playMusic(bgm);
        }
        musicState = !musicState;
        music.setString('Music ' + (musicState? 'On': 'Off'));
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