var iss, spacecraft;
var bg, issimg, scimg, asteroidImg, asteroid;
var hasDocked = false;
var PLAY = 0;
var END = 1;
var WINend = 2;
var gameState = PLAY;
var bgMoving, bgMovingSprite, spaceshipCrash;


const bgSound = new Audio("bgSound.wav");
const crashSound = new Audio("crashSound.wav");
const dockSound = new Audio("dockSound.wav");


function preload(){
  bg= loadImage("space.jpg");
  bgMoving = loadImage("spaceExtended.jpg");
  issimg = loadImage("iss.png");
  scimg = loadImage("spacecraft1.png");
  scimg1 = loadImage("spacecraft2.png");
  scimg2= loadImage("spacecraft3.png");
  scimg3= loadImage("spacecraft4.png");
  asteroidImg = loadAnimation("asteroid.png", "asteroid2.png", "asteroid3.png", "asteroid4.png");
  spaceshipCrash = loadImage("spacecraft1crashed.png");
}

function setup() {
  createCanvas(600, 350);
  bgMovingSprite = createSprite(300, 350);
  bgMovingSprite.addImage(bgMoving);
  bgMovingSprite.scale = 1;
  bgMovingSprite.velocityY = -5;

  spacecraft = createSprite(285,240);
  spacecraft.addImage(scimg, "spacecraft");
  spacecraft.scale = 0.15;
  
  iss = createSprite(330,130);
  iss.addImage(issimg);
  iss.scale = 0.25;

  asteroidGROUP = new Group();
}

function draw() {
  background(bg);

  spacecraft.addImage(scimg);
  if (gameState == PLAY) {
    // 

    if(!hasDocked) {

      if(bgMovingSprite.y <= -50) {
        bgMovingSprite.y = 350;
        bgMovingSprite.velocityY = -5;
      }


      bgSound.play();
      bgSound.loop = true;
      
      spacecraft.x = spacecraft.x + random(-1,1);
      
    if(keyDown("UP_ARROW")){
      spacecraft.y = spacecraft.y - 2;
    }
      
    if(keyDown("LEFT_ARROW")){
      spacecraft.addImage(scimg3);
      spacecraft.x = spacecraft.x - 1;
    }
      
    if(keyDown("RIGHT_ARROW")){
      spacecraft.addImage(scimg2);
      spacecraft.x = spacecraft.x + 1;
    }
      
    if(keyDown("DOWN_ARROW")){
        spacecraft.addImage(scimg1);
        spacecraft.y = spacecraft.y + 2
    }

    if(asteroidGROUP.isTouching(spacecraft)){
      gameState = END;
      asteroidGROUP.setVelocityXEach(0)
      // crashSound.play();
    }
  }
  spawnObstacles();

    if(spacecraft.y <= (iss.y+60) && spacecraft.x <= (iss.x-1)){
      hasDocked = true;
      textSize(25);
      fill("white")
      text("Docking Successful!", 200, 300);
      dockSound.play();
      gameState = WINend
    }
  } 
  

  drawSprites();
   if(gameState == END) {
    textSize(15);
    fill("white");
    text("SPACESHIP CRASHED. PLEASE PLAY AGAIN", 100, 300);
    spacecraft.addImage(spaceshipCrash, "spacecraft");
    spacecraft.scale = 0.15;
    bgMovingSprite.velocityY = 0;
  } else if(gameState == WINend) {
    textSize(25);
    fill("white")
    text("Docking Successful!", 200, 300);
    bgMovingSprite.velocityY = 0;
  }
}


function spawnObstacles() {
  if(frameCount % 80 === 0) {
    asteroid = createSprite(650, random(150, 300), 50, 50);
    asteroid.addAnimation("asteroid", asteroidImg);
    asteroid.depth = bgMovingSprite.depth + 1;
    //obstacle.debug = true;
    asteroid.velocityX = -10;
    
    //assign scale and lifetime to the obstacle           
    asteroid.scale = 0.3;
    asteroid.lifetime = 1000;
    //add each obstacle to the group
    asteroidGROUP.add(asteroid);
  }
}

