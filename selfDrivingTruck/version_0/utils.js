function wrap(angle){
    angle = angle%(2*Math.PI)
    if(Math.abs(angle)>Math.PI){
       return angle - Math.sign(angle)*(2*Math.PI);
    }
    else{
        return angle
    }
}

function fricA(headA, velA){
    if(wrap(velA-headA)>0){
        return wrap(headA-(Math.PI/2))
    }
    else{
        return wrap(headA+(Math.PI/2))
    }
}