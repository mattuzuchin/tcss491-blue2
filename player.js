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
        this.isSpecial = false;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.attackDirection = "right";
        this.damage = 400;
        this.isDashing = false;
        this.currentScene = 1;
        this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_empty.png");;
        this.dashCooldown = 0;
        this.dashDuration = 10;
        this.dashSpeed = 15;
        this.artifactCounts = 0;
        this.powerUpDuration = 5;
        this.totalChests = 0;
        this.coinCount = 0;
        this.hearts = 5;
        this.bosslevel1Defeat = 0;
        this.bosslevel4Defeat = 0;
        this.totalKills = 0;
        this.power = false;
        this.isDouble = false;
        this.specialAttackCount = 0;
        this.doubleDuration = 5;
        this.durationMessage = 0;
        this.messageText = "";
        this.deathTimer = 0;
        this.messageX = 0;
        this.messageY = 0;
        this.testThisCooldown = 0;
        this.testThis = 1;
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
            2: false,
            4: false,
            6: false,
            8: false,
            9: false,
            11: false,
            13: false,
            15: false,
            17: false,
            18: false
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
        this.checkSpecialAttack();
        if(this.testThisCooldown > 0) {
            this.testThisCooldown--;
        }
        if(this.getCurrentScene() > 9) {
            if(this.testThis === 1) {
                this.updateBackground("./sprites/background/westernbackground01.png");
                this.testThisCooldown = 250;
                this.testThis++;
            } else if(this.testThis === 2 && this.testThisCooldown <= 0) {
                this.updateBackground("./sprites/background/westernbackground02.png");
                this.testThisCooldown = 250;
                this.testThis++;
            } else if(this.testThis === 3 && this.testThisCooldown <= 0) {
                this.updateBackground("./sprites/background/westernbackground03.png");
                this.testThisCooldown = 250;
                this.testThis++;
            } else if(this.testThis === 4 && this.testThisCooldown <= 0) {
                this.updateBackground("./sprites/background/westernbackground04.png");
                this.testThisCooldown = 250;
                this.testThis++;
            } else if(this.testThis === 5 && this.testThisCooldown <= 0) {
                this.updateBackground("./sprites/background/westernbackground05.png");
                this.testThisCooldown = 250;
                this.testThis = 1;
            }
        }

        if(this.durationMessage != 0 ) {
            this.isMessage = true;
        } else {
            this.isMessage = false;
        }
        if(this.isDouble) {
            this.activateMessage("x2 Coins!", this.x, this.y);
        }
        if(this.power) {
            this.activateMessage("PowerUp!", this.x, this.y);
        }
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.dashCooldown > 0) this.dashCooldown--;
    }
    checkSpecialAttack() {
        if(this.specialAttackCount === 5) {
            this.isSpecial = true;
        } 
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
        this.totalChests = 0;
        this.game.camera.isDead = false;
        this.game.camera.player.currentScene = currentscene;
    }
    quit() {
        location.reload();
    }
    updateBackground(imagePath) {
        // Update the canvas background via CSS
        document.getElementById("gameWorld").style.background = `url('${imagePath}')`;
    }
    handleMovement() {
        if (this.game.left) {
            this.x -= this.speed;
            this.attackDirection = "left";
            this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = true;
        }
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = false;
        }
        if (this.game.isJump && this.isOnGround) {
            this.velocity = this.jump;
            this.isOnGround = false;
        }
        if (this.game.up && this.isOnGround) {
            this.attackDirection = "up";
        }
        if (!this.game.left && !this.game.right) {
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
                if(this.isDouble && this.doubleDuration > 0) {
                    this.coinCount += 2;
                    this.doubleDuration--;
                } else {
                    this.coinCount += 1;
                    this.doubleDuration = 5;
                    this.isDouble = false;
                }
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
            this.level = level2Scene1;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 6) {
            this.level = level2Scene2;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 7) {
            this.level = level2Scene3;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 8) {
            this.level = level2Scene4;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 9) {
            this.level = bosslevel2;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 10) {
            this.level = level3Scene1;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 11) {
            this.level = level3Scene2;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 12) {
            this.level = level3Scene3;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 13) {
            this.level = level3Scene4;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 14) {
            this.level = level4Scene1;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 15) {
            this.level = level4Scene2;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 16) {
            this.level = level4Scene3;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 17) {
            this.level = level4Scene4;
            this.checkObjectives(this.level);
        } else if (this.currentScene === 18) {
            this.level = bosslevel4;
            this.checkObjectives(this.level);
        }
    }

    checkObjectives(level) {
        this.levelO = level;
        if(this.levelO.objectives[0].bosslevel) {
            if ((this.bosslevel1Defeat >= 1  || this.bosslevel4Defeat >= 1)&&
                this.artifactCounts >= 1) {
                this.removechest();
                this.resetValues();
                console.log("Moving to next scene!");
                if(this.getCurrentScene() === 18) {
                    this.checkGameWon();
                } else {
                    this.playSound("levelcomplete");
                    this.moveToNextScene();
                }
            }
        } else  {
            if (this.totalKills >= this.levelO.objectives[0].enemies &&
                this.totalChests >= this.levelO.objectives[0].chests &&
                this.artifactCounts >= this.levelO.objectives[0].artifact) {
                this.playSound("levelcomplete");
                this.removechest();
                this.resetValues();
                console.log("Moving to next scene!");
                this.moveToNextScene();

            }
        }

    }

    checkGameWon() {
        console.log("Player won");
        this.totalKills = 0;
        this.specialAttackCount = 0;
        this.removeFromWorld = true;
        this.game.entities = [];
        this.stopMusic();
        this.playSound("gamecomplete");
        this.game.addEntity(new CompleteGame(this.game, this));
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
            case 18:
                return bosslevel4;
            case 17:
                return level4Scene4;
            case 16:
                return level4Scene3;
            case 15:
                return level4Scene2;
            case 14:
                return level4Scene1;
            case 13:
                return level3Scene4;
            case 12:
                return level3Scene3;
            case 11:
                return level3Scene2;
            case 10:
                return level3Scene1;
            case 9:
                return bosslevel2;
            case 8:
                return level2Scene4;
            case 7:
                return level2Scene3;
            case 6:
                return level2Scene2;
            case 5:
                return level2Scene1;
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
            case 18:
                return "4 BOSS";
            case 17:
                return "4 Scene 4";
            case 16:
                return "4 Scene 3";
            case 15:
                return "4 Scene 2";
            case 14:
                return "4 Scene 1";
            case 13:
                return "3 Scene 4";
            case 12:
                return "3 Scene 3";
            case 11:
                return "3 Scene 2";
            case 10:
                return "3 Scene 1";
            case 9:
                return "2 BOSS";
            case 8:
                return "2 Scene 4";
            case 7:
                return "2 Scene 3";
            case 6:
                return "2 Scene 2";
            case 5:
                return "2 Scene 1";
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
        if (this.currentScene === 2) {
            if(!this.highestArtifactPerScene[2]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_empty.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_20.png");
            }
        } else if (this.currentScene === 4) {
            if(!this.highestArtifactPerScene[4]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_20.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_40.png");
            }
        } else if (this.currentScene === 6 ) {
            if(!this.highestArtifactPerScene[6]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_40.png");
            }else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_60.png");
            }
        } else if (this.currentScene === 8) {
            if(!this.highestArtifactPerScene[8]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_60.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_80.png");
            }
        } else if (this.currentScene === 9) {
            if(!this.highestArtifactPerScene[9]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_80.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/artifact_complete.png");
            }
        } else if (this.currentScene === 11) { 
            if(!this.highestArtifactPerScene[11]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_empty.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_20.png");
            }
        } else if (this.currentScene === 13) {
            if(!this.highestArtifactPerScene[13]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_20.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_40.png");
            }
        } else if (this.currentScene === 15) {
            if(!this.highestArtifactPerScene[15]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_40.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_60.png");
            }
        } else if (this.currentScene === 17) {
            if(!this.highestArtifactPerScene[17]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_60.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_80.png");
            }
        } else if (this.currentScene === 18) {
            if(!this.highestArtifactPerScene[18]) {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_80.png");
            } else {
                this.image = ASSET_MANAGER.getAsset("./sprites/artifacts/necklace_complete.png");
            }
        }
        ctx.drawImage(this.image, 10, 100, 65, 65);
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
    drawSpecial(ctx) {
        let image;
        if(this.specialAttackCount === 0) {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttack1.png");
        } else if (this.specialAttackCount === 1) {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttack2.png");
        } else if (this.specialAttackCount === 2) {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttack3.png");
        } else if (this.specialAttackCount === 3) {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttack4.png");
        } else if (this.specialAttackCount === 4 ) {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttack5.png");
        } else {
            image = ASSET_MANAGER.getAsset("./sprites/interactive entities/specialAttackFinal.png");
        }
        ctx.drawImage(image, 500, 15, 200, 30);
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        this.drawArtifact(ctx);
        this.drawCooldownBar(ctx);
        this.drawSpecial(ctx);
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
                // Check for collisions with enemies
                if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                    || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && 
                    this.BB.collide(entity.BB)) {
                    if (!entity.isDead) {
                        
                        if(this.power && this.powerUpDuration > 0) {
                            this.powerUpDuration -= 1;
                            entity.takeDamage(this.damage * 3);
                        } else {
                            this.power = false;
                            this.powerUpDuration = 5;
                            entity.takeDamage(this.damage);
                        }
    
                        this.activateMessage("-1", entity.x, entity.y);
                    
                        if(entity.isDead) {
                            if(entity instanceof PirateBoss) {
                                this.bosslevel1Defeat++;
                                this.bosslevel4Defeat++;
                                this.specialAttackCount++;
                            } else {
                                this.totalKills++;
                                this.specialAttackCount++;
                            }
                        }
                    }
                }
                if (entity instanceof Chest && this.BB.collide(entity.boundingBox) && !entity.stayOpen) {
                    this.totalChests += 1;
                    this.power = entity.openChest();
                    entity.keepOpen();
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
                // Check for collisions with enemies
                if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                    || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && 
                    downwardStrikeBB.collide(entity.BB)) {
                    if (!entity.isDead) {
                        
                        if(this.power && this.powerUpDuration > 0) {
                            this.powerUpDuration -= 1;
                            entity.takeDamage(this.damage * 3);
                        } else {
                            this.power = false;
                            this.powerUpDuration = 5;
                            entity.takeDamage(this.damage);
                        }
    
                        this.activateMessage("-1", entity.x, entity.y);
                    
                        if(entity.isDead) {
                            if(entity instanceof PirateBoss) {
                                this.bosslevel1Defeat++;
                                this.bosslevel4Defeat++;
                            } else {
                                this.totalKills++;
                            }
                        }
                    }
                }
                if (entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                    this.totalChests += 1;
                    this.power = entity.openChest();
                    entity.keepOpen();
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

        // Special attack 
        this.specialArrowsRemaining = 0;
        this.specialAttackFrameCounter = 0;
        this.isSpecialAttacking = false;
    }

    handleSpecialAttack() {
        if (this.game.specialAttack && this.isSpecial) {
            
            this.isSpecialAttacking = true;
            this.specialArrowsRemaining = 3;
            this.game.specialAttack = false;
            this.isSpecial = false;
            this.specialAttackCount = 0;
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
    }
    draw(ctx) {
        super.draw(ctx);
    }
}
class Mage extends Player {
    constructor(game, x, y, emanage) {
        super(game, x, y, 2, emanage); 
        this.damage = 20;

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
        if (this.game.specialAttack && this.isSpecial) {
            this.playSound("laser");
            this.isSpecial = false;
            this.specialAttackCount = 0;
            let laser = new LaserBeam(
                this.game, 
                this.x + 20, 
                this.y + 10, 
                this.attackDirection, 
                this
            );
            this.game.addEntity(laser);
            this.game.specialAttack = false;
        }
    }

    update() {
        super.update();
    }
}