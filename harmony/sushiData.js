import { request, gql } from 'graphql-request';

const exchangeUrl = 'https://sushi.graph.t.hmny.io/subgraphs/name/sushiswap/harmony-exchange';
const pairs = {
    properties: [
        'id',
        'token0 { id, name, symbol, totalSupply, derivedETH }',
        'token1 { id, name, symbol, totalSupply, derivedETH }',
        'reserve0',
        'reserve1',
        'totalSupply',
        'reserveETH',
        'reserveUSD',
        'trackedReserveETH',
        'token0Price',
        'token1Price',
        'volumeToken0',
        'volumeToken1',
        'volumeUSD',
        'untrackedVolumeUSD',
        'txCount',
    ],

    callback(results) {
        return results
            .map(result => ({
                id: result.id,
                token0: { 
                    id: result.token0.id,
                    name: result.token0.name,
                    symbol: result.token0.symbol,
                    totalSupply: Number(result.token0.totalSupply),
                    derivedETH: Number(result.token0.derivedETH),
                },
                token1: { 
                    id: result.token1.id,
                    name: result.token1.name,
                    symbol: result.token1.symbol,
                    totalSupply: Number(result.token1.totalSupply),
                    derivedETH: Number(result.token1.derivedETH),
                },
                reserve0: Number(result.reserve0),
                reserve1: Number(result.reserve1),
                totalSupply: Number(result.totalSupply),
                reserveETH: Number(result.reserveETH),
                reserveUSD: Number(result.reserveUSD),
                trackedReserveETH: Number(result.trackedReserveETH),
                token0Price: Number(result.token0Price),
                token1Price: Number(result.token1Price),
                volumeToken0: Number(result.volumeToken0),
                volumeToken1: Number(result.volumeToken1),
                volumeUSD: Number(result.volumeUSD),
                untrackedVolumeUSD: Number(result.untrackedVolumeUSD),
                txCount: Number(result.txCount),
            }))
        .sort((a, b) => b.reserveUSD - a.reserveUSD);     
    },

    callback24h(results, results24h, results48h, ethPriceUSD, ethPriceUSD24ago) {
        return results.map(result => {
            const result24h = results24h.find(e => e.id === result.id) || result;
            const result48h = results48h.find(e => e.id === result.id) || result;

            return ({
                ...result,
                
                trackedReserveUSD: result.trackedReserveETH * ethPriceUSD,
                trackedReserveUSDChange: (result.trackedReserveETH * ethPriceUSD) / (result24h.trackedReserveETH * ethPriceUSD24ago) * 100 - 100,
                trackedReserveUSDChangeCount: result.trackedReserveETH * ethPriceUSD - result24h.trackedReserveETH* ethPriceUSD24ago,

                trackedReserveETHChange: (result.trackedReserveETH / result24h.trackedReserveETH) * 100 - 100,
                trackedReserveETHChangeCount: result.trackedReserveETH - result24h.trackedReserveETH,

                volumeUSDOneDay: result.volumeUSD - result24h.volumeUSD,
                volumeUSDChange: (result.volumeUSD - result24h.volumeUSD) / (result24h.volumeUSD - result48h.volumeUSD) * 100 - 100,
                volumeUSDChangeCount: (result.volumeUSD - result24h.volumeUSD) - (result24h.volumeUSD - result48h.volumeUSD),
                
                untrackedVolumeUSDOneDay: result.untrackedVolumeUSD - result24h.untrackedVolumeUSD,
                untrackedVolumeUSDChange: (result.untrackedVolumeUSD - result24h.untrackedVolumeUSD) / (result24h.untrackedVolumeUSD - result48h.untrackedVolumeUSD) * 100 - 100,
                untrackedVolumeUSDChangeCount: (result.untrackedVolumeUSD - result24h.untrackedVolumeUSD) - (result24h.untrackedVolumeUSD - result48h.untrackedVolumeUSD),

                txCountOneDay: result.txCount - result24h.txCount,
                txCountChange: (result.txCount - result24h.txCount) / (result24h.txCount - result48h.txCount) * 100 - 100,
                txCountChangeCount: (result.txCount - result24h.txCount) - (result24h.txCount - result48h.txCount),
            })});
    },

    callbackHourData(results) {
        return results.map(result => ({
            id: result.id,
            token0: { 
                id: result.token0.id,
                name: result.token0.name,
                symbol: result.token0.symbol,
                totalSupply: Number(result.token0.totalSupply),
                derivedETH: Number(result.token0.derivedETH),
            },
            token1: { 
                id: result.token1.id,
                name: result.token1.name,
                symbol: result.token1.symbol,
                totalSupply: Number(result.token1.totalSupply),
                derivedETH: Number(result.token1.derivedETH),
            },
            reserve0: Number(result.reserve0),
            reserve1: Number(result.reserve1),
            totalSupply: Number(result.totalSupply),
            reserveETH: Number(result.reserveETH),
            reserveUSD: Number(result.reserveUSD),
            trackedReserveETH: Number(result.trackedReserveETH),
            token0Price: Number(result.token0Price),
            token1Price: Number(result.token1Price),
            volumeToken0: Number(result.volumeToken0),
            volumeToken1: Number(result.volumeToken1),
            volumeUSD: Number(result.volumeUSD),
            untrackedVolumeUSD: Number(result.untrackedVolumeUSD),
            txCount: Number(result.txCount),
            timestamp: result.timestamp
        }));
    },

    propertiesDayData: [
        'id',
        'date',
        'volumeUSD',
        'volumeToken0',
        'volumeToken1',
        'reserveUSD',
        'txCount'
    ],

    callbackDayData(results) {
        return results.map(result => ({
            id: result.id,
            date: new Date(result.date * 1000),
            timestamp: Number(result.date),
            volumeUSD: Number(result.volumeUSD),
            volumeToken0: Number(result.volumeToken0),
            volumeToken1: Number(result.volumeToken1),
            liquidityUSD: Number(result.reserveUSD),
            txCount: Number(result.txCount)
        }));
    }
}


async function handler() {
    const pair_address = '0x6b53ca1ed597ed7ccd5664ec9e03329992c2ba87';

    const result = await request(exchangeUrl,
        gql`{
                pair(id: "${pair_address.toLowerCase()}") {
                    ${pairs.properties.toString()}
                }
            }`
    );    
    console.log('current stone price: ', result.pair.token0.derivedETH);
    const stoneRate = 1.017;
    const marketPrice = Number(result.pair.token0.derivedETH);
    const apy = Math.pow((stoneRate / marketPrice), 365 / 9);
    console.log('apy: ', apy);
}

handler();