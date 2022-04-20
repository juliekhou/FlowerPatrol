// Spaceship prefab
class SmallerSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        // this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    }

    update() {
        // randomize spaceship movement not working ):

        // var randNum = Math.floor(Math.random() * 2);
        // if (randNum == 0){
        //     // move spaceship left
        //     this.x -= this.moveSpeed;
        //     // wrap around from left edge to right edge
        //     if(this.x <= 0 - this.width) {
        //         this.reset();
        //     }
        // } else {
        //     // move spaceship right
        //     this.x += this.moveSpeed;
        //     // wrap around from right edge to left edge
        //     if(this.x >= 0 + this.width) {
        //         this.reset();
        //     }
        // }
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}