
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cannon = new Cannon(canvas.width-canvas.width+80,canvas.height);
})


let cannonTop = new Image();
cannonTop.src="https://ia801504.us.archive.org/32/items/cannon_202104/cannon.png";
cannonTop.onload = renderImages;

let mousePos = null;
let angle = null;
let canShoot = true;

//Global Functions
function drawBorder() {
    ctx.fillStyle = "#666666";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//Ensure cannon balls have the correct starting position
function sortBallPos(x, y) {
    let rotatedAngle = angle;
    //Work out distance between rotation point & cannon nozzle
    let dx = x - (cannon.x + 15);
    let dy = y - (cannon.y - 50);
    let distance = Math.sqrt(dx*dx + dy*dy);
    let originalAngle = Math.atan2(dy,dx);
    //Work out new positions
    let newX = (cannon.x + 15) + distance * Math.cos(originalAngle + rotatedAngle);
    let newY = (cannon.y - 50) + distance * Math.sin(originalAngle + rotatedAngle);

    return {
        x: newX,
        y: newY
    }
}

class Cannon {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.topX = x-20;
        this.topY = y-95;
    }

    stand(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+15,this.y-50);
        ctx.lineTo(this.x+30,this.y);
        ctx.stroke();
    }

    rotateTop(){
        if(mousePos){
             angle = Math.atan2(mousePos.y, mousePos.x );
            ctx.translate((this.x+15), (this.y-50));
            ctx.rotate(angle);
            ctx.translate(-(this.x+15), -(this.y-50));
        }
    }

    draw() {
        //Draw the stand first
        this.stand();
        ctx.save();
        //Then draw the cannon
        this.rotateTop();
        ctx.drawImage(cannonTop,this.topX,this.topY,100,50);
    }
}

let cannon = new Cannon(canvas.width-canvas.width+80,canvas.height);


class CannonBall {
    constructor(angle, x, y,r,g,b) {
        this.radius = 15;
        this.mass = this.radius;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.dx = Math.cos(angle) * 15;
        this.dy = Math.sin(angle) * 15;
        this.gravity = 0.05;
        this.elasticity = 0.5;
        this.friction = 0.008;
        // this.collAudio = new Audio("https://archive.org/download/metal-block_202104/metal-block.wav");
        // this.collAudio.volume = 0.7;
        this.shouldAudio = true;
        this.timeDiff1 = null;
        this.timeDiff2 = new Date();
        this.r = r;
        this.g = g;
        this.b = b;

    }

    move() {  
        //Sort out gravity
        if(this.y + this.radius < canvas.height){
            this.dy += this.gravity;
        } 

        //Apply friction to X axis
        this.dx = this.dx - (this.dx*this.friction);

        this.x += this.dx; 
        this.y += this.dy; 
    }

    draw() {
        //Set next offsets to normal offsets
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+",255)"
        ctx.fill();
    }
}

let cannonBalls = [];

function ballHitWall(ball) {
    //A collision has occured on any side of the canvas
    if(ball.x + ball.radius > canvas.width ||
        ball.x - ball.radius < 0 ||
        ball.y + ball.radius > canvas.height ||
        ball.y - ball.radius < 0){
            if(ball.timeDiff1){
                ball.timeDiff2 = new Date() - ball.timeDiff1;
                ball.timeDiff2 < 200 ? ball.shouldAudio = false : null;
            }
            
        //Sort out elasticity & then change direction
        ball.dy = (ball.dy * ball.elasticity);

        //Right side of ball hits right side of canvas
        if(ball.x + ball.radius > canvas.width) {
            //We set the X & Y coordinates first to prevent ball from getting stuck in the canvas border
            ball.x = canvas.width - ball.radius;
            ball.dx *= -1;
        }else if(ball.x - ball.radius < 0){
            //Left side of ball hits left side of canvas
            ball.x = 0 + ball.radius;
            ball.dx *= -1;
        }else if(ball.y + ball.radius > canvas.height){
            //Bottom of ball hits bottom of canvas
            ball.y = canvas.height - ball.radius;
            ball.dy *= -1;
        }else if(ball.y - ball.radius < 0){
            //Top of ball hits top of canvas
            ball.y = 0 + ball.radius;
            ball.dy *= -1;
        }

            ball.timeDiff1 = new Date();
        }
}

