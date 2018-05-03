let ship;
let moveForward;
let pizzas = [];
let bullets = [];
let shoot;
let distance1;
let littlepizzas = [];

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
  }

  moveRock(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  doubleRock(){
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r/2, this.r/2);
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  inversedoubleRock(){
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r/2, this.r/2);
    this.x -= this.xVelocity;
    this.y -= this.yVelocity;
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
  }

  moveBullet(){
    this.x += this.xVelocity;
    this.y -= this.yVelocity;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Spacecraft();
  for(i = 0; i < 10; i++){
  pizzas[i] = new Rock(random(0, width), random(0, height), width/10);
}
}

function draw() {
  background(100);
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
  for(i = 0; i < pizzas.length; i++){
  pizzas[i].makeRock();
  pizzas[i].moveRock();
}
for(n = 0; n < littlepizzas.length; n++){
  littlepizzas[n].doubleRock();
  littlepizzas[n].inversedoubleRock();
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
  if(mouseIsPressed && mouseX >= width/2 && mouseX <= width-width/4){
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
  for(j = 0; j < pizzas.length; j++){
  for(i = 0; i < bullets.length; i++){
    // if(bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0){
    //   bullets.splice(i,1);
    // }
    distance1 = dist(pizzas[j].x, pizzas[j].y, bullets[i].x, bullets[i].y);
    if(distance1 <= pizzas[j].r/2){
      // pizzas[j].x = random(0, width);
      // pizzas[j].y = random(0, height);
      for(let m = 0; m < 2; m++){
      littlepizzas.push(new Rock(pizzas[j].x - width/40, pizzas[j].y - width/40, width/20));
    }
      for(let n = 0; n < littlepizzas.length; n++){
      // littlepizzas[j] = new Rock(pizzas[j].x - width/40, pizzas[j].y - width/40, width/20);
      // littlepizzas[n] = new Rock(random(0, width), random(0, height), width/20);
      littlepizzas[n].doubleRock();
      littlepizzas[n].inversedoubleRock();
    }
    pizzas.splice(j,1);
      bullets.splice(i,1);
    }
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

}

function mousePressed(){
  if(mouseX >= width/4 && mouseX <= width/2){
    bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
    for(i = 0; i < bullets.length; i++){

      bullets[i].makeBullet();
      bullets[i].moveBullet();
    }
  }
}
