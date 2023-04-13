class Truck{
    constructor(x,y){
        this.cx = x;
        this.cy = y;
        this.width = 20;
        this.clength = 30;
        this.gap = 10;
        this.tlength = this.clength*4;
        this.mx=0;
        this.my=0;
        this.tx = this.cx;
        this.ty = this.cy+((this.clength+this.tlength)/2)+this.gap;  
        this.cAngle = 0.785;
        this.tAngle = this.cAngle;
        this.controls=new Controls();

        this.steerAngle=0;
        this.dsteerAngle=0.02;
        this.maxsteerAngle=0.5;
        this.powerSteer=true;

        this.fAngle = this.cAngle+this.steerAngle;

        this.cH = new Vector(-1,-1);
        this.sH = this.cH.rot(this.steerAngle)
        this.cforce = new Vector(0,0);
        this.cfricf = new Vector(0,0);
        this.cfricr = new Vector(0,0);
        this.cacc = new Vector(0,0);
        this.cvel = new Vector(0,0);

        this.cf=0.1;
        this.rfric=-0.005;
        this.sfric=-0.00;
        
        this.cmass=1;
        this.ctor=0;
        this.calpha=0;
        this.comega=0;
        this.cmoi=30;
    }


    #createTrailer(){
        const points=[];
        const rad = Math.hypot(this.width,this.tlength)/2;
        const alpha = Math.atan2(this.width, this.tlength);
        points.push({
            x:this.tx-Math.sin(this.tAngle-alpha)*rad,
            y:this.ty-Math.cos(this.tAngle-alpha)*rad
        });
        points.push({
            x:this.tx-Math.sin(this.tAngle+alpha)*rad,
            y:this.ty-Math.cos(this.tAngle+alpha)*rad
        });
        points.push({
            x:this.tx-Math.sin(Math.PI+this.tAngle-alpha)*rad,
            y:this.ty-Math.cos(Math.PI+this.tAngle-alpha)*rad
        });
        points.push({
            x:this.tx-Math.sin(Math.PI+this.tAngle+alpha)*rad,
            y:this.ty-Math.cos(Math.PI+this.tAngle+alpha)*rad
        });
        return points;
    }
    #createCar(){
        const points=[];
        const rad = Math.hypot(this.width,this.clength)/2;
        const alpha = Math.atan2(this.width, this.clength);
        points.push({
            x:this.cx-Math.sin(this.cAngle-alpha)*rad,
            y:this.cy-Math.cos(this.cAngle-alpha)*rad
        });
        points.push({
            x:this.cx-Math.sin(this.cAngle+alpha)*rad,
            y:this.cy-Math.cos(this.cAngle+alpha)*rad
        });
        points.push({
            x:this.cx-Math.sin(Math.PI+this.cAngle-alpha)*rad,
            y:this.cy-Math.cos(Math.PI+this.cAngle-alpha)*rad
        });
        points.push({
            x:this.cx-Math.sin(Math.PI+this.cAngle+alpha)*rad,
            y:this.cy-Math.cos(Math.PI+this.cAngle+alpha)*rad
        });
        return points;
    }

    update(){
        // initialize vectors

        // vehicle head unit
        // steer head unit
        // steer angle unit
        // f
        // a
        // v

        // a = 0
        // sh = vh + sa
        // forward
        // f += sh * k1


        // fsh -= v perp sh  * k2
        // fsh -= v proj sh  * k3

        // fvh -= v proj vh  * k3
        // fvh -= v perp vh  * k2

        // ang = angdiff fsh vh
        // fsh * wb/2 * sin(angdiff)
        this.updateControls();
        
        this.saturate();
        
        // this.friction();
        this.dynamics();
        // this.saturate();
        
        this.move();
        
        
        this.car=this.#createCar();
        this.trailer= this.#createTrailer();
        this.updateTrailer();
        
        // console.log(this.cft, this.cff, this.cffAngle, this.cfx, this.cfy);
        
    }

    updateControls(){
        if(this.controls.forward){
            this.cforce = this.sH.scale(this.cf);
        }
        else{
            this.cforce = new Vector(0,0);
        }
        if(this.controls.reverse){
            this.cforce = this.sH.scale(this.cf*-0.5);
        }
        if(this.controls.brake){
            this.rfric = -0.05;
        }
        else{
            this.rfric = -0.005;
        }
        if(this.controls.left){
            this.steerAngle+=this.dsteerAngle;
        }
        if(this.controls.right){
            this.steerAngle-=this.dsteerAngle;
        }
        if(this.controls.right==false && this.controls.left==false && this.powerSteer){
            this.steerAngle-=this.steerAngle*0.05;
            if(Math.abs(this.steerAngle)<0.005){
                this.steerAngle=0;
            }
        }
        
    }


    saturate(){
        if(Math.abs(this.steerAngle)>this.maxsteerAngle){
            this.steerAngle *= this.maxsteerAngle/Math.abs(this.steerAngle);
        }

        if(this.cvel.mag()<0.001){
            this.cvel = new Vector(0,0);
        }
        // if(this.comega<0.001){
        //     this.comega = 0;
        // }
        // if(this.calpha<0.001){
        //     this.calpha = 0;
        // }
        // if(this.cforce<0.04){
        //     this.cforce = 0;
        // }
        
    }

    // friction(){
        
    // }

    dynamics(){
        this.sH = this.cH.rot(-this.steerAngle);
        
        this.cfricf = ((this.cvel.proj(this.sH)).unit().scale(this.rfric)).add((this.cvel.perp(this.sH)).unit().scale(this.sfric));
        this.cfricr = ((this.cvel.proj(this.cH)).unit().scale(this.rfric)).add((this.cvel.perp(this.cH)).unit().scale(this.sfric));
        
        this.ctor = 0;
        this.ctor -= this.cfricf.mag()*this.clength*0.5*Math.sin(this.cfricf.angdiff(this.cH));
        this.ctor -= this.cfricr.mag()*this.clength*0.5*Math.sin(this.cfricr.angdiff(this.cH));
        this.ctor -= this.cforce.mag()*this.clength*0.5*Math.sin(this.cforce.angdiff(this.cH));
        this.ctor -= this.comega*50;
        this.cforce = (this.cforce.add(this.cfricf)).add(this.cfricr);
        // console.log("force", this.cforce, "front fric", this.cfricf, "rear fric", this.cfricr);
    }

    move(){
        this.cacc = this.cforce.scale(1/this.cmass);
        this.cvel = this.cvel.add(this.cacc.scale(1/fps));
        
        this.calpha = this.ctor * (1/this.cmoi);
        this.comega += this.calpha * (1/fps);

        // this.saturate();

        this.cx += this.cvel.x * (1/fps);
        this.cy += this.cvel.y * (1/fps);
        this.cH = this.cH.rot(this.comega * (1/fps));
        this.cAngle = this.cH.ang();
    }

    updateTrailer(){
        this.mx = this.cx+(this.gap+this.clength/2)*Math.sin(this.cAngle);
        this.my = this.cy+(this.gap+this.clength/2)*Math.cos(this.cAngle);
        this.tAngle += Math.sin(wrap(this.cAngle-this.tAngle))*this.cf*(this.tlength/2)/1000
        this.tx = this.mx+(this.tlength/2)*Math.sin(this.tAngle);
        this.ty = this.my+(this.tlength/2)*Math.cos(this.tAngle);
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.car[0].x,this.car[0].y);
        for(let i=1;i<this.car.length;i++){
            ctx.lineTo(this.car[i].x,this.car[i].y);
        }
        ctx.fill()
        
        // ctx.beginPath();
        // ctx.moveTo(this.trailer[0].x,this.trailer[0].y);
        // for(let i=1;i<this.trailer.length;i++){
        //     ctx.lineTo(this.trailer[i].x,this.trailer[i].y);
        // }
        // ctx.fill()

        ctx.beginPath();
        ctx.arc(this.mx, this.my, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100+(this.sH.x)*30, 100+(this.sH.y)*30);
        ctx.moveTo(100, 200);
        ctx.lineTo(100+(this.cH.x)*30, 200+(this.cH.y)*30);
        ctx.moveTo(100, 100);
        ctx.lineTo(100+(this.cvel.x)*30, 100+(this.cvel.y)*30);
        ctx.moveTo(100, 100);
        ctx.lineTo(100+(this.cvel.proj(this.sH).x)*30, 100+(this.cvel.proj(this.sH).y)*30);
        ctx.moveTo(100, 100);
        ctx.lineTo(100+(this.cvel.perp(this.sH).x)*30, 100+(this.cvel.perp(this.sH).y)*30);
        ctx.moveTo(100, 400);
        ctx.lineTo(100+(this.cfricf.x)*2000, 400+(this.cfricf.y)*2000);
        ctx.moveTo(100, 400);
        ctx.lineTo(100+(this.cvel.x)*2000, 400+(this.cvel.y)*2000);
        ctx.moveTo(100, 500);
        ctx.lineTo(100+(this.cfricr.x)*2000, 500+(this.cfricr.y)*2000);
        ctx.moveTo(100, 0);
        ctx.lineTo(100, 1000);
        ctx.stroke();
    }
}


