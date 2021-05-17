import ccxt from 'ccxt';
const { exchanges } = ccxt;

(async function () {
    const coinbaseFee = 0.005
    const binanceFee = 0.00075
    const separatorLine = "-----------------------------------------------------------------------------"
    let coinbasepro  = new ccxt.coinbasepro ({
        apiKey: process.env.COINBASE_PRO_API_KEY,
        secret: process.env.COINBASE_PRO_API_SECRET,
    })
    let binanceus  = new ccxt.binanceus ({
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_API_SECRET,
    })

    let kucoin  = new ccxt.kucoin ({
        apiKey: process.env.KUCOIN_API_KEY,
        secret: process.env.KUCOIN_API_SECRET,
    })

    // console.log (coinbasepro.id,  await coinbasepro.loadMarkets  ())
    // console.log (binanceus.id,  await binanceus.loadMarkets ())

    const comparePrice = async (ex1, ex2, pair) => {
        let coinbasePair = await ex1.fetchTicker (pair)
    
        let binancePair = await ex2.fetchTicker (pair)
    
        console.log(ex1.id, coinbasePair.bid, coinbasePair.ask)
        console.log(ex2.id, binancePair.bid, binancePair.ask)
    
        let profitRate1 = (binancePair.bid*(1-binanceFee) - coinbasePair.ask*(1+coinbaseFee)) / (coinbasePair.ask*(1+coinbaseFee))
        let profitRate2 = (coinbasePair.bid*(1-coinbaseFee) - binancePair.ask*(1+binanceFee)) / (binancePair.ask*(1+binanceFee))
        console.log(profitRate1, profitRate2)
        // fee binance 0.075%, coinbase 0.50%, 5% 差价可以搞？
        if (profitRate1 > 0.05) {
            console.log("buy at coinbase, sell at binance")
        } else if (profitRate2 > 0.05) {
            console.log("buy at binance, sell at coinbase")
        }
    
    }
    // const watchList = ['STORJ/USD', 'XLM/USD', 'EOS/USD'];
    // const watchList = ['DASH/USD', 'ENJ/USD', 'ALGO/USD'];

    const watchList = ['ADA/USDT', 'ATOM/USDT', 'LTC/USDT'];
    for (let i=0;i<watchList.length; i++) {
        console.log(watchList[i])
        await comparePrice(kucoin, binanceus, watchList[i])
        console.log(separatorLine)
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