const x = 4;
const y = 4;
//카드 뒤 도시 16개 2개씩 미리 설정
let cityName = ['창원시_풋고추', '창원시_풋고추', '진주시_고추', '진주시_고추', '통영시_굴', '통영시_굴', '사천시_멸치', '사천시_멸치', '김해시_단감', '김해시_단감', '밀양시_대추', '밀양시_대추', '거제시_유자', '거제시_유자', '양산시_매실', '양산시_매실'];

//'의령군_수박', '의령군_수박', '함안군_곶감', '함안군_곶감', '창녕군_양파', '창녕군_양파'

let cities = cityName.slice(); //백업 복사
//클릭 flag: 카드 세팅하는 동안에 클릭 기능 방지(flag가 true일 경우에만 클릭 가능)
let clickFlag = true;
//카드 오픈은 2개씩 가능, 카드끼리 같은지 다른지 판단
let clickedOne = [];
//카드 2개 매치했을 경우, 클릭 방지를 위해
let completedOne = [];
let start; //시작시간

//위의 카드 랜덤 섞기 - 피셔예이츠 방식
let chosenCity = [];

function shuffle() {
  while (cities.length > 0) {
    let city = Math.floor(Math.random() * cities.length);
    let mixedcity = cities.splice(city, 1)[0];
    chosenCity.push(mixedcity);
  }
  console.log(chosenCity);
}

function cardSetting(x, y) {
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
    cardImg.innerHTML += '<img src="./product/'+chosenCity[i]+'.jpg" alt="'+chosenCity[i]+'">';
    const cardCity = document.createElement('div');
    cardCity.className = 'card-city';
    cardCity.innerText = chosenCity[i];
    cardBack.appendChild(cardImg);
    cardBack.appendChild(cardCity);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    document.querySelector('#wrapper').appendChild(card);

    //클릭하여 카드 뒤집기
    card.addEventListener('click', function() {
      if (clickFlag && !completedOne.includes(card)) { //clickFlag가 true, 매치 안된 카드일 경우,
        card.classList.toggle('flipped');
        clickedOne.push(card); //선택한 카드 배열에 추가
        if (clickedOne.length == 2) { //선택한 카드가 2개일때
          //카드가 같으면 계속 오픈 시킴
          if (clickedOne[0].querySelector('.card-city').innerText ===
            clickedOne[1].querySelector('.card-city').innerText) {
            console.log('matched!');
            completedOne.push(clickedOne[0]); //매치된 카드를 완성카드로 넣기
            completedOne.push(clickedOne[1]);
            clickedOne = [] //초기화
            if (completedOne.length === x * y) { //모두 매치했을 경우 성공 메시지
              playing = false;
              replay();
            }
          } else { //카드가 다르면 1초 후 카드 닫기
            clickFlag = false; //미리 클릭 방지
            setTimeout(
              () => {
                clickedOne[0].classList.remove('flipped');
                clickedOne[1].classList.remove('flipped');
                clickFlag = true;
                clickedOne = [] //초기화
              }, 1000
            );
          }
        }
      }
    });
  }
}

function replay(){
  document.querySelector('#wrapper').innerHTML = ''; //전체 초기화
  completedOne = [];
  clickedOne = [];
  start;
  chosenCity = [];
  cities = cityName.slice();
  shuffle();
  cardSetting(x, y);
}

shuffle();
cardSetting(x, y);

let timer = 90;
let card_found = 0;
let playing = false;

let time = document.getElementById('remain-time');
time.innerHTML = '남은시간 : ' + timer;
let card = document.getElementById('card-found');
card.innerHTML = card_found;

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

      shuffle();
      cardSetting(x, y);
      replay();

      //카드 세팅되면 몇초 보여주기(*카드 index별 시간차를 주고 오픈)
      document.querySelectorAll('.card').forEach((ele, index) =>
      setTimeout(() => {
        ele.classList.add('flipped')
        }, 1000 + 100 * index)
      );
      //5초뒤에 닫기
      setTimeout(() => {
        document.querySelectorAll('.card').forEach((ele) => ele.classList.remove('flipped'));
        clickFlag = true;
        start = new Date(); //시작시간 재기
      }, 3000);
  }
  else{
      console.log('end');
      playing = false;
      timer = 90;
      this.innerHTML = '게임시작';
  }
};