const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const displayItemCount = 10;

const setPageNumber = (index) => {
  const pageNumbers = document.getElementById("pagination-numbers");
  const pageNumberButton = document.createElement("button");
  const contents = index;
  // pageNumberButton.innerHTML = contents;
  pageNumberButton.textContent = contents;
  // pageNumberButton
  pageNumberButton.setAttribute("page-index", contents);
  pageNumberButton.setAttribute("aria-label", "Page " + contents);
  pageNumberButton.addEventListener("click", () => {
    setCurrentPageItemsList(index);
  });
  // pageNumberButton.
  // console.log("pageNumbers : ", pageNumbers);
  // pageNumbers.append(pageNumberButton);
  pageNumbers.appendChild(pageNumberButton);
  // });
};

/**
 * 현재 페이지의 리스트들을 보여준다.
 */
const setCurrentPageItemsList = (currentPage, display) => {
  console.log(`# setCurrentPageItemsList : ${currentPage}`);

  const startItemIndex = (currentPage - 1) * 10;
  const endItemIndex = startItemIndex + displayItemCount - 1;

  listItems.forEach((item, index) => {
    if (index < startItemIndex || index > endItemIndex)
      item.classList.add("hidden");
    else item.classList.remove("hidden");
  });

  console.log(
    `# startItemIndex : ${startItemIndex}, endItemIndex : ${endItemIndex} `
  );
};

const setPaginationNumbers = () => {
  const totalCount = listItems.length || 1;
  const pageCount = Math.ceil(totalCount / displayItemCount);
  // start가 현재 item의 위치에 따라 계산되도록 처리
  const start = 1;
  for (let pageNumber = start; pageNumber <= pageCount; pageNumber++)
    setPageNumber(pageNumber);
};

/**
 * "load" 이벤트를 쓰고 안쓰고의 차이점
 * - "load" 이벤트 등록 없이 쓰면 리소스(스타일,를 다 안가져온 상태에서 코드가 실행될 수 있다.
 */
window.addEventListener("load", () => {
  let initPageNumber = 1;

  setPaginationNumbers();
  setCurrentPageItemsList(initPageNumber);
});
