var btn_ExitP = document.querySelector(".btn_ExitP");
var body = document.querySelector("body");
btn_ExitP.addEventListener("click", () => {
  var dialog_Body = document.querySelector(".dialog_Body");
  console.log(dialog_Body);
  body.removeChild(dialog_Body);
  history.pushState(null, "jinstagram", window.history.state.prevUrl);
});
