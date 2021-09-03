var player,playerImg;
var coin,coinImg;
var chest,chestImg;
var tree,treeImg;
var wall,wallImg;
var bgImg,bg;
var gameoverImg,restartImg;

var door;
var bg2Img
var gameState="start";
var chestgroup;
var score,invisibleGround;
var gameover,gameoverImg;

function preload(){
    playerImg=loadImage("player.png");
    chestImg=loadImage("chest.png");
    wallImg=loadImage("wall1.png");
    bgImg=loadImage("bg.jpg");
    coinImg=loadImage("coin.png");
    treeImg=loadImage("tree.png");
    gameoverImg=loadImage("gameover.jpg");
    restart=loadImage("restart.png");
    
    bg2Img=loadImage("bg2.jpg");

   
}

function setup(){
    createCanvas(1200,600);
    bg=createSprite(600,200,1200,600);
    bg.addImage(bgImg);
    

    door=createSprite(1100,60,20,20);
    door.addImage(wallImg);
    door.scale=0.5;
    

    player=createSprite(600,500,20,30);
    player.addImage(playerImg);
    player.scale=1;

    invisibleGround=createSprite(600,570,1200,20);
    invisibleGround.visible=false;
    chestgroup=new Group();

     gameover=createSprite(500,300,20,29);
    gameover.addImage(gameoverImg);
    gameover.visible=false;
    score=0;
    
}
function draw(){
    background("yellow");
    
    textSize(25);
    fill("white");
    text("TREASURE : "+score, 100,100);



    if(gameState=="start"){
        if(player.y<240 && player.y>140){
            player.scale=0.8;
        }
    
        if(player.y<140 && player.y>80){
            player.scale=0.5;
        }
    
        if(player.y<80){
            player.scale=0.45;
        }
        if(player.isTouching(door)){
            gameState="play";    
            player.x=600;
            player.y=500;
            player.scale=1;
        } 
    }
   
    if(gameState=="play"){
        door.visible=false;
            bg.addImage(bg2Img);
            bg.scale=4
                    
            
            if(keyDown("space")){
                player.velocityY=-15;
            }
        
            player.velocityY+=0.8;

            chest();

           if(player.isTouching(chestgroup)){
               chestgroup.destroyEach();
               score=score+10;
           }
           console.log("treasure collected : "+ score);
           if(score===100){
              gameState="end" 
           }
    }
    if(gameState==="end"){
        chestgroup.setVelocityXEach(0);
        player.velocityY=0;
        gameover.visible=true;
        
    }

    playerMovement();

    player.collide(invisibleGround);
    
    
    drawSprites();
}

function chest(){
    if (frameCount % 120 === 0){
        var chest = createSprite(400,165,10,40);
        chest.y=Math.round(random(150,300));
        chest.addImage(chestImg);
        chest.velocityX=-5;
        chest.scale=0.2;
        chest.lifetime=240;
        chestgroup.add(chest);
       
    }      
}


function playerMovement(){
    if(keyDown("up")){
        player.y=player.y-10;

    }

    if(keyDown("down")){
        player.y=player.y+10;

    }

    if(keyDown("left")){
        player.x=player.x-10;

    }

    if(keyDown("right")){
        player.x=player.x+10;

    }

   

    
}