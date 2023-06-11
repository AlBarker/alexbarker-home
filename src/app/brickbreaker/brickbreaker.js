window.onload = () => {
const brickWidth = 60;
const brickHeight = 20;
const brickRows = 5;
const brickCols = 10;
const paddleWidth = 80;
const paddleHeight = 10;

    var ctx = document.getElementById("canvas");

    // ctx.width  = window.innerWidth;
    // ctx.height = window.innerHeight;

    var pen = ctx.getContext("2d");

    pen.fillStyle = "red";

    for (let i = 0; i < brickRows; i++) {
        for (let j = 0; j < brickCols; j++) {
            var x1 = j * brickWidth + 1;
            var y1 = i * brickHeight + 1;

            var x2 = x1 + brickWidth - 2;
            var y2 = y1 + brickHeight - 2;

            pen.fillRect(x1, y1, brickWidth - 1, brickHeight - 1);
            // pen.strokeRect(x1, x2, y1, y2);
        }
    }
    console.log(canvas.width)
    console.log(canvas.height)
    pen.fillStyle = "green";


    pen.fillRect(canvas.width / 2 - paddleWidth / 2, 480, paddleWidth, paddleHeight);
    
    pen.strokeStyle = "yellow";
    pen.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI, false);
    pen.stroke();
}   