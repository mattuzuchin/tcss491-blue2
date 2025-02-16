

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/player entities/marksmentemp.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/marksmenwalkLeft.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/warriortemp.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/ghostpiratestand.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/piratestand.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/piratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/piratestanddead.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/ghostpiratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/pirateswordattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/piratestandflipped.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/ghostpirateattack.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/warriorattack.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/warriorwalk1.png");
ASSET_MANAGER.queueDownload("./sprites/artifacts/abstraction.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/ghostpiratestanddead.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/heart.png");
ASSET_MANAGER.queueDownload("./sprites/player entities/halfheart.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassblockmiddle.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassleft.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassright.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassblockmiddleplat.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassleftplat.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/grassrightplat.png");
ASSET_MANAGER.queueDownload("./sprites/interactive entities/coin.png");
ASSET_MANAGER.queueDownload("./sprites/platforms+ground/crate.png");
ASSET_MANAGER.queueDownload("./sprites/interactive entities/treasureChest.png");
ASSET_MANAGER.queueDownload("./sprites/interactive entities/treasureChestOpen.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/ghostpirategunattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/pirategunattack.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles/bullet.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/pirateBossAttack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/pirateBossenter.png");
ASSET_MANAGER.queueDownload("./sprites/enemy entities/pirateBossIdle.png");
ASSET_MANAGER.queueDownload("./sprites/background/death.png"); //448 x 444
ASSET_MANAGER.queueDownload("./sprites/projectiles/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/background/title.png"); 
ASSET_MANAGER.queueDownload("./sprites/player entities/marksmenattack.png"); 


ASSET_MANAGER.downloadAll(() => {
    const gameEngine = new GameEngine();
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    
    gameEngine.init(ctx);
    gameEngine.addEntity(new TitleScreen(gameEngine));
    gameEngine.start();
});
