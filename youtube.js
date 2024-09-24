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
const pid = "PL-XW_XzSFum-NctWuWLRFg2DmuFaSjKPf";
const num = 4;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

fetch(url)
  .then((data) => data.json()) //문자열의 데이터를 객체나 배열형태로 변환(parsing)
.then((json) => {
    //parsing완료된 데이터를 json파라미터명으로 받아서
    //해당 코드블록안쪽에서 데이터 활용
    console.log(json);
    //자주쓰는 데이터값
    //title: 영상의 제목
    //description : 영상의 본문
    //publishedAt : 영상 업로드 날짜
    //thumbnails.standard.url : 썸네일주소
    //resourceId.videoId: 추후 영상호출시 필요한 정보값
});

