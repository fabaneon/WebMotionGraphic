const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




let mouse = {
    x:null,
    y:null,
    radius: 100
    
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
    mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
})

let particleArr = [];
ctx.lineWidth = 1;

const str = 'HI';
const fontSize = 600;
//let color;



ctx.textBaseline = 'middle';
ctx.textAlign = 'start';
ctx.font = 'bold '+fontSize+'px verdun';

const Adjustdensity = 22;
const stageX = document.body.clientWidth;
const stageY = document.body.clientHeight;

const fontPos = ctx.measureText(str);
const fontPosWidth = fontPos.width;
const fontPosTop = fontPos.actualBoundingBoxAscent;
const fontPosBtm = fontPos.actualBoundingBoxDescent;

const fontX = (stageX - fontPosWidth)/2;
const fontY = (stageY - fontSize)/2 +fontPosTop + fontPosBtm;


let adjustX= fontX;
let adjustY = fontY-fontPosTop;


console.log(fontY);
console.log(fontPosTop);

ctx.fillText(str,fontX,fontY);
const textCoordinates = ctx.getImageData(fontX,fontY-fontPosTop,fontX+fontPosWidth,fontY+fontPosBtm);





function Particles(x,y){
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = 50;
    
    this.draw = function(){
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    
    this.update = function(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDist = mouse.radius;
        let force = (maxDist - dist) / maxDist;
        //color = forceDirectionX;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (dist < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
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
    for(let y = 0, y2 = textCoordinates.height; y < y2; y+=Adjustdensity){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x+=Adjustdensity){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x*4)+3]
                > 200){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArr.push(new Particles(positionX * 1, 
                                               positionY * 1));
            }
        }
    }
    console.log(particleArr);
}
init();
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'start';

    ctx.font = 'bold '+fontSize+'px aira';

    ctx.fillStyle = 'rgba(150,0,0,0.1)';
    ctx.fillText(str,fontX,fontY);

    for (let i = 0; i < particleArr.length;i++){
        //particleArr[i].draw();
        particleArr[i].update();
    }
    connect();

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(fontX,fontY-fontPosTop,5,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'pink';
    ctx.arc(fontX,fontY+fontPosBtm,5,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(fontX,fontY,5,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();

    
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.strokeStyle = 'green';
    ctx.arc(mouse.x,mouse.y,mouse.radius,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "skyblue"

    ctx.font = "bold 48px Arial";
    ctx.fillText("타이포 그래피 연구",100,120);    

    ctx.font = "bold 24px Arial";
    ctx.fillText("우선.. 아직 수식을 완전히 터득하진 못했다.",100,200);    
    ctx.fillText("하지만 imageData를 어떻게 다뤄야할지는 이해한것같다.",100,240);    
    ctx.fillText("TextMetrics 속성은 이제 어느정도 알게된듯.",100,280);    

    ctx.fillText("파란것이 fontY - fontPosTop",100,320);    
    ctx.fillText("빨간것이 fontY",100,360);    
    ctx.fillText("핑크색이 fontY + fontPosBtm",100,400);    

    
}
animate();

function connect(){
    let opacityValue = 0.8;
    for(let a = 0; a < particleArr.length; a++){
        for(let b = a; b < particleArr.length; b++){
            let dx = particleArr[a].x - particleArr[b].x;
            let dy = particleArr[a].y - particleArr[b].y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            ctx.strokeStyle = 'rgba(255,'+dist+',255,'+opacityValue+')';
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
