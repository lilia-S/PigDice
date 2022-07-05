function Player() {
  this.name;
  this.currentScore = 0;
}

function Game(p1, p2){
  this.player1 = p1;
  this.player2 = p2;
  let coin = this.rollTheDice();
  if (coin%2==0){
    this.currentPlayer = this.player1;
    $("#hidden1").addClass("active-player-background");
    $("#hidden1").removeClass("inactive-player-background");
    $('#hidden2').addClass("inactive-player-background").removeClass("active-player-background");
  }
  else{
    this.currentPlayer = this.player2;
    $("#hidden2").addClass("active-player-background");
    $("#hidden2").removeClass("inactive-player-background");
    $('#hidden1').addClass("inactive-player-background").removeClass("active-player-background");
  }
  

}


Player.prototype.newScore = function(newScore){
  this.currentScore += parseInt(newScore);
  return this.currentScore;
}

Player.prototype.resetScore = function(){
  this.currentScore = 0;
  return this.currentScore;
}



Game.prototype.changeThePlayer = function(){
  if(this.currentPlayer === this.player1){
    this.currentPlayer = this.player2;
    $("#hidden2").addClass("active-player-background");
    $("#hidden2").removeClass("inactive-player-background");
    $('#hidden1').addClass("inactive-player-background").removeClass("active-player-background");
  }
  else{
    this.currentPlayer = this.player1;
    $("#hidden1").addClass("active-player-background");
    $("#hidden1").removeClass("inactive-player-background");
    $('#hidden2').addClass("inactive-player-background").removeClass("active-player-background");
  }
  return this.currentPlayer;
}

Game.prototype.rollTheDice = function(){
    const dice = Math.floor(Math.random()*6)+1;
  return dice;
}


$(document).ready(function(){

let p1 = new Player();
let p2 = new Player();

p1.name = "player1";
p2.name = "player2";
let game = new Game(p1, p2);

  $("#btn").click(function(event){
    event.preventDefault();

    $('#output2').text(`${p2.name}`);
    $('#output1').text(`${p1.name}`);
    $('#field1').text(`${p1.currentScore}`);
    $('#field2').text(`${p2.currentScore}`);

    let result = game.rollTheDice();
    $("img").attr("src", "img/dice-"+ result + ".png");

    if (result==1){
      game.currentPlayer.resetScore();
      game.changeThePlayer();
    }
    else{
      game.currentPlayer.newScore(result);
    }

    $('#field1').text(`${p1.currentScore}`);
    $('#field2').text(`${p2.currentScore}`);
  });

  $('#btn1').click(function(){
    game.changeThePlayer();
    $('#field1').text(`${p1.currentScore}`);
    $('#field2').text(`${p2.currentScore}`);
  });
});