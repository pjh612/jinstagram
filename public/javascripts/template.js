function NAV(sessionPK, sessionID, logIn) {
  return `<nav class="main_Navigation">
  <div class="nav_Height"></div>
  <div class="nav_Relative">
  <div class="nav_Fixed">
  <div class="nav_Container">
    <div class="logo_Container">
    <a href="/">  
    <img
        src="https://kr.object.ncloudstorage.com/jinstagram/logo_text.png"
        alt="logo"
        srcset=""
        class="logo_image"
      />
      </a>
    </div>
    <div class="search_Container">
    <div class="icon_Search">
      <i class="fas fa-search search"></i></div>
      <input type="text" class="input_Search" placeholder="검색" />
    </div>
    <div class="menu_Container">
    ${
      logIn
        ? ` <a href="/"><svg aria-label="홈" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg></a>
    <a href="/direct/inbox"><svg aria-label="Direct" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></a>
    <svg aria-label="사람 찾기" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg>
    <svg aria-label="활동 피드" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
    <span class="user_image"></span>
    <a href="/${sessionID}">
    <img
    src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${sessionPK}.jpg?${new Date()}"
    alt=""
    srcset=""
    class="user_image"
    onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'" /
  />
  </a>`
        : `<a href="/accounts/login"><button class="btn_LogIn">로그인</button></a> <a href="accounts/signin"><button class="btn_SignIn">가입하기</button></a>`
    }
     
    </div>
    </div>
    </div>
  </div>
</nav>`;
}

