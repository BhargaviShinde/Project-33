const  Engine = Matter.Engine;
const  World  = Matter.World;
const  Events = Matter.Events;
const  Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];
var particle;
var particles =   [];

var divisionHeight = 300;
var score = 0;
var turn = 0;
var gameState = "play";

var ground;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);


    for (var k = 0; k <=width; k = k + 80){
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }


    for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50){    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50){   
       plinkos.push(new Plinko(j,375));
    }
}
 
function draw() {
  background("black");
  textSize(25);
  fill("whote");
  text("Score : " + score, 20, 30);

  Engine.update(engine);
  
   for (var i = 0; i < plinkos.length; i++) { 
     plinkos[i].display();     
   }

   for (var k = 0; k < divisions.length; k++) {     
     divisions[k].display();
   }

   if(particle != null){
     particle.display();

     if( particle.body.position.x <300 && particle.body.position.y > 650){
       //score = score + Math.round(random(0,10))*50;
       score = score + 500;
       particle = null;
       if(turn >= 5){ 
         gameState = "end"
        }
     } else if(particle.body.position.x > 301 && particle.body.position.x < 600 && particle.body.position.y > 650){
      particle = null;
      score = score + 100;
      if(turn >= 5){ 
        gameState = "end";
       }
    } else if(particle.body.position.x >601 && particle.body.position.x <900 && particle.body.position.y > 650){
      score = score + 200;
      particle = null;
      if(turn >= 5){ 
       gameState = "end";
       }
    }
   }

   if(gameState === "end"){
    fill("Red");
    textSize(70); 
    text("Game Over", 250,400);
   }

   ground.display();

  }

function mousePressed(){
  if(gameState !== "end"){

    //count++;
    turn = turn + 1;
    particle = new Particle(mouseX,0,10,10);
    particle.display();


  }
}