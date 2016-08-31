
console.log("hello world");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-40;
var dx = 0;
var dy = -5;
var xBrick = 0;    //obstacle
var yBrick = canvas.height-100;   //obstacle
var dxBrick = 2;   //obstacle animation
var dyBrick = 0;  //obstacle animation
var spacebar = false;
var brickDX = 2;
var brickDy = 0;
var brickX = 0;
var brickY = 0;
var time;

var destructibleBrickRowCount = 5;
var destructibleBrickColumnCount = 15;
var destructibleBrickWidth = 80;
var destructibleBrickHeight = 5;
var destructibleBrickPadding = 10;
var destructibleBrickOffsetTop = 50;
var destructibleBrickOffsetLeft = 10;


var bricks = [];
for(c=0; c<destructibleBrickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<destructibleBrickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
}

document.getElementsByTagName('button')[0].addEventListener('click', startGame)

function startGame() {
  document.getElementById('dialog').style.display='none';
}

function stopGame(){

}




function message(msg) {
  document.getElementsByTagName('h1')[0].textContent = msg;
  document.getElementById('dialog').style.display = 'block';
  document.getElementsByTagName('p')[0].textContent = 'Your time: ';
  document.getElementsByTagName('button')[0].textContent = 'Restart';
  // clearInterval(time);
}


document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacebar = true;
    }
}


//all the obstacle
function drawBrick() {

  ctx.beginPath();
  ctx.rect(xBrick, yBrick, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(xBrick-140, yBrick, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(xBrick+140, yBrick, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xBrick-180, dyBrick+130, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xBrick-290, dyBrick+130, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xBrick+80, dyBrick+130, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();


  ctx.beginPath();
  ctx.rect(xBrick*1.5, yBrick-50, 80, 20);
  ctx.fillStyle = "#C02942";
  ctx.fill();
  ctx.closePath();

}



function drawDestructibleBricks() {
    for(c=0; c<destructibleBrickColumnCount; c++) {
        for(r=0; r<destructibleBrickRowCount; r++) {
          if (bricks[c][r].status == 1) {
            var brickX = (c*(destructibleBrickWidth+destructibleBrickPadding))+destructibleBrickOffsetLeft;
            var brickY = (r*(destructibleBrickHeight+destructibleBrickPadding))+destructibleBrickOffsetTop;
            var variable = new Date()
            brickX -= variable.getMilliseconds();
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, destructibleBrickWidth, destructibleBrickHeight);
            ctx.fillStyle = "#542437";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<destructibleBrickColumnCount; c++) {
        for(r=0; r<destructibleBrickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+destructibleBrickWidth && y >= b.y && y <= b.y+destructibleBrickHeight && b.status!=0) {
                spacebar=false;
                y= canvas.height - 40;
                b.status = 0;
            }
        }
    }
}

//Target
function target() {

  ctx.beginPath();
  ctx.rect(312, 10, 20, 20);
  ctx.fillStyle = "#53777A";
  ctx.fill();
  ctx.closePath();

}

// Bullet object
function drawBullet() {
    ctx.beginPath();
    ctx.rect(x, y, 5, 15);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}


//for animation
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBullet();
    drawBrick();
    target();
    drawDestructibleBricks();
    collisionDetection();

    if(xBrick + dxBrick > canvas.width-180 || xBrick + dxBrick < 0) {
        dxBrick = -dxBrick;
    }




    if( (x > xBrick) &&  (x < xBrick + 80) && (y > yBrick) && (y < yBrick+20)) {
      console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER');
    }
    else if ( (x > xBrick-140) && x < xBrick - 80 && y > yBrick && y < yBrick+20) {
      console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER');
    }
     else if (x > xBrick+140 && x < xBrick + 220 && y > yBrick && y < yBrick+20) {
      console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER');
    }
    else if (x > xBrick*1.5 && x < xBrick + 120 && y > yBrick && y < yBrick-50 ) {
      console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER');
    }
    // else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160 && y > dyBrick + 100 && y < dyBrick+20 ) {
    //   spacebar=false;
    //   y = canvas.height - 40;
    //   message('GAME OVER');
    // }
    // else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160) {
    //   spacebar=false;
    //   y = canvas.height - 40;
    //   message('GAME OVER');
    // }
    // else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160) {
    //   spacebar=false;
    //   y = canvas.height - 40;
    //   message('GAME OVER');
    // }







    if (y <= 14) {
      spacebar=false;
      y = canvas.height - 40;
      message('YOU WIN');
    }


    if(spacebar) {
      shoot()
    }

    brickX += brickDX;
    brickY += brickDy;

    xBrick += dxBrick;
    yBrick += dyBrick;
}

function shoot() {

  if (y < 0) {
    spacebar=false;
    y = canvas.height - 40;
  }
  x += dx;
  y += dy
  // console.log('y, dy: ' + y + ',' + dy + '   x, dx: ' + x + ',' + dx);
}

var time = setInterval(draw, 10);

//shooter
// ctx.beginPath();
// ctx.rect(310, 290, 20, 20);
// ctx.fillStyle = "#542437";
// ctx.fill();
// ctx.closePath();
//
// //target
// ctx.beginPath();
// ctx.rect(310, 10, 20, 20);
// ctx.fillStyle = "#53777A";
// ctx.fill();
// ctx.closePath();


//Bullet
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.beginPath();
// ctx.rect(x, y, 5, 15)
// ctx.fillStyle = "#333";
// ctx.fill();
// ctx.closePath();
// x += dx;
// y +=dy;

// ctx.beginPath();
// ctx.rect(40, 80, 80, 20);
// ctx.fillStyle = "#D95B43";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(400, 130, 80, 20);
// ctx.fillStyle = "#ECD078";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(70, 200, 80, 20);
// ctx.fillStyle = "#C02942";
// ctx.fill();
// ctx.closePath();




//destructible obstacle
// function destructibleObstacle() {
//
//   ctx.beginPath();
//   ctx.rect((xObstacle-20)*2, yObstacle-30, 100, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((xObstacle-70)*2, yObstacle-30, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((xObstacle+40)*2, yObstacle-30, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((xObstacle-120)*2, yObstacle-30, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((xObstacle-170)*2, yObstacle-30, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((xObstacle-220)*2, yObstacle-30, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((canvas.width-xObstacle-80)*1.5, dyObstacle+70, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((canvas.width-xObstacle-20)*1.5, dyObstacle+70, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
//   ctx.beginPath();
//   ctx.rect((canvas.width-xObstacle+40)*1.5, dyObstacle+70, 80, 5);
//   ctx.fillStyle = "#542437";
//   ctx.fill();
//   ctx.closePath();
//
// }
