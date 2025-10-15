// Global variables
var canvas, context, slider1, slider2;
var button = 0;
var cars = [];
var lastSpawnTime = 0;
var spawnInterval = 2000;
var maxCars = 8;

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function moveToTx(loc,Tx) {
    var res=vec2.create(); 
    vec2.transformMat3(res,loc,Tx); 
    context.moveTo(res[0],res[1]);
}

function lineToTx(loc,Tx) {
    var res=vec2.create(); 
    vec2.transformMat3(res,loc,Tx); 
    context.lineTo(res[0],res[1]);
}

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

var arc = function(t, size, p) {
    var x = size * Math.cos(p * Math.PI * t);
    var y = size * Math.sin(p * Math.PI * t);
    return [x,y];
}

function drawArc(t_begin,t_end,intervals,C,Tx,color,size, p) {
    context.strokeStyle=color;
    context.beginPath();
    for(var i=1;i<=intervals;i++){
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
        lineToTx(C(t, size, p),Tx);
    }
    context.stroke();
}

function drawDashArc(t_begin,t_end,intervals,C,Tx,color,size, p) {
    context.strokeStyle=color;
    context.beginPath();
    for(var i=1;i<=intervals;i++){
        context.setLineDash([10, 15]);
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
        lineToTx(C(t, size, p),Tx);
    }
    context.stroke();
    context.setLineDash([]);
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

// Car class for dynamic behavior
function Car(id, pathType, entryPoint, color) {
    this.id = id;
    this.pathType = pathType; // 1, 2, or 3
    this.entryPoint = entryPoint; // 0-3 for different entry points
    this.color = color;
    this.t = 0;
    this.speed = 0.5 + Math.random() * 1.5; // Random speed between 0.5-2.0
    this.maxSpeed = this.speed;
    this.position = [0, 0];
    this.targetExit = Math.floor(Math.random() * 4); // Random exit
    this.spawnTime = Date.now();
    this.active = true;
}

Car.prototype.update = function(deltaTime) {
    if (!this.active) return;
    
    // Calculate proposed new position
    var proposedT = this.t + this.speed * deltaTime * 0.001;
    var proposedPosition = this.calculatePositionAtT(proposedT);
    
    // Check for collisions with proposed position
    var collisionDetected = this.checkCollision(proposedPosition);
    
    if (collisionDetected) {
        // Reduce speed significantly to avoid collision
        this.speed = Math.max(0.05, this.speed * 0.7);
        
        // Try a smaller movement
        proposedT = this.t + this.speed * deltaTime * 0.001;
        proposedPosition = this.calculatePositionAtT(proposedT);
        
        // If still colliding, stop completely
        if (this.checkCollision(proposedPosition)) {
            this.speed = 0.01; // Almost stopped
        }
    } else {
        // No collision, gradually return to normal speed
        this.speed = Math.min(this.maxSpeed, this.speed * 1.05);
    }
    
    // Update position
    this.t = proposedT;
    this.position = proposedPosition;
    
    // Remove car if it has completed its journey
    if (this.t > this.getMaxT()) {
        this.active = false;
    }
};

Car.prototype.calculatePositionAtT = function(t) {
    if (this.pathType === 1) {
        return this.getPath1PositionAtT(t);
    } else if (this.pathType === 2) {
        return this.getPath2PositionAtT(t);
    } else if (this.pathType === 3) {
        return this.getPath3PositionAtT(t);
    }
    return [0, 0];
};

Car.prototype.checkCollision = function(position) {
    var minSafeDistance = 70; // Minimum safe distance between cars
    
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].id !== this.id && cars[i].active) {
            var dx = position[0] - cars[i].position[0];
            var dy = position[1] - cars[i].position[1];
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            // Additional check: if cars are moving towards each other, increase safe distance
            if (distance < minSafeDistance) {
                // Check if cars are on similar paths and moving towards each other
                var isMovingTowards = this.isMovingTowardsCar(cars[i], position);
                var adjustedDistance = isMovingTowards ? minSafeDistance + 20 : minSafeDistance;
                
                if (distance < adjustedDistance) {
                    return true; // Collision detected
                }
            }
        }
    }
    return false; // No collision
};

Car.prototype.isMovingTowardsCar = function(otherCar, myPosition) {
    // Simple heuristic: if cars are on the same path type and close, they might be moving towards each other
    if (this.pathType === otherCar.pathType && this.entryPoint === otherCar.entryPoint) {
        // Check if the other car is ahead of us on the same path
        var pathDifference = Math.abs(this.t - otherCar.t);
        if (pathDifference < 0.5) { // Close on the path
            return true;
        }
    }
    return false;
};

Car.prototype.getPath1Position = function() {
    return this.getPath1PositionAtT(this.t);
};

