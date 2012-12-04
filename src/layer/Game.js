var contactListener = new Box2D.Dynamics.b2ContactListener();
contactListener.BeginContact = function(contact){
    var bird = contact.GetFixtureB().GetBody().GetUserData(),
        other = contact.GetFixtureA();
    if(other.GetUserData() === 'ground') {
        bird.isLaying = true;
    }
};

var Box2dLayer = B2World.extend({
    bird: undefined,
    init:function() {
        this._super();
        var contactListener = new Box2D.Dynamics.b2ContactListener();
        contactListener.BeginContact = function(contact){
            cc.AudioEngine.getInstance().playEffect(effectHit);
        };
        this.world.SetContactListener(contactListener);

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        //Set up sprite
        // var mgr = cc.SpriteBatchNode.create(imgBird, 150);
        // this.addChild(mgr, 0, kTagSpriteManager);
        // this.addNewSpriteWithCoords(cc.PointMake(screenSize.width / 2, screenSize.height / 2));

        this.addNewSpriteWithCoords({x: 480, y: 480});

        var label = cc.LabelTTF.create("Press any key", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setPosition(cc.PointMake(this.screenSize.width / 2, this.screenSize.height - 50));
    },

    addNewSpriteWithCoords:function (p) {
        this.bird = new BirdKirby({needEffect: true});
        this.addChild(this.bird);
        this.bird.adaptInBox2dWorld(this.world);
        this.bird.setB2AndC2Position(p);
        // this.bird.physics.SetPosition(new Box2D.Common.Math.b2Vec2(p.x / PTM_RATIO, p.y / PTM_RATIO));
        // this.bird.setPosition(cc.PointMake(p.x, p.y));
    },

    updateSprites: function(dt){
        this.bird.updateVelocity();
    },
    onKeyDown: function(e) {
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            physics = this.bird.physics;
//        this.bird.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 10), this.bird.GetPosition());
        physics.ApplyImpulse(new b2Vec2(0, 2), physics.GetPosition());
        this.bird.fly();
    },

    onKeyUp: function() {
        this.bird.stopFly();
    },
    onTouchesEnded:function (touches, event) {
        //Add a new body/atlas sprite at the touched location
        // for (var it = 0; it < touches.length; it++) {
        //     var touch = touches[it];
        //     if (!touch)
        //         break;
        //     var location = touch.getLocation(); //touch.locationInView(touch.view());//获取可以得到坐标对象
        //     //location = cc.Director.sharedDirector().convertToGL(location);
        //     this.addNewSpriteWithCoords(location);
        // }
    }
});

Box2dLayer.create = function() {
    var sg = new Box2dLayer();
    sg.init();
    return sg;
};
