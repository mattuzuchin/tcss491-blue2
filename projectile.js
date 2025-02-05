class Projectile {
    constructor(game, x, y, direction, player) {
        Object.assign(this, { game, x, y, direction, player });
        this.player = player;
        this.width = 20;
        this.height = 10;
        this.speed = 5;
        this.damage = 1400;
        this.removeFromWorld = false;
        if(this.player === null) {
            this.image = ASSET_MANAGER.getAsset("./sprites/bullet.png");
        } else {
            this.image = ASSET_MANAGER.getAsset("./sprites/heart.png"); // Change to arrow in future
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
            if ((entity instanceof GhostPirate || entity instanceof Pirate) && this.BB.collide(entity.BB) && this.player) {
                if(this.player.power === true && this.player.powerUpDuration > 0) {
                    this.powerUpDuration -= 1;
                    entity.takeDamage(this.damage * 3);
                } else {
                    this.player.power = false;
                    this.player.powerUpDuration = 5;
                    entity.takeDamage(this.damage);
                }
                if (entity.isDead) {
                    this.player.totalKills++;
                    entity.removeFromWorld = true;
                }
                this.removeFromWorld = true;
            }
            if ((entity instanceof Platform || entity instanceof Chest) && this.BB.collide(entity.boundingBox) && this.player) {
                this.removeFromWorld = true; // Ensure arrow doesn't go through chest or platform
            }
            if (entity instanceof Chest && this.BB.collide(entity.boundingBox) && this.player) {
                this.player.totalChests += 1;
                this.player.power = entity.openChest();
                entity.keepOpen();
            }

            if((entity instanceof Player) && this.BB.collide(entity.BB) && this.player === null) {
                entity.takeDamage(1);
                if (entity.isDead) {
                    entity.removeFromWorld = true;
                }
                this.removeFromWorld = true;
            }
        }
    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y + 10, this.width, this.height);
        }
    }
}