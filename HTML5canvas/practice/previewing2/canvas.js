var canvas = document.querySelector("canvas");

	canvas.width= window.innerWidth;
	canvas.height = window.innerHeight;


var mouse = {
	x: undefined,
	y: undefined
}
window.addEventListener("resize", 
	function(){
	canvas.width = window.innerWidth+300;
	canvas.height = window.innerHeight;
});
window.addEventListener("mousemove",
    function(event){
        mouse.x = event.clientX - canvas.offsetLeft + window.scrollX;
        mouse.y = event.clientY - canvas.offsetTop + window.scrollY;
        // console.log(mouse.x +" / "+mouse.y);
    }
)

var ctx = canvas.getContext('2d');

function point(x,y) {
	var x = this.x;
	var y = this.y;
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	
	
	
	ctx.fillStyle = "skyblue"

	ctx.font = "bold 24px Arial";
	ctx.fillText("복습", 100,120);    

	ctx.font = "bold 12px Arial";
	ctx.fillText("시발 다 까먹은게 좆같네", 100,200);    

	ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,240);  
}

animate();