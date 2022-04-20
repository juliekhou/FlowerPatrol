let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

/*
    Name: Julie Khou
    Project Title: Flower Patrol
    Date: 4/20/22
    How Long It Took to Complete the Project: 10 hours

    Points Breakdown:
    - 60 points: Redesign the game's artwork, UI, and sound to change its theme/aesthetic
    - 20 points: Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
    - 10 points: Display the time remaining (in seconds) on the screen
    - 5 points: Allow the player to control the Rocket after it's fired
    - 5 points: Add your own (copyright-free) background music to the Play scene

    = 100 points (hopefully)

*/

