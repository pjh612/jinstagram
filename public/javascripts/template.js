function NAV(sessionPK, sessionID, logIn) {
  return `<nav class="main_Navigation">
  <div class="nav_Container">
    <div class="logo_Container">
    <a href="/">  
    <img
        src="https://jinstagram.s3.us-east-2.amazonaws.com/logo_text.png"
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
        ? ` <svg aria-label="홈" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg>
    <svg aria-label="Direct" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
    <svg aria-label="사람 찾기" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg>
    <svg aria-label="활동 피드" class="nav_MenuIcon" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
    <span class="user_image"></span>
    <a href="/${sessionID}">
    <img
    src="https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/${sessionPK}.jpg"
    alt=""
    srcset=""
    class="user_image"
    onerror="this.src='https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/noprofile.jpg'" /
  />
  </a>`
        : `<a href="/accounts/login"><button class="btn_LogIn">로그인</button></a> <a href="accounts/signin"><button class="btn_SignIn">가입하기</button></a>`
    }
     
    </div>
  </div>
</nav>`;
}

module.exports = {
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
      <div class="side_Container"></div>
     
          <div class="main_Container">
         
            <div class="header">
              <div class="header_UserImageContainer">
                <img src="https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/${pk}.jpg" class="header_UserImage" />
              </div>
              <div class="header_SubContainer">
                <span class="header_UserID">${id}</span>
                <button class="header_ChangeProfile" id="changeProfile">프로필 사진 바꾸기</button>
                <input type="file" id="input_ChangeProfile" accept="image/jpeg" name="target" hidden/>
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
              <button class="btn_submit">제출</button>
            </div>
          </div>
        </form>
        </div>
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
    <title>Document</title>
  </head>
  <body>
    ${NAV(sessionPK, sessionID, logIn)}
   <main class="profile_Main">
     <div class="profile_MainContainer">
     <div class="profile_Header">
      <div class="profile_UserPicture"> <img
        src="https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/${
          user._id
        }.jpg"
        alt=""
        srcset=""
        class="user_image"
        onerror="this.src='https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/noprofile.jpg'"
      />
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
  </body>
</html>

    `;
  },

  CONTENT: function (
    user_PK,
    content_data,
    user_name,
    comments_html,
    like_html
  ) {
    return `
        <article class="content" id="${content_data._id}">
            <header class="content_Header">
            <a href="/${user_name}" >  
            <img
                src="https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/${user_PK}.jpg"
                alt=""
                srcset=""
                class="user_image"
                onerror="this.src='https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/noprofile.jpg'"
              />
              <span class="user_ID black_link">${user_name}</span>
              </a>
            </header>
            <div class="content_Images">
              <img src="https://jinstagram.s3.us-east-2.amazonaws.com/${content_data.image}.jpg" alt="" class="content_Image" />
            </div>
            <div class="content_Buttons">
            ${like_html}
            <svg aria-label="댓글 달기" class="btn_comments" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
            <svg aria-label="게시물 공유" class="btn_share" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
            </div>
            <div class="content_Like">
            <button>
            <span class ="count_Like" id="cntLike${content_data._id}">${content_data.likes.length}</span>명</button><span>이 좋아합니다.</span></div>
            <div class="content_description">
            <a href="/${user_name}" >  
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
              <div class="content_Date">${content_data.time}</div>
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
                  <button class="btn_Write_Comment type="submit">게시</button>
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
 <button id="newcontent">newcontent</button>
 <a href="./newcontent">newcontent</a>
    <div class= "main_Container">
        <div class="animation_Container">
            <div class="image_Container">
        <img src="/images/mainA_1.jpg" class="image_animation" id="image_animation">
        <img src="/images/mainA_2.jpg" class="image_animation" id="image_animation">
        <img src="/images/mainA_3.jpg" class="image_animation change_animation2" id="image_animation">
        <img src="/images/mainA_4.jpg" class="image_animation change_animation" id="image_animation">
    </div>
    </div>
    <div class="sub_Container">
        <div class="logIn_Container">
            <img src="/images/logo_text.png" class="img_logo">
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
        <img src="/images/downapple.png" class="down_Apple"></button>
        <img src="/images/downgoogle.png" class="down_Google"></button>
    </div>
    </div>
    </div>

    </div>
  
<script src="/javascripts/login_animation.js"></script>
<script src="/javascripts/input_disable.js"></script>

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
                <img src="https://jinstagram.s3.us-east-2.amazonaws.com/logo_text.png" alt="" srcset="" class="logo" />
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
                      type="text"
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
                <img src="https://jinstagram.s3.us-east-2.amazonaws.com/downapple.png" alt="" /><img
                  src="https://jinstagram.s3.us-east-2.amazonaws.com/downgoogle.png"
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
  INDEX: function (session_PK, session_ID, contents_html, logIn) {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
  
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="stylesheets/main.css" />
    <link rel="stylesheet" href="stylesheets/nav.css" />
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
          <img src="" alt="" class="user_Picture" />
          <div class="userIDName">
            <span class="user_ID">pjh_jn</span>
            <span class="user_Name">박진형</span>
          </div>
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
  </body>
</html>

    `;
  },
};
