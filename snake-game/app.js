const canvas = document.querySelector("Canvas");
const ctx = canvas.getContext("2d");


const UNIT_SIZE = 20;

class Snake {
    constructor() {
        this.tail = [{ x: 0, y: 0 }]; //snake tail
        this.direction = 'R';  //change snake direction
    }

    move() {
        const snakeHead = this.tail[this.tail.length - 1];
        let newCoord;
        if (this.direction == 'R') {
            newCoord = {
                x: snakeHead.x + UNIT_SIZE,
                y: snakeHead.y
            }
        } else if (this.direction == 'L') {
            newCoord = {
                x: snakeHead.x - UNIT_SIZE,
                y: snakeHead.y
            }
        } else if (this.direction == 'U') {
            newCoord = {
                x: snakeHead.x,
                y: snakeHead.y - UNIT_SIZE
            }
        } else if (this.direction == 'D') {
            newCoord = {
                x: snakeHead.x,
                y: snakeHead.y + UNIT_SIZE
            }
        }
        this.tail.push(newCoord);
        this.tail.shift();

    }

    draw() {
        for (let coord of this.tail) {
            this.drawSnake(coord.x, coord.y, UNIT_SIZE, UNIT_SIZE, "white");
        }


    }

    drawSnake(x, y, width, height, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}

class Apple {
    constructor() {
        //check apple not generate in snake tail

        let isTouched = false;
        while (true) {
            this.x = Math.floor(Math.random() * canvas.width / UNIT_SIZE) * UNIT_SIZE;
            this.y = Math.floor(Math.random() * canvas.height / UNIT_SIZE) * UNIT_SIZE;

            for (let coord of snake.tail) {
                if (coord.x == this.x && coord.y == this.y)
                    isTouched = true;
            }
            if (!isTouched) {
                break;
            }
            isTouched = false;
        }

    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'Red';
        ctx.arc(this.x + UNIT_SIZE / 2, this.y + UNIT_SIZE / 2, UNIT_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}


let snake = new Snake();
let apple = new Apple();

let isOVer = false;

//check snake goes outside boundries
function checkBoundries() {
    const snakeHead = snake.tail[snake.tail.length - 1];
    if (snakeHead.x > canvas.width)
        snakeHead.x = 0;
    else if (snakeHead.x < 0)
        snakeHead.x = canvas.width;
    else if (snakeHead.y < 0)
        snakeHead.y = canvas.height;
    else if (snakeHead.y > canvas.height)
        snakeHead.y = 0;
}
function eatApple() {
    const snakeHead = snake.tail[snake.tail.length - 1];
    if (snakeHead.x == apple.x && snakeHead.y == apple.y) {
        snake.tail.push({
            x: snakeHead.x,
            y: snakeHead.y
        });

        apple = new Apple();
    }

}
function checkSelfCollison() {
    const snakeHead = snake.tail[snake.tail.length - 1];

    for (let i = 0; i < snake.tail.length - 2; i++) {
        if (snakeHead.x == snake.tail[i].x && snakeHead.y == snake.tail[i].y) {
            isOVer = true;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px  Arial";
    ctx.textAlign = "center";

    ctx.fillStyle = "white";
    ctx.fillText("Score : " + (snake.tail.length - 1), canvas.width - 50, 20);
    if (!isOVer) {
        snake.draw();
        apple.draw();
        snake.move();
        checkBoundries();
        eatApple();
        checkSelfCollison();
    } else {
        ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2);
    }
}

window.onkeydown = ({ key }) => {

    if (key == 'a' && snake.direction != 'R') {
        snake.direction = 'L';
    } else if (key == 's' && snake.direction != 'U') {
        snake.direction = 'D';
    } else if (key == 'd' && snake.direction != 'L') {
        snake.direction = 'R';
    } else if (key == 'w' && snake.direction != 'D') {
        snake.direction = 'U';
    }

}

function start() {
    setInterval(gameLoop, 1000 / 15); //set fps to 10
}
start();