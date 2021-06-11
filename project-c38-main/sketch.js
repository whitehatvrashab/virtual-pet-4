var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var gameState;
var bedroom,garden,livingroom,washroom;
var bg1;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  livingroom = loadImage("Living Room.png");
  washroom = loadImage("washroom.png");
  bg1=loadImge("bg.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  bg=createSprite(250,250,500,500);
 

  foodObj=new Food();
  
  dog = createSprite(250,250,10,10);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milkBotltle1 = createSprite(140,435,10,10);
  milkBotltle1.addImage(milkImg);
  milkBotltle1.scale = 0.025;

  milkBotltle2 = createSprite(210,280,10,10);
  milkBotltle2.addImage(milkImg);
  milkBotltle2.scale = 0.025;
  milkBotltle2.visible = false;

}


function draw() {  
  background(0);

  foodObj.display();
  writeStock(foodS);
  
  if(foodS == 0){
    dog.addImage(happyDog);
    milkBotltle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBotltle2.visible=true;
  }
  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkBotltle2.visible=false;
    dog.y=250;
  }
  
  var Bath=createButton("I Want To Take Bath");
  Bath.position(400,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Sleep=createButton("Sleepy");
  Sleep.position(400,250);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Play=createButton("Lets Play");
  Play.position(400,225);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var PlayInGarden=createButton("Playing In Park");
  PlayInGarden.position(400,150);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
