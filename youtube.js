/*
서버에서 실시간으로 외부 데이터를 내 웹 페이지 문저로 가져오는 방법

fetch('요청url')
.then((data=> data.json())
.then((json)=>{
    //요청한 서버쪽으로부터 성공적으로 데이터를 전달받으면 json이라는 매개변수 데이터 확인 가능
    console.log(json)
    })
*/

const api_key = "AIzaSyAVj-jOY1jNa_fGbP4VBrSIRhFwaciC7SE";
const pid = "PLnx42gENvRgBuv_049gEWpTmqcfjcUICK";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");



//유튜브 데이터를 가져와서 동적으로 리스트 출력
fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    vidsData.forEach((data) => {
      let title =
        data.snippet.title.length > 60
          ? data.snippet.title.substring(0, 60) + "..."
          : data.snippet.title;

      let desc =
        data.snippet.description.length > 120
          ? data.snippet.description.substring(0, 120) + "..."
          : data.snippet.description;

      let date = data.snippet.publishedAt.split("T")[0].split("-").join(".");

      tags += `
        <article>
          <h2 class='vidTitle'>${title}</h2>          
          
          <div class='txt'>
            <p>${desc}</p>
            <span>${date}</span>
          </div>

          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
          </div>
        </article>
      `;
    });

    frame.innerHTML = tags;
  });

/*
자바스크립트를 이용해서 동적으로 생성된 요소는 일반적인 방법으로는 이벤트 연결이 불가
동적인 요소가 만들어 지는 위치가 fetch함수의 then구문안쪽인데 그 밖에서는 동적인 요소 선택 불가
제일 간단한 해결 방법 : 동적생성 요소 찾는 구문을 돔을 생성하는 코드 블록 안쪽에서 호출

위의 방법의 단점 : fetch함수 코드블록 안쪽에 또 다시 복잡한 이벤트 연결 로직을 작성해야 되기 때문에 코드의 복잡도가 증가하고 기능별로 코드 분리가 불가능해짐

위와 같은 이유로 부득이하게 동적인 요소의 이벤트 연결을 fetch함수 밖에서 연결하는 경우가 많음
이벤트 위임: 지금 당장은 없는 DOM요소에 이벤트를 전달하기 위해서 항상 존재하는 요소에 이벤트를 맡겨서 추후 동적 요소가 생성완료되면 그 때 이벤트를 대신 전달해주는 방식

이벤트 위임 방식 : 항상 존재하는 body요소에 이벤트에 맡겨놓았다가
동적 요소가 생성 완료 되면 그 때 이벤트를 전달한다.
*/

document.body.addEventListener('click', function(e){
    // console.dir(e.target); -> 사용자가 이벤트 발생시킨 대상

/* body전체에 이벤트를 연결한 뒤 이벤트 발생한 실제 대상을 조건문으로 분기처리해서
조건에 부합될 때만 원하는 구문 연결(이처럼 번거로운 작업을 처리하지 않기 위해 리액트같은 프레임웍, 라이브러리)

*/
    if(e.target.className==="vidTitle"){
        console.log("you clicked vidTitle");
        /*동적으로 aside로 모달창 생성 
        해당 모달창을 절대 innerHTML로 생성 불가
        innerHTML은 기존의 선택자 안쪽의 요소들을 다 지우고 새로운 요소들로 바꿔치기 하는 개념
        지금처럼 기존 목록 요소를 유치하면 모달만 추가하고자 할 때는 적합하지 않음
        해결방법 : 부모선택자 .append(동적 생성 요소 : DOM객체)
        */

        // 동적 DOM객체를 메서드를 통해 직접 생성
        const asideEl = document.createElement("aside");//aside 라는 엘리먼트 노드를 직접 생성
        //body안쪽의 요소들을 그대로 유지하면서 동적으로 aside요소 추가
       document.body.append(asideEl);

       //prepend: 기본요소 유지하면서 앞쪽에 추가
       //append: 기존요소 유지하면서 뒤쪽에 추가(더 자주 쓰임)

    }
});
