const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 650;
let gameFrame = 0;
let score = 0;
let count = 1;
let played;
let pressed = false;
let stopGame = false;
let keys = [];
let objectArray = [];
let objectArray2 = [];
let timer = 200;
let pictureArray1 = ["Wiz2/wiz2lookR-footL.png", "Wiz2/wiz2lookR-footR.png"];
let pictureArray2 = ["Wiz2/wiz2LookL-footL.png", "Wiz2/wiz2LookL-footR.png"];

//images enter
const backgrass = new Image();
backgrass.src = "backgroundwide.png";
const backpicture = new Image();
backpicture.src = "background.svg";
const cloud = new Image();
cloud.src = "cloud.png";
const playerspirite = new Image();
playerspirite.src = "Wiz2/wiz2stop.png";
//levá strana 
const playerStepL = new Image();
playerStepL.src = pictureArray2[0];
//pravá strana
const playerStepR = new Image();
playerStepR.src = pictureArray1[0];
//images enter

//keyboard enter
window.addEventListener("keydown", function(event){
    keys[event.key] = true;
});
window.addEventListener("keyup", function(event){
    delete keys[event.key];
    pressed = false;
});
//keyboard enter

class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.cx1 = 650;
        this.cx2 = 900;
        this.cx3 = 1100;
        this.cy = 200;
        this.width = canvas.width;
        this.height = canvas.height;
        this.cwidth = 56;
        this.cheight = 28.8;
        this.speed = 2;
        this.speed2 = 5;
    }
    draw(){
        ctx.drawImage(backgrass, this.x, this.y, 1300, 650);
        ctx.drawImage(backpicture, 0, this.y, 650, 500);
    }
    drawCloud(){
        ctx.drawImage(cloud, this.cx1, this.cy, this.cwidth * 1.5, this.cheight * 1.5);
        ctx.drawImage(cloud, this.cx2, this.cy - 150, this.cwidth * 1.8, this.cheight * 1.8);
        ctx.drawImage(cloud, this.cx3, this.cy - 80, this.cwidth * 2, this.cheight * 2);
    }
    updateGrass(){
        this.x -= this.speed2 + score / 100;
        if (this.x <= - 650){
            this.x = 0;
        }
    }
    updateCloud(){
        if (background.cx1 <= -150){
            background.cx1 = 680;
        } else {background.cx1 -= this.speed + score / 20;
        }
        if (background.cx2 <= -150){
            background.cx2 = 700;
        } else {background.cx2 -= this.speed + score / 35;
        }
        if (background.cx3 <= -150){
            background.cx3 = 750;
        } else {background.cx3 -= this.speed + score / 50;
        }
    }
}
const background = new Background();

class Player {
    static DEFALUT_SIZE = 50;
    constructor(){
        this.x = 0;
        this.y = 500;
        this.size = Player.DEFALUT_SIZE;
        this.width = 32;
        this.height = 48;
        this.speed = 5;
        this.jump = 50;
        this.fall = 500;
        this.moveing = true;
        this.step = 0;
    }
    draw(){
        if (pressed == false){
            ctx.drawImage(playerspirite, this.x, this.y - this.height, this.width, this.height);
        } else if (keys['a'] && keys['d'] && this.moveing == true){
            ctx.drawImage(playerspirite, this.x, this.y - this.height, this.width, this.height);
        }
    }
    move(){
        if (this.moveing == true){
            if (keys['d'] && !keys['a'] && this.x < 600){
                this.x += this.speed; 
                pressed = true;
                if(gameFrame % 20 == 0){this.step++;}
                playerStepR.src = pictureArray1[this.step % pictureArray1.length];
                ctx.drawImage(playerStepR, this.x, this.y - this.height, this.width, this.height);
            } else if (this.x == 600 && pressed == true){
                ctx.drawImage(playerStepR, this.x, this.y - this.height, this.width, this.height);
            }
            if (keys['a'] && !keys['d'] && this.x > 0){
                this.x -= this.speed;
                pressed = true;
                if(gameFrame % 20 == 0){this.step++;}
                playerStepL.src = pictureArray2[this.step % pictureArray2.length];
                ctx.drawImage(playerStepL, this.x, this.y - this.height, this.width, this.height); 
            } else if (this.x == 0 && pressed == true){
                ctx.drawImage(playerStepL, this.x, this.y - this.height, this.width, this.height);
            }
            if (keys[' '] && this.y == 500 && this.y > 400){
                this.y -= 100;
            }
        }
    }
}
let player = new Player();

