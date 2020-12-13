const DMList = document.querySelectorAll(".container_UserDM");
//var container_MSGs = document.querySelector(".container_MSGs1");
var container_MSGs = document.querySelector(".container_Message");
DMList.forEach((DM) => {
  DM.addEventListener("click", (event) => {
    if (document.querySelector(".clicked")) {
      document.querySelector(".clicked").classList.remove("clicked");
    }
    const dm_ID = findID(event.target, 0, event.target.parentElement.length);

    loadDMAjax(`http://192.168.0.8:3000/direct/t/${dm_ID}`, dm_ID);
  });
});

function findID(element, cnt, size) {
  let result;
  if (element.getAttribute("id")) {
    element.classList.add("clicked");
    return element.getAttribute("id");
  } else {
    if (element.parentElement.className == "container_UserDM") {
      element.parentElement.classList.add("clicked");
      return element.parentElement.getAttribute("id");
    } else {
      result = findID(element.parentElement, cnt + 1, size);
      return result;
    }
  }
}

async function loadDMAjax(url, dm_ID) {
  let data = { dm_ID: dm_ID };
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  let datas = await response.json();

  if (response.ok) {
    // if (document.querySelector(".container_MSGs")) {
    //   document.querySelector(".container_MSGs").remove();
    // }
    if (document.querySelector(".container_Intro")) {
      document.querySelector(".container_Intro").remove();
    }
    if (document.querySelector(".container_Message .container_Header")) {
      document.querySelector(".container_Message .container_Header").remove();
    }
    // if (document.querySelector(".container_Send")) {
    //   document.querySelector(".container_Send").remove();
    // }
    if (document.querySelector(".container_BodyMSG")) {
      document.querySelector(".container_BodyMSG").remove();
    }
    container_MSGs.insertAdjacentHTML("beforeend", datas.dm_HTML);
    document.querySelector(
      ".container_MSGs1"
    ).scrollTop = document.querySelector(".container_MSGs1").scrollHeight;
    document.querySelector(".btn_Send").addEventListener("click", () => {
      const message = document.querySelector(".ta_MSG").value;
      const dm_ID = document.querySelector(".clicked").getAttribute("id");
      sendDMAjax("http://192.168.0.8:3000/direct/processmsg", message, dm_ID);
    });

    // document
    //   .querySelector(".container_MSGs1")
    //   .insertAdjacentHTML("afterbegin", `<div class="container_MSGs"></div>`);
    // document
    //   .querySelector(".container_MSGs")
    //   .insertAdjacentHTML("afterbegin", datas.dm_HTML);
    // document
    //   .querySelector(".container_Message")
    //   .querySelector(".container_UserImage")
    //   .querySelector(
    //     "img"
    //   ).src = `https://kr.object.ncloudstorage.com/jinstagram/userProfile/${datas.first_Participants_PK}.jpg`;

    // document
    //   .querySelector(".container_Message")
    //   .querySelector(
    //     ".span_UserID"
    //   ).innerText = datas.participantsID.toString();
    history.pushState(
      { prevUrl: window.location.href },
      "jinstagram",
      response.url
    );
    document.querySelector(
      ".container_MSGs2"
    ).scrollTop = document.querySelector(".container_MSGs2").scrollHeight;
  }
}
