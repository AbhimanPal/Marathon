var canvas, backgroundImage;
var finishImg;
var finish;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1Img,car2Img,car3Img,car4Img
var track;
function preload(){
  car1Img = loadImage("images/by.png");
  car2Img = loadImage("images/by.png");
  track = loadImage("images/olympic.jpg");
  finishImg = loadImage("images/finish2.png")


}
function setup(){
  canvas = createCanvas(displayWidth - 80, displayHeight-160);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}



function draw(){
  if(playerCount === 2 && gameState!==2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState===2){
    game.end();
    
  }
}
