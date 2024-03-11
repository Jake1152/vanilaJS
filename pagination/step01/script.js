const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const displayItemCount = 10;
const pageCount = Math.ceil(listItems.length / displayItemCount);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

/**
 * 전역으로 const paginationNumbers = document.getElementById("pagination-numbers");
 * paginationNumbers 만들어두었지만 호출될떄마다 새롭게 document에서 가져와서 반복문 돌리는 이유는?
 * 페이지 숫자의 변동에 따라 미리 변수에 담아둔 것과 아닌것의 차이점이 발생하는가?
 *
 *  getElementById()는 단수 리턴, 반복 불가
 *  querySelectorAll()는 복수 리턴, 반복 가능
 * 전역 선언 여부와는 상관 없는 듯
 * 단, api호출하여 paginationNumber가 바뀌게 되는 경우
 * 변동사항이 있는지 테스트 필요!
 */
const handleActivePageNumber = () => {
  // # 00 기존에 생성한 paginationNumbers 활용
  // paginationNumbers.forEach((button) => {
  //   button.classList.remove("active");
  //   const pageIndex = Number(button.getAttribute("page-index"));
  //   if (pageIndex === currentPage) {
  //     button.classList.add("active");
  //   }
  // });
  // # 01일일이 paginationNumbers id에 해당하는 dom을 가져와서 처리하는 방식
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

/**
 * eventListener를 setPageNumber()를 호출할때마다 하고 있다.
 * 페이지 누룰떄마다, 다음,이전 버튼 누를때마다 되고 있다.
 * api로 호출받아서 페이지 리스트가 달라지게 된다면 그때는 의미가 있겟지만
 * 같은 페이지인 동안에는 이미 작업했던것에 대해 중복된 작업이 요청된다.
 * 어떻게 효율화 할것인가?
 * 최적화의 필요성이 있을 정도의 부하인가?
 *
 * @param {*} pageNumber : 현재 페이지 숫자
 */
const setPageNumber = (pageNumber) => {
  const pageNumberButton = document.createElement("button");
  const contents = pageNumber;
  // pageNumberButton.innerHTML = contents;
  pageNumberButton.textContent = contents;
  pageNumberButton.setAttribute("page-index", contents);
  pageNumberButton.setAttribute("aria-label", "Page " + contents);

  pageNumberButton.addEventListener("click", () => {
    setCurrentPageItemsList(pageNumber);
  });

  paginationNumbers.appendChild(pageNumberButton);
};

/**
 * 현재 페이지의 리스트들을 보여준다.
 */
const setCurrentPageItemsList = (pageNumber) => {
  currentPage = pageNumber;
  // console.log(`# setCurrentPageItemsList : ${currentPage}`);

  handleActivePageNumber();
  handlePageButtonsStatus();

  const startItemIndex = (currentPage - 1) * 10;
  const endItemIndex = startItemIndex + displayItemCount - 1;

  listItems.forEach((item, index) => {
    if (index < startItemIndex || index > endItemIndex)
      item.classList.add("hidden");
    else item.classList.remove("hidden");
  });

  // console.log(
  //   `# startItemIndex : ${startItemIndex}, endItemIndex : ${endItemIndex} `
  // );
};

const setPaginationNumbers = () => {
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
  setPaginationNumbers();
  setCurrentPageItemsList(currentPage);

  prevButton.addEventListener("click", () => {
    setCurrentPageItemsList(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPageItemsList(currentPage + 1);
  });
});
