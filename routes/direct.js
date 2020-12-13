var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var url = require("url");
const User = require("../public/javascripts/schemas/user.js");
const DM = require("../public/javascripts/schemas/dm.js");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");

router.post("/processmsg", async (req, res) => {
  const message = req.body.message;
  const participants = req.body.participants;
  const dm_ID = req.body.dm_ID;
  const logined_PK = req.session.user._id;

  const queryDM = await DM.findOne({ _id: dm_ID });

  queryDM.messages.push({ id: logined_PK, content: message });
  queryDM.save();
  res.json({ status: 200 });
});

router.get("/inbox", async (req, res, next) => {
  const logined_PK = req.session.user._id;
  const logined_ID = req.session.user.id;
  dm_UserListHtml = await loadDMList(logined_PK);

  res.send(template.DM(dm_UserListHtml, logined_PK, logined_ID));
});

router.post("/newdm", async (req, res, next) => {
  res.json({ html: template.NEWDM() });
});

router.post("/dbnewdm", async (req, res, next) => {
  connect_mongodb(req);
  const selectedList = req.body.selectedList;

  let selectedPKList = [req.session.user._id];
  for (i = 0; i < selectedList.length; i++) {
    let item = await User.findOne({ id: selectedList[i] });
    selectedPKList.push(item._id.toString());
  }

  selectedPKListSet = new Set(selectedPKList);
  //이미 존재하는 DM인가 검사
  const myAccount = await User.findOne({ _id: req.session.user._id });
  const myDms = myAccount.dms;
  flag = false;
  for (i = 0; i < myDms.length; i++) {
    let queryDM = await DM.findOne({ _id: myDms[i].id });

    queryDM_ParticipantsList = [];
    for (j = 0; j < queryDM.participants.length; j++) {
      queryDM_ParticipantsList.push(queryDM.participants[j].id);
    }
    queryDM_ParticipantsListSet = new Set(queryDM_ParticipantsList);

    if (
      new Set(selectedPKList.filter((x) => !queryDM_ParticipantsListSet.has(x)))
        .size == 0
    ) {
      exist_DMID = myDms[i].id;
      flag = true;
      break;
    }
  }
  if (flag) {
    console.log("같은게 존재");
    res.json({ status: 201, exist_DMID: exist_DMID });
  } else {
    console.log("새로운 DM");
    newDMID = await DM.create(selectedPKList);
    for (i = 0; i < selectedPKList.length; i++) {
      let queryUser = await User.findOne({ _id: selectedPKList[i] });
      await queryUser.dms.push({ id: newDMID._id });
      await queryUser.save();
    }
    newhtml = `
  <div class="container_UserDM" id=${newDMID._id}>
  <div class="container_UserImage">
  <img src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${
    selectedPKList.filter((x) => !req.session.user._id)[0]
  }.jpg"/>
  </div>
  <div class="container_UserDM2"><span class="span_UserID">${selectedList.toString()}</span>
  <span class="span_PrevMSG"></span>
  </div>
  </div>
  `;
    res.json({ status: 200, HTML: newhtml, newDMID: newDMID._id });
  }
});
router.get("/t/:dmCode", async (req, res, next) => {
  res.writeHead(302, { Location: `/direct/inbox` });
  res.end();
});
router.post("/t/:dmCode", async (req, res, next) => {
  if (!req.session.user) {
    res.end();
  }
  const logined_PK = req.session.user._id;
  const logined_ID = req.session.user.id;
  const dm_ID = req.body.dm_ID;
  const result_data = await loadMessages(logined_PK, dm_ID);
  let dm_HTML = result_data.dm_HTML;
  let participantsID = result_data.participantsID;
  let first_Participants_PK = result_data.first_Participants_PK;
  res.json({
    dm_HTML: dm_HTML,
    url: url.format({
      protocol: req.protocol,
      host: req.get("host"),
    }),
    participantsID: participantsID,
    first_Participants_PK: first_Participants_PK,
  });
});

