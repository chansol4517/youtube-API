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


fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    vidsData.forEach((data) => {
        let title =
          data.snippet.title.length > 30
            ? data.snippet.title.substring(0, 30) + "..."
            : data.snippet.title;
  
        let desc =
          data.snippet.description.length > 100
            ? data.snippet.description.substring(0, 100) + "..."
            : data.snippet.description;
  
        tags += `
          <article>
            <div class='pic'>
              <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
            </div>
            <h2>${title}</h2>
            <p>${desc}</p>
            <span>${data.snippet.publishedAt}</span>
          </article>
        `;
      });
  
      frame.innerHTML = tags;
    });

//미션 : 제목이 60글자넘어가면 ...말줄임표 처리
//본문 120글자 넘어가면 ...말줄임표 처리
//날짜를 2021.03.12 변경

