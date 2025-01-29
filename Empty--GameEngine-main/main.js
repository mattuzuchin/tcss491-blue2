

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/marksmentemp.png");
ASSET_MANAGER.queueDownload("./sprites/marksmenwalkLeft.png");
ASSET_MANAGER.queueDownload("./sprites/warriortemp.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/pirateswordattack.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpirateattack.png");
ASSET_MANAGER.queueDownload("./sprites/warriorattack.png");
ASSET_MANAGER.queueDownload("./sprites/warriorwalk1.png");
ASSET_MANAGER.queueDownload("./sprites/polymorphism-full.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestanddead.png");
ASSET_MANAGER.queueDownload("./sprites/heart.png");
ASSET_MANAGER.queueDownload("./sprites/coin.png");


ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	// gameEngine.addEntity(new Marksmen());d
	// gameEngine.addEntity(new GhostPirate());
	// gameEngine.addEntity(new Pirate());

	gameEngine.init(ctx);
	new entitiesmanager(gameEngine);
	gameEngine.start();
});
