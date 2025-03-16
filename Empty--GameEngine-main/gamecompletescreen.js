class CompleteGame {
    constructor(game, player) {
        Object.assign(this, {game, player});
        this.death = ASSET_MANAGER.getAsset("./sprites/background/gamecomplete.png");
        this.quit = ASSET_MANAGER.getAsset("./sprites/background/quit.png");
        this.quitButton = {
            x: 400,
            y: 550,
            width: 200,
            height: 36,
            text: "Quit"
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
        }
    }

    quitGame() {
        this.player.quit();
       
    }

    update() {
        if (this.game.click) {
            this.handleClick();
            this.game.click = null;  
        }
    }

    draw(ctx) {
        ctx.font = "30px 'Press Start 2P', sans-serif"; 
        ctx.fillStyle = "gold";
        ctx.fillText("GAME SUCCESS!", 500, 100);
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

        ctx.drawImage(this.quit, this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height);
    }
}