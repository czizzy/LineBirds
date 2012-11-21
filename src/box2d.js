var kTagSpriteManager = 1;
var PTM_RATIO = 32;
var Box2dLayer = cc.Layer.extend({
    _birdSprite: null,
    word: undefined,
    init:function()
    {
        this._super();
        var screenSize = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(true);

        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, 
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2World = Box2D.Dynamics.b2World,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        // UXLOG(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);
        // Construct a world object, which will hold and simulate the rigid bodies.
        // 构建一个世界对象，他将包含和模拟刚体
        this.world = new b2World(new b2Vec2(0, 9.8), true);
        this.world.SetContinuousPhysics(true);
        // Define the ground body.
        //var groundBodyDef = new b2BodyDef(); // TODO
        //groundBodyDef.position.Set(screenSize.width / 2 / PTM_RATIO, screenSize.height / 2 / PTM_RATIO); // bottom-left corner
        // Call the body factory which allocates memory for the ground body
        // from a pool and creates the ground box shape (also from a pool).
        // The body is also added to the world.
        //var groundBody = this.world.CreateBody(groundBodyDef);
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;//密度
        fixDef.friction = 0.5;//摩擦
        fixDef.restitution = 0.5;//弹性
        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);
        // upper
        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // bottom
        bodyDef.position.Set(10, -1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
           
        fixDef.shape.SetAsBox(2, 14);
        // left
        bodyDef.position.Set(-1.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        bodyDef.position.Set(26.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        //Set up sprite
        var mgr = cc.SpriteBatchNode.create(imgBird, 150);
        this.addChild(mgr, 0, kTagSpriteManager);
        // this.addNewSpriteWithCoords(cc.PointMake(screenSize.width / 2, screenSize.height / 2));
        var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setPosition(cc.PointMake(screenSize.width / 2, screenSize.height - 50));
        this.scheduleUpdate();
    },

    addNewSpriteWithCoords:function (p) {
        //UXLOG(L"Add sprite %0.2f x %02.f",p.x,p.y);
        var batch = this.getChildByTag(kTagSpriteManager);
        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        var idx = (cc.RANDOM_0_1() > .5 ? 0 : 1);
        var idy = (cc.RANDOM_0_1() > .5 ? 0 : 1);
        var sprite = cc.Sprite.create(imgBird);
        batch.addChild(sprite);
        sprite.setPosition(cc.PointMake(p.x, p.y));
        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);
        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box
        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);
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
        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.setPosition(cc.PointMake(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                //console.log(b.GetAngle());
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        console.log(touches);
        //Add a new body/atlas sprite at the touched location
        for (var it = 0; it < touches.length; it++) {
            var touch = touches[it];
            if (!touch)
                break;
            var location = touch.getLocation(); //touch.locationInView(touch.view());//获取可以得到坐标对象
            //location = cc.Director.sharedDirector().convertToGL(location);
            this.addNewSpriteWithCoords(location);
        }
    }
});

Box2dLayer.create = function() {
    var sg = new Box2dLayer();
    sg.init();
    return sg;
};
