class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/ladybug.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship', './assets/flowaface.png');

        this.load.image('starfield', './assets/grassy.jpg');
        // GRASSY IMAGE- COPYRIGHT: ANNA CHERNOVA | DREAMSTIME.COM

        this.load.image('fastShip', './assets/smallflowaresized.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/flowasheet.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('smallExplosion', './assets/fastsheetresized.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        //background music: lofi from freesounds.org
        this.load.audio('music', './assets/lofi.wav');
    }
    
    create() {

        //music
        this.music = this.sound.add("music");
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xF694C1).setOrigin(0, 0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xA9DEF9).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xA9DEF9).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xA9DEF9).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xA9DEF9).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // add spaceships (x3) 
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // add smaller spaceships (x3)
        this.smallship = new SmallerSpaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*3, 'fastShip', 0, 100).setOrigin(0, 0);
        // this.smallship02 = new SmallerSpaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 40).setOrigin(0,0);
        // this.smallship03 = new SmallerSpaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'smallexplode',
            frames: this.anims.generateFrameNumbers('smallExplosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9DEF9',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        // display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9DEF9',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        this.clockRight = this.add.text(game.config.width - (100 + borderUISize + borderPadding), borderUISize + borderPadding*2, 0, clockConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        this.timeR = game.settings.gameTimer;
        this.clock = this.time.addEvent({delay: 1000, callback: () => {this.timeR -= 1000;}, callbackScope: this, loop: true});
        // scoreConfig.fixedWidth = 0;
        // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        //     this.gameOver = true;
        // }, null, this);
        scoreConfig.fixedWidth = 0;
    
    }

    update() {
        
        if(!(this.timeR < 0)){
            this.clockRight.setText(this.timeR/1000);
        }

        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9DEF9',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        if(this.timeR == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', overConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', overConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        

        //this.clockRight.setText(this.clock.getProgress().toString().substr(2, 2));

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver){
            this.p1Rocket.update();     //update rocket sprite
            this.ship01.update();       //update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallship.update();       //update small spaceships (x3)
            // this.smallship02.update();
            // this.smallship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            //console.log('kaboom ship 03');
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            // console.log('kaboom ship 02');
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            // console.log('kaboom ship 01');
        }
        if(this.checkCollision(this.p1Rocket, this.smallship)) {
            this.p1Rocket.reset();
            this.smallshipExplode(this.smallship);
            //console.log('kaboom ship 03');
        }
        // if (this.checkCollision(this.p1Rocket, this.smallship02)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.smallship02);
        //     // console.log('kaboom ship 02');
        // }
        // if (this.checkCollision(this.p1Rocket, this.smallship01)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.smallship01);
        //     // console.log('kaboom ship 01');
        // }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //this.sfxRocket = scene.sound.add('sfx_rocket');     //add rocket sfx
        this.sound.play('sfx_explosion');

    }

    smallshipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'smallExplosion').setOrigin(0, 0);
        boom.anims.play('smallexplode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //this.sfxRocket = scene.sound.add('sfx_rocket');     //add rocket sfx
        this.sound.play('sfx_explosion');

    }
    


  }