module.exports = {
  NEWDM: function () {
    return `
<div class="dialog_Body">
      <div class="dialog">
        <div class="container_Header">
          <button class="btn_Close"><svg aria-label="닫기" class="_8-yf5 " fill="#262626" height="18" viewBox="0 0 48 48" width="18"><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></button>
          <span class="span_NewMSG">새로운 메시지</span>
          <button class="btn_Next">다음</button>
        </div>
        <div class="container_SendTo">
          <span class="span_SendTo">받는 사람:</span>
          <div class="container_Search">
            <input type="text" class="input_SendTo" placeholder="검색..." />
          </div>
        </div>
        <div class="container_Users">
         
            <div class="container_UserInfo">
              
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  DM: function (dm_UserListHtml, sessionPK, sessionID) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" href="data:," />
    <meta charset="UTF-8" />
    <style></style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="/stylesheets/nav.css" />
    <link rel="stylesheet" href="/stylesheets/dm.css" />
    <link rel="stylesheet" href="/stylesheets/newdm.css" />
    <title>Document</title>
  </head>
  <body>
 ${NAV(sessionPK, sessionID, true)}
    <div class="main_Body">
      <div class="container_Main">
        <div class="container_Side">
          <div class="container_Header">
            <div class="container_UserID">
              <span class="span_UserID">${sessionID}</span>
            </div>
            <div class="container_NewMSG">
              <svg
                aria-label="새로운 메시지"
                class="svg_NewMSG"
                fill="#262626"
                height="24"
                viewBox="0 0 44 44"
                width="24"
              >
                <path
                  d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"
                ></path>
                <path
                  d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"
                ></path>
                <path
                  d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="container_DMList1">
            <div class="container_DMList2">
              ${dm_UserListHtml}
            </div>
          </div>
        </div>
        <div class="container_Message">
        <div class="container_Intro">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <image id="레이어_1" x="-27" y="-22" width="144" height="132" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="data:img/png;base64,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" data-name="레이어 1" />
</svg>
        <span class="span_P1">내 메시지</span>
        <span class="span_P2">친구나 그룹에 비공개 사진과 메시지를 보내보세요.</span>
        <button class="btn_NewMSG">메시지 보내기</button>
        </div>
        </div>

      </div>
    </div>
    <script src="https://kit.fontawesome.com/dd4642f0dd.js" crossorigin="anonymous"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/javascripts/dm/dmlistclick.js"></script>
    <script src="/javascripts/dm/newdm.js"></script>
    <script src="/javascripts/search.js"></script>
    <script src="/javascripts/dm/senddm.js"></script>
  </body>
</html>
`;
  },
  P: function (user_PK, content_data, user_name, comments_html, like_html) {
    return `
  
    <div class="dialog_Body">
      <div class="dialog">
    <article class="content" id="${content_data._id}">
      <header class="content_Header">
      <a href="/${user_name}" >  
      <img
          src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${user_PK}.jpg?${new Date()}"
          alt=""
          srcset=""
          class="user_image"
          onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
        />
        <span class="user_ID black_link">${user_name}</span>
        </a>
      </header>

      <div class="content_Images">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/${
          content_data._id
        }.jpg?${new Date()}" alt="" class="content_Image" />
      </div>


      <div class="content_Side">
     
        <div class="content_description">
        <div class="content_Description_UserImage">

          <a href="/${user_name}" >  
          <img
          src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${user_PK}.jpg?${new Date()}"
          alt=""
          srcset=""
          class="user_image"
          onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
        />
          <span class="content_Description_UserID black_link">            
          ${user_name}</span>
          </a>
          <span>${content_data.content}</span>
          </div>

      <div class="content_Comments">
     <div class="content_Comments_List">
        <div class="content_Comment"></div>
        ${comments_html}
        </div>
        
        
      </div>
    </div>
      <div class="content_Buttons">
        ${like_html}
      
        <svg aria-label="게시물 공유" class="btn_share" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
      </div>
        <div class="content_Like">
        <button>
        <span class ="count_Like" id="P_cntLike${content_data._id}">${
      content_data.likes.length
    }</span>명</button><span>이 좋아합니다.</span>
        
        </button>
        </div>
        <div class="content_Date"> ${
          Math.floor((Date.now() - content_data.time.getTime()) / 1000) < 60
            ? Math.floor((Date.now() - content_data.time.getTime()) / 1000) +
              "초"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 60)
              ) < 60
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 60) + "분"
              )
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600)
              ) < 24
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600)
              ) + "시간"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600 * 24)
              ) < 7
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600 * 24)
              ) + "일"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) /
                  (1000 * 3600 * 24) /
                  7
              ) + "주"
        }</div>
        <div class="write_Comment">
          <form id="P_form_Write_Comment" class="form_Write_Comment" method="POST" >
            <textarea
              aria-label="댓글 달기..."
              placeholder="댓글 달기..."
              class="input_Write_Comment"
              name="comment"
              id="input_Write_Comment"
              cols="30"
              rows="10"
            ></textarea>
            <button class="btn_Write_Comment" type="submit" disabled>게시</button>
          </form>
        </div>
    </div>

    
    </article>
  </div>
  <button class="btn_ExitP" type="button">
  <div class="container_ExitP">
  <svg aria-label="닫기" class="svg_ExitP" fill="#ffffff" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
  </div>
  </button>
  </div>
 
 
`;
  },
  P_GET: function (
    session_PK,
    session_ID,
    user_PK,
    content_data,
    user_name,
    comments_html,
    like_html,
    logIn
  ) {
    return `
    
    <!DOCTYPE html>
    <html lang="en">
      <head>
      <link rel="icon" href="data:,">
        <meta charset="UTF-8" />
        <style></style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <link rel="stylesheet" href="/stylesheets/nav.css" />
        <link rel="stylesheet" href="/stylesheets/p_get.css" />
        <title>Document</title>
      </head>
      <body>
      <main class="main">
      ${NAV(session_PK, session_ID, logIn)}
      <div class="section_Main">
     <div class="container_Article">
    <article class="content" id="${content_data._id}">
      <header class="content_Header">
      <a href="/${user_name}" >  
      <img
          src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${user_PK}.jpg?${new Date()}"
          alt=""
          srcset=""
          class="user_image"
          onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
        />
        <span class="user_ID black_link">${user_name}</span>
        </a>
      </header>

      <div class="content_Images">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/${
          content_data._id
        }.jpg?${new Date()}" alt="" class="content_Image" />
      </div>


      <div class="content_Side">
     
        <div class="content_description">
        <div class="content_Description_UserImage">

          <a href="/${user_name}" >  
          <img
          src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${user_PK}.jpg?${new Date()}"
          alt=""
          srcset=""
          class="user_image"
          onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
        />
          <span class="content_Description_UserID black_link">            
          ${user_name}</span>
          </a>
          <span>${content_data.content}</span>
          </div>

      <div class="content_Comments">
     <div class="content_Comments_List">
        <div class="content_Comment"></div>
        ${comments_html}
        </div>
        
        
      </div>
    </div>
      <div class="content_Buttons">
        ${like_html}
      
        <svg aria-label="게시물 공유" class="btn_share" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
      </div>
        <div class="content_Like">
        <button>
        <span class ="count_Like" id="cntLike${content_data._id}">${
      content_data.likes.length
    }</span>명</button><span>이 좋아합니다.</span>
        
        </button>
        </div>
        <div class="content_Date">  ${
          Math.floor((Date.now() - content_data.time.getTime()) / 1000) < 60
            ? Math.floor((Date.now() - content_data.time.getTime()) / 1000) +
              "초"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 60)
              ) < 60
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 60)
              ) + "분"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600)
              ) < 24
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600)
              ) + "시간"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600 * 24)
              ) < 7
            ? Math.floor(
                (Date.now() - content_data.time.getTime()) / (1000 * 3600 * 24)
              ) + "일"
            : Math.floor(
                (Date.now() - content_data.time.getTime()) /
                  (1000 * 3600 * 24) /
                  7
              ) + "주"
        }</div>
        <div class="write_Comment">
          <form id="P_form_Write_Comment" class="form_Write_Comment" method="POST" >
            <textarea
              aria-label="댓글 달기..."
              placeholder="댓글 달기..."
              class="input_Write_Comment"
              name="comment"
              id="input_Write_Comment"
              cols="30"
              rows="10"
            ></textarea>
            <button class="btn_Write_Comment" type="submit" disabled>게시</button>
          </form>
        </div>
    </div>

    
    </article>
    </div>
    </div>
  </main>
  <script src="/javascripts/search.js"></script>
  <script src="/javascripts/p.js"></script>
  <script src="/javascripts/p/pgetcomment.js"></script>
  <script src="/javascripts/likeAjax.js"></script>
</body>
</html>
 
 
`;
  },
  EDIT: function (pk, id, name, introduction, email, phone) {
    return ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style></style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/stylesheets/edit.css" />
        <link rel="stylesheet" href="/stylesheets/nav.css" />
        <title>개인 정보 수정</title>
      </head>
      <body>
      ${NAV(pk, id, true)}
      <div class="main">
      <div class="container_EDIT">
      <div class="side_Container">
      <div class="container_SideMenu">프로필 편집</div>
      </div>
     
          <div class="main_Container">
         
            <div class="header">
              <div class="header_UserImageContainer">
                <img src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${pk}.jpg?${new Date()}" class="header_UserImage" />
              </div>
              <div class="header_SubContainer">
                <span class="header_UserID">${id}</span>
                <button class="header_ChangeProfile" id="changeProfile">프로필 사진 바꾸기</button>
                <form enctype="multipart/form-data" method="POST" role="presentation" id="form_Profile" action="/accounts/profile">
                <input type="file" id="input_ChangeProfile" accept="image/jpeg" name="img" hidden/>
                </form>
              </div>
            </div>
            <form method="POST">
            <div class="container_Name">
              <aside class="aside_Name">
                <span class="span_Name">이름</span>
              </aside>
              <div class="container_Input">
              <input class="input_Name" name="name"  value="${name}"></input>
              </div>
            </div>
            <div class="container_Introduction">
              <aside class="aside_Introduction">
                <span class="span_Introduction" >소개</span>
              </aside>
              <div class="container_TA">
              <textarea class="ta_Introduction" name="Introduction">${introduction}</textarea>
              </div>
            </div>
            <div class="container_Email">
              <aside class="aside_Email">
                <span class="span_Email">이메일</span>
              </aside>
              <div class="container_Input">
              <input class="input_Email" name="Email" value="${email}"></input></div>
            </div>
    
            <div class="container_Phone">
              <aside class="aside_Phone">
                <span class="span_Phone"> 전화번호</span>
              </aside>
              <div class="container_Input">
              <input class="input_Phone" name="Phone" value="${phone}" ></input></div>
            </div>

            <div class="container_Sex">
            <aside class="aside_Sex">
              <span class="span_Sex"> 성별</span>
            </aside>
            <div class="container_Input">
            <input class="input_Sex" name="Sex" value="" ></input></div>
          </div>
            <div class="container_btn">
            <aside class="aside_Submit">
            
          </aside>
              <button class="btn_submit">제출</button>
            </div>
          </div>
        </form>
        </div>
        </div>
        <script src="https://kit.fontawesome.com/dd4642f0dd.js" crossorigin="anonymous"></script>
        <script src="/javascripts/search.js"></script>
        <script src="/javascripts/upload.js"></script>
      </body>
    </html>
    `;
  },
  PROFILE: function (
    sessionPK,
    sessionID,
    user,
    content_data,
    article_length,
    btn_EditHtml,
    btn_followHTML,
    logIn
  ) {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
  <link rel="icon" href="data:,">
    <meta charset="UTF-8" />
    <style></style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="stylesheets/profile.css" />
    <link rel="stylesheet" href="stylesheets/nav.css" />
    <link rel="stylesheet" href="stylesheets/p.css" />
    <title>Document</title>
  </head>
  <body>
    ${NAV(sessionPK, sessionID, logIn)}
   <main class="profile_Main">
     <div class="profile_MainContainer">
     <div class="profile_Header">
      <div class="profile_UserPicture">
      <div class="profile_UserPicture2"> <img
        src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${
          user._id
        }.jpg?${new Date()}"
        alt=""
        srcset=""
        class="user_image"
        onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
      />
      </div>
    </div>
      <div class="profile_Info">
        <div class="profile_Info1">
          <span class="profile_UserID">${user.id}</span>
          ${
            logIn
              ? `${btn_followHTML} ${btn_EditHtml}`
              : `<a href="/accounts/login"><button class="btn_Follow">팔로우</button></a> `
          }
          
        </div>
      <div class="profile_Info2">
          <span class="profile_PostsC">게시물&nbsp; </span><span class="profile_PostsC2">${article_length}</span>
          <span class="profile_FollowersC">팔로워&nbsp; </span><span class="profile_FollowersC2">${
            user.followers.length
          }</span>
          <span class="profile_FollowsC">팔로우&nbsp; </span><span class="profile_FollowsC2">${
            user.follows.length
          }</span>
      </div>
      <div class="profile_Info3">
      <h1 class="txt_UserName">${user.name}</h1>
          <span class="profile_Introduction">
            ${user.introduction}
       </span>
      </div>
</div>
</div>

<div class="container_Category">
<div class="container_LookPosts">
<svg aria-label="게시물" class="_8-yf5 " fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
<span class="catefor">게시물</span>
</div>
</div>
<div class="Container_Profile_Posts">

 ${content_data}

</div>
</div>

     </div>
    </div>
   </main>

   <script
      src="https://kit.fontawesome.com/dd4642f0dd.js"
      crossorigin="anonymous"
    ></script>
    <script src="/javascripts/follow.js"></script>
    <script src="javascripts/search.js"></script>
    <script src="javascripts/p.js"></script>
 
  </body>
</html>

    `;
  },

  CONTENT: function (user_PK, content_data, user_name, comments, like_html) {
    return `
        <article class="content" id="${content_data._id}">
            <header class="content_Header">
            <a href="/${user_name}" >  
            <img
                src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${user_PK}.jpg?${new Date()}"
                alt=""
                srcset=""
                class="user_image"
                onerror="this.src='https://kr.object.ncloudstorage.com/jinstagram/userProfile/noprofile.jpg'"
              />
              <span class="user_ID black_link">${user_name}</span>
              </a>
            </header>
            <div class="content_Images">
              <img src="https://kr.object.ncloudstorage.com/jinstagram/${
                content_data.image
              }.jpg?${new Date()}" alt="" class="content_Image" />
            </div>
            <div class="content_Buttons">
            ${like_html}
            <a href="p/${
              content_data._id
            }"><svg aria-label="댓글 달기" class="btn_comments" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg></a>
            <svg aria-label="게시물 공유" class="btn_share" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
            </div>
            <div class="content_Like">
            <button>
            <span class ="count_Like" id="cntLike${content_data._id}">${
      content_data.likes.length
    }</span>명</button><span>이 좋아합니다.</span></div>
            <div class="content_description">
            <a href="/${user_name}" >  
            <span class="content_Description_UserID black_link">            
            ${user_name}</span>
            </a>
            <span>${content_data.content}</span>
            </div>
            <div class="content_Comments">
            <div class="content_MoreComments">
            <span class="span_MoreComments">댓글 ${
              comments[1]
            }개 모두 보기</span>
            </div>
           <div class="content_Comments_List">
              <div class="content_Comment"></div>
              ${comments[0]}
              </div>
              <div class="content_Date">
         
              ${
                Math.floor((Date.now() - content_data.time.getTime()) / 1000) <
                60
                  ? Math.floor(
                      (Date.now() - content_data.time.getTime()) / 1000
                    ) + "초 전"
                  : Math.floor(
                      (Date.now() - content_data.time.getTime()) / (1000 * 60)
                    ) < 60
                  ? Math.floor(
                      (Date.now() - content_data.time.getTime()) / (1000 * 60) +
                        "분 전"
                    )
                  : Math.floor(
                      (Date.now() - content_data.time.getTime()) / (1000 * 3600)
                    ) < 24
                  ? Math.floor(
                      (Date.now() - content_data.time.getTime()) / (1000 * 3600)
                    ) + "시간 전"
                  : Math.floor(
                      (Date.now() - content_data.time.getTime()) /
                        (1000 * 3600 * 24)
                    ) < 7
                  ? Math.floor(
                      (Date.now() - content_data.time.getTime()) /
                        (1000 * 3600 * 24)
                    ) + "일 전"
                  : Math.floor(
                      (Date.now() - content_data.time.getTime()) /
                        (1000 * 3600 * 24) /
                        7
                    ) + "주 전"
              }</div>
              <div class="write_Comment">
                <form id="form_Write_Comment" class="form_Write_Comment" method="POST" >
                  <textarea
                    aria-label="댓글 달기..."
                    placeholder="댓글 달기..."
                    class="input_Write_Comment"
                    name="comment"
                    id="input_Write_Comment"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <button class="btn_Write_Comment type="submit" disabled>게시</button>
                </form>
              </div>
            </div>
            
          </article>
        
        `;
  },
  LOGIN: function () {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   
   <link rel="stylesheet" href="/stylesheets/login.css">
    <title>Insta_Clone</title>
   
  </head>
  <body>

    <div class= "main_Container">
        <div class="animation_Container">
            <div class="image_Container">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/mainA_1.jpg" class="image_animation" id="image_animation">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/mainA_2.jpg" class="image_animation" id="image_animation">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/mainA_3.jpg" class="image_animation change_animation2" id="image_animation">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/mainA_4.jpg" class="image_animation change_animation" id="image_animation">
    </div>
    </div>
    <div class="sub_Container">
        <div class="logIn_Container">
            <img src="	https://kr.object.ncloudstorage.com/jinstagram/logo_text.png" class="img_logo">
            <form action="" method="post">
            <div class="part_ID">
                <input type="text" class="input_ID" name="ID">
            </div>
            <div class="part_Pwd"><input type="password" name="PWD" class = "input_Pwd" id="input_Pwd"></div>
            <button type="submit" class="btn_logIn" value="로그인" disabled>로그인</button>
           
        </form>
            <div class="part_Or">
                <div class="line"></div>
                <span class="Or">또는</span>
                <div class="line"></div>
            </div>
            <div class="login_faceBook">
                <span class="icon_faceBook"></span>
                <span class="login_faceBookText">Facebook으로 로그인</span>
            <div class="container_LogInError">
            <p aria-atomic="true" role="alert" id="ErrorAlert"></p>
            </div>
            </div>
            <div class="forgetPwd">
                <span class="forgetPwdText">비밀번호를 잊으셨나요?</span>
            </div>
          

        </div>
        
        <div class="signUp_Container">
            <span>계정이 없으신가요? </span>
           <a href="/accounts/signin"> <span class="btn_signUp">가입하기</span></a>
        </div>
        <div class="down_Container">
        <p class="plzDownApp">앱을 다운로드하세요.</span>
        <div class="downLink_Container">
        <img src="https://kr.object.ncloudstorage.com/jinstagram/downapple.png" class="down_Apple"></button>
        <img src="https://kr.object.ncloudstorage.com/jinstagram/downgoogle.png" class="down_Google"></button>
    </div>
    </div>
    </div>

    </div>
  
<script src="/javascripts/login_animation.js"></script>
<script src="/javascripts/input_disable.js"></script>
<script src="/javascripts/accounts/login/login.js"></script>

  </body>
</html>

`;
  },

  SIGNIN: function () {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style></style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/stylesheets/signin.css" />
       
        <title>가입하기</title>
      </head>
      <body>
        <div class="body_Section">
          <main class="mainContainer">
            <div class="container1">
              <div class="logo">
                <img src="https://kr.object.ncloudstorage.com/jinstagram/logo_text.png" alt="" srcset="" class="logo" />
              </div>
              <div class="signin_Desc">
                <h2 class="span_SignInDes">
                  친구들의 사진과 동영상을 보려면 가입하세요.
                </h2>
              </div>
              <div class="login_Facebook">
                <button class="btn_LoginFacebook">
                  <span class="span_LoginFacebook">Facebook으로 로그인</span>
                </button>
              </div>
              <div class="partition">
                <div class="partition_1"></div>
                <div class="partition_2">또는</div>
                <div class="partition_1"></div>
              </div>
              <div class="container_Input">
                <div class="container_PhoneOrEmail">
                  <label>
                    <span class="span_Input">휴대폰 번호 또는 이메일 주소</span>
                    <input
                      aria-label="휴대폰 번호 또는 이메일 주소"
                      aria-required="true"
                      autocapitalize="off"
                      autocomplete="tel"
                      autocorrect="off"
                      name="PhoneOrEmail"
                      type="text"
                      class="input_PhoneOrEmail"
                      value=""
                    />
                  </label>
                </div>
              </div>
              <form method="post">
              <div class="container_Input">
                <div class="container_Name">
                  <label>
                    <span class="span_Input">성명</span>
                    <input
                      aria-label="성명"
                      aria-required="true"
                      autocapitalize="off"
                      autocomplete="tel"
                      autocorrect="off"
                      name="Name"
                      type="text"
                      class="input_Name"
                      value=""
                    />
                  </label>
                </div>
              </div>
              <div class="container_Input">
                <div class="container_UserNickName">
                  <label>
                    <span class="span_Input">사용자 이름</span>
                    <input
                      aria-label="사용자 이름"
                      aria-required="true"
                      autocapitalize="off"
                      autocomplete="tel"
                      autocorrect="off"
                      name="UserNickName"
                      type="text"
                      class="input_UserNickName"
                      value=""
                    />
                  </label>
                </div>
              </div>
              <div class="container_Input">
                <div class="container_PWD">
                  <label>
                    <span class="span_Input">비밀번호</span>
                    <input
                      aria-label="비밀번호"
                      aria-required="true"
                      autocapitalize="off"
                      autocomplete="tel"
                      autocorrect="off"
                      name="PWD"
                      type="password"
                      class="input_PWD"
                      value=""
                    />
                  </label>
                </div>
              </div>
              <div class="container_BtnSignIn">
                <button class="btn_SignIn" type="submit">가입</button>
              </div>
              </form>
              <div class="container_terms">
                <p>
                  가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게
                  됩니다.
                </p>
              </div>
            </div>
    
            <div class="container2">
              <p class="container2_1">
                계정이 있으신가요?
                <a href="/accounts/login" class="btn_login">로그인</a>
              </p>
            </div>
            <div class="container3">
              <div class="container3_1"><span>앱을 다운로드하세요.</span></div>
              <div class="container3_2">
                <img src="https://kr.object.ncloudstorage.com/jinstagram/downapple.png" alt="" /><img
                  src="https://kr.object.ncloudstorage.com/jinstagram/downgoogle.png"
                  alt=""
                />
              </div>
            </div>
          </main>
        </div>
        <script src="/javascripts/signin.js"></script>
      </body>
      
    </html>
     `;
  },
  INDEX: function (session_PK, session_ID, logined_Name, contents_html, logIn) {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
  
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="stylesheets/main.css" />
    <link rel="stylesheet" href="stylesheets/nav.css" />
    <link rel="stylesheet" href="stylesheets/p.css" />
    <title>InstaClone</title>
  </head>
  <body>
  ${NAV(session_PK, session_ID, logIn)}
    
    <main class="main_Container">
      <section class="main_Section">
        <section class="contents">
         
          ${contents_html}
        </section>
      </section>
      <section class="side_Section">
        <div class="user_Info">
         <a href="/${session_ID}"> <img src="https://kr.object.ncloudstorage.com/jinstagram/userProfile/${session_PK}.jpg?${new Date()}" alt="" class="user_Picture" /></a>
          <div class="userIDName">
          <a href="/${session_ID}">  <span class="user_ID">${session_ID}</span></a>
            <span class="user_Name">${logined_Name}</span>
          </div>
        </div>

        <div class="container_Recommend">
        <div class="container_Recommend2">
        <span class="span_Recommend">회원님을 위한 추천</span>
        <span class="span_All">모두 보기</span>
        </div>
        </div>
        <div class="container_Footer">
        <span class="span_Right">© 2020 Jinstagram</span>
        </div>
      </section>
    </main>
    <script
      src="https://kit.fontawesome.com/dd4642f0dd.js"
      crossorigin="anonymous"
    ></script>
    <script src="javascripts/CommentAjax.js"></script>
    <script src="javascripts/likeAjax.js"></script>
    <script src="javascripts/search.js"></script>
    <script src="javascripts/p/mainp.js"></script>
  </body>
</html>

    `;
  },
};
