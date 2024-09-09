const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.9)

const N = 1000;
const cars = generateCars(N);

let bestCar = cars[0];
if (localStorage.getItem("bestBrain")){
    for (let i = 0; i < cars.length; i++){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        // mutate all the not best cars
        if (i!= 0){
            NerualNetwork.mutate(cars[i].brain, 0.1);
        }
    }
    // bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"));
}

if (localStorage.getItem("bestBrain")){
    console.log(JSON.parse(localStorage.getItem("bestBrain")));
} else {
    console.log('nothing is saved');
}



const traffic = [new Car (road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
new Car (road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
new Car (road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2)]

animate();

function save (){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars = [];
    for (let i = 1; i <= N; i++){
        cars.push(new Car (road.getLaneCenter(1), 100, 30, 50, "AI"));
    }

    return cars;
}

function animate(){

    for (let i = 0; i < traffic.length; i++){
        // do not really wanna traffics to get damaged
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic);
    }
    // find the furthest cars
    bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -bestCar.y + canvas.height*.7);

    road.draw(ctx);
    
    for (let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx, "red");
    }

    ctx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++){
        cars[i].draw(ctx, "blue");
    }
    ctx.globalAlpha = 1;

    bestCar.draw(ctx,"blue", true);

    ctx.restore();
    requestAnimationFrame(animate);
}
