
let monkey , monkey_running, monkey_still;
let banana ,bananaImage, obstacle, obstacleImage;
let foodGroup, obstacleGroup;
let ground;
let score = 0,
    fruit = 0;
let gameState = 1,
    PLAY = 1,
    END = 0;

function preload() {
  // Loading in all animations and images for the game
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_still = loadAnimation("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 300);
  
  // Defining a group for fruit and a group for obstacles
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  /* 
    * Creating the monkey and adding two animations to it
    * Still for when the game is over
    * Running for when the game is playing
  */ 
  monkey = createSprite(40, 260, 10, 10);
  monkey.addAnimation('running', monkey_running);
  monkey.addAnimation('still', monkey_still);
  monkey.scale = 0.1;
  
  // Creating a static and non-moving ground
  ground = createSprite(300, 290, 600, 5);
}


function draw() {
  background('white');
  
  // Stopping the monkey from going through the floor
  monkey.collide(ground);
  
  // Showing the score and fruit collected
  textSize(20);
  fill('black');
  text(`Survival Rate: ${score}`, 220, 30);
  text(`Bananas: ${fruit}`, 245, 50);
  
  // Showing some information such as how to jump and restart
  textSize(8);
  text('Press SPACE to Jump', 250, 60);
  text('Hold LSHIFT to Jump Higher', 240, 70);
  text('Press R to Restart', 255, 80);

  // Adding gravity to the monkey at all times
  monkey.velocityY = monkey.velocityY + 2;
  
  if (gameState === PLAY) {
    // Increasing the score every second
    score = Math.ceil(frameCount / getFrameRate());
    
    // Making sure the monkey animation is running
    monkey.changeAnimation('running', monkey_running);
    
    // If the monkey touches an obstacle, end the game
    if (monkey.isTouching(obstacleGroup)) {
      endGame();
    }
    
    // If the monkey is touching a fruit, add a point and remove all fruits
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      fruit = fruit + 1;
    }
    
    // Spawn an obstacle every 300 frames
    if (frameCount % 300 === 0) {
      Obstacle();
    }
    
    // Spawn a fruit with a random Y position every 80 frames
    if (frameCount % 80 === 0) {
      Fruit(Math.round(random(120, 270)));
    }
    
    /*
      * If the space button is pressed, jump
      * If the space button is hit and the shift button help, jump higher
    */
    if (keyDown('space') && monkey.y >= 256) {
      if (keyDown(16)) monkey.velocityY = -30;
      else monkey.velocityY = -25;
    }
  } else if (gameState === END) {
    // Make sure the animation is still when game over
    monkey.changeAnimation('still', monkey_still);
    
    // If the 'R' key is pressed, reset the game
    if (keyDown(82)) {
      resetGame();
    }
  }
  
  drawSprites();
}

function endGame() {
  gameState = END;
  
  // Stop the obstacles and fruit from disappearing
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  
  foodGroup.setVelocityXEach(0);
  foodGroup.setLifetimeEach(-1);
}

function resetGame() {
  gameState = PLAY;
  
  // Reset the frame count to 0
  frameCount = 0;
  
  // Destroy all obstacles and fruit when restarting
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  // Reset the scores
  score = 0;
  fruit = 0;
}

function Fruit(y) {
  let fruit = createSprite(700, y, 10, 10);
  fruit.addImage('banana', bananaImage);
  fruit.scale = 0.1;
  fruit.velocityX = -(4 + score / 600);
  fruit.lifetime = 600;
  fruit.depth = monkey.depth - 1;
  foodGroup.add(fruit);
}

function Obstacle() {
  let obstacle = createSprite(700, 272, 10, 10);
  obstacle.addImage('stone', obstaceImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -(4 + score / 600);
  obstacle.lifetime = 600;
  obstacle.depth = monkey.depth - 1;
  obstacle.setCollider('circle', 0, 0, 200);
  obstacleGroup.add(obstacle);
}