var trex ,trex_running;
var groundImage;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);

  //create a trex sprite
  trex = createSprite(50,150,20,50);-
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(390, 180, 1000, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;

  //creating invisible ground
  invisibleGround = createSprite(390, 200, 1000, 20);
  invisibleGround.visible = false;

  score = 0;
}

function draw(){
  background("180");

  stroke("black");
  textSize(15);
  text("SCORE: " + score, 480, 20);

  if (gameState === PLAY)
  {    
    ground.velocityX = -5;
    score = score + Math.round(frameCount/10);

    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }

    if (keyDown("space") && trex.y < 170)
    {
      trex.y = trex.y - 10;
    }

    trex.velocityY = trex.velocityY + 0.5;

    //Spawn the clouds
    spawnClouds();

    //Spawn the obstacles
    spawnObstacles();
  }

  else if (gameState === END)
  {
    ground.velocityX = 0;
  }

  //console.log(frameCount);

  //console.log(trex.y);

  //console.log(ground.x);

  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles()
{
  if (frameCount % 50 === 0)
  {
    var obstacle = createSprite(650,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
               break;
      case 2: obstacle.addImage(obstacle2);
               break;
      case 3: obstacle.addImage(obstacle3);
               break;
      case 4: obstacle.addImage(obstacle4);
               break;
      case 5: obstacle.addImage(obstacle5);
               break;
      case 6: obstacle.addImage(obstacle6);
               break;
      default: break;
    }
    
     //assign scale and lifetime to the obstacle          
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
  }
}

function spawnClouds()
{
  if(frameCount % 60 === 0)
  {
    //Creating and spawning random clouds
    var cloud = createSprite(650, 100, 50, 10);
    cloud.addImage("cloud", cloudImage);
    cloud.velocityX = -3;
    cloud.y = Math.round(random(10, 60));
    cloud.scale = 0.6;
    console.log(cloud.y);

    //Making sure the trex is behind the clouds
    trex.depth = cloud.depth;
    trex.depth += 1

    cloud.lifetime = 220;
  }
}
