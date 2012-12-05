var Bird = cc.Sprite.extend({
    _numVelocities: 5,

    ctor: function(attrs) {
        this._super();
        this._isFlying = false;
        this._needEffect = false;

        this._currentBodyIndex = 0;
        this._currentBeakIndex = 0;
        this._velocitiesX = [0, 0, 0, 0, 0];
        this._velocitiesY = [0, 0, 0, 0, 0];
        this._nextVelocity = 0;

        if(attrs) {
            this._needEffect = attrs.needEffect;
        }

        cc.SpriteFrameCache.getInstance().addSpriteFrames(plist, imgSpriteSheet);

        this.drawBird();
        this.schedule(this.scheduler, 0.1);
    },

    fly: function() {
        if(!this._isFlying && this._needEffect) {
            cc.AudioEngine.getInstance().playEffect(effectFlap);
        }
        this._isFlying = true;
    },

    stopFly: function() { 
        this._isFlying = false;
        cc.AudioEngine.getInstance().stopEffect(effectFlap);
    },

    isFlying: function() {
        return this._isFlying;
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
            b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2FilterData = Box2D.Dynamics.b2FilterData;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.fixedRotation = true;
        bodyDef.userData = this;

        var dynamicBox = new b2CircleShape();
        dynamicBox.SetRadius(60 / PTM_RATIO / 2);

        this.physics = world.CreateBody(bodyDef);

        var filterData = new b2FilterData();
        filterData.groupIndex = -1;

        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        fixtureDef.filter = filterData;
        fixtureDef.userData = 'bird';
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
    },

    setB2AndC2Position: function(p){
        this.setPosition(p);
        this.physics.SetPosition(new Box2D.Common.Math.b2Vec2(p.x / PTM_RATIO, p.y / PTM_RATIO));

    }
});

var BirdKirby = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_kirby';
        this.beakName = 'beak_s_';
        this._super(attrs);
    }
});

var BirdBurpy = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_burpy';
        this.beakName = 'beak_p_';
        this._super(attrs);
    }
});

var BirdPablo = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_pablo';
        this.beakName = 'beak_s_';
        this._super(attrs);
    }
});

var BirdPebbles = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_pebbles';
        this.beakName = 'beak_s_';
        this._super(attrs);
    }
});

var BirdHoudini = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_houdini';
        this.beakName = 'beak_b_';
        this._super(attrs);
    }
});

var BirdPerky = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_perky';
        this.beakName = 'beak_p_';
        this._super(attrs);
    }
});

var BirdSmoky = Bird.extend({
    ctor: function(attrs) {
        this.name = 'bird_smoky';
        this.beakName = 'beak_b_';
        this._super(attrs);
    }
});
