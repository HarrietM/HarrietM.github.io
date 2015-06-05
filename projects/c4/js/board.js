function Board(selector){
  this.selector = selector;
}

Board.prototype = {

  load: function(){
    $(this.selector).append("<div class='board'></div>");

    for (var i = 0; i < 7; i++){
      var columnButton = "<div class='column-button' id="+i+"></div>";
      $(".board").append(columnButton);
    }

    for (var c = 0; c < 6; c++){
      for (var r = 0; r < 7; r++){
        var tile = "<div class='tile' id=r"+r+"_c"+c+"></div>"
        $(".board").append(tile);
      }
    }
  },

  selectColumn: function(game, player, tileID) {
    $(this.selector).on("click", ".column-button", function(e){
      e.preventDefault();
      game.placePlayerPiece($(e.target.id), player, tileID);
    });
  },

  tileID: function(r, i, num){
    $("#r"+r+"_c"+i).addClass("player"+num)
  },

  win: function(winner){
    swal("Player "+winner, "You are the winner!", "success")
  }

}