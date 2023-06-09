class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.spd=0;
        this.acc=0.07;
        this.racc=0.02;
        this.dir=1;
        this.maxspd=this.height/2;
        this.frc=0;
        this.maxangle=0.5;
        this.angle=0;
        this.steer=0.04;
        this.carAngle=0;
        this.carSteer=0;
        this.maxCarSteer=0.04;
        this.brakeRatio=0.96;

        this.tirew=this.width/4;
        this.tirer=this.height/4;
        this.wb=this.height-this.tirer;
        this.track=this.width-this.tirew;
        this.controls=new Controls();
        this.vec=new Vector(this.x,this.y,this.angle,this.width,this.height,this.tirew,this.tirer);
        
    }

    update(){
        if(this.controls.forward){
            this.spd+=this.acc;
        }
        if(this.controls.reverse){
            this.spd-=this.racc;
        }
        if(this.controls.brake){
            this.spd*=this.brakeRatio;
        }
        if(this.controls.left){
            this.angle+=this.steer;
        }
        if(this.controls.right){
            this.angle-=this.steer;
        }
        if(this.controls.right==false && this.controls.left==false){
            this.angle-=this.angle*0.1;
        }

        this.calcfric();
        this.saturate();
        
        
        this.updatevec();
        this.saturate();
        this.carAngle+=this.carSteer;

        this.saturate();

        this.y-=this.spd * Math.cos(this.carAngle);
        this.x-=this.spd * Math.sin(this.carAngle);
        
    }

    updatevec(){
        this.vec.angle=this.angle;
        this.vec.x=this.x;
        this.vec.y=this.y;
        this.vec.updateAckermann();
        if(this.vec.r!=0){
            this.carSteer = this.spd/this.vec.r * Math.sign(this.angle);
        }
    }

    calcfric(){
        this.frc = (this.maxspd/2000 + Math.abs(this.spd**2/500))
        this.dir = Math.sign(this.spd)
        if(Math.abs(this.spd)>this.frc){
            this.spd-=this.frc*this.dir
        }
        else{
            this.spd=0
        }
    }
    saturate(){
        if(this.spd>this.maxspd){
            this.spd=this.maxspd;
        }
        if(this.spd<-this.maxspd){
            this.spd=-this.maxspd;
        }
        if(this.angle>this.maxangle){
            this.angle=this.maxangle;
        }
        if(this.angle<-this.maxangle){
            this.angle=-this.maxangle;
        }
        if(this.carSteer>this.maxCarSteer){
            this.carSteer=this.maxCarSteer;
        }
        if(this.carSteer<-this.maxCarSteer){
            this.carSteer=-this.maxCarSteer;
        }
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.carAngle);
        ctx.beginPath();
        ctx.fillStyle="black"
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle="darkred"
        ctx.rect(
            -this.width/2,
            this.height/2-this.tirer,
            this.tirew,
            this.tirer
        );
        ctx.rect(
            this.width/2-this.tirew,
            this.height/2-this.tirer,
            this.tirew,
            this.tirer
        );
        ctx.fill();
        
        // ctx.restore();
        
        this.vec.draw(ctx);
    }
}