function boardController(selector){
  this.selector = $(selector);
  this.board = new Board(this.selector);
  this.game = new Game();
  this.player = new Player();
}

boardController.prototype.run = function(){

  this.board.load();
  this.game.createBoard();
  this.board.selectColumn(this.game, this.player, this.board);

}