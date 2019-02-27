var request = new SparkRequests.AcceptChallengeRequest();
request.challengeInstanceId = Spark.getData().challenge.challengeId;
request.Send();