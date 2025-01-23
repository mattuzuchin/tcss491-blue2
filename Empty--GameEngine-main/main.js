const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/marksmentemp.png");
ASSET_MANAGER.queueDownload("./sprites/warriortemp.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratestand.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.addEntity(new Marksmen());
	gameEngine.addEntity(new GhostPirate());
	gameEngine.addEntity(new Pirate());
	gameEngine.init(ctx);

	gameEngine.start();
});
