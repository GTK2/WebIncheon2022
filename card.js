// 초기세팅

const x = 4;
const y = 4;
//카드 뒤 도시 16개 2개씩 미리 설정
let cityName = ['창원시_풋고추', '창원시_풋고추', '진주시_고추', '진주시_고추', '통영시_굴', '통영시_굴', '사천시_멸치', '사천시_멸치', '김해시_단감', '김해시_단감', '밀양시_대추', '밀양시_대추', '거제시_유자', '거제시_유자', '양산시_매실', '양산시_매실'];

let cities = cityName.slice(); //백업 복사
//클릭 flag: 카드 세팅하는 동안에 클릭 기능 방지(flag가 true일 경우에만 클릭 가능)
let clickFlag = true;
//카드 오픈은 2개씩 가능, 카드끼리 같은지 다른지 판단
let clickedOne = [];
//카드 2개 매치했을 경우, 클릭 방지를 위해
let completedOne = [];

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

