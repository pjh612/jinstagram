const btn_Send = document.querySelector(".btn_Send");
var socket;
let pk;
(async () => {
  pk = await getPKAjax("http://192.168.0.8:3000/getpk");
  socket = await io("http://192.168.0.8:3000/");
  socket.on("connect", function () {
    //소켓 연결시 자신의 pk를 보낸다.
    console.log("pk =", pk);
    socket.emit("login", { uid: pk });
  });
  socket.on("message", function (data) {
    //서버로부터 메시지가 도착한다면
    let dm_ID = data.dm_ID;
    let uid = data.uid;
    let id = data.id;
    let message = data.message;

    if (uid != pk) {
      if (document.querySelector(".clicked")) {
        if (document.querySelector(".clicked").getAttribute("id") == dm_ID) {
          //메시지가 보고있는 대화방인가
          console.log("메시지도착@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
          dm_html = `
  <div class="container_MSG">
      <div class="container_Left">
          <div class="container_LeftUserImage">
              <img src="	https://kr.object.ncloudstorage.com/jinstagram/userProfile/${uid}.jpg" alt="" />
       </div>
       <span class="span_UserID">${id}</span>
          <div class="container_LeftMSG">
              <span class="span_LeftMSG">${message}</span>
           </div>
       </div>
  <div class="container_Right">
    <div class="container_RightMSG"></div>
  </div>
</div>
`;
          document
            .querySelector(".container_MSGs")
            .insertAdjacentHTML("beforeend", dm_html);
          document
            .getElementById(dm_ID)
            .querySelector(".span_PrevMSG").innerHTML = message;
          document.querySelector(
            ".container_MSGs2"
          ).scrollTop = document.querySelector(".container_MSGs2").scrollHeight;
        } //보고있는 대화방이 아니면
        else {
          document
            .getElementById(dm_ID)
            .querySelector(".span_PrevMSG").innerHTML = message;
        }
      } else {
        //clicked 자체가없음
        document
          .getElementById(dm_ID)
          .querySelector(".span_PrevMSG").innerHTML = message;
      }
    }
  });
})();

// btn_Send.addEventListener("click", () => {
//   const message = document.querySelector(".ta_MSG").value;
//   const dm_ID = document.querySelector(".clicked").getAttribute("id");
//   sendDMAjax("http://192.168.0.8:3000/direct/processmsg", message, dm_ID);
// });
async function getPKAjax(url) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let datas = await response.json();
  console.log(datas.pk);
  if (response.ok) {
    return datas.pk;
  }
}
async function sendDMAjax(url, message, dm_ID) {
  let data = { message: message, dm_ID: dm_ID };
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  let datas = await response.json();

  if (response.ok) {
    document.querySelector(".ta_MSG").value = "";
    socket.emit("sendDM", { dm_ID: dm_ID, uid: pk, message: message });
    document.querySelector(".container_MSGs").insertAdjacentHTML(
      "beforeend",
      `<div class="container_MSG">
    <div class="container_Left">
      <div class="container_LeftUserImage"></div>
      <div class="container_LeftMSG"></div>
    </div>
    <div class="container_Right">
      <div class="container_RightMSG">
        <span class="span_RightMSG">${message}</span>
      </div>
    </div>
  </div>`
    );
    document.querySelector(
      ".container_MSGs2"
    ).scrollTop = document.querySelector(".container_MSGs2").scrollHeight;
  }
}