class Obstacle {
    static DEFALUT_SIZE = 50;
    constructor(){
        this.x = 750;
        this.y = 450;
        this.size = Obstacle.DEFALUT_SIZE;
        this.speed = 5;
        this.distance;
        this.scoreCount = false;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.closePath();
        ctx.stroke(); 
    }
    update(){
        this.x -= this.speed;
        this.speed = this.speed + score / 100;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
}

let obstacle = new Obstacle();

class Obstacle2 {
    static DEFALUT_SIZE = 50;
    constructor(){
        this.x = 750;
        this.y = 400;
        this.size = Obstacle2.DEFALUT_SIZE;
        this.speed = 5;
        this.distance;
        this.scoreCount = false;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.closePath();
        ctx.stroke(); 
    }
    update(){
        this.x -= this.speed;
        this.speed = this.speed + score / 100;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
}

function handleObject(){
    if (gameFrame % timer == 0){
        let obstacle = new Obstacle();
        let obstacle2 = new Obstacle2();
        //objectArray.push(Math.random() <= 0.75 ? obstacle : obstacle2); 
        Math.random() <= 0.70 ? objectArray.push(obstacle) : objectArray2.push(obstacle2);      
    }
    /*1*/
    for (let i = 0; i < objectArray.length;  i++){
        objectArray[i].update();
        objectArray[i].draw();
    }
    for (let i = 0; i < objectArray.length; i++){
        if (objectArray[i].distance < objectArray[i].size/2 + player.size){
            if(!objectArray[i].scoreCount){
                objectArray[i].scoreCount = true;
                if (objectArray[i].scoreCount == true){
                    score++;
                    
                }
            }
        }
    }
    for (let i = 0; i < objectArray.length; i++){
        if (objectArray[i].distance < objectArray[i].size/2 + ((player.width + player.height)/2) && player.y > 450){
            player.moveing = false;
            stopGame = true;
            break;
        }
    }
    
    for (let i = 0; i < objectArray.length; i++){
        if (objectArray[i].x < -50){
            objectArray.splice(i, 1);
            timer = timer - 1;
        }
    }
    /*1*/

    /*2*/
    for (let i = 0; i < objectArray2.length; i++){
        objectArray2[i].update();
        objectArray2[i].draw();

        if (objectArray2[i].distance > objectArray2[i].size/8 - ((player.width + player.height)/2) * 2 && (objectArray2[i].distance + player.width) < player.x){
            if(!objectArray2[i].scoreCount){
                objectArray2[i].scoreCount = true;
                if (objectArray2[i].scoreCount == true){
                    score++;  
                }
            }
        }

        if (objectArray2[i].distance < objectArray2[i].size/8 + ((player.width + player.height)/2) && player.y < 450){
            player.moveing = false;
            stopGame = true;
            break;
        }

        if (objectArray2[i].x < -50){
            objectArray2.splice(i, 1);
            timer = timer - 1;
        }
    }
    /*2*/
}

function drawScore() {
    ctx.beginPath();
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 34);
    ctx.closePath();
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleObject();
    background.draw();
    background.drawCloud();
    player.draw();
    player.move();
    gameFrame++;
    background.updateCloud();
    background.updateGrass();
    if (player.y < 500 && player.moveing == true){
        player.y++;
    }
    drawScore();
    if (stopGame) {
        gameOver();
    }else {
         played = requestAnimationFrame(animate);
    }
}
animate();

function gameOver() {
    cancelAnimationFrame(played);
    background.draw();
    player.draw();
    ctx.beginPath();
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over', 300, 300);
    ctx.closePath();
    ctx.stroke();
    drawScore();
}