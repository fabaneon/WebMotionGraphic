const canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// window.addEventListener("resize",
//     function(){
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     }

// )

window.addEventListener("resize",
    function(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
)

function circle(x,y,vx,vy,radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;


    this.draw = function(){
        // c.beginPath();
        c.lineTo(this.x,this.y+Math.sin(this.y)*0.5*canvas.height/8);
        // c.stroke();
        // c.beginPath();
        c.arc(this.x,this.y+Math.sin(this.y)*0.5*canvas.height/8,this.radius,0,Math.PI * 2,false);
        c.lineTo(this.x,this.y+Math.sin(this.y)*0.5*canvas.height/8);

        c.strokeStyle = "white"
        c.stroke();
    }
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        console.log(Math.sin(900))

        this.draw();
    }


}

var circleArr = [];

function wave(){
    for(var i=0; i < canvas.width/100; i++){
        var radius = 30; 
        
        var x = 100;
        var y = 300;
        
        var vx = (0.6- 0.5) * 1; 
        var vy = (0.6- 0.5) * 1; 
        
        circleArr.push(new circle(x*i,y+i,vx,vy,radius));
        }

}
wave();

function init(){
    circleArr = [];    
    wave();
}
function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle = "rgba(30,30,30,0.5)"
    c.fill();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.moveTo(0,300);
    for(var i=0; i < circleArr.length; i++){
        circleArr[i].update();
    }
}
animate();