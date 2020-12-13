const form = document.querySelector("form");
const container_ErrorAlert = document.querySelector("#ErrorAlert");
const ID = document.querySelector(".input_ID");
const PWD = document.querySelector(".input_Pwd");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendLoginAjax("http://192.168.0.8:3000/accounts/login", ID.value, PWD.value);
});

async function sendLoginAjax(url, id, pwd) {
  let data = { id: id, pwd: pwd };
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
    if (datas.status == 200) {
      location.href = "/";
      console.log("이동");
    } else {
      container_ErrorAlert.innerHTML = datas.msg;
    }
  }
}
