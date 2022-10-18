// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, width, height, fontSize,colorMode, HSB,textFont, mouseX,textStyle,round mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs, canvasWidth, canvasHeight,text,collideCircleCircle,keyCode, UP_ARROW,DOWN_ARROW, LEFT_ARROW,RIGHT_ARROW,textAlignCenter, textSize,collideRectCircle, createButton, loadImage,image,loadFont,textFont, key,var,noLoop, LEFT_ARROW, RIGHT_ARROW, position, collideRectRect, collideLineRect, round, loadSound */

// IMPORTANT: you'll need to import the p5 collide2d library in order for this
// code to work. You can do this by doing one of the following:
// - importing a local copy to the HTML
// - importing a hosted copy (from a CDN) to the HTML
// - (last resort) pasting it into this script as the first line

let backgroundColor,
  mouse,
  stopSign,
  score,
  health,
  myFont,
  gameIsOver,
  time,
  gameIsWon,
  monsteroneHit,
  monstertwoHit,
  cheeseHit,
  fireHit,
  invincibility,
  invincibilityTime,
  scrollX,
  spriteOn, stopHit, bitesound,backgroundMusic, numOfCheese,
  damagenum, damageX, damageY, pointsnum, pointX, pointY, pointsTime;
var columns = 20;
var rows = 13;
var tile = [];

//function preload(){
 //bitesound = loadSound("https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2FChewing-popcorn-single-crunch-A-www.fesliyanstudios.com.mp3?v=1628183225547");
 //backgroundMusic = loadSound("https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2FRat%20on%20the%20Run%20Soundtrack%20-%20Level%202.mp3?v=1628182450480");
//}

function setup() {
  // Canvas & color settings
  createCanvas(500, 650);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  stroke(0);

  score = 0;
  health = 100;
  time = 100000;
  numOfCheese = 0;
  gameIsOver = false;
  gameIsWon = false;
  monsteroneHit = false;
  monstertwoHit = false;
  cheeseHit = false;
  fireHit = false;
  invincibility = false;
  spriteOn = true;
  stopHit = false;
  

  mouse = new Mouse();
  createTileArray();

  myFont = loadFont(
    "https://cdn.glitch.com/a720cf6b-1b26-426e-8439-f048ca02411b%2FPixeboy-z8XGD.ttf?v=1626717225527"
  );
  textFont(myFont);
 //backgroundMusic.play();
}

function draw() {
  background(80);
  textSize(30);
  displayTileArray();
     if(score == numOfCheese){
    gameWon();
  }
  handleTime();
  healthBar();
  if (spriteOn === true) {
    mouse.show();
  }
  mouse.update();
  mouse.move();
  mouse.checkTileCollision();
  handlePointsTimer();
  handleInvincibilityTime();
  displayScore();
  
  fill("black");
  textSize(30);
  text(`Health: ${round(health)} %`, 20, 20);
  textFont(myFont);
  textSize(30);
  noFill();
}

function createTileArray() {
  for (var i = 0; i < rows; i++) {
    tile[i] = [];
    for (var j = 0; j < columns; j++) {
      tile[i][j] = [];
    }
  }
  tile[0] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[1] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[2] =  [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0];
  tile[3] =  [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[4] =  [0, 0, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 4, 0, 0, 5];
  tile[5] =  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  tile[6] =  [1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[7] =  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[8] =  [0, 0, 0, 0, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tile[9] =  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  tile[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 5, 0, 4];
  tile[11] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1];
  tile[12] = [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var x = j * 50;
      var y = i * 50;
      if (tile[i][j] === 0) {
        tile[i][j] = new EmptyTile(x, y);
      } else if (tile[i][j] === 1) {
        tile[i][j] = new BrickTile(x, y);
      } else if (tile[i][j] === 2) {
        tile[i][j] = new FireTile(x, y);
      } else if (tile[i][j] === 3) {
        tile[i][j] = new MonsterOne(x, y);
      } else if (tile[i][j] === 4) {
        tile[i][j] = new MonsterTwo(x, y);
      } else if (tile[i][j] == 5) {
        tile[i][j] = new Cheese(x, y);
        numOfCheese++;
      } else if(tile[i][j] == 6){
        tile[i][j] = new StopSign(x,y);
}
    }
  }
}

function displayTileArray() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      tile[i][j].show();
    }
  }
}
class EmptyTile {
  constructor(x, y) {
    this.referencenum = 0;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
  }
  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
  }
}

