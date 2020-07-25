const APIKEY = "";
const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");
const loader = document.querySelector(".loader");
const companyURL = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${APIKEY}`;
const companySymbol = document.querySelector(".comp-symbol");
const companyName = document.querySelector(".comp-name");
const companyStock = document.querySelector(".comp-stock-price");
const companyChanges = document.querySelector(".comp-changes");
const companyDecription = document.querySelector(".comp-description");
const pricesURL = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${APIKEY}`;

async function getProfile(url) {
  const response = await fetch(url);
  return response.json();
}

async function displayProfile() {
  const obj = await getProfile(companyURL);
  const company = obj[0];
  companySymbol.src = company.image;
  companyName.textContent = company.companyName;
  companyName.href = company.website;
  companyStock.textContent += company.price;
  if (parseFloat(company.changes) < 0) companyChanges.style.color = "red";
  else companyChanges.style.color = "green";
  companyChanges.textContent = company.changes + " $";
  companyDecription.textContent = company.description;
}
displayProfile();

async function getLast10Prices() {
  const obj = await getProfile(pricesURL);
  let compArray = [];
  for (let i = 9; i >= 0; i--) {
    compArray.push(obj.historical[i]);
  }
  let dates = [];
  for (let company of compArray) {
    dates.push(company.date);
  }

  let prices = [];
  for (let company of compArray) {
    prices.push(company.close);
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      type: "category",
      labels: dates,
      datasets: [
        {
          label: "Stock price history for the last 10 days",
          backgroundColor: "rgb(49, 89, 37, 0.3)",
          borderColor: "rgb(49, 89, 37)",
          data: prices,
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 40,
              minRotation: 30,
            },
          },
        ],
      },
    },
  });
}
getLast10Prices();
