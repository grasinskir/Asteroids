let ship;
let moveForward;
let pizzas = [];
let bullets = [];
let shoot;
let end = false;
let control = true;
let red = true;
let blue1 = true;
let blue2 = true;
let blue3 = true;
let count = 0;
let score = 0;
let click = true;
let pie;
let pizza;
let spacebackground;
let gamebackground;
let endgame;
let mobile = false;
let click2 = true;


function preload(){
  pie = loadImage("blueberrypie.png");
  pizza = loadImage("pizza.png");
  spacebackground = loadImage("space.png");
  gamebackground = loadImage("spacetemplate.png");
  endgame = loadImage("endgame.png");
}

class Spacecraft{
  constructor(){
    this.x1 = width/2;
    this.y1 = height/2;
    this.x2 = width/2 - width/95;
    this.y2 = height/2 + height/30;
    this.x3 = width/2 + width/95;
    this.y3 = height/2 + height/30;
    this.heading = 0;
    this.yVelocity = 0;
    this.xVelocity = 0;
  }

  makeShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      // triangle(0, 0, -width/110, height/25, width/110, height/25);
      imageMode(CENTER);
      image(pie, 0, 0, width/55, width/35);
    pop();
    angleMode(DEGREES);
    this.yacceleration = width/10000*cos(this.heading);
    this.xacceleration = width/10000*sin(this.heading);
    this.y1 -= this.yVelocity;
    this.x1 += this.xVelocity;
    controlPanel();
  }

  // moveShip(){
  //   push();
  //     translate(this.x1, this.y1);
  //     angleMode(DEGREES);
  //     rotate(this.heading);
  //     noFill();
  //     stroke(255);
  //     // triangle(0, 0, -width/110, height/25, width/110, height/25);
  //     imageMode(CENTER);
  //     image(pie, 0, 0, -width/110, height/25, width/110, height/25);
  //     pop();
  //     angleMode(DEGREES);
  //     this.yacceleration = width/10000*cos(this.heading);
  //     this.xacceleration = width/10000*sin(this.heading);
  //     this.y1 -= this.yVelocity;
  //     this.x1 += this.xVelocity;
  //     controlPanel();
  // }


}

class Rock{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVelocity = random(-width/500, width/500);
    this.yVelocity = random(-height/500, height/500);
  }

  makeRock(){
    stroke(255);
    noFill();
    // ellipse(this.x, this.y, this.r, this.r);
    imageMode(CENTER);
    image(pizza, this.x, this.y, this.r, this.r);
    if(mobile){
    controlPanel();
  }
  }

  moveRock(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if(mobile){
    controlPanel();
  }
  }
}

class Projectile{
  constructor(xPos, yPos, angle){
    this.x = xPos;
    this.y = yPos;
    this.r = width/200;
    this.xVelocity = width/100*sin(angle);
    this.yVelocity = width/100*cos(angle);
  }

  makeBullet(){
    fill(0, 0, 255);
    noStroke;
    ellipse(this.x, this.y, this.r, this.r);
    if(mobile){
    controlPanel();
  }
  }

