class Marksman extends Player {
    constructor(game, x, y) {
        super(game, x, y, 0);
        this.projectileSpeed = 10; 
        // TODO: used for storing projectiles, they will disappear after colliding with any eneties (except themselves)
        this.projectiles = []; 
    }

    handleAttack() {
    }
}

// Projectile entities
class Projectile {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = speed;
        this.direction = direction;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {
        this.BB.x = this.x;
        this.BB.y = this.y;
    }
    handleMovement() {
        if (this.direction === "right") {
            this.x += this.speed;
        } else if (this.direction === "left") {
            this.x -= this.speed;
        } else if (this.direction === "up") {
            this.y -= this.speed;
        }
    }
    draw(ctx) {

    }

    isOffScreen(canvas) {
        
    }
}