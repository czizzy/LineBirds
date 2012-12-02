var imgDir = "res/img/",
    imgBackground = imgDir + 'back_l4.png',
    imgBush1 = imgDir + 'bush1.png',
    imgBush2 = imgDir + 'bush2.png',
    imgHeader = imgDir + 'header.png',
    imgBird = imgDir + 'bird.png',
    imgSpriteSheet = imgDir + 'gameEngineSpriteSheetDefault.png',
    imgFntBig = 'res/font/americanPurposeBig.png',
    fntBig = 'res/font/americanPurposeBig.fnt',
    imgFntSmall = 'res/font/americanPurposeSmall.png',
    fntSmall = 'res/font/americanPurposeSmall.fnt',

    effectClick = 'res/effect/click',
    effectPlane = 'res/effect/plane',

    plist = 'res/gameEngineSpriteSheetDefault.plist';

var bgm = 'res/soundtrack';

var PTM_RATIO = 32;

var g_ressources = [
    //image
    {type:"image", src: imgBackground},
    {type:"image", src: imgBush1},
    {type:"image", src: imgBush2},
    {type:"image", src: imgHeader},
    {type:"image", src: imgBird},
    {type:"image", src: imgFntBig},
    {type:"image", src: imgFntSmall},
    {type:"image", src: imgSpriteSheet},

    //plist
    {type: "plist", src: plist},
    //fnt
    {type: "fnt", src: fntBig},
    {type: "fnt", src: fntSmall},
    //tmx

    //bgm
    {type: 'bgm', src: bgm},

    //effect
    {type: 'effect', src: effectClick},
    {type: 'effect', src: effectPlane}
];