class SearchResult {
  constructor(element) {
    this.element = element;

    function createSearchList() {
      const searchResultsList = document.createElement("ul");
      searchResultsList.classList.add("search-results-list");
      resultsWrapper.appendChild(searchResultsList);
      return searchResultsList;
    }
    this.searchResultsList = createSearchList();

    this.display = async function (data) {
      data.forEach(async (item) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const link = document.createElement("a");
        const changes = document.createElement("span");
        const name = `${item.name}`;
        const symbol = `(${item.symbol})`;
        const newName = await highlight(name);
        const newSymbol = await highlight(symbol);
        link.innerHTML = `${newName} ${newSymbol}`;
        const changesPersentage = item.profile.changes;
        link.href = `./company.html?symbol=${item.symbol}`;
        img.src = item.profile.image;
        img.classList.add("img-search-list");
        li.appendChild(img);
        li.appendChild(link);
        li.appendChild(changes);
        changes.textContent = `${changesPersentage} %`;
        changes.classList.add("stock-price");
        li.classList.add("list-group-item");
        if (item.profile.changes < 0) {
          changes.classList.add("red");
        } else {
          changes.classList.add("green");
        }
        this.searchResultsList.appendChild(li);
      });
    };

    function highlight(string) {
      const input = document.getElementById("search");
      const inputValue = input.value;
      let newString;
      const substring = new RegExp(`${inputValue}`, "gi");
      newString = string.replace(substring, (match) => {
        return `<mark>${match}</mark>`;
      });
      return newString;
    }
  }
}
