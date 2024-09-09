function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = -180;
  function draw() {
    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }
    
    
    // projectile variables
    var x = 0;
    var y = 0;
    var gravity = 180; // 9.81
    var angle = 0;  
    var velocity = 60 ; 
    var vx = velocity * Math.cos(toRadians (angle));
    var vy = velocity * Math.sin(toRadians (angle));
    var dt = 0.02;


    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var theta = slider1.value;
    var phi1 = slider2.value;
    
    function wheels(degree){
      context.save();
      context.lineWidth = 4;
      context.beginPath();
      context.arc(40, 40, 40, 0, 2 * 3.14, false);
      context.fillStyle = "grey";
      context.fill();
      context.stroke();
      context.translate(40, 40);
      
      context.save();
      context.rotate(toRadians (0) + toRadians(degree));
      context.moveTo(0, 0);
      context.lineTo(0, 40);
      context.stroke();
      context.restore();
      
      
      context.save();
      context.rotate(toRadians (90) + toRadians(degree));
      context.moveTo(0, 0);
      context.lineTo(0, 40);
      context.stroke();
      context.restore();
      
      context.save();
      context.rotate(toRadians (180) + toRadians(degree));
      context.moveTo(0, 0);
      context.lineTo(0, 40);
      context.stroke();
      context.restore();
      
      context.save();
      context.rotate(toRadians (270) + toRadians(degree));
      context.moveTo(0, 0);
      context.lineTo(0, 40);
      context.stroke();
      context.restore();
      
   
      context.restore();     
    }
    
    
    function back(){
      context.beginPath();
      context.rect(0, 0, 200, 90);
      context.stroke();
      context.fillStyle = "green";
      context.fill();

      context.beginPath();
      context.rect(50, 0, 10, 100);
      context.rect(100, 0, 10, 100);
      context.rect(150, 0, 10, 100);
      context.rect(0, 0, 10, 100);
      context.stroke();
      context.fillStyle = "#023020";
      context.fill();
    }
    
    // car body height 110, length 390
    function carBody(degree, move){

      // front
      context.beginPath();
      context.moveTo(40, 0);
      context.lineTo(0, 40);
      context.lineTo(0, 90);
      context.lineTo(90, 90);
      context.lineTo(90, 0);
      context.closePath();
      context.fillStyle = "green";
      context.fill();     
      context.stroke();
      

      // front offset
      context.beginPath();
      context.moveTo(50, 10);
      context.lineTo(80, 10);
      context.lineTo(80, 50);
      context.lineTo(10, 50);
      context.closePath();
      context.fillStyle = "grey";
      context.fill();

      context.stroke();

      // bottom
      context.beginPath();
      context.moveTo(0,90);
      context.lineTo(300, 90);
      context.lineTo(300, 110);
      context.lineTo(0, 110);
      context.closePath();
      context.fillStyle = "grey";
      context.fill();
      context.stroke();

      // wheels
      context.save();
      context.translate(25, 100);
      context.scale(0.75, 0.75)
      wheels(move);
      context.restore();

      context.save();
      context.translate(180, 100);
      context.scale(0.75, 0.75)
      wheels(move);
      context.restore();

      context.save();
      context.translate(240, 100);
      context.scale(0.75, 0.75)
      wheels(move);
      context.restore();

      
      // back
      context.save();
      context.translate(300, 90);
      context.rotate(toRadians(degree));
      back();

      if (degree > -135){
        context.save();
        context.translate(90, 90);
        context.rotate(toRadians(90));
        window.requestAnimationFrame(drawTrash());
        context.restore();
        
      }
      context.restore();

    }
    var width = 80;
    var height = 80;
    function drawTrash(){
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(x, y, width, height);
      x = x + vx * dt;
      y = y - vy * dt;
      vy = vy - 0.5 * gravity * dt;
      //size = size -0.1;
      window.requestAnimationFrame(drawTrash);
      if (width > 0 && height >0){
        width = width - .5;
        height = height - .5;
      }
    }

      context.save();
      context.translate(theta, 330)
      carBody(phi1, theta);
      context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;