class BrickTile {
  constructor(x, y) {
    this.referencenum = 1;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.image = loadImage(
      "https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2FScreen%20Shot%202021-08-02%20at%2011.55.02%20AM.png?v=1627923499563"
    );
  }
  show() {
    fill(255);
    image(this.image, this.x, this.y, this.width, this.height);
  }
}

class FireTile {
  constructor(x, y) {
    this.referencenum = 2;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.damage = 5;
    this.image = loadImage(
      "https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2Fanimated-fire-gif-transparent-background-1.gif?v=1628006010392"
    );
  }
  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
  }
}
class MonsterOne {
  constructor(x, y) {
    this.referencenum = 3;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.damage = 20;
    this.image = loadImage(
      "https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2FYecy.gif?v=1628006181689"
    );
  }
  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
  }
}
class MonsterTwo {
  constructor(x, y) {
    this.referencenum = 4;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.damage = 10;
    this.image = loadImage(
      "https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2FAW3892502_00.gif?v=1628006639566"
    );
  }
  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
  }
}
class Cheese {
  constructor(x, y) {
    this.referencenum = 5;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.points = 10;
    this.image = loadImage(
      "https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fcartoon-cheese-1.png?v=1627667529332"
    );
  }
  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
  }
}

class StopSign {
  constructor(x, y) {
    this.referencenum = 6;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 50;
    this.image = loadImage(
      "https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fstop.svg?v=1627921524156"
    );
    this.mouseInSign = false;
  }

  show() {
    fill(100);
    rect(this.x, this.y, 50, this.height);
    image(this.image, this.x + 5, this.y + 10, this.width, this.height);
  }
}
function keyPressed() {
  if (key == " " && mouse.isOnGround) {
    mouse.up();
    mouse.isOnGround = false;
  }
  if (keyCode === LEFT_ARROW && mouse.isStopped) {
    mouse.goingLeft = true;
    mouse.goingRight = false;
    mouse.isStopped = false;
    mouse.image = loadImage("https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fimage_processing20200410-20919-7de08j.png?v=1627668028206");
  }
  if (keyCode === RIGHT_ARROW && mouse.isStopped) {
    mouse.goingLeft = false;
    mouse.goingRight = true;
    mouse.isStopped = false;
    mouse.image = loadImage("https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2F81d6182e-e49b-4fa1-81e0-0cedd4b97b05_image_processing20200410-20919-7de08j.png?v=1628181157766");
  }
}

class Mouse {
  constructor() {
    this.y = 460;
    this.x = 64;
    this.width = 40;
    this.height = 40;
    this.image = loadImage(
      "https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fimage_processing20200410-20919-7de08j.png?v=1627668028206"
    );

    this.gravity = 0.5;
    this.lift = -15;
    this.jumpVelocity = 0;
    this.xVelocity = 2;

    this.isStopped = true;

    this.isOnGround = true;
    
    this.trueXPosition = this.x;
  }
  show() {
    fill(255);
    image(this.image, this.x, this.y, this.width, this.height);
  }

  up() {
    this.jumpVelocity = 0;
    this.jumpVelocity += this.lift;
    this.jumpVelocity *= 0.9;
  }
  update() {
    this.jumpVelocity += this.gravity;
    this.y += this.jumpVelocity;

    if (this.y > height - this.height) {
      this.y = height - this.height;
      this.jumpVelocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.jumpVelocity = 0;
    }
    if (this.y + this.height >= height) {
      this.isOnGround = true;
    }
  }
  move() {
    if (this.goingLeft === true) {
      if (this.x < width/2 && this.trueXPosition > 250){
          moveTilesRight();
          damageX += this.xVelocity;
          pointX += this.xVelocity;
      } else {
        this.x -= this.xVelocity;
      }
      this.trueXPosition -= this.xVelocity;
      if (this.x <= 0) {
        this.x = 0;
        this.goingLeft = false;
        this.goingRight = true;
        this.image = loadImage("https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2F81d6182e-e49b-4fa1-81e0-0cedd4b97b05_image_processing20200410-20919-7de08j.png?v=1628181157766");
      }
    } else if (this.goingRight === true) {
     
        if (this.x > width/2 && this.trueXPosition < 750){
          moveTilesLeft();
          damageX -= this.xVelocity;
          pointX -= this.xVelocity;
        } else {
          this.x += this.xVelocity;
        }
      this.trueXPosition += this.xVelocity;
      if (this.x >= width - this.width) {
        this.x = width - this.width;
        this.goingLeft = true;
        this.goingRight = false;
        this.image = loadImage("https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fimage_processing20200410-20919-7de08j.png?v=1627668028206");
      }
    }
  }
  
