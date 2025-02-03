class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
    }

    get left() {
        return this.x;
    }

    get top() {
        return this.y;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    collide(oth) {
        return (
            this.right > oth.left &&
            this.left < oth.right &&
            this.top < oth.bottom &&
            this.bottom > oth.top
        );
    }

    overlap(oth) {
        const aHalf = { x: this.width / 2, y: this.height / 2 };
        const bHalf = { x: oth.width / 2, y: oth.height / 2 };

        const aCenter = { x: this.left + aHalf.x, y: this.top + aHalf.y };
        const bCenter = { x: oth.left + bHalf.x, y: oth.top + bHalf.y };

        const ox = aHalf.x + bHalf.x - Math.abs(aCenter.x - bCenter.x);
        const oy = aHalf.y + bHalf.y - Math.abs(aCenter.y - bCenter.y);

        return { x: ox, y: oy };
    }
}