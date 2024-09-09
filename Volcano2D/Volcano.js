function setup() {
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 90;
  var slider2 = document.getElementById('slider2');
  slider2.value = 40;

  function draw() {
    
    // change degree to radians
    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }
    
    var dx = slider1.value;
    var dy = slider2.value;
    
    // projectile variables
    var size = 0.1
    var x = 150;
    var y = 200;
    var gravity = dy; // 9.81
    var angle = dx;  
    var velocity = 60 ; 
    var vx = velocity * Math.cos(toRadians (angle));
    var vy = velocity * Math.sin(toRadians (angle));
    var dt = 0.02;
    var context = canvas.getContext('2d');

    context.lineWidth = 4;
    context.strokeStyle = "black";
    
    function drawBack(){
      context.fillStyle = "#BAE2F2";
      context.fillRect(0, 0, 400, 300);
      context.fillStyle = "blue";
      context.fillRect(0, 300, 400, 100);
      
      // islands
      context.fillStyle = "yellow";
      context.fillRect(350, 310, 40 , 30);
      context.fillRect(210, 320, 10, 10 );
      context.fillRect(20, 350, 80, 60 );
      
      // greens
      context.fillStyle = "green";
      context.fillRect(360, 320, 30 , 20);

      context.fillRect(40, 380, 20, 5 );
      context.fillRect(50, 385, 10, 5 );
    }
    
    function drawVolcano(){
      context.beginPath();
      context.moveTo(0, 300);
      context.lineTo(150, 200);
      context.lineTo(300, 300); 
      context.closePath();
      context.stroke();
      context.fillStyle = "black";
      context.fill();
      
      context.beginPath();
      context.moveTo(250, 300);
      context.lineTo(325, 250);
      context.lineTo(400, 300);
      context.closePath();
      context.stroke();
      context.fillStyle = "black";
      context.fill();
      
      context.beginPath();
      context.moveTo (187.5, 225);
      context.lineTo(150, 200);
      context.lineTo(112.5, 225);
      context.closePath();
      context.fillStyle = "#800000";
      context.fill();
      }
      
      
    var xsmoke = 150;
    var ysmoke = 200;
    var vysmoke = vy;
    function drawLava(){
      context.beginPath();
      context.arc(x, y, size, 0, 2 * 3.14, false);
      
      // update size and projectile motion
      size = size + 0.005;
      x = x + vx * dt;
      y = y - vy * dt;
      vy = vy - 0.5 * gravity * dt;
 
      context.fillStyle = "red";
      context.fill();
      
      context.beginPath();
       context.arc(xsmoke, ysmoke, 0.2, 0, 2 * 3.14, false);
       
      xsmoke = xsmoke + vx * dt;
      ysmoke = ysmoke - vysmoke * dt;
      vysmoke = vysmoke - 0.5 * 9.81 * dt;
       
       context.fillStyle = "grey";
      context.fill();
      window.requestAnimationFrame(drawLava);
      }
    drawBack();
    drawVolcano();
    window.requestAnimationFrame(drawLava);
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;


