const brickWidth = 60;
const brickHeight = 20;
const brickRows = 5;
const brickCols = 10;
const paddleWidth = 80;
const paddleHeight = 10;
const gameWindowWidth = 600;
const gameWindowHeight = 500;
const paddleSpeed = 12;
const ballRadius = 8;
const brickColourStyle = 'rgb(227, 7, 20)';
const paddleColourStyle = 'rgb(227, 7, 20)';
const ballColourStyle = 'white';

var ballSpeed;
var paddlePos;
var newPaddlePos;
var ballPos;
var newBallPos;
var ballTrajectory;
var currentBricks;
var allbricks;
var currentBrickCount;
var prevTimestamp;

initBrickArray = (brickRows, brickCols, brickWidth, brickHeight) => {
    var toReturn = [];
    for (let i = 0; i < brickRows; i++) {
        for (let j = 0; j < brickCols; j++) {
            var x1 = j * brickWidth + 1;
            var y1 = i * brickHeight + 1;
            
            toReturn.push({ x: x1, y: y1 });
        }
    }

    return toReturn;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'ArrowLeft') {
        event.preventDefault();
        newPaddlePos = {
            x: Math.max(0, paddlePos.x - paddleSpeed),
            y: paddlePos.y,
        }
    }

    if (key === 'ArrowRight') {
        event.preventDefault();
        newPaddlePos = {
            x: Math.min(gameWindowWidth - paddleWidth, paddlePos.x + paddleSpeed),
            y: paddlePos.y,
        }
    }
});

drawPaddle = (pen) => {
    pen.fillStyle = paddleColourStyle;
    pen.clearRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight);
    paddlePos = newPaddlePos;
    pen.fillRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight);
}

drawBall = (pen, timeDiff) => {
    pen.strokeStyle = ballColourStyle;

    // top left corner
    var rectX = ballPos.x - ballRadius;
    var rectY = ballPos.y - ballRadius;

    pen.clearRect(rectX - 1, rectY - 1, ballRadius * 2  + 2, ballRadius * 2 + 2);

    var velocity = ballSpeed * timeDiff;
    console.log(velocity)

    ballPos = {
        x: ballPos.x + velocity * Math.cos(ballTrajectory * Math.PI / 180),
        y: ballPos.y + velocity * Math.sin(ballTrajectory * Math.PI / 180),
    }

    if (didCollideWithPaddle(ballPos, ballRadius, paddlePos, paddleWidth)) {
        ballTrajectory = 360 - ballTrajectory;
    }   

    var brickCollider = didCollideWithBrick(ballPos, ballRadius, currentBricks, brickWidth, brickHeight); 
    if (brickCollider.index >= 0) {
        if (brickCollider.isVertical) {
            ballTrajectory = 360 - ballTrajectory;
        } else {
            ballTrajectory = 180 - ballTrajectory;
        }

        currentBricks.splice(brickCollider.index, 1);
        if (currentBricks.length === 0) { 
            handleWin();
        }
    }

    if(ballPos.x <= 0 || ballPos.x >= gameWindowWidth) {
        ballTrajectory =  180 - ballTrajectory;
    }

    if(ballPos.y <= 0) {
        ballTrajectory =  360 - ballTrajectory;
    }

    if (ballPos.y >= gameWindowHeight) {
        handleLoss();
    }

    pen.beginPath();
    pen.arc(ballPos.x, ballPos.y, ballRadius, 0, 2 * Math.PI, false);
    pen.stroke();
}

drawBricks = (pen) => {
    if (currentBrickCount === currentBricks.length) {
        return;
    }

    currentBrickCount = currentBricks.length;

    for (let i = 0; i < allBricks.length; i ++) {
        var brick = allBricks[i];
        pen.clearRect(brick.x, brick.y, brickWidth -1, brickHeight -1);
    }
    
    pen.fillStyle = brickColourStyle;
    for (let i = 0; i < currentBricks.length; i++) {
        var brick = currentBricks[i];
        pen.fillRect(brick.x, brick.y, brickWidth - 1, brickHeight - 1);
    }
}

