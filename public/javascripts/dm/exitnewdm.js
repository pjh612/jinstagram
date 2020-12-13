btn_Close = document.querySelector(".btn_Close");

btn_Close.addEventListener("click", () => {
  var body = document.querySelector("body");
  var dialog_Body = document.querySelector(".dialog_Body");
  body.removeChild(dialog_Body);
});
