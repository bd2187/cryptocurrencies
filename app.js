const http = require("http");
const fetch = require("node-fetch");
const key = require("./config/key");

const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
    if (req.url === "/top-ten") {
        res.writeHead(200, { "Content-Type": "application/json" });
        fetch(
            `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key()}`
        )
            .then(fetchedRes => {
                return fetchedRes.json();
            })
            .then(parsedRes => {
                res.write(JSON.stringify(parsedRes));
            });
    }

    if (req.url === "/all-coins") {
        res.writeHead(200, { "Content-Type": "application/json" });
        fetch("https://min-api.cryptocompare.com/data/all/coinlist")
            .then(fetchedRes => {
                return fetchedRes.json();
            })
            .then(parsedRes => {
                res.write(JSON.stringify(parsedRes));
            });
    }
}).listen(PORT, () => {
    console.warn(`Not listening to port ${PORT}`);
});
