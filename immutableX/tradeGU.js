import got from 'got';
import fs from 'fs';

const imxHost = 'api.x.immutable.com';
const tokenPrices = {
    'ETH': 3112,
    'GODS': 3.11,
    'IMX': 3.55
}
const tokenAddresses = {
    'GODS': '0xccc8cb5229b0ac8069c51fd58367fd1e622afd97',
    'IMX': '0xf57e7e7c23978c3caec3c3548e3d615c346e79ff'
}
const qualities = ["Meteorite", "Shadow", "Gold", "Diamond"];
const quality = qualities[0];
class GU {
    cardName;
    rate;
    qRate;
    set;
    constructor(item) {
        this.cardName = item.name;
        this.set = item.set;
    }

    async usdPrice(tokenType, quality) {
        let url = '';
        if (tokenType === 'ETH') {
            url = `https://${imxHost}/v1/orders?page_size=1&order_by=buy_quantity&direction=asc&status=active&buy_token_type=${tokenType}&sell_token_name=${escape(this.cardName)}`;
        } else {
            url = `https://${imxHost}/v1/orders?page_size=1&order_by=buy_quantity&direction=asc&status=active&buy_token_address=${tokenAddresses[tokenType]}&sell_token_name=${escape(this.cardName)}`;
        }
        url = `${url}&sell_metadata=%7B"quality"%3A%5B"${quality}"%5D%7D`
        // console.log(url);
        const res = await got(url);
        const result = JSON.parse(res.body).result[0];
        // console.log(result);
        const tokenQuantity = result.buy.data.quantity/1000000000000000000;
        // console.log(tokenType, tokenQuantity);
        const usd = tokenQuantity * tokenPrices[tokenType];
        // console.log('USD', usd)
        return usd;
    }

    async setRate(q) {
        const ethUsd = await this.usdPrice('ETH', q);
        // const godsUsd = await card.usdPrice('GODS');
        const imxUsd = await this.usdPrice('IMX', q);
        const rate = (imxUsd - ethUsd)/ethUsd;
        // console.log(rate);
        return rate;
    }

    async setQRate(quality1, quality2) {
        const p2 = await this.usdPrice('ETH', quality2);
        const p1 = await this.usdPrice('ETH', quality1);
        const rate = p2/p1;
        return rate;
    }
}


function sortByRate(arr)
{
    // Sort the given array arr in reverse
    // order.
    arr.sort((a, b) => a.rate - b.rate);

    // Print the first kth largest elements
    for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i].cardName, arr[i].rate);
    }
}

async function handler() {
    console.log(quality);
    const dataRaw = fs.readFileSync('allCardsProto.json', 'utf8')
    const data = JSON.parse(dataRaw);
    const cards = [];
    let counter = 0;
    for (const item of data.records) {
        if (!item.collectable) {
            continue;
        }
        try {
            // console.log(item.name);
            const card = new GU(item);
            card.rate = await card.setRate(quality);
            cards.push(card);
            // test
            // counter += 1;
            // if (counter === 11) {
            //   break;
            // }
        } catch (e) {
            // console.log(`failed - ${item.name}`);
        }
    }

    sortByRate(cards);
}

function sortedRate(arr) {
    arr.sort((a, b) => a.qRate - b.qRate);
    for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i].cardName, arr[i].qRate);
    }
}

async function qualityRateSorted(quality1, quality2) {
    console.log(quality1, quality2);
    const dataRaw = fs.readFileSync('allCardsProto.json', 'utf8')
    const data = JSON.parse(dataRaw);
    const cards = [];
    let counter = 0;
    for (const item of data.records) {
        if (!item.collectable) {
            continue;
        }
        // counter += 1;
        // if (counter >= 11) {
        //     break;
        // }
        try {
            // console.log(item.name);
            const card = new GU(item);
            card.qRate = await card.setQRate(quality1, quality2);
            cards.push(card);
        } catch (e) {
            // console.log(e);
        }
    }

    sortedRate(cards);
}

handler();
// qualityRateSorted(qualities[0], qualities[1]);
