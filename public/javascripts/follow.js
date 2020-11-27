const hrefSplit = document.location.href.split("/");
const toUser = hrefSplit[hrefSplit.length - 1];
const btn_Follow = document.querySelector(".btn_Follow");
//const btn_UnFollow = document.querySelector(".btn_UnFollow");
if (btn_Follow) {
  btn_Follow.addEventListener("click", FollowHandler);
}
function FollowHandler() {
  sendFollowAjax("http://127.0.0.1:3000/follow", toUser);
}

async function sendFollowAjax(url, toUser) {
  console.log(btn_Follow.innerText);
  isFollow = btn_Follow.innerText == "팔로우" ? false : true;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      toUser: toUser,
      isFollow: isFollow,
    }),
  });
  const response_Data = await response.json();

  if (response_Data.status == 200) {
    //팔로우 됨
    btn_Follow.innerText = "언팔로우";
    btn_Follow.classList.add("un");
  } else if (response_Data.status == 201) {
    //언팔로우됨
    btn_Follow.innerText = "팔로우";
    btn_Follow.classList.remove("un");
  }
}
