var form2 = document.querySelectorAll("#P_form_Write_Comment");
form2.forEach((element) => {
  element.addEventListener("submit", (event) => {
    event.preventDefault();
    let comment = event.target[0].value;
    event.target[0].value = "";
    if (comment.length > 0) {
      let id = event.target.parentElement.parentElement.parentElement.id;
      sendPGetCommentAjax(
        "http://192.168.0.8:3000/add_comment",
        id,
        comment,

        2
      );
    }
  });
});
document.querySelectorAll(".input_Write_Comment").forEach((element) => {
  element.addEventListener("input", (event) => {
    console.log(event.target);
    if (event.target.value.length >= 1) {
      event.target.nextSibling.nextSibling.removeAttribute("disabled");
    } else {
      event.target.nextSibling.nextSibling.setAttribute("disabled", "");
    }
  });
});
async function sendPGetCommentAjax(url, id, comment, type) {
  let data = { id: id, comment: comment, user: user };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  const datas = await response.json();
  console.log(datas);
  if (response.ok) {
    let newCommentHtml = "";
    if (type == 2) {
      console.log("paragraph");
      newCommentHtml = `<div class="content_Comment"><div class="container_Comment"><a class="comment_User" href="/p${datas.user_ID}"><img src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${datas.user_PK}.jpg" class="user_image"/>${datas.user_ID}</a> <span class="comment_Text">${comment}</span></div><span class="comment_Date">
      1초
      </span> </div>`;
      document.querySelector(
        ".content_Comments_List"
      ).innerHTML += newCommentHtml;
    }
  }
  return "response is " + datas;
}
