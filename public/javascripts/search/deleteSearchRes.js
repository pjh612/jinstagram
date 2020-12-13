//검색 결과가 포커스를 잃었을시 제거해줌
document.querySelector("body").addEventListener("click", (event) => {
  var target = event.target;
  if (document.querySelector(".container_SearchResult")) {
    if (
      target != event.currentTarget.querySelector(".search_Container") &&
      target != event.currentTarget.querySelector(".input_Search") &&
      target != event.currentTarget.querySelector(".container_SearchResult")
    ) {
      container.removeChild(document.querySelector(".container_SearchResult"));
    } else return;
  }
});
