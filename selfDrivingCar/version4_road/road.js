class Road{
    constructor(x,width,laneCount=3){
        this.x=this.x;
        this.width=width;
        this.laneCount=laneCount

        this.left = x-width/2;
        this.right = x+width/2;

        const infinity = 10000000;
        this.top = -infinity;
        this.bottom = infinity;

    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle='white';
        
        for(let i=0;i<=this.laneCount;i++){
            // console.log(i);
            if(i>0 && i<this.laneCount){
                ctx.setLineDash([20,20]);
            }
            else{
                ctx.setLineDash([]);
            }
            const x = lerp(this.left,this.right,i/this.laneCount);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
            // console.log(x);
        };

    }

    laneCenter(lane){
        return lerp(this.left,this.right,(lane-0.5)/this.laneCount);
    }
}