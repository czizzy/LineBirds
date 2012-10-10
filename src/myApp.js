var MyFirstApp = cc.LayerColor.extend({
    _birdSprite: null,

    init:function()
    {
        this._super();
        this.initWithColor(new cc.Color4B(0,0,0,255));
        var size = cc.Director.getInstance().getWinSize();
        console.log(cc);

        cc.AudioEngine.getInstance().setEffectsVolume(0.5);
        cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.5);

        var menuItem1 = new cc.MenuItemFont.create("Play Sound",this,this.playSound);
        var menuItem2 = new cc.MenuItemFont.create("Play Song",this,this.playSong);
        var menuItem3 = new cc.MenuItemFont.create("Stop Playing Song",this,this.stopPlayingSound);
        var menuItem4 = new cc.MenuItemFont.create("Exit",this,this.exit);

        menuItem1.setPosition(new cc.Point(size.width/2,size.height/2+50));
        menuItem2.setPosition(new cc.Point(size.width/2,size.height/2));
        menuItem3.setPosition(new cc.Point(size.width/2,size.height/2-50));
        menuItem4.setPosition(new cc.Point(size.width/2,size.height/2-100));

        var menu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

        // this._birdSprite = new BirdSprite();
        // this.setTouchEnabled(true);
        // this.setKeyboardEnabled(true);

        // this.setPosition(new cc.Point(0,0));

        // this.addChild(this._birdSprite);
        // this._birdSprite.setPosition(new cc.Point(size.width/2, size.height/2));

        // this._birdSprite.scheduleUpdate();
        // this.schedule(this.update);

    },
    onEnter: function() {
        this._super();
    },
    update: function(dt) {
    },
    onTouchesEnded: function(pTouch, pEvent) {
        console.log(pTouch, pEvent);
        this._birdSprite.handleTouch(pTouch[0].getLocation());
    },
    onTouchesMoved: function(pTouch, pEvent) {
        this._birdSprite.handleTouchMove(pTouch[0].getLocation());
    },
    onKeyUp: function(e) {
    },
    onKeyDown: function(e) {
        this._birdSprite.handleKey(e);
    },

    playSound:function(){
        cc.log("Playing sound");
        cc.AudioEngine.getInstance().playEffect("res/plane");
    },
    playSong:function(){
        cc.log("Playing song");
        cc.AudioEngine.getInstance().playBackgroundMusic("res/soundtrack",false);
    },
    stopPlayingSound:function(){
        cc.log("Done playing song");
        if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
        {
            cc.AudioEngine.getInstance().stopBackgroundMusic();
        }
    },
    exit:function(){
        document.location.href = "http://www.gamefromscratch.com";
    }

});

var MyScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MyFirstApp();
        layer.init();
        this.addChild(layer);
    }
});