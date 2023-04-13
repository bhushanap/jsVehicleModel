class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(v2){
        return new Vector(this.x+v2.x, this.y+v2.y)//{x: this.x+v2.x,y: this.y+v2.y}
    }

    sub(v2){
        return new Vector(this.x-v2.x,  this.y-v2.y)//{x: this.x-v2.x,y: this.y-v2.y}
    }

    mag(){
        return (this.x**2 + this.y**2)**0.5
    }
    
    scale(k){
        return new Vector(this.x*k, this.y*k)//{x: this.x*k,y: this.y*k};
    }

    unit(){
        if(this.mag()==0){
            return this.scale(0);
        }
        else{
        return this.scale(1/this.mag());
    }
    }

    proj(v2){
        if(v2.mag()==0 || this.mag()==0){
            return new Vector(0,0);
        }
        else{
        let projl = (v2.x*this.x + v2.y*this.y) /  (v2.mag()**2);//this.mag());
        return new Vector(v2.x * projl, v2.y * projl)//{x: v2.x * projl,y: v2.y * projl}
        }
    }

    perp(v2){
        return this.sub(this.proj(v2));
    }

    ang(){
        return Math.atan2(-this.x,-this.y);
    }

    angdiff(v2){
        return wrap(this.ang()-v2.ang());
    }    

    rot(t){
        return new Vector(this.x*Math.cos(t) - this.y*Math.sin(t), this.x*Math.sin(t) + this.y*Math.cos(t));//{x: this.x*Math.cos(t) - this.y*Math.sin(t), y: this.x*Math.sin(t) + this.y*Math.cos(t)}
    }
}