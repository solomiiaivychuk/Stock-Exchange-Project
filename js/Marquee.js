class Marquee {
  constructor(element) {
    this.element = element;
  }
  async fetchData() {
    loader.show();
    const response = await fetch(allCompaniesURL);
    const allData = await response.json();
    allData.forEach((company) => {
      const compItem = document.createElement("li");
      compItem.classList.add("marquee-list");
      const compSymbol = document.createElement("span");
      compSymbol.textContent = company.symbol;
      const compChange = document.createElement("span");
      compChange.textContent = company.change;
      const compChangePersentage = document.createElement("span");
      compChangePersentage.textContent = `(${company.changesPercentage}%)`;
      if (company.change < 0) compChange.classList.add("red");
      else compChange.classList.add("green");
      if (company.changesPercentage < 0)
        compChangePersentage.classList.add("red");
      else compChangePersentage.classList.add("green");
      compItem.appendChild(compSymbol);
      compItem.appendChild(compChange);
      compItem.appendChild(compChangePersentage);
      marqueeBox.appendChild(compItem);
    });
    loader.hide();
  }
}
