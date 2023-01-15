import CoinGecko from 'coingecko-api';
import { marketChart } from './marketChart.js';
const CoinGeckoClient = new CoinGecko();
const testFunc = async() => {
  const data = await CoinGeckoClient.ping();
  console.info(data);
};

const coinLists = async () => {
    const data = await CoinGeckoClient.coins.all();
    console.info(data);  
};

// coinLists();

const res = await marketChart();
console.info(res.data.prices);
