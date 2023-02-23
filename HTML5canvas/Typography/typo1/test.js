var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var data;


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var str = "A";

    
    const fontSize = 300;    
    const fontPos = {
        it: ctx.measureText(str),
        top: ctx.measureText(str).actualBoundingBoxAscent,
        btm: ctx.measureText(str).actualBoundingBoxDescent,
        width: ctx.measureText(str).width,        
    };
    const fontX = 0;
    const fontY = 0+fontPos.top+fontPos.btm; 
    ctx.font = 'bold '+fontSize+'px Verdana';
    ctx.textBaseline="middle"; 
    ctx.fillText(str, fontX, fontY);

    var imageData = ctx.getImageData(fontX, fontY, 
                                     fontX+fontPos.width,
                                     fontY+fontPos.btm);

        const particles = [];
        var i = 0;

    
        for( var y = fontY-fontPos.top; y < fontY+fontPos.btm; y += 15){
            ++i;    
            let pixel;
            let slide
            
            
            for( var x = fontX; x < fontX+fontPos.width; x+= 15){
                i += 4;
                pixel = imageData[(x + (y * fontX+fontPos.width) * 4)-1];
                
               //console.log(pixel);
                if((pixel != 0)&&
                  x > fontX && x < fontX+fontPos.width &&
                  y > fontY-fontPos.top && y < fontY-fontPos.btm){
                    particles.push({
                        x: x,
                        y: y
                        
                    })
                }
            }
        }   
    
    data = particles;
    for(var abs = 0; abs < particles.length; abs++){
        ctx.beginPath();
        ctx.strokeStyle = 'pink';
        ctx.arc(particles[abs].x,particles[abs].y,4,0,Math.PI*2,false);
        ctx.stroke()   
    }
	// ctx.arc(fontX,fontY+fontPos.btm,5,0,Math.PI*2,false);
	// ctx.arc(fontX,fontY-fontPos.top,5,0,Math.PI*2,false);
	// ctx.arc(fontX,fontY,5,0,Math.PI*2,false);
//    ctx.stroke()
    

    
//     data = imageData.data.filter(function(e) {
//         return e !== 0;
//     });

    
    
}
animate();
window.addEventListener('mousemove',function(event){
    event.preventDefault();
    console.log(data);
})
// check if image data array contains values other than 0
