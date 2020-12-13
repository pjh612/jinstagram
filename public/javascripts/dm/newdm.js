const btn_NewDM = document.querySelector(".svg_NewMSG");

btn_NewDM.addEventListener("click", () => {
  getNewDMHTML("http://192.168.0.8:3000/direct/newdm");
});
document.querySelector(".btn_NewMSG").addEventListener("click", () => {
  getNewDMHTML("http://192.168.0.8:3000/direct/newdm");
});

async function getNewDMHTML(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const json = await response.json();

  if (response.ok) {
    document.querySelector("body").insertAdjacentHTML("beforeend", json.html);
    var dialogBody = document.querySelector(".dialog_Body");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "/javascripts/dm/newdmsearch.js";
    dialogBody.appendChild(script);
    var script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "/javascripts/dm/exitnewdm.js";
    dialogBody.appendChild(script2);
  }
}
