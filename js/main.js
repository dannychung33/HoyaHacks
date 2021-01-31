// another change
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
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
    this.load.image('upside_down_spike', 'assets/rotatedSpike.png')
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
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200,900, 'player');
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
    
    raccoon1 = this.add.image(400, 950, 'raccoon');
    spike0 = this.add.image(48, 0, 'upside_down_spike');
    spike1  = this.add.image(300, 0,'upside_down_spike');
    spike2 = this.add.image(550, 0, 'upside_down_spike')
    spike3 = this.add.image(850, 0, 'spike')
    spike4 = this.add.image(1420, 0, 'spike')
    spike5 = this.add.image(1900, 0, 'spike')
    spike6 = this.add.image(2250, 0, 'spike')
    spike7 = this.add.image(2470, 0, 'spike')
    spike8 = this.add.image(2960, 0, 'spike')
    spike9 = this.add.image(3150, 0, 'spike')
    spike10 = this.add.image(3250, 0, 'spike')
    spike11 = this.add.image(4550, 0, 'spike')
    spike12 = this.add.image(5340, 0, 'spike')
    spike13 = this.add.image(4800, 0, 'spike')
    spike14 = this.add.image(5005, 0, 'spike')

    this.physics.add.collider(groundLayer, spike0);
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
    this.physics.add.collider(groundLayer, spike13);
    this.physics.add.collider(groundLayer, spike14);

    this.spikes = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    this.spikes.add(spike0)
    this.spikes.add(spike1);
    this.spikes.add(spike2);
    this.spikes.add(spike3);
    this.spikes.add(spike4);
    this.spikes.add(spike5);
    this.spikes.add(spike6);
    this.spikes.add(spike7);
    this.spikes.add(spike8);
    this.spikes.add(spike9);
    this.spikes.add(spike10);
    this.spikes.add(spike11);
    this.spikes.add(spike12);
    this.spikes.add(spike13);
    this.spikes.add(spike14);

    this.raccoons = this.physics.add.group({
        allowGravity: false,
    })
    this.raccoons.add(raccoon1)
    this.physics.add.collider(groundLayer,raccoon1);

    // overlap player with spikes
    this.physics.add.overlap(player, this.spikes, playerHit, null, this);
    
}



// this function will be called when the player touches a coin
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    text.setText(score); // set the text to show the current score
    return false;
}

var startGame = true;

function update(time, delta) {
    if(startGame){
    if(score == 20){
        location.reload();
        return;
    }

    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-400);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(400);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
   
     // jump 
     if (cursors.up.isDown && player.body.onFloor())
     {
         player.body.setVelocityY(-600);        
     }
     if (cursors.down.isDown){
         player.body.setVelocityY(600);
     }
  }}

function playerHit(player, spike) {
    console.log('player hurt')
    
    player.body.setVelocity(0, 0);
    player.setX(200);
    player.setY(900);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
    location.reload()
    return;
}