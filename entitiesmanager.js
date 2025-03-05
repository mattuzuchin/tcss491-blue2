class entitiesmanager {
    constructor(game, character, levelScene) {
        this.character = character;
        this.levelS = levelScene;
        this.game = game;
        this.level = null; 
        this.game.camera = this;
        this.startingPointX = 0;
        this.startingPointY = 655;
        this.isDead = false;
        this.backgroundMusic = null;
        if(this.character === "marksman") {
            this.player = new Marksman(this.game, this.startingPointX, this.startingPointY, this);
        } else if(this.character === "warrior") {
            this.player = new Warrior(this.game, this.startingPointX, this.startingPointY, this);
        } else{
            this.player = new Mage(this.game, this.startingPointX, this.startingPointY, this);
        }

        this.loadLevel(this.levelS);
    }
    startMusic(level) {
        if(level.boss.length == 0) {
            this.backgroundMusic = new Audio("./audio/level1scene1-4.wav");
        } else {
            this.backgroundMusic = new Audio("./audio/level1bosssound.mp3");
        }
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.play();
        this.backgroundMusic.loop = true;
    }

    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
    loadLevel(level) {
        this.level = level;
        this.game.entities = [];
        this.startMusic(this.level);
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
        // Sand floor blocks (8)
        if (level.sand_floor) {
            for (let i = 0; i < level.sand_floor.length; i++) {
                let sand = level.sand_floor[i];
                this.game.addEntity(new Platform(sand.x, sand.y, sand.width, sand.height, 8));
            }
        }

        // Sand middle blocks (9)
        if (level.sand_m) {
            for (let i = 0; i < level.sand_m.length; i++) {
                let sand = level.sand_m[i];
                this.game.addEntity(new Platform(sand.x, sand.y, sand.width, sand.height, 9));
            }
        }

        // Sand right blocks (10)
        if (level.sand_r) {
            for (let i = 0; i < level.sand_r.length; i++) {
                let sand = level.sand_r[i];
                this.game.addEntity(new Platform(sand.x, sand.y, sand.width, sand.height, 10));
            }
        }

        // Sand left blocks (11)
        if (level.sand_l) {
            for (let i = 0; i < level.sand_l.length; i++) {
                let sand = level.sand_l[i];
                this.game.addEntity(new Platform(sand.x, sand.y, sand.width, sand.height, 11));
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
                console.log("I'm a chest created on " + level );
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
        if(level.potions) {
            for (let i = 0; i < level.potions.length; i++) {
                let potion = level.potions[i];
                this.game.addEntity(new Potion(this.game, potion.x, potion.y));

            }
        }
        if(level.boss) {
            for (let i = 0; i < level.boss.length; i++) {
                let bossl = level.boss[i];
                console.log("I'm created?? on " + level );
                this.game.addEntity(new PirateBoss(this.game, bossl.x, bossl.y));

            }
        }
        if(level.shop) {
            for (let i = 0; i < level.shop.length; i++) {
                let shops = level.shop[i];
                console.log("I'm created?? on " + level );
                this.game.addEntity(new Shop(this.game, this.player, shops.x, shops.y));

            }
        }
        this.game.addEntity(this.player);
        this.game.addEntity(new MainMenu(this.game, this.player));
    }

    update() {
 
    }
    toggleDeath() {
        this.isDead = !this.isDead;
    }

    draw(ctx) {
        if(!this.isDead) {
            ctx.fillStyle = "#EE4B2B";
            ctx.font = "30px 'Press Start 2P', sans-serif"; 
            ctx.fillText("Hearts: ", 125, 50);
            ctx.fillStyle = "Gold";
            ctx.fillText("Coins: " + this.player.coinCount, 600, 50);
            ctx.fillStyle = "#EE4B2B";
            ctx.font = "bold 12px 'Press Start 2P', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Current Level: " + this.player.getLevelName(), 150, 75);
        }
        this.heartanimation = ASSET_MANAGER.getAsset("./sprites/player entities/heart.png");
        this.halfheart = ASSET_MANAGER.getAsset("./sprites/player entities/halfheart.png");
        if (this.heartanimation) {
            let fullHearts = Math.floor(this.player.hearts); 
            let hasHalfHeart = this.player.hearts % 1 !== 0; 
        
            for (let i = 0; i < fullHearts; i++) {
                ctx.drawImage(this.heartanimation, 225 + i * 40, 20, 30, 30);
            }
        
    
            if (hasHalfHeart) {
                ctx.drawImage(this.halfheart, 225 + fullHearts * 40, 20, 30, 30);
            }
        }
    }
}