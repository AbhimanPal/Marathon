class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(displayWidth-100,495);
    car1.addImage("car1", car1Img);
    car2 = createSprite(displayWidth-100,400);
    car2.addImage("car2",car2Img);
    cars = [car1, car2];
    finish = createSprite(displayWidth*3+200,400);
    finish.addImage("finish", finishImg);
    finish.scale = 2.3;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = -40;
      background("black");
      image(track,-displayWidth/2,10,displayWidth*4,displayHeight-20);
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 300;
        //use data form the database to display the cars in y direction
        x =  50 + allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2;
          fill("red");
          // ellipse(x,y,300,300);
          textSize(20);
          text(player.name,x-20,y-145);
        }

        else{
          fill("black");
          textSize(20);
          text(allPlayers[plr].name,x-30,y-145);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=15
      player.update();
    }

    if(player.distance>4550){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
    }

    

    drawSprites();
  }

  end(){
    console.log("GAME OVER");
    console.log(player.rank);
    text("Congratulations " + player.name,displayHeight*3+150,50)
  }
}
