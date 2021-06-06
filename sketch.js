//Create variables here
 var DogImg,DoghappyImg,milk,boneImg,dog,bone;

function preload()
{
	DogImg=loadImage("Dog.png")
  DoghappyImg=loadImage("happydog.png")
  boneImg=loadImage("bones.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(DogImg);
  dog.scale = 0.15;

  database=firebase.database();

  

  bone= createSprite(140,435,10,10);
  bone.addImage(boneImg);
  bone.scale = 0.09

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);

  bone1 = createSprite(210,280,10,10);
  bone1.addImage(boneImg);
  bone1.scale = 0.05;
  bone1.visible = false;

}


function draw()
 {  background(255)
  if(food !== 0){
    if(keyWentDown(UP_ARROW)){
      writeStock(food);
      dog.addImage(DoghappyImg);
      bone1.visible = true;
  
     
    }
  
    if(keyWentUp(UP_ARROW)){
      writeStock(food);
      dog.addImage(DogImg);
      bone1.visible = false;
    }
  }
  
  if(food == 0){
    
    dog.addImage(DogImg);
    food= 50;
  
  }
  
  
  
    drawSprites();
    textSize(17);
    fill("black");
    text("Press up arrow key to feed bone to the Dog ",50,50);
    text("Bones Remaining "+food,170,440);
  }
  
  function readStock(data)
  {
    food = data.val();
  }
  
  function writeStock(x){
  
    if(x<=0){
      x = 0;
    }else{
      x=x-1
    }
  
    database.ref('/').update({
      food:x
    })
  

  drawSprites();
  //add styles here

}



