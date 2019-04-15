const express = require("express");
const app = express();
const fetch = require("node-fetch");
const key = require("./config/key");

const PORT = process.env.PORT || 5000;

app.get("/top-ten", function(req, res) {
    fetch(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key()}`
    )
        .then(res => res.json())
        .then(parsedRes => {
            res.status(200).json(parsedRes);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: true });
        });
});

app.get("/all-coins", function(req, res) {
    fetch(`https://min-api.cryptocompare.com/data/all/coinlist`)
        .then(res => res.json())
        .then(parsedRes => {
            res.status(200).json(parsedRes);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ err: true });
        });
});

app.get("/currency-history/:currency/:hist/:limit", function(req, res) {
    const { currency, hist, limit } = req.params;

    fetch(
        `https://min-api.cryptocompare.com/data/${hist}?fsym=${currency}&tsym=USD&limit=${limit}`
    )
        .then(res => res.json())
        .then(parsedRes => {
            res.status(200).json(parsedRes);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ err: true });
        });
});

app.get("/currency-info/:currency", function(req, res) {
    const { currency } = req.params;
    fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currency}&tsyms=USD`
    )
        .then(parsedRes => {
            res.status(200).json(parsedRes);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ err: true });
        });
});

app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});
