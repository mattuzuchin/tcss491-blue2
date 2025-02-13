class TitleScreen {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.startGame = false;
        this.gameEngine.camera = this;
        this.characters = [
            { name: "Marksman", sprite: ASSET_MANAGER.getAsset("./sprites/marksmentemp.png") },
            { name: "Warrior", sprite: ASSET_MANAGER.getAsset("./sprites/warriortemp.png") }
        ];
        
        this.selectedCharacter = null;
        this.titleY = 100;
        this.charactersStartY = 200;
        this.characterSpacing = 200;
        this.characterBoxSize = 150;

    }

    handleClick(click) {
        this.characters.forEach((char, index) => {
            const boxX = (this.gameEngine.ctx.canvas.width / 2) - (this.characterSpacing * (this.characters.length - 1) / 2) + (index * this.characterSpacing);
            const boxY = this.charactersStartY;

            if (click.x >= boxX - this.characterBoxSize/2 && 
                click.x <= boxX + this.characterBoxSize/2 &&
                click.y >= boxY && 
                click.y <= boxY + this.characterBoxSize) {
                
                this.selectedCharacter = char.name.toLowerCase();
                this.startGame = true;
                this.startNewGame();
            }
        });
    }


    startNewGame() {
        this.gameEngine.entities = [];
        new entitiesmanager(this.gameEngine, this.selectedCharacter);
    }

    update() {
        if (this.gameEngine.click && !this.startGame) {
            this.handleClick(this.gameEngine.click);
            this.gameEngine.click = null;  
        }
    }

    draw(ctx) {
        if (!this.startGame) {
            
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "48px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Select Your Character", ctx.canvas.width / 2, this.titleY);

            this.characters.forEach((char, index) => {
                const boxX = ctx.canvas.width / 2 - (this.characterSpacing * (this.characters.length - 1) / 2) + (index * this.characterSpacing);
                const boxY = this.charactersStartY;

              
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineWidth = 2;
                ctx.strokeRect(boxX - this.characterBoxSize/2, boxY, this.characterBoxSize, this.characterBoxSize);

                ctx.drawImage(char.sprite, 
                    boxX - this.characterBoxSize/4, 
                    boxY + this.characterBoxSize/4, 
                    this.characterBoxSize/2, 
                    this.characterBoxSize/2);

                ctx.font = "24px Arial";
                ctx.fillStyle = "#FFFFFF";
                ctx.fillText(char.name, boxX, boxY + this.characterBoxSize + 30);
            });
        }
    }
}