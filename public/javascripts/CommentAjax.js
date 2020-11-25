const form = document.querySelectorAll("#form_Write_Comment");
form.forEach((element) => {
  element.addEventListener("submit", (event) => {
    event.preventDefault();
    let comment = event.target[0].value;
    event.target[0].value = "";
    if (comment.length > 0) {
      let user = "pjh_jn";
      let id = event.target.parentElement.parentElement.parentElement.id;
      console.log(
        sendAjax("http://127.0.0.1:3000/add_comment", id, comment, user)
      );
    }
  });
});
async function sendAjax(url, id, comment, user) {
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
    let newCommentHtml = `<div class="content_Comment"><a class="comment_User" src="">${datas.user}</a> <span class="comment_Text">${comment}</span> </div>`;

    document
      .querySelector(`[id='${id}']`)
      .querySelector(".content_Comments_List").innerHTML += newCommentHtml;
  }
  return "response is " + datas;
}
