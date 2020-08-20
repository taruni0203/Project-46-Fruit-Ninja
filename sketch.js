var ninja;
var AppleGroup, MelonGroup, StrawGroup, PeachGroup;
var gameState;
var count,ground, gameOver,time;

var star;
var score = 0;
var pScore = 0;
var visibility = 255;
var chance = 0;
var image1,image2,image3;
var ninjaImg,star3, star4;

var blade = 0;


function preload(){
  backImage = loadImage("background.jpg");
  appleImg = loadImage("fruit/apple.png");
  appleSlice1 = loadImage("fruit/apple-1.png");
  appleSlice2 = loadImage("fruit/apple-2.png");
  strawImg = loadImage("fruit/straw.png");
  strawSlice1 = loadImage("fruit/straw-1.png");
  strawSlice2 = loadImage("fruit/straw-2.png");
  melonImg = loadImage("fruit/melon.png");
  melonSlice1 = loadImage("fruit/melon-1.png");
  melonSlice2 = loadImage("fruit/melon-2.png");
  peachImg = loadImage("fruit/peach.png");
  peachSlice1 = loadImage("fruit/peach-1.png");
  peachSlice2 = loadImage("fruit/peach-2.png");
  ninjaImg = loadImage("ninja.png");
  boomImg = loadImage("fruit/boom.png");
  gameOverImg = loadImage("game-over.png");
  boomSound = loadSound("boom.mp3");
  clockSound = loadSound("clock.mp3");
  powerImg = loadImage("power.png");
  star3 = loadImage("star3.png");
  star4 = loadImage("star4.png");
  xImg = loadImage("lose.png");
}


