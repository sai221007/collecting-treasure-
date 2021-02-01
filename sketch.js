
var monkey , monkey_running, monkey_stopping;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;
var ground;

var PLAY=-1;
var END=0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  score=0
  survivalTime=0

  }


function draw() {
  
  background (180);
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time:" + survivalTime, 100, 50);
  
  
  stroke("black");
  fill("black");
  textSize(20)
  text("Score:"+ score, 300, 100);

  background (180);
  monkey.collide(ground);
  
  if(gameState === PLAY){
    monkey.changeAnimation(monkey_running);

    stroke("black");
    fill("black");
    textSize(20);
    text("Survival Time:" + survivalTime, 100, 50);
        survivalTime = Math.ceil(frameCount/frameRate());
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
     
    if(keyDown("space")){
    monkey.velocityY= -6;
  } 
    
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1;
  }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    obstacleGroup.setLifetimeEach(-1);
    
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END
    }
  }
  
  if (gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survivalTime.visible = false ;
    monkey.changeAnimation(monkey_stopping);

    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 110, 200);
    
    stroke("black");
    fill("black");
    textSize(30);
    text("Monkey is dead", 100,240);

    ground.velocityX = 0
  }
  drawSprites();
}


function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale =0.1;
    
    banana.velocityX=-3;
    banana.lifetime =200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 100 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX =-3
    obstacle.lifetime =200;
    obstacle.scale =0.1
    obstacleGroup.add(obstacle);
  }
}