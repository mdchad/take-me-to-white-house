
console.log("hello world");


document.getElementsByTagName('button')[0].addEventListener('click', startGame)



function startGame() {

var chooseColor="";

document.getElementById('dialog').style.display='none';

  // if (document.getElementById('grey').checked) {
  //   chooseColor= "#333";
  // } else if (document.getElementById('maroon').checked) {
  //   chooseColor="#700C25"
  // }

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
var brickDX = 2;
var brickDy = 0;
var brickX = 0;
var brickY = 0;
var time;
var startAngle = (2*Math.PI);
var endAngle = (Math.PI*1.5);
var currentAngle = 0;



var destructibleBrickRowCount = 2;
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




function message(msg, buttonText) {
  document.getElementsByTagName('h1')[0].textContent = msg;
  document.getElementById('dialog').style.display = 'block';
  document.getElementsByTagName('p')[0].textContent = 'Your time: ';
  document.getElementsByTagName('button')[0].textContent = buttonText;
  document.getElementsByTagName('p')[1].textContent = " ";
  // document.getElementsByTagName('label')[0].textContent = " ";
  // document.getElementsByTagName('label')[1].textContent = " ";
  clearInterval(time);
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
  ctx.rect(312, 18, 20, 20);
  ctx.fillStyle = "#53777A";
  ctx.fill();
  ctx.closePath();

}


// Bullet object
var image = new Image()
image.src='Single-Bullet-icon.png'
function drawBullet() {
    ctx.beginPath();
    // ctx.rect(x, y, 5, 15);
    // ctx.fillStyle = chooseColor;
    // ctx.fill();
    ctx.drawImage(image, x, y, 5, 15);
    ctx.closePath();
}

// function rotate() {
//
//         //Clears
//         // ctx.clearRect(0,0,canvas.width,canvas.height);
//
//         //Drawing
//         ctx.beginPath();
//         ctx.arc(320, 30, 20, startAngle + currentAngle, endAngle + currentAngle, false);
//         ctx.strokeStyle = "#102143";
//         ctx.lineWidth = 6.0;
//         ctx.stroke();
//
//         // translate context to center of canvas
//         // context.translate(canvas.width / 2, canvas.height / 2);
//         //
//         // // rotate 45 degrees clockwise
//         // context.rotate(Math.PI / 4);
//         //
//         // currentAngle += diff * 0.001;
//         //
//         // currentAngle %= 2 * Math.PI;
//
// }


//for animation
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBullet();
    drawBrick();
    target();
    drawDestructibleBricks();
    collisionDetection();
    // rotate();


    if(xBrick + dxBrick > canvas.width-180 || xBrick + dxBrick < 0) {
        dxBrick = -dxBrick;
    }




    if( (x > xBrick) &&  (x < xBrick + 80) && (y > yBrick) && (y < yBrick+20)) {
      // console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
    }
    else if ( (x > xBrick-140) && x < xBrick - 80 && y > yBrick && (y < yBrick+20)) {
      // console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
      // clearInterval(timer);

    }
     else if (x > xBrick+140 && x < xBrick + 220 && y > yBrick && (y < yBrick+20)) {
      // console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
      // clearInterval(timer);

    }
    else if (x > xBrick*1.5 && x < xBrick + 120 && y > yBrick && y < yBrick-50 ) {
      console.log(x, y, xBrick, yBrick)
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
      // clearInterval(timer);
    }
    else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160 && y > dyBrick + 130 && y < dyBrick+20 ) {
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
    }
    else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160 && y > dyBrick + 130 && y < dyBrick+20) {
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
    }
    else if ( (x > canvas.width-xBrick+80) && x < xBrick + 160 && y > dyBrick + 130 && y < dyBrick+20) {
      spacebar=false;
      y = canvas.height - 40;
      message('GAME OVER', 'Restart');
    }







    if (y <= 25) {
      spacebar=false;
      y = canvas.height - 40;
      message('YOU WIN', 'Play Again') ;
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
  y += dy;
  // console.log('y, dy: ' + y + ',' + dy + '   x, dx: ' + x + ',' + dx);
}

var time = setInterval(draw, 10);

}





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
