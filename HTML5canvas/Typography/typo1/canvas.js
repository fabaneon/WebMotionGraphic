const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var show = null;
var voke = null;
function Text(str,density) {
	
	this.fontWidth = canvas.width/2;
	this.fontSize = 300;
	
	this.stageWidth = canvas.width;
	this.stageHeight = canvas.height;
	this.dotPos = function(fontX,fontY,fontTop,fontBtm,fontWidth){
            
			const imageData = ctx.getImageData(fontX,
								   fontY-fontTop,
									   fontX+fontWidth,
									   fontTop+fontBtm);
        voke = imageData;
        
        imageData[0] = 255;
        imageData[4] = 255;
        imageData[8] = 255;
        imageData[16] = 255;
        imageData[20] = 255;
		const particles = [];
		let pixel;
        let i = 0;
        const density = 15;
        const arrDen = density*4;
        // for(var x1 = fontX; x1 < fontX+fontWidth; x1+=density){
        //     for(var y1 = fontY-fontTop; y1 < fontY+fontBtm; y1+=density){
        //                 var r = imageData[i];
        //                 var g = imageData[i+1];
        //                 var b = imageData[i+2];

        //             if(r !== 255 && g !== 255 && b !== 255){                        
        //                 particles.push({
        //                     x: x1,
        //                     y: y1,
        //                     r: r,
        //                     g: g,
        //                     b: b,
        //                 });
        //             i+=arrDen;
                    
                    
        //         }
                
        //     }
            
        // }
        ctx.putImageData(imageData,fontX,fontY-fontTop);
        return particles;
        
		
	}
	
	this.draw = function() {

		ctx.clearRect(0,0,canvas.width,canvas.height);


        
		ctx.font = 'bold '+this.fontSize+'px aria';
		ctx.fillStyle = 'blue';
		const fontPos = ctx.measureText(str);
		const fontTop = fontPos.actualBoundingBoxAscent;
		const fontBtm = fontPos.actualBoundingBoxDescent;
		const fontWidth = fontPos.width;
		const fontX = (this.stageWidth - fontPos.width)/2;
		const fontY = (this.stageHeight - this.fontSize)/2+fontTop+fontBtm;

        ctx.textBaseline = 'top';
        //ctx.textAlign = 'start';
		ctx.fillText(str,fontX, fontY-fontBtm);

        
        //ctx.fillRect(200,200,350,350);
        var dotPoint = this.dotPos(fontX,fontY,fontTop,fontBtm,fontWidth);
        show = dotPoint;
        
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
            // for(var i = 0; i < dotPoint.length; i++){
            //         var r = '200';
            //         var g = '200';
            //         var b = '200';
            //         var a = '1';

                    
                
            //         ctx.beginPath();
            //         ctx.fillStyle = 'red';
            //         ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
            //         ctx.arc(dotPoint[i].x,dotPoint[i].y,2,0,Math.PI*2,false);
            //         ctx.fill();
            //         ctx.stroke()
            // }

		
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
window.addEventListener('mousemove',
                       function(event){
            event.preventDefault();
            console.log(show);
            console.log(voke);

})