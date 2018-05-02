let ship;
let moveForward;
let pizzas = [];
let bullets = [];
let shoot;

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
  constructor(xPos, yPos, angle){
    this.x = xPos;
    this.y = yPos;
    this.r = width/500;
    this.xVelocity = width/900*sin(angle);
    this.yVelocity = width/900*cos(angle);
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
  pizzas[i] = new Rock();
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
    bullets[i].makeBullet();
    bullets[i].moveBullet();
    if(bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0){
      bullets.splice(i,1);
    }
    // if(pizzas[j].x - pizzas.r <= bullets[i].x &&
    //    pizzas[j].x + pizzas.r >= bullets[i].x &&
    //    pizzas[j].y - pizzas.r <= bullets[i].y &&
    //    pizzas[j].y + pizzas.r >= bullets[i].y){
    //
    //      pizzas[j].x = pizzas.x;
    //      pizzas[j].y = pizzas.y;
    //      bullets.splice(i,1);
    //    }
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