Car.prototype.getPath1PositionAtT = function(t) {
    var entryPositions = [
        [canvas.width, canvas.height], // Bottom right
        [0, 0], // Top left
        [0, canvas.height], // Bottom left
        [canvas.width, 0] // Top right
    ];
    var entryRotations = [180, 0, -90, 90];
    
    var Tblue_to_canvas = mat3.create();
    mat3.fromTranslation(Tblue_to_canvas, entryPositions[this.entryPoint]);
    mat3.rotate(Tblue_to_canvas, Tblue_to_canvas, toRadians(entryRotations[this.entryPoint]));
    
    var Tgreen_to_blue = mat3.create();
    mat3.fromTranslation(Tgreen_to_blue, arc(t, 225, 1/4));
    var tangent = arc_tangent(t, 225, 1/4);
    var angle = Math.atan2(tangent[1], tangent[0]);
    mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle + toRadians(-90));
    
    var Tgreen_to_canvas = mat3.create();
    mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
    
    var result = vec2.create();
    vec2.transformMat3(result, [0, 0], Tgreen_to_canvas);
    return result;
};

Car.prototype.getPath2Position = function() {
    return this.getPath2PositionAtT(this.t);
};

Car.prototype.getPath2PositionAtT = function(t) {
    var entryPositions = [
        [canvas.width, canvas.height/2 - 25],
        [canvas.width/2 + 25, canvas.height],
        [0, canvas.height/2 + 25],
        [canvas.width/2 - 25, 0]
    ];
    var entryRotations = [180, -90, 0, 90];
    
    var Tblue_to_canvas = mat3.create();
    mat3.fromTranslation(Tblue_to_canvas, entryPositions[this.entryPoint]);
    mat3.rotate(Tblue_to_canvas, Tblue_to_canvas, toRadians(entryRotations[this.entryPoint]));
    
    var Tgreen_to_blue = mat3.create();
    mat3.fromTranslation(Tgreen_to_blue, Ccomp(t));
    var tangent = Ccomp_tangent(t);
    var angle = Math.atan2(tangent[1], tangent[0]);
    mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle + toRadians(-90));
    
    var Tgreen_to_canvas = mat3.create();
    mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
    
    var result = vec2.create();
    vec2.transformMat3(result, [0, 0], Tgreen_to_canvas);
    return result;
};

Car.prototype.getPath3Position = function() {
    return this.getPath3PositionAtT(this.t);
};

Car.prototype.getPath3PositionAtT = function(t) {
    var entryPositions = [
        [0, canvas.width/2 + 25],
        [canvas.width, canvas.height/2 - 25],
        [canvas.width, canvas.height/2 - 25],
        [0, canvas.height/2 + 25]
    ];
    var entryRotations = [0, 180, 180, 0];
    
    var Tblue_to_canvas = mat3.create();
    mat3.fromTranslation(Tblue_to_canvas, entryPositions[this.entryPoint]);
    mat3.rotate(Tblue_to_canvas, Tblue_to_canvas, toRadians(entryRotations[this.entryPoint]));
    
    var Tgreen_to_blue = mat3.create();
    mat3.fromTranslation(Tgreen_to_blue, Ccomp_P3(t));
    var tangent = Ccomp_tangent_P3(t);
    var angle = Math.atan2(tangent[1], tangent[0]);
    mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle + toRadians(-90));
    
    var Tgreen_to_canvas = mat3.create();
    mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
    
    var result = vec2.create();
    vec2.transformMat3(result, [0, 0], Tgreen_to_canvas);
    return result;
};

Car.prototype.getMaxT = function() {
    if (this.pathType === 1) return 2.0;
    if (this.pathType === 2) return 4.0;
    if (this.pathType === 3) return 5.0;
    return 2.0;
};

Car.prototype.draw = function() {
    if (!this.active) return;
    
    var Tgreen_to_canvas = mat3.create();
    mat3.fromTranslation(Tgreen_to_canvas, this.position);
    
    // Calculate rotation based on movement direction
    var rotation = 0;
    if (this.pathType === 1) {
        var tangent = arc_tangent(this.t, 225, 1/4);
        rotation = Math.atan2(tangent[1], tangent[0]) + toRadians(-90);
    } else if (this.pathType === 2) {
        var tangent = Ccomp_tangent(this.t);
        rotation = Math.atan2(tangent[1], tangent[0]) + toRadians(-90);
    } else if (this.pathType === 3) {
        var tangent = Ccomp_tangent_P3(this.t);
        rotation = Math.atan2(tangent[1], tangent[0]) + toRadians(-90);
    }
    
    mat3.rotate(Tgreen_to_canvas, Tgreen_to_canvas, rotation);
    car(this.color, Tgreen_to_canvas);
};

