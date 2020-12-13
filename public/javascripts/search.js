const search_Bar = document.querySelector(".input_Search");
const container = document.querySelector(".search_Container");
console.log("search_Bar", search_Bar);
console.log("container", container);
console.log("search.js loaded");
search_Bar.addEventListener("input", () => {
  sendSearchAjax("http://192.168.0.8:3000/search", search_Bar.value);
  console.log("hi");
});
search_Bar.addEventListener("focusin", () => {
  if (search_Bar.value.length >= 1)
    sendSearchAjax("http://192.168.0.8:3000/search", search_Bar.value);
});

async function sendSearchAjax(url, value) {
  let data = { value: value, type: "nav" };
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
      container.removeChild(document.querySelector(".container_SearchResult"));
    }
    container.insertAdjacentHTML("beforeend", json.html);
    //검색 결과가 포커스를 잃었을시 제거해줌
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "/javascripts/search/deleteSearchRes.js";
    document.querySelector(".container_SearchResult").appendChild(script);
    document.querySelector(".container_SearchResult").focus();
  } else {
    if (document.querySelector(".container_SearchResult")) {
      container.removeChild(document.querySelector(".container_SearchResult"));
    }
  }
}
