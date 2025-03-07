class Player {
    constructor(game, x, y, characterNumber, emanage) {
        Object.assign(this, { game, x, y });
        this.startingPointX = x;
        this.entitiesMan = emanage;
        this.startingPointY = y;
        const characterTypes = ["Marksman", "Warrior", "Mage"];
        this.characterType = characterTypes[characterNumber] || "Marksman";
        this.isDead = false;
        this.width = 40;
        this.height = 40;
        this.speed = 2;
        this.jump = -10;
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.facingLeft = false;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.attackDirection = "right";
        this.damage = 400;
        this.isDashing = false;
        this.currentScene = 1;
        this.dashCooldown = 0;
        this.dashDuration = 10;
        this.dashSpeed = 15;
        this.artifactCounts = 0;
        this.powerUpDuration = 5;
        this.totalChests = 0;
        this.coinCount = 0;
        this.hearts = 5;
        this.bosslevel1Defeat = 0;
        this.totalKills = 0;
        this.power = false;
        this.durationMessage = 0;
        this.messageText = "";
        this.messageX = 0;
        this.messageY = 0;
        this.isMessage = false;
        this.startLevelMusic(this.getNextLevel());
        this.assets = {
            Marksman: ASSET_MANAGER.getAsset("./sprites/player entities/marksmenwalkLeft.png"),
            MarksmanIdle: ASSET_MANAGER.getAsset("./sprites/player entities/marksmentemp.png"),
            WarriorIdle: ASSET_MANAGER.getAsset("./sprites/player entities/warriortemp.png"),
            WarriorAttack: ASSET_MANAGER.getAsset("./sprites/player entities/warriorattack.png"),
            Warrior: ASSET_MANAGER.getAsset("./sprites/player entities/warriorwalk1.png"),
            MarksmanAttack: ASSET_MANAGER.getAsset("./sprites/player entities/marksmenattack.png"),
            Mage: ASSET_MANAGER.getAsset("./sprites/player entities/Mage.png"),
            MageAttack: ASSET_MANAGER.getAsset("./sprites/player entities/MageAttack.png")
            
        };
        this.highestArtifactPerScene = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        };
        this.sprite = this.assets[this.characterType];

        this.animators = {
            Marksman: {
                idle: new Animator(this.assets.MarksmanIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Marksman, 0, 0, this.width, this.height, 8, 0.05),
                attacking: new Animator(this.assets.MarksmanAttack, 0, 5, 37, 45, 20, 0.02),
            },
            Warrior: {
                idle: new Animator(this.assets.WarriorIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Warrior, 0, 0, 50, this.height, 8, 0.1),
                attacking: new Animator(this.assets.WarriorAttack, 0, 0, 45, this.height, 10, 0.05),
            },
            Mage: {
                idle: new Animator(this.assets.Mage, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Mage, 0, 0, this.width, this.height, 2, 0.1),
                attacking: new Animator(this.assets.MageAttack, 0, 0, this.width, this.height, 4, 0.07),
            }
        };

        this.currentAnimator = this.animators[this.characterType].idle;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    takeDamage(amount) {
        console.log("Damage left: " + this.hearts);
        this.hearts = this.hearts - amount;
        if (this.hearts < 0) this.hearts = 0;
        if (this.hearts === 0) this.die();
    }
    activateMessage(message, x,y) {
        this.isMessage = true;
        this.messageText = message;
        this.durationMessage = 150;
        this.messageX = x;
        this.messageY = y;
    }
    die() {
        console.log("Player has been defeated!");
        this.isDead = true;
        this.totalKills = 0;
        this.removeFromWorld = true;
        this.game.entities = [];
        this.entitiesMan.toggleDeath();
        this.stopMusic();
        this.playSound("died");
        this.game.addEntity(new DeathScreen(this.game, this));
    }
    playSound(sound) {
        this.Sound = new Audio(`./audio/${sound}.mp3`);
        this.Sound.play();
        this.Sound.volume = 0.7;
        this.Sound.loop = false;
    }
    startLevelMusic(level) {
        if(level.boss.length == 0) {
            this.backgroundMusic = new Audio("./audio/level1scene1-4.wav");
        } else {
            this.backgroundMusic = new Audio("./audio/level1bosssound.mp3");
        }
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.play();
    }

    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
    update() {
        if (this.isDead) return;
        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.handleAttack();
        this.handleSpecialAttack();
        this.handleDash();
        this.updateBoundingBox();
        this.checkComplete();
        if(this.durationMessage != 0 ) {
            this.isMessage = true;
        } else {
            this.isMessage = false;
        }
        if(this.power) {
            this.activateMessage("PowerUp!", this.x, this.y);
        }
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.dashCooldown > 0) this.dashCooldown--;
    }
    reset() {
        this.stopMusic();
        const currentCoins = this.game.camera.player.coinCount;
        const character = this.game.camera.character;
        const currentscene = this.currentScene;
        this.game.click = null;
        this.game.mouse = null;
        this.game.wheel = null;
        this.game.keys = {};
        this.game.left = false;
        this.game.right = false;
        this.game.up = false;
        this.game.fall = false;
        this.game.down = false;
        this.game.isJump = false;
        this.game.speedup = false;
        this.game.speed = true;
        this.game.dash = false;
        this.game.paused = false;
    
        this.game.camera = new entitiesmanager(this.game, character, this.getNextLevel(currentscene));
    
        this.game.camera.player.coinCount = currentCoins;
         
        this.game.camera.player.hearts = 5;
        this.game.camera.isDead = false;
        this.game.camera.player.currentScene = currentscene;
    }
    quit() {
        location.reload();
    }
    handleMovement() {

        if (this.game.left) {
            this.x -= this.speed;
            this.attackDirection = "left";
            if(this.attackDuration <= 0) this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = true;
        }
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            if(this.attackDuration <= 0) this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = false;
        }
        if (this.game.isJump && this.isOnGround) {
            this.velocity = this.jump;
            this.isOnGround = false;
        }
        if (this.game.up && this.isOnGround) {
            this.attackDirection = "up";
        }
        if (!this.game.left && !this.game.right && this.attackDuration <= 0) {
            this.currentAnimator = this.animators[this.characterType].idle; 
        }
        if (this.game.speedup) {
            this.speed = 4;
        } else {
            this.speed = 2;
        }
    }

    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.isOnGround = false;
    }

    handleCollisions() {
        if (this.y + this.height > this.game.ctx.canvas.height) {
            this.y = this.game.ctx.canvas.height - this.height;
            this.velocity = 0;
            this.isOnGround = true;
        }
        for (let entity of this.game.entities) {
            if (entity instanceof Platform && this.BB.collide(entity.boundingBox)) {
                if (this.velocity > 0 && (this.y + this.height) >= (entity.boundingBox.top + this.velocity)) {
                    this.y = entity.boundingBox.top - this.height;
                    this.velocity = 0;
                    this.isOnGround = true;
                }
            }
            if (entity instanceof Artifact && this.BB.collide(entity.BB)) {
                this.playSound("artifact");
                this.artifactCounts += 1;
                this.highestArtifactPerScene[this.currentScene] = true;
                entity.removeFromWorld = true;
                this.activateMessage("Artifact Found!", entity.x, entity.y);
                console.log(this.artifactCounts);
            }
            if (entity instanceof Coins && this.BB.collide(entity.BB)) {
                this.playSound("coin");
                this.coinCount += 1;
                entity.removeFromWorld = true;
                this.activateMessage("+1 Coin", this.x, this.y);
            }
            if (entity instanceof Potion && this.BB.collide(entity.BB)) {
                
                if(this.hearts < 5) {
                    this.hearts = Math.min(this.hearts + 1, 5);
                    this.activateMessage("+1 Heart", entity.x, entity.y);
                    this.playSound("heart");
                }
                entity.removeFromWorld = true;
            }
        }
    }
    
    checkComplete() {
        if (this.currentScene === 1) {
            this.level = level1Scene1;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 2) {
            this.level = level1Scene2;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 3) {
            this.level = level1Scene3;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 4) {
            this.level = level1Scene4;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 5) {
            this.level = bosslevel1;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 6) {
            this.level = level2Scene1;
            this.checkObjectives(this.level);
        } 
    }

    checkObjectives(level) {
        this.levelO = level;
        if(this.levelO.objectives[0].bosslevel) {
            if (this.bosslevel1Defeat >= 1 &&
                this.artifactCounts >= 1) {
                this.removechest();
                this.resetValues();
                console.log("Moving to next scene!");
                this.moveToNextScene();
            }
        } else  {
            if (this.totalKills >= this.levelO.objectives[0].enemies &&
                this.totalChests >= this.levelO.objectives[0].chests &&
                this.artifactCounts >= this.levelO.objectives[0].artifact) {
                this.removechest();
                this.resetValues();
                console.log("Moving to next scene!");
                this.moveToNextScene();
            }
        }

    }
    
    resetValues() {
        this.totalKills = 0;
        this.totalChests = 0;
        this.artifactCounts = 0;
        this.x = 0;
        this.y = 655;
    }

    removechest() {
        for (let entity of this.game.entities) {
            if (entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                entity.removeFromWorld = true;
            }
        }
    }

    moveToNextScene() {
        this.currentScene++;
        this.game.camera.loadLevel(this.getNextLevel());
    }

    getNextLevel() {
        switch (this.currentScene) {
            case 6:
                return level2Scene1;
            case 5:
                return bosslevel1;
            case 4:
                return level1Scene4;
            case 3:
                return level1Scene3;
            case 2:
                return level1Scene2;
            default:
                return level1Scene1;
        }
    }
    getLevelName() {
        switch (this.currentScene) {
            case 6:
                return "2 Scene 1";
            case 5:
                return "1 BOSS";
            case 4:
                return "1 Scene 4";
            case 3:
                return "1 Scene 3";
            case 2:
                return "1 Scene 2";
            default:
                return "1 Scene 1";
        }
    }
    getCurrentScene() {
        return this.currentScene;
    }
    handleDash() {
        if (this.game.dash && this.dashCooldown <= 0 && !this.isDashing && this.isOnGround) {
            this.isDashing = true;
            this.dashCooldown = 60;
        }

        if (this.isDashing && this.dashDuration > 0) {
            this.dashDuration--;
            if (this.attackDirection === "right") {
                this.x += this.dashSpeed;
            } else if (this.attackDirection === "left") {
                this.x -= this.dashSpeed;
            }
        } else if (this.isDashing) {
            this.isDashing = false;
            this.dashDuration = 10;
        }
    }

    updateBoundingBox() {
        if (this.BB.y + this.BB.height >= 728) {
            this.x = this.startingPointX;
            this.y = this.startingPointY;
            this.takeDamage(1);
            this.BB.x = this.x;
            this.BB.y = this.y;
        }
        this.BB.x = this.x;
        this.BB.y = this.y;
    }
    
    drawMessage(ctx) {
        if(this.messageText === "+1 Coin") {
            ctx.fillStyle = "gold";
        } else if (this.messageText === "-1") {
            ctx.fillStyle = "orange";
        } else if (this.messageText == "+1 Heart") {
            ctx.fillStyle = "red";
        } else if (this.messageText === "Artifact Found!") {
            ctx.fillStyle = "green";
        } else if (this.messageText === "PowerUp!") {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "#EE4B2B";
        }
        ctx.font = "bold 9px 'Press Start 2P', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.messageText, this.messageX + 15, this.messageY - 10);
    }
    drawArtifact(ctx) {
        let image;
        if (this.currentScene === 1) {
            if(!this.highestArtifactPerScene[1]) {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_empty.png");
            } else {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_20.png");
            }
        } else if (this.currentScene === 2) {
            if(!this.highestArtifactPerScene[2]) {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_20.png");
            } else {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_40.png");
            }
        } else if (this.currentScene === 3 ) {
            if(!this.highestArtifactPerScene[3]) {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_40.png");
            }else {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_60.png");
            }
        } else if (this.currentScene === 4) {
            if(!this.highestArtifactPerScene[4]) {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_60.png");
            } else {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_80.png");
            }
        } else if (this.currentScene === 5) {
            if(!this.highestArtifactPerScene[5]) {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_80.png");
            } else {
                image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_complete.png");
            }
        } else {
            image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_empty.png");
        }
        ctx.drawImage(image, 30, 100, 65, 65);
    }
    drawCooldownBar(ctx) {
        if (this.attackCooldown > 0) {  
            const barWidth = 40;  
            const barHeight = 5; 
            const barX = this.x;  
            const barY = this.y - 10; 
            ctx.fillStyle = "red";
            ctx.fillRect(barX, barY, barWidth, barHeight);
        }
    }
    
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        this.drawArtifact(ctx);
        this.drawCooldownBar(ctx)
        if(this.isMessage && this.durationMessage != 0) {
            this.drawMessage(ctx, this.messageX, this.messageY);
            this.durationMessage--;
        }
        ctx.save();
        if (this.facingLeft) {
            ctx.translate(this.x + this.width, 0); 
            ctx.scale(-1, 1);
            this.currentAnimator.drawFrame(this.game.clockTick, ctx, 0, this.y);
        } else {
            this.currentAnimator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        ctx.restore();
    }
    
}

