const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Routes
const coinsRoutes = require("./routes/currencies");

app.use("/coins", coinsRoutes);

app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});
