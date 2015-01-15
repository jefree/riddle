var WIDTH = 345;
var HEIGHT = 240;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update });
var sticks = []
var solved = false;

var initial_sticks = [
  {x: 0, y: 2, angle: 60 },
  {x: 0, y: 4, angle: 120 },

  {x: 1, y: 3, angle: 0 },
  
  {x: 2, y: 0, angle: 60 },  
  {x: 2, y: 2, angle: 120 },
  {x: 2, y: 4, angle: 60 },
  {x: 2, y: 6, angle: 120 },

  {x: 3, y: 5, angle: 0 },
  {x: 3, y: 1, angle: 0 },

  {x: 4, y: 0, angle: -60 },
  {x: 4, y: 2, angle: -120 },
  {x: 4, y: 4, angle: -60 },
  {x: 4, y: 6, angle: -120 },

  {x: 5, y: 3, angle: 0 },

  {x: 6, y: 2, angle: -60 },
  {x: 6, y: 4, angle: -120 },

]

var base_solution = [
  {x: 0, y: 2, angle: 60 },
  {x: 0, y: 4, angle: 120 },

  {x: 1, y: 3, angle: 0 },
  
  //{x: 2, y: 0, angle: 60 },  
  //{x: 2, y: 2, angle: 120 },
  //{x: 2, y: 4, angle: 60 },
  //{x: 2, y: 6, angle: 120 },

  {x: 3, y: 5, angle: 0 },
  {x: 3, y: 1, angle: 0 },

  //{x: 4, y: 0, angle: -60 },
  //{x: 4, y: 2, angle: -120 },
  //{x: 4, y: 4, angle: -60 },
  //{x: 4, y: 6, angle: -120 },

  {x: 5, y: 3, angle: 0 },

  {x: 6, y: 2, angle: -60 },
  {x: 6, y: 4, angle: -120 },
]

var solutions = [ 
  [
    {x: 2, y: 0, angle: 60 },  
    {x: 2, y: 2, angle: 120 },
    
    {x: 4, y: 4, angle: -60 },
    {x: 4, y: 6, angle: -120 },
  ],

  [
    {x: 2, y: 4, angle: 60 },
    {x: 2, y: 6, angle: 120 },

    {x: 4, y: 0, angle: -60 },
    {x: 4, y: 2, angle: -120 },
  ]
]

function onStickClick(stick) {
  console.log('click on stick :)');

  if (stick.alive) {
    stick.alive = false;
    stick.alpha = 0.3;
  }
  else {
    stick.alive = true;
    stick.alpha = 1.0
  }

  checkSolution();
}

function search_solution(sticks, solution) {
  for (var i=0; i < sticks.length; i++) {
    console.log('sticks.length', sticks.length);
    console.log('solution.length', solution.length);

    if (solution.length == 0){
      console.log('find base solution');
      break;
    }

    for (var j=0; j < solution.length; j++) {

      console.log('j', j);

      if(sticks[i].equalsTo(solution[j])) {

        console.log('found');

        sticks.splice(i, 1);
        solution.splice(j, 1);

        i -= 1;

        break;
      }
    }
  }

  console.log('base remaining', solution.length);
  console.log('remaining', sticks.length);

  return sticks.length == 0;
}

function checkSolution() {
  var temp_solution = base_solution.slice(0);
  var temp_sticks = sticks.filter(function(stick){ return stick.alive});

  if (temp_sticks.length < temp_solution.length) { return; } 

  if (search_solution(temp_sticks, temp_solution)) {
    onSolved();
  }
  else {
    if (temp_solution.length == 0) {

      console.log('try solutions');

      for (i in solutions) {
        if (search_solution(temp_sticks.slice(0), solutions[i].slice(0))) {
          onSolved();
          break;
        }
      }
    }  
  }
}

function onSolved() {
  var text = game.add.bitmapText(game.world.centerX - 135, game.world.centerY - 30, 'font', '', 11);
  text.setText('Congratulations\n\nclick here to receive\n\na cookie');
  
  text.align = 'center'

  text.inputEnabled = true;
  text.events.onInputUp.add(onClickVictory);

  //--- disable input for all sticks

  sticks.forEach(function(stick) {
    stick.inputEnabled = false;
  });

  solved = true;
  console.log('Victory');
}

function onClickVictory() {
  alert('You Win');
}

function preload() {
  game.load.image('stick', 'public/img/stick.png');
  game.load.bitmapFont('font','public/fonts/carrier_command.png','public/fonts/carrier_command.xml');
}

function create() {
  StickMapper.config(40, 25, 55, 40);
  
  game.stage.backgroundColor = '#28a0cf';

  //--- 
  //--- set scale
  //---
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.setMinMax(WIDTH*0.6, HEIGHT*0.6, WIDTH, HEIGHT)
  

  //--- 
  //--- create sticks
  //---
  initial_sticks.forEach(function(stick) {
    sticks.push(new Stick(stick.x, stick.y, stick.angle));
  });
}

function update() {
}