class Warrior extends Player {
    constructor(game, x, y, emanage) {
        super(game, x, y, 1, emanage); // 1 "Warrior"
        this.damage = 1000; 
        this.downwardStrikeCooldown = 120; 
        this.downwardStrikeDuration = 30; 
        this.isDownwardStriking = false; 
    }

    update() {
        this.handleDownwardStrike();
        super.update(); 
    }
    handleSpecialAttack() {
        //TODO
        if(this.game.specialAttack ) {
            this.hearts = 0.5;
        }
        
    }
    handleAttack() {
        if (this.game.attack && !this.attackPressed && this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackPressed = true; 
            this.attackDuration = 50;
            this.attackCooldown = 180;
            
            let attackBB;
            if (this.attackDirection === "right") {
                attackBB = new BoundingBox(this.x + this.width, this.y + 10, 30, 30); 
            } else if (this.attackDirection === "left") {
                attackBB = new BoundingBox(this.x - 30, this.y + 10, 30, 30);
            } else if (this.attackDirection === "up") {
                attackBB = new BoundingBox(this.x + 10, this.y - 30, 30, 30);
            }
    
            this.playSound("sword");
    
            for (let entity of this.game.entities) {
                if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                    || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && attackBB.collide(entity.BB)) {
                    if (this.power && this.powerUpDuration > 0) {
                        this.playSound("powerup");
                        this.powerUpDuration -= 1;
                        entity.takeDamage(this.damage * 3);
                    } else {
                        this.power = false;
                        this.powerUpDuration = 5;
                        entity.takeDamage(this.damage);
                    }
                    this.activateMessage("-1", entity.x, entity.y);
                    if (entity.isDead) {
                        if (entity instanceof PirateBoss) {
                            this.bosslevel1Defeat++;
                            entity.removeFromWorld = true;
                        } else {
                            this.totalKills++;
                            entity.removeFromWorld = true;
                        }
                    }
                }
            }
        }
    
