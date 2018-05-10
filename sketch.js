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
      triangle(0, 0, -width/110, height/25, width/110, height/25);
    pop();
    controlPanel();
  }

  moveShip(){
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      triangle(0, 0, -width/110, height/25, width/110, height/25);
      pop();
      angleMode(DEGREES);
      this.yacceleration = width/10000*cos(this.heading);
      this.xacceleration = width/10000*sin(this.heading);
      this.y1 -= this.yVelocity;
      this.x1 += this.xVelocity;
      controlPanel();
  }


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
    ellipse(this.x, this.y, this.r, this.r);
    controlPanel();
  }

  moveRock(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    controlPanel();
  }
}

class Projectile{
  constructor(xPos, yPos, angle){
    this.x = xPos;
    this.y = yPos;
    this.r = width/500;
    this.xVelocity = width/100*sin(angle);
    this.yVelocity = width/100*cos(angle);
  }

  makeBullet(){
    noFill();
    stroke(255);
    ellipse(this.x, this.y, this.r, this.r);
    controlPanel();
  }

  moveBullet(){
    this.x += this.xVelocity;
    this.y -= this.yVelocity;
    controlPanel();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Spacecraft();
  r = width/10;
  for(let i = 0; i < 10; i++){
  pizzas[i] = new Rock(random(0, width), random(-height, 0), r);
}
  textSize(30);
}
let p = 0;
function draw() {
  let r = width/10;
  if(click){
    sleep(2000);
    start();
  } else {


  background(100);
  controlPanel();
  fill(255);
  text("Score", width/2 - width/75, height/4);
  text(score, width/2, height/4 + height/32);
//   for(i = 0; i < bullets.length; i++){
//   shoot = createButton('shoot');
//   shoot.position(width/3.5, height/1.5);
//   shoot.mousePressed(bullets[i].makeBullet);
// }
  ship.makeShip();
  ship.moveShip();
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
  if(mouseIsPressed && mouseX >= width/24 - width/40 && mouseX <= width/24 + width/40 && mouseY >= height - height/4 - width/40 && mouseY <= height - height/4 + width/40){
    ship.heading -= 5;
    blue1 = false;
  } else {
    blue1 = true;
  }
  if(keyIsDown(65)){
    ship.heading -= 5;
    blue1 = false;
  }
  if(mouseIsPressed && mouseX >= width/7.5 - width/40 && mouseX <= width/7.5 + width/40 && mouseY >= height - height/4 - width/40 && mouseY <= height - height/4 + width/40){
    ship.heading += 5;
    blue2 = false;
  } else {
    blue2 = true;
  }
  if(keyIsDown(68)){
    ship.heading += 5;
    blue2 = false;
  }
  if(mouseIsPressed && mouseX >= width/11.5 - width/40 && mouseX <= width/11.5 + width/40 && mouseY >= height - height/2.85 - width/40 && mouseY <= height - height/2.85 + width/40){
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
    blue3 = false;
  } else {
    blue3 = true;
  }
  if(keyIsDown(87)){
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
    blue3 = false;
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
      let r = width/10;
      pizzas.push(new Rock(random(0, width), random(-height, 0), r));
      score++;
    }

  }


}
for(j = 0; j < pizzas.length; j++){
let distance2 = dist(pizzas[j].x, pizzas[j].y, ship.x1, ship.y1);
let distance3 = dist(pizzas[j].x, pizzas[j].y, ship.x1 - width/110, ship.y1 + height/25);
let distance4 = dist(pizzas[j].x, pizzas[j].y, ship.x1 + width/110, ship.y1 + height/25);
if(distance2 <= pizzas[j].r/2 || distance3 <= pizzas[j].r/2 || distance4 <= pizzas[j].r/2){
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
    background(100);
    fill(255);
    stroke(255);
    text("Game Over", width/2, height/2);
    end = false;
    click = true;
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

  if(mouseX >= width - width/11.5 - width/40 && mouseX <= width - width/11.5 + width/40 && mouseY >= height - height/4 - width/40 && mouseY <= height - height/4 + width/40){
    bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
    red = false;
    for(i = 0; i < bullets.length; i++){
      bullets[i].makeBullet();
      bullets[i].moveBullet();
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
  ellipse(width/24, height - height/4, width/20, width/20);
} else {
  fill('rgba(0, 0, 100, 0.1)');
  stroke(0);
  ellipse(width/24, height - height/4, width/20, width/20);
}
  if(blue2){
  fill('rgba(0, 0, 255, 0.1)');
  stroke(0);
  ellipse(width/7.5, height - height/4, width/20, width/20);
} else {
  fill('rgba(0, 0, 100, 0.1)');
  stroke(0);
  ellipse(width/7.5, height - height/4, width/20, width/20);
}
if(blue3){
fill('rgba(0, 0, 255, 0.1)');
stroke(0);
ellipse(width/11.5, height - height/2.85, width/20, width/20);
} else {
fill('rgba(0, 0, 100, 0.1)');
stroke(0);
ellipse(width/11.5, height - height/2.85, width/20, width/20);
}
if(red){
  fill('rgba(255, 0, 0, 0.1)');
  stroke(0);
  ellipse(width - width/11.5, height - height/4, width/20, width/20);
} else {
  fill('rgba(100, 0, 0, 0.1)');
  stroke(0);
  ellipse(width - width/11.5, height - height/4, width/20, width/20);
}
}

function start(){
  background(100);
  fill(255);
  text("Lord of the Pies", width/2 - width/20, height/4);
  text("Start", width/2 - width/75, height/2);

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
