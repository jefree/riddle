var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('stick', 'public/img/stick.png');
}

function create() {

  StickMapper.config(50, 50, 50, 40)

  var stick = new Stick(0, 0, 90);
  var other_stick = new Stick(1, 1);
  var another_stick = new Stick(2, 0, 270);
  var one_more_stick = new Stick(3, 1);

}

function update() {

}
