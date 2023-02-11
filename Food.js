class Food {

    constructor() {
        this.radius = 50;
        
        // Create a bibite to draw
        this.sprite = PIXI.Sprite.from('/Sprites/Apple.png');
        
        // Set the pivot point to the center of the bibite
        this.sprite.anchor.set(0.5);
        
        // Add the food to the stage
        app.stage.addChild(this.sprite);
        
        // Set the initial size of the bibite
        this.sprite.width = this.radius * 2;
        this.sprite.height = this.radius * 2 * 244 / 208; // Maintain the aspect ratio of the image
        
        // Set the initial position of the bibite
        this.sprite.x = Math.random() * app.renderer.width;
        this.sprite.y = Math.random() * app.renderer.height;
    }

    GetRadius() {
        return this.radius;
    }

    GetX() {
        return this.sprite.x;
    }

    GetY() {
        return this.sprite.y;
    }

    Draw(graphics) {
        // Set the border color to white
        graphics.lineStyle(2, 0x00FF00);
        graphics.beginFill(0xFF0000);
        graphics.drawCircle(this.sprite.x, this.sprite.y, this.radius);
        graphics.endFill();
    }
}