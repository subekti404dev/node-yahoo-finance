# node-yahoo-finance

## How to install
```javascript
npm install github:subekti404dev/node-yahoo-finance
```
or
```javascript
yarn add github:subekti404dev/node-yahoo-finance
```

## How to use
```javascript
const YahooFinance = require("node-yahoo-finance");

// get quotes by keyword
YahooFinance.getQuotes("bank bri").then(console.log);
// response
[
  {
    exchange: 'JKT',
    shortname: 'Bank BRIsyariah Tbk.',
    quoteType: 'EQUITY',
    symbol: 'BRIS.JK',
    index: 'quotes',
    score: 20542,
    typeDisp: 'Equity',
    longname: 'PT Bank BRIsyariah Tbk',
    isYahooFinance: true
   }
 ]

// get quote info by symbol
YahooFinance.getInfo("tlkm.jk").then(console.log);
// response
{ 
  currency: 'IDR',
  symbol: 'TLKM.JK',
  currentPrice: 3280,
  previousClosePrice: 3220,
  priceChanges: 60,
  percentageChanges: '1.863'
 }

```
