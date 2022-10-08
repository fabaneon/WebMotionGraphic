
// function setup(){
//   createCanvas(windowWidth, windowHeight);
//   background(255)
//   frameRate(12)
// }
let slider;

function setup() {
  createCanvas(windowWidth, windowWidth);
  q = windowWidth*0.8;
  slider = createSlider(15, 50, 25, 3);
  slider.position(10, windowWidth+10);
  slider.style('width', '80px');

}
t = a = b = n = 0;
draw = (_) => {
  t += 0.005;
  background(125, q);
  let val = slider.value();
  for (a = 0; a < q; a += val)
    for (b = 0; b < q; b += val) {
      n = TAU * (t + sin(TAU * t - dist(a, b, q / 2, q / 2) * 0.006));
      fill(255,0,0,125);
      circle(a + 15 * sin(n), b + 15 * cos(n), noise(a * 0.006, b * 0.006) * 30);
    }
}; 

// function draw(){
//   // text("X : " + mouseX, 1, height/4)
//   // text("Y : " + mouseY, 1, height/2)
//   // for(count < 30; count++;)
//   // {
//   //   ellipse(500 + count, 500-count, 10, 10)
//   // }
//   var r = random(-10, 10)

//   for(var a=0; a < 10; a++)
//   {
//     for(var i=0; i < 1000; i++){
 
//       ellipse(r*-10*10 ,i*10*10, 10, 100)
   
//     }
  
//   }

  
// }
