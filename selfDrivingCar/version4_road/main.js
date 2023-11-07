<<<<<<< HEAD
const canvas=document.getElementById("myCanvas");
canvas.width=300;//window.innerWidth/2;
canvas.height=window.innerHeight;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9,5);
const boundary=new Borders();
const traffic=[new Car(road.laneCenter(2),canvas.height/2-150,20,30,"DUMMY",0.4),
                new Car(road.laneCenter(3),canvas.height/2-200,20,30,"DUMMY",0.4)];
const car=new Car(canvas.width/2,canvas.height/2,20,30,"KEYS",1);


animate();

function animate(){
    for (let i=0; i<traffic.length; i++){
        traffic[i].update(boundary.borders,[]);
    };
    car.update(boundary.borders, traffic);
    canvas.width=300;
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.5);
    boundary.draw(ctx);
    road.draw(ctx);
    for (let i=0; i<traffic.length; i++){
        traffic[i].draw(ctx);
    };
    car.draw(ctx);
    requestAnimationFrame(animate);
}

=======
const canvas=document.getElementById("myCanvas");
canvas.width=300;//window.innerWidth/2;
canvas.height=window.innerHeight;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9,5);
const boundary=new Borders();
const car=new Car(canvas.width/2,canvas.height/2,20,25);

animate();

function animate(){
    car.update(boundary.borders);
    canvas.width=300;
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.5);
    boundary.draw(ctx);
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

>>>>>>> 0c3814b474af73b8817bb3522daf4afe49d0099b
