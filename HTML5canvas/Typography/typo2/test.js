const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particleArr = [];
let adjustX= 6;
let adjustY = 0;
ctx.lineWidth = 3;


let mouse = {
    x:null,
    y:null,
    radius: 120
    
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
    mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
})


ctx. fillStyle = 'white';
ctx.font = '25px Verdana';
ctx.fillText('A',0,30);
const textCoordinates = ctx.getImageData(0,0,100,100);

function Particles(x,y){
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.desnity = (Math.random()*40)+5;
    
    this.draw = function(){
        ctx.fillStyle = 'white;'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    
    this.update = function(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDist = mouse.radius;
        let force = (maxDist - dist) / maxDist;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (dist < mouse.radius){
            this.x -= directionX;
            this.y -+ directionY;
        } 
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }


        }
    }
}

function init(){
    particleArr = [];
    for(let y = 0, y2 = textCoordinates.height; y< y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x*4)+3]
                < 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArr.push(new Particles(positionX * 20, positionY * 20));
            }
        }
    }
}
init();
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < particleArr.length;i++){
        particleArr[i].draw();
        //particleArr[i].update();
    }
    //connect();
}
animate();

function connect(){
    let opacityValue = 0.8;
    for(let a = 0; a < particleArr.length; a++){
        for(let b = a; b < particleArr.length; b++){
            let dx = particleArr[a].x - particleArr[b].x;
            let dy = particleArr[a].y - particleArr[b].y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            ctx.strokeStyle = 'rgba(255,255,255,'+opacityValue+')';
            if(dist < 50){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArr[a].x, particleArr[a].y);
                ctx.lineTo(particleArr[b].x, particleArr[b].y);
                ctx.stroke();
            }
        }
    }
}