async function loadDMList(logined_PK) {
  const queryUser = await User.findOne({ _id: logined_PK });
  const dm_List = queryUser.dms;
  let dm_UserListHtml = "";

  if (dm_List.length >= 1) {
    for (i = dm_List.length - 1; i >= 0; i--) {
      let dm = await DM.findOne({ _id: dm_List[i].id });

      let dmUserIDList = [];
      let dmUserIDList_ExceptMe = [];
      let first_Participant_PK;
      for (j = 0; j < dm.participants.length; j++) {
        const element = await User.findOne({ _id: dm.participants[j].id });
        dmUserIDList.push(element.id);
        if (dm.participants[j].id != logined_PK)
          dmUserIDList_ExceptMe.push(element.id);
        if (!first_Participant_PK && dm.participants[j].id != logined_PK)
          first_Participant_PK = dm.participants[j].id;
      }

      let lastdm = "";
      const messages = dm.messages;
      const length = messages.length;
      if (length >= 1) {
        if (messages[length - 1].content) {
          lastdm = messages[length - 1].content;
        }
      }
      dm_UserListHtml += `<div class="container_UserDM" id=${dm_List[i].id}>
      <div class="container_UserImage">
        <img src="	https://kr.object.ncloudstorage.com/jinstagram/userProfile/${first_Participant_PK}.jpg" alt="" />
      </div>
      <div class="container_UserDM2">
        <div class="container_UserID">
          <span class="span_UserID">${dmUserIDList_ExceptMe}</span>
        </div>
        <div class="container_PrevMSG">
          <span class="span_PrevMSG">${lastdm ? lastdm : ""}</span>
        </div>
      </div>
    </div>
      `;
    }
  }

  return dm_UserListHtml;
}
async function loadMessages(logined_PK, dm_ID) {
  let dm_HTML = "";
  let participantsID = [];
  let participantsID_ExceptME = [];
  let first_Participants_PK;
  const queryUser = await User.findOne({ _id: logined_PK });
  const isUserDM = queryUser.dms.filter((element) => {
    return element.id == dm_ID;
  });
  if (isUserDM.length >= 1) {
    const query_DM = await DM.findOne({
      _id: dm_ID,
    });

    const participants = query_DM.participants;

    let participantsToObject = "{";
    for (var participant in participants) {
      let queryParticipant = await User.findOne({
        _id: participants[participant].id,
      });

      //대화방 참여자 ID  목록
      participantsID.push(queryParticipant.id);
      //대화방 자신을 제외한 참여자들 ID 목록
      if (participants[participant].id != logined_PK)
        participantsID_ExceptME.push(queryParticipant.id);
      if (!first_Participants_PK && participants[participant].id != logined_PK)
        first_Participants_PK = participants[participant].id;
      participantsToObject += `"${participants[participant].id}":"${queryParticipant.id}",`;
    }
    let a = participantsToObject.substr(0, participantsToObject.length - 1);
    //    participantsToObject += "}";
    a += "}";
    //대화방 참여자를 Json형태로 저장
    participantsToObject = JSON.parse(a);

    //메시지 HTML 생성
    //dm_HTML += `<div class="container_MSGs">`;
    if (query_DM) {
      // DM기록이 있다면
      dm_Header = `<div class="container_Header">
<div class="container_User">
  <div class="container_UserImage">
    <img src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${first_Participants_PK}.jpg" alt="" />
  </div>
  <div class="container_UserID">
    <span class="span_UserID">${participantsID_ExceptME.toString()}</span>
  </div>
</div>
<div class="container_BtnDetail">
  <svg
    aria-label="대화 상세 정보 보기"
    class="svg_BtnDetail"
    fill="#262626"
    height="24"
    viewBox="0 0 48 48"
    width="24"
  >
    <path
      d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"
    ></path>
    <circle
      clip-rule="evenodd"
      cx="24"
      cy="14.8"
      fill-rule="evenodd"
      r="2.6"
    ></circle>
    <path
      d="M27.1 35.7h-6.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
    ></path>
    <path
      d="M24 35.7c-.8 0-1.5-.7-1.5-1.5V23.5h-1.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H24c.8 0 1.5.7 1.5 1.5v12.2c0 .8-.7 1.5-1.5 1.5z"
    ></path>
  </svg>
</div>
</div>`;
      dm_send = `<div class="container_Send">
<div class="container_TaMSG">
  <textarea placeholder="메시지 입력..." class="ta_MSG"></textarea>
</div>
<div class="container_BtnSend">
  <button class="btn_Send">보내기</button>
</div>
</div>`;

      dm_HTML1 = `<div class="container_BodyMSG">
<div class="container_MSGs1">
<div class="container_MSGs2">
<div class="container_MSGs">`;
      for (i = 0; i < query_DM.messages.length; i++) {
        if (query_DM.messages[i].id == logined_PK) {
          dm_HTML += `

              <div class="container_MSG">
                <div class="container_Left">
                  <div class="container_LeftUserImage"></div>
                  <div class="container_LeftMSG"></div>
                </div>
                <div class="container_Right">
                  <div class="container_RightMSG">
                    <span class="span_RightMSG">${query_DM.messages[i].content}</span>
                  </div>
                </div>
              </div>
    
    `;
        } else {
          dm_HTML += `
        <div class="container_MSG">
            <div class="container_Left">
                <div class="container_LeftUserImage">
                    <img src="	https://kr.object.ncloudstorage.com/jinstagram/userProfile/${
                      query_DM.messages[i].id
                    }.jpg" alt="" />
             </div>
             <span class="span_UserID">${
               participantsToObject[query_DM.messages[i].id]
             }</span>
                <div class="container_LeftMSG">
                    <span class="span_LeftMSG">${
                      query_DM.messages[i].content
                    }</span>
                 </div>
             </div>
        <div class="container_Right">
          <div class="container_RightMSG"></div>
        </div>
      </div>
     `;
        }
      }
      //dm_HTML += "</div>";
      dm_HTML += `</div></div></div>` + dm_send + `</div>`;
    }
  }
  return {
    dm_HTML: dm_Header + dm_HTML1 + dm_HTML,
    participantsID: participantsID,
    first_Participants_PK: first_Participants_PK,
  };
}
module.exports = router;
