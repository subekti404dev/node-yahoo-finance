const axios = require("axios");
const _ = require("lodash");
const Config = require("./config");

const getInfo = async (symbol) => {
  if (!symbol || typeof symbol !== "string")
    throw new Error("Symbol is required and must be string");
  symbol = symbol.toUpperCase();
  const url = Config.BaseUrl + `v8/finance/chart/${symbol}?range=1d`;
  let resp;
  try {
    resp = await axios.get(url);
  } catch (error) {
    throw new Error("Unknow symbol, please enter correct symbol");
  }
  const meta = _.get(resp, "data.chart.result[0].meta");
  if (!meta) throw new Error("No result");
  return {
    currency: meta.currency,
    symbol: meta.symbol,
    currentPrice: meta.regularMarketPrice,
    previousClosePrice: meta.chartPreviousClose,
  };
};

getInfo("bris.jk").then(console.log);
