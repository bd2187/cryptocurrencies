import key from "./key";

export const topTenEndpoint = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${key}`;

export const currencyHistoryEndpoint = (currency = "", timeline = "month") => {
    let limit;

    timeline = timeline.toLowerCase();

    const hist = timeline === "day" ? "histohour" : "histoday";

    if (timeline === "day") limit = 24;

    if (timeline === "week") limit = 7;

    if (timeline === "month") limit = 30;

    if (timeline === "year") limit = 365;

    return `https://min-api.cryptocompare.com/data/${hist}?fsym=${currency}&tsym=USD&limit=${limit}`;
};

export const currencyTradeInfoEndpoint = (currency = "") => {
    return `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currency}&tsyms=USD`;
};

export const allCoinsEndpoint =
    "https://min-api.cryptocompare.com/data/all/coinlist";
