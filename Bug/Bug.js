function setup() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;

function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  function draw() {
canvas.width = canvas.width;

var phi1 = slider1.value;


  function moveToTx2(loc,Tx)
{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

function lineToTx2(loc,Tx)
{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}

function moveToTx(x,y,Tx)
{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);}

function lineToTx(x,y,Tx)
{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);}
    
  function circleTx(x, y, size, Tx){
    var res = vec2.create(); vec2.transformMat3(res, [x, y], Tx); context.arc(res[0], res[1], size, 0, 2*3.14, false);
  }
  
    
  function background(){
    var background = mat3.create();
    context.beginPath();
    moveToTx(0, 0, background);
    lineToTx(0, 500, background);
    lineToTx(500, 500, background);
    lineToTx(500, 0, background);
    context.closePath();
    context.fillStyle = "#0C5205";
    context.fill();
    
    
    mat3.fromTranslation(background,[250,250]);
    circle("grey", 250, background);
    circle("#444444", 200, background);
    circle("#333333", 150, background);
    circle("#222222", 100, background);
    circle("#111111", 50, background);
    
    var background2 = mat3.create();
    context.fillStyle = "#555555";
    context.beginPath();
    moveToTx(100, 500, background2);
    lineToTx(200, 500, background2);
    lineToTx(150, 300, background2);
    context.closePath();
    context.fill();
    
    context.beginPath();
    moveToTx(150, 500, background2);
    lineToTx(250, 500, background2);
    lineToTx(200, 400, background2);
    context.closePath();
    context.fill();
    
    context.beginPath();
    moveToTx(400, 500, background2);
    lineToTx(500, 500, background2);
    lineToTx(450, 350, background2);
    context.closePath();
    context.fill();
    
    context.beginPath();
    moveToTx(300, 0, background2);
    lineToTx(200, 0, background2);
    lineToTx(250, 150, background2);
    context.closePath();
    context.fill();
  }
 