  moveBullet(){
    this.x += this.xVelocity;
    this.y -= this.yVelocity;
    if(mobile){
    controlPanel();
  }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // ship = new Spacecraft();
//   r = width/10;
//   for(let i = 0; i < 10; i++){
//   pizzas[i] = new Rock(random(0, width), random(-height, 0), r);
// }
  textSize(30);

}
let p = 0;

function draw() {
  let r = width/10;
  if(click && click2){
    sleep(2000);
    start();
  } else if(click2 && click == false) {
    instructions();
  } else if(click2 == false && click == false) {


  imageMode(CENTER);
  image(spacebackground, width/2, height/2, width, height);
  fill(255);
  text("Score", width/2 - width/75, height/4);
  text(score, width/2, height/4 + height/32);
  ship.makeShip();
  // ship.moveShip();
  for(let i = 0; i < bullets.length; i++){
    bullets[i].makeBullet();
    bullets[i].moveBullet();
  }
  for(let i = 0; i < pizzas.length; i++){
  pizzas[i].makeRock();
  pizzas[i].moveRock();
}
// for(let n = 0; n < pizzas.length; n++){
//   pizzas[n].doubleRock();
//   pizzas[n].inversedoubleRock();
// }
if(mobile){
  if(mouseIsPressed && mouseX >= width/24 - width/30 && mouseX <= width/24 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30){
    ship.heading -= 5;
    blue1 = false;
  } else {
    blue1 = true;
  }
}
  if(keyIsDown(65)){
    ship.heading -= 5;
    blue1 = false;
  } else {
    blue1 = true;
  }
if(mobile){
  if(mouseIsPressed && mouseX >= width/6.2 - width/30 && mouseX <= width/6.2 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30){
    ship.heading += 5;
    blue2 = false;
  } else {
    blue2 = true;
  }
}
  if(keyIsDown(68)){
    ship.heading += 5;
    blue2 = false;
  } else {
    blue2 = true;
  }
if(mobile){
  if(mouseIsPressed && mouseX >= width/9.9 - width/30 && mouseX <= width/9.9 + width/30 && mouseY >= height - height/3.2 - width/30 && mouseY <= height - height/3.2 + width/30){
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
    blue3 = false;
  } else {
    blue3 = true;
  }
}
  if(keyIsDown(87)){
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
    blue3 = false;
  } else {
    blue3 = true;
  }


  if(ship.yVelocity < 0 && !mouseIsPressed && !keyIsDown(87)){
    ship.yVelocity += abs(ship.yacceleration);

    if(ship.yVelocity < 0 && ship.yVelocity > ship.yacceleration && !mouseIsPressed){
      ship.yVelocity = 0;
      ship.yacceleration2 = 0;
      ship.xVelocity = 0;
    }
  }
  if(ship.yVelocity > 0 && !mouseIsPressed && !keyIsDown(87)){

    ship.yVelocity -= abs(ship.yacceleration);

    if(ship.yVelocity > 0 && ship.yVelocity < ship.yacceleration && !mouseIsPressed){
      ship.yVelocity = 0;
      ship.yacceleration2 = 0;
      ship.xVelocity = 0;
    }
  }
  if(ship.xVelocity > 0 && !mouseIsPressed && !keyIsDown(87)){

    ship.xVelocity -= abs(ship.xacceleration);

    if(ship.xVelocity > 0 && ship.xVelocity < ship.xacceleration && !mouseIsPressed){
      ship.xVelocity = 0;
      ship.xacceleration2 = 0;
      ship.yVelocity = 0;
    }
  }
  if(ship.xVelocity < 0 && !mouseIsPressed && !keyIsDown(87)){

    ship.xVelocity += abs(ship.xacceleration);

    if(ship.xVelocity < 0 && ship.xVelocity > ship.xacceleration && !mouseIsPressed){
      ship.xVelocity = 0;
      ship.xacceleration2 = 0;
      ship.yVelocity = 0;
    }
  }
  if(ship.x1 < -height/30){
    ship.x1 = width;
  }
  if(ship.x1 > width + height/30){
    ship.x1 = 0;
  }
  if(ship.y1 < -height/30){
    ship.y1 = height;
  }
  if(ship.y1 > height + height/30){
    ship.y1 = 0;
  }
  for(i = 0; i < pizzas.length; i++){
    if(pizzas[i].x < -width/10){
      pizzas[i].x = width + width/10;
    }
    if(pizzas[i].x > width + width/10){
      pizzas[i].x = -width/10;
    }
    if(pizzas[i].y < -width/10){
      pizzas[i].y = height + width/10;
    }
    if(pizzas[i].y > height + width/10){
      pizzas[i].y = -width/10;
    }
  }
  for(j = 0; j < pizzas.length; j++){

  for(i = 0; i < bullets.length; i++){

    let distance1 = dist(pizzas[j].x, pizzas[j].y, bullets[i].x, bullets[i].y);
    if(distance1 <= pizzas[j].r/2 && pizzas[j].r > width/40){

      // littlepizzas.push(new Rock(pizzas[j].x - width/45, pizzas[j].y - width/45, width/20));
      pizzas[j].xVelocity *= -1;
      pizzas[j].yVelocity *= -1;

      pizzas.push(new Rock(pizzas[j].x - width/40, pizzas[j].y - width/40, pizzas[j].r/2));
      pizzas[j].r = pizzas[j].r/2;
      score++;


      bullets.splice(i,1);
      i--;
    }
    // if(distance1 <= pizzas[j].r/2 && pizzas[j].r <= width/40){
    //   pizzas.splice(j,1);
    //   j--;
    //   bullets.splice(i,1);
    // }
    if(distance1 <= pizzas[j].r/2 && pizzas[j].r <= width/40){
      pizzas.splice(j,1);
      // j--;
      bullets.splice(i,1);
      i--;
      let p = width/10;
      pizzas.push(new Rock(random(0, width), random(-height, 0), p));
      score++;
    }

  }


}
for(j = 0; j < pizzas.length; j++){
let distance2 = dist(pizzas[j].x, pizzas[j].y, ship.x1, ship.y1 - width/70);
let distance3 = dist(pizzas[j].x, pizzas[j].y, ship.x1 - width/110, ship.y1 + width/70);
let distance4 = dist(pizzas[j].x, pizzas[j].y, ship.x1 + width/110, ship.y1 + width/70);
if(distance2 <= pizzas[j].r/4 || distance3 <= pizzas[j].r/4 || distance4 <= pizzas[j].r/4){
  end = true;
  score = 0;
}
}
  if(ship.xVelocity >= width/300){
    ship.xVelocity = width/300;
  }
  if(ship.xVelocity <= -width/300){
    ship.xVelocity = -width/300;
  }
  if(ship.yVelocity >= width/300){
    ship.yVelocity = width/300;
  }
  if(ship.yVelocity <= -width/300){
    ship.yVelocity = -width/300;
  }
  if(end){
    imageMode(CENTER);
    image(endgame, width/2, height/2, width, height);
    fill(255);
    stroke(255);
    text("Game Over", width/2, height/2);
    end = false;
    click = true;
    click2 = true;
    mobile = false;
  }
red = true;
for(i = 0; i < bullets.length; i++){
if(bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0){
  bullets.splice(i,1);
  i--;
}
}
}
}

function mousePressed(){
console.log(mouseX);
console.log(mouseY);
if(mouseX >= 0 && mouseX < width/2 && click == false){
  mobile = true;
  click2 = false;
}
if(mouseX > width - width/2 && mouseX <= width && click == false){
  mobile = false;
  click2 = false;
}

if(mobile){
  if(mouseX >= width - width/11.5 - width/30 && mouseX <= width - width/11.5 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30){
    bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
    red = false;
    for(i = 0; i < bullets.length; i++){
      bullets[i].makeBullet();
      bullets[i].moveBullet();
    }
  }
}
  if(mouseX >= width/2 - width/25 && mouseX <= width/2 + width/25 && mouseY >= height/2 - height/25 && mouseY <= height/2 + height/25){
    click = false;
  }

}

function keyTyped(){
  if(keyCode === 32){
    bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
    red = false;
    for(i = 0; i < bullets.length; i++){
      bullets[i].makeBullet();
      bullets[i].moveBullet();
    }
  }
}


function controlPanel(){
  if(blue1){
  fill('rgba(0, 0, 255, 0.1)');
  stroke(0);
  ellipse(width/24, height - height/6, width/15, width/15);
} else {
  fill('rgba(0, 0, 100, 0.1)');
  stroke(0);
  ellipse(width/24, height - height/6, width/15, width/15);
}
  if(blue2){
  fill('rgba(0, 0, 255, 0.1)');
  stroke(0);
  ellipse(width/6.2, height - height/6, width/15, width/15);
} else {
  fill('rgba(0, 0, 100, 0.1)');
  stroke(0);
  ellipse(width/6.2, height - height/6, width/15, width/15);
}
if(blue3){
fill('rgba(0, 0, 255, 0.1)');
stroke(0);
ellipse(width/9.9, height - height/3.3, width/15, width/15);
} else {
fill('rgba(0, 0, 100, 0.1)');
stroke(0);
ellipse(width/9.9, height - height/3.3, width/15, width/15);
}
if(red){
  fill('rgba(255, 0, 0, 0.1)');
  stroke(0);
  ellipse(width - width/11.5, height - height/6, width/15, width/15);
} else {
  fill('rgba(100, 0, 0, 0.1)');
  stroke(0);
  ellipse(width - width/11.5, height - height/6, width/15, width/15);
}
}

function start(){
  imageMode(CENTER);
  image(gamebackground, width/2, height/2, width, height);
  fill(255);
  text("Master of Pie", width/2 - width/20, height/4);
  text("Start", width/2 - width/75, height/2);
  pizzas = [];
  ship = new Spacecraft();
  let r = width/10;
  for(let i = 0; i < 10; i++){
  pizzas[i] = new Rock(random(0, width), random(-height, 0), r);
}
}

function instructions(){
  imageMode(CENTER);
  image(gamebackground, width/2, height/2, width, height);
  fill(255);
  text("If you are playing on mobile tap on the left side of the screen and use the onscreen controls to play.", width/4, height/4);
  text("Mobile", width/4, height/2);
  text("If you are playing on a computer click on the right side of the screen and use the W A D and Spacebar keys to play.", width - width/4, height/4);
  text("Computer", width - width/4, height/2);
}

function sleep(milliseconds) {
  // Delay for when you die so you can see how you die
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