didCollideWithPaddle = (ballPos, ballRadius, paddlePos, paddleWidth) => {
    if (ballPos.x + ballRadius <= paddlePos.x + paddleWidth && ballPos.x >= paddlePos.x) {
        if (ballPos.y + ballRadius >= paddlePos.y) {
            return true;
        }
    }
    return false;
}

didCollideWithBrick = (ballPos, ballRadius, bricks, brickWidth, brickheight) => {
    for (var i = 0; i < bricks.length; i++) {
        // left side of ball is inside left brick edge && right side of ball is inside right brick edge
        if (ballPos.x - ballRadius > bricks[i].x && ballPos.x + ballRadius < bricks[i].x + brickWidth) {

            // top of ball inside bottom of brick and top of ball below brick
            if (ballPos.y - ballRadius < bricks[i].y + brickHeight && ballPos.y - ballRadius > bricks[i].y) {
                return { index: i, isVertical: true };
            }

            // bottom of ball inside top of brick and bottom of ball above brick
            if (ballPos.y + ballRadius > bricks[i].y && ballPos.y + ballRadius < bricks[i].y) {
                return { index: i, isVertical: true };
            }
        }

        // top of ball is inside top of brick and bottom of ball is inside bottom of brick
        if (ballPos.y - ballRadius > bricks[i].y && ballPos.y + ballRadius < bricks[i].y + brickHeight) {

            // right side of ball inside left of brick and left side of ball left of brick
            if (ballPos.x + ballRadius > bricks[i].x && ballPos.x - ballRadius < bricks[i].x) {
                return { index : i, isVertical: false };
            }

            // left side of ball inside right of brick and right side of ball right of brick
            if (ballPos.x - ballRadius < bricks[i].x + brickWidth && ballPos.x + ballRadius > bricks[i].x + brickWidth) {
                return { index: i, isVertical: false};
            }
        }
    }
    return -1;
}

drawGameBoard = (timestamp) => {
    var ctx = document.getElementById("canvas");
    var pen = ctx.getContext("2d");

    var timeDiff = 1;
    if (timestamp) {
        timeDiff = timestamp - prevTimestamp;
    }

    if (!timeDiff) {
        timeDiff = 1;
    }
    prevTimestamp = timestamp;
    drawBricks(pen);
    drawPaddle(pen);
    drawBall(pen, timeDiff);
        
    requestAnimationFrame(drawGameBoard);   
}

startGame = () => {
    var canvas = document.getElementById("canvas");
    var startContainer = document.getElementById("start");
    var gameOverContainer = document.getElementById("game-over");
    var wonContainer = document.getElementById("won");

    canvas.style.display = 'block';
    startContainer.style.display = 'none';
    gameOverContainer.style.display = 'none';
    wonContainer.style.display = 'none';

    ballPos = { 
        x: 100,
        y: 200,
    };

    paddlePos = {
        x: gameWindowWidth / 2 - paddleWidth / 2,
        y: 480,
    };

    ballTrajectory = 45;
    ballSpeed = 0.3;

    currentBricks = initBrickArray(brickRows, brickCols, brickWidth, brickHeight);

    allBricks = [...currentBricks];
    currentBrickCount = 0;
    newPaddlePos = paddlePos;
    newBallPos = ballPos;
    prevTimestamp = 0;

    var pen = canvas.getContext("2d");
    pen.clearRect(0, 0, gameWindowWidth, gameWindowHeight);

    drawGameBoard();
}

handleLoss = () => {
    var canvas = document.getElementById("canvas");
    var gameOverContainer = document.getElementById("game-over");

    canvas.style.display = 'none';
    gameOverContainer.style.display = 'flex';
}

handleWin = () => {
    var canvas = document.getElementById("canvas");
    var wonContainer = document.getElementById("won");

    canvas.style.display = 'none';
    wonContainer.style.display = 'flex';
}
