const posts = document.querySelectorAll(".profile_Post img");

for (i = 0; i < posts.length; i++) {
  const srcSplit = posts[i].attributes["src"].value.split("/");
  length = srcSplit.length;
  const contentID = srcSplit[length - 1].split(".")[0];
  console.log(contentID);
  posts[i].addEventListener("click", () => {
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
