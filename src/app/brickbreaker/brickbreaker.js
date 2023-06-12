const brickWidth = 60;
const brickHeight = 20;
const brickRows = 5;
const brickCols = 10;
const paddleWidth = 80;
const paddleHeight = 10;
const gameWindowWidth = 600;

const paddleSpeed = 10;

var paddlePos = {
    x: gameWindowWidth / 2 - paddleWidth / 2,
    y: 480,
}

var newPaddlePos = paddlePos;

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
    pen.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI, false);
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

drawGameBoard = (timestamp) => {
    var ctx = document.getElementById("canvas");
    var pen = ctx.getContext("2d");

    drawBricks(pen);
    drawPaddle(pen);
    drawBall(pen);
        
    requestAnimationFrame(drawGameBoard);
}