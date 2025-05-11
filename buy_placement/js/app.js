const switchButtonRow = document.querySelector("#button-switch-row");
const switchButtonColumn = document.querySelector("#button-switch-column");
const columnTable = document.querySelector(".real-estate-cards-list-column-table");
const cardsRowContainer = document.querySelector(".real-estate-cards-list-row");
const cardsColumnContainer = document.querySelector(".real-estate-cards-list-column");

switchButtonColumn.addEventListener("click", function(e) {
  switchButtonColumn.classList.add("button-switch-active");
  switchButtonRow.classList.remove("button-switch-active");
  cardsRowContainer.style.display = "none";
  columnTable.style.display = "grid";
  cardsColumnContainer.style.display = "flex";
})

switchButtonRow.addEventListener("click", function(e) {
    switchButtonRow.classList.add("button-switch-active");
    switchButtonColumn.classList.remove("button-switch-active");
    columnTable.style.display = "none";
    cardsColumnContainer.style.display = "none";
    cardsRowContainer.style.display = "grid";
})



