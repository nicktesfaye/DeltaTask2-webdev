const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let presetTime=1000;
let hspeed =5;
let up=1;



function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

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


class AvoidBlock {
    constructor(size,speed,dir){
        this.x = canvas.width+150;
        this.y = size;
        this.dir=dir;
        this.color = "rgb(168, 167, 167)";
        this.slideSpeed = speed;
        this.width=getRandomNumber(80,120)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,(this.dir)*450);
    }

    slide() {
        this.draw();
        this.x -= this.slideSpeed;
    }
    
}




let player = new Player(150,400,50,"darkblue");
let hole =[new AvoidBlock(450,5,1)];

function drawline(){


    ctx.fillStyle="black";
    ctx.fillRect(0,0,900,150);
    ctx.fillRect(0,450,900,150);
}


function randomInterval(timeInterval) {
    let returnTime = timeInterval;
    if(Math.random() < 0.5){
        returnTime += getRandomNumber(presetTime / 3, presetTime * 1.5);
        
    }else{
        returnTime -= getRandomNumber(presetTime / 5, presetTime / 2);
        
    }
    return returnTime;
}


function generateBlocks() {


    let timeDelay = randomInterval(presetTime);
    let x=getRandomNumber(0,1);
    
    if(x>0.5)
    up=1;
    else
    up=-1;

    if(up>0)
    hole.push(new AvoidBlock(450, hspeed,up));
    else
    hole.push(new AvoidBlock(150, hspeed,up));

    setTimeout(generateBlocks, timeDelay);
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawline();
    player.draw();

    hole.forEach(hole=>{
        hole.slide();
    });
    requestAnimationFrame(animate);
}

animate();
setTimeout(() =>{
    generateBlocks();
},randomInterval(presetTime));

addEventListener("keydown", e => {
    if(e.code === 'Space'){
        if(!player.shouldJump && (player.y===400 || player.y=== 150)){
            
            player.jumpcounter = 0;
            player.shouldjump = true;
           
        }
    }
});
