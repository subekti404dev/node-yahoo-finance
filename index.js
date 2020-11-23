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
    previousClosePrice: meta.previousClose,
    priceChanges: meta.regularMarketPrice - meta.previousClose,
    percentageChanges: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2),
    
  };
};


const getQuotes = async (keyword) => {
  if (typeof keyword !== "string")
    throw new Error("Keyword must be string");
  const url = Config.BaseUrl + `v1/finance/search?q=${keyword}&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query`;
  let resp;
  try {
    resp = await axios.get(url);
  } catch (error) {
    throw new Error("Unknow error");
  }
  const quotes = _.filter(_.get(resp, "data.quotes", []), (q) => q.symbol.includes('.JK'));
  if (!quotes) throw new Error("No result");
  return quotes
};

// getQuotes("bank bri").then(console.log);
// getInfo("tlkm.jk").then(console.log);

module.exports = {getInfo, getQuotes}