function ballHitBall(ball1, ball2) {
    let collision = false;
    let dx = ball1.x - ball2.x;
    let dy = ball1.y - ball2.y;
    //Modified pythagorous, because sqrt is slow
    let distance = (dx * dx + dy * dy);
    if(distance <= (ball1.radius + ball2.radius)*(ball1.radius + ball2.radius)){
        collision = true;
    }
    return collision;
}

function collideBalls(ball1,ball2){
    //It matters that we are getting the exact difference from ball 1 & ball 2
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    //Work out the normalized collision vector (direction only)
    let vCollisionNorm = {x: dx / distance, y:dy/distance}
    //Relative velocity of ball 2
    let vRelativeVelocity = {x: ball1.dx - ball2.dx,y:ball1.dy - ball2.dy};
    //Calculate the dot product
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    //Don't do anything because balls are already moving out of each others way
    if(speed < 0) return;
    let impulse = 2 * speed / (ball1.mass + ball2.mass);
    //Becuase we calculated the relative velocity of ball2. Ball1 needs to go in the opposite direction, hence a collision.
    ball1.dx -= (impulse * ball2.mass * vCollisionNorm.x);
    ball1.dy -= (impulse * ball2.mass * vCollisionNorm.y);
    ball2.dx += (impulse * ball1.mass * vCollisionNorm.x);
    ball2.dy += (impulse * ball1.mass * vCollisionNorm.y);
    //Still have to account for elasticity
    ball1.dy = (ball1.dy * ball1.elasticity);
    ball2.dy = (ball2.dy * ball2.elasticity);
}

function collide(index) {
    let ball = cannonBalls[index];
    for(let j = index + 1; j < cannonBalls.length; j++){
        let testBall = cannonBalls[j];
        if(ballHitBall(ball,testBall)){
            collideBalls(ball,testBall);
        }
    }
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Draw Border first
    drawBorder();
    //Moving Canvas Graphics
    cannon.draw();
    ctx.restore();
    //Shoot the cannon balls
    cannonBalls.forEach((ball, index) => {
        //Moves the balls
        ball.move();
        ballHitWall(ball);
        collide(index);
        //Renders balls to canvas
        ball.draw();
    });
    ctx.fillStyle = "black"

    ctx.font = "bold 48px Arial";
    ctx.fillText("중력 대포",100,120);    

    ctx.font = "bold 24px Arial";
    ctx.fillText("아직 시도중이다.",100,200);    
    ctx.fillText("기존 CodePen에 떠돌던 코드를 가져와 수정작업하였다.",100,240);    
    ctx.fillText("꽤나 자연스러운 물리엔진을 만든것같은데 이 코드를 분석해보기로 하였다.",100,280);    
    ctx.fillText("추가로 꽤나 자연스러운 마우스 상대좌표를 구하는 방법도 배웠다.",100,320);    

    ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,360);   

}

let imgCount = 1;
//Start application now because images have loaded
function renderImages(){
    if(--imgCount>0){return}
    //Call animate() when all images have loaded
    animate();
}

//Mouse has moved
canvas.addEventListener("mousemove", event => {

    mousePos = {
        x: event.clientX - canvas.clientLeft,
        y: event.clientY - window.innerHeight
    }
    console.log(event.clientX - canvas.clientLeft);


    // mouse.x = event.clientX - canvas.offsetLeft,
    // mouse.y = event.clientY - canvas.offsetTop

    // console.log(event.clientY - canvas.offsetLeft);
    // 위 내용을 상호작용 예제에 적용시켜보다 발견한 정답이다.
    //  아직 이 문서의 코드는 완전히 해석하지 못해서
    // 왜 저렇게 해야 먹히는지는 더 디컴파일 해봐야 알것같다.
    
});

canvas.addEventListener("click", e => {
    //We don't want to be able to shoot a ball at this angle!
    if(angle < -2 || angle > 0.5) return;

    if(!canShoot) return;
    canShoot = false;

    let ballPos = sortBallPos(cannon.topX + 100, cannon.topY + 30);
    var r = Math.random()*255;
    var g = Math.random()*255;
    var b = Math.random()*255;
    cannonBalls.push( 
        new CannonBall(angle, ballPos.x, ballPos.y,r,g,b)
        );
    

    //Can only shoot cannon 1 second at a time
    setTimeout(() => {
        canShoot = true;
    }, 100)
})
