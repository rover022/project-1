require("Board");

// Initialize the board so the fields array will be sent with ChallengeStartedMessage.
var challengeID = Spark.getData().challenge.challengeId;
var board = createBoard(challengeID);