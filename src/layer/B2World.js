var B2World = cc.Layer.extend({
    word: undefined,
    init:function()
    {
        this._super();
        this.screenSize = cc.Director.getInstance().getWinSize();
        this.addChild(BackgroundLayer.create());
        this.createWorld();
        this.scheduleUpdate();
    },

    createWorld: function() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef, 
            b2Body = Box2D.Dynamics.b2Body, 
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2World = Box2D.Dynamics.b2World,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

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
        fixDef.userData = 'sky';
        bodyDef.position.Set(15, this.screenSize.height / PTM_RATIO + 0.5);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // bottom
        fixDef.userData = 'ground';
        bodyDef.position.Set(15, -0.5);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
           
        fixDef.shape.SetAsBox(0.5, 10);
        // left
        fixDef.userData = 'left';
        bodyDef.position.Set(-0.5, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        fixDef.userData = 'right';
        bodyDef.position.Set(this.screenSize.width / PTM_RATIO + 0.5, 10);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
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
        this.updateSprites(dt);
    },

    updateSprites: function(){

    }
});

