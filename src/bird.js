var Bird = cc.Sprite.extend({
    _currentRotation: 0,
    _currentBodyIndex: 0,
    _currentBeakIndex: 0,

    ctor: function() {
        cc.SpriteFrameCache.getInstance().addSpriteFrames(plist, imgSpriteSheet);

        this.drawBird();
    },

    fly: function() {
        this.schedule(this.update, 0.1);
    },

    drawBird: function() {
        this.removeAllChildrenWithCleanup();
        this.body = cc.Sprite.createWithSpriteFrameName(this.name + this._currentBodyIndex + '.png');
        this.addChild(this.body);

        this.beak = cc.Sprite.createWithSpriteFrameName(this.beakName + this._currentBeakIndex + '.png');
        this.addChild(this.beak);
    },

    update: function(dt) {
        this._currentBeakIndex++;
        this._currentBodyIndex++;
        if(this._currentBeakIndex > 5) {
            this._currentBeakIndex = 0;
        }
        if(this._currentBodyIndex > 3) {
            this._currentBodyIndex = 0;
        }
        this.drawBird();
    },

    handleKey: function(e) {
        if(e === cc.KEY.left) {
            this._currentRotation--;
        } else if (e === cc.KEY.right) {
            this._currentRotation++;
        }

        if(this._currentRotation < 0) this._currentRotation = 360;
        if(this._currentRotation > 360) this._currentRotation = 0;

    },
    handleTouch: function(touchLocation) {
        if(touchLocation < 300) {
            this._currentRotation = 0;
        } else {
            this._currentRotation = 180;
        }
    },
    handleTouchMove: function(touchLocation) {
        var angle = Math.atan2(touchLocation.x - 300, touchLocation.y - 300);
        angle = angle * (180/Math.PI);
        this._currentRotation = angle;
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



