var StickMapper = {
  dx: 0,
  dy: 0,
  ix: 0,
  iy: 0,

  mapX: function(x) {
    return x * this.dx + this.ix;
  },

  mapY: function(y) {
    return y * this.dy + this.iy;
  },

  config: function(dx, dy, ix, iy) {
    this.dx = dx;
    this.dy = dy;
    this.ix = ix;
    this.iy = iy;
  }
}

var Stick = function(posX, posY, angle) {
  Phaser.Sprite.call(this, game, 0, 0 , 'stick');

  var self = this;
  var x = posX, 
      y = posY;

  self.angle = angle;

  self.anchor.setTo(0.5, 0.5);
  game.add.existing(self);

  // METHODS

  self.posX = function(posX) {
    if (posX === null) return x;

    x = posX;
    self.position.x = StickMapper.mapX(posX);
  }

  self.posY = function(posY) {
    if (posY === null) return y;

    y = posY;
    self.position.y= StickMapper.mapY(posY)
  }

  // set initial position on map
  self.posX(posX);
  self.posY(posY);
}

Stick.prototype = Object.create(Phaser.Sprite.prototype);
Stick.prototype.constructor = Stick;