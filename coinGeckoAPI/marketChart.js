import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

export const marketChart = async () => {
    const dateNow = new Date(Date.now());
    const timeStampTo = Math.floor(dateNow / 1000);
    const timeStampFrom = Math.floor(dateNow.setFullYear(dateNow.getFullYear()-1) / 1000);
    const params = {
    /**
     * The target currency of market data (usd, eur, jpy, etc.)
     */
    vs_currency: 'usd',
    /**
     * From date in UNIX Timestamp (eg. 1392577232)
     */
    from: timeStampFrom,
    /**
     * To date in UNIX Timestamp (eg. 1422577232)
     */
    to: timeStampTo,
    }
    console.info(params);
    return await CoinGeckoClient.coins.fetchMarketChartRange('bitcoin', params);
};

