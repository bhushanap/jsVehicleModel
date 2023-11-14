const carCanvas=document.getElementById("carCanvas");
carCanvas.width=300;//window.innerWidth/2;
carCanvas.height=window.innerHeight;

const networkCanvasCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;
networkCanvas.height=window.innerHeight;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9,5);
const boundary=new Borders();
const traffic=[new Car(road.laneCenter(2),carCanvas.height/2-150,20,30,"DUMMY",0.4),
                new Car(road.laneCenter(3),carCanvas.height/2-200,20,30,"DUMMY",0.4)];
const n = 20;
for(let i=0;i<n;i++){
    let lane = Math.floor(5*Math.random())+1;
    let y = 200 + 1000*Math.random();
    let speed = 0.25 + 0.5*Math.random();
    traffic.push(new Car(road.laneCenter(lane),carCanvas.height/2-y,20,30,"DUMMY",speed));
}
const car=new Car(carCanvas.width/2,carCanvas.height/2,20,30,"KEYS",1);


animate();

function animate(){
    for (let i=0; i<traffic.length; i++){
        traffic[i].update(boundary.borders,[]);
    };
    car.update(boundary.borders, traffic);
    carCanvas.width=300;
    carCanvas.height=window.innerHeight;

    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.5);
    boundary.draw(carCtx);
    road.draw(carCtx);
    for (let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx);
    };
    car.draw(carCtx);
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}

