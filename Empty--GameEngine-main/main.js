

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/marksmentemp.png");
ASSET_MANAGER.queueDownload("./sprites/marksmenwalkLeft.png");
ASSET_MANAGER.queueDownload("./sprites/warriortemp.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratestand.png");
ASSET_MANAGER.queueDownload("./sprites/piratewalk.png");
ASSET_MANAGER.queueDownload("./sprites/ghostpiratewalk.png");
const PARAMS = {
    BITWIDTH: 16, 
    SCALE: 2,     
};
ASSET_MANAGER.downloadAll(() => {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	PARAMS.CANVAS_WIDTH = canvas.width;
	
	// gameEngine.addEntity(new Marksmen());
	// gameEngine.addEntity(new GhostPirate());
	// gameEngine.addEntity(new Pirate());

	gameEngine.init(ctx);
	//new entitiesmanager(gameEngine);
	gameEngine.addEntity(new scenemanager(gameEngine));
	gameEngine.start();
});
