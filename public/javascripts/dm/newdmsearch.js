var newDMSearch_Bar = document.querySelector(".input_SendTo");
var newDMcontainer = document.querySelector(".container_Users");
var btn_Next = document.querySelector(".btn_Next");
selectedList = [];

btn_Next.addEventListener("click", () => {
  if (selectedList.length >= 1) {
    //새로운 DM 만들어주세요
    makeNewDMAjax("http://192.168.0.8:3000/direct/dbnewdm", selectedList);
  }
});
async function makeNewDMAjax(url, selectedList) {
  let data = { selectedList: selectedList };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (response.ok) {
    //새로운 DM을 데이터베이스에 추가를했다면 창을 닫고 프론트에 새로 추가한다.
    var body = document.querySelector("body");
    var dialog_Body = document.querySelector(".dialog_Body");
    body.removeChild(dialog_Body);

    if (json.status == 200) {
      //새로운 DM
      document
        .querySelector(".container_DMList2")
        .insertAdjacentHTML("afterbegin", json.HTML);

      document
        .querySelector(`[id='${json.newDMID}']`)
        .addEventListener("click", (event) => {
          if (document.querySelector(".clicked")) {
            document.querySelector(".clicked").classList.remove("clicked");
          }
          const dm_ID = findID(
            event.target,
            0,
            event.target.parentElement.length
          );

          loadDMAjax(`http://192.168.0.8:3000/direct/t/${dm_ID}`, dm_ID);
        });
    } else if (json.status == 201) {
      //이미 존재하는 것을 제일 위로 feature
      let exist_DM = document.querySelector(`[id = '${json.exist_DMID}']`);
      exist_DM.parentNode.insertBefore(
        exist_DM,
        exist_DM.parentNode.firstChild
      );
      //이미 존재하므로 기존의 것을 클릭해줌
      document.querySelector(`[id='${json.exist_DMID}']`).click();
    }
  }
}

newDMSearch_Bar.addEventListener("input", () => {
  sendNewDMSearchAjax("http://192.168.0.8:3000/search", newDMSearch_Bar.value);
});

async function sendNewDMSearchAjax(url, value) {
  let data = { value: value, type: "dm" };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => console.log(json));

  if (response.status == 200) {
    if (document.querySelector(".container_SearchResult")) {
      newDMcontainer.removeChild(
        document.querySelector(".container_SearchResult")
      );
    }

    //검색 결과 추가
    newDMcontainer.insertAdjacentHTML("beforeend", json.html);

    //검색결과 중 하나의 유저를 선택했을 시  새로운 메시지를 보낼 사람 목록에 추가한다.
    document.querySelectorAll(".container_User").forEach((user) => {
      user.addEventListener("click", (event) => {
        var id;

        if (event.target.className == "span_UserName") {
          id = event.target.parentElement.parentElement.querySelector(
            ".span_UserID"
          ).innerText;
        } else if (event.target.className == "span_UserID") {
          id = event.target.innerText;
        } else if (event.target.tagName == "IMG") {
          id = event.target.parentElement.parentElement.querySelector(
            ".span_UserID"
          ).innerText;
        } else {
          id = event.target.querySelector(".span_UserID").innerText;
        }

        //선택 되지 않았음
        isSelected = selectedList.indexOf(id);
        if (isSelected == -1) {
          selectedList.push(id);
          document.querySelector(".container_Search").insertAdjacentHTML(
            "beforebegin",

            `<div class="container_NewUser">
              <button class="btn_NewUser" id ="${id}">${id}</button>
              </div>`
          );
        } //선택 됐음
        else {
          selectedList.splice(isSelected, 1);
          document
            .querySelector(".container_SendTo")
            .removeChild(
              document
                .querySelector(".container_SendTo")
                .querySelector(`[id ='${id}']`).parentElement
            );
        }
      });
    });
  } else {
    if (document.querySelector(".container_SearchResult")) {
      newDMcontainer.removeChild(
        document.querySelector(".container_SearchResult")
      );
    }
  }
}