// Spawn new cars dynamically
function spawnCar() {
    if (cars.length >= maxCars) return;
    
    var now = Date.now();
    if (now - lastSpawnTime < spawnInterval) return;
    
    var pathType = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    var entryPoint = Math.floor(Math.random() * 4); // 0-3
    var colors = ["red", "blue", "green", "orange", "purple", "yellow"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    
    // Check if spawn position is safe
    var spawnPosition = getSpawnPosition(pathType, entryPoint);
    if (isSpawnPositionSafe(spawnPosition)) {
        var newCar = new Car(cars.length, pathType, entryPoint, color);
        cars.push(newCar);
        lastSpawnTime = now;
        
        // Randomize next spawn interval
        spawnInterval = 1000 + Math.random() * 3000; // 1-4 seconds
    }
}

function getSpawnPosition(pathType, entryPoint) {
    // Calculate where a car would spawn for this path and entry point
    var tempCar = new Car(-1, pathType, entryPoint, "temp");
    tempCar.t = 0;
    return tempCar.calculatePositionAtT(0);
}

function isSpawnPositionSafe(position) {
    var minSpawnDistance = 100; // Minimum distance from existing cars
    
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].active) {
            var dx = position[0] - cars[i].position[0];
            var dy = position[1] - cars[i].position[1];
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minSpawnDistance) {
                return false; // Too close to existing car
            }
        }
    }
    return true; // Safe to spawn
}

var lastTime = 0;

function runner(currentTime){
    context.clearRect(0, 0, canvas.width, canvas.height);
    background();
    
    // Calculate delta time for smooth animation
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // Spawn new cars
    spawnCar();
    
    // Update and draw all active cars
    for (var i = cars.length - 1; i >= 0; i--) {
        cars[i].update(deltaTime);
        cars[i].draw();
        
        // Remove inactive cars
        if (!cars[i].active) {
            cars.splice(i, 1);
        }
    }
    
    // Draw path visualization if button is pressed
    if (button == 1) {
        // Draw all possible paths
        var Tblue_to_canvas = mat3.create(); 
        mat3.fromTranslation(Tblue_to_canvas,[canvas.height/2,canvas.width/2]);
        
        drawArc(0.0,2.0,100, arc,Tblue_to_canvas,"green", 225, 1/4);
        drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
        drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"blue");
        drawTrajectory(0.0,1.0,100,C2,Tblue_to_canvas,"purple");
        drawTrajectory(0.0,1.0,100,C3,Tblue_to_canvas,"purple");
        drawTrajectory(0.0,1.0,100,C2_,Tblue_to_canvas,"purple");
        drawTrajectory(0.0,1.0,100,C3_,Tblue_to_canvas,"purple");
        drawTrajectory(0.0,1.0,100,C4_,Tblue_to_canvas,"purple");
    }
    
    window.requestAnimationFrame(runner);
}

function setup() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    slider1 = document.getElementById('slider1');
    slider2 = document.getElementById('slider2');
    slider1.value = 0;
    slider2.value = 1;

    // Initialize path definitions with actual canvas dimensions
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

    var P0 = [p0,d0,p1,d1];
    var P1 = [p1,d1,p2,d2];
    var P2 = [p2, d2, p3, d3];
    var P3 = [p3, d3, p4, d4];

    var p3_ = [360, -20];
    var d3_ = [0, -170];
    var B2 = [p2, d2, p3_, d3_];

    var p4_ = [canvas.width/2 + 25, -130];
    var d4_ = [-40, -50];
    var B3 = [p3_, d3_, p4_, d4_];
    
    var p5_ = [canvas.width/2 + 25, -canvas.width/2 -25];
    var d5_ = [0, -1];
    var B4 = [p4_, d4_, p5_, d5_];

    // Initialize path functions
    window.C0 = function(t_) {return Cubic(Hermite,P0,t_);};
    window.C1 = function(t_) {return Cubic(Hermite,P1,t_);};
    window.C2 = function(t_) {return Cubic(Hermite,P2,t_);};
    window.C3 = function(t_) {return Cubic(Hermite,P3,t_);};
    window.C2_ = function(t_) {return Cubic(Hermite,B2,t_);};
    window.C3_ = function(t_) {return Cubic(Hermite,B3,t_);};
    window.C4_ = function(t_) {return Cubic(Hermite,B4,t_);};

    window.Ccomp = function(t) {
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

    window.Ccomp_P3 = function(t) {
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

    window.C0prime = function(t_) {return Cubic(HermiteTangent,P0,t_);};
    window.C1prime = function(t_) {return Cubic(HermiteTangent,P1,t_);};
    window.C2prime = function(t_) {return Cubic(HermiteTangent,P2,t_);};
    window.C3prime = function(t_) {return Cubic(HermiteTangent,P3,t_);};
    window.C2prime_P3 = function(t_) {return Cubic(HermiteTangent,B2,t_);};
    window.C3prime_P3= function(t_) {return Cubic(HermiteTangent,B3,t_);};
    window.C4prime_P3= function(t_) {return Cubic(HermiteTangent,B4,t_);};

    window.Ccomp_tangent = function(t) {
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

    window.Ccomp_tangent_P3 = function(t) {
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

    slider1.addEventListener("input", function() {
        button = slider1.value;
    });
    
    slider2.addEventListener("input", function() {
        // Update global speed multiplier for all cars
        var globalSpeedMultiplier = slider2.value * 0.1;
        for (var i = 0; i < cars.length; i++) {
            cars[i].maxSpeed = cars[i].speed * globalSpeedMultiplier;
        }
        // Also update spawn interval based on speed
        spawnInterval = Math.max(500, 2000 - slider2.value * 30);
    });
    
    // Start the animation
    window.requestAnimationFrame(runner);
}

window.onload = setup;