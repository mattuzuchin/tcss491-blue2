class Projectile {
    constructor(game, x, y, direction, player) {
        Object.assign(this, { game, x, y, direction, player });
        this.width = 20;
        this.height = 10;
        this.speed = 5;
        this.damage = 1400;
        this.removeFromWorld = false;
        if(this.player === null) {
            this.image = ASSET_MANAGER.getAsset("./sprites/projectiles/bullet.png");
        } else {
            this.image = ASSET_MANAGER.getAsset("./sprites/projectiles/arrow.png"); 
        }
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.direction === "right") {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

        this.BB.x = this.x;

        for (let entity of this.game.entities) {
    
            if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && 
                this.BB.collide(entity.BB) && this.player) {
                
         
                if (!entity.isDead) {
                    if(this.player.power && this.player.powerUpDuration > 0) {
                        this.player.powerUpDuration -= 1;
                        entity.takeDamage(this.damage * 3);
                    } else {
                        this.player.power = false;
                        this.player.powerUpDuration = 5;
                        entity.takeDamage(this.damage);
                    }
          
                    this.player.activateMessage("-1", entity.x, entity.y);
    
                    if(entity.isDead) {
                        if(entity instanceof PirateBoss) {
                            this.player.bosslevel1Defeat++;
                        } else {
                            this.player.totalKills++;
                        }
                    }
                }
                this.removeFromWorld = true;
            }
            
    
            if ((entity instanceof Platform) && this.BB.collide(entity.boundingBox)) {
                this.removeFromWorld = true; // Ensure arrow doesn't go through chest or platform
            }
            
    
            if (entity instanceof Chest && this.BB.collide(entity.boundingBox) && this.player) {
                if (!entity.stayOpen) { 
                    this.removeFromWorld = true;
                }
                this.player.totalChests += 1;
                this.player.power = entity.openChest();
                entity.keepOpen();
            }
            
    
            if((entity instanceof Player) && this.BB.collide(entity.BB) && this.player === null) {
                entity.takeDamage(0.5);
                this.removeFromWorld = true;
            }
        }
        if (this.x < 0 || this.x > this.game.ctx.canvas.width || this.y < 0 || this.y > this.game.ctx.canvas.height) {
            this.removeFromWorld = true;
        }
    }
    
    draw(ctx) {
        if (this.image) {
            ctx.save();
    
            if (this.direction === "left") {
                ctx.translate(this.x + this.width, 0);
                ctx.scale(-1, 1); 
                ctx.drawImage(this.image, 0, this.y + 10, this.width, this.height);
            } else {
                ctx.drawImage(this.image, this.x, this.y + 10, this.width, this.height);
            }
    
            ctx.restore();
        }
    }
}

class MagicBall extends Projectile {
    constructor(game, x, y, direction, player) {
        super(game, x, y, direction, player);
        this.speed = 8;
        this.damage = 200;
        this.width = 20;
        this.height = 20;
        this.image = ASSET_MANAGER.getAsset("./sprites/projectiles/Fireball.png"); 
    }
}

class LaserBeam {
    constructor(game, x, y, direction, player) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.player = player;
        this.damage = 1000;
        this.duration = 1;
        this.width = 500;
        this.height = 10;
        if (this.direction === "left") {
            this.x -= 500;
        } 
        this.BB = new BoundingBox(this.x,this.y + this.height, this.width, this.height);
       
        this.image = ASSET_MANAGER.getAsset("./sprites/projectiles/Firebeam.png"); 
    }

    update() {
        if (--this.duration <= 0) this.removeFromWorld = true;
        for (let entity of this.game.entities) {
            if ((entity instanceof GhostPirate || entity instanceof Pirate || entity instanceof PirateBoss
                || entity instanceof Native || entity instanceof Cactus || entity instanceof Outlaw) && this.BB.collide(entity.BB) && this.player) {
                console.log("laser beam touch something");
                if(this.player.power && this.player.powerUpDuration > 0) {
                    this.player.powerUpDuration -= 1;
                    entity.takeDamage(this.damage * 3);
                } else {
                    this.player.power = false;
                    this.player.powerUpDuration = 5;
                    entity.takeDamage(this.damage);
                }
                this.player.activateMessage("-1", entity.x, entity.y);
                if(entity.isDead) {
                    if(entity instanceof PirateBoss) {
                        this.player.bosslevel1Defeat++;
                    } else {
                        this.player.totalKills++;
                    }
                }
                this.removeFromWorld = true;
            }
        }
    }

    draw(ctx) {
        if (this.image) {
            ctx.save();
    
            if (this.direction === "left") {
                ctx.translate(this.x + this.width, 0);
                ctx.scale(-1, 1); 
                ctx.drawImage(this.image, 0, this.y + 10, this.width, this.height);
            } else {
                ctx.drawImage(this.image, this.x, this.y + 10, this.width, this.height);
            }
    
            ctx.restore();
        }
    }
}