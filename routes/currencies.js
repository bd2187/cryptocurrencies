const express = require("express");
const router = express.Router();
const key = "";

router.get("/top-ten", (req, res) => {
    fetch(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key}`
    ).then(res => {
        return res.json({
            success: true,
            res
        });
    });
});
