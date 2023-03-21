class Wheel{
    constructor(radius, width, density,scaling){
        this.sclaing=scaling;
        this.radius=radius;
        this.width=width;
        this.density=density;
        this.velx=0;
        this.vely=0;
        this.accx=0;
        this.accy=0;
        this.forcex=0;
        this.forcey=0;
        this.fx=0;
        this.fy=0;
        this.vel=0; //above values are only of wheel, this value is wheel plus vehicle total
        this.acc=0; //above values are only of wheel, this value is wheel plus vehicle total
        this.omega=0;
        this.alpha=0;
        this.angle=0;
        this.mass=Math.PI*this.width*this.density*this.radius**2;
        this.moi=this.mass*0.5*this.radius**2;
    }
    updateVelocity(){
        this.omega+=this.alpha;
        this.vely=-this.omega*this.radius*Math.cos(this.angle)
        this.velx=this.omega*this.radius*Math.sin(this.angle)
        this.fy=-this.moi*this.alpha*(1/this.radius)*Math.cos(this.angle)
        this.fx=this.moi*this.alpha*(1/this.radius)*Math.sin(this.angle)
    }
}

    