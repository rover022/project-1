require("Board");

var challengeID = Spark.getData().challengeInstanceId;
var challenge = Spark.getChallenge(challengeID);
var player = Spark.getPlayer();
var playerID = player.playerId;
var x = Spark.getData().X;
var y = Spark.getData().Y;

var board = createBoard(challengeID);
var piece = challenge.getChallengerId() === playerID ? HEARTS_PIECE : SKULLS_PIECE;
if (board.tryMove(x, y, piece)) {
    challenge.takeTurn(playerID);
    if (board.checkWinConditions(x, y)) {
        challenge.winChallenge(player);
    }
}