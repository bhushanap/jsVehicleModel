<<<<<<< HEAD
class Borders{ 
constructor(){
    const canvas=document.getElementById("myCanvas");
    this.width=canvas.width*0.9;
    this.height=10000000;
    this.topLeft = {x:(canvas.width-this.width)/2,y:(canvas.height-this.height)/2};
    this.topRight = {x:(canvas.width+this.width)/2,y:(canvas.height-this.height)/2};
    this.bottomLeft = {x:(canvas.width-this.width)/2,y:(canvas.height+this.height)/2};
    this.bottomRight = {x:(canvas.width+this.width)/2,y:(canvas.height+this.height)/2};
    this.borders = [[this.topLeft,this.bottomLeft],
                    [this.topRight,this.bottomRight]];
                    // [this.bottomLeft,this.bottomRight],
                    // [this.topLeft,this.topRight]];
}

draw(ctx){

this.borders.forEach(border=>{
    ctx.beginPath();
    ctx.moveTo(border[0].x,border[0].y);
    ctx.lineTo(border[1].x,border[1].y);
    ctx.stroke();
})
}
=======
class Borders{ 
constructor(){
    const canvas=document.getElementById("myCanvas");
    this.width=canvas.width*0.9;
    this.height=10000000;
    this.topLeft = {x:(canvas.width-this.width)/2,y:(canvas.height-this.height)/2};
    this.topRight = {x:(canvas.width+this.width)/2,y:(canvas.height-this.height)/2};
    this.bottomLeft = {x:(canvas.width-this.width)/2,y:(canvas.height+this.height)/2};
    this.bottomRight = {x:(canvas.width+this.width)/2,y:(canvas.height+this.height)/2};
    this.borders = [[this.topLeft,this.bottomLeft],
                    [this.topRight,this.bottomRight]];
                    // [this.bottomLeft,this.bottomRight],
                    // [this.topLeft,this.topRight]];
}

draw(ctx){

this.borders.forEach(border=>{
    ctx.beginPath();
    ctx.moveTo(border[0].x,border[0].y);
    ctx.lineTo(border[1].x,border[1].y);
    ctx.stroke();
})
}
>>>>>>> 0c3814b474af73b8817bb3522daf4afe49d0099b
}