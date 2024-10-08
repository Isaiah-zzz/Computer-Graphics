function setup(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var slider1= document.getElementById("slider1");
    slider1.value =0;
    var slider2 = document.getElementById("slider2");
    slider2.value =0;
    var slider3 = document.getElementById("slider3");
    slider3.value =5;
    var t = 0;

    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(vertexShader)); return null; }
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader)); return null; }
    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);
    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram,"vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram,"vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
    shaderProgram.TexCoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram.TexCoordAttribute);
    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.MVnormalMatrix = gl.getUniformLocation(shaderProgram, "uMVn");
    shaderProgram.movingLight = gl.getUniformLocation(shaderProgram, "rawLight");
    var locationOfComp = gl.getUniformLocation(shaderProgram, "comp");
    // Attach samplers to texture units
    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "texSampler1");
    gl.uniform1i(shaderProgram.texSampler1, 0);
    shaderProgram.texSampler2 = gl.getUniformLocation(shaderProgram, "texSampler2");
    gl.uniform1i(shaderProgram.texSampler2, 1);
    shaderProgram.texSampler3 = gl.getUniformLocation(shaderProgram, "texSampler3");
    gl.uniform1i(shaderProgram.texSampler3, 2);

    // Data
    var vertexPos = new Float32Array([
        0,1.5,0,  -1,0,-1,  1,0,-1,
        0,1.5,0,  1,0,-1,  1,0,1,
        0,1.5,0,  1,0,1,  -1,0,1,
        0,1.5,0,  -1,0,1,  -1,0,-1,
        -1,0,-1,  1,0,-1,  1,0,1,
        1,0,1,  -1,0,1,  -1,0,-1, 

        .25, 0, .25, .25, -2, .25, .25, -2, -.25, 
        .25, 0, .25, .25, -2, -.25, .25, 0, -.25,

        .25, 0, -.25, .25, -2, -.25, -.25, -2, -.25,
        .25, 0, -.25, -.25, -2, -.25, -.25, 0, -.25,

        -.25, 0, -.25, -.25, -2, -.25, -.25, -2, .25, 
        -.25, 0, -.25, -.25, -2, .25, -.25, 0, .25, 

       -.25, 0, .25, -.25, -2, .25, .25, -2, .25,
        -.25, 0, .25, .25, -2, .25, .25, 0, .25
    ]);
    var vertexColors = new Float32Array([
        1, 1, 1,    1, 1, 1,   1, 1, 1,
        1, 1, 1,    1, 1, 1,    1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,

        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,

        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,

        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,

        1, 1, 1,  1, 1, 1,  1, 1, 1,
        1, 1, 1,  1, 1, 1,  1, 1, 1,
    ]);
    var vertexNormals = new Float32Array([
        0,1,1.400,  -1,1,1,  1,1,1,
        1.400,1,0,  1,1,1,  1,1,-1,
        0,1,-1.400,  1,1,-1,  -1,1,-1,
        -1.400,1,0,  -1,1,-1,  -1,1,1,
        -1,-1,1,  1,-1,1,  1,-1,-1,
        1,-1,-1,  -1,-1,-1,  -1,-1,1,

        1,-1,-1,  -1,-1,-1,  -1,-1,1,
        1,-1,-1,  -1,-1,-1,  -1,-1,1,

        1,-1,-1,  -1,-1,-1,  -1,-1,1,
        1,-1,-1,  -1,-1,-1,  -1,-1,1,

        1,-1,-1,  -1,-1,-1,  -1,-1,1,
        1,-1,-1,  -1,-1,-1,  -1,-1,1,

        1,-1,-1,  -1,-1,-1,  -1,-1,1,
        1,-1,-1,  -1,-1,-1,  -1,-1,1
    ]);
    var vertexTextureCoords = new Float32Array([
        0.5, 1,   0, 1,   0, 0,
        0.5, 1,   0, 0,   0.5, 0,
        0.5, 1,   0.5, 0,   1, 0,
        0.5, 1,   1,0 ,   1, 1,
        0, 0,   1, 0,   1, 1,
        1, 1,   0, 1,   0, 0, 

        0,0, 0,1, 1,1, 
        0,0, 1,1, 1,0,

        0,0, 0,1, 1,1, 
        0,0, 1,1, 1,0,

        0,0, 0,1, 1,1, 
        0,0, 1,1, 1,0,

        0,0, 0,1, 1,1, 
        0,0, 1,1, 1,0,
    ]);
    var triangleIndices = new Uint8Array([
        0,1,2, 
        3,4,5, 
        6,7,8, 
        9,10,11, 
        12,13,14,
        15,16,17,

        18, 19, 20,
        21, 22, 23, 

        24, 25, 26, 
        27, 28, 29, 

        30, 31, 32, 
        33, 34, 35, 

        36, 37, 38,
       39, 40, 41,
    ]);
    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);//make it the default type
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);//dispatch data to GPU
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 18 + 6;
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = 18 + 6;
    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 18;
    // a buffer for textures
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = 18 + 6;
    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);

    // Set up texture
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    var texture3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image3 = new Image();

    

    function initTextureThenDraw()
    {
      image1.onload = function() { loadTexture(image1,texture1); };
      image1.crossOrigin = "anonymous";
      image1.src = "https://farm6.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";

      image2.onload = function() { loadTexture(image2,texture2); };
      image2.crossOrigin = "anonymous";
      image2.src = "https://farm6.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";

      image3.onload = function() { loadTexture(image3,texture3); };
      image3.crossOrigin = "anonymous";
      image3.src = "https://live.staticflickr.com/65535/50641908943_f6ebfef28d_o.jpg";

      window.setTimeout(draw,200);
    }

    function loadTexture(image,texture)
    {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // Option 1 : Use mipmap, select interpolation mode
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

      // Option 2: At least use linear filters
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Optional ... if your shader & texture coordinates go outside the [0,1] range
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    function change(){      
    }
    function draw() {
        t = t + .1;
        window.requestAnimationFrame(draw);
        gl.uniform1f(locationOfComp, slider3.value);
        var angleCamera = t*0.01*Math.PI;
        var lightDir = slider1.value*0.01*Math.PI;
        var angleRotate = slider2.value*0.01*Math.PI;
        
        var eye = [400*Math.sin(angleCamera), 200.0, 400*Math.cos(angleCamera)];
        var target = [0,0,0];
        var up = [0,1,0];

        var tModel = mat4.create();
        mat4.fromRotation(tModel, angleRotate, [1,1,1]);
        mat4.scale(tModel,tModel,[100,100,100]);
    
        var tCamera = mat4.create();
        mat4.lookAt(tCamera,eye,target,up);
        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);
        var tMVP = mat4.create();
        var tMV = mat4.create();
        mat4.multiply(tMV,tCamera,tModel); //ModelView
        var tMVn = mat3.create();
        mat3.normalFromMat4(tMVn, tMV);
        mat4.multiply(tMVP,tProjection,tMV);
        var light = [Math.sin(lightDir),1.5,Math.cos(lightDir)];

        //clear screen, preparing for rendering
        gl.clearColor(0.97, 0.75, 0.75, 1.00);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //set up uniforms and attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
        gl.uniformMatrix3fv(shaderProgram.MVnormalMatrix,false,tMVn);
        gl.uniform3fv(shaderProgram.movingLight,light);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize, gl.FLOAT, false, 0,0); 
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, normalBuffer.itemSize, gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.TexCoordAttribute, textureBuffer.itemSize, gl.FLOAT, false, 0,0);

        // Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture3);

        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE,0);
    }
    draw();
    slider1.addEventListener("input",change);
    slider2.addEventListener("input",change);
    slider3.addEventListener("input",change);
    initTextureThenDraw();
}
window.onload = setup;
