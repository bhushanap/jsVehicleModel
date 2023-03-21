class Car{
    constructor(x,y,width,height,scaling){
        this.scaling=scaling;
        this.timesteps=60;
        this.x=x;
        this.y=y;
        this.velx=0;
        this.vely=0;
        this.accx=0;
        this.accy=0;
        this.force=0;
        this.forcex=0;
        this.forcey=0;
        this.angle=0;
        this.omega=0;
        this.alpha=0;
        this.torque=0;
        this.width=width*scaling;
        this.height=height*scaling;
        this.wheelRadius=20*scaling;
        this.wheelWidth=15*scaling;
        this.steerAngle=0;
        this.steerAngle2=0;
        this.r=0;
        this.steerAngleFL=0;
        this.steerAngleFR=0;
        this.mass=250*scaling**3;
        this.mu=1;
        this.g=981/this.timesteps;
        this.friction=this.mu*this.mass*this.g;
        this.moi=(this.width**2 + this.height**2)*this.mass/12;
        this.alphaDelta=1*scaling**4;
        this.steerMax=0.01;
        this.wheelFL=new Wheel(this.wheelRadius,this.wheelWidth,0.0002,this.scaling);
        this.wheelFR=new Wheel(this.wheelRadius,this.wheelWidth,0.0002,this.scaling);
        this.wheelRL=new Wheel(this.wheelRadius,this.wheelWidth,0.0002,this.scaling);
        this.wheelRR=new Wheel(this.wheelRadius,this.wheelWidth,0.0002,this.scaling);

        this.controls=new Controls();
        this.vec=new Vector(this.x,this.y,this.angle,this.width,this.height,this.tirew,this.tirer);
        
    }

    updateWheelAngle(){
        this.r = this.height/Math.tan(Math.abs(this.steerAngle)) + this.width/2
        this.steerAngle2 = Math.atan((this.height)/(this.r + this.width/2))
        if(this.steerAngle>0){
            this.wheelFL.angle=this.steerAngle + this.angle;
            this.wheelFR.angle=this.steerAngle2 + this.angle;
        }
        else if(this.steerAngle<0){
            this.wheelFL.angle=-this.steerAngle2 + this.angle;
            this.wheelFR.angle=this.steerAngle + this.angle;
        }
        else{
            this.wheelFL.angle=0;
            this.wheelFR.angle=0;
        }
    }

    updateVelocityWheel(){
        this.wheelFL.updateVelocity();
        this.wheelFR.updateVelocity();
        this.wheelRL.updateVelocity();
        this.wheelRR.updateVelocity();
    }

    updateForceWheel(){
        this.wheelFL.vel = ((this.wheelFL.velx + this.velx)**2 +  (this.wheelFL.vely + this.vely)**2)**0.5
        if(this.wheelFL.vel!=0){
            if(this.wheelFL.vel>(this.friction/this.mass)){
                this.wheelFL.forcex = -this.friction*0.25*(this.wheelFL.velx + this.velx)/(this.wheelFL.vel)
                this.wheelFL.forcey = -this.friction*0.25*(this.wheelFL.vely + this.vely)/(this.wheelFL.vel)
            }
            else{
                this.wheelFL.forcex=-((this.mass*0.25*this.velx) + (this.wheelFL.velx));
                this.wheelFL.forcey=-((this.mass*0.25*this.vely) + (this.wheelFL.vely));
            }
        }
        else{
            this.force = ((this.mass*0.25*this.accx)**2 +  (this.mass*0.25*this.accy)**2 + (this.wheelFL.fx)**2 + (this.wheelFL.fy)**2)**0.5
            if(this.force!=0){
                if(this.force>this.friction){
                this.wheelFL.forcex = -this.friction*((this.mass*0.25*this.accx) + (this.wheelFL.fx))/(this.force)
                this.wheelFL.forcey = -this.friction*((this.mass*0.25*this.accy) + (this.wheelFL.fy))/(this.force)
                }
                else{
                    this.wheelFL.forcex=-((this.mass*0.25*this.accx) + (this.wheelFL.fx));
                    this.wheelFL.forcey=-((this.mass*0.25*this.accy) + (this.wheelFL.fy));
                }
            }
            else{
                this.wheelFL.forcex=0;
                this.wheelFL.forcey=0;
            }
        }
        this.wheelFR.vel = ((this.wheelFR.velx + this.velx)**2 +  (this.wheelFR.vely + this.vely)**2)**0.5
        if(this.wheelFR.vel!=0){
            this.wheelFR.forcex = -this.friction*0.25*(this.wheelFR.velx + this.velx)/(this.wheelFR.vel)
            this.wheelFR.forcey = -this.friction*0.25*(this.wheelFR.vely + this.vely)/(this.wheelFR.vel)
        }
        else{
            this.force = ((this.mass*0.25*this.accx)**2 +  (this.mass*0.25*this.accy)**2 + (this.wheelFR.fx)**2 + (this.wheelFR.fy)**2)**0.5
            if(this.force!=0){
                if(this.force>this.friction){
                this.wheelFR.forcex = -this.friction*((this.mass*0.25*this.accx) + (this.wheelFR.fx))/(this.force)
                this.wheelFR.forcey = -this.friction*((this.mass*0.25*this.accy) + (this.wheelFR.fy))/(this.force)
                }
                else{
                    this.wheelFR.forcex=-((this.mass*0.25*this.accx) + (this.wheelFR.fx));
                    this.wheelFR.forcey=-((this.mass*0.25*this.accy) + (this.wheelFR.fy));
                }
            }
            else{
                this.wheelFR.forcex=0;
                this.wheelFR.forcey=0;
            }
        }
        this.wheelRL.vel = ((this.wheelRL.velx + this.velx)**2 +  (this.wheelRL.vely + this.vely)**2)**0.5
        if(this.wheelRL.vel!=0){
            this.wheelRL.forcex = -this.friction*0.25*(this.wheelRL.velx + this.velx)/(this.wheelRL.vel)
            this.wheelRL.forcey = -this.friction*0.25*(this.wheelRL.vely + this.vely)/(this.wheelRL.vel)
        }
        else{
            this.force = ((this.mass*0.25*this.accx)**2 +  (this.mass*0.25*this.accy)**2 + (this.wheelRL.fx)**2 + (this.wheelRL.fy)**2)**0.5
            if(this.force!=0){
                if(this.force>this.friction){
                this.wheelRL.forcex = -this.friction*((this.mass*0.25*this.accx) + (this.wheelRL.fx))/(this.force)
                this.wheelRL.forcey = -this.friction*((this.mass*0.25*this.accy) + (this.wheelRL.fy))/(this.force)
                }
                else{
                    this.wheelRL.forcex=-((this.mass*0.25*this.accx) + (this.wheelRL.fx));
                    this.wheelRL.forcey=-((this.mass*0.25*this.accy) + (this.wheelRL.fy));
                }
            }
            else{
                this.wheelRL.forcex=0;
                this.wheelRL.forcey=0;
            }
        }
        this.wheelRR.vel = ((this.wheelRR.velx + this.velx)**2 +  (this.wheelRR.vely + this.vely)**2)**0.5
        if(this.wheelRR.vel!=0){
            this.wheelRR.forcex = -this.friction*0.25*(this.wheelRR.velx + this.velx)/(this.wheelRR.vel)
            this.wheelRR.forcey = -this.friction*0.25*(this.wheelRR.vely + this.vely)/(this.wheelRR.vel)
        }
        else{
            this.force = ((this.mass*0.25*this.accx)**2 +  (this.mass*0.25*this.accy)**2 + (this.wheelRR.fx)**2 + (this.wheelRR.fy)**2)**0.5
            if(this.force!=0){
                if(this.force>this.friction){
                this.wheelRR.forcex = -this.friction*((this.mass*0.25*this.accx) + (this.wheelRR.fx))/(this.force)
                this.wheelRR.forcey = -this.friction*((this.mass*0.25*this.accy) + (this.wheelRR.fy))/(this.force)
                }
                else{
                    this.wheelRR.forcex=-((this.mass*0.25*this.accx) + (this.wheelRR.fx));
                    this.wheelRR.forcey=-((this.mass*0.25*this.accy) + (this.wheelRR.fy));
                }
            }
            else{
                this.wheelRR.forcex=0;
                this.wheelRR.forcey=0;
            }
        }
    }

    updateForceVehicle(){
        this.forcex = this.wheelFL.forcex + this.wheelFR.forcex + this.wheelRL.forcex + this.wheelRR.forcex;
        this.forcey = this.wheelFL.forcey + this.wheelFR.forcey + this.wheelRL.forcey + this.wheelRR.forcey; 
        this.accx = this.forcex/this.mass;
        this.accy = this.forcey/this.mass;
        this.velx += this.accx;
        this.vely += this.accy;
        this.x += this.velx;
        this.y += this.vely;
        this.torque = ((-this.wheelFL.forcex - this.wheelFR.forcex + this.wheelRL.forcex + this.wheelRR.forcex)*(this.height/2))
                        + ((-this.wheelFL.forcey + this.wheelFR.forcey - this.wheelRL.forcey + this.wheelRR.forcey)*(this.width/2));
        this.alpha = this.torque/this.moi;
        this.omega += this.alpha;
        this.angle += this.omega;
        
    }

    update(){
        

        if(this.controls.forward){
            this.wheelRL.alpha=this.alphaDelta;
            this.wheelRR.alpha=this.alphaDelta;
        }
        else if(this.controls.reverse){
            this.wheelRL.alpha=-this.alphaDelta;
            this.wheelRR.alpha=-this.alphaDelta;
        }
        else{
            this.wheelRL.alpha=0;
            this.wheelRR.alpha=0;
        }
        // if(this.controls.brake){
        //     this.spd*=this.brakeRatio;
        // }
        if(this.controls.left){
            this.steerAngle+=this.steerMax;
        }
        if(this.controls.right){
            this.steerAngle-=this.steerMax;
        }
        if(this.controls.right==false && this.controls.left==false){
            this.steerAngle-=this.steerAngle*0.1;
        }

        console.log(this.wheelRL.alpha,this.wheelRL.omega, this.wheelRL.vely, this.forcey, this.accy, this.vely, this.friction, this.mass)
        this.saturate();

        this.updateWheelAngle();
        this.updateVelocityWheel();
        this.updateForceWheel();
        this.updateForceVehicle();
        
    }

    saturate(){
        
        if(this.steerAngle>this.steerAngleMax){
            this.steerAngle=this.steerAngleMax;
        }
        if(this.steerAngle<-this.steerAngleMax){
            this.steerAngle=-this.steerAngleMax;
        }
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.angle);
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
        // ctx.fillStyle="darkred"
        // ctx.rect(
        //     -this.width/2,
        //     this.height/2-this.tirer,
        //     this.tirew,
        //     this.tirer
        // );
        // ctx.rect(
        //     this.width/2-this.tirew,
        //     this.height/2-this.tirer,
        //     this.tirew,
        //     this.tirer
        // );
        // ctx.fill();
        
        // ctx.restore();
        
        // this.vec.draw(ctx);
    }
}