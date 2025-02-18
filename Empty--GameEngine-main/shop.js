class Shop {
    constructor(gameEngine, player) {
        Object.assign(this, { gameEngine, player });
        this.items = [
            { name: "Power Boost", cost: 50 },
            { name: "Extra Life", cost: 1 },
            { name: "Double Coins", cost: 100 }
        ];
        this.shopButton = {
            x: 850,
            y: 90,
            width: 100,
            height: 18,
            text: "Shop"
        };
    }
    purchaseItem(item) {
        let bought = false;
        if (this.player.coinCount >= item.cost) {
            this.player.coinCount -= item.cost;
            bought = true;
            console.log("item has been purchased");
        } else {
            console.log("no sufficent coin count");
        }
        return bought;
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = "gray";
        ctx.fillRect(240, 50, 320, 250);

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Shop", 400, 80);

        this.items.forEach((item, index) => {
            let itemX = 250;
            let itemY = 100 + index * 60;
            let itemWidth = 300;
            let itemHeight = 50;

            ctx.fillStyle = "black";
            ctx.fillRect(itemX, itemY, itemWidth, itemHeight);
            ctx.strokeStyle = "white";
            ctx.strokeRect(itemX, itemY, itemWidth, itemHeight);
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(`${item.name} - ${item.cost} Coins`, itemX + itemWidth / 2, itemY + 30);
        });
    }
}
