class entitiesmanager {
    constructor(game) {
        this.game = game;
        this.level = null;
        this.hearts = 3;
        this.coins = 0;
        this.player = new Player(this.game, 0, 0, 0);
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

        // Loadpirate
        if (level.pirate) {
            for (let i = 0; i < level.pirate.length; i++) {
                let pirate = level.pirate[i];
                this.game.addEntity(new Pirate(this.game, pirate.x, pirate.y));
            }
        }
        // Load platforms
        if (level.platforms) {
            for (let i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i];
                this.game.addEntity(new Platform(platform.x, platform.y, platform.width, platform.height));
            }
        }
        // Load artifacts
        if (level.artifacts) {
            for (let i = 0; i < level.artifacts.length; i++) {
                let artifact = level.artifacts[i];
                this.game.addEntity(new Artifact(this.game, artifact.x, artifact.y));
            }
        }
        
        
        this.game.addEntity(this.player);
    }

    update() {
        
    }

    draw(ctx) {
        ctx.fillStyle = "#EE4B2B";
        ctx.font = "30px 'Press Start 2P', sans-serif"; 
        
        console.log("HUD");
        ctx.fillText("Hearts: ", 100, 50);
        ctx.fillStyle = "Gold";
        ctx.fillText("Coins: ", 550, 50);
        this.heartanimation = ASSET_MANAGER.getAsset("./sprites/heart.png");
        if (this.heartanimation) {
            for (let i = 0; i < 5; i++) {
                ctx.drawImage(this.heartanimation, 320 + i * 40, 20, 30, 30); 
                
            }
        }
    }
}