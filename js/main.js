// another change
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
var score = 0;

function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/map-4.json');
    // tiles in spritesheet 
    this.load.spritesheet('cityblocks', 'assets/city-tiles.png', {frameWidth: 70, frameHeight: 70});
    // simple coin image
    this.load.image('coin', 'assets/bottle-collect.png');
    // load spike png
    this.load.image('spike', 'assets/spike.png');
    this.load.image('background', 'assets/city-background-2.png');
    this.load.image('raccoon', 'assets/raccoon.png');
    // player animations
    this.load.atlas('player', 'assets/player-1.png', 'assets/player.json');
}

function create() {
    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    backgroundImage.setScale(1, 1);
  
    //const backgroundImage2 = this.add.image(2000, 110, 'background').setOrigin(0,0);
    //backgroundImage2.setScale(1.9, 0.85);
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('cityblocks');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width + 500;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200, 900, 'player');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);

    coinLayer.setTileIndexCallback(17, collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(player, coinLayer);

    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });


    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);
    this.cameras.main.zoom = 1;

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    // this text will show the score
    text = this.add.text(20, 570, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    text.setScrollFactor(0);
    
    raccoon1 = this.add.image(350, 800, 'raccoon');
    raccoon2 = this.add.image(450, 1000, 'raccoon');
    raccoon3 = this.add.image(550, 1000, 'raccoon');
    raccoon4 = this.add.image(650, 1000, 'raccoon');
    raccoon5 = this.add.image(750, 1000, 'raccoon');
    raccoon6 = this.add.image(850, 1000, 'raccoon');
    raccoonAttack();
    
    spike1  = this.add.image(300, 460,'spike');
    spike2 = this.add.image(600, 460, 'spike')
    spike3 = this.add.image(667, 460, 'spike')
    spike4 = this.add.image(1200, 460, 'spike')
    spike5 = this.add.image(600, 460, 'spike')
    spike6 = this.add.image(600, 460, 'spike')
    spike7 = this.add.image(600, 460, 'spike')
    spike8 = this.add.image(600, 460, 'spike')
    spike9 = this.add.image(600, 460, 'spike')
    spike10 = this.add.image(600, 460, 'spike')
    spike11 = this.add.image(600, 460, 'spike')
    spike12 = this.add.image(600, 460, 'spike')

    this.physics.add.collider(groundLayer, spike1);
    this.physics.add.collider(groundLayer, spike2);
    this.physics.add.collider(groundLayer, spike3);
    this.physics.add.collider(groundLayer, spike4);
    this.physics.add.collider(groundLayer, spike5);
    this.physics.add.collider(groundLayer, spike6);
    this.physics.add.collider(groundLayer, spike7);
    this.physics.add.collider(groundLayer, spike8);
    this.physics.add.collider(groundLayer, spike9);
    this.physics.add.collider(groundLayer, spike10);
    this.physics.add.collider(groundLayer, spike11);
    this.physics.add.collider(groundLayer, spike12);

    this.spikes = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    this.spikes.add(spike1);
    this.spikes.add(spike2);
    this.spikes.add(spike3);
    this.spikes.add(spike4);
    this.spikes.add(spike5);
    this.spikes.add(spike6);
    this.spikes.add(spike10);
    this.spikes.add(spike11);
    this.spikes.add(spike12)

    this.raccoons = this.physics.add.group({
        allowGravity: false,
    })

    this.physics.add.collider(groundLayer,raccoon1);

    this.physics.add.overlap(player, this.raccoons, playerHit, null, this);    

    // overlap player with spikes
    this.physics.add.overlap(player, this.spikes, playerHit, null, this);
    spike1.body.setSize(spike1.width, spike1.height - 20).setOffset(0,20);
    spike2.body.setSize(spike2.width, spike2.height - 20).setOffset(0,20);
    /*
    const spike = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0,0);
    spike.body.setSize(spike.width, spike.height - 20).setOffset(0,20);
    console.log(spike)
    // Key line
    this.physics.add.collider(this.player, this.spikes, this.playerHit, null, this);
    //console.log(spikeObject.height, spikeObject.width)
  
    */
}



// this function will be called when the player touches a coin
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    text.setText(score); // set the text to show the current score
    return false;
}
var isGameOver = false;
var startGame = true;
function update(time, delta) {
    if(startGame){
    if(isGameOver){
        return;
    }
    var random = Math.floor((Math.random() * 100));

    
    
    
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-600);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(600);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);        
    }
}
  }
  
function raccoonAttack(){
    raccoon1.y -= 1;
}


function playerHit(player, spike) {
    console.log('player hurt')
    
    player.body.setVelocity(0, 0);
    player.setX(50);
    player.setY(300);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
    return;
}