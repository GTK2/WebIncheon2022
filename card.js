// 초기세팅
const x = 4;
const y = 4;
//도시 18개 설정
let cityName = ['창원시_풋고추', '진주시_고추', '통영시_굴', '사천시_멸치', '김해시_단감', '밀양시_대추', '거제시_유자', '양산시_매실', '의령군_수박', '함안군_곶감', '창녕군_양파', '고성군_방울토마토', '남해군_마늘', '하동군_녹차', '산청군_약초', '함양군_밤', '거창군_사과', '합천군_돼지고기'];

let cities = cityName.slice(); //백업 복사
//클릭 flag: 카드 세팅하는 동안에 클릭 기능 방지(flag가 true일 경우에만 클릭 가능)
let clickFlag = true;
//카드 오픈은 2개씩 가능, 카드끼리 같은지 다른지 판단
let clickedOne = [];
//카드 2개 매치했을 경우, 클릭 방지를 위해
let completedOne = [];

//위의 카드 랜덤 섞기 - 피셔예이츠 방식
let chosenCity1 = [];
let chosenCity2 = [];

let timer = 5; //남은 시간
let card_found = 0; //찾은 카드 수
let isPlaying = false; //게임 중인지 확인

//남은 시간, 찾은 카드 수 표시
let time = document.getElementById('remain-time');
time.innerHTML = '남은시간 : ' + timer;
let card = document.getElementById('card-found');
card.innerHTML = '찾은 카드수 : ' + card_found;

function shuffle() {
  while (cities.length > 10) {
    let random = Math.floor(Math.random() * cities.length);
    let spliceArray = cities.splice(random, 1);
    let mixedcity = spliceArray[0];
    chosenCity1.push(mixedcity);
    chosenCity1.push(mixedcity);
  }
  while (chosenCity1.length > 0) {
    let random = Math.floor(Math.random() * chosenCity1.length);
    let spliceArray = chosenCity1.splice(random, 1);
    let mixedcity = spliceArray[0];
    chosenCity2.push(mixedcity);
  }
  console.log(chosenCity2);
}

function playCard() {
  isPlaying = true;
  shuffle();

  clickFlag = false;
  //카드 세팅
  for (let i = 0; i < x * y; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    const cardImg = document.createElement('div');
    cardImg.className = 'card-img';
    cardImg.innerHTML += '<img src="./product/'+chosenCity2[i]+'.jpg" alt="'+chosenCity2[i]+'">';
    const cardCity = document.createElement('div');
    cardCity.className = 'card-city';
    cardCity.innerText = chosenCity2[i];
    cardBack.appendChild(cardImg);
    cardBack.appendChild(cardCity);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    document.querySelector('#wrapper').appendChild(card);

    //클릭하여 카드 뒤집기
    card.addEventListener('click', function() {
      if (clickFlag && !completedOne.includes(card) && !clickedOne.includes(card)) { //clickFlag가 true, 매치 안된 카드일 경우,
        card.classList.toggle('flipped');
        clickedOne.push(card); //선택한 카드 배열에 추가
        // if (clickedOne.length == 1){
        //   setTimeout(() => {
        //     clickedOne[0].classList.remove('flipped');
        //     clickFlag = true;
        //     clickedOne = [];
        //   },3000);
        // }
        if (clickedOne.length == 2) { //선택한 카드가 2개일때
          //카드가 같으면 계속 오픈 시킴
          if (clickedOne[0].querySelector('.card-city').innerText ===
            clickedOne[1].querySelector('.card-city').innerText) {
            console.log('matched!');
            completedOne.push(clickedOne[0]); //매치된 카드를 완성카드로 넣기
            completedOne.push(clickedOne[1]);
            card_found++;
            let text = document.getElementById('card-found');
            text.innerHTML = '찾은 카드수 : ' + card_found;
            clickedOne = [] //초기화
            if (completedOne.length === x * y) { //모두 매치했을 경우 성공 메시지
              alert('축하합니다. 성공하셨습니다');
              isPlaying = false;
              // clearInterval(interval);
              reset();
            }
          } else { //카드가 다르면 1초 후 카드 닫기
            clickFlag = false; //미리 클릭 방지
            setTimeout( () => {
                clickedOne[0].classList.remove('flipped');
                clickedOne[1].classList.remove('flipped');
                clickFlag = true;
                clickedOne = [] //초기화
              }, 1000);
          }
        }
      }
    });
  }

  let cardLegnth = document.querySelectorAll('.card');
  cardLegnth.forEach(function(ele, index){
    ele.classList.add('flipped');
  });
  //5초뒤에 닫기
  let interval = setInterval(function(){
    if(timer > 0){
      timer -= 1;
      console.log(timer);
      let time = document.getElementById('remain-time');
      time.innerHTML = '남은시간 : ' + timer;
    }else{
      document.querySelectorAll('.card').forEach((ele) => ele.classList.remove('flipped'));
      clickFlag = true;
      timer = 90;
    }
  }, 1000);
}

function reset(){
  document.querySelector('#wrapper').innerHTML = ''; //전체 초기화
  completedOne = [];
  clickedOne = [];
  chosenCity2 = [];
  cities = cityName.slice();
  timer = 5;
  card_found = 0;
  playCard();
}

document.getElementById('start-btn').onclick = function(){
  if(!isPlaying){
    this.innerHTML = '다시하기';
    playCard();
  }
  else{
    reset();
  }
};