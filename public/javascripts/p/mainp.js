const queryBtnMore = document.querySelectorAll(".span_MoreComments");

for (i = 0; i < queryBtnMore.length; i++) {
  queryBtnMore[i].addEventListener("click", (event) => {
    let contentID = findArticleID(
      event.target,
      0,
      event.target.parentElement.legnth
    );
    sendProfileAjax(`http://192.168.0.8:3000/p/${contentID}`, contentID);
  });
}

async function sendProfileAjax(url, contentID) {
  const data = { contentID: contentID };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  if (response.status == 200) {
    document.querySelector("body").insertAdjacentHTML("beforeend", json.html);
    var body = document.querySelector(".dialog_Body");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "javascripts/p/likep.js";

    body.appendChild(script);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "javascripts/commentAjax.js";
    body.appendChild(script);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "javascripts/p/exitp.js";
    body.appendChild(script);
    history.pushState(
      { prevUrl: window.location.href },
      "jinstagram",
      response.url
    );
  } else {
    alert("로그인 하세요.");
  }
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
