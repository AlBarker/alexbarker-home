const brickWidth = 60;
const brickHeight = 20;
const brickRows = 5;
const brickCols = 10;
const paddleWidth = 80;
const paddleHeight = 10;
const gameWindowWidth = 600;
const gameWindowHeight = 500;
const paddleSpeed = 10;
const ballSpeed = 3;
const ballRadius = 8;

var paddlePos = {
    x: gameWindowWidth / 2 - paddleWidth / 2,
    y: 480,
};
var newPaddlePos = paddlePos;

var ballPos = { 
    x: 100,
    y: 200,
};

var newBallPos = ballPos;

var ballTrajectory = 20;

window.onload = () => {
    drawGameBoard();
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
    console.log(key);
});

drawPaddle = (pen) => {
    pen.fillStyle = "green";
    pen.clearRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight);
    paddlePos = newPaddlePos;
    pen.fillRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight);
}

drawBall = (pen) => {
    pen.strokeStyle = "yellow";

    // top left corner
    var rectX = ballPos.x - ballRadius;
    var rectY = ballPos.y - ballRadius;

    pen.clearRect(rectX - 1, rectY - 1, ballRadius * 2  + 2, ballRadius * 2 + 2);

    ballPos = {
        x: ballPos.x + ballSpeed * Math.cos(ballTrajectory * Math.PI / 180),
        y: ballPos.y + ballSpeed * Math.sin(ballTrajectory * Math.PI / 180),
    }

    if (didCollideWithPaddle(ballPos, ballRadius, paddlePos, paddleWidth)) {
        ballTrajectory = 360 - ballTrajectory;
    }

    if(ballPos.x <= 0 || ballPos.x >= gameWindowWidth) {
        ballTrajectory =  180 - ballTrajectory;
    }

    if(ballPos.y <= 0 || ballPos.y >= gameWindowHeight) {
        ballTrajectory =  360 - ballTrajectory;
    }

    pen.beginPath();
    pen.arc(ballPos.x, ballPos.y, ballRadius, 0, 2 * Math.PI, false);
    pen.stroke();
}

drawBricks = (pen) => {
    pen.fillStyle = "red";

    for (let i = 0; i < brickRows; i++) {
        for (let j = 0; j < brickCols; j++) {
            var x1 = j * brickWidth + 1;
            var y1 = i * brickHeight + 1;

            pen.fillRect(x1, y1, brickWidth - 1, brickHeight - 1);
        }
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

drawGameBoard = (timestamp) => {
    var ctx = document.getElementById("canvas");
    var pen = ctx.getContext("2d");

    drawBricks(pen);
    drawPaddle(pen);
    drawBall(pen);
        
    requestAnimationFrame(drawGameBoard);   
}
