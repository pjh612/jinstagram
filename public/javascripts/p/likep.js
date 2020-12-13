var P_btnLike = document.querySelector("#P_btn_like");

var unlike =
  "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z";
var like =
  "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z";
var contentID;

P_btnLike.addEventListener("click", (event) => {
  //contentID를 찾는 함수 DFS
  contentID = findArticleID(event.target, 0, event.target.parentElement.length);
  sendPLikeAjax("http://192.168.0.8:3000/like", contentID, 2);
});

async function sendPLikeAjax(url, contentID, type) {
  content = document.getElementById(`${contentID}`);
  let data = { contentID: contentID, type: type };
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  let datas = await response.json();

  if (response.ok) {
    console.log("plike");
    if (datas.type == 2) {
      //   var P_btnLike = document
      //     .querySelector(".dialog")
      //     .querySelector("#P_btn_like");
      var path = document
        .querySelector(".dialog")
        .querySelector("#P_btn_like")
        .querySelector("path");
      var likeCnt_Text = document
        .querySelector(".dialog")
        .querySelector(`#P_cntLike${contentID}`);
      console.log("likeCnt_Text", likeCnt_Text.innerHTML);

      var main_btnLike = document
        .getElementById(`${contentID}`)
        .querySelector("#btn_like");
      if (main_btnLike) {
        var main_path = document
          .getElementById(`${contentID}`)
          .querySelector("#btn_like")
          .querySelector("path");
        var main_Text = document
          .getElementById(`${contentID}`)
          .querySelector(`#cntLike${contentID}`);
      }
      //좋아요 버튼 클릭 성공시
      //좋아요 취소
      if (P_btnLike.getAttribute("fill")) {
        P_btnLike.removeAttribute("fill");
        path.setAttribute("d", unlike);
        likeCnt_Text.innerHTML = parseInt(likeCnt_Text.innerHTML) - 1;

        if (main_btnLike) {
          main_btnLike.removeAttribute("fill");
          main_path.setAttribute("d", unlike);
          main_Text.innerHTML = parseInt(main_Text.innerHTML) - 1;
        }
      } else {
        //좋아요
        P_btnLike.setAttribute("fill", "#ed4956");
        path.setAttribute("d", like);
        likeCnt_Text.innerHTML = parseInt(likeCnt_Text.innerHTML) + 1;

        if (main_btnLike) {
          main_btnLike.setAttribute("fill", "#ed4956");
          main_path.setAttribute("d", like);
          main_Text.innerHTML = parseInt(main_Text.innerHTML) + 1;
        }
      }
    }
  }
  return "response is " + datas;
}

function findArticleID(element, cnt, size) {
  let result;

  if (element.parentElement.nodeName == "ARTICLE") {
    return element.parentElement.getAttribute("id");
  } else {
    result = findArticleID(element.parentElement, cnt + 1, size);
    return result;
  }
}
