const EMPTY_PIECE = 0;
const HEARTS_PIECE = 1;
const SKULLS_PIECE = 2;

// Module design pattern.
var createBoard = function(challengeID) {
    
    const BOARD_SIZE = 15;
    const CONSECUTIVE_PIECES_NEEDED = 5;
    const FIELDS_DATA_NAME = "fields";
    
    var fields;
    
    var tryMove = function(x, y, piece) {
        if (isPositionValid(x, y) && getField(x, y) === EMPTY_PIECE) {
            setField(x, y, piece);
            saveFields();
            return true;
        }
        else {
            return false;
        }
    };
    
    var isPositionValid = function(x, y) {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    };
    
    var checkWinConditions = function(x, y) {
        var originalPiece = getField(x, y);
        return checkHorizontal(x, y, originalPiece) || checkVertical(x, y, originalPiece) || checkFirstDiagonal(x, y, originalPiece) || checkSecondDiagonal(x, y, originalPiece);
    };
    
    var getField = function(x, y) {
        var index = x + y * BOARD_SIZE;
        return fields[index];
    };
    
    var setField = function(x, y, piece) {
        var index = x + y * BOARD_SIZE;
        fields[index] = piece;
    };
    
    var initialize = function() {
        var challenge = Spark.getChallenge(challengeID);
        fields = challenge.getScriptData(FIELDS_DATA_NAME);
        if (fields === null) {
            createFields();
            saveFields();
        }
    };
    
    var createFields = function() {
        fields = [];
        var fieldCount = BOARD_SIZE * BOARD_SIZE;
        for (var i = 0; i < fieldCount ; i++) {
            fields.push(EMPTY_PIECE);
        }
    };
    
    var saveFields = function() {
        var challenge = Spark.getChallenge(challengeID);
        challenge.setScriptData(FIELDS_DATA_NAME, fields);
    };
    
    var checkHorizontal = function(x, y, originalPiece) {
        var consecutivePieces = 1 + countRecursivelyInDirection(x, y, -1, 0, originalPiece) + countRecursivelyInDirection(x, y, 1, 0, originalPiece);
        return consecutivePieces === CONSECUTIVE_PIECES_NEEDED;
    };

    var checkVertical = function(x, y, originalPiece) {
        var consecutivePieces = 1 + countRecursivelyInDirection(x, y, 0, -1, originalPiece) + countRecursivelyInDirection(x, y, 0, 1, originalPiece);
        return consecutivePieces === CONSECUTIVE_PIECES_NEEDED;
    };

    var checkFirstDiagonal = function(x, y, originalPiece) {
        var consecutivePieces = 1 + countRecursivelyInDirection(x, y, -1, 1, originalPiece) + countRecursivelyInDirection(x, y, 1, -1, originalPiece);
        return consecutivePieces === CONSECUTIVE_PIECES_NEEDED;
    };

    var checkSecondDiagonal = function(x, y, originalPiece) {
        var consecutivePieces = 1 + countRecursivelyInDirection(x, y, -1, -1, originalPiece) + countRecursivelyInDirection(x, y, 1, 1, originalPiece);
        return consecutivePieces === CONSECUTIVE_PIECES_NEEDED;
    };
    
    var countRecursivelyInDirection = function(x, y, xDelta, yDelta, originalPiece) {
        var newX = x + xDelta;
        var newY = y + yDelta;
        if (isPositionValid(newX, newY) && getField(newX, newY) === originalPiece) {
            return 1 + countRecursivelyInDirection(newX, newY, xDelta, yDelta, originalPiece)
        }
        else {
            return 0;
        }
    };
    
    initialize();
    return {
        tryMove : tryMove,
        isPositionValid : isPositionValid,
        checkWinConditions : checkWinConditions
    };
};