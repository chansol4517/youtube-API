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

    //데이터 반복 돌면서 innerHTML='태그문자열'로 동적 돔 생성
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
          <h2 class='vidTitle' data-id=${data.snippet.resourceId.videoId}>${title}</h2>         
          
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

//동적 생성요소에 이벤트 연결해서 동적으로 모달요소 추가
document.body.addEventListener("click", (e) => {
  const vidId = e.target.getAttribute("data-id");
  if (e.target.className === "vidTitle") {
    const asideEl = document.createElement("aside");
    asideEl.innerHTML = `
      <div class='con'>
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>
      </div>
      <button class='btnClose'>close</button>
    `;
    document.body.append(asideEl);
  }
});

//동적으로 생성된 모달 닫기버튼에 이벤트 위침
document.body.addEventListener("click", (e) => {
  if (e.target.className === "btnClose") {
    //display:none과는 다르게 물리적으로 DOM자체를 제거
    document.querySelector("aside").remove();
  }
});