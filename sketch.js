const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

var player;
var box,box_img;
var score = 0;
var robot,robot_img;
var backgr;
var enemies;
var Bulletgroup, EnemyGroup, CloudGroup, BoxGroup, RobotGroup, PlatformGroup, invPlatformGroup,StockBulletGroup;
var FORM = 0;
var PLAY = 1;
var END = 2;
var gameState = FORM;
var input,playButton;
var Name;
var GameName;
var col;
var lifes = 3;
var invPlatform;
var coin,coin_img;
var platform, platform_img;
var playAgain;
var coinscollected=0
var PC_Jumping;

function preload()  {

    background_img = loadImage("sky.png")

    player_img = loadAnimation("PC/PC1.gif","PC/PC2.gif","PC/PC3.gif","PC/PC4.gif","PC/PC5.gif","PC/PC6.gif","PC/PC7.gif")

    box_img = loadImage("NPC/boxes.png");

    robot_img = loadAnimation("NPC/0.gif","NPC/1.gif","NPC/2.gif","NPC/3.gif","NPC/4.gif","NPC/5.gif","NPC/6.gif","NPC/7.gif","NPC/8.gif","NPC/9.gif","NPC/10.gif","NPC/11.gif")

    cloud1_img = loadImage("cloud1.png")
    cloud2_img = loadImage("cloud2.png")
    cloud3_img = loadImage("cloud3.png")

    enemy_img = loadAnimation("NPC/a.gif","NPC/b.gif","NPC/c.gif","NPC/d.gif","NPC/e.gif","NPC/f.gif","NPC/g.gif","NPC/h.gif","NPC/i.gif","NPC/j.gif")
    
    bullet_img = loadImage("NPC/Bullet.jpg")

    platform_img = loadImage("platform.png")

    coin_img = loadImage("coin.png")

    playAgain_img = loadImage("playAgain.png")

    PC_Jumping = loadAnimation("PC3.png")
}

function setup()  {
    canvas = createCanvas(displayWidth,displayHeight);

    backgr = createSprite(400,200)
    backgr.addImage(background_img)
    backgr.scale = 10
    
    ground = createSprite(400,810,2200,40)
    ground.shapeColor = 119,77,43

    player = createSprite(200,730,20,20)
    player.addAnimation("running",player_img)
    player.scale = 0.35
    player.debug = true
    player.addAnimation("jumping",PC_Jumping)
    
    player.setCollider("rectangle",0,0,200,340)

    col = color(219,197,246);

    playAgain = createSprite(width/2,height/2,20,20)
    playAgain.addImage(playAgain_img)
    playAgain.scale = 0.5;
    playAgain.visible = false

    BoxGroup = new Group();
    RobotGroup = new Group();
    BulletGroup = new Group();
    CloudGroup = new Group();
    EnemyGroup = new Group();
    PlatformGroup = new Group();
    invPlatformGroup = new Group();
    CoinGroup = new Group();
  //######
    form();
  /*  input = createInput("Enter Name Here..");
    playButton = createButton("Play the Game");
    
    Note = createElement('h3')
    GameName = createElement('h1');
    GameName.html("Soldier Runner")
    Note.html("Try to use a fantasy name instead of your real name, Example: FlipNest90839")
    
    */
}
//######
function form(){
    input = createInput("Enter Name Here..");
    playButton = createButton("Play the Game");
    
    Note = createElement('h3')
    GameName = createElement('h1');
    GameName.html("Soldier Runner")
    Note.html("Try to use a fantasy name instead of your real name, Example: FlipNest90839")


}
function draw()  {
    background(175)  

    engine = Engine.create();

    world = engine.World;
    
    if(gameState===FORM)  {
        
        input.position(550,400);
        input.size(300,30)
        playButton.position(650,450);
        playButton.style("background-color",col)
        GameName.position(600,325)
        Note.position(400,475)
        playButton.mousePressed(function(){
           // ######
            player.x=200;
            GameName.hide();
            Note.hide();
            playButton.hide();
            input.hide();
            Name = input.value();
            gameState = PLAY
           
        })
        
    }  
    if(gameState===PLAY)  {
        player.x=200;
    spawnBoxes();
    
    if(frameCount%10===0)  {
        score = score+1

    }
   spawnEnemies();
    if(score>100)  {
        spawnRobots();

    }
    if(player.x<150)  {
        gameState=END
    }
    if(BulletGroup.isTouching(player))  {
        BulletGroup.destroyEach();
        lifes=lifes-1;
    }

    if(EnemyGroup.isTouching(player))  {
        EnemyGroup.destroyEach();
        lifes=lifes-1
    }

    if(BoxGroup.isTouching(player))  {
        BoxGroup.destroyEach();
        lifes=lifes-1
    }

    if(RobotGroup.isTouching(player))  {
        RobotGroup.destroyEach();
        lifes=lifes-1
    }
    
   
    if(lifes === 0) {
       text("Game Over",200,200)
       gameState=END
    }
    if(keyDown("Space")&&player.y>400)  {
        player.velocityY = -13
        player.changeAnimation("jumping",PC_Jumping);
    }
//console.log(player.y);
    if(player.y>730){
        player.changeAnimation("running",player_img);
    }
    for(var i = 0; i<invPlatformGroup.length; i++  )  {

    if (invPlatformGroup.get(i).x<0){
        invPlatformGroup.get(i).destroy();
    }
    if(invPlatformGroup.get(i).isTouching(player)&&player.y<749)  {
        player.velocityY = 0;
        player.collide(invPlatformGroup.get(i))
    }
}
    
    player.velocityY = player.velocityY+0.35
    
    
    spawnClouds();

    spawnPlatforms();
    if(player.isTouching(CoinGroup))  {
        CoinGroup.destroyEach();
        coinscollected=coinscollected+1

    }
    
    }
//#####
    if(gameState===END)  {
       playAgain.visible = true
       text("Score: "+score,width/2-100,height/2)
       BulletGroup.destroyEach();
       EnemyGroup.destroyEach();
       BoxGroup.destroyEach();
       RobotGroup.destroyEach();
       PlatformGroup.destroyEach();
       CoinGroup.destroyEach();
       invPlatformGroup.destroyEach();
       player.x=200;
       if(mousePressedOver(playAgain))  {
        gameState=FORM   
        form();
           
            lifes=3
            playAgain.visible = false
            player.velocityX=0
            
            score=0;
            coinscollected=0;

       } 

    }
    player.collide(ground)
    drawSprites();
    //  console.log(player.y)
    textSize(25)
    fill("red")
    text("Coins Collected: "+coinscollected,600,50)
    text("Lifes Remaining: "+lifes,50,50)
    text("Score: "+score,1300,50)  
    textSize(15)
    textAlign(CENTER) 
    stroke("blue")
    text(Name,player.x,player.y-50) 
    player.depth = player.depth+1
    text(mouseX+","+mouseY, mouseX,mouseY)
}


