const APIKEY = "";
const searchNavBar = document.querySelector('.search-navbar')
const loader = new Loader(document.querySelector(".loader"));
const allCompaniesURL = `https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=${APIKEY}`;
const resultsWrapper = document.querySelector('.results-wrapper');
const marqueeBox = document.getElementById('marquee');