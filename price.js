import ccxt from 'ccxt';
const { exchanges } = ccxt;

(async function () {
    let coinbasepro  = new ccxt.coinbasepro ({
        apiKey: process.env.COINBASE_PRO_API_KEY,
        secret: process.env.COINBASE_PRO_API_SECRET,
    })
    let binanceus  = new ccxt.binanceus ({
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_API_SECRET,
    })

    // console.log (coinbasepro.id,  await coinbasepro.loadMarkets  ())
    // console.log (binanceus.id,  await binanceus.loadMarkets ())

    let coinbaseStorj = await coinbasepro.fetchTicker ('STORJ/USD')

    let binanceStorj = await binanceus.fetchTicker ('STORJ/USD')

    console.log(coinbasepro.id, coinbaseStorj.bid, coinbaseStorj.ask)
    console.log(binanceus.id, binanceStorj.bid, binanceStorj.ask)

    // fee binance 0.075%, coinbase 0.50%, 5% 差价可以搞？
    if ((binanceStorj.bid - coinbaseStorj.ask) / coinbaseStorj.ask > 0.05) {
        // buy at coinbase, sell at binance
    }

    // console.log (binanceus.id, await binanceus.fetchBalance ())

    // sell 1 BTC/USD for market price, sell a bitcoin for dollars immediately
    // console.log (binanceus.id, await binanceus.createMarketSellOrder ('BTC/USD', 1))

    // buy 1 BTC/USD for $2500, you pay $2500 and receive ฿1 when the order is closed
    // console.log (binanceus.id, await binanceus.createLimitBuyOrder ('BTC/USD', 1, 2500.00))

    // pass/redefine custom exchange-specific order params: type, amount, price or whatever
    // use a custom order type
    // coinbasepro.createLimitSellOrder ('BTC/USD', 1, 10, { 'type': 'trailing-stop' })

}) ();