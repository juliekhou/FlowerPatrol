class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/fly.wav');
        this.load.audio('sfx_explosion', './assets/bite.wav'); // from freesound.org - Clearwavsound
        this.load.audio('sfx_rocket', './assets/fly.wav'); // from mixkit.co/free-sound-effects - Game ball tap

        // background
        this.load.image('bg', './assets/grassy.jpg');

    }
    
    create() {

      this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#50E28A',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'FLOWER PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#50E28A';
        menuConfig.color = '#EDE7B1';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
  }