  checkTileCollision() {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (tile[i][j].referencenum === 1) {
          this.checkBrick(i, j);
        }
          else if(tile[i][j].referencenum === 2){
          this.checkFireTile(i,j);
        }
          else if (tile[i][j].referencenum === 3) {
          this.checkMonsterOne(i, j);
        } else if (tile[i][j].referencenum === 4) {
          this.checkMonsterTwo(i, j);
        } else if (tile[i][j].referencenum === 5) {
          this.checkCheese(i, j);
        } else if (tile[i][j].referencenum === 6) {
          this.checkStop(i, j);
      }
    }
  }
 }
  checkBrick(i, j) {
    // if left and top walls are hit at same time AND bottom of mouse is within 10 pixels of the top of brick
    if (
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      this.y + this.height - tile[i][j].y <= this.jumpVelocity + 5
    ) {
      this.y = tile[i][j].y - this.height;
      this.isOnGround = true;
      this.jumpVelocity = 0;
    } // else if right and top walls are hit at same time AND bottom of mouse is within 10 pixels of the top of brick
    else if (
      collideLineRect(
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      this.y + this.height - tile[i][j].y <= this.jumpVelocity + 5
    ) {
      this.y = tile[i][j].y - this.height;
      this.isOnGround = true;
      //console.log("Hit top-right corner!");
      this.jumpVelocity = 0;
    } // else if left and bottom walls are hit at same time AND top of mouse is within 10 pixels of the bottom of brick
    else if (
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      tile[i][j].y + tile[i][j].height - this.y <= 10
    ) {
      this.y = tile[i][j].y + tile[i][j].height;
      this.jumpVelocity = 0;
    } // else if right and bottom walls are hit at same time AND top of mouse is within 10 pixels of the bottom of brick
    else if (
      collideLineRect(
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      ) &&
      tile[i][j].y + tile[i][j].height - this.y <= 10
    ) {
      this.y = tile[i][j].y + tile[i][j].height;
      this.jumpVelocity = 0;
      //console.log("Hit bottom-right corner!");
    }
    // else if collide with left wall of brick
    else if (
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    ) {
      this.x = tile[i][j].x - this.width;
      this.goingLeft = true;
      this.goingRight = false;
      this.image = loadImage("https://cdn.glitch.com/81d6182e-e49b-4fa1-81e0-0cedd4b97b05%2Fimage_processing20200410-20919-7de08j.png?v=1627668028206");
      //console.log("Hit left wall!");
    } // else if collide with right wall of brick
    else if (
      collideLineRect(
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    ) {
      this.x = tile[i][j].x + tile[i][j].width;
      this.goingLeft = false;
      this.goingRight = true;
      this.image = loadImage("https://cdn.glitch.com/9390d234-a9af-4aa7-a044-1662104bf97c%2F81d6182e-e49b-4fa1-81e0-0cedd4b97b05_image_processing20200410-20919-7de08j.png?v=1628181157766");
      //console.log("Hit right wall!");
    } // else if collide with top of brick
    else if (
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y,
        this.x,
        this.y,
        this.width,
        this.height
      )
    ) {
      this.y = tile[i][j].y - this.height;
      this.isOnGround = true;
      this.jumpVelocity = 0;
      //console.log("Hit top wall!");
    } // else if collide with bottom of brick
    else if (
      collideLineRect(
        tile[i][j].x,
        tile[i][j].y + tile[i][j].height,
        tile[i][j].x + tile[i][j].width,
        tile[i][j].y + tile[i][j].height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    ) {
      this.y = tile[i][j].y + tile[i][j].height;
      this.jumpVelocity = 0;
     //console.log("Hit bottom wall!");
    } else if (this.y + this.height < height && this.jumpVelocity != 0) {
      this.isOnGround = false;
    }
  }
  checkMonsterOne(i, j) {
    monsteroneHit = collideRectRect(
      this.x,
      this.y,
      this.width,
      this.height,
      tile[i][j].x,
      tile[i][j].y - 5,
      40,
      40
    );
    if (monsteroneHit === true && invincibility === false) {
      handleObstacleCollision(i, j);
    }
  }
  checkMonsterTwo(i, j) {
    monstertwoHit = collideRectRect(
      this.x,
      this.y,
      this.width,
      this.height,
      tile[i][j].x + 10,
      tile[i][j].y + 10,
      tile[i][j].width - 20,
      tile[i][j].height - 10
    );
    if (monstertwoHit === true && invincibility === false) {
      handleObstacleCollision(i, j);
    }
  }
  checkCheese(i, j) {
    cheeseHit = collideRectRect(
      this.x,
      this.y,
      this.width,
      this.height,
      tile[i][j].x,
      tile[i][j].y,
      tile[i][j].width,
      tile[i][j].height
    );
    if (cheeseHit) {
      handleCheeseCollision(i, j);
      //bitesound.play();
      let cheeseX = tile[i][j].x;
      let cheeseY = tile[i][j].y;
      tile[i][j] = new EmptyTile();
      tile[i][j].x = cheeseX;
      tile[i][j].y = cheeseY;
    
    }
  }
  checkFireTile(i, j) {
    fireHit = collideRectRect(
      this.x,
      this.y,
      this.width,
      this.height,
      tile[i][j].x,
      tile[i][j].y + 10,
      tile[i][j].width,
      tile[i][j].height - 10
    );
    if (fireHit === true && invincibility === false) {
      handleObstacleCollision(i, j);
    }
  }
  checkStop(i, j) {
    stopHit = collideRectCircle(this.x,this.y,this.width,this.height,tile[i][j].x + 5 + tile[i][j].width / 2,tile[i][j].y + tile[i][j].height / 2,tile[i][j].width /2);
    if(stopHit === true && tile[i][j].mouseInSign === false) {
      handleStopSignCollision();
      tile[i][j].mouseInSign = true;
      //console.log("collided");
    } else if (stopHit === false) {
      tile[i][j].mouseInSign = false;
      //console.log("not colliding");
    }
 }
}

function moveTilesLeft() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      tile[i][j].x -= mouse.xVelocity;
    }
  }
}

