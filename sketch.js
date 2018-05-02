let ship;
let moveForward;
let pizzas = [];
let bullets = [];


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
    this.angles = [];
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
      this.angles.push(this.heading);
  }


}

class Rock{
  constructor(){
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = width/10;
    this.xVelocity = random(-width/500, width/500);
    this.yVelocity = random(-height/500, height/500);
  }

  makeRock(){
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r, this.r);
  }

  moveRock(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

class Projectile{
  constructor(){
    this.x = ship.x1;
    this.y = ship.y1;
    this.r = width/500;
  }

  makeBullet(){
    noFill();
    stroke(255);
    ellipse(this.x, this.y, this.r, this.r);
  }

  moveBullet(){
    for(i = 0; i < ship.angles.length; i++){
    this.x += width/250*sin(ship.angles[i]);
    this.y -= width/250*cos(ship.angles[i]);
  }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Spacecraft();
  for(i = 0; i < 10; i++){
  pizzas[i] = new Rock();
}
}

function draw() {
  background(100);
  // moveForward = createButton('Forward');
  // moveForward.position(width/3.5, height/1.5);
  // moveForward.mousePressed;

  ship.makeShip();
  ship.moveShip();
  for(i = 0; i < pizzas.length; i++){
  pizzas[i].makeRock();
  pizzas[i].moveRock();
}
  if(mouseIsPressed && mouseX <= width/4){
    ship.heading -= 5;
  }
  if(keyCode === 65){
    ship.heading -= 5;
  }

  if(mouseIsPressed && mouseX >= width - width/4){
    ship.heading += 5;
  }
  if(keyCode === 68){
    ship.heading += 5;
  }
  if(mouseIsPressed && mouseX >= width/4 && mouseX <= width-width/4){
    ship.yVelocity += ship.yacceleration;
    ship.xVelocity += ship.xacceleration;
  }

  if(ship.yVelocity < 0 && !mouseIsPressed){
    ship.yVelocity += abs(ship.yacceleration);

    if(ship.yVelocity < 0 && ship.yVelocity > ship.yacceleration && !mouseIsPressed){
      ship.yVelocity = 0;
      ship.yacceleration2 = 0;
      ship.xVelocity = 0;
    }
  }
  if(ship.yVelocity > 0 && !mouseIsPressed){

    ship.yVelocity -= abs(ship.yacceleration);

    if(ship.yVelocity > 0 && ship.yVelocity < ship.yacceleration && !mouseIsPressed){
      ship.yVelocity = 0;
      ship.yacceleration2 = 0;
      ship.xVelocity = 0;
    }
  }
  if(ship.xVelocity > 0 && !mouseIsPressed){

    ship.xVelocity -= abs(ship.xacceleration);

    if(ship.xVelocity > 0 && ship.xVelocity < ship.xacceleration && !mouseIsPressed){
      ship.xVelocity = 0;
      ship.xacceleration2 = 0;
      ship.yVelocity = 0;
    }
  }
  if(ship.xVelocity < 0 && !mouseIsPressed){

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
  for(i = 0; i < bullets.length; i++){
    bullets[i].makeBullet();
    bullets[i].moveBullet();
  }
}

function mousePressed(){
  bullets.push(new Projectile);
  for(i = 0; i < bullets.length; i++){

    bullets[i].makeBullet();
    bullets[i].moveBullet();
  }
}
