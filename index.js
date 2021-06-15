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
    this.spin = 0;
    this.spinIncrement = 18;
}

    draw(){
        this.jump();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
        if(this.shouldjump) this.counterRotation();
    }

    jump(){
        
        if(this.shouldjump){
            
            this.jumpcounter++;
            
            if(this.place)

            {
            if(this.jumpcounter<11 && this.y>150)
                this.y -=this.jumpheight;

                this.rotation();

            if(this.jumpcounter>=11)
                {this.shouldjump=false;
                    this.counterRotation();
                    this.spin = 0;
                    this.place=false;}
                }


            else{
                if(this.jumpcounter<11 && this.y<400)
                this.y +=this.jumpheight;

                this.rotation();

            if(this.jumpcounter>=11)
                {this.shouldjump=false;
                    this.counterRotation();
                    this.spin = 0;
                    this.place=true;}
                }
                

        }
    }

    rotation() {
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition,offsetYPosition);
        //Division is there to convert degrees into radians
        ctx.rotate(this.spin * Math.PI / 180);
        ctx.rotate(this.spinIncrement * Math.PI / 180 );
        ctx.translate(-offsetXPosition,-offsetYPosition);
        //4.5 because 90 / 20 (number of iterations in jump) is 4.5
        this.spin += this.spinIncrement;
    }

    counterRotation() {
        //This rotates the cube back to its origin so that it can be moved upwards properly
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition,offsetYPosition);
        ctx.rotate(-this.spin * Math.PI / 180 );
        ctx.translate(-offsetXPosition,-offsetYPosition);
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
