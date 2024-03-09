// <nav class="pagination-container">
// <button
//   class="pagination-button"
//   id="prev-button"
//   aria-label="Previous page"
//   title="Previous page"
// >
//   &lt;
// </button>

// <div id="pagination-numbers"></div>

// <button
//   class="pagination-button"
//   id="next-button"
//   aria-label="Next page"
//   title="Next page"
// >
//   &gt;
// </button>
// </nav>

const displayItemCount = 10;
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
/**
 *  아무 데이터나 추가
 */
// window.addEventListener("load", () => {
const setPageNumber = (index) => {
  const pageNumbers = document.getElementById("pagination-numbers");
  const pageNumberButton = document.createElement("button");
  const contents = index;
  // pageNumberButton.innerHTML = contents;
  pageNumberButton.textContent = contents;
  // pageNumberButton.setAttribute("page-index", contents);
  // pageNumberButton.setAttribute("aria-label", "Page " + contents);
  // console.log("pageNumbers : ", pageNumbers);
  pageNumbers.append(pageNumberButton);
  // pageNumbers.appendChild(pageNumberButton);
  // });
};

/**
 * 현재 페이지의 리스트들을 보여준다.
 */
const setCurrentPageList = (currentPage, display) => {
  console.log(`# setCurrentPageList : ${currentPage}`);

  const startItemIndex = (currentPage - 1) * 10;
  const endItemIndex = startItemIndex + displayItemCount - 1;

  console.log("listItems; : ", listItems);
  // for (items of listItems) {
  //   console.log("items : ", items);
  //   console.log("items.marker : ", items.marker);
  // }

  listItems.forEach((item, index) => {
    if (index < startItemIndex || index > endItemIndex)
      item.classList.add("hidden");
    // console.log("index : ", index);
    console.log("items : ", item);
  });

  console.log(
    `# startItemIndex : ${startItemIndex}, end_item_index : ${end_item_index} `
  );
};
/**
 * "load" 이벤트를 쓰고 안쓰고의 차이점
 * - "load" 이벤트 등록 없이 쓰면 리소스(스타일,를 다 안가져온 상태에서 코드가 실행될 수 있다.
 */

// ## 1
// function setPageNumberList(start, pageCount) {
//   for (let pageNumber = start; pageNumber <= pageCount; pageNumber++)
//     setPageNumber(pageNumber);
// }
// ## 2
const setPageNumberListFirstClass = (start, pageCount) => {
  for (let pageNumber = start; pageNumber <= pageCount; pageNumber++)
    setPageNumber(pageNumber);
};

/**
 * 페이지 개수를 가져온다
 */
window.addEventListener("load", () => {
  const paginatedList = document.getElementById("paginated-list");
  const listItems = paginatedList.querySelectorAll("li");
  const totalCount = listItems.length || 1;
  let currentPage = 4;

  pageCount = Math.ceil(totalCount / displayItemCount);
  const start = 1;

  // ## 1
  // setPageNumberList(start, pageCount);
  // ## 2
  setPageNumberListFirstClass(start, pageCount);
  setCurrentPageList(currentPage);
});
