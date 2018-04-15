var canvas = document.querySelector("canvas");

if (window.innerWidth > 768) {
  canvas.width = window.innerWidth - 17;
  startMessage = "Click the screen!";
} else {
  canvas.width = window.innerWidth;
  startMessage = "Tap the screen!";
}
canvas.height = window.innerHeight;

console.log(canvas);

var c = canvas.getContext('2d');


var gravity = 1;
var friction = 0.99;
var lastColor = "#397F75";
var startMessage;

function randomColor() {
  colors = [
    "#397F75",
    "#176324",
    "#1ECCB3",
    "#158CD9",
    "#B23500",
    "#FF6626",
    "#FFA019"

  ]
  var color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};

canvas.addEventListener('click', function(event) {

    balls.push(new Ball(0, Math.random() * (canvas.height / 2), 20, 2.5, 0, randomColor()));

});

window.addEventListener('resize', function(event) {
  console.log("RESIZING..");
  console.log(event.target.innerWidth);
  if (event.target.innerWidth > 768) {
    canvas.width = window.innerWidth - 17;
    startMessage = "Click the screen!";
  } else {
    canvas.width = window.innerWidth;
    startMessage = "Tap the screen!";
  }
  canvas.height = window.innerHeight;

});

function Ball (x, y, radius, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();

  };

  this.update = function() {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction;
      this.y -= 5;
    } else {
      this.dy += gravity;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();


  }
}

var balls;
function init () {
  balls = [];

}

function animate () {
  requestAnimationFrame(animate);
  // c.fillStyle = "rgba(255, 255, 255, 0.05)";
  // c.fillRect(0, 0, canvas.width, canvas.height);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(balls);

  // Background stuff


  c.textAlign = "center";
  c.font = "60px Arial";
  c.fillStyle = "lastColor";
  c.fillText("Bounce!", canvas.width / 2, canvas.height / 2);

  c.fillStyle = "#777777";
  c.font = "30px Arial";
  c.fillText(startMessage, canvas.width / 2, (canvas.height / 2) + 40);


  // Ball stuff
  for (i = 0; i < balls.length; i++) {
    balls[i].update();
    if (balls[i].x > canvas.width + 50) {
        console.log("poppin");
        balls.shift();
    }
  }

  // console.log(balls.length);

}


init();
animate();
