class entitiesmanager {
    constructor(game) {
        this.game = game;
        this.level = null;
        this.hearts = 3;
        this.coins = 0;
        this.game.camera = this;
        this.player = new Player(this.game, 0, 0, 1);
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
        //grass middle blocks (1)
        if (level.grass_m) {
            for (let i = 0; i < level.grass_m.length; i++) {
                let grass = level.grass_m[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,1));
            }
        }
        //grass right blocks (2)
        if (level.grass_r) {
            for (let i = 0; i < level.grass_r.length; i++) {
                let grass = level.grass_r[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,2));
            }
        }
        //grass left blocks (3)
        if (level.grass_l) {
            for (let i = 0; i < level.grass_l.length; i++) {
                let grass = level.grass_l[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,3));
            }
        }
        if(level.platforms) {
            for (let i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i];
                this.game.addEntity(new Platform(platform.x, platform.y, platform.width, platform.height));
            }
        }
        //crates
        if(level.crates) {
            for (let i = 0; i < level.crates.length; i++) {
                let platform = level.crates[i];
                this.game.addEntity(new Platform(platform.x, platform.y, platform.width, platform.height,4));
            }
        }
        //chests
        if(level.chests) {
            for (let i = 0; i < level.chests.length; i++) {
                let platform = level.chests[i];
                this.game.addEntity(new Chest(platform.x, platform.y, platform.width, platform.height,this.game));
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
    
        ctx.fillText("Hearts: ", 100, 50);
        ctx.fillStyle = "Gold";
        ctx.fillText("Coins: ", 550, 50);
        this.heartanimation = ASSET_MANAGER.getAsset("./sprites/heart.png");
        this.halfheart = ASSET_MANAGER.getAsset("./sprites/halfheart.png");
        if (this.heartanimation) {
            let fullHearts = Math.floor(this.player.hearts); 
            let hasHalfHeart = this.player.hearts % 1 !== 0; 
        
            for (let i = 0; i < fullHearts; i++) {
                ctx.drawImage(this.heartanimation, 320 + i * 40, 20, 30, 30);
            }
        
    
            if (hasHalfHeart) {
                ctx.drawImage(this.halfheart, 320 + fullHearts * 40, 20, 30, 30);
            }
        }
    }
}