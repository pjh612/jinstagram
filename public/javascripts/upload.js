const btn_UpLoad = document.getElementById("changeProfile");
const input_Upload = document.getElementById("input_ChangeProfile");
btn_UpLoad.addEventListener("click", () => {
  input_Upload.click();
});
input_Upload.addEventListener("change", () => {
  console.log(input_Upload.value);
  sendProfileAjax("http://127.0.0.1:3000/changprofile", input_Upload.value);
});

async function sendProfileAjax(url, fileURL) {
  const data = { fileURL: fileURL };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  if (response.status == 200) {
    alert("변경이 완료되었습니다.");
  } else {
    alert("에러 발생!");
  }
}
