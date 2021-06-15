const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



class Player{
    constructor(x,y,size,color){
    this.x=x;
    this.y=y;
    this.size=size;
    this.color=color;
    this.shouldjump=false;
    this.jumpcounter=0;
    this.jumpheight=25;
    this.place=true;
}

    draw(){
        this.jump();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }

    jump(){
        
        if(this.shouldjump){
            this.jumpcounter++;
            
            if(this.place)
            {if(this.jumpcounter<11 && this.y>150)
                this.y -=this.jumpheight;

            if(this.jumpcounter>=11)
                {this.shouldjump=false;
                    this.place=false;}
                }
            else{
                if(this.jumpcounter<11 && this.y<400)
                this.y +=this.jumpheight;

            if(this.jumpcounter>=11)
                {this.shouldjump=false;
                    this.place=true;}
                }
            

        }
    }
}

let player = new Player(150,400,50,"black");

function drawline(){

    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(600,150);
    ctx.lineWidth = 1.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.moveTo(0,450);
    ctx.lineTo(600,450);
    ctx.stroke();
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawline();
    player.draw();
    requestAnimationFrame(animate);
}

animate();

addEventListener("keydown", e => {
    if(e.code === 'Space'){
        if(!player.shouldJump && (player.y===400 || player.y=== 150)){
            
            player.jumpcounter = 0;
            player.shouldjump = true;
           
        }
    }
});