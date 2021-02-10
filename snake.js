const canvas = document.getElementById("canvas");
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
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0;
let d;

document.addEventListener("keydown", pressed);

function pressed(event){
    if (event.keyCode == 37){
        d="LEFT";
    }if (event.keyCode == 38){
        d="UP";
    }if (event.keyCode == 39){
        d="RIGHT";
    }if (event.keyCode == 40){
        d="DOWN";
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
                ctx.fillRect((1+j)*box,(4+i)*box,box,box);
            }
        }else{
            for (let j = 0; j < 17; j += 2) {
                ctx.fillRect((1+j)*box,(4+i)*box,box,box);
            }
        }
    }
}


// setInitial();

function draw(){
    setInitial();
    ctx.drawImage(foodImg, .5*box, .5*box,2*box,2*box);

    for (let i=0;i<snake.length;i++){
        ctx.fillStyle= (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle= "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg,food.x,food.y,box,box);

    let snakeX = snake[0].x;
    console.log(snakeX);
    let snakeY = snake[0].y;
    console.log(snakeY);

    snake.pop();

    if (d=="LEFT") snakeX-=box;
    if (d=="RIGHT") snakeX+=box;
    if (d=="UP") snakeY-=box;
    if (d=="DOWN") snakeY+=box;

    let newHead = {
        x:snakeX,
        y:snakeY
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one "
    ctx.fillText(score,3*box, 2*box);
}

let game = setInterval(draw, 100);