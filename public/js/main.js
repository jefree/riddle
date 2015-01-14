var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update });

var sticks = []

var initial_sticks = [
  {x: 0, y: 0, angle: 90},
  {x: 1, y: 1, angle: 0},
  {x: 2, y: 0, angle: -90},
  {x: 3, y: 1, angle: 0},
]

var solution = [
  {x: 0, y: 0, angle: 90},
  {x: 2, y: 0, angle: -90},
]

function onStickClick(stick) {
  console.log('click on stick :)');
  stick.alive = stick.visible = false;
}

function preload() {
  game.load.image('stick', 'public/img/stick.png');
}

function create() {
  StickMapper.config(50, 50, 50, 40)

  initial_sticks.forEach(function(stick) {
    sticks.push(new Stick(stick.x, stick.y, stick.angle));
  });
}

function update() {
  var temp_solution = solution.slice(0);
  var temp_sticks = sticks.slice(0).filter(function(stick){ return stick.alive});

  var founds = 0;

  for (i in temp_sticks) {

    if (temp_solution.length == 0) {
      break;
    }

    for (j in temp_solution) {

      if (temp_sticks[i].equalsTo(temp_solution[j])) {
        temp_solution.splice(j, 1);
        founds += 1;
        break;
      }
    }
  }

  if (temp_sticks.length > 0 && temp_sticks.length == founds) {
    alert('Victory');
    location.reload();
  }
}
