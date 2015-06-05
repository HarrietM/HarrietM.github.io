function Game(){
 this.board = [];
 this.WIN_STATES = [[-1,1,2],[1,2,3],[-3,-2,-1],[-2,-1,1]];
 this.won = false;
}

Game.prototype = {
  createBoard: function(){
    for (var r = 0; r < 6; r++){
      this.board.push([]);
      for (var c = 0; c < 7; c++){
        this.board[r].push(new Tile());
      }
    }
    // transpose board
    var board = this.board;
    this.board = board[0].map(function(c, i){
      return board.map(function(r){
        return r[i];
      });
    });
  },

  placePlayerPiece: function(r, player, view){
    var board = this.board;
    var r = r.selector
    for (var i = 5; i >= 0; i--){
      if (board[r][i].status == 0){
        board[r][i].status = player.num;
        view.tileID(r, i, player.num)
        if (player.num == 1){
          player.num = 2
        }else {
          player.num = 1
        }
        this.win(r,i,view)
        break;
      }
    }
  },

  win: function(r,c,view){
    var board = this.board;
    if(this.checkForWin(r,c)){
      var winner = board[r][c].status;
      view.win(winner)
    }
  },

  checkForWin: function(r,c){
    var that = this;
    var player = that.board[r][c].status;

    this.WIN_STATES.forEach(function(state){
     var verticalStatus = [];
     var horizontalStatus = [];
     var diagonalStatus = [];
     var secondayDiagonalStatus = [];
     state.forEach(function(coordinate){
        if(that.horizontalWin(r,c,coordinate, player)){
          horizontalStatus.push(1)
        }else if(that.verticalWin(r,c,coordinate, player)){
          verticalStatus.push(1)
        }else if(that.diagonalWin(r,c,coordinate,player)){
          diagonalStatus.push(1)
        }else if(that.secondaryDiagonalWin(r,c,coordinate,player)){
          secondayDiagonalStatus.push(1)
        }
      });
     if(verticalStatus.length == 3 || horizontalStatus.length == 3 || diagonalStatus.length == 3 || secondayDiagonalStatus.length == 3){
       that.won = true
     }
    });

    return that.won;
  },

  diagonalWin: function(r,c,coordinate,player) {
    var row = Number(r)+Number(coordinate);
    var column = Number(c)+Number(coordinate);
    return this.check(row,column,player)
  },

  secondaryDiagonalWin: function(r,c,coordinate,player){
    var row = (Number(r)+Number(coordinate));
    var column = (Number(c)-(Number(coordinate)));
    return this.check(row,column,player)
  },

  horizontalWin: function(r,c,coordinate,player){
    var row = Number(r);
    var column = Number(c) + Number(coordinate);
    return this.check(row,column,player)
  },

  verticalWin: function(r,c,coordinate,player){
    var row = Number(r) + Number(coordinate);
    var column = Number(c)
    return this.check(row, column, player)
  },

  check: function(row,column,player){
    var that = this;
    var status = false;
    if(that.inBounds(row,column)){
      if(that.board[row][column].status == player){
        status = true
      }
    }
    return status
  },

  inBounds: function(r, c) {
   if(r >= 0 && r < 7){
    if(c >= 0 && c < 6){
      return true
    }
   }
  }

}