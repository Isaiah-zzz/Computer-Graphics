function start() { 
	var canvas = document.getElementById('mycanvas');
	var gl = canvas.getContext('webgl');
	
  	var m4 = twgl.m4;	
	
	var slider1 = document.getElementById('slider1');
	slider1.value = 0;
	var slider2 = document.getElementById('slider2');
	slider2.value = 0;	
	var slider3 = document.getElementById('slider3');
	slider2.value = 0;		
	var slider4 = document.getElementById('slider4');
	slider4.value = 5.0;	


	var vertexShaderText = document.getElementById("vs").text;
	var fragmentShaderText = document.getElementById("fs").text;	
	
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader,fragmentShaderText);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(vertexShader));
		return;
	}
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(fragmentShader));
		return;
	}	
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
		return;
	}


	gl.validateProgram(program);
	gl.useProgram(program);
	
	program.PositionAttribute = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(program.PositionAttribute);
	
	program.ColorAttribute = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(program.ColorAttribute);    
	
	program.texcoordAttribute = gl.getAttribLocation(program, "vTexCoord");
	gl.enableVertexAttribArray(program.texcoordAttribute);		
	
	program.NormalAttribute = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(program.NormalAttribute);		
	
	program.MVPmatrix = gl.getUniformLocation(program,"uMVP");

	program.texcoordAttribute = gl.getAttribLocation(program, "vTexCoord");
	gl.enableVertexAttribArray(program.texcoordAttribute);
	
	program.MVmatrix = gl.getUniformLocation(program,"uMV");
	program.MVNormalmatrix = gl.getUniformLocation(program,"uMVn");
	program.MVPmatrix = gl.getUniformLocation(program,"uMVP");
	var locationOfComp = gl.getUniformLocation(program, "comp");
	
	
	var tri = { vertexPos :new Float32Array(
		[  0, 1, 0, 
			-1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
		   0, 1, 0, 0, 1, 0, 0, 1, 0, 
		   0.5, -1, -1.5, 1.5, -1, -1.5, 1.5, -1, -0.5, 0.5, -1, -0.5, 
		   1, 0 , -1]),


 vertexColors : new Float32Array(
		[ 0, 1, 0,   
			1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
		  0, 1, 0,   0, 1, 0,   0, 1, 0, 
			1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
		  0, 1, 0]),


 vertexTextureCoords : new Float32Array(
		[  0, 0,   1, 0,   1, 1,   0, 1,
			 1, 0,   1, 1,   0, 1,   0, 0,
			 0, 1,   0, 0,   1, 0,   1, 1,
			 0, 0,   1, 0,   1, 1,   0, 1,
			 1, 1,   0, 1,   0, 0,   1, 0,
			 1, 1,   0, 1,   0, 0,   1, 0 ]),


 triangleIndices : new Uint8Array(
		[  1, 2, 3, 1, 3, 4, 
			0, 1, 2, 5, 2, 3, 6, 3, 4, 7, 1, 4, 
			8, 9, 10, 8, 10, 11, 
			 12, 8,9, 12, 9, 10, 12, 10, 11, 12, 8, 11
		
		]),
				
 vertexNormals :new Float32Array(
        [  0, 2,0, 
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0, 
		   0, 2,0, 0, 2,0, 0, 2,0, 
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0, 
		1, 0, -1]),
		}


	function drawT(obj){
		var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertexPos, gl.STATIC_DRAW);
	vertexBuffer.itemSize = 3;
	vertexBuffer.numItems = obj.vertexPos.length / 3;	
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertexColors, gl.STATIC_DRAW);
	colorBuffer.itemSize = 3;
	colorBuffer.numItems = obj.vertexColors.length / 3;	
	
	var textureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertexTextureCoords, gl.STATIC_DRAW);
	textureBuffer.itemSize = 2;
	textureBuffer.numItems = obj.vertexTextureCoords.length / 2;	
		
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);  
	
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.vertexAttribPointer(program.texcoordAttribute, textureBuffer.itemSize,
	gl.FLOAT, false, 0, 0);	
	
	var triangleNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertexNormals, gl.STATIC_DRAW);
	triangleNormalBuffer.itemSize = 3;
	triangleNormalBuffer.numItems = obj.vertexNormals.length/3;
	
	var angle1 = slider1.value*0.01*Math.PI;
    var angle2 = slider2.value*0.01*Math.PI;
    var angle3 = slider3.value*0.03;
    var eye = [400*Math.sin(angle1),150.0,400.0*Math.cos(angle1)];
		var target = [0,0,0];
		var up = [0,1,0];

		
		var tProjection = m4.perspective(Math.PI/4*angle3,1,10,1000);
		var tCamera = m4.inverse(m4.lookAt(eye,target,up));
		var tModel = m4.multiply(m4.scaling([100,100,100]),m4.axisRotation([1,1,1],angle2));   
		var tMVP=m4.multiply(m4.multiply(tModel,tCamera),tProjection);
		var tnModel = m4.axisRotation([1,1,1],angle2);
		var tMV=m4.multiply(tModel,tCamera);
		var tMVn=m4.multiply(tnModel,tCamera);
		
		gl.uniformMatrix4fv(program.MVPmatrix,false,tMVP);
			 
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.vertexAttribPointer(program.ColorAttribute, colorBuffer.itemSize,gl.FLOAT,false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.vertexAttribPointer(program.PositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.uniformMatrix4fv(program.MVmatrix,false,tMV);
		gl.uniformMatrix4fv(program.MVNormalmatrix,false,tMVn);
		gl.uniformMatrix4fv(program.MVPmatrix,false,tMVP);
					 
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
		gl.vertexAttribPointer(program.NormalAttribute, triangleNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
		gl.vertexAttribPointer(program.texcoordAttribute, textureBuffer.itemSize, gl.FLOAT, false, 0, 0);			
		gl.uniform1f(locationOfComp, slider4.value);	

	gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_BYTE, 0);	
	}
	function draw() {

		gl.clearColor(0.97, 0.75, 0.75, 1.00);
		gl.enable(gl.DEPTH_TEST);	
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		drawT (tri);
  		window.requestAnimationFrame(draw);

	}
  draw();
}