        if (!this.game.attack) {
            this.attackPressed = false; 
        }
    
        if (this.isAttacking && this.attackDuration > 0) {
            this.attackDuration--;
            this.currentAnimator = this.animators[this.characterType].attacking;
        } else {
            this.isAttacking = false;
            this.attackDuration = 50;
        }
    }
    
    handleDownwardStrike() {
        // attack + fall keys
        if (this.game.attack && this.game.down && this.downwardStrikeCooldown <= 0 && !this.isOnGround) {
            this.isDownwardStriking = true; 
            this.downwardStrikeCooldown = 120; 
            this.downwardStrikeDuration = 30; 
            this.velocity = 50;
        }

  
        if (this.isDownwardStriking && this.downwardStrikeDuration > 0) {
            this.playSound("sword");
            this.downwardStrikeDuration--;

            const downwardStrikeBB = new BoundingBox(
                this.x - 20, 
                this.y + this.height, 
                this.width + 40, 
                30 
            );

            for (let entity of this.game.entities) {
                if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                    || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && downwardStrikeBB.collide(entity.BB)) {
                    if(this.power === true && this.powerUpDuration > 0) {
                        this.powerUpDuration -= 1;
                        entity.takeDamage(this.damage * 3);
                    } else {
                        this.power = false;
                        this.powerUpDuration = 5;
                        entity.takeDamage(this.damage * 1.5);
                    }
                    if (entity.isDead) {
                        this.totalKills++;
                        console.log(this.totalKills);
                        entity.removeFromWorld = true;
                    }
                }
            }

            this.currentAnimator = this.animators[this.characterType].attacking; // Use attack animation for now
        } else {
            this.isDownwardStriking = false;
        }
        if (this.downwardStrikeCooldown > 0) {
            this.downwardStrikeCooldown--;
        }
    }

    draw(ctx) {
        super.draw(ctx);
    }

}

