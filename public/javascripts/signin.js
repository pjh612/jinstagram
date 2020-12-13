const container_UserNickName = document.querySelector(
  ".container_UserNickName"
);
const container_PhoneOrEmail = document.querySelector(
  ".container_PhoneOrEmail"
);
const container_Name = document.querySelector(".container_Name");
const container_PWD = document.querySelector(".container_PWD");
const span_UserNickName = container_UserNickName.querySelector(".span_Input");
const input_PhoneOrEmail = container_PhoneOrEmail.querySelector("input");
const input_UserNickName = container_UserNickName.querySelector("input");
const input_Name = container_Name.querySelector("input");
const input_PWD = container_PWD.querySelector("input");
const label_UserNickName = container_UserNickName.querySelector("label");
const label_PhoneOrEmail = container_PhoneOrEmail.querySelector("label");
const label_PWD = container_PWD.querySelector("label");
const label_Name = container_Name.querySelector("label");
const btn_SignIn = document.querySelector(".btn_SignIn");
console.log(container_UserNickName);
console.log(label_UserNickName);
input_UserNickName.addEventListener("input", (event) => {
  let cnt = event.target.value.length;
  if (cnt == 0) {
    label_UserNickName.classList.remove("inputed");
  } else {
    label_UserNickName.classList.add("inputed");
    sendCheckAjax("http://192.168.0.8:3000/check2", input_UserNickName.value);
  }
});

input_Name.addEventListener("input", (event) => {
  let cnt = event.target.value.length;
  if (cnt == 0) {
    label_Name.classList.remove("inputed");
  } else {
    label_Name.classList.add("inputed");
  }
});

input_PWD.addEventListener("input", (event) => {
  let cnt = event.target.value.length;
  if (cnt == 0) {
    label_PWD.classList.remove("inputed");
  } else {
    label_PWD.classList.add("inputed");
  }
});

input_PhoneOrEmail.addEventListener("input", (event) => {
  let cnt = event.target.value.length;
  if (cnt == 0) {
    label_PhoneOrEmail.classList.remove("inputed");
  } else {
    label_PhoneOrEmail.classList.add("inputed");
  }
});
async function sendCheckAjax(url, value) {
  let data = { value: value };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (response.status == 200) {
    btn_SignIn.removeAttribute("disabled");
  } else {
    btn_SignIn.setAttribute("disabled", "");
  }
}
