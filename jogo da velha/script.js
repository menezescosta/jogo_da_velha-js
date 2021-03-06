'use strict';

//initial data
let square={
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:''
}

let playerTime='';

let warnning='';

let playing=false; 
reset();
//events
document.querySelector('.reset').addEventListener('click',reset);

document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click',itemClicked);
});
//functions
function itemClicked(event) {
    let item=event.target.getAttribute('data-item');

    if(playing && square[item]===''){
        square[item]=playerTime;
        renderSquare();
        togglePlayer();
    }

}
function reset() {
    warnning='';

    let random=Math.floor(Math.random()*2);
    playerTime=setRandom(random);

    
    for(let i in square){
        square[i]='';
    }

    playing=true;
    renderSquare();
    renderInfo();
    
}
function setRandom(random) {
    if(random===0){
    return 'x';
    }
    return 'o';
}
function renderSquare() {
    for(let i in square){
        let item=document.querySelector(`div[data-item=${i}]`);
        item.innerHTML=square[i];
    }
    checkGame();
}
function renderInfo() {
    document.querySelector('.vez').innerHTML=playerTime;
    document.querySelector('.resultado').innerHTML=warnning;
}
function togglePlayer() {
    playerTime=(playerTime==='x')?'o':'x';
    renderInfo();
}
function checkGame() {
    if(checkWinnerFor('x')){
        warnning=`o "x" vencceu`;
        playing=false;
    }else  
    if(checkWinnerFor('o')){
        warnning=`o "o" vencceu`;
        playing=false;
    }else
    if(isFull()){
        warnning=`Deu enpate`;
        playing=false;
    }

}
function checkWinnerFor(player) {
    let pos=['a1,a2,a3',
            'b1,b2,b3',
            'c1,c2,c3',
            'a1,b1,c1',
            'a2,b2,c2',
            'a3,b3,c3',
            'a1,b2,c3',
            'a3,b2,c1'];

            for(let w in pos){
                let pArray=pos[w].split(',');

                let hasWon=pArray.every(option=>square[option]===player);

                if(hasWon){
                    return true;
                }
            }
            return false;
}
function isFull() {
    for(let i in square){
        if(square[i]===''){
            return false;
        }       
    }
    return true;
}