function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    slider1.value = 0;
    slider2.value = 1;
  
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var button = slider1.value;
    var speed = slider2.value*0.001;
	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
      
    function background(){
        context.lineWidth = 7;
      var Tblue_to_canvas = mat3.create(); 
      context.fillStyle = "grey";
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      mat3.fromTranslation(Tblue_to_canvas,[canvas.height/2,canvas.width/2]);
      drawArc(0.0,2.0,100, arc,Tblue_to_canvas,"white", 60, 2);
      context.fillStyle = "green";
      context.fill();
      drawDashArc(0.0,2.0,100, arc,Tblue_to_canvas,"yellow", 150, 2);    

      context.beginPath();
      context.fillStyle = "green";
      context.arc(0, 0, 200, toRadians(0), toRadians(-90));
      context.fill();
      context.beginPath();
      context.arc(canvas.width, 0, 200, toRadians(-90), toRadians(-180));
      context.fill();
      context.beginPath();
      context.arc(canvas.width, canvas.height, 200, toRadians(-180), toRadians(-270));
      context.fill();
      context.beginPath();
      context.arc(0, canvas.height, 200, toRadians(-270), toRadians(0));
      context.fill();

      var Tcorner_to_canvas = mat3.create();
      drawArc(0.0,2.0,100, arc,Tcorner_to_canvas,"white", 200, 1/4);
      
      var Tcorner2_to_canvas = mat3.create();
      mat3.fromTranslation(Tcorner2_to_canvas,[canvas.width, 0]);
      mat3.rotate(Tcorner2_to_canvas, Tcorner2_to_canvas, toRadians(90))
      drawArc(0.0,2.0,100, arc,Tcorner2_to_canvas,"white", 200, 1/4);
      
      var Tcorner3_to_canvas = mat3.create();
      mat3.fromTranslation(Tcorner3_to_canvas,[canvas.width, canvas.height]);
      mat3.rotate(Tcorner3_to_canvas, Tcorner3_to_canvas, toRadians(180))
      drawArc(0.0,2.0,100, arc,Tcorner3_to_canvas,"white", 200, 1/4);
      
      var Tcorner4_to_canvas = mat3.create();
      mat3.fromTranslation(Tcorner4_to_canvas,[0, canvas.height]);
      mat3.rotate(Tcorner4_to_canvas, Tcorner4_to_canvas, toRadians(-90))
      drawArc(0.0,2.0,100, arc,Tcorner4_to_canvas,"white", 200, 1/4);
      
      var Tx = mat3.create();
      context.beginPath();
      moveToTx([canvas.width/2, 0],Tx);
      lineToTx([canvas.width/2, 100], Tx);


      moveToTx([canvas.width/2, canvas.height], Tx);
      lineToTx([canvas.width/2, canvas.height - 100], Tx);


      moveToTx([0, canvas.height/2],Tx);
      lineToTx([100, canvas.height/2 ], Tx);


      moveToTx([canvas.width, canvas.height/2],Tx);
      lineToTx([canvas.width - 100, canvas.height/2 ], Tx);

      context.stroke();
    }
      
    function car(color, Tx){
        context.lineWidth = 3;
      context.beginPath();
      context.fillStyle = color;
      context.strokeStyle = "black";
      moveToTx([10, 0],Tx);
        lineToTx([10,30],Tx);
      lineToTx([-10,30],Tx);
      lineToTx([-10,0],Tx);
	    lineToTx([10, 0],Tx);

      moveToTx([10,4],Tx);
      lineToTx([-14,4],Tx);
      lineToTx([-14,10],Tx);
      lineToTx([-10,10],Tx);

      moveToTx([10,10],Tx);
      lineToTx([14,10],Tx);
      lineToTx([14,4],Tx);
      lineToTx([10,4],Tx);

      moveToTx([10,16],Tx);
      lineToTx([-10,16],Tx);
      
      moveToTx([10,26],Tx);
      lineToTx([14,26],Tx);
      lineToTx([14,20],Tx);
      lineToTx([-14,20],Tx);
      lineToTx([-14,26],Tx);
      lineToTx([-10,26],Tx);
	  context.stroke();
        
    }
      
    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}
    
     var HermiteTangent = function (t){
        return [
          6*t*t - 6*t, 
          3*t*t - 4*t + 1,
          6*t-6*t*t,
          3*t*t - 2*t 
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0];
	var d0=[1, 0];
	var p1=[150, 0];
	var d1=[50, 50];
	var p2=[canvas.width/2,75];
	var d2=[170,0];
    var p3=[360, 25];
    var d3=[50, -40];
    var p4=[canvas.width, 0];
    var d4=[1, 0];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents
      //path2
  var P2 = [p2, d2, p3, d3];
  var P3 = [p3, d3, p4, d4];
      //path3
  var p3_ = [360, -20];
  var d3_ = [0, -170];
  var B2 = [p2, d2, p3_, d3_];

  var p4_ = [canvas.width/2 + 25, -130];
  var d4_ = [-40, -50];
  var B3 = [p3_, d3_, p4_, d4_];
  
  var p5_ = [canvas.width/2 + 25, -canvas.width/2 -25];
  var d5_ = [0, -1];
  var B4 = [p4_, d4_, p5_, d5_];

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
      // path2
  var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
  var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
  // path 3
  var C2_ = function(t_) {return Cubic(Hermite,B2,t_);};
  var C3_ = function(t_) {return Cubic(Hermite,B3,t_);};
  var C4_ = function(t_) {return Cubic(Hermite,B4,t_);};

	var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } 
        else if (t < 2){
            var u = t-1;
            return C1(u);
        }   
        else if (t < 3){
            var u = t - 2;
          return C2(u);
        }
        else{
            var u = t - 3;
          return C3(u);
        }
	}

  var Ccomp_P3 = function(t) {
    if (t<1){
        var u = t;
        return C0(u);
    } else if (t < 2){
        var u = t - 1.0;
        return C1(u);
    } else if (t < 3) {
        var u = t - 2.0;
        return C2_(u);
    } else if (t < 4){
        var u = t - 3.0;
        return C3_(u);
    } else {
        var u = t - 4;
        return C4_ (u);
    }        
}
    
  var C0prime = function(t_) {return Cubic(HermiteTangent,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteTangent,P1,t_);};
  //path2
  var C2prime = function(t_) {return Cubic(HermiteTangent,P2,t_);};
  var C3prime = function(t_) {return Cubic(HermiteTangent,P3,t_);};
  //path3
  var C2prime_P3 = function(t_) {return Cubic(HermiteTangent,B2,t_);};
  var C3prime_P3= function(t_) {return Cubic(HermiteTangent,B3,t_);};
  var C4prime_P3= function(t_) {return Cubic(HermiteTangent,B4,t_);};
    
  var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else if (t < 2){
            var u = t - 1.0;
            return C1prime(u);
        } else if (t < 3) {
            var u = t - 2.0;
            return C2prime(u);
        } else{
            var u = t - 3.0;
            return C3prime(u);
        }          
	}

  var Ccomp_tangent_P3 = function(t) {
    if (t<1){
        var u = t;
        return C0prime(u);
    } else if (t < 2){
        var u = t - 1.0;
        return C1prime(u);
    } else if (t < 3) {
        var u = t - 2.0;
        return C2prime_P3(u);
    } else if (t < 4){
        var u = t - 3.0;
        return C3prime_P3(u);
    } else {
        var u = t - 4;
        return C4prime_P3(u);
    }        
}
    
    var arc = function(t, size, p) {
	    var x = size * Math.cos(p * Math.PI * t);
	    var y = size * Math.sin(p * Math.PI * t);
	    return [x,y];
	}
    
    function drawArc(t_begin,t_end,intervals,C,Tx,color,size, p) {
	    context.strokeStyle=color;
        //context.fillStyle = color;
	    context.beginPath();
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t, size, p),Tx);
        }
        context.stroke();
        //context.fill();
	}

    function drawDashArc(t_begin,t_end,intervals,C,Tx,color,size, p) {
	    context.strokeStyle=color;
        //context.fillStyle = color;
	    context.beginPath();
        for(var i=1;i<=intervals;i++){
            context.setLineDash([10, 15]);
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t, size, p),Tx);
            
        }
        context.stroke();
        context.setLineDash([]);
        //context.fill();
	}

    var arc_tangent = function (t, size, p){
      var x =  - size * p * Math.PI * Math.sin(p * Math.PI * t);
      var y = size * p * Math.PI * Math.cos(p * Math.PI * t);
      return [x, y];
    }
    
	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}

    // change angle and 
    function drawPath2(t2, button, x, y, degree){	
      var Tblue_to_canvas = mat3.create();
      mat3.fromTranslation(Tblue_to_canvas,[x, y]);
    
      mat3.rotate(Tblue_to_canvas,Tblue_to_canvas,toRadians(degree));  
      if (button == 1){  
      drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
      drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"blue");
      drawTrajectory(0.0,1.0,100,C2,Tblue_to_canvas,"purple");
      drawTrajectory(0.0,1.0,100,C3,Tblue_to_canvas,"purple");
      }
      var Tgreen_to_blue = mat3.create();
      mat3.fromTranslation(Tgreen_to_blue,Ccomp(t2));
      var tangent = Ccomp_tangent(t2);
      var angle = Math.atan2(tangent[1],tangent[0]);
      mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle + toRadians(-90));
      var Tgreen_to_canvas = mat3.create();
      mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
      car("purple",Tgreen_to_canvas);      
    }
      
    function drawPath1(tParam, button, x, y, degree){
      var Tblue_to_canvas = mat3.create();
      mat3.fromTranslation(Tblue_to_canvas, [x, y]);
      mat3.rotate(Tblue_to_canvas, Tblue_to_canvas, toRadians(degree));
      if (button == 1){
      drawArc(0.0,2.0,100, arc,Tblue_to_canvas,"green", 225, 1/4);
      }
      var Tgreen_to_blue = mat3.create();
      mat3.fromTranslation(Tgreen_to_blue,arc(tParam, 225, 1/4));
      var tangent = arc_tangent(tParam, 225, 1/4);
      var angle = Math.atan2(tangent[1],tangent[0]);
	  mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle + toRadians(-90));
      var Tgreen_to_canvas = mat3.create();
      mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
      car("purple",Tgreen_to_canvas);
    }
      
    function drawPath3(t2, button, x, y, degree){
      var Tblue_to_canvas = mat3.create();
      mat3.fromTranslation(Tblue_to_canvas,[x, y]);
      mat3.rotate(Tblue_to_canvas, Tblue_to_canvas, toRadians(degree));
      if (button == 1){
      drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
      drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"blue");
      drawTrajectory(0.0,1.0,100,C2_,Tblue_to_canvas,"purple");
      drawTrajectory(0.0,1.0,100,C3_,Tblue_to_canvas,"purple");
      drawTrajectory(0.0,1.0,100,C4_,Tblue_to_canvas,"purple");
      }
     
      var Tgreen_to_blue = mat3.create();
      mat3.fromTranslation(Tgreen_to_blue,Ccomp_P3(t2));
      var tangent = Ccomp_tangent_P3(t2);
      var angle = Math.atan2(tangent[1],tangent[0]);
      mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle + toRadians(-90));
      var Tgreen_to_canvas = mat3.create();
      mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
      car("purple",Tgreen_to_canvas);
     }

     var T = 0;
     var t1 = 0;
     var t2 = 0;
     var t3 = 0;
     var t4 = 0;
     var t5 = 0;
     var t6 = 0;
     var t7 = 0;
     var t8 = 0;
     var t9 = 0;
     var t10 = 0;
     var t11 = 0;
     var t12 = 0;


     function runner(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      background();
      //s = t2 + 0.0001;

      if (T < 20){
        T = T + speed;
        if (T < 2){
            t1 = T;
            drawPath1(t1, button, canvas.width, canvas.height, 180); 
            }

        if (T > 1 && T < 5 ){
            t2 = T - 1;
            drawPath2(t2, button, canvas.width, canvas.height/2 - 25, 180);
        }

        if (T > 1 && T < 6){
            t3 = T - 1;
            drawPath3(t3, button, 0, canvas.width/2 + 25, 0);
        }

        if (T > 4 && T < 8){
            t4 = T - 4;
            drawPath2(t4, button, canvas.width/2 + 25, canvas.height, -90);
        }

        if (T > 7 && T < 9){
            t5 = T - 7;
            drawPath1(t5, button, 0, 0, 0);
        }

        if (T > 8 && T < 10){
            t6 = T - 8;
            drawPath1(t6, button, canvas.width, canvas.height, 180);
        }

        if (T > 9 && T < 14){
            t7 = T - 9;
            drawPath3(t7, button, canvas.width, canvas.height/2 - 25, 180);
        }

        if (T > 10 && T < 15){
            t8 = T - 10;
            drawPath3(t8, button, canvas.width, canvas.height/2 - 25, 180);
        }

        if (T > 14 && T < 16){
            t9 = T - 14;
            drawPath1(t9, button, 0, canvas.height, -90);
        }

        if (T > 13 && T < 17){
            t10 = T - 13;
            drawPath2(t10, button, 0, canvas.height/2 + 25, 0);
        }

        if (T > 16 && T < 20){
            t11 = T - 16;
            drawPath2(t11, button, canvas.width/2 - 25, 0, 90);
        }

        if (T > 17 && T < 19){
            t12 = T - 17;
            drawPath1(t12, button, 0, 0, 0);
        }
      }

      else {
        T = 0;
        //window.cancelAnimationFrame(runner)
      }        
      window.requestAnimationFrame(runner);
     }

     function test(){
        var t = 0;
        //drawPath1(t1, button, canvas.width, canvas.height, 180); // path1-1
        //drawPath2(t2, button, canvas.width, canvas.height/2 - 25, 180); // path2-2
        //drawPath3(t3, button, 0, canvas.width/2 + 25, 0); // path3-4
        //drawPath2(t4, button, canvas.width/2 + 25, canvas.height, -90); // path2-1
       //drawPath1(t1, button, 0, 0, 0); // path1-3
        //drawPath3(t3, button, canvas.width, canvas.height/2 - 25, 180); // path3-2
       
        drawPath1(t9, button, 0, canvas.height, -90); // 1-4
        drawPath2(t10, button, 0, canvas.height/2 + 25, 0); // 2-4
        drawPath2(t11, button, canvas.width/2 - 25, 0, 90); // 2- 3


     }
     //test();
     window.requestAnimationFrame(runner);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;


