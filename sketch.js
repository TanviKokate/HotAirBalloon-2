var ballon;
var database, height;

function preload(){
  background_Image = loadImage("Images/Hot Air Ballon-01.png")
  ballonImg1 = loadAnimation("Images/Hot Air Ballon-02.png");
  ballonImg2 = loadAnimation("Images/Hot Air Ballon-02.png", "Images/Hot Air Ballon-03.png",
  "Images/Hot Air Ballon-04.png")
}

function setup() {
  database = firebase.database();
  var canvas = createCanvas(1500,700);

  ballon = createSprite(250, 650, 50, 50);
  ballon.addAnimation("ballonAni", ballonImg1);
  ballon.scale = 0.6;

  var ballon_position = database.ref('balloon/height');
  ballon_position.on("value", readHeight, showError);
}

function draw() {
  background(background_Image);

  if (keyDown(LEFT_ARROW)){
  //  ballon.x = ballon.x - 10;
  updateHeight(-10, 0);
  ballon.addAnimation("moveBalloon", ballonImg2);
  } else if (keyDown(RIGHT_ARROW)){
  //  ballon.x = ballon.x + 10;
  updateHeight(10, 0);
  ballon.addAnimation("moveBalloon", ballonImg2);
  } else if (keyDown(UP_ARROW)){
  //  ballon.y = ballon.y - 10;
   updateHeight(0, -10);
   ballon.addAnimation("moveBalloon", ballonImg2);
  } else if (keyDown(DOWN_ARROW)){
  //  ballon.y = ballon.y + 10;
    updateHeight(0, 10);
    ballon.addAnimation("moveBalloon", ballonImg2);
  }
  drawSprites();

  fill(217, 245, 255);
  stroke(0);
  strokeWeight(4);
  textSize(27);
  textFont("Comic Sans MS");
  text("Use Arrow keys to move Hot Air Balloon !!", 7, 27);
}

function updateHeight(x, y){
  database.ref('balloon/height').set({
    "x" : height.x + x,
    "y" : height.y + y
 })
}

function readHeight(data){
  height = data.val();
  ballon.x = height.x;
  ballon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}