class Marksman extends Player {
    constructor(game, x, y, emanage) {
        super(game, x, y, 0, emanage);
        this.damage = 30;
        this.attackDuration = 10;
        this.specialAttackCooldown = 0;
        
        // Special attack 
        this.specialArrowsRemaining = 0;
        this.specialAttackFrameCounter = 0;
        this.isSpecialAttacking = false;
    }

    handleSpecialAttack() {
        if (this.game.specialAttack && this.specialAttackCooldown <= 0 && !this.isSpecialAttacking) {
  
            this.isSpecialAttacking = true;
            this.specialArrowsRemaining = 3;
            this.specialAttackCooldown = 180; 
            this.game.specialAttack = false;
        }

        if (this.isSpecialAttacking) {
            this.specialAttackFrameCounter++;
            
            if (this.specialAttackFrameCounter >= 10) {
                let projectile = new Projectile(
                    this.game, 
                    this.x, 
                    this.y, 
                    this.attackDirection, 
                    this
                );
                this.playSound("arrowshoot");
                this.game.addEntity(projectile);
                this.currentAnimator = this.animators[this.characterType].attacking;
                this.specialArrowsRemaining--;
                this.specialAttackFrameCounter = 0;
                
                if (this.specialArrowsRemaining <= 0) {
                    this.isSpecialAttacking = false;
                }
            }
        }
    }


    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.arrowSound = new Audio("./audio/arrowshoot.mp3");
            this.arrowSound.play();
            this.arrowSound.volume = 0.2;
            this.arrowSound.loop = false;
            this.attackDuration = 20;
            let projectile = new Projectile(this.game, this.x, this.y, this.attackDirection, this);
            this.game.addEntity(projectile);
            console.log(this.totalKills);
            this.attackCooldown = 100;
            this.currentAnimator = this.animators[this.characterType].attacking;
        } else {
            this.attackDuration--;
        }
    }
    update() {
        super.update();
        if (this.specialAttackCooldown > 0) this.specialAttackCooldown--;
    }
    draw(ctx) {
        super.draw(ctx);
    }
}
class Mage extends Player {
    constructor(game, x, y, emanage) {
        super(game, x, y, 2, emanage); 
        this.damage = 20;
        this.specialAttackCooldown = 0;
    }

    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.playSound("fireball");
            this.attackDuration = 20;
            let magicBall = new MagicBall(
                this.game, 
                this.x, 
                this.y, 
                this.attackDirection, 
                this
            );
            this.game.addEntity(magicBall);
            this.attackCooldown = 30;
            this.currentAnimator = this.animators[this.characterType].attacking;
        }
        else {
            this.attackDuration--;
        }
    }

    handleSpecialAttack() {
        if (this.game.specialAttack && this.specialAttackCooldown <= 0) {
            this.playSound("laser");
            let laser = new LaserBeam(
                this.game, 
                this.x + 20, 
                this.y + 10, 
                this.attackDirection, 
                this
            );
            this.game.addEntity(laser);
            this.specialAttackCooldown = 300; 
            this.game.specialAttack = false;
        }
    }

    update() {
        super.update();
        if (this.specialAttackCooldown > 0) this.specialAttackCooldown--;
    }
}