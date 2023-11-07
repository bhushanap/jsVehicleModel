class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.spd=0;
        this.acc=0.01;
        this.racc=0.002;
        this.dir=1;
        this.maxspd=this.height/2;
        this.frc=0;
        this.maxangle=0.5;
        this.angle=0;
        this.steer=0.002;
        this.carAngle=0;
        this.carSteer=0;
        this.maxCarSteer=0.01;
        this.brakeRatio=0.96;

        this.tirew=this.width/4;
        this.tirer=this.height/4;
        this.wb=this.height-this.tirer;
        this.track=this.width-this.tirew;
        this.controls=new Controls();
        this.vec=new Vector(this.x,this.y,this.angle,this.width,this.height,this.tirew,this.tirer);
        this.sensor=new Sensors(this, 5, Math.PI/3, 100)
        this.damaged=false;
    }

    #createPolygon(){
        const points=[];
        const rad = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x:this.x-Math.sin(this.carAngle-alpha)*rad,
            y:this.y-Math.cos(this.carAngle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.carAngle+alpha)*rad,
            y:this.y-Math.cos(this.carAngle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.carAngle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.carAngle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.carAngle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.carAngle+alpha)*rad
        });
        return points
    }

    update(borders){
        if(!this.damaged){
        this.#move();

        this.calcfric();
        this.saturate();
        
        
        this.updatevec();
        
        this.saturate();
        this.carAngle+=this.carSteer;

        this.saturate();

        this.y-=this.spd * Math.cos(this.carAngle);
        this.x-=this.spd * Math.sin(this.carAngle);
        this.polygon=this.#createPolygon();
        this.damaged=this.#assessDamage(borders);
        
        }
        
        this.sensor.update(borders);
    }

    #assessDamage(borders){
        for(let i=0;i<borders.length;i++){
            if(polysIntersect(this.polygon,borders[i])){
                return true;
            }
        }
        return false;
    }

    #move(){
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
        this.frc = (this.maxspd/20000 + Math.abs(this.spd**2/200))
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
        // ctx.save();
        // ctx.translate(this.x,this.y)
        // ctx.rotate(-this.carAngle);
        // ctx.beginPath();
        // ctx.fillStyle="black"
        // ctx.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );
        // ctx.fill();
        if(this.damaged){
            ctx.fillStyle='gray';
        }
        else{
            ctx.fillStyle='black';
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill()
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.carAngle);
        this.vec.draw(ctx);
        ctx.restore();
        this.sensor.draw(ctx);
        // ctx.restore();
    }
}