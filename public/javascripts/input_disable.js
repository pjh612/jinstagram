const input_PWD = document.querySelector(".input_Pwd");
const input_ID = document.querySelector(".input_ID");
const btn_LogIn = document.querySelector(".btn_logIn");
input_PWD.addEventListener("input", eventhandler);
input_ID.addEventListener("input", eventhandler);

function eventhandler() {
  if (input_PWD.value.length >= 1 && input_ID.value.length >= 1) {
    btn_LogIn.removeAttribute("disabled");
  } else {
    btn_LogIn.setAttribute("disabled", "");
  }
}
