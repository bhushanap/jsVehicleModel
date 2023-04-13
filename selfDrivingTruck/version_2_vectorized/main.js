const canvas=document.getElementById("myCanvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx = canvas.getContext("2d");
const truck=new Truck(canvas.width/2,canvas.height/2);
const fps = 1;

animate();

function animate(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    truck.update();
    ctx.save();
    ctx.translate(-truck.x+canvas.width*0.5,-truck.y+canvas.height*0.5);
    truck.draw(ctx);
    requestAnimationFrame(animate);
}