function circle(color, size, Tx) {
    context.fillStyle= color;
    context.beginPath();
    circleTx(0, 0, size, Tx);
      context.fill();
}
    
  function face(Tx){
    //mat3.rotate(Tx, Tx, -toRadians(phi1 * 3));
    circle("purple", 50 * phi1/50, Tx);
    mat3.rotate(Tx, Tx, toRadians(-90));
    var Teye_to_face = mat3.create();
    mat3.fromTranslation(Teye_to_face,[25,25]);
    var Teye_to_canvas = mat3.create();
    mat3.multiply(Teye_to_canvas, Tx, Teye_to_face);
    circle("white", 5 * phi1/50, Teye_to_canvas); 
    
    mat3.rotate(Tx, Tx, toRadians(-90));
    var Teye2_to_canvas = mat3.create();
    mat3.multiply(Teye2_to_canvas, Tx, Teye_to_face);
    circle("white", 5 * phi1/50, Teye2_to_canvas);
    
    // make it better!
    mat3.rotate(Tx, Tx, toRadians(-135));
    context.beginPath();
    moveToTx(0, 10, Tx);
    lineToTx(10, 0, Tx);
    context.stroke();  
    
    
  }
    
    
  function legR(Tx){//Tx, x, y, rotate1, rotate2
    circle("black", 5 * phi1/50, Tx);
    mat3.rotate(Tx, Tx, toRadians(phi1/10) + toRadians(Math.random() * 20 - 30) + toRadians(-40)); //make it keep rotating!
    context.beginPath();
  moveToTx(0,5,Tx);
  lineToTx(50,5,Tx);
    context.stroke();
  lineToTx(50,-5,Tx);
  lineToTx(0,-5,Tx);
  context.closePath();
    context.fill();
    
    var Tleg1_to_2 = mat3.create();
    mat3.fromTranslation(Tleg1_to_2,[50,0]);
    var Tleg2_to_canvas = mat3.create();
    mat3.multiply(Tleg2_to_canvas, Tx, Tleg1_to_2);
    circle("black", 5 * phi1/50, Tleg2_to_canvas);
    mat3.rotate(Tleg2_to_canvas, Tleg2_to_canvas, toRadians(phi1/10) + toRadians(120) + toRadians(Math.random() * 20));
    context.beginPath();
  moveToTx(0,5,Tleg2_to_canvas);
  lineToTx(100,5,Tleg2_to_canvas);
  lineToTx(100,-5,Tleg2_to_canvas);
  lineToTx(0,-5,Tleg2_to_canvas);
  context.closePath();
    context.fill();
  }
    
   function legS(Tx){//Tx, x, y, rotate1, rotate2
    circle("black", 5 * phi1/50, Tx);
    mat3.rotate(Tx, Tx, toRadians(phi1/10) + toRadians(Math.random() * 20 - 30) + toRadians(240)); //make it keep rotating!
    context.beginPath();
  moveToTx(0,5,Tx);
  lineToTx(50,5,Tx);
    context.stroke();
  lineToTx(50,-5,Tx);
  lineToTx(0,-5,Tx);
  context.closePath();
    context.fill();
    
    var Tleg1_to_2 = mat3.create();
    mat3.fromTranslation(Tleg1_to_2,[50,0]);
    var Tleg2_to_canvas = mat3.create();
    mat3.multiply(Tleg2_to_canvas, Tx, Tleg1_to_2);
    circle("black", 5 * phi1/50, Tleg2_to_canvas);
    mat3.rotate(Tleg2_to_canvas, Tleg2_to_canvas, -toRadians(phi1/10) + toRadians(220) + toRadians(Math.random() * 20 + 10));
    context.beginPath();
  moveToTx(0,5,Tleg2_to_canvas);
  lineToTx(100,5,Tleg2_to_canvas);
  lineToTx(100,-5,Tleg2_to_canvas);
  lineToTx(0,-5,Tleg2_to_canvas);
  context.closePath();
    context.fill();
  }
    
   function bug(Tx){
     var Tbody_to_end = mat3.create();
     mat3.rotate(Tx, Tx, toRadians(-180));
     mat3.fromTranslation(Tbody_to_end,[0,-100]);
     var Tbody_to_canavs = mat3.create();
     mat3.multiply(Tbody_to_canavs, Tx, Tbody_to_end);
     
     circle("orange", 25 * phi1/50, Tbody_to_canavs);
     
     context.fillStyle = "orange";
     context.beginPath();
  moveToTx(50, 0, Tx);
  lineToTx(25, -100,Tx);
  lineToTx(-25,-100,Tx);
  lineToTx(-50,0,Tx);
  context.closePath();
    context.fill();
          
     var Tleg1 = mat3.create();
     mat3.fromTranslation(Tleg1,[25,-50]);
     var Tleg_to_canavs = mat3.create();
     mat3.multiply(Tleg_to_canavs, Tx, Tleg1);
     legR(Tleg_to_canavs);
     
     mat3.fromTranslation(Tleg1,[20,-70]);
     mat3.multiply(Tleg_to_canavs, Tx, Tleg1);
     legR(Tleg_to_canavs);
     

     mat3.fromTranslation(Tleg1,[15,-90]);
     mat3.multiply(Tleg_to_canavs, Tx, Tleg1);
     legR(Tleg_to_canavs);

     mat3.fromTranslation(Tleg1,[10,-110]);
     mat3.multiply(Tleg_to_canavs, Tx, Tleg1);
     legR(Tleg_to_canavs);
     
     var Tleg2 = mat3.create();
     mat3.fromTranslation(Tleg2,[-25,-50]);
     var Tleg2_to_canavs = mat3.create();
     mat3.multiply(Tleg2_to_canavs, Tx, Tleg2);
     legS(Tleg2_to_canavs);
     
     mat3.fromTranslation(Tleg2,[-20,-70]);
     mat3.multiply(Tleg2_to_canavs, Tx, Tleg2);
     legS(Tleg2_to_canavs);
     
     mat3.fromTranslation(Tleg2,[-15,-90]);
     mat3.multiply(Tleg2_to_canavs, Tx, Tleg2);
     legS(Tleg2_to_canavs);
     
     mat3.fromTranslation(Tleg2,[-10,-110]);
     mat3.multiply(Tleg2_to_canavs, Tx, Tleg2);
     legS(Tleg2_to_canavs);
     
     
     face(Tx);    
     
   }

var Rstart = 50.0;
var Rslope = 25.0;
var Cspiral = function(t) {
    var R = Rslope * t + Rstart;
    var x = R * Math.cos(2.0 * Math.PI * t);
    var y = R * Math.sin(2.0 * Math.PI * t);
    return [x,y];
}
  
  var Cspiral_tangent = function(t) {
    var R = Rslope * t + Rstart;
    var Rprime = Rslope;
    var x = Rprime * Math.cos(2.0 * Math.PI * t)
              - R * 2.0 * Math.PI * Math.sin(2.0 * Math.PI * t);
    var y = Rprime * Math.sin(2.0 * Math.PI * t)
              + R * 2.0 * Math.PI * Math.cos(2.0 * Math.PI * t);
    return [x,y];
}
function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
    context.strokeStyle=color;
    context.beginPath();
      moveToTx2(C(t_begin),Tx);
      for(var i=1;i<=intervals;i++){
          var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
          lineToTx2(C(t),Tx);
      }
      context.stroke();
}

    background();
    var Tblue_to_canvas = mat3.create();
    mat3.fromTranslation(Tblue_to_canvas,[250,250]);
    
    var scaleTB  = mat3.create();
    mat3.scale(scaleTB, Tblue_to_canvas, [phi1/50, phi1/50]);
    
var Tgreen_to_blue = mat3.create();
mat3.fromTranslation(Tgreen_to_blue,Cspiral(phi1/50));
     var tangent = Cspiral_tangent(phi1/50);
  var angle = Math.atan2(tangent[1],tangent[0]);
mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle);
var Tgreen_to_canvas = mat3.create();
mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
  mat3.scale(scaleTB, Tgreen_to_canvas, [phi1/50, phi1/50]);
bug(scaleTB);


  }


  slider1.addEventListener("input",draw);
  draw();
}
window.onload = setup;

