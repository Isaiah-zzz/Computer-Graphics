function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    //var slider2 = document.getElementById('slider2');
    //slider2.value = 0;

    var context = cameraContext; // default to drawing in the camera window

    function draw() {
	var tParam = 0;//slider1.value*0.01;
    //var viewAngle = slider2.value*0.02*Math.PI;
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-1, -1,-2],Tx);
	    lineToTx([1, -1, -2],Tx);
        lineToTx([1,-1,2],Tx);
      	lineToTx([-1,-1,2],Tx);
	    context.closePath();
	    context.fill();

        moveToTx([-1, -1,-2],Tx);
	    lineToTx([1, -1, -2],Tx);
        lineToTx([1,1,-2],Tx);
      	lineToTx([-1,1, -2],Tx);
	    context.closePath();
	    context.fill();

        moveToTx([1, 1,2],Tx);
	    lineToTx([-1, 1, 2],Tx);
        lineToTx([-1,-1,2],Tx);
      	lineToTx([1,-1, 2],Tx);
	    context.closePath();
	    context.fill();

        moveToTx([-1, 1,2],Tx);
	    lineToTx([1, 1, 2],Tx);
        lineToTx([1,-1,-2],Tx);
      	lineToTx([-1, -1,-2],Tx);
	    context.closePath();
	    context.fill();

        moveToTx([-1, 1,2],Tx);
	    lineToTx([-1, 1, -2],Tx);
        lineToTx([-1,-1,-2],Tx);
      	lineToTx([-1, -1,-2],Tx);
	    context.closePath();
	    context.fill();

        moveToTx([1, 1,2],Tx);
	    lineToTx([1, 1, -2],Tx);
        lineToTx([1,-1,-2],Tx);
      	lineToTx([1, -1,2],Tx);
	    context.closePath();
	    context.fill();
	}

	function drawVol(TxU){
        var Tx = mat4.clone(TxU);

        context.fillStyle = "blue";
         context.beginPath();
         moveToTx([400,0,0],Tx);
         lineToTx([0,0,400],Tx);
         lineToTx([-400,0,0],Tx);   
         lineToTx([0,0,-400],Tx);  
         context.closePath();
       context.fill();

        context.fillStyle = "#B09B12";
         context.beginPath();
         moveToTx([100,0,0],Tx);
         lineToTx([120,0,50],Tx);
         lineToTx([90,0,90],Tx);
         lineToTx([0,0,110],Tx);
         lineToTx([-50,0,90],Tx);
         lineToTx([-20,0,40],Tx);
         lineToTx([-150,0,0],Tx);
         lineToTx([0,0,-200],Tx);
         context.closePath();
       context.fill();


       context.fillStyle = "grey"
         context.beginPath();
         moveToTx([50,0,0],Tx);
         lineToTx([0,0,50],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
       context.fill()
       
       
       context.beginPath();
         moveToTx([-50,0,0],Tx);
         lineToTx([0,0,-50],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();

       context.beginPath();
         moveToTx([50,0,0],Tx);
         lineToTx([0,0,-50],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();
       
        context.beginPath();
         moveToTx([-50,0,0],Tx);
         lineToTx([0,0,50],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();

       context.fillStyle = "black"
         context.beginPath();
         moveToTx([-30,0,-70],Tx);
         lineToTx([0,0,-100],Tx);
         lineToTx([0, 30, -70],Tx);
         context.closePath();
       context.fill()
        
       context.beginPath();
         moveToTx([0,0,-100],Tx);
         lineToTx([30,0,-70],Tx);
         lineToTx([0, 30, -70],Tx);
         context.closePath();
         context.fill();

       context.beginPath();
         moveToTx([30,0,-70],Tx);
         lineToTx([0,0,-40],Tx);
         lineToTx([0, 30, -70],Tx);
         context.closePath();
         context.fill();
       
        context.beginPath();
         moveToTx([0,0,-40],Tx);
         lineToTx([-30,0,-70],Tx);
         lineToTx([0, 30, -70],Tx);
         context.closePath();
         context.fill();

         context.fillStyle = "#8B0000";
         context.beginPath();
         moveToTx([10,40,0],Tx);
         lineToTx([0,40,10],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
       context.fill()
       
       
       context.beginPath();
         moveToTx([-10,40,0],Tx);
         lineToTx([0,40,-10],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();
       
        context.beginPath();
         moveToTx([10,40,0],Tx);
         lineToTx([0,40,10],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();
       
       context.beginPath();
         moveToTx([10,40,0],Tx);
         lineToTx([0,40,-10],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();
       
        context.beginPath();
         moveToTx([-10,40,0],Tx);
         lineToTx([0,40,10],Tx);
         lineToTx([0,50,0],Tx);
         context.closePath();
         context.fill();
     }

    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
        lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
        moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
        lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
        moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
        lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
        moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
        lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
        context.stroke();
    }
      

    function drawUVWAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // U-label
        moveToTx([1.3,.05,0],Tx);lineToTx([1.3,-.035,0],Tx);lineToTx([1.35,-.05,0],Tx);
        lineToTx([1.4,-.035,0],Tx);lineToTx([1.4,.05,0],Tx);
        // V-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.3,0],Tx);lineToTx([.05,1.4,0],Tx);
	    // W-label
	    moveToTx([-.1,0,1.3],Tx);lineToTx([-.05,0,1.4],Tx);lineToTx([-0,0,1.3],Tx);
	    lineToTx([.05,0,1.4],Tx);lineToTx([.1,0,1.3],Tx);

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

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[100,100,0];
	var d0=[-100,50,100];
	var p1=[0,150,100];
	var d1=[-100,-100,-10];
	var p2=[-110,125,0];
	var d2=[100,100,-100];
    var p3=[0,125,-100];
	var d3=[100,-10,-100];
    var p4=[100,100,0];
	var d4=[-100,50,100];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents
      var P2 = [p2,d2,p3,d3];
      var P3 = [p3,d3,p4,d4];

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
      var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
      var C3 = function(t_) {return Cubic(Hermite,P3,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
      var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};
      var C3prime = function(t_) {return Cubic(HermiteDerivative,P3,t_);};
      
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
    var CameraCurve = function(angle) {
        var distance = 120.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(angle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(angle);  
        return [eye[0],eye[1],eye[2]];
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

    
    
    function toRadians (angle) {
      return angle * (Math.PI / 180);
    }
    
    //var size = 0.1
    var x = 0;
    var y = -50;
      var z = Math.random()*20 - 10;
    var gravity = 9.81; // 9.81
    var angle = Math.random()*120 + 30;  
    var velocity = 30 ; 
    var vx = velocity * Math.cos(toRadians (angle));
    var vy = velocity * Math.sin(toRadians (angle));
    var dt = 0.01;
     
     function drawLava(TxU){

       var Tx = mat4.clone(TxU);
       mat4.rotate(Tx, Tx, toRadians(180), [0, 0, 1])
      
      context.beginPath();
      moveToTx([x,y,0],Tx);
          
      x = x + vx * dt;
      y = y - vy * dt;

      vy = vy - 0.5 * gravity * dt;
       
       lineToTx([x + 1,y + 1,z],Tx);
       context.strokeStyle = "red"
        context.lineWidth = 3;
       context.stroke();
       context.lineWidth = 1;
 
       if (y > 0){     
         x = 0;
         y = -50;
         z = 10
         angle = Math.random()*120 + 30; 
        vx = velocity * Math.cos(toRadians (angle));
        vy = velocity * Math.sin(toRadians (angle));
         dt = 0.01;
       }
    }
    var t = 0;
    function animate(){

      var eyeCamera = CameraCurve(toRadians(t));
      t = t+ 0.1;
      var targetCamera = vec3.fromValues(0,0,0); 
      var upCamera = vec3.fromValues(0,100,0);
    var TlookAtCamera = mat4.create();
      mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
        
      var eyeObserver = vec3.fromValues(500,300,500);
      var targetObserver = vec3.fromValues(0,50,0); 
      var upObserver = vec3.fromValues(0,1,0);
    var TlookAtObserver = mat4.create();
      mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
        
      var Tviewport = mat4.create();
    mat4.fromTranslation(Tviewport,[200,300,0]); 
    mat4.scale(Tviewport,Tviewport,[100,-100,1]); 
      context = cameraContext;
  
     
      var TprojectionCamera = mat4.create();
      mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
     
      var TprojectionObserver = mat4.create();
      mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
       
      var tVP_PROJ_VIEW_Camera = mat4.create();
      mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
      mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
      var tVP_PROJ_VIEW_Observer = mat4.create();
      mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
      mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);

    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1],tangent[0]);
	mat4.rotateZ(Tmodel,Tmodel,angle);

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    // Draw the following in the Camera window
    context = cameraContext;
    context.clearRect(0, 0, 400, 400);
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Camera,1.0);
	drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"red");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"purple");
    drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_VIEW_Camera,"black");
    // draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera,100.0); // Uncomment to see "model" coords
    drawVol(tVP_PROJ_VIEW_Camera);
      var i = 0
      while (i < 10){
      drawLava(tVP_PROJ_VIEW_Camera);
        
      //drawLava(tVP_PROJ_VIEW_Observer);
        i++
      }
    drawObject("green",tVP_PROJ_VIEW_MOD_Camera,5.0);
    context = observerContext;
    context.clearRect(0, 0, 400, 400);
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Observer,1.0);
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"red");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Observer,"purple");
    drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_VIEW_Observer,"black");
    drawVol(tVP_PROJ_VIEW_Observer);
      var i = 0
      while (i < 10){
      drawLava(tVP_PROJ_VIEW_Observer);
        
      //drawLava(tVP_PROJ_VIEW_Observer);
        i++
      }
      
    drawObject("green",tVP_PROJ_VIEW_MOD1_Observer,5.0);     
    drawCamera("purple",tVP_PROJ_VIEW_MOD2_Observer,10.0); 
	drawUVWAxes("purple",tVP_PROJ_VIEW_MOD2_Observer,100.0); 
    tParam = tParam + 0.01;
    if (tParam > 4){
        tParam = 0;
    }

    window.requestAnimationFrame(animate);

    }
    window.requestAnimationFrame(animate);

    }
  
    //slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;
