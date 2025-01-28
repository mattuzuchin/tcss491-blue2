class entitiesmanager {
    constructor(game) {
        this.game = game;
        this.level = null;
        this.player = new Player(this.game, 0, 0);
        this.loadLevel(levelOne);
    }

    loadLevel(level) {
        this.level = level;

        // Load ghost pirates
        if (level.ghostpirate) {
            for (let i = 0; i < level.ghostpirate.length; i++) {
                let ghostpirate = level.ghostpirate[i];
                this.game.addEntity(new GhostPirate(this.game, ghostpirate.x, ghostpirate.y));
            }
        }

        // Load platforms
        if (level.platforms) {
            for (let i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i];
                this.game.addEntity(new Platform(platform.x, platform.y, platform.width, platform.height));
            }
        }

        
        this.game.addEntity(this.player);
    }

    update() {}

    draw(ctx) {}
}