const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let pop =document.querySelector('.pop');
let pop2=document.querySelector('.userid')
let tryagain=document.querySelector('.button');
let submit=document.querySelector('.button_2');
let scr=document.getElementById('002');
let HS=document.getElementById('0001');
let uid=document.getElementById('uid');


let presetTime=1000;
let hspeed =5;
let up=1;
let score=0;
let username="";

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
                { 
                    this.shouldjump=false;
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
    constructor(size,dir){
        this.x = canvas.width+150;
        this.y = size;
        this.dir=dir;
        this.color = "rgb(168, 167, 167)";
        this.width=10*getRandomNumber(8,12);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,(this.dir)*450);
    }

    slide() {
        this.draw();
        this.x -= hspeed;
    }
    
}


function startGame() {
    player = new Player(150,400,50,"darkblue");
    hole = [];
    score = 0;
    hspeed = 5;
    presetTime = 1000;
    up=1;
    scr.innerHTML ="<b>Score : </b>";

    animate();
}

let player = new Player(150,400,50,"darkblue");
let hole =[new AvoidBlock(450,1)];

function squaresColliding(player,block){
    let s1 = player;
    let s2 = block;

    if(s2.x <= s1.x && s1.x <= (s2.x+s2.width) && s2.x<= (s1.x+s1.size) && (s1.x+s1.size) <= (s2.x+s2.width))
    {   if(s2.y===450 && s1.y===400)
            return false;

        else if(s2.y===150 && s1.y===150)
        return false;

        else 
        return true;
    }

    else 
    return true;
}

function isPastBlock(player, block){
    let s1 = player;
    let s2 = block;
    return(s1.x===s2.x+s2.width);
    
}

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
    hole.push(new AvoidBlock(450,up));
    else
    hole.push(new AvoidBlock(150,up));

    setTimeout(generateBlocks, timeDelay);
}

let animationId=null;
function animate(){
    
    animationId=   requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawline();
    player.draw();

    hole.forEach(hole=>{
        hole.slide();
        if(!squaresColliding(player, hole)){
            cancelAnimationFrame(animationId);
            scr.innerHTML += String(score);
            highscr();
            pop.style.display="flex";}
        if(isPastBlock(player,hole))
        {score++;
            if(score%10===0 && score!=0)
           { hspeed+=5;
            if(presetTime>500)
                presetTime-=250;
            else
            presetTime-=50;}
        }
    });

    if((hole.x + hole.size) <= 0){
        setTimeout(() => {
            hole.splice(index, 1);
        }, 0)}

  
 
}


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

tryagain.addEventListener('click',function(){                                    //buttonclick tryagain
 
    pop.style.display='none';
           startGame();                 
  });


  submit.addEventListener('click',function(){                                    //buttonclick tryagain
    username=document.getElementById("Username").value;
    if(username==="")
    alert("Please enter username");
    else
    {pop2.style.display="none";     
    animate();}          
  });


  function highscr()
{
  var highscore = localStorage.getItem("hs");

if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("hs", String(score));
        localStorage.setItem("name",username);      
    }
}
else{
    localStorage.setItem("hs", String(score));
    localStorage.setItem("name",username);
}

HS.innerHTML = "<b>High Score : </b>";
uid.innerHTML= "<b>Player : </b>";
HS.innerHTML += localStorage.getItem("hs");
uid.innerHTML +=localStorage.getItem("name");
}
