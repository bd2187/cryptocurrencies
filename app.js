const http = require("http");
const fetch = require("node-fetch");
const key = require("./config/key");
const url = require("url");
const querystring = require("querystring");

const PORT = process.env.PORT || 5000;

const parseJSON = function(res) {
    return res.json();
};

http.createServer((req, res) => {
    if (req.url === "/top-ten") {
        res.writeHead(200, { "Content-Type": "application/json" });
        fetch(
            `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key()}`
        )
            .then(parseJSON(fetchedRes))
            .then(parsedRes => {
                res.write(JSON.stringify(parsedRes));
            });
    }

    if (req.url === "/all-coins") {
        res.writeHead(200, { "Content-Type": "application/json" });
        fetch("https://min-api.cryptocompare.com/data/all/coinlist")
            .then(parseJSON(fetchedRes))
            .then(parsedRes => {
                res.write(JSON.stringify(parsedRes));
            });
    }

    if (req.url === "/currency-data?userID=123") {
        const parsed = url.parse(req.url);

        console.log(querystring.parse(parsed.query));
        res.end("test");
    }
}).listen(PORT, () => {
    console.warn(`Not listening to port ${PORT}`);
});
