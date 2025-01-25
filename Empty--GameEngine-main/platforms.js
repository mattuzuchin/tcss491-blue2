class Platform {
    constructor(x, y, width, height) {
        this.boundingBox = new BoundingBox(x, y, width, height);
        Object.assign(this, { x, y, width, height });
    }

    draw(ctx) {
        ctx.fillStyle = "#654321"; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {}
}
