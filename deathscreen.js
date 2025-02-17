class DeathScreen {
    constructor(game, player) {
        Object.assign(this, {game, player});
        this.death = ASSET_MANAGER.getAsset("./sprites/background/death.png");
        this.quitButton = {
            x: 350,
            y: 650,
            width: 100,
            height: 18,
            text: "Quit"
        };
        this.resetButton = {
            x: 550,
            y: 650, 
            width: 100,
            height: 18,
            text: "Reset"
        };
    }

    handleClick() {
        if (this.game.click) {
            const { x, y } = this.game.click;
            if (
                x >= this.quitButton.x && x <= this.quitButton.x + this.quitButton.width &&
                y >= this.quitButton.y && y <= this.quitButton.y + this.quitButton.height
            ) {
                this.quitGame();
            }
            if (
                x >= this.resetButton.x && x <= this.resetButton.x + this.resetButton.width &&
                y >= this.resetButton.y && y <= this.resetButton.y + this.resetButton.height
            ) {
                this.resetGame();
            }
        }
    }

    quitGame() {
        console.log("Game Quit");
       
    }

    resetGame() {        
       this.player.reset();
        
        console.log("Game Reset");
    }

    update() {
        if (this.game.click) {
            this.handleClick();
            this.game.click = null;  
        }
    }

    draw(ctx) {
        ctx.font = "30px 'Press Start 2P', sans-serif"; 
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER - YOU DIED!", 500, 100);
        ctx.drawImage(this.death, 300, 200, 400, 400);

        ctx.fillStyle = "black";
        ctx.fillRect(this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height);

        ctx.strokeStyle = "#f54242";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height);
        ctx.fillStyle = "#f54242";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.quitButton.text, this.quitButton.x + this.quitButton.width / 2, this.quitButton.y + this.quitButton.height / 2 + 4);

        ctx.fillStyle = "black";
        ctx.fillRect(this.resetButton.x, this.resetButton.y, this.resetButton.width, this.resetButton.height);

        ctx.strokeStyle = "#f54242";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.resetButton.x, this.resetButton.y, this.resetButton.width, this.resetButton.height);
        ctx.fillStyle = "#f54242";
        ctx.fillText(this.resetButton.text, this.resetButton.x + this.resetButton.width / 2, this.resetButton.y + this.resetButton.height / 2 + 4);
    }
}