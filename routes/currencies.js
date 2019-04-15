const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const key = require("../config/key");

const contactThirdParty = function contactThirdParty(url, res) {
    fetch(url)
        .then(res => res.json())
        .then(parsedRes => {
            res.status(200).json(parsedRes);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: true });
        });
};

router.get("/top-ten", function(req, res) {
    contactThirdParty(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key()}`,
        res
    );
});

router.get("/all-coins", function(req, res) {
    contactThirdParty(
        `https://min-api.cryptocompare.com/data/all/coinlist`,
        res
    );
});

router.get("/currency-history/:currency/:hist/:limit", function(req, res) {
    const { currency, hist, limit } = req.params;
    contectThirdParty(
        `https://min-api.cryptocompare.com/data/${hist}?fsym=${currency}&tsym=USD&limit=${limit}`,
        res
    );
});

router.get("/currency-info/:currency", function(req, res) {
    const { currency } = req.params;
    contactThirdParty(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currency}&tsyms=USD`,
        res
    );
});

module.exports = router;
