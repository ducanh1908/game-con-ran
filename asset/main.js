let cvs  = document.getElementById('canvas');
let gameSize = 800;
cvs.width = cvs.height = gameSize;
let ctx  = cvs.getContext('2d');
let box = 32;

// load ảnh 
let imgGround = new Image(500,500);
imgGround.src = './asset/img/ground.png';

let imgFood = new Image();
imgFood.src = './asset/img/food.png';

// up audio 
let dead = new Audio();
let eat = new Audio();
dead.src = "./asset/audio/dead.mp3"
eat.src = "./asset/audio/eat.mp3"

// Tạo Snake ; tọa độ ban đầu của con rắn
    
let snake = [];
snake[0] = {
    x: 7* box,
    y : 7 * box,
}

// Tạo trái táo

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Tạo điểm

let score = 0;


let d;
document.addEventListener('keydown',direction);
function direction(event) {
    if(event.keyCode == 37 && d !="RIGHT") {
        d= "LEFT"
    } 
    else if(event.keyCode == 38 && d !="DOWN") {
        d= "UP"
    }
    else if(event.keyCode == 39 && d !="LEFT") {
        d= "RIGHT"   
    }
    else if(event.keyCode == 40 && d !="UP") {
        d= "DOWN"   
    }
}
// kiểm tra hàm collision 
function collision(head,array){
    for(const element of array){
        if(head.x == element.x && head.y == element.y)
        {
            return true;
        }   
    }
    return false;
    
}

// gọi hàm vẽ 
function draw() {

    ctx.drawImage(imgGround, 0,0);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green": "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx. strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(imgFood, food.x, food.y);
// vị trí cũ của đầu rắn
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

// Hướng đi của rắn

    if(d == "LEFT") snakeX -=box;
    if(d == "UP") snakeY -=box;
    if(d == "RIGHT") snakeX +=box;
    if(d == "DOWN") snakeY +=box;

// Nếu con rắn ăn thức ăn
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    else {
// Xóa đuôi
        snake.pop();
    }
// Thêm đâu
    let newHead = {
        x: snakeX,
        y: snakeY
    }
// kết thúc game 

    if(snakeX < box || snakeX > 17* box || snakeY < 3*box
        ||snakeY > 17*box || collision(newHead, snake)) {  
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = " 45px Change one";
    ctx.fillText(score, 2*box, 1.6*box);
}
let game = setInterval(draw, 300);




