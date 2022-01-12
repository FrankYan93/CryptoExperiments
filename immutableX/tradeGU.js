import got from 'got';
import fs from 'fs';

const imxHost = 'api.x.immutable.com';
const tokenPrices = {
    'ETH': 3377,
    'GODS': 3.17,
    'IMX': 3.71
}
const tokenAddresses = {
    'GODS': '0xccc8cb5229b0ac8069c51fd58367fd1e622afd97',
    'IMX': '0xf57e7e7c23978c3caec3c3548e3d615c346e79ff'
}
class GU {
    cardName;
    rate;
    set;
    constructor(item) {
        this.cardName = item.name;
        this.set = item.set;
    }

    async usdPrice(tokenType) {
        let url = '';
        if (tokenType === 'ETH') {
            url = `https://${imxHost}/v1/orders?page_size=1&order_by=buy_quantity&direction=asc&status=active&buy_token_type=${tokenType}&sell_token_name=${escape(this.cardName)}`;
        } else {
            url = `https://${imxHost}/v1/orders?page_size=1&order_by=buy_quantity&direction=asc&status=active&buy_token_address=${tokenAddresses[tokenType]}&sell_token_name=${escape(this.cardName)}`;
        }
        // url = `${url}&quality=Shadow`
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

    async setRate() {
        const ethUsd = await this.usdPrice('ETH');
        // const godsUsd = await card.usdPrice('GODS');
        const imxUsd = await this.usdPrice('IMX');
        const rate = (imxUsd - ethUsd)/ethUsd;
        // console.log(rate);
        return rate;
    }
}


function kSmallest(arr, k)
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
            card.rate = await card.setRate();
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

    let k = 10;
    kSmallest(cards, k);
}

handler();
// async function test() {
//     const card = new GU('Neferu’s Sacrifice');
//     card.rate = await card.setRate();
// }
// test();
