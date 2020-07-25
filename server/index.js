const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const APIKEY = "";
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.use(cors());
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const doubleFetch = async function (input) {
  const url = `https://financialmodelingprep.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ&apikey=${APIKEY}`;
  const response = await fetch(url);
  const searchRes = await response.json();
  await Promise.all(
    searchRes.map(async (company) => {
      const companyURL = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${APIKEY}`;
      try {
        const response = await fetch(companyURL);
        company.profile = (await response.json())[0];
      } catch {
        company.profile = {};
      }
      return company;
    })
  );
  return searchRes;
};
// endpoint
app.get("/search", (req, res) => {
  const searchQuery = req.query.query;
  doubleFetch(searchQuery).then((searchRes) => {
    res.send(searchRes);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let database = db.db("stockExDataBase");
      database.collection("companies").insertMany(searchRes, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });
  });
});
