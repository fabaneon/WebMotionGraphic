const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


function Text(str,density) {
	
	this.fontWidth = canvas.width/2;
	this.fontSize = 400;
	
	this.stageWidth = canvas.width;
	this.stageHeight = canvas.height;
	this.dotPos = function(fontX,fontY,fontTop,fontBtm,fontWidth){
			const imageData = ctx.getImageData(fontX,
								   fontY-fontTop,
									   fontX+fontWidth,
									   fontY+fontBtm).data;
		const particles = [];
		let pixel;
		for(var i = 0; i < imageData.length;i+=4){
				imageData[i] = 255 - imageData[i];
                imageData[i+1] = 255 - imageData[i+1];
                imageData[i+2] = 255 - imageData[i+2];

				var pixel1 = imageData[i];
                var pixel2 = imageData[i+1];
                var pixel3 = imageData[i+2];
                var pixel4 = imageData[i+3];
		        
                particles.push({
                   r: pixel1, 
                   g: pixel2, 
                   b: pixel3, 
                   a: pixel4, 
                });
        }
        return particles
        
		
	}
	
	this.draw = function() {

		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		ctx.font = 'bold '+this.fontSize+'px aria';
		ctx.fillStyle = 'rgba(0,0,0,0.3)';
		ctx.textBaseline = 'middle';
		const fontPos = ctx.measureText(str);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontWidth = fontPos.width;
		const fontX = (this.stageWidth - fontPos.width)/2;
		const fontY = (this.stageHeight - this.fontSize)/2+fontTop+fontBtm;
		ctx.textAlign = 'start';
		ctx.fillText(str,fontX, fontY);

		var dotPoint = this.dotPos(fontX,fontY,fontTop,fontBtm,fontWidth);
        console.log(dotPoint[1]);
		// ctx.fontWidth = 0.1;
		// ctx.strokeStyle = 'rgba(0,100,200,1)';

		// for (var i = fontX; i < fontX+fontWidth; i+=density){
		// ctx.beginPath();
		// ctx.arc(i,fontY-fontTop,5,0,Math.PI*2,false);
		// ctx.arc(i,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke();
		// }
		
		// ctx.beginPath();
		// ctx.strokeStyle = 'black';
		// ctx.arc(fontX,fontY-fontTop,5,0,Math.PI*2,false);
		// ctx.stroke()
        for(var x = fontX; x < fontWidth; x+=10){
            for(var check = 0,y = fontY-fontTop; check < dotPoint.length; check++, y+=10){
                    var r = dotPoint[check].r;
                    var g = dotPoint[check].g;
                    var b = dotPoint[check].b;
                    var a = dotPoint[check].a;

                    ctx.beginPath();
                    ctx.fillStyle = 'rgba('+r+','+g+','+b+','+a+')';
                    ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
                    ctx.arc(x,y,1,0,Math.PI*2,false);
                    ctx.fill();
                    ctx.stroke()
            }
        }

		
		// ctx.beginPath();
		// ctx.strokeStyle = 'pink';
		// ctx.arc(fontX,fontY+fontBtm,5,0,Math.PI*2,false);
		// ctx.stroke()
	}
}

const drawing = new Text('M',50);

function draw(){
	requestAnimationFrame(draw);
	
	drawing.draw();
}
draw();