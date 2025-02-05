class entitiesmanager {
    constructor(game, character) {
        this.character = character;
        this.game = game;
        this.level = null; 
        this.game.camera = this;
        this.startingPointX = 0;
        this.startingPointY = 655;
        if(this.character === "marksman") {
            this.player = new Marksman(this.game, this.startingPointX, this.startingPointY);
        } else {
            this.player = new Warrior(this.game, this.startingPointX, this.startingPointY);
        }
        this.loadLevel(level1Scene1);
    }

    loadLevel(level) {
        this.level = level;
        this.game.entities = [];
        // Load ghost pirates
        if (level.ghostpirate) {
            for (let i = 0; i < level.ghostpirate.length; i++) {
                let ghostpirate = level.ghostpirate[i];
                this.game.addEntity(new GhostPirate(this.game, ghostpirate.x, ghostpirate.y, ghostpirate.type));
            
            }
        }
        // Loadpirate
        if (level.pirate) {
            for (let i = 0; i < level.pirate.length; i++) {
                let pirate = level.pirate[i];
                this.game.addEntity(new Pirate(this.game, pirate.x, pirate.y, pirate.type));
        
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
        //grass middle blocks plat (4)
        if (level.grass_m_p) {
            for (let i = 0; i < level.grass_m_p.length; i++) {
                let grass = level.grass_m_p[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,5));
            }
        }
        //grass right blocks (6)
        if (level.grass_r_p) {
            for (let i = 0; i < level.grass_r_p.length; i++) {
                let grass = level.grass_r_p[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,6));
            }
        }
        //grass left blocks (7)
        if (level.grass_l_p) {
            for (let i = 0; i < level.grass_l_p.length; i++) {
                let grass = level.grass_l_p[i];
                this.game.addEntity(new Platform(grass.x, grass.y, grass.width, grass.height,7));
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
                this.game.addEntity(new Chest(this.game, platform.x, platform.y));
          
            }
        }
        // Load artifacts
        if (level.artifacts) {
            for (let i = 0; i < level.artifacts.length; i++) {
                let artifact = level.artifacts[i];
                this.game.addEntity(new Artifact(this.game, artifact.x, artifact.y));

            }
        }

        if(level.coins) {
            for (let i = 0; i < level.coins.length; i++) {
                let coin = level.coins[i];
                this.game.addEntity(new Coins(this.game, coin.x, coin.y));

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
        ctx.fillText("Coins: " + this.player.coinCount, 550, 50);
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