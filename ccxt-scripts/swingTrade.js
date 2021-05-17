import ccxt from 'ccxt';
const { exchanges } = ccxt;

(async function () {
    const fee = 0.00075
    const separatorLine = "-----------------------------------------------------------------------------"

    let binanceus  = new ccxt.binanceus ({
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_API_SECRET,
    })

    let p1 = await binanceus.fetchTicker ("PAXG/USD")
    console.log(p1)
    let p2 = await binanceus.fetchTicker ("PAXG/USDT")
    console.log(p2)

    if ((p1.bid*0.98-p2.ask)/p2.ask>0.0) {
        console.log("buy PAXG/USDT sell PAXG/USD")
        // console.log (binanceus.id, await binanceus.createMarketBuyOrder ('PAXG/USDT', 0.01, p2.ask))
        // console.log (binanceus.id, await binanceus.createMarketSellOrder ('PAXG/USD', 0.01, p1.bid))
    } else if ((p2.bid*0.98-p1.ask)/p1.ask>0.0) {
        console.log("buy PAXG/USD sell PAXG/USDT")
        // console.log (binanceus.id, await binanceus.createMarketBuyOrder ('PAXG/USD', 0.01, p2.ask))
        // console.log (binanceus.id, await binanceus.createMarketSellOrder ('PAXG/USDT', 0.01, p1.bid))
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