function setup() {
  createCanvas(800,400);
  gameState = "form";
  AppleGroup = createGroup();
  StrawGroup = createGroup();
  MelonGroup = createGroup();
  PeachGroup = createGroup();
  BoomGroup = createGroup();
  NinjaGroup = createGroup();

  ninja = createSprite(200,375,0.05,0.05);
 
  yesButton = createButton("Yes");
  yesButton.position(400,350);
  yesButton.hide();

  startButton = createButton("Start");
  startButton.position(380,300);
  startButton.hide();

  resetButton = createButton("Reset");
  resetButton.position(100,50);
  resetButton.hide();

  gameOver = createSprite(400,120,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  power = createSprite(400,70,20,20);
  power.addImage(powerImg);
  power.scale = 0.6;
  power.visible = false;

  image1 = createSprite(250,200,50,50);
  image1.addImage(ninjaImg);
  image1.scale = 0.1;

  image2 = createSprite(400,200,50,50);
  image2.addImage(star3);
  image2.scale = 0.3;

  image3 = createSprite(550,200,50,50);
  image3.addImage(star4);
  image3.scale = 0.14;

  x1 = createSprite(640,100,20,20);
  x1.addImage(xImg);
  x1.scale = 0.7;

  x2 = createSprite(680,100,20,20);
  x2.addImage(xImg);
  x2.scale = 0.7;

  x3 = createSprite(720,100,20,20);
  x3.addImage(xImg);
  x3.scale = 0.7;

  wall1 = createSprite(810,200,20,400);
  wall2 = createSprite(-10,200,20,400);

  ninja.velocityX = 25;

}

function draw() {
  background(backImage); 

  stroke("white");
  fill("white");
  image1.visible = false;
  image2.visible = false;
  image3.visible = false;
  if(gameState=== "powerPlay" || gameState === "play" || gameState === "end"){
    x1.visible = true;
    x2.visible = true;
    x3.visible = true;
  }else{
    x1.visible = false;
    x2.visible = false;
    x3.visible = false;
  }

  if(gameState !== "autoMode"){
    ninja.x = mouseX;

  }

if(gameState === "form"){
  yesButton.show();
  textSize(25);
  text("Rules: ",350,170);
  text("The goal of this game is to slice the fruit",160,200);
  text("To slice the fruit, press the space bar",160,230);
  text("Beware of the falling bombs!",160,260);
  text("Are you ready to become the next fruit ninja?",160,290);
  yesButton.mousePressed(()=>{
    gameState = "options";
    yesButton.hide();
  })
}

if(gameState === "options"){
  textSize(30);
  text("Choose Your Ninja Blade",250,100);
  image1.visible = true;
  image2.visible = true;
  image3.visible = true;

  if(mousePressedOver(image1)){
    blade = 1;
    startButton.show();
  } 
  if (mousePressedOver(image2)){
    blade = 2;
    startButton.show();
  } 
  if(mousePressedOver(image3)){
    blade = 3;
    startButton.show();
  }

  
  startButton.mousePressed(()=>{
    gameState = "play";
    startButton.hide();
  })
}

if(mousePressedOver(image1)){
  ninja.scale = 0.05;
  ninja.addImage(ninjaImg);
}else if(mousePressedOver(image2)){
  ninja.scale = 0.15;
  ninja.addImage(star3);
}else if(mousePressedOver(image3)){
  ninja.scale = 0.08;
  ninja.addImage(star4);
}

 if(gameState === "play"){
  
  power.visible = false; 
  gameOver.visible = false;
  textSize(20);
  text("Score: "+ score,630,60);
    spawnApples();
    spawnStraws();
    spawnMelons();
    spawnPeaches();
    spawnBooms();
    time = 10;

    if(keyWentDown("space")){
      createStar();
     
    }

    if(frameCount %Math.round(random(600,1000)) === 0){
      clockSound.play();
      gameState = "powerPlay";
    }
    if(score >0 && score % 300 === 0){
      gameState = "autoMode";
    }   

    fruitCut();
 }

 if(gameState === "autoMode"){

  textSize(30);
  text("Auto Mode!",300,50);
  
  time = time - 0.03;
  textSize(20);
  text("Time Left 0:0" + Math.round(time),40,60);
  if(time < 0){
    NinjaGroup.destroyEach();
    gameState = "play";
  }

  text("Score: "+ score,630,60);

  ninja.bounceOff(wall1);
  ninja.bounceOff(wall2);
   spawnApples();
   spawnStraws();
   spawnMelons();
   spawnPeaches();
   fruitCut();
  if(frameCount% 2 === 0){
    createStar();
  }



    
}

 if(gameState === "powerPlay"){
  power.visible = true; 
  textSize(20);
  text("Power Score: "+ pScore,620,60);
  
  time = time - 0.03;
  text("Time Left 0:0" + Math.round(time),40,60);

  if(time < 0){
    gameState = "play";
  }

  spawnApples();
  spawnStraws();
  spawnMelons();
  spawnPeaches();
  spawnBooms();

  if(keyWentDown("space")){
    createStar();
  }

  fruitCut(); 
 }

 if(gameState === "end"){
  power.visible = false;
  if(chance === 3){
    gameOver.visible = true;
    resetButton.hide();
  }else{
    resetButton.show();
  }
 
  
  AppleGroup.destroyEach();
  PeachGroup.destroyEach();
  MelonGroup.destroyEach();
  StrawGroup.destroyEach();

  textSize(30);
  fill("white");
  stroke("white");
  if(pScore > 0){
    text("Score: " + score,340,260);
    text("Power Score: "+ pScore,300,300);
    text("Total Score: "+ (score + pScore),300,340);
  }else{
    text("Score: " + score,340,280);
    text("Total Score: "+ score,300,320);
  }

  resetButton.mousePressed(()=>{
    gameState = "play";
    resetButton.hide();
  })

  if(chance === 1){
    x1.destroy();
  }else if(chance === 2){
    x2.destroy();
  }else if(chance === 3){
    x3.destroy();
  }
}
  drawSprites();
}

function spawnApples(){
  if(frameCount %25 === 0){
    var apple = createSprite(random(0,800),random(-80,0),20,20);
    apple.addImage(appleImg);
    apple.velocityY = 8 + 3*(frameCount/500);
    apple.scale = 0.6;
    AppleGroup.add(apple);
  }
}
function spawnStraws(){
  if(frameCount %25 === 0){
    var straw = createSprite(random(0,800),random(-80,0),20,20);
    straw.addImage(strawImg);
    straw.velocityY = 8 + 3*(frameCount/1000);
    straw.scale = 0.6;
    StrawGroup.add(straw);
  }
}
function spawnMelons(){
  if(frameCount %25 === 0){
    var melon = createSprite(random(0,800),random(-80,0),20,20);
    melon.addImage(melonImg);
    melon.velocityY = 8 + 3*(frameCount/1000);
    melon.scale = 0.6;
    MelonGroup.add(melon);
  }
}
function spawnPeaches(){
  if(frameCount %25 === 0){
    var peach = createSprite(random(0,800),random(-80,0),20,20);
    peach.addImage(peachImg);
    peach.velocityY = 8 + 3*(frameCount/1000);
    peach.scale = 0.6;
    PeachGroup.add(peach);
  }
}
function spawnBooms(){
  if(frameCount %60 === 0){
    var boom = createSprite(random(0,800),random(-80,0),20,20);
    boom.addImage(boomImg);
    boom.velocityY = 8 + 3*(frameCount/1000);
    boom.rotationSpeed = random(-0.5,0.5);
    boom.scale = 0.8;
    boom.lifetime = 400/(8 + 3*(frameCount/1000));
    BoomGroup.add(boom);
  }
}
function createStar(){
  star = createSprite(ninja.x,380,20,20);
  star.velocityY = -7;
  star.rotationSpeed = 20;
  //star.addImage(ninjaImg);
  if(blade === 1){
    star.addImage(ninjaImg);
    star.scale = 0.07;
  }
  if(blade === 2){
    star.addImage(star3);
    star.scale = 0.14;
  }
  if(blade === 3){
    star.addImage(star4);
    star.scale = 0.14;
  }

  star.lifetime = 57.1;
  NinjaGroup.add(star);
}

function fruitCut(){
  for(var a = 0; a<AppleGroup.length; a++){
    var appleTemp = AppleGroup.get(a);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(appleTemp)){
        if(gameState === "play" || gameState === "autoMode"){
          score = score + 5;
        }else if(gameState === "powerPlay"){
          pScore = pScore + 10
        }
        appleTemp.destroy();
        ninjaTemp.destroy();
        appleS = createSprite(appleTemp.x-10,appleTemp.y,20,20);
        appleS.addImage(appleSlice1);
        appleS.scale = 0.6;
        appleS.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        appleS.rotationSpeed = random(-3,3)
        appleS2 = createSprite(appleTemp.x + 10,appleTemp.y,20,20);
        appleS2.addImage(appleSlice2);
        appleS2.scale = 0.6;
        appleS2.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        appleS2.rotationSpeed = random(-3,3);
        if(appleS.y>400){
          appleS.destroy();
        }
        if(appleS2.y>400){
          appleS2.destroy();
        }
      }
      if(appleTemp.y>400){
        appleTemp.destroy();
      }
    }
  }
  for(var s = 0; s<StrawGroup.length; s++){
    var strawTemp = StrawGroup.get(s);
      for(var n = 0; n<NinjaGroup.length; n++){
        var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(strawTemp)){
        if(gameState === "play" || gameState === "autoMode"){
          score = score + 5;
        }else if(gameState === "powerPlay"){
          pScore = pScore + 10;
        }
        strawTemp.destroy();
        ninjaTemp.destroy();
        strawS = createSprite(strawTemp.x-10,strawTemp.y,20,20);
        strawS.addImage(strawSlice1);
        strawS.scale = 0.6;
        strawS.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        strawS.rotationSpeed = random(-3,3)
        strawS2 = createSprite(strawTemp.x + 10,strawTemp.y,20,20);
        strawS2.addImage(strawSlice2);
        strawS2.scale = 0.6;
        strawS2.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        strawS2.rotationSpeed = random(-3,3);
        if(strawS.y>400){
          strawS.destroy();
        }
        if(strawS2.y>400){
          strawS2.destroy();
        }
      }
      if(strawTemp.y>400){
        strawTemp.destroy();
      }
    }
  }
  
  for(var m = 0; m<MelonGroup.length; m++){
    var melonTemp = MelonGroup.get(m);
      for(var n = 0; n<NinjaGroup.length; n++){
        var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(melonTemp)){
        if(gameState === "play" || gameState === "autoMode"){
          score = score + 5;
        }else if(gameState === "powerPlay"){
          pScore = pScore + 10
        }

        melonTemp.destroy();
        ninjaTemp.destroy();
        melonS = createSprite(melonTemp.x-10,melonTemp.y,20,20);
        melonS.addImage(melonSlice1);
        melonS.scale = 0.6;
        melonS.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        melonS.rotationSpeed = random(-3,3)
        melonS2 = createSprite(melonTemp.x + 10,melonTemp.y,20,20);
        melonS2.addImage(melonSlice2);
        melonS2.scale = 0.6;
        melonS2.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        melonS2.rotationSpeed = random(-3,3);
        if(melonS.y>400){
          melonS.destroy();
        }
        if(melonS2.y>400){
          melonS2.destroy();
        }
      }
      if(melonTemp.y>400){
        melonTemp.destroy();
      }
    }
  }

  for(var p = 0; p<PeachGroup.length; p++){
    var peachTemp = PeachGroup.get(p);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(peachTemp)){
        if(gameState === "play" || gameState === "autoMode"){
          score = score + 5;
        }else if(gameState === "powerPlay"){
          pScore = pScore + 10;
        }
        peachTemp.destroy();
        ninjaTemp.destroy();
        peachS = createSprite(peachTemp.x-10,peachTemp.y,20,20);
        peachS.addImage(peachSlice1);
        peachS.scale = 0.6;
        peachS.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        peachS.rotationSpeed = random(-3,3)
        peachS2 = createSprite(peachTemp.x + 10,peachTemp.y,20,20);
        peachS2.addImage(peachSlice2);
        peachS2.scale = 0.6;
        peachS2.velocityY = random(6 + 3*(frameCount/500),10 + 3*(frameCount/500));
        peachS2.rotationSpeed = random(-3,3);
        if(peachS.y>400){
          peachS.destroy();
        }
        if(peachS2.y>400){
          peachS2.destroy();
        }
      }
      if(peachTemp.y>400){
        peachTemp.destroy();
      }
    }
  }
  for(var b = 0; b<BoomGroup.length; b++){
    var boomTemp = BoomGroup.get(b);
    for(var n = 0; n<NinjaGroup.length; n++){
      var ninjaTemp = NinjaGroup.get(n);
      if(ninjaTemp.isTouching(boomTemp) && gameState=== "play"){
        boomSound.play();
        gameState = "end";
        chance = chance + 1;
      }
    }
  }
}

