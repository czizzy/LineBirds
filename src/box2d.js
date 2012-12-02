var Box2dLayer = cc.Layer.extend({
    bird: undefined,
    word: undefined,
    init:function()
    {
        this._super();
        var screenSize = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        this.createWorld();
        //Set up sprite
        // var mgr = cc.SpriteBatchNode.create(imgBird, 150);
        // this.addChild(mgr, 0, kTagSpriteManager);
        // this.addNewSpriteWithCoords(cc.PointMake(screenSize.width / 2, screenSize.height / 2));

        this.addNewSpriteWithCoords({x: 480, y: 480});

        var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setPosition(cc.PointMake(screenSize.width / 2, screenSize.height - 50));
        this.scheduleUpdate();
    },

    createWorld: function() {
        var screenSize = cc.Director.getInstance().getWinSize();
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef, 
            b2Body = Box2D.Dynamics.b2Body, 
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2World = Box2D.Dynamics.b2World,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        // Construct a world object, which will hold and simulate the rigid bodies.
        // 构建一个世界对象，他将包含和模拟刚体
        this.world = new b2World(new b2Vec2(0, -9.8), true);
        this.world.SetContinuousPhysics(true);
        // Define the ground body.
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;//密度
        fixDef.friction = 0.5;//摩擦
        fixDef.restitution = 0;//弹性
        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(15, 0.5); // half width, half height
        // upper
        bodyDef.position.Set(15, screenSize.height / PTM_RATIO + 0.5);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // bottom
        bodyDef.position.Set(15, -0.5);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
           
        fixDef.shape.SetAsBox(0.5, 10);
        // left
        bodyDef.position.Set(-0.5, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        bodyDef.position.Set(screenSize.width / PTM_RATIO + 0.5, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    },

    addNewSpriteWithCoords:function (p) {
        this.bird = new BirdKirby();
        this.addChild(this.bird);
        this.bird.adaptInBox2dWorld(this.world);
        this.bird.physics.SetPosition(new Box2D.Common.Math.b2Vec2(p.x / PTM_RATIO, p.y / PTM_RATIO));
        this.bird.setPosition(cc.PointMake(p.x, p.y));
    },
    update:function (dt) {
        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/
        var velocityIterations = 8;
        var positionIterations = 1;
        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);
        this.bird.updateVelocity();
        //Iterate over the bodies in the physics world
        // for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
        //     if (b.GetUserData() != null) {
        //         //Synchronize the AtlasSprites position and rotation with the corresponding body
        //         var myActor = b.GetUserData();
        //         myActor.setPosition(cc.PointMake(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
        //         myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
        //         //console.log(b.GetAngle());
        //     }
        // }
    },
    onKeyDown: function(e) {
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            physics = this.bird.physics;
//        this.bird.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 10), this.bird.GetPosition());
        physics.ApplyImpulse(new b2Vec2(0, 2), new b2Vec2(physics.GetPosition().x, physics.GetPosition().y));
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
