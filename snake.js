const canvas = document.getElementById("canvas");
canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;";
const ctx = canvas.getContext("2d")

const box = 32;
const foodImg = new Image();
foodImg.src = "apple.png";

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 14 + 4) * box
}

let score = 0;
let d;

document.addEventListener("keydown", pressed);

function pressed(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } if (event.keyCode == 38 && d != 'DOWN') {
        d = "UP";
    } if (event.keyCode == 39 && d != 'LEFT') {
        d = "RIGHT";
    } if (event.keyCode == 40 && d != 'UP') {
        d = "DOWN";
    }
}

function setInitial() {
    ctx.fillStyle = "#4d7900";
    ctx.fillRect(0, 0, 19 * box, 3 * box);
    ctx.fillStyle = "#588b00"
    ctx.fillRect(0, 3 * box, 19 * box, 16 * box);
    ctx.fillStyle = "#8bbe32";
    ctx.fillRect(box, 4 * box, 17 * box, 14 * box);
    ctx.fillStyle = "#7cb619";
    for (let i = 0; i < 14; i++) {
        if (i % 2 == 0) {
            for (let j = 1; j < 17; j += 2) {
                ctx.fillRect((1 + j) * box, (4 + i) * box, box, box);
            }
        } else {
            for (let j = 0; j < 17; j += 2) {
                ctx.fillRect((1 + j) * box, (4 + i) * box, box, box);
            }
        }
    }
}

function collision(head, array){
    for (let i=1;i<array.length;i++){
        if (head.x == array[i].x && head.y==array[i].y){
            return true;
        }
    }
    return false;
}


function draw() {
    setInitial();
    ctx.drawImage(foodImg, .5 * box, .5 * box, 2 * box, 2 * box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        // ctx.strokeStyle = "red";
        // ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 14 + 4) * box
        }
    } else {

        snake.pop();
    }

    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    // if (snakeX<box || snakeX>17*box || snakeY<4*box || snakeY>17*box){
    //     clearInterval(game);
    // }

    if (snakeX<box){
        snakeX=17*box;
    }
    if (snakeX>17*box){
        snakeX=box;
    }

    if (snakeY<4*box){
        snakeY=17*box;
    }
    if (snakeY>17*box){
        snakeY=4*box;
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (collision(newHead,snake)){
        clearInterval(game);
    }

    

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one "
    ctx.fillText(score, 3 * box, 2 * box);
}

let game = setInterval(draw, 100);