var canvas = document.querySelector("#canvas");

	canvas.Width = window.innerWidth;
	canvas.height = window.innerHeight;


var mouse = {
	x: undefined,
	y: undefined
}
window.addEventListener("resize", 
	function(){
	canvas.Width = window.innerWidth;
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


function animate(){
	requestAnimationFrame(animate);

	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.beginPath();
	ctx.moveTo(100,50);
	ctx.lineTo(50,50);
	
	ctx.lineTo(150,100);
	ctx.strokeStyle = "red";
	ctx.stroke();	

	
	// ctx.fillStyle = "skyblue"

	// ctx.font = "bold 48px Arial";
	// ctx.fillText("복습", 100,120);    

	// ctx.font = "bold 24px Arial";
	// ctx.fillText("시발 다 까먹은게 좆같네", 100,200);    

	// ctx.fillText("자세한것은 F12 -> Source || 주석 확인",100,240);  
}

animate();