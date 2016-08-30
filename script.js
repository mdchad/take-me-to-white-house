
console.log("hello world");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-40;
var dx = 0;
var dy = -4;
var xBrick = 0;    //obstacle
var yBrick = canvas.height-100;   //obstacle
var dxBrick = 2;   //obstacle animation
var dyBrick = 0;  //obstacle animation
var spacebar = false;
// var brickDX = 2;
// var brickDy = 0;

var destructibleBrickRowCount = 2;
var destructibleBrickColumnCount = 6;
var destructibleBrickWidth = 80;
var destructibleBrickHeight = 5;
var destructibleBrickPadding = 10;
var destructibleBrickOffsetTop = 50;
var destructibleBrickOffsetLeft = 30;


var bricks = [];
for(c=0; c<destructibleBrickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<destructibleBrickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
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
  ctx.rect(canvas.width-xBrick-190, dyBrick+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xBrick-290, dyBrick+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xBrick+80, dyBrick+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();


  ctx.beginPath();
  ctx.rect(xBrick*1.5, yBrick-70, 80, 20);
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
//

function collisionDetection() {
    for(c=0; c<destructibleBrickColumnCount; c++) {
        for(r=0; r<destructibleBrickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+destructibleBrickWidth && y > b.y && y < b.y+destructibleBrickHeight) {
                spacebar=false;
                y = canvas.height-40; 
                b.status = 0;
            }
        }
    }
}




//for animation
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBullet();
    drawBrick();
    target();
    drawDestructibleBricks();
    collisionDetection();

    if(xBrick + dxBrick > canvas.width-80 || xBrick + dxBrick < 0) {
        dxBrick = -dxBrick;
    }

    if(spacebar) {
      shoot()
    }

    // brickX += brickDX;
    // brickY += brickDy;

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
  console.log('y, dy: ' + y + ',' + dy);
}

setInterval(draw, 10);

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
