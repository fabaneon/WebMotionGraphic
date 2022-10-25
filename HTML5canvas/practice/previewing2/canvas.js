
let canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");

canvas.resize = function (){
	canvas.Width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.scale(2,2);
}

window.addEventListener("resize", 
						function(){
	canvas.resize();	
});
canvas.resize;

	ctx.beginPath();
	ctx.lineTo(50,50);
	ctx.moveTo(100,50);
	ctx.moveTo(150,100);
	ctx.strokeStyle = "rgba(255,0,0,255)";
	ctx.stroke();

// function animate(){
// 	requestAnimationFrame(animate);
// }

