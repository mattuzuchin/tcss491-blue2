class TitleScreen {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.startGame = false;
        this.showCredits = false;
        this.gameEngine.camera = this;
        this.characters = [
            { name: "Marksman", sprite: ASSET_MANAGER.getAsset("./sprites/marksmentemp.png") },
            { name: "Warrior", sprite: ASSET_MANAGER.getAsset("./sprites/warriortemp.png") }
        ];
        
        this.selectedCharacter = null;
        this.titleY = 100;
        this.charactersStartY = 500;
        this.characterSpacing = 200;
        this.characterBoxSize = 150;
        this.creditsButton = {
            x: this.gameEngine.ctx.canvas.width - 120,
            y: this.gameEngine.ctx.canvas.height - 60,
            width: 100,
            height: 40
        };
    }

    handleClick(click) {

        if (!this.showCredits &&
            click.x >= this.creditsButton.x && 
            click.x <= this.creditsButton.x + this.creditsButton.width &&
            click.y >= this.creditsButton.y && 
            click.y <= this.creditsButton.y + this.creditsButton.height) {
            this.showCredits = true;
            return;
        }
        if (this.showCredits &&
            click.x >= 20 && 
            click.x <= 120 &&
            click.y >= 20 && 
            click.y <= 60) {
            this.showCredits = false;
            return;
        }
        if (!this.showCredits) {
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
    }

    startNewGame() {
        this.gameEngine.entities = [];
        new entitiesmanager(this.gameEngine, this.selectedCharacter, level1Scene1);
    }

    update() {
        if (this.gameEngine.click && !this.startGame) {
            this.handleClick(this.gameEngine.click);
            this.gameEngine.click = null;  
        }
    }

    drawCreditsScreen(ctx) {

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 100, 40);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Back", 70, 47);

        ctx.font = "36px Arial";
        ctx.fillText("Credits", ctx.canvas.width / 2, 100);
        
        ctx.font = "24px Arial";
        ctx.fillText("Game Development Team", ctx.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, and Minh", ctx.canvas.width / 2, 220);
        
        ctx.font = "24px Arial";
        ctx.fillText("Artwork", ctx.canvas.width / 2, 280);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, Minh", ctx.canvas.width / 2, 320);
        
        ctx.font = "24px Arial";
        ctx.fillText("Music", ctx.canvas.width / 2, 380);
        ctx.font = "20px Arial";
        ctx.fillText("tbd", ctx.canvas.width / 2, 420);
    }

    draw(ctx) {
        if (!this.startGame) {
            if (this.showCredits) {
                this.drawCreditsScreen(ctx);
            } else {
    
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "48px Arial";
                ctx.textAlign = "center";
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), ctx.canvas.width/5, this.titleY - 100, 600, 400);
                ctx.fillText("Select Your Character", ctx.canvas.width / 2, this.titleY + 350);

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
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineWidth = 2;
                ctx.strokeRect(this.creditsButton.x, this.creditsButton.y, 
                             this.creditsButton.width, this.creditsButton.height);
                ctx.font = "24px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#FFFFFF";
                ctx.fillText("Credits", 
                           this.creditsButton.x + this.creditsButton.width/2, 
                           this.creditsButton.y + this.creditsButton.height/2 + 8);
            }
            
            ctx.imageSmoothingEnabled = false;
        }
    }
}