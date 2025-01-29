class Warrior extends Player {
    constructor(game, x, y) {
        super(game, x, y, "Warrior");
        this.attackRange = 50; 
        this.attackDamage = 20; 
    }

    handleAttack() {
       // TODO: create attack splash entity
       if (this.game.attack && this.attackCooldown <= 0) {
        this.isAttacking = true;
        this.attackCooldown = 30;
    }

    if (this.isAttacking && this.attackDuration > 0) {
        this.attackDuration--;
    } else {
        this.isAttacking = false;
        this.attackDuration = 10;
    }
    }

    draw(ctx) {
        
    }
}