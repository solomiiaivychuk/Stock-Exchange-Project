class SearchForm {
  constructor(element) {
    this.element = element;

    function createSearchInput() {
      const inputField = document.createElement("input");
      inputField.setAttribute("type", "search");
      inputField.setAttribute("id", "search");
      inputField.setAttribute("class", "form-control");
      inputField.setAttribute("placeholder", "Search");
      inputField.setAttribute("aria-label", "Search");
      inputField.setAttribute("aria-describedly", "button-addon2");
      searchNavBar.appendChild(inputField);
      return inputField;
    }

    function createSearchButton() {
      const buttonWrapper = document.createElement("div");
      const searchButton = document.createElement("button");
      const node = document.createTextNode("Search");
      buttonWrapper.setAttribute("class", "input-group-append");
      searchButton.classList.add("btn");
      searchButton.classList.add("btn-outline-secondary");
      searchButton.classList.add("search-button");
      searchButton.setAttribute("type", "button");
      searchButton.setAttribute("id", "button-addon2");
      searchButton.appendChild(node);
      buttonWrapper.appendChild(searchButton);
      searchNavBar.appendChild(buttonWrapper);
      return searchButton;
    }

    this.inputField = createSearchInput();
    this.searchButton = createSearchButton();
  }
  onSearch(displayCompanies) {
    this.searchButton.addEventListener("click", async function () {
      this.input = document.getElementById("search");
      const inputValue = this.input.value;
      loader.show();
      searchResult.searchResultsList.textContent = null;
      const response = await fetch(
        `http://localhost:3000/search?query=${inputValue}`
      );
      const data = await response.json();
      displayCompanies(data);
      loader.hide();
    });
  }
}