function spawnBoxes()  {
    if(frameCount%317===0)  {
        box = createSprite(1500,750,20,20)
        box.addImage(box_img)
        box.velocityX = -4;
        box.scale = 0.3
        box.lifetime = 1000
        BoxGroup.add(box)
        box.debug = true
        box.setCollider("circle",0,0,200)
    }

}

function spawnRobots()  {
    if(frameCount%145===0)  {
        robot = createSprite(1500,750,20,20)
        robot.addAnimation("robot",robot_img)
        robot.velocityX = -4
        robot.scale = 0.4
        robot.lifetime = 1000
        RobotGroup.add(robot)
        robot.debug = true
        robot.setCollider("rectangle",0,0,100,150)
    }

}

function spawnClouds()  {
    if(frameCount%100===0)  {
        cloud = createSprite(1500,random(50,150),20,20)
        var rand = Math.round(random(1,3))
        switch(rand)  {
            case 1: cloud.addImage(cloud1_img)
            break;
            case 2: cloud.addImage(cloud2_img)
            break;
            case 3: cloud.addImage(cloud3_img)
            default:
            break;
            
        }
        cloud.velocityX = -4
        cloud.scale = 0.2
        cloud.lifetime = 1000
        CloudGroup.add(cloud)
    }

}

function spawnEnemies()  {
    if(frameCount%400===0)  {
        enemies = createSprite(1500,735,20,20)
        enemies.addAnimation("Enemies",enemy_img)
        enemies.velocityX = -4
        enemies.scale = 0.6
        enemies.lifetime = 1000
        EnemyGroup.add(enemies)
        enemies.debug = true
        enemies.setCollider("rectangle",0,0,200,200)

        if(frameCount%100===0)  {
            bullets = createSprite(enemies.x,721,20,20)
            bullets.addImage(bullet_img)
            bullets.velocityX = -10
            bullets.scale = 0.05
            bullets.lifetime = 1000
            BulletGroup.add(bullets)
            bullets.debug = true

        }
        

    }

}

function spawnPlatforms()  {
    if(frameCount%300===0)  {
        platform = createSprite(1500,random(550,600),80,20)
        invPlatform = createSprite(1500,550,platform.width+100,2)
        coin = createSprite(platform.x,platform.y-50,50,20)
        invPlatform.x = platform.x
        invPlatform.y = platform.y-30
        invPlatform.shapeColor = "yellow"
        invPlatform.velocityX = -4
        platform.addImage(platform_img)
        platform.scale = 0.3
        platform.velocityX = -4
        platform.lifetime = 1000
        PlatformGroup.add(platform)
        invPlatformGroup.add(invPlatform)
        coin.velocityX = -4
        coin.addImage(coin_img)
        coin.scale = 0.02;
        CoinGroup.add(coin)
        coin.debug = true
        coin.setCollider("circle",0,0,50)
       
    }

}
    


    