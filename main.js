

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/marksmentemp.png");
ASSET_MANAGER.queueDownload("./sprites/marksmenwalkLeft.png");
ASSET_MANAGER.queueDownload("./sprites/warriortemp.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/piratestanddead.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/pirateswordattack.png");
ASSET_MANAGER.queueDownload("./sprites/piratestandflipped.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpirateattack.png");
ASSET_MANAGER.queueDownload("./sprites/warriorattack.png");
ASSET_MANAGER.queueDownload("./sprites/warriorwalk1.png");
ASSET_MANAGER.queueDownload("./sprites/abstraction.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestanddead.png");
ASSET_MANAGER.queueDownload("./sprites/heart.png");
ASSET_MANAGER.queueDownload("./sprites/halfheart.png");
ASSET_MANAGER.queueDownload("./sprites/grassblockmiddle.png");
ASSET_MANAGER.queueDownload("./sprites/grassleft.png");
ASSET_MANAGER.queueDownload("./sprites/grassright.png");
ASSET_MANAGER.queueDownload("./sprites/grassblockmiddleplat.png");
ASSET_MANAGER.queueDownload("./sprites/grassleftplat.png");
ASSET_MANAGER.queueDownload("./sprites/grassrightplat.png");
ASSET_MANAGER.queueDownload("./sprites/coin.png");
ASSET_MANAGER.queueDownload("./sprites/crate.png");
ASSET_MANAGER.queueDownload("./sprites/treasureChest.png");
ASSET_MANAGER.queueDownload("./sprites/treasureChestOpen.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpirategunattack.png");
ASSET_MANAGER.queueDownload("./sprites/pirategunattack.png");
ASSET_MANAGER.queueDownload("./sprites/bullet.png");
ASSET_MANAGER.queueDownload("./sprites/pirateBossAttack.png");
ASSET_MANAGER.queueDownload("./sprites/pirateBossenter.png");
ASSET_MANAGER.queueDownload("./sprites/pirateBossIdle.png");


ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	// gameEngine.addEntity(new Marksmen());d
	// gameEngine.addEntity(new GhostPirate());
	// gameEngine.addEntity(new Pirate());
	
	gameEngine.init(ctx);
	new entitiesmanager(gameEngine, "marksman");
	gameEngine.start();
});
