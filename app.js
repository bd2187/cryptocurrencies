const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const coinsRoutes = require("./routes/currencies");

app.use("/coins", coinsRoutes);

app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});
