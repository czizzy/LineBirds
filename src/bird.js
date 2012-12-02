var Bird = cc.Sprite.extend({
    _body: undefined,
    _currentBodyIndex: 0,
    _currentBeakIndex: 0,
    _isFlying: false,

    _velocitiesX: [0, 0, 0, 0, 0],
    _velocitiesY: [0, 0, 0, 0, 0],
    _numVelocities: 5,
    _nextVelocity: 0,

    ctor: function() {
        cc.SpriteFrameCache.getInstance().addSpriteFrames(plist, imgSpriteSheet);

        this.drawBird();
        this.schedule(this.scheduler, 0.1);
    },

    fly: function() {
        this._isFlying = true;
    },

    stopFly: function() {
        this._isFlying = false;
    },

    drawBird: function() {
        this.removeAllChildren();
        this._body = cc.Sprite.createWithSpriteFrameName(this.name + this._currentBodyIndex + '.png');
        this.addChild(this._body);

        this.beak = cc.Sprite.createWithSpriteFrameName(this.beakName + this._currentBeakIndex + '.png');
        this.addChild(this.beak);
    },

    scheduler: function(dt) {
        if(this._currentBeakIndex === 0) {
            if(Math.random() < 0.02) {
                this._currentBeakIndex++;
            }
        } else {
            this._currentBeakIndex++;
            if(this._currentBeakIndex > 5) {
                this._currentBeakIndex = 0;
            }
        }
        if(this._isFlying) {
            this._currentBodyIndex++;
            if(this._currentBodyIndex > 3) {
                this._currentBodyIndex = 0;
            }
        }
        this.drawBird();
    },

    adaptInBox2dWorld: function(world) {
        var b2BodyDef = Box2D.Dynamics.b2BodyDef, 
            b2Body = Box2D.Dynamics.b2Body, 
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2Vec2 = Box2D.Common.Math.b2Vec2;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.fixedRotation = true;
        bodyDef.userData = this;

        var dynamicBox = new b2CircleShape();
        dynamicBox.SetRadius(60 / PTM_RATIO / 2);

        this.physics = world.CreateBody(bodyDef);

        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        this.physics.CreateFixture(fixtureDef);

        return this.physics;
    },

    updateVelocity: function() {
        var bird = this.physics;
        var weightedVelY = 0, weightedVelX = 0;
        if(this._nextVelocity >= this._numVelocities) {
            this._nextVelocity = 0;
        }
        this._velocitiesX[this._nextVelocity] = 20;
        this._velocitiesY[this._nextVelocity++] = bird.GetLinearVelocity().y;
        for(var i = 0; i < this._numVelocities; i++) {
            weightedVelX += this._velocitiesX[i];
            weightedVelY += this._velocitiesY[i];
        }
        this.setPosition(cc.PointMake(bird.GetPosition().x * PTM_RATIO, bird.GetPosition().y * PTM_RATIO));
        this.setRotation(-1 * cc.RADIANS_TO_DEGREES(Math.atan2(weightedVelY / this._numVelocities, weightedVelX / this._numVelocities)));
    }
});

var BirdKirby = Bird.extend({
    ctor: function() {
        this.name = 'bird_kirby';
        this.beakName = 'beak_s_';
        this._super();
    }
});

var BirdBurpy = Bird.extend({
    ctor: function() {
        this.name = 'bird_burpy';
        this.beakName = 'beak_p_';
        this._super();
    }
});

var BirdPablo = Bird.extend({
    ctor: function() {
        this.name = 'bird_pablo';
        this.beakName = 'beak_s_';
        this._super();
    }
});

var BirdPebbles = Bird.extend({
    ctor: function() {
        this.name = 'bird_pebbles';
        this.beakName = 'beak_s_';
        this._super();
    }
});

var BirdHoudini = Bird.extend({
    ctor: function() {
        this.name = 'bird_houdini';
        this.beakName = 'beak_b_';
        this._super();
    }
});

var BirdPerky = Bird.extend({
    ctor: function() {
        this.name = 'bird_perky';
        this.beakName = 'beak_p_';
        this._super();
    }
});

var BirdSmoky = Bird.extend({
    ctor: function() {
        this.name = 'bird_smoky';
        this.beakName = 'beak_b_';
        this._super();
    }
});
