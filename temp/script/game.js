let timer = 90;
let card_found = 0;
let playing = false;

let time = document.getElementById('remain-time');
time.innerHTML = '남은시간 : ' + timer;
let card = document.getElementById('card-found');
card.innerHTML = card_found;

for(let i = 0; i < 16; i++){
    let newDIV = document.getElementById('game-area');
    newDIV.innerHTML += '<div class="card'+i+'">생성완료'+i+'</div>';
}

let interval = setInterval(function(){
    if(playing){
        timer -= 1;
        if(timer <= 0) clearInterval(interval);
        let time = document.getElementById('remain-time');
        time.innerHTML = '남은시간 : ' + timer;
        let card = document.getElementById('card-found');
        card.innerHTML = card_found;
    }
}, 1000);

document.getElementById('start-btn').onclick = function(){
    if(playing == false){
        console.log('start');
        playing = true;
        this.innerHTML = '다시하기';
    }
    else{
        console.log('end');
        playing = false;
        timer = 90;
        this.innerHTML = '게임시작';
    }
};


