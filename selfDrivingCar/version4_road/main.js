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

