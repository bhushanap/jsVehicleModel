const canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx = canvas.getContext("2d");
const borders=new Borders();
const car=new Car(canvas.width/2,canvas.height/2,20,25);

animate();

function animate(){
    car.update(borders);
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(-car.x+canvas.width*0.5,-car.y+canvas.height*0.5);
    borders.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

