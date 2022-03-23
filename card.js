const x = 4;
const y = 4;
//카드 뒤 색깔 7개 2개씩 미리 설정
let backColor = ['#FFC312', '#FFC312', '#C4E538', '#C4E538', '#12CBC4', '#12CBC4', '#ED4C67', '#ED4C67', '#FDA7DF', '#FDA7DF', '#833471', '#833471'];
let colors = backColor.slice(); //백업 복사
//클릭 flag: 카드 세팅하는 동안에 클릭 기능 방지(flag가 true일 경우에만 클릭 가능)
let clickFlag = true;
//카드 오픈은 2개씩 가능, 카드끼리 색깔이 같은지 다른지 판단
let clickedOne = [];
//카드 2개 매치했을 경우, 클릭 방지를 위해
let completedOne = [];
let start; //시작시간

//위의 색깔 랜덤 섞기 - 피셔예이츠 방식
let chosenColor = [];

function shuffle() {
  while (colors.length > 0) {
    let color = Math.floor(Math.random() * colors.length);
    let mixedColor = colors.splice(color, 1)[0];
    chosenColor.push(mixedColor);
  }
  console.log(chosenColor);
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
    cardBack.style.backgroundColor = chosenColor[i];
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
          //색깔이 같으면 계속 오픈 시킴
          if (clickedOne[0].querySelector('.card-back').style.backgroundColor ===
            clickedOne[1].querySelector('.card-back').style.backgroundColor) {
            console.log('matched!');
            completedOne.push(clickedOne[0]); //매치된 카드를 완성카드로 넣기
            completedOne.push(clickedOne[1]);
            clickedOne = [] //초기화
            if (completedOne.length === x * y) { //모두 매치했을 경우 성공 메시지
              let end = new Date(); //끝시간 재기
              const result = document.createElement('div');
              result.innerHTML = '축하합니다.' + (end - start) / 1000 + '초 걸렸습니다.';
              result.style.fontSize = '20px'
              document.body.appendChild(result);
              setTimeout(() => {
                result.innerHTML = '';
              }, 1000);

              document.querySelector('#wrapper').innerHTML = ''; //전체 초기화
              completedOne = [];
              clickedOne = [];
              start;
              chosenColor = [];
              colors = backColor.slice();
              shuffle();
              cardSetting(x, y);
            }
          } else { //색깔이 다르면 1초 후 카드 닫기
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
}

shuffle();
cardSetting(x, y);