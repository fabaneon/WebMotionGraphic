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
        c.arc(this.x,this.y+Math.sin(this.y)*0.6*canvas.height/5,this.radius,0,Math.PI * 2,false);

        c.strokeStyle = "white"
        // c.stroke();
    }
    this.update = function(){
        // this.x += this.vx;
        this.y += this.vy;

        this.draw();
    }


}

var circleArr = [];

function wave(){
    for(var i=0; i < 10; i++){
        var radius = 20; 
        
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
    circleArr[0].x = 100;
    circleArr[0].y = 400;
    circleArr[0].update();

    for(var i=2; i < circleArr.length-1; i++){

        circleArr[i].update();
        // if(i > 1){
            // var beforeX = circleArr[i-1].x;
            // var beforeY = circleArr[i-1].y;

            // var nowX = circleArr[i].x;
            // var nowY = circleArr[i].y;
            // var cpX = nowX - beforeX;
            // var cpY = nowY - beforeY;
            // // c.quadraticCurveTo(beforeX,beforeY,cpX,cpY);
            
            // c.quadraticCurveTo(cpX,cpY,nowX,nowY);

        // }

    }
    // console.log(circleArr[1]);
    circleArr[9].x = 900;
    circleArr[9].y = 400;
    circleArr[9].update();
    c.stroke();

}
animate();