function moveTilesRight() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      tile[i][j].x += mouse.xVelocity;
    }
  }
}

function handleObstacleCollision(i, j) {
  if (!gameIsOver) {
    becomeInvincible(i, j);
    health -= tile[i][j].damage;
  }
}

function handleCheeseCollision(i, j) {
  if (!gameIsOver) {
    score += 1;
    if (health <= 100) {
      health += tile[i][j].points;
      getPoints(i,j);
    }
  }
}

function getPoints(i, j) {
  pointsTime = 75;
  pointsnum = tile[i][j].points;
  pointX = tile[i][j].x + 7;
  pointY = tile[i][j].y + 30;
}

function handlePointsTimer(){
  if (pointsTime > 0) {
    pointsTime--;
    textSize(20);
    fill("green");
    text(`+${pointsnum}`, pointX, pointY);
  }
}

function handleStopSignCollision(){
  if(!gameIsOver) {
    mouse.goingLeft = false;
    mouse.goingRight = false;
    mouse.isStopped = true;
  } 
}
//handles health bar functionality
function healthBar() {
  if (health <= 0) {
    gameOver();
    health = 0;
  } else if (time > 0) {
    health -= 0.02;
  }
}
//makes the health decrease overtime
function handleTime() {
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
    text("Game Over", 165, 200);
    textSize(75);
  }
}
//handles the mouse's invincibility
function handleInvincibilityTime() {
  if (invincibilityTime > 0) {
    invincibilityTime--;
    if (spriteOn === true) {
      spriteOn = false;
    } else if (spriteOn === false) {
      spriteOn = true;
    }
    textSize(20);
    fill("red");
    text(`-${damagenum}`, damageX, damageY);
  } else {
    invincibility = false;
    spriteOn = true;
  }
}

function gameOver() {
  gameIsOver === true;
  fill("black");
  text("Game Over", 165, 300);
  textSize(75);
  noLoop();
 
}

function displayScore() {
  textSize(30);
  fill("black");
  text(`Cheese Collected: ${score}`, 20, 50);
  textSize(30);
}

function becomeInvincible(i, j) {
  invincibility = true;
  invincibilityTime = 75;
  damagenum = tile[i][j].damage;
  damageX = tile[i][j].x + 10;
  damageY = tile[i][j].y - 20;
  handleInvincibilityTime();
}
function gameWon(){
  gameIsWon === true;
  invincibilityTime = 0;
  spriteOn = true;
  textSize(30);
  fill("black");
  text("Congratulations!", 155, 400);
  noLoop();
}
//class Level{
//} for future levels
