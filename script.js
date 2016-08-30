/* global $ */

console.log("hello world");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-40;
var dx = 0;
var dy = -4;
var xObstacle = 0;
var yObstacle = canvas.height-100;
var dxObstacle = 2;
var dyObstacle = 0;
var spacebar = false;


document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacebar = true;
    }
}

// function keyUpHandler(e) {
//     if(e.keyCode == 32) {
//         space = false;
//     }
// }



// //shooter
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
//
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




//all the obstacle
function drawObstacle() {

  ctx.beginPath();
  ctx.rect(xObstacle, yObstacle, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(xObstacle-140, yObstacle, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(xObstacle+140, yObstacle, 80, 20);
  ctx.fillStyle = "#D95B43";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xObstacle-190, dyObstacle+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xObstacle-290, dyObstacle+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width-xObstacle+80, dyObstacle+100, 80, 20);
  ctx.fillStyle = "#ECD078";
  ctx.fill();
  ctx.closePath();


  ctx.beginPath();
  ctx.rect(xObstacle*1.5, yObstacle-70, 80, 20);
  ctx.fillStyle = "#C02942";
  ctx.fill();
  ctx.closePath();

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
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBullet();
    drawObstacle();
    target();
    // destructibleObstacle();

    if(xObstacle + dxObstacle > canvas.width-80 || xObstacle + dxObstacle < 0) {
        dxObstacle = -dxObstacle;
    }

    if(spacebar) {
    x += dx;
    y += dy;

    }

    xObstacle += dxObstacle;
    yObstacle += dyObstacle;
}

setInterval(draw, 1);

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
