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





var pointArr = [];

function wave(){
    for(var i=0; i < 30; i++){
        var radius = 10; 
        
        var x = 200;
        var y = canvas.height/2 ;
        var yrandom = i+Math.random(0,30);

        var vx = (0.6- 0.5) * 1; 
        var vy = (0.6- 0.5) * 1; 
        
        pointArr.push({x: x*i, y: y+yrandom, vx: vx, vy: vy, radius: radius});
    }

}
wave();

function init(){
    pointArr = [];    
    wave();
}
var x1 = 300;
var y1 = 300;
var x2 = 400;
var y2 = 400;
var cpx = (x1+(x2-x1)/2)+(100);
var cpy = (y1+(y2-y1)/2)+(-100);


function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle = "rgba(30,30,30,0.5)"
    c.fill();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.moveTo(x1,y1);
    // for(var i=0; i < pointArr.length; i++){
    //     var x = pointArr[i].x;
    //     var y = pointArr[i].y;
        
    //     var vx = pointArr[i].vx;
    //     var vy = pointArr[i].vy;
    //     var radius = pointArr[i].radius;
    //     if(i > 0){
    //         var cpx = (x - pointArr[i-1].x);
    //         var cpy = (y - pointArr[i-1].y);
    //         c.quadraticCurveTo(cpx,
    //         cpy+Math.sin(cpy)*0.6*canvas.height/5,
    //         x,
    //         y+Math.sin(y)*0.6*canvas.height/5);
    //     }
    //     pointArr[i].y += pointArr[i].vy;
    // }
    c.quadraticCurveTo(cpx,cpy,x2,y2);
    c.strokeStyle = "white";
    c.stroke();

    c.beginPath();
    c.arc(x1,y1,10,0,Math.PI*2,false);
    c.strokeStyle = "red"
    c.stroke();


    c.beginPath();
    c.arc(cpx,cpy,10,0,Math.PI*2,false);
    c.strokeStyle = "pink"
    c.stroke();

    c.beginPath();
    c.arc(x2,y2,10,0,Math.PI*2,false);
    c.strokeStyle = "yellow"
    c.stroke();

}
animate();