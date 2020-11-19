//Create variables here
var DogImg,dog,Happydog;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  Happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(DogImg);
  scale = 0.05;
  foodStock = database.ref('Food');
  foodStock.on("value" ,readStock);
  
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(Happydog);
}
  
  drawSprites();
  //add styles here
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}

function readStock(data){ 
foodS=data.val(); 
} 

//Function to write values in DB 
function writeStock(x){ 
  if(x<=0){ 
   x=0; 
}
else{ x=x-1;} 
database.ref('/').update({ Food:x }) 
}



