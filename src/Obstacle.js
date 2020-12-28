class Obstacle {
  constructor() {
    let obstacle = createSprite(700, 272, 10, 10);
    obstacle.addImage('stone', obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(4 + score / 600);
    obstacle.lifetime = 600;
    obstacle.depth = monkey.depth - 1;
    obstacle.setCollider('circle', 0, 0, 200);
    obstacleGroup.add(obstacle);
  }
}
