class Player {
    constructor(game, x, y, characterNumber, emanage) {
        Object.assign(this, { game, x, y });
        this.startingPointX = x;
        this.entitiesMan = emanage;
        this.startingPointY = y;
        const characterTypes = ["Marksman", "Warrior"];
        this.characterType = characterTypes[characterNumber] || "Marksman";
        this.isDead = false;
        this.width = 40;
        this.height = 40;
        this.speed = 3;
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
        this.assets = {
            Marksman: ASSET_MANAGER.getAsset("./sprites/player entities/marksmenwalkLeft.png"),
            MarksmanIdle: ASSET_MANAGER.getAsset("./sprites/player entities/marksmentemp.png"),
            WarriorIdle: ASSET_MANAGER.getAsset("./sprites/player entities/warriortemp.png"),
            WarriorAttack: ASSET_MANAGER.getAsset("./sprites/player entities/warriorattack.png"),
            Warrior: ASSET_MANAGER.getAsset("./sprites/player entities/warriorwalk1.png"),
            MarksmanAttack: ASSET_MANAGER.getAsset("./sprites/player entities/marksmenattack.png")
        };

        this.sprite = this.assets[this.characterType];

        this.animators = {
            Marksman: {
                idle: new Animator(this.assets.MarksmanIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Marksman, 0, 0, this.width, this.height, 8, 0.1),
                attacking: new Animator(this.assets.MarksmanAttack, 0, 5, 37, 45, 20, 0.02),
            },
            Warrior: {
                idle: new Animator(this.assets.WarriorIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Warrior, 0, 0, 50, this.height, 8, 0.1),
                attacking: new Animator(this.assets.WarriorAttack, 0, 0, 45, this.height, 6, 0.1),
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

    die() {
        console.log("Player has been defeated!");
        this.isDead = true;
        this.totalKills = 0;
        this.removeFromWorld = true;
        this.game.entities = [];
        this.entitiesMan.toggleDeath();
        this.game.addEntity(new DeathScreen(this.game, this));
    }

    update() {
        if (this.isDead) return;
        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.handleAttack();
        this.handleDash();
        this.updateBoundingBox();
        this.checkComplete();

        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.dashCooldown > 0) this.dashCooldown--;
    }

    handleMovement() {

        if (this.game.left) {
            this.x -= this.speed;
            this.attackDirection = "left";
            if(this.attackDuration <=0) {
                this.currentAnimator = this.animators[this.characterType].walking;
            }
            
            this.facingLeft = true;
        }
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            if(this.attackDuration <=0) {
                this.currentAnimator = this.animators[this.characterType].walking;
            }
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
            if(this.attackDuration <=0) {
                this.currentAnimator = this.animators[this.characterType].idle;
            }
        }
        if (this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
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
                this.artifactCounts += 1;
                entity.removeFromWorld = true;
                console.log(this.artifactCounts);
            }
            if (entity instanceof Coins && this.BB.collide(entity.BB)) {
                this.coinCount += 1;
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
            if (this.totalKills >= this.levelO.objectives[0].pirates &&
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

    handleAttack() {
  
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
        if (this.BB.y >= 728) {
            this.x = this.startingPointX;
            this.y = this.startingPointY;
            this.takeDamage(1);
            this.BB.x = this.x;
            this.BB.y = this.y;
        }
        this.BB.x = this.x;
        this.BB.y = this.y;
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;

        if (this.facingLeft) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        this.currentAnimator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.facingLeft) {
            ctx.restore();
        }
    }
}

class Warrior extends Player {
    constructor(game, x, y, emanage) {
        super(game, x, y, 1, emanage); // 1 "Warrior"
        this.damage = 100; 
        this.downwardStrikeCooldown = 120; 
        this.downwardStrikeDuration = 30; 
        this.isDownwardStriking = false; 
    }

    update() {
        this.handleDownwardStrike();
        super.update(); 
    }

    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackDuration = 0.05;
            this.attackCooldown = 80;
        }

        if (this.isAttacking && this.attackDuration > 0) {
            this.attackDuration--;
            this.currentAnimator = this.animators[this.characterType].attacking;

            let attackBB;
            if (this.attackDirection === "right") {
                attackBB = new BoundingBox(this.x + this.width, this.y + 10, 30, 30); 
            } else if (this.attackDirection === "left") {
                attackBB = new BoundingBox(this.x - 30, this.y + 10, 30, 30);
            } else if (this.attackDirection === "up") {
                attackBB = new BoundingBox(this.x + 10, this.y - 30, 30, 30);
            }
            for (let entity of this.game.entities) {
                if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss) && attackBB.collide(entity.BB)) {
                    if(this.power === true && this.powerUpDuration > 0) {
                        this.powerUpDuration -= 1;
                        entity.takeDamage(this.damage * 3);
                    } else {
                        this.power = false;
                        this.powerUpDuration = 5;
                        entity.takeDamage(this.damage);
                    }
                    if(entity.isDead) {
                        if(entity instanceof PirateBoss) {
                            this.bosslevel1Defeat++;
                            entity.removeFromWorld = true;
                        } else {
                            this.totalKills++;
                            entity.removeFromWorld = true;
                        }
                    }
                }
                if (entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                    this.totalChests += 1;
                    this.power =  entity.openChest();
                    entity.keepOpen();
                }
            }
        } else {
            this.isAttacking = false;
            this.attackDuration = 60;
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
            this.downwardStrikeDuration--;

            const downwardStrikeBB = new BoundingBox(
                this.x - 20, 
                this.y + this.height, 
                this.width + 40, 
                30 
            );

            for (let entity of this.game.entities) {
                if ((entity instanceof GhostPirate || entity instanceof Pirate) && downwardStrikeBB.collide(entity.BB)) {
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
        super(game, x, y, 0, emanage);  // 0 = marksman
        this.damage = 30; 
        this.attackDuration = 10;
    }

    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.attackDuration = 15;
            let projectile = new Projectile(this.game, this.x, this.y, this.attackDirection, this);
            this.game.addEntity(projectile);
            console.log(this.totalKills);
            this.attackCooldown = 100;
            this.currentAnimator = this.animators[this.characterType].attacking;
        } else {
            this.attackDuration--;
        }
    }
}