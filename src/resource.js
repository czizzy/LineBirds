var imgDir = "res/img/",
    imgBackground = imgDir + 'back_l4.png',
    imgBush1 = imgDir + 'bush1.png',
    imgBush2 = imgDir + 'bush2.png',
    imgHeader = imgDir + 'header.png',
    imgBird = imgDir + 'bird.png';

var bgm = 'res/soundtrack';

var g_ressources = [
    //image
    {type:"image", src: imgBackground},
    {type:"image", src: imgBush1},
    {type:"image", src: imgBush2},
    {type:"image", src: imgHeader},
    {type:"image", src: imgBird},

    //plist
    {type: "plist", src: 'res/gameEngineSpriteSheetDefault.plist'},
    //fnt

    //tmx

    //bgm
    {type: 'bgm', src: bgm},

    //effect
    {type: 'effect', src: 'res/plane'}
];