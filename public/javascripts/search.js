const search_Bar = document.querySelector(".input_Search");
const container = document.querySelector(".search_Container");
console.log("search_Bar", search_Bar);
console.log("container", container);
console.log("search.js loaded");
search_Bar.addEventListener("input", () => {
  sendSearchAjax("http://127.0.0.1:3000/search", search_Bar.value);
});

async function sendSearchAjax(url, value) {
  let data = { value: value };
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
    if (document.querySelector(".container_Search")) {
      container.removeChild(document.querySelector(".container_Search"));
    }
    container.insertAdjacentHTML("beforeend", json.html);
  } else {
    if (document.querySelector(".container_Search")) {
      container.removeChild(document.querySelector(".container_Search"));
    }
  }
}
