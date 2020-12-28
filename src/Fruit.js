class Fruit{
    constructor(y){
        let fruit = createSprite(700, y, 10, 10);
        fruit.addImage('banana', bananaImage);
        fruit.scale = 0.1;
        fruit.velocityX = -(4 + score / 600);
        fruit.lifetime = 600;
        fruit.depth = monkey.depth - 1;
        foodGroup.add(fruit);
    }
}