// First player in a match will be the challenger.
if (Spark.getPlayer().getPlayerId() === Spark.getData().participants[0].id) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var request = new SparkRequests.CreateChallengeRequest();
    request.challengeShortCode = "DefaultChallenge";
    request.endTime = tomorrow.toISOString();
    request.usersToChallenge = Spark.getData().participants[1].id;
    request.Send();
}