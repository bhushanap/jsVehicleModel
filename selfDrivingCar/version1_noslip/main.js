const canvas=document.getElementById("myCanvas");

canvas.width=600;

const ctx = canvas.getContext("2d");
const car=new Car(100,100,20,25);


animate();

function animate(){
    car.update();
    canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}

